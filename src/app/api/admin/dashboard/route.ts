import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Admin from '@/models/Admin';
import Category from '@/models/Category';
import Article from '@/models/Article';
import { authenticateAdmin } from '@/lib/auth';

// GET dashboard statistics (admin)
export async function GET(request: NextRequest) {
  try {
    const user = await authenticateAdmin(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    // Get counts
    const totalArticles = await Article.countDocuments();
    const publishedArticles = await Article.countDocuments({ status: 'published' });
    const draftArticles = await Article.countDocuments({ status: 'draft' });
    const totalCategories = await Category.countDocuments({ isActive: true });

    // Get recent articles
    const recentArticles = await Article.find()
      .populate('category', 'name slug')
      .populate('author', 'name')
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title slug status createdAt category author');

    // Get total views
    const viewsResult = await Article.aggregate([
      { $match: { status: 'published' } },
      { $group: { _id: null, totalViews: { $sum: '$views' } } }
    ]);
    const totalViews = viewsResult[0]?.totalViews || 0;

    // Get category statistics
    const categoryStats = await Category.aggregate([
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'category',
          as: 'articles'
        }
      },
      {
        $project: {
          name: 1,
          slug: 1,
          color: 1,
          articleCount: { $size: '$articles' },
          publishedCount: {
            $size: {
              $filter: {
                input: '$articles',
                cond: { $eq: ['$$this.status', 'published'] }
              }
            }
          }
        }
      },
      { $sort: { articleCount: -1 } }
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalArticles,
        publishedArticles,
        draftArticles,
        totalCategories,
        totalViews
      },
      recentArticles,
      categoryStats
    });

  } catch (error) {
    console.error('Get dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
