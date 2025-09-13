import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';
import Category from '@/models/Category';
import mongoose from 'mongoose';

// Shared projection for public articles
const PUBLIC_ARTICLE_SELECT = 'title slug excerpt featuredImage category tags featured publishedAt views';

export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export interface ArticleQueryOptions extends PaginationOptions {
  categorySlug?: string;
  search?: string;
  featured?: boolean;
}

export async function getActiveCategories() {
  await connectDB();
  const categories = await Category.find({ isActive: true })
    .select('name slug description color order articleCount')
    .sort({ order: 1, name: 1 });
  return categories;
}

export async function getFeaturedArticles(limit = 6) {
  await connectDB();
  const articles = await Article.find({ status: 'published', featured: true })
    .populate('category', 'name slug color')
    .select(PUBLIC_ARTICLE_SELECT)
    .sort({ publishedAt: -1 })
    .limit(limit);
  return articles;
}

export async function getArticlesByCategory(slug: string, options: PaginationOptions = {}) {
  await connectDB();
  const { page = 1, limit = 20 } = options;
  const skip = (page - 1) * limit;

  // Ensure Category model is loaded
  try { mongoose.model('Category'); } catch { await import('@/models/Category'); }

  const category = await Category.findOne({ slug });
  if (!category) return { articles: [], total: 0 };

  const query = { status: 'published', category: category._id };

  const [articles, total] = await Promise.all([
    Article.find(query)
      .populate('category', 'name slug color')
      .select(PUBLIC_ARTICLE_SELECT)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit),
    Article.countDocuments(query)
  ]);

  return { articles, total };
}

export async function searchArticles(options: ArticleQueryOptions = {}) {
  await connectDB();
  const { page = 1, limit = 12, categorySlug, search, featured } = options;
  const skip = (page - 1) * limit;

  // dynamic model loads (defensive for build edge cases)
  try { mongoose.model('Category'); } catch { await import('@/models/Category'); }

  const query: Record<string, unknown> = { status: 'published' };

  if (categorySlug) {
    const category = await Category.findOne({ slug: categorySlug });
    if (!category) {
      return { articles: [], total: 0 };
    }
    query.category = category._id;
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { excerpt: { $regex: search, $options: 'i' } },
      { tags: { $in: [new RegExp(search, 'i')] } }
    ];
  }

  if (featured) {
    query.featured = true;
  }

  const [articles, total] = await Promise.all([
    Article.find(query)
      .populate('category', 'name slug color')
      .select(PUBLIC_ARTICLE_SELECT)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit),
    Article.countDocuments(query)
  ]);

  return { articles, total, page, limit };
}

export async function getArticleBySlug(slug: string) {
  await connectDB();
  const article = await Article.findOne({ slug, status: 'published' })
    .populate('category', 'name slug color')
    .select('-content');
  return article;
}

export async function getArticleFullContent(slug: string) {
  await connectDB();
  const article = await Article.findOne({ slug, status: 'published' })
    .populate('category', 'name slug color');
  return article;
}
