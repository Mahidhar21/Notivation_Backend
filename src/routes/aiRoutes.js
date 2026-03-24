import express from 'express';
import * as aiController from '../controllers/aiController.js';

const router = express.Router();

router.post('/format-notes', aiController.formatNotes);

export default router;

