import express from 'express';
import * as graphController from '../controllers/graphController.js';
import { authenticateOptional, authenticate } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { edgeSchema } from '../validators/edgeValidator.js';

const router = express.Router();

router.get('/', authenticateOptional, graphController.getGraph);
router.post('/edge', authenticate, validate(edgeSchema), graphController.createEdge);
router.delete('/edge', authenticate, graphController.deleteEdge);

export default router;

