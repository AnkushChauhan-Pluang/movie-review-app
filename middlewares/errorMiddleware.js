import errorHandler from "utils/errors/ErrorHandler";

const errorMiddleware = (err, res) => {
  if (!err.isAppError) {
    const e = errorHandler(err);
    const error = { code: e.statusCode, message: e.message };
    return res.status(e.statusCode).json({ error });
  }
  return res
    .status(err.statusCode)
    .json({ error: { code: err.statusCode, message: err.message } });
};

export default errorMiddleware;
