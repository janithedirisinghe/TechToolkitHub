import type { Metadata } from "next";
import Link from "next/link";
import SafeImage from '@/components/SafeImage';
import { getBaseUrl } from '@/lib/url';
import type { Article, Category } from '@/types/article';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "All Articles - Sri Lanka How",
  description: "Browse all our articles about Sri Lanka including travel guides, cultural insights, lifestyle tips, and comprehensive how-to guides.",
  openGraph: {
    title: "All Articles - Sri Lanka How",
    description: "Browse all our articles about Sri Lanka including travel guides, cultural insights, lifestyle tips, and comprehensive how-to guides.",
  },
};

// Fetch data from APIs
async function getAllArticles(): Promise<Article[]> {
  try {
    const response = await fetch(`${getBaseUrl()}/api/articles?limit=50`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }

    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${getBaseUrl()}/api/categories`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const data = await response.json();
    return data.categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: { category?: string; page?: string };
}) {
  const currentPage = parseInt(searchParams.page || '1');
  const selectedCategory = searchParams.category;

  const [allArticles, categories] = await Promise.all([
    getAllArticles(),
    getCategories(),
  ]);

  // Filter articles by category if selected
  const filteredArticles = selectedCategory 
    ? allArticles.filter(article => 
        article.category?.slug === selectedCategory
      )
    : allArticles;

  // Pagination
  const articlesPerPage = 12;
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            All Articles
          </h1>
          <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto">
            Discover everything you need to know about Sri Lanka with our comprehensive collection of guides and articles.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/articles"
            className={`px-6 py-2 rounded-full border-2 transition-colors ${
              !selectedCategory
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white'
            }`}
          >
            All Articles
          </Link>
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/articles?category=${category.slug}`}
              className={`px-6 py-2 rounded-full border-2 transition-colors ${
                selectedCategory === category.slug
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white'
              }`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {paginatedArticles.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">
              No articles found
            </h2>
            <p className="text-gray-500">
              {selectedCategory 
                ? `No articles available in the ${selectedCategory} category.`
                : 'No articles available at the moment.'
              }
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {paginatedArticles.map((article) => (
                <article
                  key={article._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <SafeImage
                      src={article.featuredImage || '/placeholder-image.jpg'}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    {article.featured && (
                      <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </div>
                    )}
                    {article.category && (
                      <div 
                        className="absolute top-4 right-4 px-3 py-1 rounded-full text-white text-sm font-semibold"
                        style={{ backgroundColor: article.category.color || '#10b981' }}
                      >
                        {article.category.name}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/articles/${article.slug}`}
                        className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
                      >
                        Read More →
                      </Link>
                      <span className="text-sm text-gray-500">
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12 space-x-2">
                {currentPage > 1 && (
                  <Link
                    href={`/articles?${new URLSearchParams({
                      ...(selectedCategory && { category: selectedCategory }),
                      page: (currentPage - 1).toString(),
                    }).toString()}`}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Previous
                  </Link>
                )}
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Link
                    key={page}
                    href={`/articles?${new URLSearchParams({
                      ...(selectedCategory && { category: selectedCategory }),
                      page: page.toString(),
                    }).toString()}`}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      page === currentPage
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {page}
                  </Link>
                ))}
                
                {currentPage < totalPages && (
                  <Link
                    href={`/articles?${new URLSearchParams({
                      ...(selectedCategory && { category: selectedCategory }),
                      page: (currentPage + 1).toString(),
                    }).toString()}`}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Next
                  </Link>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
