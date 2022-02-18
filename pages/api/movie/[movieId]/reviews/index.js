import clientPromise from 'db/mongodb';
import errorMiddleware from 'middlewares/errorMiddleware';

const handler = async (req, res) => {
  const client = await clientPromise;
  const db = await client.db().collection('reviews');

  const { movieId } = req.query;
  try {
    const reviews = await db.find({ movieId: parseInt(movieId) }).toArray();
    res.json(reviews);
  } catch (error) {
    errorMiddleware(error, res);
  }
};

export default handler;
