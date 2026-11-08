/**
 * Tag cloud component for blog sidebar
 */

import * as React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Tag } from '@/lib/blog/types';
import { cn } from '@/lib/utils';

interface TagCloudProps {
  tags: Array<Tag & { count: number }>;
  maxTags?: number;
  className?: string;
}

export function TagCloud({ tags, maxTags, className }: TagCloudProps) {
  const displayTags = maxTags ? tags.slice(0, maxTags) : tags;

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {displayTags.map((tag) => (
        <Link key={tag.id} href={`/blog?tag=${tag.slug}`}>
          <Badge variant="outline" size="sm" className="hover:border-primary hover:text-primary transition-colors">
            {tag.name} <span className="text-xs text-muted-foreground ml-1">({tag.count})</span>
          </Badge>
        </Link>
      ))}
    </div>
  );
}