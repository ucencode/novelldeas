import { Router } from 'express'
import { register, login, changePassword } from '../controllers/auth'
import { checkJwt } from '../middlewares/checkJwt'
import { validate } from '../middlewares/validator/validate'
import { registerValidationRules, loginValidationRules, changePasswordValidationRules } from '../middlewares/validator/authValidationRules'

const router = Router()

router.post('/register', registerValidationRules, [validate], register)
router.post('/login', loginValidationRules, [validate], login)
router.post('/change-password', changePasswordValidationRules, [checkJwt, validate], changePassword)

export = router
