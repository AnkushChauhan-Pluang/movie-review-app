const errorHandler = (err, res) => {
  const error_message = err.message || 'Something went wrong!';
  if (err.statusCode) {
    return res.status(err.statusCode).json({ error_message });
  }
  return res.status(500).json({ error_message });
};

export default errorHandler;
