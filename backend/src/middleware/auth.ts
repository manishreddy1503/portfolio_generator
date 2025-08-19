import { Request, Response, NextFunction } from 'express';
import { ENV } from '../config/env';
import { verifyToken } from '../utils/jwt';

export type AuthPayload = {
  userId: string;
};

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies[ENV.COOKIE_NAME] || '';
  const payload = verifyToken<AuthPayload>(token);
  if (!payload?.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  (req as any).userId = payload.userId;
  next();
};


