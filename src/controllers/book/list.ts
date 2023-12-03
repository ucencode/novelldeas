import { Request, Response, NextFunction } from 'express'
import { SelectQueryBuilder } from 'typeorm'
import { Book } from '../../orm/entities/Book'
import dataSource from '../../orm/dataSource'
import { successResponse, errorResponse } from '../../utils/response'
import paginate from '../../utils/paginate'

export const list = async (req: Request, res: Response) => {
  const search = req.query.search as string
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.perPage) || 10

  try {
    const bookQueryBuilder = getBookQueryBuilder(search)
    const books = await paginate(bookQueryBuilder, { page, limit })

    const message = books.result.length > 0 ? 'Books successfully retrieved' : 'No books found'
    return successResponse(res, 200, message, books)
  } catch (error) {
    return errorResponse(res, 500, 'Internal server error')
  }
}

const getBookQueryBuilder = (search?: string): SelectQueryBuilder<Book> => {
  const queryBuilder = dataSource.getRepository(Book)
    .createQueryBuilder('book')
    .innerJoinAndSelect('book.category', 'category')
    .innerJoinAndSelect('book.author', 'author')
  if (search) {
    queryBuilder.where('book.title LIKE :search', { search: `%${search}%` })
  }
  return queryBuilder
}
