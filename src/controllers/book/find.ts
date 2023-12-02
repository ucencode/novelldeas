import { Request, Response, NextFunction } from 'express'
import { Book } from '../../orm/entities/Book'
import dataSource from '../../orm/dataSource'
import { successResponse, errorResponse } from '../../utils/response'

export const find = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  try {
    const user = await dataSource.getRepository(Book).findOne({ where: { id: parseInt(id) } })
    if (!user) {
      return errorResponse(res, 404, 'Book not found')
    }

    return successResponse(res, 200, 'Book Found', user)
  } catch (error) {
    return errorResponse(res, 500, 'Internal server error')
  }
}
