/**
 * Table of Contents component for article pages
 */

import * as React from 'react';
import Link from 'next/link';
import { TOCItem } from '@/lib/blog/types';
import { cn } from '@/lib/utils';

interface TableOfContentsProps {
  items: TOCItem[];
  className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  if (!items.length) return null;

  const renderItems = (items: TOCItem[], level: number = 2) => {
    return items.map((item, index) => (
      <React.Fragment key={item.id}>
        <li className={cn(
          'mb-1',
          level === 2 && 'ml-0',
          level === 3 && 'ml-4',
          level === 4 && 'ml-8'
        )}>
          <Link
            href={`#${item.id}`}
            className={cn(
              'text-sm transition-colors hover:text-primary',
              level === 2 && 'font-medium text-foreground',
              level === 3 && 'text-muted-foreground',
              level === 4 && 'text-muted-foreground/70'
            )}
            aria-label={`Jump to section: ${item.text}`}
          >
            {item.text}
          </Link>
        </li>
        {item.children && item.children.length > 0 && renderItems(item.children, level + 1)}
      </React.Fragment>
    ));
  };

  return (
    <nav className={cn('border rounded-xl p-4 bg-card', className)} aria-label="Table of Contents">
      <h3 className="text-sm font-semibold text-foreground mb-3 pb-2 border-b border-border">
        On this page
      </h3>
      <ul className={cn('space-y-1', className)}>
        {items.flatMap((item, index, arr) => {
          // Only add li wrapper for top-level items
          if (item.children && item.children.length > 0) {
            return [
              <li key={`parent-${item.id}`} className="mb-1">
                <Link
                  href={`#${item.id}`}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                  aria-label={`Jump to section: ${item.text}`}
                >
                  {item.text}
                </Link>
                <ul className="mt-1 space-y-1">
                  {item.children.map(child => (
                    <li key={child.id}>
                      <Link
                        href={`#${child.id}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        aria-label={`Jump to subsection: ${child.text}`}
                      >
                        {child.text}
                      </Link>
                      {child.children && child.children.length > 0 && (
                        <ul className="mt-1 space-y-1 ml-4">
                          {child.children.map(subchild => (
                            <li key={subchild.id}>
                              <Link
                                href={`#${subchild.id}`}
                                className="text-xs text-muted-foreground/70 hover:text-primary transition-colors"
                                aria-label={`Jump to sub-subsection: ${subchild.text}`}
                              >
                                {subchild.text}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ];
          }
          return [
            <li key={item.id} className="mb-1">
              <Link
                href={`#${item.id}`}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                aria-label={`Jump to section: ${item.text}`}
              >
                {item.text}
              </Link>
            </li>
          ];
        })}
      </ul>
    </nav>
  );
}