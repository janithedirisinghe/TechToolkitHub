import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';
import Article from '@/models/Article';

// GET published articles (public)
export async function GET(request: NextRequest) {
  try {
    console.log('[DEBUG] Articles API - Starting...');
    console.log('[DEBUG] MONGODB_URI exists:', !!process.env.MONGODB_URI);
    console.log('[DEBUG] NODE_ENV:', process.env.NODE_ENV);
    console.log('[DEBUG] Request URL:', request.url);
    
    await connectDB();
    console.log('[DEBUG] Articles API - Database connected');
    
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

    console.log('[DEBUG] Articles API - Found articles:', articles.length, 'total:', total);

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
    console.error('[DEBUG] Articles API error:', error);
    console.error('[DEBUG] Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined
    });
    
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
