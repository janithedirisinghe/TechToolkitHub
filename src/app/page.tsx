import Link from "next/link";
import SafeImage from '@/components/SafeImage';
import { getFeaturedArticles, getActiveCategories } from '@/lib/data';
import type { Metadata } from "next";
import type { Article, Category } from '@/types/article';

// Force dynamic rendering for Vercel
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "TechToolkitHub - In-Depth Software Reviews & Tech Guides",
  description: "Discover the best software tools with our comprehensive reviews, tech guides, and expert insights. Your ultimate resource for software discovery and tech solutions.",
  openGraph: {
    title: "TechToolkitHub - In-Depth Software Reviews & Tech Guides",
    description: "Comprehensive software reviews, tech guides, and expert insights to help you choose the right tools for your needs.",
    images: ["/hero-tech.jpg"],
  },
};

// Fetch data from APIs
// Direct DB access (no internal fetch)
async function loadHomeData() {
  console.log('[DEBUG] Home Page - Direct DB queries');
  const [featuredArticles, categories] = await Promise.all([
    getFeaturedArticles(6),
    getActiveCategories()
  ]);
  return { featuredArticles: featuredArticles as unknown as Article[], categories: categories as unknown as Category[] };
}

export default async function HomePage() {
  const { featuredArticles, categories } = await loadHomeData();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Your Ultimate Software Review Hub
            </h1>
            <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto">
              Discover the best software tools with our in-depth reviews, comprehensive guides, 
              and expert insights to power your digital workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/software-reviews"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Browse Reviews
              </Link>
              <Link
                href="/dev-tools"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Dev Tools
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Software Reviews & Tech Guides
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our most comprehensive software reviews and tech guides to help you choose the right tools for your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {article.category.name}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <Link
                    href={`/articles/${article.slug}`}
                    className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/articles"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View All Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* Category Previews */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Browse by Software Category
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find the perfect software solution with our organized review categories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/${category.slug}`}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {category.articleCount} reviews
                  </span>
                  <span className="text-blue-600 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Latest Articles */}
            <div className="lg:w-2/3">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Software Reviews</h2>
              <div className="space-y-6">
                {featuredArticles.slice(0, 4).map((article) => (
                  <div key={article._id} className="flex gap-4 pb-6 border-b border-gray-200 last:border-b-0">
                    <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0 relative overflow-hidden">
                      {article.featuredImage && (
                        <SafeImage
                          src={article.featuredImage}
                          alt={article.title}
                          fill
                          className="object-cover"
                          sizes="96px"
                          hideOnError
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 rounded-lg"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-blue-600 font-medium">{article.category.name}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{new Date(article.publishedAt).toLocaleDateString()}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                        <Link href={`/articles/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular This Week</h3>
                <div className="space-y-4">
                  {featuredArticles.slice(0, 3).map((article, index) => (
                    <div key={article._id} className="flex items-start gap-3">
                      <span className="bg-blue-600 text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </span>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm hover:text-blue-600 transition-colors">
                          <Link href={`/articles/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">{new Date(article.publishedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Tech Tip</h3>
                <p className="text-blue-700 text-sm">
                  Always check software compatibility with your operating system and hardware before purchasing. 
                  Read user reviews and try free trials when available to ensure the tool meets your needs!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
