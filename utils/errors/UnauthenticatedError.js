import AppError from './AppError';
import { StatusCodes } from './StatusCodes';

class Unauthenticated extends AppError {
  constructor(message, statusCode = StatusCodes.UNAUTHENTICATED_REQUEST) {
    super(message, statusCode);

    Error.captureStackTrace && Error.captureStackTrace(this, Unauthenticated);
    this.name = 'Unauthenticated';
  }
}

export default Unauthenticated;
