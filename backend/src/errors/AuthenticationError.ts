import BaseError from './BaseError';

class AuthenticationError extends BaseError {
  constructor(message?: string) {
    super(message || 'User is not authenticated', 401);
  }
}

export default AuthenticationError;
