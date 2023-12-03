import { type SelectQueryBuilder } from 'typeorm'
import { type PaginationOptions, type PaginationResult } from '../types/Pagination'

export default async <T>(selectQueryBuilder: SelectQueryBuilder<T>, options: PaginationOptions): Promise<PaginationResult> => {
  const { page, limit } = options

  const result = await selectQueryBuilder
    .skip((page - 1) * limit)
    .take(limit)
    .getMany()
  const totalRecords = await selectQueryBuilder.getCount()

  return { result, totalRecords }
}
