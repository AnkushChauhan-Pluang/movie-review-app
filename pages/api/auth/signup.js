import clientPromise from 'db/mongodb';
import errorMiddleware from 'middlewares/errorMiddleware';
import { encryptPassword, generateToken } from 'utils/authHelpers';

const handler = async (req, res) => {
  const client = await clientPromise;
  const db = await client.db().collection('users');

  const user = req.body;
  try {
    await db.createIndex({ email: 1 }, { unique: true });
    await db.createIndex({ username: 1 }, { unique: true });

    const hashedPassword = await encryptPassword(user.password);
    const result = await db.insertOne({ ...user, password: hashedPassword });
    const token = generateToken(result.insertedId);
    // Save token in db
    await db.findOneAndUpdate(
      { _id: result.insertedId },
      { $push: { tokens: token } }
    );
    delete user.password;
    res.status(201).json({ user, token });
  } catch (error) {
    errorMiddleware(error, res);
  }
};

export default handler;
