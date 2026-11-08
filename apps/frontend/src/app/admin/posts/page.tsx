'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Loader2, 
  Search, 
  Filter, 
  Calendar, 
  User as UserIcon,
  FolderOpen,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Clock,
  Archive,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { apiClient } from '@/lib/api/client';
import { useAuth } from '@/lib/auth/context';

type PostStatusFilter = 'ALL' | 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';

interface AdminPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string | null;
  authorId: string;
  categoryId?: string | null;
  tagIds: string[];
  publishedAt?: string | null;
  updatedAt: string;
  createdAt: string;
  readingTime: number;
  featured: boolean;
  viewCount: number;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  author?: {
    id: string;
    name: string;
    email: string;
    avatar?: string | null;
  };
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  tags?: { id: string; name: string; slug: string }[];
}

export default function AdminPostsPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<PostStatusFilter>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [categories, setCategories] = useState<{ id: string; name: string; slug: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });

  // Load categories for filtering
  useEffect(() => {
    apiClient.getCategories()
      .then((res) => {
        if (res.data) setCategories(res.data);
      })
      .catch((err) => console.error('Failed to load categories', err));
  }, []);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params: any = {
        page,
        limit: 10,
        search: searchQuery.trim() || undefined,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      };

      if (statusFilter !== 'ALL') {
        params.status = statusFilter;
      }
      if (categoryFilter !== 'ALL') {
        params.category = categoryFilter;
      }

      const response = await apiClient.getAdminPosts(params);
      const rawArticles = response.data?.data || [];
      const paginationData = response.data?.pagination || {};

      const formattedPosts: AdminPost[] = rawArticles.map((a: any) => ({
        ...a,
        status: (a.status || 'DRAFT').toUpperCase() as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
      }));

      setPosts(formattedPosts);
      setPagination({
        total: paginationData.totalItems ?? paginationData.total ?? formattedPosts.length,
        page: paginationData.page ?? page,
        limit: paginationData.limit ?? 10,
        totalPages: paginationData.totalPages ?? Math.max(1, Math.ceil((paginationData.totalItems ?? formattedPosts.length) / 10)),
      });
    } catch (err: any) {
      console.error('Failed to fetch posts:', err);
      setError(err.message || 'Failed to load posts from API backend');
    } finally {
      setIsLoading(false);
    }
  }, [page, searchQuery, statusFilter, categoryFilter]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete post: "${title}"?\nThis action cannot be undone.`)) {
      return;
    }

    try {
      setIsDeleting(id);
      await apiClient.deletePost(id);
      await fetchPosts();
    } catch (err: any) {
      alert(err.message || 'Failed to delete post');
    } finally {
      setIsDeleting(null);
    }
  };

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground tracking-tight">
            Blog Posts Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Author, edit, organize, and publish articles for the Tactyqal Labs public ecosystem.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => fetchPosts()}
            disabled={isLoading}
            className="rounded-xl gap-2 h-10"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </Button>

          <Link href="/admin/posts/new">
            <Button className="bg-[#FF5E14] hover:bg-[#E0500D] text-white rounded-md gap-2 h-10 shadow-sm shadow-[#FF5E14]/25 font-semibold text-xs">
              <Plus className="h-4 w-4" />
              <span>Create New Article</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Error Notice */}
      {error && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span className="text-sm font-medium">{error}</span>
          </div>
          <Button variant="outline" size="sm" onClick={() => fetchPosts()} className="h-8 text-xs">
            Retry
          </Button>
        </div>
      )}

      {/* Filter and Search Bar Card */}
      <Card className="rounded-2xl border bg-card shadow-sm overflow-hidden">
        <CardContent className="p-4 sm:p-5 space-y-4">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles by title or keyword..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                className="pl-10 h-10 rounded-xl bg-muted/40 border-border"
              />
            </div>

            {/* Status Pills */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-muted/50 rounded-xl border border-border">
              {(['ALL', 'PUBLISHED', 'DRAFT', 'ARCHIVED'] as PostStatusFilter[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setStatusFilter(tab);
                    setPage(1);
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    statusFilter === tab
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab === 'ALL' ? 'All Posts' : tab.charAt(0) + tab.slice(1).toLowerCase()}
                </button>
              ))}
            </div>

            {/* Category Dropdown Filter */}
            {categories.length > 0 && (
              <div className="flex items-center gap-2">
                <FolderOpen className="h-4 w-4 text-muted-foreground" />
                <select
                  value={categoryFilter}
                  onChange={(e) => {
                    setCategoryFilter(e.target.value);
                    setPage(1);
                  }}
                  className="h-10 text-xs font-medium rounded-xl border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="ALL">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

          </div>

        </CardContent>
      </Card>

      {/* Posts Table / Content Area */}
      <Card className="rounded-md border border-white/10 bg-[#111116] shadow-sm overflow-hidden text-white">
        {isLoading ? (
          <div className="p-16 flex flex-col items-center justify-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-[#FF5E14]" />
            <p className="text-sm font-medium text-zinc-400 font-mono">Loading publications from PostgreSQL...</p>
          </div>
        ) : posts.length === 0 ? (
          /* Empty State */
          <div className="p-16 text-center space-y-4">
            <div className="h-14 w-14 rounded-md bg-white/5 border border-white/10 text-[#FF5E14] mx-auto flex items-center justify-center">
              <Search className="h-7 w-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-heading font-bold text-white">
                No matching publications found
              </h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                {searchQuery || statusFilter !== 'ALL' || categoryFilter !== 'ALL'
                  ? 'No articles match your active search and filter parameters. Try clearing filters to see all content.'
                  : 'Your editorial blog database currently has no articles. Create your first post to get started!'}
              </p>
            </div>
            
            <div className="flex items-center justify-center gap-3 pt-2">
              {(searchQuery || statusFilter !== 'ALL' || categoryFilter !== 'ALL') ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('ALL');
                    setCategoryFilter('ALL');
                    setPage(1);
                  }}
                  className="rounded-md text-xs border-white/20 text-white hover:bg-white/10 font-mono"
                >
                  Clear Filters
                </Button>
              ) : null}
              <Link href="/admin/posts/new">
                <Button size="sm" className="bg-[#FF5E14] hover:bg-[#E0500D] text-white rounded-md text-xs font-semibold">
                  <Plus className="h-3.5 w-3.5 mr-1.5" />
                  Create First Post
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* Rich Table */
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b bg-muted/20 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <th className="py-3.5 px-6">Article</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Author</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                {posts.map((post) => {
                  const isPublished = post.status === 'PUBLISHED';
                  const isDraft = post.status === 'DRAFT';

                  return (
                    <tr key={post.id} className="hover:bg-muted/30 transition-colors group">
                      
                      {/* Title & Excerpt */}
                      <td className="py-4 px-6 max-w-md">
                        <div className="space-y-1">
                          <Link 
                            href={`/admin/posts/${post.id}/edit`}
                            className="font-heading font-semibold text-white hover:text-[#FF5E14] transition-colors line-clamp-1"
                          >
                            {post.title}
                          </Link>
                          {post.excerpt && (
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {post.excerpt}
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          isPublished
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                            : isDraft
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                            : 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20'
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${
                            isPublished ? 'bg-emerald-500' : isDraft ? 'bg-amber-500' : 'bg-slate-400'
                          }`} />
                          {post.status}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        {post.category ? (
                          <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground border">
                            {post.category.name}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground italic">General</span>
                        )}
                      </td>

                      {/* Author */}
                      <td className="py-4 px-4 whitespace-nowrap text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-md bg-[#FF5E14]/15 border border-[#FF5E14]/30 text-[#FF5E14] flex items-center justify-center font-bold text-[10px] font-mono">
                            {post.author?.name ? post.author.name[0] : 'A'}
                          </div>
                          <span>{post.author?.name || 'Admin'}</span>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 whitespace-nowrap text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground/70" />
                          <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          {isPublished && (
                            <Link href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" title="View on Live Site">
                                <ExternalLink className="h-3.5 w-3.5" />
                              </Button>
                            </Link>
                          )}
                          
                          <Link href={`/admin/posts/${post.id}/edit`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-[#FF5E14]" title="Edit Post">
                              <Edit3 className="h-3.5 w-3.5" />
                            </Button>
                          </Link>

                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDelete(post.id, post.title)}
                            disabled={isDeleting === post.id}
                            className="h-8 w-8 text-muted-foreground hover:text-rose-600" 
                            title="Delete Post"
                          >
                            {isDeleting === post.id ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin text-rose-600" />
                            ) : (
                              <Trash2 className="h-3.5 w-3.5" />
                            )}
                          </Button>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {pagination.totalPages > 1 && (
          <div className="p-4 border-t bg-muted/10 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Showing {(page - 1) * pagination.limit + 1} to {Math.min(page * pagination.limit, pagination.total)} of {pagination.total} articles
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1 || isLoading}
                className="h-8 px-3 rounded-lg text-xs"
              >
                Previous
              </Button>
              <span className="font-medium text-foreground px-1">
                Page {page} of {pagination.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                disabled={page >= pagination.totalPages || isLoading}
                className="h-8 px-3 rounded-lg text-xs"
              >
                Next
              </Button>
            </div>
          </div>
        )}

      </Card>

    </div>
  );
}