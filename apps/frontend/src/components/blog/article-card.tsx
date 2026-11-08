/**
 * Blog Article Card component - reusable article preview
 */

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ArticleListItem } from '@/lib/blog/types';

interface ArticleCardProps {
  article: ArticleListItem;
  featured?: boolean;
  onReadMore?: (slug: string) => void;
}

export function ArticleCard({ article, featured = false, onReadMore }: ArticleCardProps) {
  const handleReadMore = () => {
    onReadMore?.(article.slug);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (featured) {
    return (
      <article className="group animate-fade-in-up">
        <Link href={`/blog/${article.slug}`} className="block">
          <div className="relative w-full rounded-xl overflow-hidden bg-card border shadow-lg group-hover:shadow-xl transition-shadow duration-300">
            {article.coverImage && (
              <img
                src={article.coverImage}
                alt={`${article.title} cover`}
                className="w-full h-48 md:h-64 object-cover"
                loading="lazy"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" aria-hidden="true" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <Badge variant="primary" size="sm" className="mb-2">
                Featured
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">
                {article.title}
              </h2>
              <p className="text-sm text-white/90 line-clamp-3 mb-3">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-3 text-xs text-white/80">
                <span>{article.author.name}</span>
                <span>•</span>
                <span>{formatDate(article.publishedAt)}</span>
                <span>•</span>
                <span>{article.readingTime} min read</span>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group animate-fade-in-up">
      <Link href={`/blog/${article.slug}`} className="block">
        <div className="bg-card rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
          {article.coverImage && (
            <img
              src={article.coverImage}
              alt={`${article.title} cover`}
              className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          )}
          <div className="p-4 sm:p-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {article.tags.slice(0, 2).map((tag) => (
                <Badge key={tag.id} variant="secondary" size="sm">
                  {tag.name}
                </Badge>
              ))}
            </div>
            <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
              {article.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              {article.author.avatar && (
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="h-6 w-6 rounded-full"
                />
              )}
              <span>{article.author.name}</span>
              <span>•</span>
              <span>{formatDate(article.publishedAt)}</span>
              <span>•</span>
              <span>{article.readingTime} min read</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}