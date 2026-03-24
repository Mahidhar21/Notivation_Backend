import http from 'http';
import { app } from './app.js';
import { env } from './config/env.js';
import { logger } from './config/logger.js';

const PORT = env.PORT || 4000;

const server = http.createServer(app);

server.listen(PORT, () => {
  logger.info(`Notivation backend listening on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Promise Rejection', err);
});

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception', err);
});

