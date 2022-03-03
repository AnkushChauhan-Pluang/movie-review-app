import clientPromise from 'db/mongodb';
import authMiddleware from 'middlewares/authMiddleware';
import errorMiddleware from 'middlewares/errorMiddleware';

const handler = async (req, res) => {
  const client = await clientPromise;
  const db = await client.db().collection('ratings');
  const { movieId, value } = req.body;
  const authorId = req.userId;
  try {
    const result = await db.updateOne(
      { movieId: parseInt(movieId), authorId },
      { $set: { authorId, movieId, value } },
      { upsert: true }
    );
    res.json(result);
  } catch (error) {
    errorMiddleware(error, res);
  }
};

export default authMiddleware(handler);
