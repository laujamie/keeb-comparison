import { Request } from 'express';
import { DecodedIdToken } from '../util/firebaseAdmin';

export interface AuthRequest extends Request {
  user?: DecodedIdToken;
}

export type UserRole = 'user' | 'admin';
