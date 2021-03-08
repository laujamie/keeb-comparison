import { Router } from 'express';
import { isAuthenticated, isAuthorized } from '../middleware/authMiddleware';
import {
  addSwitch,
  approveSwitch,
  getSwitches,
} from '../controllers/switchController';

const router = Router();

router.use(isAuthenticated);

router.post('/new', addSwitch);

router.post('/:userId/verify', isAuthorized(['admin']), approveSwitch);

router.get('/', getSwitches);

export default router;
