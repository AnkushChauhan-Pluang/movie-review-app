import clientPromise from 'db/mongodb';
import errorMiddleware from 'middlewares/errorMiddleware';
import { generateToken, verifyPassword } from 'utils/authHelpers';
import BadRequestError from 'utils/errors/BadRequestError';
import ResourceNotFoundError from 'utils/errors/ResourceNotFoundError';

const handler = (req, res) => {
  const { email, password } = req.body;
  let db;
  let user;
  clientPromise
    .then((client) => client.db().collection('users'))
    .then((result) => {
      db = result;
      return db.findOne({ email });
    })
    .then((result) => {
      user = result;
      if (!user) throw new ResourceNotFoundError('User not found');
      return verifyPassword(password, user.password);
    })
    .then((isVerified) => {
      if (!isVerified) throw new BadRequestError('Invalid password');

      delete user.password;
      delete user.tokens;
      const token = generateToken(user._id);
      db.findOneAndUpdate({ _id: user._id }, { $push: { tokens: token } });
      return token;
    })
    .then((token) => res.json({ user, token }))
    .catch((error) => errorMiddleware(error, res));
};

export default handler;
