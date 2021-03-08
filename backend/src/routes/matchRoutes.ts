import { Router } from 'express';
import { isAuthenticated, isAuthorized } from '../middleware/authMiddleware';
import {
  newMatch,
  updateMatchStatus,
  getMatches,
} from '../controllers/matchController';

const router = Router();

router.use(isAuthenticated);

router.get('/new', newMatch);

router.post(
  '/:userId/:matchId',
  isAuthorized(['admin'], true),
  updateMatchStatus
);

router.get('/', isAuthorized(['admin']), getMatches);

export default router;
