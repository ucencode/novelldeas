import { Router } from 'express'

const router = Router()

router.get('/', (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'This app is worked'
  })
})

export default router
