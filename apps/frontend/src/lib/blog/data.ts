/**
 * Development fixtures are now in api.ts
 * This file re-exports from the API layer for backward compatibility
 *
 * DEPRECATED: Use functions from './api' instead for production use.
 */

import {
  getAllArticles as apiGetAllArticles,
  getArticleBySlug as apiGetArticleBySlug,
  getArticlesByCategory as apiGetArticlesByCategory,
  getArticlesByTag as apiGetArticlesByTag,
  getFeaturedArticle as apiGetFeaturedArticle,
  getRelatedArticles as apiGetRelatedArticles,
  getAuthorById as apiGetAuthorById,
  getCategoryBySlug as apiGetCategoryBySlug,
  getTagBySlug as apiGetTagBySlug,
  searchArticles as apiSearchArticles,
  getCategoriesWithCounts as apiGetCategoriesWithCounts,
  getTagsWithCounts as apiGetTagsWithCounts,
  type BlogArticle,
} from './api';

// Re-export types
export type { BlogArticle } from './api';

// Import and re-export from API layer
export const getAllArticles = apiGetAllArticles;
export const getArticleBySlug = apiGetArticleBySlug;
export const getArticlesByCategory = apiGetArticlesByCategory;
export const getArticlesByTag = apiGetArticlesByTag;
export const getFeaturedArticle = apiGetFeaturedArticle;
export const getRelatedArticles = apiGetRelatedArticles;
export const getAuthorById = apiGetAuthorById;
export const getCategoryBySlug = apiGetCategoryBySlug;
export const getTagBySlug = apiGetTagBySlug;
export const searchArticles = apiSearchArticles;
export const getCategoriesWithCounts = apiGetCategoriesWithCounts;
export const getTagsWithCounts = apiGetTagsWithCounts;