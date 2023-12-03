import { Request, Response, NextFunction } from 'express'
import { SelectQueryBuilder } from 'typeorm'
import { Transaction } from '../../orm/entities/Transaction'
import dataSource from '../../orm/dataSource'
import { successResponse, errorResponse } from '../../utils/response'
import paginate from '../../utils/paginate'

export const list = async (req: Request, res: Response) => {
  const date = req.query.date as string
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.perPage) || 10

  console.log('page', page)

  try {
    const transactionQueryBuilder = getSelectQueryBuilder(date)
    const transactions = await paginate(transactionQueryBuilder, { page, limit })

    const message = transactions.result.length > 0 ? 'Transactions successfully retrieved' : 'No transactions found'
    return successResponse(res, 200, message, transactions)
  } catch (error) {
    return errorResponse(res, 500, 'Internal server error')
  }
}

const getSelectQueryBuilder = (date?: string): SelectQueryBuilder<Transaction> => {
  const queryBuilder = dataSource.getRepository(Transaction)
    .createQueryBuilder('transaction')
    .innerJoinAndSelect('transaction.itemIds', 'itemIds')
  if (date) {
    queryBuilder.where('DATE(transaction.createdAt) = :date', { date })
  }
  return queryBuilder
}
