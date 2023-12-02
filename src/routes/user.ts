import { Router, Request, Response } from 'express'
import { list, find, create, update, destroy } from '../controllers/user'

import { checkJwt } from '../middlewares/checkJwt'
import { validate } from '../middlewares/validator/validate'
import { userValidationRules } from '../middlewares/validator/userValidationRules'

const router = Router()

router.get('/', [checkJwt], list)
router.get('/:id', [checkJwt], find)
router.post('/', userValidationRules, [checkJwt, validate], create)
router.patch('/:id', userValidationRules, [checkJwt, validate], update)
router.delete('/:id', [checkJwt], destroy)

export = router