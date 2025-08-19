import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';

export const signToken = (payload: object, expiresIn = '7d') => {
  return jwt.sign(payload, ENV.JWT_SECRET, { expiresIn });
};

export const verifyToken = <T = any>(token: string): T | null => {
  try {
    return jwt.verify(token, ENV.JWT_SECRET) as T;
  } catch {
    return null;
  }
};


