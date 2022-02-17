import clientPromise from 'db/mongodb';

const handler = async (req, res) => {
  const client = await clientPromise;
  const db = await client.db().collection('reviews');

  const { movieId } = req.query;
  try {
    const reviews = await db.find({ movieId: parseInt(movieId) }).toArray();
    res.json(reviews);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export default handler;
