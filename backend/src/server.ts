import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import dotenv from 'dotenv';
import { AppDataSource } from './config/data-source';
import { ENV } from './config/env';
import './config/passport';
import authRouter from './routes/auth';
import userRouter from './routes/user';
import portfolioRouter from './routes/portfolio';
import uploadRouter from './routes/upload';

dotenv.config();

const app = express();

app.use(cors({
  origin: ENV.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/auth', authRouter);
app.use('/api', userRouter);
app.use('/api', portfolioRouter);
app.use('/api', uploadRouter);

const start = async () => {
  try {
    await AppDataSource.initialize();
    app.listen(ENV.PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Backend listening on http://localhost:${ENV.PORT}`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server', err);
    process.exit(1);
  }
};

start();


