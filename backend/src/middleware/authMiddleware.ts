import { Response, NextFunction } from 'express';
import { verifyToken } from '../util/firebaseAdmin';
import { AuthRequest, UserRole } from '../types/auth';
import AuthenticationError from '../errors/AuthenticationError';
import AuthorizationError from '../errors/AuthorizationError';

/**
 * Auth middleware to check if user is authenticated
 */
export const isAuthenticated = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw Error('Authorization header must be provided');
    }
    const [bearerText, token] = authHeader.split(' ');
    if (bearerText !== 'Bearer') {
      throw Error('Authorization header must be provided in Bearer format');
    }
    if (!token) {
      throw Error('A valid authorization token must be provided');
    }
    const decodedToken = await verifyToken(token);
    req.user = decodedToken;
    next();
  } catch (e) {
    throw new AuthenticationError(e.message);
  }
};

/**
 * Auth middleware to check if user is authorized to access a resource
 *
 * @param validRoles Array containing authorized roles
 * @param allowSameUser Boolean to allow same user on route
 */
export const isAuthorized = (
  validRoles: UserRole[],
  allowSameUser: boolean = false
) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const { user } = req;
    const { id } = req.params;

    if (!user) throw new AuthenticationError();

    if (allowSameUser && user.sub === id) return next();
    if (!user.role || !validRoles.includes(user.role)) {
      throw new AuthorizationError(user.sub);
    }

    return next();
  };
};
