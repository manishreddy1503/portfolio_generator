import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  PORT: Number(process.env.PORT || 4000),
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  CLIENT_URLS: process.env.CLIENT_URLS ? process.env.CLIENT_URLS.split(',') : ['http://localhost:5173'],
  MONGO_URL: process.env.MONGODB_URI || process.env.MONGO_URL || '',
  JWT_SECRET: process.env.JWT_SECRET || 'dev_jwt_secret_change_me',
  COOKIE_NAME: process.env.COOKIE_NAME || 'portfolio_jwt',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:4000/auth/google/callback'
};

export const ensureEnv = () => {
  const missing: string[] = [];
  if (!ENV.MONGO_URL) missing.push('MONGODB_URI or MONGO_URL');
  if (!ENV.GOOGLE_CLIENT_ID) missing.push('GOOGLE_CLIENT_ID');
  if (!ENV.GOOGLE_CLIENT_SECRET) missing.push('GOOGLE_CLIENT_SECRET');
  if (missing.length) {
    // eslint-disable-next-line no-console
    console.warn(`Missing env vars: ${missing.join(', ')}`);
  }
};

ensureEnv();


