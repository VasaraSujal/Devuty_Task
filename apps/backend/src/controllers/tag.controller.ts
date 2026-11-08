import { Response } from 'express';
import { tagService } from '../services/tag.service.js';
import { AuthenticatedRequest } from '../middlewares/auth.middleware.js';
import { AppError } from '../middlewares/error.middleware.js';

export const tagController = {
  async create(req: AuthenticatedRequest, res: Response) {
    if (!req.user || req.user.role !== 'ADMIN') {
      throw new AppError('Admin access required', 403, 'FORBIDDEN');
    }

    const tag = await tagService.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Tag created successfully',
      data: tag,
    });
  },

  async getAll(req: AuthenticatedRequest, res: Response) {
    const tags = await tagService.getAll();

    res.json({
      success: true,
      data: tags,
    });
  },

  async getById(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const tag = await tagService.getById(id);

    if (!tag) {
      throw new AppError('Tag not found', 404, 'NOT_FOUND');
    }

    res.json({
      success: true,
      data: tag,
    });
  },

  async update(req: AuthenticatedRequest, res: Response) {
    if (!req.user || req.user.role !== 'ADMIN') {
      throw new AppError('Admin access required', 403, 'FORBIDDEN');
    }

    const { id } = req.params;
    const tag = await tagService.update(id, req.body);

    res.json({
      success: true,
      message: 'Tag updated successfully',
      data: tag,
    });
  },

  async delete(req: AuthenticatedRequest, res: Response) {
    if (!req.user || req.user.role !== 'ADMIN') {
      throw new AppError('Admin access required', 403, 'FORBIDDEN');
    }

    const { id } = req.params;
    await tagService.delete(id);

    res.json({
      success: true,
      message: 'Tag deleted successfully',
    });
  },
};