import { prisma } from '../config/database.js';
import bcrypt from 'bcryptjs';
import {
  generateTokenPair,
  verifyRefreshToken,
  hashRefreshToken,
  getRefreshTokenId,
  JwtPayload
} from '../utils/jwt.js';
import { AppError } from '../middlewares/error.middleware.js';

export class AuthService {
  async login(email: string, password: string, userAgent?: string, ip?: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError('Invalid credentials', 401, 'UNAUTHORIZED');
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      throw new AppError('Invalid credentials', 401, 'UNAUTHORIZED');
    }

    // Generate token pair
    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const { accessToken, refreshToken } = generateTokenPair(payload);

    // Store HASHED refresh token in database
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    // Also store the token ID (jti) for reuse detection
    const tokenId = getRefreshTokenId(refreshToken);

    await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken: hashRefreshToken(refreshToken),
        tokenId,
        userAgent,
        ip,
        expiresAt,
      },
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    };
  }

  async refresh(refreshToken: string, userAgent?: string, ip?: string) {
    // Verify the refresh token JWT signature and expiry
    let payload: JwtPayload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw new AppError('Invalid refresh token', 401, 'UNAUTHORIZED');
    }

    // Extract token ID for lookup
    const tokenId = getRefreshTokenId(refreshToken);
    if (!tokenId) {
      throw new AppError('Invalid refresh token format', 401, 'UNAUTHORIZED');
    }

    // Find session in database by tokenId
    const session = await prisma.session.findUnique({
      where: { tokenId },
      include: { user: true },
    });

    if (!session) {
      // Token reuse detection: token ID not found means it was already rotated/revoked
      // This could indicate token theft - revoke all user sessions as a precaution
      throw new AppError('Invalid refresh token - possible token reuse detected', 401, 'UNAUTHORIZED');
    }

    // Verify the stored hash matches the provided token
    const providedHash = hashRefreshToken(refreshToken);
    if (session.refreshToken !== providedHash) {
      // Hash mismatch - token was tampered with or this is a reuse attempt
      throw new AppError('Invalid refresh token', 401, 'UNAUTHORIZED');
    }

    if (session.revokedAt) {
      throw new AppError('Token has been revoked', 401, 'UNAUTHORIZED');
    }

    if (session.expiresAt < new Date()) {
      throw new AppError('Refresh token expired', 401, 'UNAUTHORIZED');
    }

    // Revoke the old session (rotation)
    await prisma.session.update({
      where: { id: session.id },
      data: { revokedAt: new Date() },
    });

    // Generate new token pair
    const newPayload: JwtPayload = {
      userId: session.user.id,
      email: session.user.email,
      role: session.user.role,
    };

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateTokenPair(newPayload);

    // Create new session with new token
    const newExpiresAt = new Date();
    newExpiresAt.setDate(newExpiresAt.getDate() + 7);
    const newTokenId = getRefreshTokenId(newRefreshToken);

    await prisma.session.create({
      data: {
        userId: session.user.id,
        refreshToken: hashRefreshToken(newRefreshToken),
        tokenId: newTokenId,
        userAgent,
        ip,
        expiresAt: newExpiresAt,
      },
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role,
        avatar: session.user.avatar,
      },
    };
  }

  async logout(refreshToken: string) {
    const tokenId = getRefreshTokenId(refreshToken);
    if (!tokenId) {
      // Even if token ID is invalid, try to revoke by hash as fallback
      const hash = hashRefreshToken(refreshToken);
      await prisma.session.updateMany({
        where: { refreshToken: hash },
        data: { revokedAt: new Date() },
      });
      return { success: true };
    }

    // Revoke the specific session
    await prisma.session.updateMany({
      where: { tokenId },
      data: { revokedAt: new Date() },
    });

    return { success: true };
  }

  async me(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new AppError('User not found', 404, 'NOT_FOUND');
    }

    return user;
  }

  async revokeAllUserSessions(userId: string) {
    await prisma.session.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  async cleanupExpiredSessions() {
    await prisma.session.deleteMany({
      where: {
        expiresAt: { lt: new Date() },
      },
    });
  }
}

export const authService = new AuthService();