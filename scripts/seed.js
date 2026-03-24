import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from '../src/config/db.js';
import { logger } from '../src/config/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedFile = path.join(__dirname, '..', 'src', 'database', 'seeds', 'seedData.sql');

const runSeed = async () => {
  try {
    const client = await pool.connect();
    try {
      const sql = fs.readFileSync(seedFile, 'utf-8');
      logger.info('Running seed data');
      await client.query(sql);
      logger.info('Seeding completed');
    } finally {
      client.release();
    }
  } catch (err) {
    logger.error('Seeding failed', err);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

runSeed();

