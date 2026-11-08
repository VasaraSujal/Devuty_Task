/**
 * Pagination component for blog articles
 */

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const first = Math.max(1, currentPage - 2);
      const last = Math.min(totalPages, currentPage + 2);

      if (first > 1) pages.push(1, 'ellipsis' as const);
      for (let i = first; i <= last; i++) pages.push(i);
      if (last < totalPages) pages.push('ellipsis' as const, totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  const handlePageClick = (page: number | 'ellipsis') => {
    if (page !== 'ellipsis') {
      onPageChange(page);
    }
  };

  return (
    <nav
      className={cn('flex justify-center gap-2', className)}
      aria-label="Pagination"
    >
      {pages.map((page, index) => {
        if (page === 'ellipsis') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-3 py-1 text-sm text-muted-foreground"
              aria-hidden="true"
            >
              …
            </span>
          );
        }

        const isCurrent = page === currentPage;
        const isFirst = page === 1;
        const isLast = page === totalPages;

        return (
          <Link
            key={page}
            href={isFirst ? '/blog' : `/blog?page=${page}`}
            className={cn(
              'px-3 py-1 text-sm font-medium rounded-lg transition-all',
              isCurrent
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            )}
            aria-current={isCurrent ? 'page' : undefined}
            aria-label={isCurrent ? `Currently page ${page}` : `Go to page ${page}`}
          >
            {page}
          </Link>
        );
      })}
    </nav>
  );
}