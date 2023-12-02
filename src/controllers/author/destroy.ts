import { Request, Response, NextFunction } from 'express'
import { Author } from '../../orm/entities/Author'
import dataSource from '../../orm/dataSource'
import { successResponse, errorResponse } from '../../utils/response'

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  try {
    const author = await dataSource.getRepository(Author).findOne({ where: { id: parseInt(id) } })

    if (!author) {
      return errorResponse(res, 404, 'Author not found')
    }

    await dataSource.getRepository(Author).remove(author)
    return successResponse(res, 200, 'Author deleted successfully', author)
  } catch (error) {
    return errorResponse(res, 500, 'Internal server error')
  }
}
