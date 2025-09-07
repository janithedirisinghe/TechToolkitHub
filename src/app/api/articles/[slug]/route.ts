import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';

// GET single published article by slug (public)
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();
    
    const article = await Article.findOne({ 
      slug: params.slug, 
      status: 'published' 
    })
      .populate('category', 'name slug color')
      .populate('author', 'name');
    
    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    // Increment view count
    await Article.findByIdAndUpdate(article._id, { $inc: { views: 1 } });

    return NextResponse.json({
      success: true,
      article: {
        ...article.toObject(),
        views: article.views + 1
      }
    });

  } catch (error) {
    console.error('Get article by slug error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
