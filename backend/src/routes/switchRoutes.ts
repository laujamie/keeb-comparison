import { Router } from 'express';
import { isAuthenticated, isAuthorized } from '../middleware/authMiddleware';
import {
  addSwitch,
  approveSwitch,
  getSwitches,
  getSwitch,
} from '../controllers/switchController';

const router = Router();

router.post('/new', isAuthenticated, addSwitch);

router.post(
  '/:userId/verify',
  [isAuthenticated, isAuthorized(['admin'])],
  approveSwitch
);

router.get('/:id', getSwitch);

router.get('/', getSwitches);

export default router;
