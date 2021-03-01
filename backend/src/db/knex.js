/**
 * This module provides the configured knex object
 */
const environment = process.env.NODE_ENV || 'development';
const config = require('../../knexfile')[environment];
module.exports = require('knex')(config);
