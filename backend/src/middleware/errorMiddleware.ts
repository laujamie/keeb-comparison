import { Request, Response, NextFunction } from 'express';
import BaseError from '../errors/BaseError';

const errorMiddleware = (
  err: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusCode, message } = err;
  res.status(statusCode || 500).json({
    message: message || 'Something went wrong',
  });
};

export default errorMiddleware;
