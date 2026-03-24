import express from 'express';
import * as notesController from '../controllers/notesController.js';
import { authenticateOptional, authenticate } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { createNoteSchema, updateNoteSchema } from '../validators/noteValidator.js';

const router = express.Router();

router.get('/', authenticateOptional, notesController.getNotes);
router.post('/', authenticate, validate(createNoteSchema), notesController.createNote);
router.get('/:id', authenticateOptional, notesController.getNoteById);
router.put('/:id', authenticate, validate(updateNoteSchema), notesController.updateNote);
router.delete('/:id', authenticate, notesController.deleteNote);
router.post('/:id/fork', authenticate, notesController.forkNote);
router.get('/:id/neighbors', authenticateOptional, notesController.getNeighbors);
router.get('/:id/explore', authenticateOptional, notesController.exploreGraph);

export default router;

