import { prisma } from '../config/database.js';
import { AppError } from '../middlewares/error.middleware.js';
import slugify from 'slugify';

interface CreateCategoryData {
  name: string;
  slug?: string;
  description?: string;
}

interface UpdateCategoryData {
  name?: string;
  slug?: string;
  description?: string;
}

export class CategoryService {
  private generateSlug(name: string): string {
    return slugify(name, { lower: true, strict: true, trim: true });
  }

  private async ensureUniqueSlug(baseSlug: string, excludeId?: string): Promise<string> {
    let slug = baseSlug;
    let counter = 1;

    while (true) {
      const existing = await prisma.category.findUnique({
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

  async create(data: CreateCategoryData) {
    const baseSlug = data.slug || this.generateSlug(data.name);
    const uniqueSlug = await this.ensureUniqueSlug(baseSlug);

    const category = await prisma.category.create({
      data: {
        ...data,
        slug: uniqueSlug,
      },
    });

    return category;
  }

  async getAll() {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    return categories;
  }

  async getById(id: string) {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    return category;
  }

  async getBySlug(slug: string) {
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    return category;
  }

  async update(id: string, data: UpdateCategoryData) {
    const existing = await prisma.category.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new AppError('Category not found', 404, 'NOT_FOUND');
    }

    let slug = existing.slug;
    if (data.name || data.slug) {
      const baseSlug = data.slug || this.generateSlug(data.name || existing.name);
      slug = await this.ensureUniqueSlug(baseSlug, id);
    }

    const category = await prisma.category.update({
      where: { id },
      data: {
        ...data,
        slug,
      },
    });

    return category;
  }

  async delete(id: string) {
    const existing = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    if (!existing) {
      throw new AppError('Category not found', 404, 'NOT_FOUND');
    }

    if (existing._count.posts > 0) {
      throw new AppError('Cannot delete category with associated posts', 409, 'CONFLICT');
    }

    await prisma.category.delete({
      where: { id },
    });

    return { success: true };
  }
}

export const categoryService = new CategoryService();