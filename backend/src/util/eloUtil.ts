const ELO_FACTOR = 10;

/**
 * Calculates the new elo of player one given the result of the match
 * @param {number} oldEloOne Old elo of player one
 * @param {number} oldEloTwo Old elo of player two
 * @param {boolean} isOneWin Result of the match
 */
export const calculateElo = (
  oldEloOne: number,
  oldEloTwo: number,
  isOneWin: boolean
) => {
  const expectedScore = 1 / (1 + Math.pow(10, (oldEloTwo - oldEloOne) / 400));
  const score = isOneWin ? 1 : 0;
  return oldEloOne + ELO_FACTOR * (score - expectedScore);
};
