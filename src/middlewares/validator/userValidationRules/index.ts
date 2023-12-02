import { body } from 'express-validator'
import { User } from '../../../orm/entities/User'
import dataSource from '../../../orm/dataSource'

export const userValidationRules = [
  body('firstName')
    .notEmpty().withMessage('First name is required'),

  body('lastName')
    .notEmpty().withMessage('Last name is required'),

  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email is not valid')
    .normalizeEmail()
    .custom(async (value, { req }) => {
      const user = await dataSource.getRepository(User).findOne({ where: { email: value } })
      if (!!user) {
        if (req.params.id && user.id === req.params.id) {
          return
        }
        throw new Error('Email already in use')
      }
    }),

  body('password')
    .custom((value, { req }) => {
      if (!req.params.id) {
        if (!value) {
          throw new Error('Password is required')
        }
        if (value.length < 8) {
          throw new Error('Password must be at least 8 characters')
        }
      }
      return true
    })
]
