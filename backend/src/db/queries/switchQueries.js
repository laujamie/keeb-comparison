const knex = require('../knex');
const {
  DEFAULT_ELO,
  DEFAULT_MATCHES,
} = require('../../constants/switchConstants');

const createSwitch = (
  name,
  description,
  elo = DEFAULT_ELO,
  numMatches = DEFAULT_MATCHES
) => {
  return knex('switch').insert({ name, description, elo, numMatches });
};

const findSwitchById = (id) => {
  return knex('switch').where('id', '=', id);
};

/**
 * Get limit number of random switches from the database
 * @param {number} limit Limit of switches to retrieve
 */
const getRandomSwitches = (limit = 2) => {
  return knex('switch').orderByRaw('random()').limit(limit);
};

module.exports = { createSwitch, findSwitchById, getRandomSwitches };
