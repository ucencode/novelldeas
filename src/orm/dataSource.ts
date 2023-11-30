import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "./entities/User";
import { Author } from "./entities/Author";
import { Category } from "./entities/Category";
import { Book } from "./entities/Book";

dotenv.config();
const dataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User, Author, Category, Book],
    migrations: [],
    subscribers: []
});
dataSource.initialize();

export = dataSource;