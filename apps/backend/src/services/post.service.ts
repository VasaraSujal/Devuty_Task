import { prisma } from '../config/database.js';
import { AppError } from '../middlewares/error.middleware.js';
import { AuthenticatedRequest } from '../middlewares/auth.middleware.js';
import slugify from 'slugify';

interface CreatePostData {
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  categoryId: string;
  tagIds?: string[];
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogImage?: string;
  noIndex?: boolean;
  authorId: string;
}

interface UpdatePostData {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  categoryId?: string;
  tagIds?: string[];
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogImage?: string;
  noIndex?: boolean;
}

interface ListPostsParams {
  page: number;
  limit: number;
  search?: string;
  category?: string;
  tag?: string;
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export class PostService {
  private generateExcerpt(content: string, maxLength: number = 160): string {
    // Strip HTML/markdown and get plain text
    const plainText = content.replace(/[#*`_\[\]()]/g, '').replace(/\s+/g, ' ').trim();
    return plainText.length > maxLength
      ? plainText.substring(0, maxLength).trim() + '...'
      : plainText;
  }

  private generateSlug(title: string): string {
    return slugify(title, { lower: true, strict: true, trim: true });
  }

  private async ensureUniqueSlug(baseSlug: string, excludeId?: string): Promise<string> {
    let slug = baseSlug;
    let counter = 1;

    while (true) {
      const existing = await prisma.post.findUnique({
        where: { slug },
        select: { id: true },
      });

      if (!existing || existing.id === excludeId) {
        return slug;
      }

      slug = `${baseSlug}-${counter}`;
      counter++;
    }
  }

  async create(data: CreatePostData) {
    // Validate category exists
    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!category) {
      throw new AppError('Category not found', 404, 'NOT_FOUND');
    }

    // Validate tags exist
    if (data.tagIds && data.tagIds.length > 0) {
      const tags = await prisma.tag.findMany({
        where: { id: { in: data.tagIds } },
      });

      if (tags.length !== data.tagIds.length) {
        throw new AppError('One or more tags not found', 404, 'NOT_FOUND');
      }
    }

    // Generate slug
    const baseSlug = data.slug || this.generateSlug(data.title);
    const uniqueSlug = await this.ensureUniqueSlug(baseSlug);

    // Generate excerpt if not provided
    const excerpt = data.excerpt || this.generateExcerpt(data.content);

    // Handle publishedAt
    const publishedAt = data.status === 'PUBLISHED' ? new Date() : null;

    // Use transaction for post + tags
    const newPost = await prisma.$transaction(async (tx) => {
      const post = await tx.post.create({
        data: {
          ...data,
          slug: uniqueSlug,
          excerpt,
          publishedAt,
        },
      });

      // Create post-tag relationships
      if (data.tagIds && data.tagIds.length > 0) {
        await tx.postTag.createMany({
          data: data.tagIds.map(tagId => ({
            postId: post.id,
            tagId,
          })),
        });
      }

      return post;
    });

    // Return with relations
    return this.getById(newPost.id);
  }

  async getById(id: string) {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, name: true, email: true, avatar: true },
        },
        category: {
          select: { id: true, name: true, slug: true },
        },
        tags: {
          include: {
            tag: {
              select: { id: true, name: true, slug: true },
            },
          },
        },
      },
    });

    return post;
  }

  async getBySlug(slug: string) {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: {
          select: { id: true, name: true, email: true, avatar: true },
        },
        category: {
          select: { id: true, name: true, slug: true },
        },
        tags: {
          include: {
            tag: {
              select: { id: true, name: true, slug: true },
            },
          },
        },
      },
    });

    return post;
  }

  async list(params: ListPostsParams) {
    const { page, limit, search, category, tag, status, sortBy, sortOrder } = params;
    const skip = (page - 1) * limit;

    const where: any = {
      deletedAt: null,
    };

    // Public API should only show published posts
    if (status) {
      where.status = status;
    } else {
      where.status = 'PUBLISHED';
      where.publishedAt = { lte: new Date() };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (category) {
      where.category = { slug: category };
    }

    if (tag) {
      where.tags = {
        some: { tag: { slug: tag } },
      };
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          author: {
            select: { id: true, name: true, email: true, avatar: true },
          },
          category: {
            select: { id: true, name: true, slug: true },
          },
          tags: {
            include: {
              tag: {
                select: { id: true, name: true, slug: true },
              },
            },
          },
        },
      }),
      prisma.post.count({ where }),
    ]);

    return {
      data: posts,
      pagination: {
        page,
        limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    };
  }

  async listAdmin(params: ListPostsParams & { authorId?: string }) {
    const { page, limit, search, category, tag, status, sortBy, sortOrder, authorId } = params;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (authorId) {
      where.authorId = authorId;
    }

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (category) {
      where.category = { slug: category };
    }

    if (tag) {
      where.tags = {
        some: { tag: { slug: tag } },
      };
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          author: {
            select: { id: true, name: true, email: true, avatar: true },
          },
          category: {
            select: { id: true, name: true, slug: true },
          },
          tags: {
            include: {
              tag: {
                select: { id: true, name: true, slug: true },
              },
            },
          },
        },
      }),
      prisma.post.count({ where }),
    ]);

    return {
      data: posts,
      pagination: {
        page,
        limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    };
  }

  async update(id: string, data: UpdatePostData, user: AuthenticatedRequest['user']) {
    const existing = await prisma.post.findUnique({
      where: { id },
      include: { tags: true },
    });

    if (!existing) {
      throw new AppError('Post not found', 404, 'NOT_FOUND');
    }

    // Authorization check
    if (user?.role !== 'ADMIN' && existing.authorId !== user?.userId) {
      throw new AppError('Not authorized to update this post', 403, 'FORBIDDEN');
    }

    // Validate category if provided
    if (data.categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: data.categoryId },
      });
      if (!category) {
        throw new AppError('Category not found', 404, 'NOT_FOUND');
      }
    }

    // Validate tags if provided
    if (data.tagIds) {
      const tags = await prisma.tag.findMany({
        where: { id: { in: data.tagIds } },
      });
      if (tags.length !== data.tagIds.length) {
        throw new AppError('One or more tags not found', 404, 'NOT_FOUND');
      }
    }

    // Handle slug uniqueness if title/slug changed
    let slug = existing.slug;
    if (data.title || data.slug) {
      const baseSlug = data.slug || this.generateSlug(data.title || existing.title);
      slug = await this.ensureUniqueSlug(baseSlug, id);
    }

    // Handle publishedAt
    let publishedAt = existing.publishedAt;
    if (data.status && data.status !== existing.status) {
      if (data.status === 'PUBLISHED' && existing.status !== 'PUBLISHED') {
        publishedAt = new Date();
      } else if (data.status !== 'PUBLISHED') {
        publishedAt = null;
      }
    }

    // Update in transaction
    const updated = await prisma.$transaction(async (tx) => {
      const post = await tx.post.update({
        where: { id },
        data: {
          ...data,
          slug,
          publishedAt,
        },
      });

      // Update tags if provided
      if (data.tagIds) {
        // Delete existing tags
        await tx.postTag.deleteMany({ where: { postId: id } });

        // Create new tags
        if (data.tagIds.length > 0) {
          await tx.postTag.createMany({
            data: data.tagIds.map(tagId => ({
              postId: id,
              tagId,
            })),
          });
        }
      }

      return post;
    });

    return this.getById(updated.id);
  }

  async delete(id: string, user: AuthenticatedRequest['user']) {
    const existing = await prisma.post.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new AppError('Post not found', 404, 'NOT_FOUND');
    }

    // Authorization check
    if (user?.role !== 'ADMIN' && existing.authorId !== user?.userId) {
      throw new AppError('Not authorized to delete this post', 403, 'FORBIDDEN');
    }

    // Soft delete
    await prisma.post.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { success: true };
  }

  async updateStatus(id: string, status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED', user: AuthenticatedRequest['user']) {
    const existing = await prisma.post.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new AppError('Post not found', 404, 'NOT_FOUND');
    }

    // Authorization check
    if (user?.role !== 'ADMIN' && existing.authorId !== user?.userId) {
      throw new AppError('Not authorized to update this post', 403, 'FORBIDDEN');
    }

    const publishedAt = status === 'PUBLISHED' && existing.status !== 'PUBLISHED' ? new Date() : null;

    const post = await prisma.post.update({
      where: { id },
      data: {
        status,
        publishedAt,
      },
    });

    return this.getById(post.id);
  }
}

export const postService = new PostService();