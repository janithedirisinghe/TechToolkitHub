import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Admin from '@/models/Admin';
import Category from '@/models/Category';
import Article from '@/models/Article';
import { authenticateAdmin } from '@/lib/auth';
import sanitizeHtml from 'sanitize-html';

// GET single article
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await authenticateAdmin(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    const { id } = await params;
    const article = await Article.findById(id)
      .populate('category', 'name slug')
      .populate('author', 'name email');
    
    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      article
    });

  } catch (error) {
    console.error('Get article error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT update article
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await authenticateAdmin(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    const { id } = await params;
    
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
      metaKeywords,
      sections
    } = await request.json();

    if (!title || !slug || !excerpt || !content || !category) {
      return NextResponse.json(
        { error: 'Title, slug, excerpt, content, and category are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists (excluding current article)
    const existingArticle = await Article.findOne({ 
      slug: slug.toLowerCase(), 
      _id: { $ne: id } 
    });
    
    if (existingArticle) {
      return NextResponse.json(
        { error: 'Article with this slug already exists' },
        { status: 400 }
      );
    }

    // Get current article to check category change
    const currentArticle = await Article.findById(id);
    if (!currentArticle) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    // Verify new category exists
    const categoryDoc = await Category.findOne({ name: category });
    if (!categoryDoc) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    // Update article
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

    const article = await Article.findByIdAndUpdate(
      id,
      {
        title,
        slug: slug.toLowerCase(),
        excerpt,
        content: cleanContent,
        category: categoryDoc._id,
        tags: Array.isArray(tags) ? tags : tags?.split(',').map((tag: string) => tag.trim()) || [],
        featuredImage,
        status: status || 'draft',
        featured: featured || false,
        metaTitle: metaTitle || title.substring(0, 60),
        metaDescription: metaDescription || excerpt.substring(0, 160),
        metaKeywords,
        sections: Array.isArray(sections)
          ? sections.map((s: { heading?: string; content?: string; order?: number }, index: number) => ({
              heading: s.heading?.trim() || `Section ${index + 1}`,
              content: s.content || '',
              order: typeof s.order === 'number' ? s.order : index
            })).sort((a, b) => a.order - b.order)
          : undefined
      },
      { new: true }
    );

    // Update category article counts if category changed
    if (currentArticle.category.toString() !== categoryDoc._id.toString()) {
      // Decrease count from old category
      await Category.findByIdAndUpdate(
        currentArticle.category,
        { $inc: { articleCount: -1 } }
      );
      
      // Increase count for new category
      await Category.findByIdAndUpdate(
        categoryDoc._id,
        { $inc: { articleCount: 1 } }
      );
    }

    // Populate for response
    await article?.populate('category', 'name slug');
    await article?.populate('author', 'name email');

    return NextResponse.json({
      success: true,
      article
    });

  } catch (error) {
    console.error('Update article error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE article
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await authenticateAdmin(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    const { id } = await params;
    const article = await Article.findById(id);
    
    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    // Delete article
    await Article.findByIdAndDelete(id);
    
    // Update category article count
    await Category.findByIdAndUpdate(
      article.category,
      { $inc: { articleCount: -1 } }
    );

    return NextResponse.json({
      success: true,
      message: 'Article deleted successfully'
    });

  } catch (error) {
    console.error('Delete article error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
