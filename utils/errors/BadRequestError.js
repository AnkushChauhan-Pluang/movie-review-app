import AppError from './AppError';
import { StatusCodes } from './StatusCodes';

class BadRequestError extends AppError {
  constructor(message, statusCode = StatusCodes.BAD_REQUEST) {
    super(message, statusCode);

    Error.captureStackTrace && Error.captureStackTrace(this);
    this.name = 'BadRequestError';
  }
}

export default BadRequestError;
