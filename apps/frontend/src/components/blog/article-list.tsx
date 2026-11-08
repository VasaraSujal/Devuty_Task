/**
 * Article List component - grid view of articles
 */

import * as React from 'react';
import { ArticleCard } from '@/components/blog/article-card';
import { ArticleListItem } from '@/lib/blog/types';

interface ArticleListProps {
  articles: ArticleListItem[];
  featured?: ArticleListItem | null;
  onReadMore?: (slug: string) => void;
  className?: string;
}

export function ArticleList({ articles, featured = null, onReadMore, className }: ArticleListProps) {
  if (featured) {
    return (
      <div className={className}>
        <div className="mb-12">
          <ArticleCard article={featured} featured={true} onReadMore={onReadMore} />
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} onReadMore={onReadMore} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('grid gap-8 md:grid-cols-2 lg:grid-cols-3', className)}>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} onReadMore={onReadMore} />
      ))}
    </div>
  );
}

import { cn } from '@/lib/utils';