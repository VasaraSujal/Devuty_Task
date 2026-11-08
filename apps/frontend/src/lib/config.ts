/**
 * Frontend configuration
 * Reads from environment variables prefixed with NEXT_PUBLIC_
 */

export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
};

/**
 * Gets the full API URL with protocol validation for production
 */
export function getApiUrl(): string {
  const url = config.apiUrl;

  // In production, ensure we're using proper protocol
  if (process.env.NODE_ENV === 'production' && url.startsWith('localhost')) {
    console.warn('Warning: API URL is localhost in production environment');
  }

  return url;
}

/**
 * Constructs a full URL from a relative path
 */
export function getUrl(path: string): string {
  const baseUrl = config.siteUrl.replace(/\/+$/, '');
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}