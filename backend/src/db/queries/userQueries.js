const knex = require('../knex');

/**
 * Create a new user in the users table
 * @param {string} email Email of the user
 * @param {string} sub Firebase user id
 */
const createUser = async (email, sub) => {
  knex('user').insert({ email, sub });
};

module.exports = { createUser };
