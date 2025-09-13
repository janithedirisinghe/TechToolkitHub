import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';

// GET all active categories (public)
export async function GET() {
  try {
    console.log('[DEBUG] Categories API - Starting...');
    console.log('[DEBUG] MONGODB_URI exists:', !!process.env.MONGODB_URI);
    console.log('[DEBUG] NODE_ENV:', process.env.NODE_ENV);
    
    await connectDB();
    console.log('[DEBUG] Categories API - Database connected');
    
    const categories = await Category.find({ isActive: true })
      .select('name slug description color order articleCount')
      .sort({ order: 1, name: 1 });

    console.log('[DEBUG] Categories API - Found categories:', categories.length);

    return NextResponse.json({
      success: true,
      categories
    });

  } catch (error) {
    console.error('[DEBUG] Categories API error:', error);
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
