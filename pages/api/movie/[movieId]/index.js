import clientPromise from 'db/mongodb';
import authMiddleware from 'middlewares/authMiddleware';
import errorMiddleware from 'middlewares/errorMiddleware';
import { ObjectId } from 'mongodb';

const handler = async (req, res) => {
  const client = await clientPromise;
  const db = await client.db().collection('movies');

  const editMovie = async (req, res) => {
    const { movieId } = req.query;
    const { movie } = req.body;
    try {
      const result = await db.findOneAndUpdate(
        { _id: new ObjectId(movieId) },
        { $set: { ...movie } }
      );
      res.json(result);
    } catch (error) {
      errorMiddleware(error, res);
    }
  };

  const deleteMovie = async (req, res) => {
    const { movieId } = req.query;
    try {
      const result = await db.findOneAndDelete({ _id: new ObjectId(movieId) });
      res.json(result);
    } catch (error) {
      errorMiddleware(error, res);
    }
  };

  switch (req.method) {
    case 'PATCH':
      return editMovie(req, res);
    case 'DELETE':
      return deleteMovie(req, res);
  }
};

export default authMiddleware(handler);
