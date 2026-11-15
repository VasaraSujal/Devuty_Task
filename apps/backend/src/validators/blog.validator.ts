import { z } from 'zod';

// Post validators
export const createPostSchema = z.object({
  body: z.object({
    title: z.string().min(2, 'Title must be at least 2 characters').max(255),
    slug: z.string().min(2).max(280).optional(),
    excerpt: z.string().max(500).optional(),
    content: z.string().min(5, 'Content must be at least 5 characters'),
    coverImage: z.string().url().optional().or(z.literal('')),
    status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
    categoryId: z.string().uuid('Invalid category ID'),
    tagIds: z.array(z.string().uuid()).optional(),
    metaTitle: z.string().max(150).optional(),
    metaDescription: z.string().max(300).optional(),
    canonicalUrl: z.string().url().optional().or(z.literal('')),
    ogImage: z.string().url().optional().or(z.literal('')),
    noIndex: z.boolean().default(false),
  }),
});

export const updatePostSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid post ID'),
  }),
  body: z.object({
    title: z.string().min(2).max(255).optional(),
    slug: z.string().min(2).max(280).optional(),
    excerpt: z.string().max(500).optional(),
    content: z.string().min(5).optional(),
    coverImage: z.string().url().optional().or(z.literal('')),
    status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
    categoryId: z.string().uuid().optional(),
    tagIds: z.array(z.string().uuid()).optional(),
    metaTitle: z.string().max(150).optional(),
    metaDescription: z.string().max(300).optional(),
    canonicalUrl: z.string().url().optional().or(z.literal('')),
    ogImage: z.string().url().optional().or(z.literal('')),
    noIndex: z.boolean().optional(),
  }),
});

export const getPostSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid post ID'),
  }),
});

export const getPostBySlugSchema = z.object({
  params: z.object({
    slug: z.string().min(1),
  }),
});

export const listPostsSchema = z.object({
  query: z.object({
    page: z.string().transform(Number).default('1').refine(n => n > 0),
    limit: z.string().transform(Number).default('10').refine(n => n > 0 && n <= 50),
    search: z.string().optional(),
    category: z.string().optional(),
    tag: z.string().optional(),
    status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
    sortBy: z.enum(['createdAt', 'updatedAt', 'publishedAt', 'title']).default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
  }),
});

export const updateStatusSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid post ID'),
  }),
  body: z.object({
    status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
  }),
});

// Category validators
export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100),
    slug: z.string().min(2).max(120).optional(),
    description: z.string().max(500).optional(),
  }),
});

export const updateCategorySchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid category ID'),
  }),
  body: z.object({
    name: z.string().min(2).max(100).optional(),
    slug: z.string().min(2).max(120).optional(),
    description: z.string().max(500).optional(),
  }),
});

export const getCategorySchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid category ID'),
  }),
});

// Tag validators
export const createTagSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(50),
    slug: z.string().min(1).max(60).optional(),
  }),
});

export const updateTagSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid tag ID'),
  }),
  body: z.object({
    name: z.string().min(1).max(50).optional(),
    slug: z.string().min(1).max(60).optional(),
  }),
});

export const getTagSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid tag ID'),
  }),
});

// Media validators
export const uploadMediaSchema = z.object({
  body: z.object({
    // File is handled by multer, not Zod
  }),
});