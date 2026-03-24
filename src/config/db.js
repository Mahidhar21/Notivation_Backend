import pg from 'pg';
import { env } from './env.js';
import { logger } from './logger.js';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: env.DATABASE_URL
});

pool.on('error', (err) => {
  logger.error('Unexpected PG pool error', err);
});

export const query = async (text, params) => {
  return pool.query(text, params);
};

