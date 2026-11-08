'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Save, 
  Loader2, 
  Eye, 
  Edit3, 
  Sparkles, 
  Tag as TagIcon, 
  FolderOpen, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

export default function NewPostPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>('DRAFT');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [isSaving, setIsSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load categories and tags
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoadingData(true);
        const [catRes, tagRes] = await Promise.all([
          apiClient.getCategories(),
          apiClient.getTags(),
        ]);
        const catData = catRes.data || [];
        setCategories(catData);
        if (catData.length > 0) {
          setCategoryId(catData[0].id);
        }
        setTags(tagRes.data || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load taxonomies');
      } finally {
        setIsLoadingData(false);
      }
    }
    loadData();
  }, []);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    const generated = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setSlug(generated);
  };

  const handleTagToggle = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  };

  // Estimate reading time in minutes
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

      await apiClient.createPost({
        title: title.trim(),
        slug: slug.trim(),
        excerpt: excerpt.trim() || title.trim(),
        content: content.trim(),
        coverImage: coverImage.trim() || undefined,
        categoryId,
        tagIds: selectedTags,
        status: status as any,
        readingTime,
        featured: false,
        metaTitle: metaTitle.trim() || title.trim(),
        metaDescription: metaDescription.trim() || excerpt.trim(),
      } as any);

      router.push('/admin/posts');
    } catch (err: any) {
      setError(err.message || 'Failed to save post to backend');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#FF5E14]" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 text-white">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Link href="/admin/posts">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-md text-white hover:bg-white/10">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-heading font-bold text-white">
              Create New Article
            </h1>
            <p className="text-xs text-zinc-400 font-mono">
              Author insights, project reviews, and youth founder milestones.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/posts">
            <Button variant="outline" size="sm" className="rounded-md h-10 text-xs border-white/20 text-white hover:bg-white/10 font-mono">
              Cancel
            </Button>
          </Link>

          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-[#FF5E14] hover:bg-[#E0500D] text-white rounded-md gap-2 h-10 px-5 text-xs font-semibold shadow-sm shadow-[#FF5E14]/25"
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            <span>Save &amp; {status === 'PUBLISHED' ? 'Publish' : 'Keep Draft'}</span>
          </Button>
        </div>
      </div>

      {/* Error alert */}
      {error && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive flex items-center gap-3">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      {/* 2-Column Editor Grid */}
      <div className="grid gap-6 lg:grid-cols-12">
        
        {/* Main Content Area (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          <Card className="rounded-2xl border bg-card shadow-sm p-6 space-y-5">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="post-title" className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Article Title *
              </Label>
              <Input
                id="post-title"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. How KrishiDrishti Uses Mobile AI to Empower Rural Farmers"
                required
                className="h-12 text-base font-semibold rounded-xl bg-background"
              />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <Label htmlFor="post-slug" className="text-xs font-semibold text-foreground uppercase tracking-wider">
                URL Slug *
              </Label>
              <div className="flex items-center rounded-xl border border-input bg-muted/40 px-3 h-10 font-mono text-xs">
                <span className="text-muted-foreground mr-1">/blog/</span>
                <input
                  id="post-slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="article-url-slug"
                  className="bg-transparent text-foreground flex-1 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <Label htmlFor="post-excerpt" className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Short Excerpt / Summary
              </Label>
              <Textarea
                id="post-excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief summary appearing on blog cards and search results..."
                rows={3}
                className="rounded-xl resize-none text-sm bg-background"
              />
            </div>

            {/* Content Editor with Preview Toggle */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between pb-2 border-b">
                <div className="flex items-center gap-2">
                  <Label htmlFor="post-content" className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Body Content (HTML or Markdown) *
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
                  placeholder="<h2>Heading 2</h2><p>Start writing your educational article...</p>"
                  rows={16}
                  className="rounded-xl font-mono text-sm leading-relaxed p-4 bg-background"
                  required
                />
              ) : (
                <div className="min-h-[400px] p-6 rounded-xl border bg-card prose dark:prose-invert max-w-none text-sm leading-relaxed overflow-y-auto">
                  {content.trim() ? (
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                  ) : (
                    <p className="text-muted-foreground italic">
                      Nothing to preview yet. Switch back to Editor and add text.
                    </p>
                  )}
                </div>
              )}
            </div>
          </Card>

          {/* SEO Metadata Card */}
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
                  placeholder={title || 'Custom SEO Title'}
                  className="h-10 rounded-xl text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="seo-desc" className="text-xs">Meta Description</Label>
                <Input
                  id="seo-desc"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder={excerpt || 'Brief meta description for search engines'}
                  className="h-10 rounded-xl text-xs"
                />
              </div>
            </div>
          </Card>

        </div>

        {/* Right Sidebar Publishing Controls (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Status & Visibility */}
          <Card className="rounded-2xl border bg-card shadow-sm p-5 space-y-4">
            <h3 className="font-heading font-bold text-sm text-foreground uppercase tracking-wider">
              Publishing Status
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStatus('DRAFT')}
                  className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                    status === 'DRAFT'
                      ? 'bg-amber-500/10 text-amber-600 border-amber-500/30'
                      : 'border-border text-muted-foreground hover:bg-muted/40'
                  }`}
                >
                  Save as Draft
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('PUBLISHED')}
                  className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                    status === 'PUBLISHED'
                      ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
                      : 'border-border text-muted-foreground hover:bg-muted/40'
                  }`}
                >
                  Publish Immediately
                </button>
              </div>

              <p className="text-[11px] text-muted-foreground">
                {status === 'PUBLISHED' 
                  ? 'This article will be immediately visible on the public /blog route.'
                  : 'Drafts remain private to administrators until marked published.'}
              </p>
            </div>
          </Card>

          {/* Category */}
          <Card className="rounded-md border border-white/10 bg-[#111116] shadow-sm p-5 space-y-3 text-white">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                <FolderOpen className="h-4 w-4 text-[#FF5E14]" />
                Category Track
              </h3>
              <Link href="/admin/categories" className="text-[11px] font-mono text-[#FF5E14] hover:underline">
                Manage
              </Link>
            </div>

            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full h-11 text-xs font-medium rounded-md border border-white/10 bg-[#16161D] px-3 text-white focus:outline-none focus:border-[#FF5E14] focus:ring-1 focus:ring-[#FF5E14]"
              required
            >
              <option value="" disabled>Select category pillar...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id} className="bg-[#111116] text-white">
                  {cat.name}
                </option>
              ))}
            </select>
          </Card>

          {/* Tag multi-select */}
          <Card className="rounded-md border border-white/10 bg-[#111116] shadow-sm p-5 space-y-3 text-white">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                <TagIcon className="h-4 w-4 text-[#FF5E14]" />
                Discovery Tags
              </h3>
              <Link href="/admin/tags" className="text-[11px] font-mono text-[#FF5E14] hover:underline">
                Manage
              </Link>
            </div>

            {tags.length === 0 ? (
              <p className="text-xs text-zinc-400 font-mono">No tags configured yet.</p>
            ) : (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {tags.map((t) => {
                  const isChecked = selectedTags.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleTagToggle(t.id)}
                      className={`px-2.5 py-1 rounded-xs text-xs font-mono transition-all ${
                        isChecked
                          ? 'bg-[#FF5E14] text-white shadow-sm'
                          : 'bg-[#16161D] text-zinc-400 hover:text-white hover:bg-white/5 border border-white/10'
                      }`}
                    >
                      #{t.name}
                    </button>
                  );
                })}
              </div>
            )}
          </Card>

          {/* Cover Image */}
          <Card className="rounded-md border border-white/10 bg-[#111116] shadow-sm p-5 space-y-3 text-white">
            <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-[#FF5E14]" />
              Cover Image URL
            </h3>
            <Input
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="h-10 rounded-md text-xs bg-[#16161D] border-white/10 text-white focus:border-[#FF5E14] focus:ring-[#FF5E14]"
            />
            {coverImage && (
              <div className="mt-2 h-32 rounded-xl border overflow-hidden bg-muted relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverImage}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                  onError={() => setCoverImage('')}
                />
              </div>
            )}
          </Card>

        </div>

      </div>

    </div>
  );
}