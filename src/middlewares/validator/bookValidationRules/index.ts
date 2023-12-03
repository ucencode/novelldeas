import { body, query } from 'express-validator'
import dataSource from '../../../orm/dataSource'
import { Category } from '../../../orm/entities/Category'
import { Author } from '../../../orm/entities/Author'

export const bookValidationRules = [
  body('title').notEmpty().withMessage('Title is required'),

  body('category')
    .optional()
    .isNumeric().withMessage('Category must be a number')
    .custom(async (value, {req}) => {
      if (!value) {
        if (req.method === 'POST') {
          throw new Error('Category is required')
        }
      } else {
        const category = await dataSource.getRepository(Category).findOne({ where: { id: parseInt(value) } })
        if (!category) {
          throw new Error('Category does not exist')
        }
      }
      return true
    }),

  body('author')
    .notEmpty().withMessage('Author is required')
    .custom(async (value) => {
      const author = await dataSource.getRepository(Author).findOne({ where: { id: parseInt(value) } })
      if (!author) {
        throw new Error('Author must be valid')
      }
      return true
    }),

  body('isbn')
    .notEmpty().withMessage('ISBN is required')
    .custom((value) => {
      // const regex = new RegExp('^(97(8|9))?\\d{9}(\\d|X)$')
      // digit between 10 and 13
      const regex = /^[0-9]{10,13}$/
      if (!regex.test(value)) {
        throw new Error('ISBN must be valid')
      }
      return true
    }),

  // numeric
  body('price')
    .notEmpty().withMessage('Price is required')
    .isNumeric().withMessage('Price must be numeric')
    .isFloat({ min: 0 }).withMessage('Price cannot be negative number'),

  body('stock')
    .custom((value, { req }) => {
      if (req.method === 'POST' && !value) {
        throw new Error('Stock is required')
      }
      if (value && isNaN(value)) {
        throw new Error('Stock must be numeric')
      }
      if (value && value < 0) {
        throw new Error('Stock cannot be negative number')
      }
      return true
    })
]

export const adjustStockValidationRules = [
  body('stock')
    .notEmpty().withMessage('Stock is required')
    .isNumeric().withMessage('Stock must be numeric')
    .isFloat({ min: 0 }).withMessage('Stock cannot be negative number')
]

export const searchBookValidationRules = [
  query('search')
    .optional(),

  query('page')
    .optional()
    .custom((value) => {
      if (value) {
        if (isNaN(value)) {
          throw new Error('"page" must be numeric')
        }
      }
      return true
    }),

  query('perPage')
    .optional()
    .custom((value) => {
      if (value) {
        if (isNaN(value)) {
          throw new Error('"perPage" must be numeric')
        }
      }
      return true
    })
]
