import { Request, Response } from 'express';
import { storageService } from '../services/storage.service.js';
import { AuthenticatedRequest } from '../middlewares/auth.middleware.js';
import { AppError } from '../middlewares/error.middleware.js';

export const mediaController = {
  async upload(req: AuthenticatedRequest, res: Response) {
    if (!req.user) {
      throw new AppError('Authentication required', 401, 'UNAUTHORIZED');
    }

    if (!req.file) {
      throw new AppError('No file uploaded', 400, 'VALIDATION_ERROR');
    }

    try {
      const result = await storageService.upload(req.file);

      res.status(201).json({
        success: true,
        message: 'File uploaded successfully',
        data: result,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new AppError(error.message, 400, 'UPLOAD_ERROR');
      }
      throw new AppError('Upload failed', 500, 'UPLOAD_ERROR');
    }
  },

  async delete(req: AuthenticatedRequest, res: Response) {
    if (!req.user || req.user.role !== 'ADMIN') {
      throw new AppError('Admin access required', 403, 'FORBIDDEN');
    }

    const { path } = req.body;

    if (!path) {
      throw new AppError('Path is required', 400, 'VALIDATION_ERROR');
    }

    await storageService.delete(path);

    res.json({
      success: true,
      message: 'File deleted successfully',
    });
  },
};