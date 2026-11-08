import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { config } from '../config/env.js';

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

/**
 * Hash a refresh token for secure storage
 * Uses SHA-256 with a salt from JWT_REFRESH_SECRET
 */
export const hashRefreshToken = (token: string): string => {
  return crypto
    .createHmac('sha256', config.JWT_REFRESH_SECRET)
    .update(token)
    .digest('hex');
};

/**
 * Generate a cryptographically secure random token
 */
export const generateSecureToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

export const generateAccessToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: '15m',
  });
};

export const generateRefreshToken = (payload: JwtPayload): string => {
  // Generate a secure random token as the refresh token
  // The JWT payload is embedded for verification, but the token itself is random
  const secureToken = generateSecureToken();
  const jwtToken = jwt.sign({ ...payload, jti: secureToken }, config.JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  });
  return jwtToken;
};

export const generateTokenPair = (payload: JwtPayload): TokenPair => {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, config.JWT_SECRET) as JwtPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(token, config.JWT_REFRESH_SECRET) as JwtPayload;
};

/**
 * Extract the secure token identifier (jti) from a refresh token
 */
export const getRefreshTokenId = (token: string): string => {
  try {
    const decoded = jwt.decode(token) as { jti?: string } | null;
    return decoded?.jti || '';
  } catch {
    return '';
  }
};