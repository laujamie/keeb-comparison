const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './src//data/migrations',
    },
    seeds: {
      directory: './src/data/seeds',
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './src/data/migrations',
    },
    seeds: {
      directory: './src/data/seeds',
    },
  },
};
