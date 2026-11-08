import { config } from '../config/env.js';
import { AppError } from '../middlewares/error.middleware.js';

interface UploadResult {
  url: string;
  path: string;
  filename: string;
  size: number;
  mimeType: string;
}

// Allowed MIME types - SVG excluded by default due to XSS risks
// Only enable SVG if you have proper sanitization and Content-Type handling
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  // 'image/svg+xml', // DISABLED by default - enable only with proper sanitization
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Magic bytes for file type verification
const FILE_SIGNATURES: Record<string, number[][]> = {
  'image/jpeg': [[0xFF, 0xD8, 0xFF]],
  'image/png': [[0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]],
  'image/gif': [[0x47, 0x49, 0x46, 0x38, 0x37, 0x61], [0x47, 0x49, 0x46, 0x38, 0x39, 0x61]],
  'image/webp': [[0x52, 0x49, 0x46, 0x46]], // RIFF header, need to check further
};

export class StorageService {
  private getSupabaseConfig() {
    if (!config.SUPABASE_URL || !config.SUPABASE_SERVICE_ROLE_KEY || !config.SUPABASE_STORAGE_BUCKET) {
      // In production, Supabase config MUST be present
      if (config.NODE_ENV === 'production') {
        throw new AppError('Supabase storage configuration required in production', 500, 'STORAGE_CONFIG_MISSING');
      }
      return null;
    }
    return {
      url: config.SUPABASE_URL,
      serviceRoleKey: config.SUPABASE_SERVICE_ROLE_KEY,
      bucket: config.SUPABASE_STORAGE_BUCKET,
    };
  }

  private generateSafeFilename(originalName: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    // Only use alphanumeric + dash + underscore for extension
    const ext = originalName.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'bin';
    // Whitelist extensions
    const allowedExts = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
    const safeExt = allowedExts.includes(ext) ? ext : 'bin';
    return `${timestamp}-${random}.${safeExt}`;
  }

  private verifyFileSignature(buffer: Buffer, mimeType: string): boolean {
    const signatures = FILE_SIGNATURES[mimeType];
    if (!signatures) {
      // Unknown mime type - reject if we can't verify
      return false;
    }

    return signatures.some(sig =>
      sig.every((byte, index) => buffer[index] === byte)
    );
  }

  private validateFile(file: Express.Multer.File): void {
    // Check MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new AppError(`File type ${file.mimetype} not allowed. Allowed types: ${ALLOWED_MIME_TYPES.join(', ')}`, 400, 'INVALID_FILE_TYPE');
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      throw new AppError(`File size ${file.size} exceeds maximum allowed size of ${MAX_FILE_SIZE} bytes`, 400, 'FILE_TOO_LARGE');
    }

    // Verify file signature (magic bytes)
    if (!this.verifyFileSignature(file.buffer, file.mimetype)) {
      throw new AppError('File content does not match declared type', 400, 'FILE_SIGNATURE_MISMATCH');
    }

    // Additional check for WebP (RIFF header + WEBP)
    if (file.mimetype === 'image/webp') {
      const webpHeader = file.buffer.slice(8, 12);
      const isWebP = webpHeader[0] === 0x57 && webpHeader[1] === 0x45 && webpHeader[2] === 0x42 && webpHeader[3] === 0x50; // 'WEBP'
      if (!isWebP) {
        throw new AppError('Invalid WebP file format', 400, 'INVALID_WEBP_FORMAT');
      }
    }
  }

  async upload(file: Express.Multer.File): Promise<UploadResult> {
    this.validateFile(file);

    const supabaseConfig = this.getSupabaseConfig();

    if (!supabaseConfig) {
      // Development only - mock response
      return {
        url: `/uploads/${this.generateSafeFilename(file.originalname)}`,
        path: `uploads/${this.generateSafeFilename(file.originalname)}`,
        filename: this.generateSafeFilename(file.originalname),
        size: file.size,
        mimeType: file.mimetype,
      };
    }

    const filename = this.generateSafeFilename(file.originalname);
    // Sanitize path - only allow blog/ prefix
    const path = `blog/${filename}`;

    const response = await fetch(
      `${supabaseConfig.url}/storage/v1/object/${supabaseConfig.bucket}/${path}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseConfig.serviceRoleKey}`,
          'Content-Type': file.mimetype,
        },
        body: file.buffer,
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new AppError(`Supabase upload failed: ${error}`, 500, 'UPLOAD_FAILED');
    }

    const publicUrl = `${supabaseConfig.url}/storage/v1/object/public/${supabaseConfig.bucket}/${path}`;

    return {
      url: publicUrl,
      path,
      filename,
      size: file.size,
      mimeType: file.mimetype,
    };
  }

  async delete(path: string): Promise<boolean> {
    // Validate path - must start with blog/ to prevent arbitrary deletion
    if (!path.startsWith('blog/')) {
      throw new AppError('Invalid media path', 400, 'INVALID_PATH');
    }

    // Path traversal protection
    if (path.includes('..') || path.includes('//')) {
      throw new AppError('Invalid media path', 400, 'INVALID_PATH');
    }

    const supabaseConfig = this.getSupabaseConfig();

    if (!supabaseConfig) {
      if (config.NODE_ENV === 'production') {
        throw new AppError('Supabase storage configuration required in production', 500, 'STORAGE_CONFIG_MISSING');
      }
      return true; // Mock success in development
    }

    const response = await fetch(
      `${supabaseConfig.url}/storage/v1/object/${supabaseConfig.bucket}/${path}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${supabaseConfig.serviceRoleKey}`,
        },
      }
    );

    return response.ok;
  }
}

export const storageService = new StorageService();