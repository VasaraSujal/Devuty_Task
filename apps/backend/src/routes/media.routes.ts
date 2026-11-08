import { Router } from 'express';
import multer from 'multer';
import { mediaController } from '../controllers/media.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';

const router = Router();

// Configure multer for memory storage (file.buffer)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (_req, file, cb) => {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/svg+xml',
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images are allowed.'));
    }
  },
});

router.post(
  '/media/upload',
  authenticate,
  authorize('ADMIN', 'AUTHOR'),
  upload.single('file'),
  mediaController.upload
);

router.delete(
  '/media/:path(*)',
  authenticate,
  authorize('ADMIN'),
  mediaController.delete
);

export default router;