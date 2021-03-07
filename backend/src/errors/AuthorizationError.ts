import BaseError from './BaseError';

class AuthorizationError extends BaseError {
  constructor(id: string) {
    super(`User with ${id} is not authorized to perform this action`, 401);
  }
}

export default AuthorizationError;
