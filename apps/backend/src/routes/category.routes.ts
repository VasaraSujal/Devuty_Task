import { Router } from 'express';
import { categoryController } from '../controllers/category.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
} from '../validators/blog.validator.js';
import { validate } from '../middlewares/validate.middleware.js';

const router = Router();

// All category routes require admin
router.post(
  '/categories',
  authenticate,
  authorize('ADMIN'),
  validate(createCategorySchema),
  categoryController.create
);

router.get(
  '/categories',
  categoryController.getAll
);

router.get(
  '/categories/:id',
  validate(getCategorySchema),
  categoryController.getById
);

router.put(
  '/categories/:id',
  authenticate,
  authorize('ADMIN'),
  validate(updateCategorySchema),
  categoryController.update
);

router.delete(
  '/categories/:id',
  authenticate,
  authorize('ADMIN'),
  validate(getCategorySchema),
  categoryController.delete
);

export default router;