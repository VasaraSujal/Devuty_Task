import { prisma } from '../config/database.js';
import { AppError } from '../middlewares/error.middleware.js';
import slugify from 'slugify';

interface CreateTagData {
  name: string;
  slug?: string;
}

interface UpdateTagData {
  name?: string;
  slug?: string;
}

export class TagService {
  private generateSlug(name: string): string {
    return slugify(name, { lower: true, strict: true, trim: true });
  }

  private async ensureUniqueSlug(baseSlug: string, excludeId?: string): Promise<string> {
    let slug = baseSlug;
    let counter = 1;

    while (true) {
      const existing = await prisma.tag.findUnique({
        where: { slug },
        select: { id: true },
      });

      if (!existing || existing.id === excludeId) {
        return slug;
      }

      slug = `${baseSlug}-${counter}`;
      counter++;
    }
  }

  async create(data: CreateTagData) {
    const baseSlug = data.slug || this.generateSlug(data.name);
    const uniqueSlug = await this.ensureUniqueSlug(baseSlug);

    const tag = await prisma.tag.create({
      data: {
        ...data,
        slug: uniqueSlug,
      },
    });

    return tag;
  }

  async getAll() {
    const tags = await prisma.tag.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    return tags;
  }

  async getById(id: string) {
    const tag = await prisma.tag.findUnique({
      where: { id },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    return tag;
  }

  async getBySlug(slug: string) {
    const tag = await prisma.tag.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    return tag;
  }

  async update(id: string, data: UpdateTagData) {
    const existing = await prisma.tag.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new AppError('Tag not found', 404, 'NOT_FOUND');
    }

    let slug = existing.slug;
    if (data.name || data.slug) {
      const baseSlug = data.slug || this.generateSlug(data.name || existing.name);
      slug = await this.ensureUniqueSlug(baseSlug, id);
    }

    const tag = await prisma.tag.update({
      where: { id },
      data: {
        ...data,
        slug,
      },
    });

    return tag;
  }

  async delete(id: string) {
    const existing = await prisma.tag.findUnique({
      where: { id },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    if (!existing) {
      throw new AppError('Tag not found', 404, 'NOT_FOUND');
    }

    if (existing._count.posts > 0) {
      throw new AppError('Cannot delete tag with associated posts', 409, 'CONFLICT');
    }

    await prisma.tag.delete({
      where: { id },
    });

    return { success: true };
  }
}

export const tagService = new TagService();