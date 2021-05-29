import { Request, Response, NextFunction, Handler } from 'express';

// TODO: Fix this type issue
export const routeHandler = (fn: any): Handler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await fn(req, res, next);
    } catch (e) {
      next(e);
    }
  };
};
