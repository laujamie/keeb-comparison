import BaseError from './BaseError';

class MatchCompletedError extends BaseError {
  constructor(matchId: string) {
    super(`Match with id ${matchId} has already been completed`, 400);
  }
}

export default MatchCompletedError;
