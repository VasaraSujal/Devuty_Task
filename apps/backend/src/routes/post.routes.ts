import { Router } from 'express';
import { postController } from '../controllers/post.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import {
  createPostSchema,
  updatePostSchema,
  getPostSchema,
  getPostBySlugSchema,
  listPostsSchema,
  updateStatusSchema,
} from '../validators/blog.validator.js';
import { validate } from '../middlewares/validate.middleware.js';

const router = Router();

// Admin/Authenticated routes
router.post(
  '/posts',
  authenticate,
  authorize('ADMIN', 'AUTHOR'),
  validate(createPostSchema),
  postController.create
);

router.get(
  '/admin/posts',
  authenticate,
  authorize('ADMIN', 'AUTHOR'),
  postController.listAdmin
);

router.get(
  '/admin/posts/:id',
  authenticate,
  authorize('ADMIN', 'AUTHOR'),
  validate(getPostSchema),
  postController.getAdmin
);

router.put(
  '/posts/:id',
  authenticate,
  authorize('ADMIN', 'AUTHOR'),
  validate(updatePostSchema),
  postController.update
);

router.delete(
  '/posts/:id',
  authenticate,
  authorize('ADMIN', 'AUTHOR'),
  validate(getPostSchema),
  postController.delete
);

router.patch(
  '/posts/:id/status',
  authenticate,
  authorize('ADMIN', 'AUTHOR'),
  validate(updateStatusSchema),
  postController.updateStatus
);

// Public routes
router.get(
  '/posts',
  postController.listPublic
);

router.get(
  '/posts/:slug',
  validate(getPostBySlugSchema),
  postController.getPublic
);

export default router;