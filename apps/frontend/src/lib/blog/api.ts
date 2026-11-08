import { type Article, type Category, type Tag, type Author, type PaginatedResult } from './types';
import { apiClient } from '../api/client';

// Re-export types for convenience
export type { Article, Category, Tag, Author, PaginatedResult } from './types';

/**
 * Internal type for articles with additional fields from API
 */
export type BlogArticle = Article & {
  categoryId: string;
  tagIds: string[];
  author: { id: string; name: string; slug: string };
  tags: Tag[];
  category: Category & { slug: string };
};

/**
 * Get all articles (published only)
 * The backend API filters for published articles on the public endpoint
 */
export async function getAllArticles(): Promise<BlogArticle[]> {
  try {
    const response: any = await apiClient.getPublicPosts();

    // Transform to include category and tags
    const articles = Array.isArray(response.data) ? response.data : (response.data?.data || []);
    return articles.map((a: any) => ({
      ...a,
      categoryId: a.categoryId || '',
      tagIds: a.tagIds || [],
      category: a.category || { id: 'general', name: 'General', slug: 'general', description: '' },
      tags: a.tags ? a.tags.map((t: any) => t.tag || t) : [],
      author: a.author || { id: 'tactyqal', name: 'Tactyqal Labs', slug: 'tactyqal-labs' },
    })) as unknown as BlogArticle[];
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return [];
  }
}

/**
 * Get article by slug (public endpoint)
 */
export async function getArticleBySlug(slug: string): Promise<BlogArticle | null> {
  try {
    const response: any = await apiClient.getPostBySlug(slug);
    const article = response?.data || response;

    if (!article || !article.id) return null;

    // Transform to include category and tags
    return {
      ...article,
      categoryId: article.categoryId || '',
      tagIds: article.tagIds || [],
      category: article.category || { id: 'general', name: 'General', slug: 'general', description: '' },
      tags: article.tags ? article.tags.map((t: any) => t.tag || t) : [],
      author: article.author || { id: 'tactyqal', name: 'Tactyqal Labs', slug: 'tactyqal-labs' },
    } as BlogArticle;
  } catch (error) {
    console.error(`Failed to fetch article with slug: ${slug}`, error);
    return null;
  }
}

/**
 * Get articles by category
 */
export async function getArticlesByCategory(categorySlug: string): Promise<BlogArticle[]> {
  try {
    const response: any = await apiClient.getPublicPosts({
      category: categorySlug
    });
    const articles = Array.isArray(response.data) ? response.data : (response.data?.data || []);
    return articles.map((a: any) => ({
      ...a,
      categoryId: a.categoryId || '',
      tagIds: a.tagIds || [],
      category: a.category || { id: 'general', name: 'General', slug: 'general', description: '' },
      tags: a.tags ? a.tags.map((t: any) => t.tag || t) : [],
      author: a.author || { id: 'tactyqal', name: 'Tactyqal Labs', slug: 'tactyqal-labs' },
    })) as unknown as BlogArticle[];
  } catch (error) {
    console.error(`Failed to fetch articles for category: ${categorySlug}`, error);
    return [];
  }
}

/**
 * Get articles by tag
 */
export async function getArticlesByTag(tagSlug: string): Promise<BlogArticle[]> {
  try {
    const response: any = await apiClient.getPublicPosts({
      tag: tagSlug
    });
    const articles = Array.isArray(response.data) ? response.data : (response.data?.data || []);
    return articles.map((a: any) => ({
      ...a,
      categoryId: a.categoryId || '',
      tagIds: a.tagIds || [],
      category: a.category || { id: 'general', name: 'General', slug: 'general', description: '' },
      tags: a.tags ? a.tags.map((t: any) => t.tag || t) : [],
      author: a.author || { id: 'tactyqal', name: 'Tactyqal Labs', slug: 'tactyqal-labs' },
    })) as unknown as BlogArticle[];
  } catch (error) {
    console.error(`Failed to fetch articles for tag: ${tagSlug}`, error);
    return [];
  }
}

/**
 * Search articles
 */
export async function searchArticles(query: string): Promise<BlogArticle[]> {
  if (!query.trim()) return [];

  try {
    const response: any = await apiClient.getPublicPosts({
      search: query
    });
    const articles = Array.isArray(response.data) ? response.data : (response.data?.data || []);
    return articles.map((a: any) => ({
      ...a,
      categoryId: (a as any).categoryId || '',
      tagIds: (a as any).tagIds || [],
      category: (a as any).category || { id: 'general', name: 'General', slug: 'general', description: '' },
      tags: (a as any).tags ? (a as any).tags.map((t: any) => t.tag || t) : [],
      author: (a as any).author || { id: 'tactyqal', name: 'Tactyqal Labs', slug: 'tactyqal-labs' },
    })) as unknown as BlogArticle[];
  } catch (error) {
    console.error(`Failed to search articles: ${query}`, error);
    return [];
  }
}

/**
 * Get featured article
 */
export async function getFeaturedArticle(): Promise<BlogArticle | null> {
  try {
    const articles = await getAllArticles();
    return articles[0] || null;
  } catch (error) {
    console.error('Failed to fetch featured article', error);
    return null;
  }
}

/**
 * Get related articles (same category, excluding current)
 */
export async function getRelatedArticles(currentSlug: string, limit = 3): Promise<BlogArticle[]> {
  try {
    const allArticles = await getAllArticles();
    const current = allArticles.find(a => a.slug === currentSlug);

    if (!current) return [];

    return allArticles
      .filter(a => a.categoryId === current.categoryId && a.slug !== currentSlug)
      .slice(0, limit);
  } catch (error) {
    console.error('Failed to fetch related articles', error);
    return [];
  }
}

/**
 * Type for categories displayed in admin UI with article counts
 */
export type AdminCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
};

/**
 * Get all categories with article counts
 */
export async function getCategoriesWithCounts(): Promise<AdminCategory[]> {
  try {
    const response = await apiClient.getCategories();
    const categories = response.data || [];

    // Get article counts per category
    const articleCounts: Record<string, number> = {};
    const allArticles = await getAllArticles();

    allArticles.forEach(article => {
      const catId = article.categoryId;
      if (catId) {
        articleCounts[catId] = (articleCounts[catId] || 0) + 1;
      }
    });

    return categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
      count: articleCounts[cat.id] || 0,
    }));
  } catch (error) {
    console.error('Failed to fetch categories', error);
    return [];
  }
}

/**
 * Type for tags displayed in admin UI with article counts
 */
export type AdminTag = {
  id: string;
  name: string;
  slug: string;
  count: number;
};

/**
 * Get all tags with article counts
 */
export async function getTagsWithCounts(): Promise<AdminTag[]> {
  try {
    const response = await apiClient.getTags();
    const tags = response.data || [];

    // Get article counts per tag
    const articleCounts: Record<string, number> = {};
    const allArticles = await getAllArticles();

    allArticles.forEach(article => {
      const tagIds = Array.isArray(article.tagIds) ? article.tagIds : [];
      tagIds.forEach(tagId => {
        articleCounts[tagId] = (articleCounts[tagId] || 0) + 1;
      });
    });

    return tags.map(tag => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      count: articleCounts[tag.id] || 0,
    }));
  } catch (error) {
    console.error('Failed to fetch tags', error);
    return [];
  }
}

/**
 * Get category by slug
 */
export async function getCategoryBySlug(slug: string): Promise<AdminCategory | null> {
  try {
    const categories = await getCategoriesWithCounts();
    return categories.find(t => t.slug === slug) || null;
  } catch (error) {
    console.error(`Failed to fetch category: ${slug}`, error);
    return null;
  }
}

/**
 * Get tag by slug
 */
export async function getTagBySlug(slug: string): Promise<AdminTag | null> {
  try {
    const tags = await getTagsWithCounts();
    return tags.find(t => t.slug === slug) || null;
  } catch (error) {
    console.error(`Failed to fetch tag: ${slug}`, error);
    return null;
  }
}

/**
 * Get author - for now returns Tactyqal Labs
 */
export async function getAuthorById(_id: string): Promise<Author | null> {
  // In the real implementation, this would fetch from the API
  // For now, returning the default author
  return {
    id: 'tactyqal',
    name: 'Tactyqal Labs',
    slug: 'tactyqal-labs',
    bio: 'Building exceptional digital products, MVPs, and scalable architectures.',
    avatar: '/images/authors/tactyqal.svg',
    social: {
      twitter: 'https://twitter.com/tactyqallabs',
      linkedin: 'https://linkedin.com/company/tactyqalabs',
    },
  };
}