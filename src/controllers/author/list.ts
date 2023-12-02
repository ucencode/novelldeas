import { Request, Response, NextFunction } from 'express'
import { Author } from '../../orm/entities/Author'
import dataSource from '../../orm/dataSource'
import { successResponse, errorResponse } from '../../utils/response'

export const list = async (req: Request, res: Response) => {
  try {
    const categories = await dataSource.getRepository(Author).find()

    const message = categories.length > 0 ? 'Authors Found' : 'No Authors Found'
    return successResponse(res, 200, message, categories)
  } catch (error) {
    return errorResponse(res, 500, 'Internal server error')
  }
}
