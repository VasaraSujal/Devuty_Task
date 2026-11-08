import Link from 'next/link';
import { 
  Sparkles, 
  Search, 
  Clock, 
  Calendar, 
  ArrowRight, 
  BookOpen, 
  Tag as TagIcon, 
  FolderOpen,
  ArrowUpRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  getAllArticles, 
  getArticlesByCategory, 
  getArticlesByTag,
  getCategoriesWithCounts, 
  getTagsWithCounts,
  type BlogArticle 
} from '@/lib/blog/api';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Blog & Editorial Insights — Tactyqal Labs',
  description: 'Articles on youth entrepreneurship, no-code development, Ivy League admissions, and startup building for aspiring young founders.',
};

interface BlogPageProps {
  searchParams?: {
    category?: string;
    tag?: string;
    q?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const selectedCategory = searchParams?.category;
  const selectedTag = searchParams?.tag;
  const searchQuery = searchParams?.q?.toLowerCase() || '';

  // Fetch articles based on filter or all
  let articles: BlogArticle[] = [];
  if (selectedCategory) {
    articles = await getArticlesByCategory(selectedCategory);
  } else if (selectedTag) {
    articles = await getArticlesByTag(selectedTag);
  } else {
    articles = await getAllArticles();
  }

  // Client-side search filtering on title/excerpt
  if (searchQuery) {
    articles = articles.filter((a) =>
      a.title.toLowerCase().includes(searchQuery) ||
      (a.excerpt && a.excerpt.toLowerCase().includes(searchQuery))
    );
  }

  const [categories, tags] = await Promise.all([
    getCategoriesWithCounts(),
    getTagsWithCounts(),
  ]);

  const featured = articles.length > 0 ? articles[0] : null;
  const standardArticles = articles.length > 1 ? articles.slice(1) : [];

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return 'Recent';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="py-12 sm:py-16 lg:py-24 text-white">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Editorial Publication Header */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xs text-xs font-mono uppercase tracking-wider bg-[#FF5E14]/10 border border-[#FF5E14]/30 text-[#FF5E14]">
            <Sparkles className="w-3.5 h-3.5" />
            Tactyqal Insights &amp; Founder Stories
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-white leading-[1.15]">
            Ideas, Blueprints, &amp; Stories on <span className="text-[#FF5E14]">Building the Future</span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Practical guides for parents, aspiring teenage founders, and mentors on shipping real software, mastering no-code tools, and creating collegiate distinction.
          </p>

          {/* Search bar */}
          <form method="GET" action="/blog" className="pt-2 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="search"
                name="q"
                defaultValue={searchQuery}
                placeholder="Search articles on MVPs, admissions, no-code..."
                className="w-full pl-10 pr-4 h-11 rounded-md border border-white/10 bg-[#121217] text-white shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#FF5E14] focus:border-[#FF5E14]"
              />
            </div>
          </form>
        </div>

        {/* Category Filter Pills */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Link
              href="/blog"
              className={`px-4 py-2 rounded-md text-xs font-mono uppercase tracking-wider transition-all ${
                !selectedCategory && !selectedTag
                  ? 'bg-[#FF5E14] text-white shadow-md shadow-[#FF5E14]/25'
                  : 'bg-[#121217] text-zinc-400 hover:text-white hover:bg-white/5 border border-white/10'
              }`}
            >
              All Topics
            </Link>

            {categories.map((cat) => {
              const isActive = selectedCategory === cat.slug;
              return (
                <Link
                  key={cat.id}
                  href={`/blog?category=${cat.slug}`}
                  className={`px-4 py-2 rounded-md text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#FF5E14] text-white shadow-md shadow-[#FF5E14]/25'
                      : 'bg-[#121217] text-zinc-400 hover:text-white hover:bg-white/5 border border-white/10'
                  }`}
                >
                  <span>{cat.name}</span>
                  {cat.count > 0 && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isActive ? 'bg-black/30 text-white' : 'bg-white/5 text-zinc-400'
                    }`}>
                      {cat.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Active filter badge if filtered */}
          {(selectedCategory || selectedTag || searchQuery) && (
            <div className="flex items-center justify-center gap-2 text-xs text-zinc-400 pt-2 font-mono">
              <span>Filtering by:</span>
              <span className="font-semibold text-white px-2 py-0.5 rounded-xs bg-[#16161D] border border-white/10">
                {selectedCategory ? `Category: ${selectedCategory}` : selectedTag ? `Tag: #${selectedTag}` : `Search: "${searchQuery}"`}
              </span>
              <Link href="/blog" className="text-[#FF5E14] hover:underline font-medium ml-1">
                Clear all filters
              </Link>
            </div>
          )}
        </div>

        {/* Articles Section */}
        {articles.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-md bg-[#121217] border border-white/10 text-[#FF5E14] mx-auto flex items-center justify-center">
              <BookOpen className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white">
              No matching articles found
            </h3>
            <p className="text-sm text-zinc-400">
              We couldn&apos;t find any articles matching your query. Try clearing your filters or exploring our other curriculum pillars.
            </p>
            <div className="pt-2">
              <Link href="/blog">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-md font-mono text-xs uppercase">
                  Reset &amp; View All Articles
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-16">
            
            {/* Featured Article Spotlight (First Article) */}
            {featured && (
              <div className="relative rounded-md border border-white/10 bg-[#111116] overflow-hidden shadow-xl hover:border-[#FF5E14]/40 transition-all duration-300 group">
                <div className="grid lg:grid-cols-12 gap-0">
                  
                  {/* Left Hero Graphic / Gradient */}
                  <div className="lg:col-span-5 bg-gradient-to-br from-[#1b1009] via-[#121217] to-[#070709] p-8 sm:p-12 flex flex-col justify-between text-white relative min-h-[300px] border-b lg:border-b-0 lg:border-r border-white/10">
                    <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-[size:16px_16px] pointer-events-none" />
                    
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs text-[11px] font-mono uppercase bg-[#FF5E14]/20 text-[#FF5E14] border border-[#FF5E14]/40">
                        <Sparkles className="w-3.5 h-3.5" />
                        Featured Spotlight
                      </span>

                      <span className="text-xs text-zinc-400 font-mono">
                        {featured.category?.name || 'Publication'}
                      </span>
                    </div>

                    <div className="relative z-10 py-6">
                      <div className="h-16 w-16 rounded-md bg-[#FF5E14]/15 border border-[#FF5E14]/30 flex items-center justify-center text-[#FF5E14] mb-4 group-hover:scale-105 transition-transform">
                        <BookOpen className="h-8 w-8" />
                      </div>
                      <p className="text-xs text-[#FF5E14] font-mono uppercase tracking-wider">
                        Curriculum Deep Dive
                      </p>
                    </div>

                    <div className="relative z-10 flex items-center gap-4 text-xs text-zinc-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(featured.publishedAt)}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {featured.readingTime || 4} min read
                      </span>
                    </div>
                  </div>

                  {/* Right Editorial Copy */}
                  <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        {featured.tags?.map((t) => (
                          <span key={t.id} className="text-xs font-mono text-[#FF5E14]">
                            #{t.name}
                          </span>
                        ))}
                      </div>

                      <Link href={`/blog/${featured.slug}`}>
                        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white group-hover:text-[#FF5E14] transition-colors leading-snug">
                          {featured.title}
                        </h2>
                      </Link>

                      <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                        {featured.excerpt}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-md bg-[#FF5E14] text-black flex items-center justify-center font-bold text-xs">
                          T
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white">Tactyqal Editorial</div>
                          <div className="text-[11px] text-zinc-400 font-mono">Founder &amp; Mentor Team</div>
                        </div>
                      </div>

                      <Link 
                        href={`/blog/${featured.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#FF5E14] hover:text-[#E0500D] group-hover:translate-x-1 transition-all"
                      >
                        <span>Read Full Guide</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>

                  </div>

                </div>
              </div>
            )}

            {/* Articles Grid (Remaining Articles) */}
            {standardArticles.length > 0 && (
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="text-lg font-heading font-bold text-white">
                    Latest Publications
                  </h3>
                  <span className="text-xs text-zinc-400 font-mono">
                    {standardArticles.length} articles available
                  </span>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {standardArticles.map((article) => (
                    <article 
                      key={article.id}
                      className="rounded-md border border-white/10 bg-[#111116] shadow-sm hover:border-[#FF5E14]/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                    >
                      <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between text-xs font-mono">
                          {article.category && (
                            <span className="font-semibold text-[#FF5E14] bg-[#FF5E14]/10 px-2.5 py-0.5 rounded-xs border border-[#FF5E14]/30">
                              {article.category.name}
                            </span>
                          )}
                          <span className="text-zinc-400 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {article.readingTime || 4} min
                          </span>
                        </div>

                        <Link href={`/blog/${article.slug}`}>
                          <h4 className="font-heading font-bold text-lg text-white group-hover:text-[#FF5E14] transition-colors line-clamp-2 leading-snug">
                            {article.title}
                          </h4>
                        </Link>

                        <p className="text-xs text-zinc-300 leading-relaxed line-clamp-3">
                          {article.excerpt}
                        </p>
                      </div>

                      <div className="p-6 pt-0 border-t border-white/10 mt-auto flex items-center justify-between text-xs text-zinc-400 font-mono">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(article.publishedAt)}
                        </span>

                        <Link 
                          href={`/blog/${article.slug}`} 
                          className="font-semibold text-[#FF5E14] hover:text-[#E0500D] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                        >
                          Read <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* Discovery Tag Cloud at bottom */}
        {tags.length > 0 && (
          <div className="p-8 rounded-md bg-[#121217] border border-white/10 text-center space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              Explore Articles by Topic Tags
            </h4>
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
              {tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/blog?tag=${tag.slug}`}
                  className="px-3 py-1.5 rounded-xs bg-[#16161D] border border-white/10 text-xs font-mono text-zinc-400 hover:text-[#FF5E14] hover:border-[#FF5E14]/40 transition-colors"
                >
                  #{tag.name} {tag.count > 0 && `(${tag.count})`}
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}