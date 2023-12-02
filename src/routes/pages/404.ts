import { Router } from 'express'

const router = Router()

router.all('*', (req, res, next) => {
  return res.status(404).json({
    message: '404 not found'
  })
})

export default router
