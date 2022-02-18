import clientPromise from 'db/mongodb';
import authMiddleware from 'middlewares/authMiddleware';
import errorMiddleware from 'middlewares/errorMiddleware';
import ResourceNotFoundError from 'utils/errors/ResourceNotFoundError';

const handler = async (req, res) => {
  const client = await clientPromise;
  const db = await client.db().collection('users');
  const { movieId } = req.body;
  try {
    const movie = await db.findOne({ _id: req.userId });
    if (!movie) throw new ResourceNotFoundError('Movie not found');
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
    errorMiddleware(error, res);
  }
};

export default authMiddleware(handler);
