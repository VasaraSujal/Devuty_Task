import { type Article, type Category, type Tag, type Author } from '../blog/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface ApiError extends Error {
  status: number;
  code: string;
}

type BlogArticle = Article & {
  categoryId: string;
  tagIds: string[];
  author: { id: string; name: string; slug: string };
  tags: Tag[];
  category: Category & { slug: string };
};

/**
 * CSRF token management
 * The backend sets a 'csrf_token' cookie that should be read and sent
 * back in the 'x-csrf-token' header for state-changing requests
 */
const CSRF_COOKIE_NAME = 'csrf_token';
const CSRF_HEADER_NAME = 'x-csrf-token';

/**
 * Get CSRF token from cookies
 */
function getCsrfToken(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + CSRF_COOKIE_NAME + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

/**
 * Check if request needs CSRF protection (POST, PUT, PATCH, DELETE)
 */
function needsCsrf(method: string): boolean {
  return ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method.toUpperCase());
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_URL) {
    this.baseUrl = baseUrl.replace(/\/+$/, '');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const method = (options.method || 'GET').toUpperCase();

    // Get CSRF token for state-changing requests
    const csrfToken = needsCsrf(method) ? getCsrfToken() : null;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((options.headers as Record<string, string>) || {}),
    };

    // Add CSRF header if token is available
    if (csrfToken) {
      headers[CSRF_HEADER_NAME] = csrfToken;
    }

    // Attach Bearer token from localStorage for reliable cross-domain authentication
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('devuty_access_token');
      if (storedToken && !headers['Authorization']) {
        headers['Authorization'] = `Bearer ${storedToken}`;
      }
    }

    const defaults: RequestInit = {
      headers,
      credentials: 'include',
    };

    let response: Response;
    try {
      response = await fetch(url, { ...defaults, ...options });
    } catch (fetchErr: any) {
      const isNetworkErr = fetchErr?.message?.toLowerCase().includes('fetch') || fetchErr?.name === 'TypeError';
      const msg = isNetworkErr
        ? 'Cannot reach backend service. The server may be waking up from sleep or experiencing network issues. Please retry in a few seconds.'
        : fetchErr?.message || 'Network request failed';
      const error: ApiError = new Error(msg) as ApiError;
      error.status = 0;
      error.code = 'NETWORK_ERROR';
      error.name = 'NetworkError';
      throw error;
    }

    if (!response.ok) {
      let errorData: any = {};
      try {
        errorData = await response.json();
      } catch {
        // Ignore JSON parse errors
      }

      const detailMsg = errorData.error?.details?.[0]?.message;
      const error: ApiError = new Error(
        detailMsg || errorData.error?.message || errorData.message || 'An error occurred'
      ) as ApiError;
      error.status = response.status;
      error.code = errorData.error?.code || 'UNKNOWN_ERROR';
      error.name = errorData.error?.code || 'ApiError';
      throw error;
    }

    return response.json();
  }

  // Health check - API root returns success: true, message: "OK"
  health = () => this.request<ApiResponse<{ timestamp: string }>>('/health');

  // Auth endpoints
  login = async (email: string, password: string) => {
    const res = await this.request<ApiResponse<{
      user: { id: string; email: string; name: string; role: string; avatar?: string | null; bio?: string | null };
      accessToken?: string;
      refreshToken?: string;
    }>>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (res.data?.accessToken && typeof window !== 'undefined') {
      localStorage.setItem('devuty_access_token', res.data.accessToken);
      if (res.data.refreshToken) {
        localStorage.setItem('devuty_refresh_token', res.data.refreshToken);
      }
    }

    return res;
  };

  logout = async () => {
    try {
      return await this.request<ApiResponse<{ message: string }>>('/auth/logout', { method: 'POST' });
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('devuty_access_token');
        localStorage.removeItem('devuty_refresh_token');
      }
    }
  };

  refresh = async () => {
    const storedRefresh = typeof window !== 'undefined' ? localStorage.getItem('devuty_refresh_token') : null;
    const res = await this.request<ApiResponse<{
      user: { id: string; email: string; name: string; role: string };
      accessToken?: string;
      refreshToken?: string;
    }>>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken: storedRefresh }),
    });

    if (res.data?.accessToken && typeof window !== 'undefined') {
      localStorage.setItem('devuty_access_token', res.data.accessToken);
      if (res.data.refreshToken) {
        localStorage.setItem('devuty_refresh_token', res.data.refreshToken);
      }
    }

    return res;
  };

  me = () =>
    this.request<ApiResponse<{ id: string; email: string; name: string; role: string }>>(
      '/auth/me'
    );

  // Posts endpoints - Public
  getPublicPosts = (params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    tag?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.limit) searchParams.set('limit', String(params.limit));
    if (params?.search) searchParams.set('search', params.search);
    if (params?.category) searchParams.set('category', params.category);
    if (params?.tag) searchParams.set('tag', params.tag);
    if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
    if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);

    const query = searchParams.toString();
    return this.request<ApiResponse<{
      data: Article[];
      pagination: {
        total: number;
        totalItems: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
      };
    }>>(query ? `/posts?${query}` : '/posts');
  };

  getPostBySlug = (slug: string) =>
    this.request<Article>(`/posts/${slug}`);

  // Posts endpoints - Admin
  getAdminPosts = (params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    tag?: string;
    status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.limit) searchParams.set('limit', String(params.limit));
    if (params?.search) searchParams.set('search', params.search);
    if (params?.category) searchParams.set('category', params.category);
    if (params?.tag) searchParams.set('tag', params.tag);
    if (params?.status) searchParams.set('status', params.status);
    if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
    if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);

    const query = searchParams.toString();
    return this.request<ApiResponse<{
      data: Article[];
      pagination: {
        total: number;
        totalItems: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage?: boolean;
        hasPrevPage?: boolean;
      };
    }>>(query ? `/admin/posts?${query}` : '/admin/posts');
  };

  getPostById = (id: string) =>
    this.request<Article>(`/admin/posts/${id}`);

  createPost = (data: Partial<Article> & { title: string; slug: string; excerpt: string; content: string; tagIds?: string[] }) =>
    this.request<ApiResponse<Article>>('/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    });

  updatePost = (id: string, data: Partial<Article> & { tagIds?: string[] }) =>
    this.request<ApiResponse<Article>>(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });

  deletePost = (id: string) =>
    this.request<ApiResponse<{ message: string }>>(`/posts/${id}`, {
      method: 'DELETE',
    });

  updatePostStatus = (id: string, status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED') =>
    this.request<ApiResponse<Article>>(`/posts/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });

  // Categories endpoints
  getCategories = () =>
    this.request<ApiResponse<Category[]>>('/categories');

  getCategory = (id: string) =>
    this.request<ApiResponse<Category>>(`/categories/${id}`);

  createCategory = (data: { name: string; slug: string; description?: string }) =>
    this.request<ApiResponse<Category>>('/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    });

  updateCategory = (id: string, data: Partial<Category>) =>
    this.request<ApiResponse<Category>>(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });

  deleteCategory = (id: string) =>
    this.request<ApiResponse<{ message: string }>>(`/categories/${id}`, {
      method: 'DELETE',
    });

  // Tags endpoints
  getTags = () =>
    this.request<ApiResponse<Tag[]>>('/tags');

  getTag = (id: string) =>
    this.request<ApiResponse<Tag>>(`/tags/${id}`);

  createTag = (data: { name: string; slug: string }) =>
    this.request<ApiResponse<Tag>>('/tags', {
      method: 'POST',
      body: JSON.stringify(data),
    });

  updateTag = (id: string, data: Partial<Tag>) =>
    this.request<ApiResponse<Tag>>(`/tags/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });

  deleteTag = (id: string) =>
    this.request<ApiResponse<{ message: string }>>(`/tags/${id}`, {
      method: 'DELETE',
    });

  // Media upload endpoint - uses FormData, requires special handling
  uploadMedia = async (formData: FormData): Promise<{ success: boolean; data: { url: string; id: string } }> => {
    const url = `${this.baseUrl}/media/upload`;

    // Get CSRF token for uploads
    const csrfToken = getCsrfToken();

    const headers: Record<string, string> = {};
    if (csrfToken) {
      headers[CSRF_HEADER_NAME] = csrfToken;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      let errorData: any = {};
      try {
        errorData = await response.json();
      } catch {
        // Ignore JSON parse errors
      }

      const error: ApiError = new Error(
        errorData.message || errorData.error?.message || 'Upload failed'
      ) as ApiError;
      error.status = response.status;
      error.code = errorData.error?.code || 'UPLOAD_ERROR';
      error.name = errorData.error?.code || 'ApiError';
      throw error;
    }

    return response.json();
  };
}

export const apiClient = new ApiClient();
export type { ApiResponse, ApiError };