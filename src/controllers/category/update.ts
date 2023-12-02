import { Request, Response, NextFunction } from 'express'
import { Category } from '../../orm/entities/Category'
import dataSource from '../../orm/dataSource'
import { successResponse, errorResponse } from '../../utils/response'

export const update = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const { name, description } = req.body

  try {
    const categoryRepository = dataSource.getRepository(Category)

    const category = await categoryRepository.findOne({ where: { id: parseInt(id) } })
    if (!category) {
      return errorResponse(res, 404, 'Category not found')
    }

    category.name = name
    category.description = description
    await categoryRepository.save(category)

    return successResponse(res, 200, 'Category updated successfully', category)
  } catch (error) {
    return errorResponse(res, 500, 'Internal server error')
  }
}
