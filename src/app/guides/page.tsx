import type { Metadata } from "next";
import Link from "next/link";
import SafeImage from '@/components/SafeImage';
import { searchArticles } from '@/lib/data';

// Force dynamic rendering for Vercel
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "How-to Guides -  ",
  description: "Step-by-step how-to guides for everything you need to know about Sri Lanka. From practical tips to detailed instructions for travelers.",
  openGraph: {
    title: "How-to Guides -  ",
    description: "Step-by-step how-to guides for everything you need to know about Sri Lanka. Practical tips and detailed instructions.",
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
async function getGuidesArticles(): Promise<Article[]> {
  console.log('[DEBUG] Guides Page - Direct DB query for category=guides');
  const { articles } = await searchArticles({ categorySlug: 'guides', limit: 100 });
  return articles as unknown as Article[];
}

export default async function GuidesPage() {
  const guidesArticles = await getGuidesArticles();

  const featuredArticles = guidesArticles.filter((article: Article) => article.featured);
  const allArticles = guidesArticles;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              How-to Guides for Sri Lanka
            </h1>
            <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto">
              Step-by-step instructions and practical guides to help you navigate 
              everything Sri Lanka has to offer with confidence.
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
                <span className="text-gray-900 font-medium">Guides</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Featured Guides */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Essential How-to Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredArticles.map((article) => (
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
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-20"></div>
                      <div className="absolute top-4 left-4">
                        <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
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
                        className="text-purple-600 font-medium hover:text-purple-700 transition-colors"
                      >
                        View Guide →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* All Guides */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">All How-to Guides</h2>
                <div className="text-sm text-gray-500">
                  {allArticles.length} guides
                </div>
              </div>

              <div className="space-y-6">
                {allArticles.map((article) => (
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
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-20 rounded-lg"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                            {article.category.name}
                          </span>
                          <span className="text-sm text-gray-500">{new Date(article.publishedAt).toLocaleDateString()}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-purple-600 transition-colors">
                          <Link href={`/articles/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <Link
                          href={`/articles/${article.slug}`}
                          className="text-purple-600 font-medium hover:text-purple-700 transition-colors"
                        >
                          View Complete Guide →
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

              {/* More Ad Space */}
              <div className="bg-white rounded-lg shadow-md p-6 min-h-[250px] flex items-center justify-center">
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
