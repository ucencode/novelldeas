import { Router } from 'express'

import page404 from './pages/404'
import pageRoot from './pages/root'

import user, { route } from './user'
import auth from './auth'
import book from './book'
import author from './author'
import category from './category'
import transaction from './transaction'

const router = Router()

router.use('/', auth)
router.use('/users', user)
router.use('/books', book)
router.use('/authors', author)
router.use('/categories', category)
router.use('/transactions', transaction)

router.use(pageRoot)
router.use(page404)

export = router
