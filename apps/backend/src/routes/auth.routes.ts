import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { loginSchema } from '../validators/auth.validator.js';
import { validate } from '../middlewares/validate.middleware.js';

const router = Router();

// Apply validation middleware
const validateLogin = validate(loginSchema);

router.post('/login', validateLogin, authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);
router.get('/me', authenticate, authController.me);

export default router;