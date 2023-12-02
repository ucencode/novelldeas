import { Request, Response, NextFunction } from 'express'
import dataSource from "../../orm/dataSource"
import { Category } from "../../orm/entities/Category"
import { errorResponse, successResponse } from '../../utils/response'

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const { name, description } = req.body
  
  try {
    const categoryRepository = dataSource.getRepository(Category)

    const category = new Category()
    category.name = name
    category.description = description
    await categoryRepository.save(category)

    return successResponse(res, 200, "Category created successfully", category)
  } catch (err) {
    return errorResponse(res, 500, "Internal server error")
  }
}