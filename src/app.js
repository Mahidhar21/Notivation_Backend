import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';
import { rateLimiter } from './middleware/rateLimitMiddleware.js';
import { errorHandler, notFoundHandler } from './middleware/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import notesRoutes from './routes/notesRoutes.js';
import graphRoutes from './routes/graphRoutes.js';
import tagsRoutes from './routes/tagsRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN || '*',
    credentials: true
  })
);
app.use(express.json());
app.use(morgan('dev'));
app.use(rateLimiter);

app.use('/auth', authRoutes);
app.use('/notes', notesRoutes);
app.use('/graph', graphRoutes);
app.use('/tags', tagsRoutes);
app.use('/notes', searchRoutes);
app.use('/ai', aiRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'notivation-backend' });
});

app.use(notFoundHandler);
app.use(errorHandler);

