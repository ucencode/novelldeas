import { Request, Response, NextFunction } from 'express'
import { Category } from '../../orm/entities/Category'
import dataSource from '../../orm/dataSource'
import { successResponse, errorResponse } from '../../utils/response'

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  try {
    const category = await dataSource.getRepository(Category).findOne({ where: { id: parseInt(id) } })

    if (!category) {
      return errorResponse(res, 404, 'Category not found')
    }

    await dataSource.getRepository(Category).remove(category)
    return successResponse(res, 200, 'Category deleted successfully', category)
  } catch (error) {
    return errorResponse(res, 500, 'Internal server error')
  }
}
