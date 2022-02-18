import AppError from './AppError';
import { StatusCodes } from './StatusCodes';

class ServerError extends AppError {
  constructor(message, statusCode = StatusCodes.INTERNAL_SERVER_ERROR) {
    super(message, statusCode);

    Error.captureStackTrace && Error.captureStackTrace(this);
    this.name = 'ServerError';
  }
}

export default ServerError;
