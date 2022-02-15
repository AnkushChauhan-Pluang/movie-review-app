import clientPromise from 'db/mongodb';
import { generateToken, verifyPassword } from 'utils/authHelpers';

const handler = async (req, res) => {
  const client = await clientPromise;

  const { email, password } = req.body;
  try {
    const user = await client.db().collection('users').findOne({ email });
    if (!user) throw new Error('User not found');

    const isVerified = await verifyPassword(password, user.password);
    if (!isVerified) throw new Error('Invalid password');

    delete user.password;
    delete user.tokens;
    const token = generateToken(user._id);
    console.log('id =>', user._id);
    // Save token in db
    const loginres = await client
      .db()
      .collection('users')
      .findOneAndUpdate({ _id: user._id }, { $push: { tokens: token } });
    // console.log(loginres);
    res.status(200).json({ user, token });
  } catch (error) {
    // console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export default handler;
