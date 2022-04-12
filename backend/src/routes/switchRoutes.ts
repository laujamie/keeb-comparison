import { Router } from 'express';
import { isAuthenticated, isAuthorized } from '../middleware/authMiddleware';
import {
  addSwitch,
  approveSwitch,
  getSwitches,
  getSwitch,
  getUnapprovedSwitches,
  removeSwitch,
} from '../controllers/switchController';
import { routeHandler } from '../util/routeUtil';
import { ADMIN } from '../types/auth';

const router = Router();

router.post('/new', isAuthenticated, routeHandler(addSwitch));

router.post(
  '/:id/verify',
  [isAuthenticated, isAuthorized([ADMIN])],
  routeHandler(approveSwitch)
);

router.delete(
  '/:id',
  [isAuthenticated, isAuthorized([ADMIN])],
  routeHandler(removeSwitch)
);

router.get(
  '/pending',
  [isAuthenticated, isAuthorized(['admin'])],
  routeHandler(getUnapprovedSwitches)
);

router.get('/:id', routeHandler(getSwitch));

router.get('/', routeHandler(getSwitches));

export default router;
