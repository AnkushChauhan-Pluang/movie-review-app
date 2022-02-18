import clientPromise from 'db/mongodb';
import authMiddleware from 'middlewares/authMiddleware';
import errorMiddleware from 'middlewares/errorMiddleware';

const handler = async (req, res) => {
  const client = await clientPromise;
  const db = await client.db().collection('users');
  const { movieId } = req.body;
  try {
    const movie = await db.findOne({ _id: req.userId });
    const isFavorite = movie.favorites && movie.favorites.includes(movieId);
    isFavorite
      ? await db.findOneAndUpdate(
          { _id: req.userId },
          { $pull: { favorites: movieId } }
        )
      : await db.findOneAndUpdate(
          { _id: req.userId },
          { $push: { favorites: movieId } }
        );
    res.json({
      message: `${
        isFavorite ? 'Removed movie from' : 'Added movie to'
      } your favorites`,
    });
  } catch (error) {
    errorMiddleware(error, res);
  }
};

export default authMiddleware(handler);
