import { Router } from 'express'
import { list, find, create, update, destroy, adjustStock } from '../controllers/book'

import { checkJwt } from '../middlewares/checkJwt'
import { validate } from '../middlewares/validator/validate'
import { bookValidationRules, adjustStockValidationRules } from '../middlewares/validator/bookValidationRules'

const router = Router()

router.get('/', [checkJwt], list)
router.get('/:id', [checkJwt], find)
router.post('/', bookValidationRules, [checkJwt, validate], create)
router.patch('/:id', bookValidationRules, [checkJwt, validate], update)
router.patch('/:id/adjust-stock', adjustStockValidationRules, [checkJwt, validate], adjustStock)
router.delete('/:id', [checkJwt], destroy)

export = router
