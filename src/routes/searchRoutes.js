import express from 'express';
import * as searchController from '../controllers/searchController.js';
import { authenticateOptional } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/search', authenticateOptional, searchController.searchNotes);

export default router;

