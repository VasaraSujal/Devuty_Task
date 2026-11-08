import { Request, Response, NextFunction } from 'express';
import { AppError } from './error.middleware.js';
import { config } from '../config/env.js';
import crypto from 'crypto';

// CSRF protection using double-submit cookie pattern
// The CSRF token is sent in a cookie and must be included in a custom header for state-changing requests

const CSRF_HEADER = 'x-csrf-token';
const CSRF_COOKIE = 'csrf_token';

// Generate a CSRF token
export const generateCsrfToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

// Middleware to set CSRF token cookie for non-GET requests
export const csrfProtection = (req: Request, res: Response, next: NextFunction) => {
  // Only protect state-changing methods
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
    // Skip CSRF for login/refresh/logout endpoints (they use token rotation)
    const publicPaths = ['/api/v1/auth/login', '/api/v1/auth/refresh', '/api/v1/auth/logout'];
    if (publicPaths.includes(req.path)) {
      return next();
    }

    // Check for CSRF token in header
    const csrfToken = req.headers[CSRF_HEADER] as string;
    const csrfCookie = req.cookies?.[CSRF_COOKIE];

    if (!csrfToken || !csrfCookie || csrfToken !== csrfCookie) {
      return next(new AppError('Invalid CSRF token', 403, 'CSRF_INVALID'));
    }
  }

  next();
};

// Middleware to expose CSRF token to client (for SPA integration)
export const csrfTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Generate and set CSRF token cookie if not present
  if (!req.cookies?.[CSRF_COOKIE]) {
    const token = generateCsrfToken();
    res.cookie(CSRF_COOKIE, token, {
      httpOnly: false, // Must be readable by JavaScript for double-submit
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' as const : 'lax' as const,
      path: '/',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });
  }
  next();
};