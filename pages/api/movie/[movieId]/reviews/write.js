import clientPromise from 'db/mongodb';
import authMiddleware from 'middlewares/authMiddleware';

const handler = async (req, res) => {
  const client = await clientPromise;
  const db = await client.db().collection('reviews');

  const { author, movieId, review } = req.body;
  console.log(req.body);
  try {
    const result = await db.insertOne({
      author,
      authorId: req.userId,
      movieId,
      review,
    });
    console.log(result);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export default authMiddleware(handler);
