import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Admin from '@/models/Admin';
import Category from '@/models/Category';
import Article from '@/models/Article';
import { authenticateAdmin } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import sanitizeHtml from 'sanitize-html';

// GET all articles (admin)
export async function GET(request: NextRequest) {
  try {
    const user = await authenticateAdmin(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    
    const skip = (page - 1) * limit;
    
    // Build query
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = {};
    
    if (category && category !== 'All') {
      const categoryDoc = await Category.findOne({ name: category });
      if (categoryDoc) {
        query.category = categoryDoc._id;
      }
    }
    
    if (status && status !== 'All') {
      query.status = status.toLowerCase();
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } }
      ];
    }

    const articles = await Article.find(query)
      .populate('category', 'name slug')
      .populate('author', 'name email')
      .sort({ createdAt: -1 })
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
    console.error('Get articles error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST create new article (admin)
export async function POST(request: NextRequest) {
  try {
    const user = await authenticateAdmin(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    const {
      title,
      slug,
      excerpt,
      content,
      category,
      tags,
      featuredImage,
      status,
      featured,
      metaTitle,
      metaDescription,
      metaKeywords
    } = await request.json();

    if (!title || !slug || !excerpt || !content || !category) {
      return NextResponse.json(
        { error: 'Title, slug, excerpt, content, and category are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingArticle = await Article.findOne({ slug: slug.toLowerCase() });
    if (existingArticle) {
      return NextResponse.json(
        { error: 'Article with this slug already exists' },
        { status: 400 }
      );
    }

    // Verify category exists
    const categoryDoc = await Category.findOne({ name: category });
    if (!categoryDoc) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    const cleanContent = sanitizeHtml(content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        'img',
        'h1','h2','h3','h4','h5','h6',
        'p','ul','ol','li','blockquote','pre','code','strong','em','u','s','hr','br','sup','sub',
        'figure','figcaption',
        'table','thead','tbody','tfoot','tr','th','td','caption','colgroup','col'
      ]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        a: ['href', 'name', 'target', 'rel', 'title'],
        img: ['src', 'alt', 'title', 'width', 'height'],
        td: ['colspan', 'rowspan'],
        th: ['colspan', 'rowspan'],
      },
      allowedSchemes: ['http', 'https', 'mailto'],
      allowProtocolRelative: true,
    });

    const article = new Article({
      title,
      slug: slug.toLowerCase(),
      excerpt,
      content: cleanContent,
      category: categoryDoc._id,
      tags: Array.isArray(tags) ? tags : tags?.split(',').map((tag: string) => tag.trim()) || [],
      featuredImage,
      status: status || 'draft',
      featured: featured || false,
      author: user.id,
      metaTitle: metaTitle || title.substring(0, 60),
      metaDescription: metaDescription || excerpt.substring(0, 160),
      metaKeywords
    });

  await article.save();
    
    // Update category article count
    await Category.findByIdAndUpdate(
      categoryDoc._id,
      { $inc: { articleCount: 1 } }
    );

    // Revalidate sitemap when new article is published
    if (status === 'published') {
      try {
        revalidatePath('/sitemap.xml');
        revalidatePath('/');
        revalidatePath('/articles');
        console.log('✅ Sitemap revalidated for new article:', slug);
      } catch (error) {
        console.error('❌ Error revalidating sitemap for new article:', slug, error);
      }
    }

    // Populate for response
    await article.populate('category', 'name slug');
    await article.populate('author', 'name email');

    return NextResponse.json({
      success: true,
      article
    }, { status: 201 });

  } catch (error) {
    console.error('Create article error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
