import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { ENV } from './env';
import { User } from '../entities/User';
import { Portfolio } from '../entities/Portfolio';

export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: ENV.MONGO_URL,
  entities: [User, Portfolio],
  synchronize: true,
  logging: false
});


