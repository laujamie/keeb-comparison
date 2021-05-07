import { Router } from 'express';
import { isAuthenticated, isAuthorized } from '../middleware/authMiddleware';
import {
  addSwitch,
  approveSwitch,
  getSwitches,
  getSwitch,
  getUnapprovedSwitches,
} from '../controllers/switchController';
import { routeHandler } from '../util/routeUtil';

const router = Router();

router.post('/new', isAuthenticated, routeHandler(addSwitch));

router.post(
  '/:id/verify',
  [isAuthenticated, isAuthorized(['admin'])],
  routeHandler(approveSwitch)
);

router.get(
  '/pending',
  [isAuthenticated, isAuthorized(['admin'])],
  routeHandler(getUnapprovedSwitches)
);

router.get('/:id', routeHandler(getSwitch));

router.get('/', routeHandler(getSwitches));

export default router;
