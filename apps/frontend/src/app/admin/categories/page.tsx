'use client';

import { useEffect, useState } from 'react';
import { 
  FolderOpen, 
  Plus, 
  Trash2, 
  Search, 
  Loader2, 
  AlertCircle, 
  BookOpen 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/auth/context';
import { apiClient } from '@/lib/api/client';
import type { Category } from '@/lib/blog/types';

export const dynamic = 'force-dynamic';

export default function AdminCategoriesPage() {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // New category form state
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await apiClient.getCategories();
      const data = response.data || [];
      setCategories(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load categories from API');
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
      await apiClient.createCategory({
        name: name.trim(),
        slug: slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: description.trim() || undefined,
      });

      setName('');
      setSlug('');
      setDescription('');
      setShowCreateForm(false);
      await fetchCategories();
    } catch (err: any) {
      alert(err.message || 'Failed to create category');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (id: string, catName: string) => {
    if (!confirm(`Are you sure you want to delete category "${catName}"?`)) return;
    setIsDeleting(id);
    try {
      await apiClient.deleteCategory(id);
      setCategories(categories.filter((c) => c.id !== id));
    } catch (err: any) {
      alert(err.message || 'Failed to delete category');
    } finally {
      setIsDeleting(null);
    }
  };

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.description && c.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground tracking-tight">
            Curriculum Categories
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Organize articles into thematic pillars (Product Strategy, Engineering, Startup Growth).
          </p>
        </div>

        <Button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-[#FF5E14] hover:bg-[#E0500D] text-white rounded-md gap-2 h-10 shadow-sm shadow-[#FF5E14]/25 font-semibold text-xs"
        >
          <Plus className="h-4 w-4" />
          <span>{showCreateForm ? 'Cancel' : 'New Category'}</span>
        </Button>
      </div>

      {/* Error alert */}
      {error && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive flex items-center gap-3">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      {/* Create Form Drawer / Card */}
      {showCreateForm && (
        <Card className="rounded-md border border-white/10 bg-[#111116] text-white shadow-md animate-fade-in">
          <CardHeader className="pb-3 border-b border-white/10 bg-white/5">
            <CardTitle className="text-base font-heading font-bold flex items-center gap-2 text-white">
              <FolderOpen className="h-4 w-4 text-[#FF5E14]" />
              Add New Editorial Category
            </CardTitle>
            <CardDescription className="text-xs">
              Categories group articles into high-level tracks for students and parents.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-5">
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cat-name" className="text-xs font-semibold">Category Name *</Label>
                  <Input
                    id="cat-name"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. AI & Machine Learning"
                    required
                    className="h-10 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cat-slug" className="text-xs font-semibold">URL Slug *</Label>
                  <Input
                    id="cat-slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="ai-and-machine-learning"
                    required
                    className="h-10 rounded-xl font-mono text-xs"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cat-desc" className="text-xs font-semibold">Description</Label>
                <Input
                  id="cat-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short summary of topics covered in this track..."
                  className="h-10 rounded-xl"
                />
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
                  Save Category
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Search & Stats Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Filter categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 rounded-xl bg-card border-border"
          />
        </div>

        <div className="text-xs text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filteredCategories.length}</span> category tracks
        </div>
      </div>

      {/* Categories Grid */}
      {isLoading ? (
        <div className="p-16 flex flex-col items-center justify-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#FF5E14]" />
          <p className="text-sm font-medium text-zinc-400 font-mono">Loading taxonomy...</p>
        </div>
      ) : filteredCategories.length === 0 ? (
        <Card className="p-12 text-center rounded-md border border-white/10 bg-[#111116] text-white">
          <FolderOpen className="h-10 w-10 text-zinc-500 mx-auto mb-3 opacity-40" />
          <h3 className="text-sm font-semibold text-white">No categories found</h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
            {searchQuery ? 'No category matches your search.' : 'Create a category to begin classifying publications.'}
          </p>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((cat) => (
            <Card key={cat.id} className="rounded-md border border-white/10 bg-[#111116] text-white hover:border-[#FF5E14]/40 hover:shadow-md transition-all relative overflow-hidden group">
              <div className="h-1 bg-[#FF5E14]" />
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-heading font-bold text-base text-white group-hover:text-[#FF5E14] transition-colors">
                      {cat.name}
                    </h3>
                    <code className="text-[11px] text-[#FF5E14] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded mt-1 inline-block">
                      /{cat.slug}
                    </code>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(cat.id, cat.name)}
                    disabled={isDeleting === cat.id}
                    className="h-8 w-8 text-zinc-400 hover:text-rose-400 hover:bg-white/5"
                    title="Delete category"
                  >
                    {isDeleting === cat.id ? (
                      <Loader2 className="h-4 w-4 animate-spin text-rose-500" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                <p className="text-xs text-zinc-400 line-clamp-2">
                  {cat.description || 'No description provided for this track.'}
                </p>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3 text-[#FF5E14]" />
                    <span>Curriculum Pillar</span>
                  </span>
                  <span>ID: {cat.id.slice(0, 8)}...</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

    </div>
  );
}