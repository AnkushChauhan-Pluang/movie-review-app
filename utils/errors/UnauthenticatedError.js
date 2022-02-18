import AppError from './AppError';
import { StatusCodes } from './StatusCodes';

class UnauthenticatedError extends AppError {
  constructor(message, statusCode = StatusCodes.UNAUTHENTICATED_REQUEST) {
    super(message, statusCode);

    Error.captureStackTrace && Error.captureStackTrace(this, UnauthenticatedError);
    this.name = 'UnauthenticatedError';
  }
}

export default UnauthenticatedError;
