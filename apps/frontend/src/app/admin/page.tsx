'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  FolderOpen, 
  Tag as TagIcon, 
  Plus, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Loader2, 
  Sparkles, 
  ArrowUpRight,
  TrendingUp,
  Database,
  Calendar,
  Eye,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { apiClient } from '@/lib/api/client';
import { useAuth } from '@/lib/auth/context';

interface PostStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  archivedPosts: number;
  totalCategories: number;
  totalTags: number;
}

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<PostStats | null>(null);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Concurrent fetch for posts, categories, and tags
      const [postsRes, catsRes, tagsRes] = await Promise.allSettled([
        apiClient.getAdminPosts({ limit: 10 }),
        apiClient.getCategories(),
        apiClient.getTags(),
      ]);

      let posts: any[] = [];
      let totalPosts = 0;
      let published = 0;
      let draft = 0;
      let archived = 0;

      if (postsRes.status === 'fulfilled' && postsRes.value.data) {
        posts = postsRes.value.data.data || [];
        totalPosts = postsRes.value.data.pagination?.totalItems ?? postsRes.value.data.pagination?.total ?? posts.length;

        posts.forEach((p: any) => {
          const status = (p.status || '').toUpperCase();
          if (status === 'PUBLISHED') published++;
          else if (status === 'DRAFT') draft++;
          else if (status === 'ARCHIVED') archived++;
        });
      }

      const totalCategories = catsRes.status === 'fulfilled' && catsRes.value.data ? catsRes.value.data.length : 0;
      const totalTags = tagsRes.status === 'fulfilled' && tagsRes.value.data ? tagsRes.value.data.length : 0;

      setStats({
        totalPosts,
        publishedPosts: published,
        draftPosts: draft,
        archivedPosts: archived,
        totalCategories,
        totalTags,
      });

      setRecentPosts(posts);
    } catch (err: any) {
      console.error('Failed to fetch dashboard data:', err);
      setError(err.message || 'Failed to communicate with Express API backend');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Just now';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          <p className="text-sm font-medium text-muted-foreground">Gathering publications &amp; metrics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-white">
      
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-md bg-[#121217] text-white shadow-xl relative overflow-hidden border border-white/10">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#FF5E14]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs text-[11px] font-mono uppercase bg-[#FF5E14]/15 text-[#FF5E14] border border-[#FF5E14]/30">
            <Sparkles className="w-3.5 h-3.5" />
            Tactyqal Labs Editorial Workspace
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold tracking-tight text-white">
            Welcome back, {user?.name || 'Administrator'}
          </h1>
          <p className="text-sm text-zinc-300 max-w-xl leading-relaxed">
            Here is the current state of your editorial pipeline. Manage student startup showcases, publish curriculum articles, and monitor live content.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <Link href="/admin/posts/new">
            <Button className="bg-[#FF5E14] hover:bg-[#E0500D] text-white rounded-md shadow-lg shadow-[#FF5E14]/25 gap-2 h-11 px-5 font-semibold text-xs">
              <Plus className="h-4 w-4" />
              <span>Draft New Post</span>
            </Button>
          </Link>
          <Link href="/blog" target="_blank">
            <Button variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-md gap-2 h-11 px-4 text-xs font-mono">
              <ExternalLink className="h-4 w-4 text-zinc-400" />
              <span>Preview Public Blog</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Error alert if any */}
      {error && (
        <div className="p-4 rounded-md bg-destructive/10 border border-destructive/20 text-rose-300 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Total Posts */}
        <Card className="rounded-md border border-white/10 bg-[#111116] hover:border-[#FF5E14]/40 transition-all text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              Total Articles
            </CardTitle>
            <div className="h-8 w-8 rounded-md bg-white/5 text-[#FF5E14] border border-white/10 flex items-center justify-center">
              <FileText className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-heading font-extrabold text-white">
              {stats?.totalPosts ?? 0}
            </div>
            <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5 font-mono">
              <span>All recorded blog entries</span>
            </p>
          </CardContent>
        </Card>

        {/* Published */}
        <Card className="rounded-md border border-white/10 bg-[#111116] hover:border-[#FF5E14]/40 transition-all text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              Published &amp; Live
            </CardTitle>
            <div className="h-8 w-8 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-heading font-extrabold text-emerald-400">
              {stats?.publishedPosts ?? 0}
            </div>
            <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5 font-mono">
              <span>Active on public website</span>
            </p>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card className="rounded-md border border-white/10 bg-[#111116] hover:border-[#FF5E14]/40 transition-all text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              Categories
            </CardTitle>
            <div className="h-8 w-8 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
              <FolderOpen className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-heading font-extrabold text-white">
              {stats?.totalCategories ?? 0}
            </div>
            <p className="text-xs text-zinc-400 mt-1 font-mono">
              <span>Topic channels configured</span>
            </p>
          </CardContent>
        </Card>

        {/* Tags */}
        <Card className="rounded-md border border-white/10 bg-[#111116] hover:border-[#FF5E14]/40 transition-all text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              Keyword Tags
            </CardTitle>
            <div className="h-8 w-8 rounded-md bg-[#FF5E14]/15 text-[#FF5E14] border border-[#FF5E14]/30 flex items-center justify-center">
              <TagIcon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-heading font-extrabold text-white">
              {stats?.totalTags ?? 0}
            </div>
            <p className="text-xs text-zinc-400 mt-1 font-mono">
              <span>Search &amp; discovery tags</span>
            </p>
          </CardContent>
        </Card>

      </div>

      {/* Main Grid: Recent Posts & Quick Shortcuts */}
      <div className="grid gap-6 lg:grid-cols-12">
        
        {/* Left Column: Recent Articles (8 cols) */}
        <div className="lg:col-span-8">
          <Card className="rounded-md border border-white/10 bg-[#111116] shadow-sm overflow-hidden text-white">
            <CardHeader className="flex flex-row items-center justify-between border-b border-white/10 bg-white/5 pb-4">
              <div>
                <CardTitle className="text-lg font-heading font-bold text-white">Recent Publications</CardTitle>
                <CardDescription className="text-xs text-zinc-400 font-mono">
                  Latest articles drafted and published by editorial staff
                </CardDescription>
              </div>
              <Link href="/admin/posts">
                <Button variant="ghost" size="sm" className="text-xs font-mono gap-1 text-[#FF5E14] hover:text-[#E0500D] hover:bg-white/5">
                  <span>View All</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              {recentPosts.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="mx-auto w-12 h-12 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-[#FF5E14] mb-3">
                    <FileText className="h-6 w-6" />
                  </div>
                  <h3 className="text-sm font-semibold text-white">No articles published yet</h3>
                  <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
                    Get started by drafting your first blog post or youth founder story.
                  </p>
                  <Link href="/admin/posts/new" className="inline-block mt-4">
                    <Button size="sm" className="rounded-md bg-[#FF5E14] hover:bg-[#E0500D] text-white font-semibold text-xs">
                      <Plus className="h-4 w-4 mr-1.5" />
                      Create Post
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-white/10">
                  {recentPosts.slice(0, 5).map((post) => {
                    const isPublished = (post.status || '').toUpperCase() === 'PUBLISHED';
                    return (
                      <div 
                        key={post.id} 
                        className="p-4 sm:px-6 hover:bg-white/5 transition-colors flex items-center justify-between gap-4"
                      >
                        <div className="min-w-0 flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-xs text-[10px] font-mono font-semibold ${
                              isPublished 
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            }`}>
                              {post.status || 'DRAFT'}
                            </span>
                            {post.category && (
                              <span className="text-[11px] text-zinc-400 font-mono">
                                in {post.category.name}
                              </span>
                            )}
                          </div>
                          
                          <Link 
                            href={`/admin/posts/${post.id}/edit`}
                            className="block font-heading font-semibold text-sm text-white hover:text-[#FF5E14] transition-colors truncate"
                          >
                            {post.title}
                          </Link>
                          
                          <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(post.publishedAt || post.createdAt)}
                            </span>
                            <span>•</span>
                            <span>By {post.author?.name || 'Admin'}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <Link href={`/admin/posts/${post.id}/edit`}>
                            <Button variant="outline" size="sm" className="h-8 text-xs rounded-md border-white/20 text-white hover:bg-white/10">
                              Edit
                            </Button>
                          </Link>
                          {isPublished && (
                            <Link href={`/blog/${post.slug}`} target="_blank">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-white/5">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Quick Management & System Status (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick Hub */}
          <Card className="rounded-md border border-white/10 bg-[#111116] shadow-sm text-white">
            <CardHeader className="pb-3 border-b border-white/10 bg-white/5">
              <CardTitle className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Editorial Management
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              <Link 
                href="/admin/posts/new" 
                className="flex items-center justify-between p-3 rounded-md hover:bg-white/5 border border-transparent hover:border-white/10 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-[#FF5E14]">
                    <Plus className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white group-hover:text-[#FF5E14] transition-colors">
                      Draft Article
                    </div>
                    <div className="text-[11px] text-zinc-400 font-mono">
                      Rich content &amp; SEO metadata
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-zinc-400 group-hover:text-[#FF5E14] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </Link>

              <Link 
                href="/admin/categories" 
                className="flex items-center justify-between p-3 rounded-md hover:bg-white/5 border border-transparent hover:border-white/10 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-amber-400">
                    <FolderOpen className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white group-hover:text-amber-400 transition-colors">
                      Manage Categories
                    </div>
                    <div className="text-[11px] text-zinc-400 font-mono">
                      Taxonomy &amp; curriculum tracks
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-zinc-400 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </Link>

              <Link 
                href="/admin/tags" 
                className="flex items-center justify-between p-3 rounded-md hover:bg-white/5 border border-transparent hover:border-white/10 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-[#FF5E14]">
                    <TagIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white group-hover:text-[#FF5E14] transition-colors">
                      Manage Tags
                    </div>
                    <div className="text-[11px] text-zinc-400 font-mono">
                      Filter keywords &amp; labels
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-zinc-400 group-hover:text-[#FF5E14] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </Link>
            </CardContent>
          </Card>

          {/* System Environment Status Card */}
          <Card className="rounded-md border border-white/10 bg-[#111116] shadow-sm text-white">
            <CardHeader className="pb-3 border-b border-white/10 bg-white/5">
              <CardTitle className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                <Database className="h-4 w-4 text-[#FF5E14]" />
                Infrastructure Health
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3 font-mono">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">REST API Server</span>
                <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Express (:5000) Active
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Database Provider</span>
                <span className="font-semibold text-white">PostgreSQL (Supabase)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Session Protocol</span>
                <span className="font-semibold text-white">JWT + HTTP-Only Cookies</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">CSRF Protection</span>
                <span className="font-semibold text-emerald-400">Double Submit Header</span>
              </div>
            </CardContent>
          </Card>

        </div>

      </div>

    </div>
  );
}