import { Request, Response } from 'express';
import SwitchModel from '../models/SwitchModel';
import MatchModel from '../models/MatchModel';
import { AuthRequest } from '../types/auth';
import AuthenticationError from '../errors/AuthenticationError';
import { calculateElo } from '../util/eloUtil';
import AuthorizationError from '../errors/AuthorizationError';
import MatchCompletedError from '../errors/MatchCompletedError';
import { getRandomInt } from '../util/numberUtil';

export const newMatch = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    throw new AuthenticationError();
  }
  const switches = await SwitchModel.query().where({ isVerified: 1 });
  const maxIdx = switches.length - 1;
  const idxOne = getRandomInt(0, maxIdx);
  let idxTwo = getRandomInt(0, maxIdx);
  while (idxTwo === idxOne) idxTwo = getRandomInt(0, maxIdx);
  const [switchOne, switchTwo] = [switches[idxOne], switches[idxTwo]];
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
  const [switchOne, switchTwo] = await Promise.all([
    SwitchModel.query().findById(match.switchOneId),
    SwitchModel.query().findById(match.switchTwoId),
    match
      .$query()
      .patch({ completedDate: new Date().toISOString(), switchOneWin }),
  ]);
  const [oldEloOne, oldEloTwo] = [switchOne.elo, switchTwo.elo];
  const [updatedSwitchOne, updatedSwitchTwo] = await Promise.all([
    switchOne.$query().patchAndFetch({
      elo: calculateElo(oldEloOne, oldEloTwo, switchOneWin),
      numMatches: switchOne.numMatches + 1,
    }),
    switchTwo.$query().patchAndFetch({
      elo: calculateElo(oldEloTwo, oldEloOne, !switchOneWin),
      numMatches: switchTwo.numMatches + 1,
    }),
  ]);
  return res.json({
    switchOne: updatedSwitchOne,
    switchTwo: updatedSwitchTwo,
  });
};

export const getMatches = async (req: Request, res: Response) => {
  const matches = await MatchModel.query();
  return res.json({ matches });
};
