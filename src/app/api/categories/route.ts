import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';

// GET all active categories (public)
export async function GET() {
  try {
    await connectDB();
    
    const categories = await Category.find({ isActive: true })
      .select('name slug description color order articleCount')
      .sort({ order: 1, name: 1 });

    return NextResponse.json({
      success: true,
      categories
    });

  } catch (error) {
    console.error('Get public categories error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
