import clientPromise from 'db/mongodb';
import authMiddleware from 'middlewares/authMiddleware';

const handler = async (req, res) => {
  const client = await clientPromise;
  const db = await client.db().collection('users');
  try {
    const user = await db.findOne({ _id: req.userId });
    delete user.tokens;
    delete user.password;
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export default authMiddleware(handler);
