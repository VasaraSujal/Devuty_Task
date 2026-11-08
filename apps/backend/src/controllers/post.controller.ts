import { Response } from 'express';
import { postService } from '../services/post.service.js';
import { AuthenticatedRequest } from '../middlewares/auth.middleware.js';
import { AppError } from '../middlewares/error.middleware.js';

export const postController = {
  // Admin endpoints (authenticated)
  async create(req: AuthenticatedRequest, res: Response) {
    if (!req.user) {
      throw new AppError('Authentication required', 401, 'UNAUTHORIZED');
    }

    const post = await postService.create({
      ...req.body,
      authorId: req.user.userId,
    });

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: post,
    });
  },

  async listAdmin(req: AuthenticatedRequest, res: Response) {
    if (!req.user) {
      throw new AppError('Authentication required', 401, 'UNAUTHORIZED');
    }

    const params = {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
      search: req.query.search as string,
      category: req.query.category as string,
      tag: req.query.tag as string,
      status: req.query.status as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
      sortBy: req.query.sortBy as string || 'createdAt',
      sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'desc',
      // Authors can only see their own posts unless admin
      ...(req.user.role !== 'ADMIN' ? { authorId: req.user.userId } : {}),
    };

    const result = await postService.listAdmin(params);

    res.json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  },

  async getAdmin(req: AuthenticatedRequest, res: Response) {
    if (!req.user) {
      throw new AppError('Authentication required', 401, 'UNAUTHORIZED');
    }

    const { id } = req.params;
    const post = await postService.getById(id);

    if (!post) {
      throw new AppError('Post not found', 404, 'NOT_FOUND');
    }

    // Authorization check
    if (req.user.role !== 'ADMIN' && post.authorId !== req.user.userId) {
      throw new AppError('Not authorized to view this post', 403, 'FORBIDDEN');
    }

    res.json({
      success: true,
      data: post,
    });
  },

  async update(req: AuthenticatedRequest, res: Response) {
    if (!req.user) {
      throw new AppError('Authentication required', 401, 'UNAUTHORIZED');
    }

    const { id } = req.params;
    const post = await postService.update(id, req.body, req.user);

    res.json({
      success: true,
      message: 'Post updated successfully',
      data: post,
    });
  },

  async delete(req: AuthenticatedRequest, res: Response) {
    if (!req.user) {
      throw new AppError('Authentication required', 401, 'UNAUTHORIZED');
    }

    const { id } = req.params;
    await postService.delete(id, req.user);

    res.json({
      success: true,
      message: 'Post deleted successfully',
    });
  },

  async updateStatus(req: AuthenticatedRequest, res: Response) {
    if (!req.user) {
      throw new AppError('Authentication required', 401, 'UNAUTHORIZED');
    }

    const { id } = req.params;
    const { status } = req.body;
    const post = await postService.updateStatus(id, status, req.user);

    res.json({
      success: true,
      message: `Post ${status.toLowerCase()} successfully`,
      data: post,
    });
  },

  // Public endpoints
  async listPublic(req: AuthenticatedRequest, res: Response) {
    const params = {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
      search: req.query.search as string,
      category: req.query.category as string,
      tag: req.query.tag as string,
      sortBy: req.query.sortBy as string || 'publishedAt',
      sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'desc',
    };

    const result = await postService.list(params);

    res.json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  },

  async getPublic(req: AuthenticatedRequest, res: Response) {
    const { slug } = req.params;
    const post = await postService.getBySlug(slug);

    if (!post) {
      throw new AppError('Post not found', 404, 'NOT_FOUND');
    }

    // Public posts must be published and not deleted
    if (post.status !== 'PUBLISHED' || post.deletedAt) {
      throw new AppError('Post not found', 404, 'NOT_FOUND');
    }

    // Check if post is scheduled for future
    if (post.publishedAt && new Date(post.publishedAt) > new Date()) {
      throw new AppError('Post not found', 404, 'NOT_FOUND');
    }

    res.json({
      success: true,
      data: post,
    });
  },
};