import { Router } from 'express';
import { tagController } from '../controllers/tag.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import {
  createTagSchema,
  updateTagSchema,
  getTagSchema,
} from '../validators/blog.validator.js';
import { validate } from '../middlewares/validate.middleware.js';

const router = Router();

// All tag routes require admin
router.post(
  '/tags',
  authenticate,
  authorize('ADMIN'),
  validate(createTagSchema),
  tagController.create
);

router.get(
  '/tags',
  tagController.getAll
);

router.get(
  '/tags/:id',
  validate(getTagSchema),
  tagController.getById
);

router.put(
  '/tags/:id',
  authenticate,
  authorize('ADMIN'),
  validate(updateTagSchema),
  tagController.update
);

router.delete(
  '/tags/:id',
  authenticate,
  authorize('ADMIN'),
  validate(getTagSchema),
  tagController.delete
);

export default router;