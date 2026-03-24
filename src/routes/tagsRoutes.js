import express from 'express';
import * as tagsController from '../controllers/tagsController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', tagsController.getTags);
router.post('/', authenticate, tagsController.createTag);
router.post('/:id/tags', authenticate, tagsController.addTagsToNote);

export default router;

