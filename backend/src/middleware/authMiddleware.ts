import { Response, NextFunction } from 'express';
import { verifyToken } from '../util/firebaseAdmin';
import { AuthRequest, UserRole } from '../types/auth';

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
    res.status(401).json({
      error: e.message || new Error('Invalid request!'),
    });
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
  allowSameUser: boolean
) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const { user } = req;
    const { id } = req.params;

    if (!user)
      return res.status(401).json({
        error: 'User is not authenticated',
      });

    if (allowSameUser && user.sub === id) return next();
    if (!user.role || !validRoles.includes(user.role)) {
      return res.status(401).json({
        error: 'User is not authorized to perform this action',
      });
    }
    return next();
  };
};
