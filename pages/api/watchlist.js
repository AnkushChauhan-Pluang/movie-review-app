import clientPromise from 'db/mongodb';
import authMiddleware from 'middlewares/authMiddleware';

const handler = async (req, res) => {
  const client = await clientPromise;
  const db = await client.db().collection('users');
  const { movieId } = req.body;
  try {
    const movie = await db.findOne({ _id: req.userId });
    const isInWatchlist = movie.watchlist && movie.watchlist.includes(movieId);
    isInWatchlist
      ? await db.findOneAndUpdate(
          { _id: req.userId },
          { $pull: { watchlist: movieId } }
        )
      : await db.findOneAndUpdate(
          { _id: req.userId },
          { $push: { watchlist: movieId } }
        );
    res.json({
      message: `${
        isInWatchlist ? 'Removed movie from' : 'Added movie to'
      } your watchlist`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export default authMiddleware(handler);
