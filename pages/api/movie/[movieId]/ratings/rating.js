import clientPromise from 'db/mongodb';
import authMiddleware from 'middlewares/authMiddleware';
import errorMiddleware from 'middlewares/errorMiddleware';

const handler = async (req, res) => {
  const client = await clientPromise;
  const db = await client.db().collection('ratings');

  const { movieId } = req.query;
  try {
    const rating = await db.findOne({
      movieId: parseInt(movieId),
      authorId: req.userId,
    });
    res.json(rating);
  } catch (error) {
    errorMiddleware(error, res);
  }
};

export default authMiddleware(handler);
