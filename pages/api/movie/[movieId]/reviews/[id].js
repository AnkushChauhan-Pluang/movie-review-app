import clientPromise from 'db/mongodb';
import authMiddleware from 'middlewares/authMiddleware';
import errorMiddleware from 'middlewares/errorMiddleware';
import { ObjectId } from 'mongodb';

const handler = async (req, res) => {
  const client = await clientPromise;
  const db = await client.db().collection('reviews');

  const editReview = async (req, res) => {
    const { movieId, review } = req.body;
    try {
      const result = await db.findOneAndUpdate(
        { movieId, authorId: req.userId },
        { $set: { review, edited: true } }
      );
      res.json(result);
    } catch (error) {
      errorMiddleware(error, res);
    }
  };

  const deleteReview = async (req, res) => {
    const { id } = req.query;
    try {
      const result = await db.findOneAndDelete({ _id: new ObjectId(id) });
      res.json(result);
    } catch (error) {
      errorMiddleware(error, res);
    }
  };

  switch (req.method) {
    case 'PATCH':
      return editReview(req, res);
    case 'DELETE':
      return deleteReview(req, res);
  }
};

export default authMiddleware(handler);
