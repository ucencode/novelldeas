import { Request, Response, NextFunction } from 'express'
import { Book } from '../../orm/entities/Book'
import dataSource from '../../orm/dataSource'
import { successResponse, errorResponse } from '../../utils/response'

export const adjustStock = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  try {
    const { stock } = req.body
    const bookRepository = dataSource.getRepository(Book)

    const book = await bookRepository.findOne({ where: { id: parseInt(id) } })
    if (!book) {
      return errorResponse(res, 404, 'Book not found')
    }

    book.stock = stock
    await bookRepository.save(book)

    // get updated book
    const updatedBook = await bookRepository.findOne({ where: { id: parseInt(id) } })

    return successResponse(res, 200, 'Book stock adjusted successfully', updatedBook)
  } catch (error) {
    return errorResponse(res, 500, 'Internal server error')
  }
}
