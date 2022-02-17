import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

const authMiddleware = (handler) => {
  return async (req, res) => {
    const { authorization } = req.headers;
    if (!authorization)
      return res.status(401).json({ error: 'Authentication required' });
    try {
      const token = authorization.replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = new ObjectId(decoded.userId);
      return handler(req, res);
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: error.message });
    }
  };
};

export default authMiddleware;
