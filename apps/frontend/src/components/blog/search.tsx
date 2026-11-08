/**
 * Search component for blog articles
 */

import * as React from 'react';
import { cn } from '@/lib/utils';

interface BlogSearchProps {
  value?: string;
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function BlogSearch({ value = '', onSearch, placeholder = 'Search articles...', className }: BlogSearchProps) {
  const [inputValue, setInputValue] = React.useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onSearch?.(newValue);
  };

  const handleClear = () => {
    setInputValue('');
    onSearch?.('');
  };

  return (
    <div className={cn('relative w-full', className)}>
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.5 9a7.5 7.5 0 01-5.85 7.65z" />
      </svg>
      <input
        type="search"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        aria-label="Search articles"
      />
      {inputValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-secondary rounded-full transition-colors"
          aria-label="Clear search"
        >
          <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}