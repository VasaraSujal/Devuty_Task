/**
 * Utility functions for blog features
 */

import { TOCItem } from './types';

/**
 * Extract table of contents from article content
 * Parses HTML content and extracts heading structure
 */
export function getTOCFromContent(htmlContent: string): TOCItem[] {
  if (typeof document === 'undefined') return [];

  // Create a temporary container to parse HTML
  const container = document.createElement('div');
  container.innerHTML = htmlContent;

  const toc: TOCItem[] = [];
  const headings = container.querySelectorAll('h2, h3, h4');

  const processHeading = (el: HTMLElement): TOCItem => {
    const id = el.id || `heading-${Math.random().toString(36).slice(2, 11)}`;
    el.id = id; // Ensure ID exists for anchor links

    return {
      id,
      text: el.textContent?.trim() || '',
      level: parseInt(el.tagName.charAt(1)) as 2 | 3 | 4,
      children: [],
    };
  };

  headings.forEach((heading) => {
    const item = processHeading(heading as HTMLElement);
    toc.push(item);
  });

  return toc;
}

/**
 * Format reading time based on word count
 */
export function formatReadingTime(wordCount: number): string {
  const avgWordsPerMinute = 200;
  const minutes = Math.ceil(wordCount / avgWordsPerMinute);
  return `${minutes} min`;
}

/**
 * Calculate reading time from content
 */
export function calculateReadingTime(content: string): number {
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const avgWordsPerMinute = 200;
  return Math.ceil(wordCount / avgWordsPerMinute);
}

/**
 * Extract title from HTML content
 */
export function extractTitleFromContent(htmlContent: string): string {
  const container = document.createElement('div');
  container.innerHTML = htmlContent;
  return container.querySelector('h1')?.textContent?.trim() || '';
}

/**
 * Strip HTML tags from content
 */
export function stripHtml(htmlContent: string): string {
  const container = document.createElement('div');
  container.innerHTML = htmlContent;
  return container.textContent || '';
}

/**
 * Get word count from HTML content
 */
export function getWordCount(htmlContent: string): number {
  return stripHtml(htmlContent).split(/\s+/).filter(Boolean).length;
}

/**
 * Generate URL-friendly slug from string
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}