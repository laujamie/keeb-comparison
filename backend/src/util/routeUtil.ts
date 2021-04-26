import { Request, Response, NextFunction, Handler } from 'express';

export const routeHandler = (fn: Handler): Handler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await fn(req, res, next);
    } catch (e) {
      next(e);
    }
  };
};
