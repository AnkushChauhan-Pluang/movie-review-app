import BadRequestError from './BadRequestError';
import ServerError from './ServerError';
import UnauthenticatedError from './UnauthenticatedError';

const errorHandler = (error) => {
  console.log('error handler => ', error.code, error.name, error.message);
  if (error.code && error.code === 11000) {
    if (error.message.includes('email')) {
      return new BadRequestError('Duplicate email');
    } else if (error.message.includes('username')) {
      return new BadRequestError('Duplicate username');
    }
  } else if (error.name === 'JsonWebTokenError') {
    return new UnauthenticatedError('Invalid token');
  } else {
    return new ServerError('Something went wrong!');
  }
};

export default errorHandler;
