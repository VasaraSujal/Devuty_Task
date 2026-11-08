import { Router } from 'express';
import authRoutes from './auth.routes.js';
import postRoutes from './post.routes.js';
import categoryRoutes from './category.routes.js';
import tagRoutes from './tag.routes.js';
import mediaRoutes from './media.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use(postRoutes);
router.use(categoryRoutes);
router.use(tagRoutes);
router.use(mediaRoutes);

export default router;