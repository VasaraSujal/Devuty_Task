import { getArticleBySlug, getAllArticles } from '@/lib/blog/api';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  Sparkles, 
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: 'Article Not Found — Tactyqal Labs',
    };
  }

  return {
    title: `${article.title} — Tactyqal Labs`,
    description: article.excerpt || article.title,
    openGraph: {
      title: article.title,
      description: article.excerpt || '',
      images: article.coverImage ? [{ url: article.coverImage }] : undefined,
      type: 'article',
      publishedTime: article.publishedAt || undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  // Related articles in the same category or overall
  const allArticles = await getAllArticles();
  const related = allArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return 'Recently';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article className="py-12 sm:py-16 lg:py-20 text-white relative">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Navigation Breadcrumb with Telemetry Tracker */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-[#FF5E14] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>&lt; Back to Dispatches</span>
          </Link>
          <div className="hidden sm:flex items-center gap-3 text-zinc-500 text-[10px]">
            <span>NODE_ID // 0xREADER</span>
            <span>•</span>
            <span className="text-[#FF5E14]">STATUS // VERIFIED</span>
          </div>
        </div>

        {/* Article Header with Cyber Framing */}
        <header className="space-y-6 relative p-6 sm:p-8 rounded-md bg-[#111116] border border-white/10 shadow-xl overflow-hidden">
          {/* Subtle Corner Crosshairs */}
          <div className="absolute top-2 left-2 font-mono text-[10px] text-zinc-600 select-none">+</div>
          <div className="absolute top-2 right-2 font-mono text-[10px] text-zinc-600 select-none">+</div>
          <div className="absolute bottom-2 left-2 font-mono text-[10px] text-zinc-600 select-none">+</div>
          <div className="absolute bottom-2 right-2 font-mono text-[10px] text-zinc-600 select-none">+</div>

          <div className="flex flex-wrap items-center gap-2.5">
            {article.category && (
              <span className="px-3 py-1 rounded-xs text-xs font-mono uppercase tracking-wider bg-[#FF5E14]/10 text-[#FF5E14] border border-[#FF5E14]/30">
                {article.category.name}
              </span>
            )}
            <span className="text-xs text-zinc-400 font-mono flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(article.publishedAt)}
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs text-zinc-400 font-mono flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {article.readingTime || 4} min read
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-[1.2]">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-sans">
              {article.excerpt}
            </p>
          )}

          {/* Author bar */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-md bg-[#FF5E14] text-black flex items-center justify-center font-bold text-sm shadow-md shadow-[#FF5E14]/20">
                T
              </div>
              <div>
                <div className="font-heading font-bold text-sm text-white">
                  {article.author?.name || 'Tactyqal Labs Editorial'}
                </div>
                <div className="text-[11px] text-zinc-400 font-mono">
                  Curriculum &amp; Mentorship Team
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-[11px] hidden sm:inline">Tactyqal Verified</span>
              <CheckCircle2 className="h-4 w-4 text-[#FF5E14]" />
            </div>
          </div>
        </header>

        {/* Cover Image if present */}
        {article.coverImage && (
          <div className="rounded-md overflow-hidden border border-white/10 shadow-lg max-h-[440px] bg-[#121217]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={article.coverImage} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Main Content Body */}
        <div 
          className="prose prose-invert lg:prose-lg max-w-none text-zinc-200
            prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white
            prose-p:leading-relaxed prose-li:leading-relaxed
            prose-a:text-[#FF5E14] prose-a:underline hover:prose-a:text-[#E0500D]
            prose-strong:text-white"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="pt-8 border-t border-white/10 space-y-3 font-mono">
            <div className="text-xs uppercase tracking-wider text-zinc-400">
              Categorized Topics
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/blog?tag=${tag.slug}`}
                  className="px-3 py-1 rounded-xs bg-[#16161D] hover:border-[#FF5E14]/40 text-xs font-mono text-zinc-300 hover:text-[#FF5E14] transition-colors border border-white/10"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Closing Enrollment Banner */}
        <div className="p-8 sm:p-10 rounded-md bg-[#111116] text-white border border-white/10 shadow-xl space-y-5 text-center sm:text-left sm:flex sm:items-center sm:justify-between sm:space-y-0 relative overflow-hidden">
          <div className="space-y-2 max-w-lg relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs text-xs font-mono uppercase tracking-wider bg-[#FF5E14]/10 text-[#FF5E14] border border-[#FF5E14]/30">
              <Sparkles className="w-3 h-3" />
              Tactyqal Labs 8-Week Cohort
            </span>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
              Ready to build the next app that impacts millions?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Transform ideas into launched software products with weekly 1:1 mentor sessions. Limited to 15 students per cohort.
            </p>
          </div>

          <div className="shrink-0 pt-3 sm:pt-0 relative z-10">
            <Link href="/#enroll">
              <Button className="bg-[#FF5E14] hover:bg-[#E0500D] text-white font-semibold h-11 px-6 rounded-md shadow-md shadow-[#FF5E14]/20 transition-all">
                <span>Enroll in Cohort</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="pt-12 border-t border-white/10 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-heading font-bold text-white">
                More From Tactyqal Labs
              </h3>
              <Link href="/blog" className="text-xs font-mono text-[#FF5E14] hover:underline">
                View All Articles &gt;
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rel) => (
                <article 
                  key={rel.id}
                  className="p-5 rounded-md border border-white/10 bg-[#111116] hover:border-[#FF5E14]/40 hover:-translate-y-1 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-semibold text-[#FF5E14] uppercase tracking-wider">
                      {rel.category?.name || 'Article'}
                    </span>
                    <Link href={`/blog/${rel.slug}`}>
                      <h4 className="font-heading font-bold text-sm text-white group-hover:text-[#FF5E14] transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                    </Link>
                    <p className="text-xs text-zinc-400 line-clamp-2">
                      {rel.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                    <span>{rel.readingTime || 4} min read</span>
                    <span className="font-semibold text-[#FF5E14] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      Read <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  );
}