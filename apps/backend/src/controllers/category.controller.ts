import { Response } from 'express';
import { categoryService } from '../services/category.service.js';
import { AuthenticatedRequest } from '../middlewares/auth.middleware.js';
import { AppError } from '../middlewares/error.middleware.js';

export const categoryController = {
  async create(req: AuthenticatedRequest, res: Response) {
    if (!req.user || req.user.role !== 'ADMIN') {
      throw new AppError('Admin access required', 403, 'FORBIDDEN');
    }

    const category = await categoryService.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category,
    });
  },

  async getAll(req: AuthenticatedRequest, res: Response) {
    const categories = await categoryService.getAll();

    res.json({
      success: true,
      data: categories,
    });
  },

  async getById(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const category = await categoryService.getById(id);

    if (!category) {
      throw new AppError('Category not found', 404, 'NOT_FOUND');
    }

    res.json({
      success: true,
      data: category,
    });
  },

  async update(req: AuthenticatedRequest, res: Response) {
    if (!req.user || req.user.role !== 'ADMIN') {
      throw new AppError('Admin access required', 403, 'FORBIDDEN');
    }

    const { id } = req.params;
    const category = await categoryService.update(id, req.body);

    res.json({
      success: true,
      message: 'Category updated successfully',
      data: category,
    });
  },

  async delete(req: AuthenticatedRequest, res: Response) {
    if (!req.user || req.user.role !== 'ADMIN') {
      throw new AppError('Admin access required', 403, 'FORBIDDEN');
    }

    const { id } = req.params;
    await categoryService.delete(id);

    res.json({
      success: true,
      message: 'Category deleted successfully',
    });
  },
};