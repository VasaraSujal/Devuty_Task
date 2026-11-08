/**
 * Category filter component
 */

import * as React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Category } from '@/lib/blog/types';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: Array<Category & { count: number }>;
  activeCategory?: string;
  onCategoryChange?: (category: string | undefined) => void;
  className?: string;
}

export function CategoryFilter({ categories, activeCategory, onCategoryChange, className }: CategoryFilterProps) {
  const [selected, setSelected] = React.useState<string | undefined>(activeCategory);

  const handleCategoryClick = (categorySlug: string | undefined) => {
    setSelected(categorySlug);
    onCategoryChange?.(categorySlug);
  };

  return (
    <div className={cn('flex flex-wrap gap-2 items-center', className)}>
      <span className="text-sm font-medium text-muted-foreground mr-2">Filter by:</span>
      <Link
        href="/blog"
        className={cn(
          'px-3 py-1 rounded-full text-sm transition-all duration-200',
          selected === undefined
            ? 'bg-primary text-primary-foreground'
            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
        )}
        onClick={() => handleCategoryClick(undefined)}
      >
        All Categories
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/blog?category=${category.slug}`}
          className={cn(
            'px-3 py-1 rounded-full text-sm transition-all duration-200',
            selected === category.slug
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          )}
          onClick={() => handleCategoryClick(category.slug)}
        >
          <span className="flex items-center gap-1.5">
            {category.name}
            <Badge variant="secondary" size="sm" className="ml-1">
              {category.count}
            </Badge>
          </span>
        </Link>
      ))}
    </div>
  );
}