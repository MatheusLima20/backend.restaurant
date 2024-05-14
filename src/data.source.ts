import "reflect-metadata"
import { DataSource } from 'typeorm';
import dotenv = require('dotenv');
dotenv.config();

export const dataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '92725323',
    database: 'db_restaurant',
    synchronize: true,
    logging: false,
    entities: [process.env.PATH_ENTITY],
    migrations: [process.env.PATH_MIGRATION],
    subscribers: [process.env.PATH_SUBSCRIBER],
})
