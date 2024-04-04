import { DataSource } from 'typeorm';
import dotenv = require('dotenv');
dotenv.config();

export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
   logging: false,
   "entities": [
      process.env.PATH_ENTITY
   ],
   "migrations": [
      process.env.PATH_MIGRATION
   ],
   "subscribers": [
      process.env.PATH_SUBSCRIBER
   ],
});
