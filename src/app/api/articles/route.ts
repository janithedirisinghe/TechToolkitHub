import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';
import Article from '@/models/Article';

// GET published articles (public)
export async function GET(request: NextRequest) {
  try {
    await connectDB();
  // Ensure referenced models are registered before queries that populate
  try { mongoose.model('Category'); } catch { await import('@/models/Category'); }
  try { mongoose.model('Admin'); } catch { await import('@/models/Admin'); }
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    
    const skip = (page - 1) * limit;
    
    // Build query - only published articles
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = { status: 'published' };
    
    if (category) {
      const { default: Category } = await import('@/models/Category');
      const categoryDoc = await Category.findOne({ slug: category });
      if (categoryDoc) {
        query.category = categoryDoc._id;
      } else {
        return NextResponse.json(
          { error: 'Category not found' },
          { status: 404 }
        );
      }
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    if (featured === 'true') {
      query.featured = true;
    }

    const articles = await Article.find(query)
      .populate('category', 'name slug color')
      .select('title slug excerpt featuredImage category tags featured publishedAt views')
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Article.countDocuments(query);

    return NextResponse.json({
      success: true,
      articles,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        count: total,
        limit
      }
    });

  } catch (error) {
    console.error('Get public articles error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
