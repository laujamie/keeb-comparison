import * as dotenv from 'dotenv';
import { knexSnakeCaseMappers } from 'objection';
dotenv.config();

export type Config = {
  [key: string]: any;
};

const config: Config = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
    ...knexSnakeCaseMappers(),
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 20,
    },
    migrations: {
      directory: './src/data/migrations',
    },
    seeds: {
      directory: './src/data/seeds',
    },
    ...knexSnakeCaseMappers(),
  },
};

module.exports = config;
export default config;
