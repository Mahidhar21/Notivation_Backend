import { logger } from '../config/logger.js';

export const notFoundHandler = (req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
};

export const errorHandler = (err, req, res, next) => {
  logger.error('Error handler caught', err);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

