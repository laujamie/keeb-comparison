const ELO_FACTOR = 10;

/**
 * Calculates the new elo of player one given the result of the match
 * @param {number} oldEloOne
 * @param {number} oldEloTwo
 * @param {boolean} isOneWin
 */
exports.calculateElo = (oldEloOne, oldEloTwo, isOneWin) => {
  const expectedScore = 1 / (1 + Math.pow(10, (oldEloTwo - oldEloOne) / 400));
  const score = isOneWin ? 1 : 0;
  return oldEloOne + ELO_FACTOR * (score - expectedScore);
};
