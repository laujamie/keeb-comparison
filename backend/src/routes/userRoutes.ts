import { Router } from 'express';
import { isAuthenticated } from '../middleware/authMiddleware';
import { newUser } from '../controllers/userController';

const router = Router();

router.use(isAuthenticated);

router.post('/new', newUser);

export default router;
