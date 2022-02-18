import clientPromise from 'db/mongodb';
import authMiddleware from 'middlewares/authMiddleware';
import errorMiddleware from 'middlewares/errorMiddleware';

const handler = async (req, res) => {
  const client = await clientPromise;
  const db = await client.db().collection('reviews');

  const { author, movieId, review } = req.body;
  try {
    const result = await db.insertOne({
      author,
      authorId: req.userId,
      movieId,
      review,
    });
    res.json(result);
  } catch (error) {
    errorMiddleware(error, res);
  }
};

export default authMiddleware(handler);
