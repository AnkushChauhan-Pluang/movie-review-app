import clientPromise from 'db/mongodb';
import { encryptPassword, generateToken } from 'utils/authHelpers';

const handler = async (req, res) => {
  const client = await clientPromise;

  const user = req.body;
  try {
    // Make email as unique index
    await client
      .db()
      .collection('users')
      .createIndex({ email: 1 }, { unique: true });
    // Make username as unique index
    await client
      .db()
      .collection('users')
      .createIndex({ username: 1 }, { unique: true });
    const hashedPassword = await encryptPassword(user.password);
    const result = await client
      .db()
      .collection('users')
      .insertOne({ ...user, password: hashedPassword });
    const token = generateToken(result.insertedId);
    // Save token in db
    const signres = await client
      .db()
      .collection('users')
      .findOneAndUpdate(
        { _id: result.insertedId },
        { $push: { tokens: token } }
      );
    console.log('signup', signres);
    delete user.password;
    res.status(201).json({ user, token });
  } catch (error) {
    // console.log(error);

    let errorFor = '';
    let message = '';
    if (error.code && error.code === 11000) {
      if (error.message.includes('email')) {
        errorFor = 'email';
        message = `Another account is already using ${user.email}`;
      } else if (error.message.includes('username')) {
        errorFor = 'username';
        message = `Username ${user.username} is not available`;
      }
      return res.status(400).json({ errorFor, message });
    }
    res.status(500).json({ error });
  }
};

export default handler;
