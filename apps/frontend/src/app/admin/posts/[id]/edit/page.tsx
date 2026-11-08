'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Save, 
  Loader2, 
  Eye, 
  Edit3, 
  Tag as TagIcon, 
  FolderOpen, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Trash2,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { apiClient } from '@/lib/api/client';
import { useAuth } from '@/lib/auth/context';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}

export const dynamic = 'force-dynamic';

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED' | 'ARCHIVED'>('DRAFT');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPostData() {
      if (!postId) return;
      try {
        setIsLoading(true);
        setError(null);

        const [postRes, catRes, tagRes] = await Promise.all([
          apiClient.getPostById(postId),
          apiClient.getCategories(),
          apiClient.getTags(),
        ]);

        const p = (postRes as any).data || postRes;
        if (p) {
          setTitle(p.title || '');
          setSlug(p.slug || '');
          setExcerpt(p.excerpt || '');
          setContent(p.content || '');
          setCoverImage(p.coverImage || '');
          setCategoryId(p.categoryId || '');
          setStatus((p.status || 'DRAFT').toUpperCase());
          setMetaTitle(p.metaTitle || '');
          setMetaDescription(p.metaDescription || '');

          // Extract tag IDs
          if (Array.isArray(p.tags)) {
            setSelectedTags(p.tags.map((t: any) => t.id || t.tagId || t.tag?.id).filter(Boolean));
          } else if (Array.isArray(p.tagIds)) {
            setSelectedTags(p.tagIds);
          }
        }

        setCategories(catRes.data || []);
        setTags(tagRes.data || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch article details');
      } finally {
        setIsLoading(false);
      }
    }

    loadPostData();
  }, [postId]);

  const handleTagToggle = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  };

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim() || !content.trim() || !categoryId) {
      setError('Please provide Title, Slug, Content, and select a Category.');
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      await apiClient.updatePost(postId, {
        title: title.trim(),
        slug: slug.trim(),
        excerpt: excerpt.trim() || title.trim(),
        content: content.trim(),
        coverImage: coverImage.trim() || undefined,
        categoryId,
        tagIds: selectedTags,
        status: status as any,
        readingTime,
        metaTitle: metaTitle.trim() || title.trim(),
        metaDescription: metaDescription.trim() || excerpt.trim(),
      } as any);

      router.push('/admin/posts');
    } catch (err: any) {
      setError(err.message || 'Failed to update post');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to permanently delete this article?')) return;
    try {
      setIsDeleting(true);
      await apiClient.deletePost(postId);
      router.push('/admin/posts');
    } catch (err: any) {
      alert(err.message || 'Failed to delete post');
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          <p className="text-sm text-muted-foreground">Loading article draft...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b">
        <div className="flex items-center gap-3">
          <Link href="/admin/posts">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
              Edit Article: <span className="text-indigo-600">{title || 'Untitled'}</span>
            </h1>
            <p className="text-xs text-muted-foreground">
              Modify publication copy, publishing status, and metadata.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {status === 'PUBLISHED' && (
            <Link href={`/blog/${slug}`} target="_blank">
              <Button variant="outline" size="sm" className="rounded-xl h-10 text-xs gap-1.5">
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Live View</span>
              </Button>
            </Link>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            className="rounded-xl h-10 text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 gap-1.5"
          >
            {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            <span>Delete</span>
          </Button>

          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl gap-2 h-10 px-5 text-xs font-semibold shadow-sm shadow-indigo-600/30"
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            <span>Save Changes</span>
          </Button>
        </div>
      </div>

      {/* Error Notice */}
      {error && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive flex items-center gap-3">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      {/* 2-Column Grid */}
      <div className="grid gap-6 lg:grid-cols-12">
        
        {/* Main Editor (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="rounded-2xl border bg-card shadow-sm p-6 space-y-5">
            
            <div className="space-y-2">
              <Label htmlFor="post-title" className="text-xs font-semibold uppercase tracking-wider">
                Article Title *
              </Label>
              <Input
                id="post-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Article title..."
                required
                className="h-12 text-base font-semibold rounded-xl bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="post-slug" className="text-xs font-semibold uppercase tracking-wider">
                URL Slug *
              </Label>
              <div className="flex items-center rounded-xl border border-input bg-muted/40 px-3 h-10 font-mono text-xs">
                <span className="text-muted-foreground mr-1">/blog/</span>
                <input
                  id="post-slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="bg-transparent text-foreground flex-1 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="post-excerpt" className="text-xs font-semibold uppercase tracking-wider">
                Excerpt
              </Label>
              <Textarea
                id="post-excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                className="rounded-xl resize-none text-sm bg-background"
              />
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between pb-2 border-b">
                <div className="flex items-center gap-2">
                  <Label htmlFor="post-content" className="text-xs font-semibold uppercase tracking-wider">
                    Content
                  </Label>
                  <span className="text-[11px] text-muted-foreground">
                    ({wordCount} words • ~{readingTime} min read)
                  </span>
                </div>

                <div className="inline-flex rounded-lg border bg-muted/50 p-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab('edit')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                      activeTab === 'edit'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                    Editor
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('preview')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                      activeTab === 'preview'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Eye className="h-3.5 w-3.5" />
                    Preview
                  </button>
                </div>
              </div>

              {activeTab === 'edit' ? (
                <Textarea
                  id="post-content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={16}
                  className="rounded-xl font-mono text-sm leading-relaxed p-4 bg-background"
                  required
                />
              ) : (
                <div className="min-h-[400px] p-6 rounded-xl border bg-card prose dark:prose-invert max-w-none text-sm leading-relaxed overflow-y-auto">
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
              )}
            </div>

          </Card>

          {/* SEO Card */}
          <Card className="rounded-2xl border bg-card shadow-sm p-6 space-y-4">
            <h3 className="font-heading font-bold text-sm text-foreground uppercase tracking-wider">
              Search Engine Optimization (SEO)
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="seo-title" className="text-xs">Meta Title</Label>
                <Input
                  id="seo-title"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder={title}
                  className="h-10 rounded-xl text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="seo-desc" className="text-xs">Meta Description</Label>
                <Input
                  id="seo-desc"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder={excerpt}
                  className="h-10 rounded-xl text-xs"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Right Controls (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          <Card className="rounded-2xl border bg-card shadow-sm p-5 space-y-4">
            <h3 className="font-heading font-bold text-sm text-foreground uppercase tracking-wider">
              Status
            </h3>

            <div className="grid grid-cols-3 gap-2">
              {(['DRAFT', 'PUBLISHED', 'ARCHIVED'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={`py-2 px-2 rounded-xl border text-[11px] font-semibold text-center transition-all ${
                    status === s
                      ? s === 'PUBLISHED'
                        ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
                        : s === 'DRAFT'
                        ? 'bg-amber-500/10 text-amber-600 border-amber-500/30'
                        : 'bg-slate-500/10 text-slate-600 border-slate-500/30'
                      : 'border-border text-muted-foreground hover:bg-muted/40'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </Card>

          <Card className="rounded-2xl border bg-card shadow-sm p-5 space-y-3">
            <h3 className="font-heading font-bold text-sm text-foreground uppercase tracking-wider flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-indigo-500" />
              Category Track
            </h3>

            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full h-11 text-xs font-medium rounded-xl border border-input bg-background px-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              required
            >
              <option value="" disabled>Select category pillar...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </Card>

          <Card className="rounded-2xl border bg-card shadow-sm p-5 space-y-3">
            <h3 className="font-heading font-bold text-sm text-foreground uppercase tracking-wider flex items-center gap-2">
              <TagIcon className="h-4 w-4 text-indigo-500" />
              Discovery Tags
            </h3>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {tags.map((t) => {
                const isChecked = selectedTags.includes(t.id);
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleTagToggle(t.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      isChecked
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    #{t.name}
                  </button>
                );
              })}
            </div>
          </Card>

          <Card className="rounded-2xl border bg-card shadow-sm p-5 space-y-3">
            <h3 className="font-heading font-bold text-sm text-foreground uppercase tracking-wider flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-indigo-500" />
              Cover Image URL
            </h3>
            <Input
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://..."
              className="h-10 rounded-xl text-xs"
            />
          </Card>

        </div>

      </div>

    </div>
  );
}