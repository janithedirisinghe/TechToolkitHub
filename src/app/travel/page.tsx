import type { Metadata } from "next";
import Link from "next/link";
import SafeImage from '@/components/SafeImage';
import { searchArticles } from '@/lib/data';

// Force dynamic rendering for Vercel
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Software Reviews - TechToolkitHub",
  description: "Comprehensive software reviews and comparisons. Discover the best tools for productivity, development, design, and business with detailed analysis and user insights.",
  openGraph: {
    title: "Software Reviews - TechToolkitHub",
    description: "Comprehensive software reviews and comparisons. Discover the best tools for productivity, development, design, and business.",
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
async function getSoftwareReviews(): Promise<Article[]> {
  console.log('[DEBUG] Reviews Page - Direct DB query for category=travel');
  const { articles } = await searchArticles({ categorySlug: 'travel', limit: 100 });
  return articles as unknown as Article[];
}

export default async function TravelPage() {
  const travelArticles = await getSoftwareReviews();

  const featuredArticles = travelArticles.filter((article: Article) => article.featured);
  const allArticles = travelArticles;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Software Reviews & Analysis
            </h1>
            <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto">
              Discover the best software tools with our comprehensive reviews, 
              detailed comparisons, and expert insights to power your workflow.
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-700">
                  Home
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <span className="text-gray-900 font-medium">Travel</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Featured Articles */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Software Reviews</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {featuredArticles.slice(0, 2).map((article: Article) => (
                  <article key={article._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48 bg-gray-200">
                      {article.featuredImage && (
                        <SafeImage
                          src={article.featuredImage}
                          alt={article.title}
                          fill
                          className="object-cover"
                          priority
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          hideOnError
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20"></div>
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {article.category.name}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {article.excerpt}
                      </p>
                      <Link
                        href={`/articles/${article.slug}`}
                        className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                      >
                        Read Full Review →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
              
              {featuredArticles.length > 2 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {featuredArticles.slice(2).map((article: Article) => (
                    <article key={article._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-40 bg-gray-200">
                        {article.featuredImage && (
                          <SafeImage
                            src={article.featuredImage}
                            alt={article.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            hideOnError
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20"></div>
                        <div className="absolute top-3 left-3">
                          <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                            {article.category.name}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <Link
                            href={`/articles/${article.slug}`}
                            className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm"
                          >
                            Read More →
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            {/* All Articles */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">All Software Reviews</h2>
                <div className="text-sm text-gray-500">
                  {allArticles.length} reviews
                </div>
              </div>

              <div className="space-y-6">
                {allArticles.map((article: Article) => (
                  <article key={article._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="sm:w-32 sm:h-32 h-48 bg-gray-200 rounded-lg flex-shrink-0 relative overflow-hidden">
                        {article.featuredImage && (
                          <SafeImage
                            src={article.featuredImage}
                            alt={article.title}
                            fill
                            className="object-cover"
                            sizes="128px"
                            hideOnError
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 rounded-lg"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium">
                            {article.category.name}
                          </span>
                          <span className="text-sm text-gray-500">{new Date(article.publishedAt).toLocaleDateString()}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-emerald-600 transition-colors">
                          <Link href={`/articles/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <Link
                          href={`/articles/${article.slug}`}
                          className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
                        >
                          Read Full Guide →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar - Ad Space */}
          <div className="lg:w-1/4">
            <div className="sticky top-24 space-y-6">
              {/* Ad Space - Replace with your ads */}
              <div className="bg-white rounded-lg shadow-md p-6 min-h-[400px] flex items-center justify-center">
                <div className="text-gray-400 text-center">
                  <p className="text-sm">Advertisement Space</p>
                </div>
              </div>

              {/* Additional Ad Space */}
              <div className="bg-white rounded-lg shadow-md p-6 min-h-[300px] flex items-center justify-center">
                <div className="text-gray-400 text-center">
                  <p className="text-sm">Advertisement Space</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
