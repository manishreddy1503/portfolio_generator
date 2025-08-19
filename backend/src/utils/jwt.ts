import jwt, { SignOptions } from "jsonwebtoken";
import { ENV } from "../config/env";

// make sure ENV.JWT_SECRET is always a string
const JWT_SECRET: string = ENV.JWT_SECRET as string;

export const signToken = (
  payload: object,
  expiresIn: SignOptions["expiresIn"] = "7d"   // 👈 use correct type
) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn } as SignOptions);
};

export const verifyToken = <T = any>(token: string): T | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as T;
  } catch {
    return null;
  }
};
