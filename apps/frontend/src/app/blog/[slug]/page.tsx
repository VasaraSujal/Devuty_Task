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
    <article className="py-12 sm:py-16 lg:py-20 bg-background text-foreground">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Navigation Breadcrumb */}
        <div>
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Insights &amp; Articles</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            {article.category && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                {article.category.name}
              </span>
            )}
            <span className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(article.publishedAt)}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {article.readingTime || 4} min read
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-foreground tracking-tight leading-[1.2]">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              {article.excerpt}
            </p>
          )}

          {/* Author bar */}
          <div className="pt-4 border-t flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full bg-indigo-600/10 border border-indigo-500/20 text-indigo-600 flex items-center justify-center font-bold text-sm">
                T
              </div>
              <div>
                <div className="font-heading font-bold text-sm text-foreground">
                  {article.author?.name || 'Tactyqal Labs Editorial'}
                </div>
                <div className="text-xs text-muted-foreground">
                  Curriculum &amp; Mentorship Team
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground hidden sm:inline">Tactyqal Verified</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </div>
          </div>
        </header>

        {/* Cover Image if present */}
        {article.coverImage && (
          <div className="rounded-3xl overflow-hidden border shadow-lg max-h-[440px] bg-muted">
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
          className="prose dark:prose-invert prose-indigo lg:prose-lg max-w-none 
            prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight 
            prose-p:leading-relaxed prose-li:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="pt-8 border-t space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Categorized Topics
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/blog?tag=${tag.slug}`}
                  className="px-3 py-1 rounded-xl bg-muted/60 hover:bg-muted text-xs font-medium text-foreground transition-colors border"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Closing Enrollment Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white border border-slate-800 shadow-xl space-y-5 text-center sm:text-left sm:flex sm:items-center sm:justify-between sm:space-y-0">
          <div className="space-y-2 max-w-lg">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Sparkles className="w-3 h-3" />
              Tactyqal Labs 8-Week Cohort
            </span>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
              Ready to build the next app that impacts millions?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Transform ideas into launched software products with weekly 1:1 mentor sessions. Limited to 15 students per cohort.
            </p>
          </div>

          <div className="shrink-0 pt-3 sm:pt-0">
            <Link href="/#enroll">
              <Button className="bg-white hover:bg-slate-100 text-slate-950 font-semibold h-11 px-6 rounded-xl shadow-lg">
                <span>Enroll in Cohort</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="pt-12 border-t space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-heading font-bold text-foreground">
                More From Tactyqal Labs
              </h3>
              <Link href="/blog" className="text-xs font-semibold text-indigo-600 hover:underline">
                View All Articles
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rel) => (
                <article 
                  key={rel.id}
                  className="p-5 rounded-2xl border bg-card hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">
                      {rel.category?.name || 'Article'}
                    </span>
                    <Link href={`/blog/${rel.slug}`}>
                      <h4 className="font-heading font-bold text-sm text-foreground group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                    </Link>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {rel.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>{rel.readingTime || 4} min read</span>
                    <span className="font-semibold text-indigo-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
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