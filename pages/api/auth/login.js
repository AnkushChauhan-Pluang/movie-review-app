import clientPromise from 'db/mongodb';
import errorMiddleware from 'middlewares/errorMiddleware';
import { generateToken, verifyPassword } from 'utils/authHelpers';
import BadRequestError from 'utils/errors/BadRequestError';
import ResourceNotFoundError from 'utils/errors/ResourceNotFoundError';

const handler = async (req, res) => {
  const client = await clientPromise;
  const db = await client.db().collection('users');

  const { email, password } = req.body;
  try {
    const user = await db.findOne({ email });
    if (!user) throw new ResourceNotFoundError('User not found');

    const isVerified = await verifyPassword(password, user.password);
    if (!isVerified) throw new BadRequestError('Invalid password');

    delete user.password;
    delete user.tokens;
    const token = generateToken(user._id);
    await db.findOneAndUpdate({ _id: user._id }, { $push: { tokens: token } });
    res.json({ user, token });
  } catch (error) {
    errorMiddleware(error, res);
  }
};

export default handler;
