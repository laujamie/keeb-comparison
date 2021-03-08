import { Request, Response } from 'express';
import SwitchModel from '../models/SwitchModel';
import MatchModel from '../models/MatchModel';
import { AuthRequest } from '../types/auth';
import AuthenticationError from '../errors/AuthenticationError';
import { calculateElo } from '../util/eloUtil';
import AuthorizationError from '../errors/AuthorizationError';
import MatchCompletedError from '../errors/MatchCompletedError';

export const newMatch = async (req: AuthRequest, res: Response) => {
  const [switchOne, switchTwo] = await SwitchModel.query()
    .orderByRaw('random()')
    .limit(2);
  if (!req.user) {
    throw new AuthenticationError();
  }
  const previousMatches = await MatchModel.query()
    .where('uid', '=', req.user.sub)
    .whereNull('completedDate');
  if (previousMatches.length > 0)
    return res.json({
      match: previousMatches[0],
    });
  const match = await MatchModel.query().insert({
    switchOneId: switchOne.id,
    switchTwoId: switchTwo.id,
    uid: req.user.sub,
  });
  return res.json({
    match,
  });
};

export const updateMatchStatus = async (req: Request, res: Response) => {
  const { switchOneWin } = req.body;
  const { userId, matchId } = req.params;
  const match = await MatchModel.query().findById(matchId);
  if (match.uid !== userId) throw new AuthorizationError(userId);
  if (match.completedDate) throw new MatchCompletedError(matchId);
  await match
    .$query()
    .patch({ completedDate: new Date().toISOString(), switchOneWin });
  const [switchOne, switchTwo] = await SwitchModel.query().findByIds([
    match.switchOneId,
    match.switchTwoId,
  ]);
  const [oldEloOne, oldEloTwo] = [switchOne.elo, switchTwo.elo];
  const updatedSwitchOne = await switchOne
    .$query()
    .patchAndFetch({ elo: calculateElo(oldEloOne, oldEloTwo, switchOneWin) });
  const updatedSwitchTwo = await switchTwo
    .$query()
    .patchAndFetch({ elo: calculateElo(oldEloTwo, oldEloOne, !switchOneWin) });
  return res.json({
    switchOne: updatedSwitchOne,
    switchTwo: updatedSwitchTwo,
  });
};

export const getMatches = async (req: Request, res: Response) => {
  const matches = await MatchModel.query();
  return res.json({ matches });
};
