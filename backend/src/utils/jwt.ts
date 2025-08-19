import jwt, { SignOptions } from "jsonwebtoken";
import { ENV } from "../config/env";

const JWT_SECRET = ENV.JWT_SECRET as string;

export const signToken = (payload: object, expiresIn: string | number = "7d") => {
  const options: SignOptions = { expiresIn: expiresIn as any }; // 👈 force cast
  return jwt.sign(payload, JWT_SECRET, options);
};


export const verifyToken = <T = any>(token: string): T | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as T;
  } catch {
    return null;
  }
};
