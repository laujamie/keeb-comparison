import { Response } from 'express';
import { initializeUser } from '../util/firebaseAdmin';
import { AuthRequest } from '../types/auth';
import AuthenticationError from '../errors/AuthenticationError';

export const newUser = async (req: AuthRequest, res: Response) => {
  if (!req.user) throw new AuthenticationError();
  await initializeUser(req.user.sub);
  return res.json({
    message: 'User initialized successfully',
  });
};
