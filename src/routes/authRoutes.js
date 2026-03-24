import express from 'express';
import * as authController from '../controllers/authController.js';
import { validate } from '../middleware/validationMiddleware.js';
import { registerSchema, loginSchema } from '../validators/authValidator.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.get('/me', authenticate, authController.getMe);

export default router;

