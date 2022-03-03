import clientPromise from 'db/mongodb';
import authMiddleware from 'middlewares/authMiddleware';
import errorMiddleware from 'middlewares/errorMiddleware';
import ResourceNotFoundError from 'utils/errors/ResourceNotFoundError';

const handler = async (req, res) => {
  const client = await clientPromise;
  const db = await client.db().collection('ratings');
  try {
    const ratings = await db.findOne({ _id: req.userId });
    if (!user) throw new ResourceNotFoundError('User not found');
    delete user.tokens;
    delete user.password;
    res.json(user);
  } catch (error) {
    errorMiddleware(error, res);
  }
};

export default authMiddleware(handler);
