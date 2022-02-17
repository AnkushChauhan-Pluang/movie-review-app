import AppError from './AppError';
import { StatusCodes } from './StatusCodes';

class ResourceNotFoundError extends AppError {
  constructor(message, statusCode = StatusCodes.RESOURCE_NOT_FOUND) {
    super(message, statusCode);

    Error.captureStackTrace &&
      Error.captureStackTrace(this, ResourceNotFoundError);
    this.name = 'ResourceNotFoundError';
  }
}

export default ResourceNotFoundError;
