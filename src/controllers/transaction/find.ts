import { Request, Response, NextFunction } from 'express'
import { Transaction } from '../../orm/entities/Transaction'
import dataSource from '../../orm/dataSource'
import { successResponse, errorResponse } from '../../utils/response'

export const find = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  try {
    const user = await dataSource.getRepository(Transaction).findOne({ where: { id: parseInt(id) } })
    if (!user) {
      return errorResponse(res, 404, 'Transaction not found')
    }

    return successResponse(res, 200, 'Transaction Found', user)
  } catch (error) {
    return errorResponse(res, 500, 'Internal server error')
  }
}
