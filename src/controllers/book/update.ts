import { Request, Response, NextFunction } from 'express'
import { Book } from '../../orm/entities/Book'
import dataSource from '../../orm/dataSource'
import { successResponse, errorResponse } from '../../utils/response'

export const update = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  try {
    const { title, category, author, isbn, price, stock } = req.body
    const bookRepository = dataSource.getRepository(Book)

    const book = await bookRepository.findOne({ where: { id: parseInt(id) } })
    if (!book) {
      return errorResponse(res, 404, 'Book not found')
    }

    book.title = title
    book.category = category
    book.author = author
    book.isbn = isbn
    book.price = price
    book.stock = stock
    await bookRepository.save(book)

    return successResponse(res, 200, 'Book updated successfully', book)
  } catch (error) {
    return errorResponse(res, 500, 'Internal server error')
  }
}
