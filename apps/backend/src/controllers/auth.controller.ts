import { Response } from 'express';
import { authService } from '../services/auth.service.js';
import { AuthenticatedRequest } from '../middlewares/auth.middleware.js';
import { AppError } from '../middlewares/error.middleware.js';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' as const : 'lax' as const,
  path: '/',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const ACCESS_COOKIE_OPTIONS = {
  ...COOKIE_OPTIONS,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const CLEAR_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' as const : 'lax' as const,
  path: '/',
};

export const authController = {
  async login(req: AuthenticatedRequest, res: Response) {
    const { email, password } = req.body;
    const userAgent = req.headers['user-agent'];
    const ip = req.ip;

    const result = await authService.login(email, password, userAgent, ip);

    // Set cookies
    res.cookie('access_token', result.accessToken, ACCESS_COOKIE_OPTIONS);
    res.cookie('refresh_token', result.refreshToken, COOKIE_OPTIONS);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
    });
  },

  async refresh(req: AuthenticatedRequest, res: Response) {
    // Read refresh token from cookie or body
    const refreshToken = req.cookies?.refresh_token || req.body?.refreshToken;

    if (!refreshToken) {
      throw new AppError('Refresh token required', 400, 'VALIDATION_ERROR');
    }

    const userAgent = req.headers['user-agent'];
    const ip = req.ip;

    const result = await authService.refresh(refreshToken, userAgent, ip);

    // Set new cookies
    res.cookie('access_token', result.accessToken, ACCESS_COOKIE_OPTIONS);
    res.cookie('refresh_token', result.refreshToken, COOKIE_OPTIONS);

    res.json({
      success: true,
      message: 'Token refreshed',
      data: {
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
    });
  },

  async logout(req: AuthenticatedRequest, res: Response) {
    const refreshToken = req.cookies?.refresh_token || req.body?.refreshToken;

    if (refreshToken) {
      await authService.logout(refreshToken);
    }

    // Clear cookies with exact same options
    res.clearCookie('access_token', CLEAR_COOKIE_OPTIONS);
    res.clearCookie('refresh_token', CLEAR_COOKIE_OPTIONS);

    res.json({
      success: true,
      message: 'Logged out successfully',
    });
  },

  async me(req: AuthenticatedRequest, res: Response) {
    if (!req.user) {
      throw new AppError('Authentication required', 401, 'UNAUTHORIZED');
    }

    const user = await authService.me(req.user.userId);

    res.json({
      success: true,
      data: user,
    });
  },
};