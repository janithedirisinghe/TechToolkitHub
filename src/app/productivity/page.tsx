import type { Metadata } from "next";
import Link from "next/link";
import SafeImage from '@/components/SafeImage';
import { searchArticles } from '@/lib/data';

// Force dynamic rendering for Vercel
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Productivity Software - TechToolkitHub",
  description: "Reviews of productivity software, project management tools, note-taking apps, and workflow optimization solutions to boost your efficiency.",
  openGraph: {
    title: "Productivity Software - TechToolkitHub",
    description: "Reviews of productivity software, project management tools, note-taking apps, and workflow optimization solutions.",
  },
};

interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  category: {
    name: string;
    slug: string;
    color: string;
  };
  tags: string[];
  featured: boolean;
  publishedAt: string;
  views: number;
}

// Fetch data from APIs
async function getProductivityTools(): Promise<Article[]> {
  console.log('[DEBUG] Productivity Page - Direct DB query for category=productivity');
  const { articles } = await searchArticles({ categorySlug: 'productivity', limit: 100 });
  return articles as unknown as Article[];
}

export default async function ProductivityPage() {
  const productivityArticles = await getProductivityTools();

  const featuredArticles = productivityArticles.filter((article: Article) => article.featured);
  const allArticles = productivityArticles;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Productivity Software
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Reviews and comparisons of productivity tools, project management software, and workflow optimization solutions
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-green-100">
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Task Management
              </span>
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Note-Taking Apps
              </span>
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Time Tracking
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Productivity Reviews</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArticles.map((article: Article) => (
                <article
                  key={article._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Link href={`/articles/${article.slug}`}>
                    <div className="aspect-w-16 aspect-h-9">
                      <SafeImage
                        src={article.featuredImage || '/placeholder.jpg'}
                        alt={article.title}
                        width={400}
                        height={225}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="inline-block px-3 py-1 text-sm font-medium text-white rounded-full"
                        style={{ backgroundColor: article.category.color }}
                      >
                        {article.category.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      <Link href={`/articles/${article.slug}`} className="hover:text-green-600">
                        {article.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {article.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      {/* <span className="text-sm text-gray-500 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                        </svg>
                        {article.views}
                      </span> */}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">All Productivity Tools</h2>
            <p className="text-gray-600">{allArticles.length} tools reviewed</p>
          </div>
          
          {allArticles.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Productivity Reviews Yet</h3>
              <p className="text-gray-600">Productivity tool reviews will appear here soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allArticles.map((article: Article) => (
                <article
                  key={article._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Link href={`/articles/${article.slug}`}>
                    <div className="aspect-w-16 aspect-h-9">
                      <SafeImage
                        src={article.featuredImage || '/placeholder.jpg'}
                        alt={article.title}
                        width={400}
                        height={225}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="inline-block px-3 py-1 text-sm font-medium text-white rounded-full"
                        style={{ backgroundColor: article.category.color }}
                      >
                        {article.category.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      <Link href={`/articles/${article.slug}`} className="hover:text-green-600">
                        {article.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {article.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      {/* <span className="text-sm text-gray-500 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                        </svg>
                        {article.views}
                      </span> */}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Boost Your Productivity Today</h2>
            <p className="text-xl mb-6 text-green-100">
              Find the perfect tools to streamline your workflow and maximize efficiency
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Link
                href="/contact"
                className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                Get Recommendations
              </Link>
              <Link
                href="/articles"
                className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                Browse All Tools
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}