import { Router } from 'express';

import page404 from './pages/404';
import pageRoot from './pages/root';

import user from './user';
import auth from './auth';

const router = Router();

router.use('/', auth);
router.use('/users', user);

router.use(pageRoot);
router.use(page404);

export = router;
