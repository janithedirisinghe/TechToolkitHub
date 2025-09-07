import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';
import { authenticateAdmin } from '@/lib/auth';

// GET all categories (admin)
export async function GET(request: NextRequest) {
  try {
    const user = await authenticateAdmin(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    const categories = await Category.find({})
      .sort({ order: 1, createdAt: -1 });

    return NextResponse.json({
      success: true,
      categories
    });

  } catch (error) {
    console.error('Get categories error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST create new category (admin)
export async function POST(request: NextRequest) {
  try {
    const user = await authenticateAdmin(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    const { name, slug, description, color, order, isActive } = await request.json();

    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      return NextResponse.json(
        { error: 'Category with this slug already exists' },
        { status: 400 }
      );
    }

    const category = new Category({
      name,
      slug: slug.toLowerCase(),
      description,
      color: color || '#059669',
      order: order || 0,
      isActive: isActive !== undefined ? isActive : true
    });

    await category.save();

    return NextResponse.json({
      success: true,
      category
    }, { status: 201 });

  } catch (error) {
    console.error('Create category error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
