import { Router } from 'express';

const router = Router();

router.get('*', (req, res, next) => {
  return res.status(404).json({
    message: "404 not found"
  });
});

export default router;