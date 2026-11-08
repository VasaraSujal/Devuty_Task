/**
 * Blog data types - shared between frontend and backend
 * These types mirror the backend Prisma models for seamless integration
 */

export interface Author {
  id: string;
  name: string;
  slug: string;
  bio?: string;
  avatar?: string | null;
  email?: string;
  role?: 'ADMIN' | 'AUTHOR';
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
  _count?: { posts: number };
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
}

export interface SEOFields {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  ogType?: 'article' | 'website';
  twitterCard?: 'summary' | 'summary_large_image';
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML content
  coverImage?: string | null;
  authorId: string;
  categoryId?: string | null;
  tagIds: string[];
  publishedAt?: string | null;
  updatedAt: string;
  createdAt: string;
  readingTime: number; // minutes
  featured: boolean;
  viewCount: number;
  status: 'draft' | 'published' | 'archived';
  seo?: SEOFields;
  author?: Author;
  category?: Category;
  tags?: Tag[];
}

export interface ArticleListItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string | null;
  author: Pick<Author, 'id' | 'name' | 'slug' | 'avatar'>;
  category: Pick<Category, 'id' | 'name' | 'slug' | 'description'>;
  tags: Pick<Tag, 'id' | 'name' | 'slug'>[];
  publishedAt: string;
  readingTime: number;
  featured: boolean;
}

export interface BlogFilters {
  category?: string;
  tag?: string;
  author?: string;
  search?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'date' | 'title' | 'readingTime';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

/**
 * Table of Contents item extracted from article headings
 */
export interface TOCItem {
  id: string;
  text: string;
  level: 2 | 3 | 4;
  children?: TOCItem[];
}

/**
 * Social sharing configuration
 */
export interface SocialShare {
  platform: 'twitter' | 'linkedin' | 'facebook' | 'email' | 'copy';
  url: string;
  label: string;
}

/**
 * Blog sidebar data
 */
export interface BlogSidebarData {
  categories: (Category & { count: number })[];
  tags: (Tag & { count: number })[];
  recentArticles: ArticleListItem[];
  featuredArticle?: ArticleListItem;
}