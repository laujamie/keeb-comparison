import { Router } from 'express';
import { isAuthenticated, isAuthorized } from '../middleware/authMiddleware';
import {
  newMatch,
  updateMatchStatus,
  getMatches,
} from '../controllers/matchController';
import { routeHandler } from '../util/routeUtil';

const router = Router();

router.use(isAuthenticated);

router.get('/new', routeHandler(newMatch));

router.post(
  '/:userId/:matchId',
  isAuthorized(['admin'], true),
  routeHandler(updateMatchStatus)
);

router.get('/', isAuthorized(['admin']), routeHandler(getMatches));

export default router;
