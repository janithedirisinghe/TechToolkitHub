import { MetadataRoute } from 'next'
import connectDB from '@/lib/mongodb'
import Article from '@/models/Article'
import Category from '@/models/Category'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl ='https://www.techtoolkithub.com/'
  
  try {
    await connectDB()
    
    // Fetch published articles from database
    const articles = await Article.find({ status: 'published' })
      .select('slug updatedAt publishedAt')
      .lean()
    
    // Fetch active categories from database  
    const categories = await Category.find({ isActive: true })
      .select('slug updatedAt')
      .lean()
    
    // Static pages with their priorities and change frequencies
    const staticRoutes = [
      { url: '', priority: 1.0, changeFreq: 'daily' as const },
      { url: '/about', priority: 0.8, changeFreq: 'monthly' as const },
      { url: '/contact', priority: 0.7, changeFreq: 'monthly' as const },
      { url: '/articles', priority: 0.9, changeFreq: 'daily' as const },
      { url: '/guides', priority: 0.8, changeFreq: 'weekly' as const },
      { url: '/travel', priority: 0.8, changeFreq: 'weekly' as const },
      { url: '/culture', priority: 0.8, changeFreq: 'weekly' as const },
      { url: '/lifestyle', priority: 0.8, changeFreq: 'weekly' as const },
      { url: '/business-tools', priority: 0.7, changeFreq: 'weekly' as const },
      { url: '/dev-tools', priority: 0.7, changeFreq: 'weekly' as const },
      { url: '/productivity', priority: 0.7, changeFreq: 'weekly' as const },
      { url: '/software-reviews', priority: 0.7, changeFreq: 'weekly' as const },
      { url: '/privacy', priority: 0.3, changeFreq: 'yearly' as const },
      { url: '/terms', priority: 0.3, changeFreq: 'yearly' as const },
    ]
    
    const staticPages = staticRoutes.map((route) => ({
      url: `${baseUrl}${route.url}`,
      lastModified: new Date(),
      changeFrequency: route.changeFreq,
      priority: route.priority,
    }))

    // Generate article pages from database
    const articlePages = articles.map((article) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: new Date(article.updatedAt || article.publishedAt || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    // Generate category pages from database
    const categoryPages = categories.map((category) => ({
      url: `${baseUrl}/${category.slug}`,
      lastModified: new Date(category.updatedAt || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    return [...staticPages, ...articlePages, ...categoryPages]
    
  } catch (error) {
    console.error('Error generating sitemap:', error)
    
    // Fallback to static sitemap if database connection fails
    const staticRoutes = [
      { url: '', priority: 1.0, changeFreq: 'daily' as const },
      { url: '/about', priority: 0.8, changeFreq: 'monthly' as const },
      { url: '/contact', priority: 0.7, changeFreq: 'monthly' as const },
      { url: '/articles', priority: 0.9, changeFreq: 'daily' as const },
      { url: '/guides', priority: 0.8, changeFreq: 'weekly' as const },
      { url: '/travel', priority: 0.8, changeFreq: 'weekly' as const },
      { url: '/culture', priority: 0.8, changeFreq: 'weekly' as const },
      { url: '/lifestyle', priority: 0.8, changeFreq: 'weekly' as const },
      { url: '/business-tools', priority: 0.7, changeFreq: 'weekly' as const },
      { url: '/dev-tools', priority: 0.7, changeFreq: 'weekly' as const },
      { url: '/productivity', priority: 0.7, changeFreq: 'weekly' as const },
      { url: '/software-reviews', priority: 0.7, changeFreq: 'weekly' as const },
      { url: '/privacy', priority: 0.3, changeFreq: 'yearly' as const },
      { url: '/terms', priority: 0.3, changeFreq: 'yearly' as const },
    ]
    
    return staticRoutes.map((route) => ({
      url: `${baseUrl}${route.url}`,
      lastModified: new Date(),
      changeFrequency: route.changeFreq,
      priority: route.priority,
    }))
  }
}
