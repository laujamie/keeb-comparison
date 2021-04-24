/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * @param min Minimum number of range
 * @param max Maximum number of range
 * @returns Random integer within range
 */
export function getRandomInt(min: number, max: number) {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(Math.random() * (newMax - newMin + 1)) + newMin;
}
