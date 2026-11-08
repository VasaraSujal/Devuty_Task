'use client';

import { useEffect, useState } from 'react';
import { 
  Tag as TagIcon, 
  Plus, 
  Trash2, 
  Search, 
  Loader2, 
  AlertCircle, 
  Hash,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/auth/context';
import { apiClient } from '@/lib/api/client';
import type { Tag } from '@/lib/blog/types';

export const dynamic = 'force-dynamic';

export default function AdminTagsPage() {
  const { user } = useAuth();
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // New tag state
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await apiClient.getTags();
      const data = response.data || [];
      setTags(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load tags from API');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNameChange = (val: string) => {
    setName(val);
    const generated = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setSlug(generated);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setIsCreating(true);
      await apiClient.createTag({
        name: name.trim(),
        slug: slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      });

      setName('');
      setSlug('');
      setShowCreateForm(false);
      await fetchTags();
    } catch (err: any) {
      alert(err.message || 'Failed to create tag');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (id: string, tagName: string) => {
    if (!confirm(`Are you sure you want to delete tag "#${tagName}"?`)) return;
    setIsDeleting(id);
    try {
      await apiClient.deleteTag(id);
      setTags(tags.filter((t) => t.id !== id));
    } catch (err: any) {
      alert(err.message || 'Failed to delete tag');
    } finally {
      setIsDeleting(null);
    }
  };

  const filteredTags = tags.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground tracking-tight">
            Keywords &amp; Tag Taxonomy
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage granular indexing tags for student projects, technology tools, and college guidance.
          </p>
        </div>

        <Button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-[#FF5E14] hover:bg-[#E0500D] text-white rounded-md gap-2 h-10 shadow-sm shadow-[#FF5E14]/25 font-semibold text-xs"
        >
          <Plus className="h-4 w-4" />
          <span>{showCreateForm ? 'Cancel' : 'New Tag'}</span>
        </Button>
      </div>

      {/* Error alert */}
      {error && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive flex items-center gap-3">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      {/* Create Form Drawer */}
      {showCreateForm && (
        <Card className="rounded-md border border-white/10 bg-[#111116] text-white shadow-md animate-fade-in">
          <CardHeader className="pb-3 border-b border-white/10 bg-white/5">
            <CardTitle className="text-base font-heading font-bold flex items-center gap-2 text-white">
              <Hash className="h-4 w-4 text-[#FF5E14]" />
              Add Discovery Tag
            </CardTitle>
            <CardDescription className="text-xs">
              Tags allow readers to filter across multiple categories (e.g. #no-code, #admissions).
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-5">
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tag-name" className="text-xs font-semibold">Tag Name *</Label>
                  <Input
                    id="tag-name"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. Bubble.io"
                    required
                    className="h-10 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tag-slug" className="text-xs font-semibold">Slug Identifier *</Label>
                  <Input
                    id="tag-slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="bubble-io"
                    required
                    className="h-10 rounded-xl font-mono text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowCreateForm(false)}
                  className="rounded-xl h-9 text-xs"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isCreating || !name.trim()}
                  className="bg-[#FF5E14] hover:bg-[#E0500D] text-white rounded-md h-9 text-xs font-semibold gap-1.5"
                >
                  {isCreating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Plus className="h-3.5 w-3.5" />}
                  Save Tag
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tags by label..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 rounded-xl bg-card border-border"
          />
        </div>

        <div className="text-xs text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filteredTags.length}</span> active tags
        </div>
      </div>

      {/* Tags Chips View */}
      {isLoading ? (
        <div className="p-16 flex flex-col items-center justify-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#FF5E14]" />
          <p className="text-sm font-medium text-zinc-400 font-mono">Loading tags...</p>
        </div>
      ) : filteredTags.length === 0 ? (
        <Card className="p-12 text-center rounded-md border border-white/10 bg-[#111116] text-white">
          <Hash className="h-10 w-10 text-zinc-500 mx-auto mb-3 opacity-40" />
          <h3 className="text-sm font-semibold text-white">No tags found</h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
            {searchQuery ? 'No tag matches your query.' : 'Create your first tag to start indexing content.'}
          </p>
        </Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredTags.map((tag) => (
            <div 
              key={tag.id}
              className="p-4 rounded-md border border-white/10 bg-[#111116] text-white hover:border-[#FF5E14]/40 hover:bg-white/5 transition-all flex items-center justify-between gap-3 group"
            >
              <div className="min-w-0 flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-md bg-[#FF5E14]/15 border border-[#FF5E14]/30 text-[#FF5E14] flex items-center justify-center shrink-0">
                  <Hash className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-heading font-semibold text-sm text-white group-hover:text-[#FF5E14] transition-colors truncate">
                    {tag.name}
                  </div>
                  <div className="text-[11px] text-zinc-400 font-mono truncate">
                    #{tag.slug}
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(tag.id, tag.name)}
                disabled={isDeleting === tag.id}
                className="h-7 w-7 text-muted-foreground hover:text-rose-600 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Delete tag"
              >
                {isDeleting === tag.id ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-rose-600" />
                ) : (
                  <Trash2 className="h-3.5 w-3.5" />
                )}
              </Button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}