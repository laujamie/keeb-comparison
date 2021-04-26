import { Router } from 'express';
import { isAuthenticated } from '../middleware/authMiddleware';
import { newUser } from '../controllers/userController';
import { routeHandler } from '../util/routeUtil';

const router = Router();

router.use(isAuthenticated);

router.post('/new', routeHandler(newUser));

export default router;
