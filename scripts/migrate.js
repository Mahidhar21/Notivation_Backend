import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from '../src/config/db.js';
import { logger } from '../src/config/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrationsDir = path.join(__dirname, '..', 'src', 'database', 'migrations');

const runMigrations = async () => {
  try {
    const client = await pool.connect();
    try {
      const files = fs
        .readdirSync(migrationsDir)
        .filter((f) => f.endsWith('.sql'))
        .sort();

      for (const file of files) {
        const filePath = path.join(migrationsDir, file);
        const sql = fs.readFileSync(filePath, 'utf-8');
        logger.info(`Running migration ${file}`);
        await client.query(sql);
      }
      logger.info('Migrations completed');
    } finally {
      client.release();
    }
  } catch (err) {
    logger.error('Migration failed', err);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

runMigrations();

