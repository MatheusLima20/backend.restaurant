import "reflect-metadata";
import { DataSource } from "typeorm";
import { IDatabase } from "./interface/database.interface";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import dotenv = require("dotenv");
dotenv.config();

type DatabaseType = "mysql" | "mariadb";

const databaseType: DatabaseType = process.env.DB_TYPE as DatabaseType;

const config: MysqlConnectionOptions = {
    type: databaseType,
    host: process.env.DB_HOST,
    port: Number.parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [process.env.PATH_ENTITY],
    migrations: [process.env.PATH_MIGRATION],
    subscribers: [process.env.PATH_SUBSCRIBER],
};

class DatabaseClass implements IDatabase {
    connection: DataSource;

    constructor() {
        this.config();
    }

    private config(): void {
        this.connection = new DataSource(config);
    }
    start(): void {
        this.connection.initialize();
    }
}

export const databaseClass = new DatabaseClass();

export const dataSource = databaseClass.connection;
