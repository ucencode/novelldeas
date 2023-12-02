import 'reflect-metadata'
import { DataSource } from 'typeorm'
import dotenv from 'dotenv'

import { User } from './entities/User'
import { Author } from './entities/Author'
import { Category } from './entities/Category'
import { Book } from './entities/Book'
import { Transaction } from './entities/Transaction'
import { TransactionItem } from './entities/TransactionItem'

dotenv.config()
const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: [User, Author, Category, Book, Transaction, TransactionItem],
  migrations: ['dist/orm/migrations/*.js'],
  subscribers: []
})
dataSource.initialize()

export default dataSource
