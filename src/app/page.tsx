import Link from "next/link";
import SafeImage from '@/components/SafeImage';
import { getBaseUrl, fetchApi } from '@/lib/url';
import type { Metadata } from "next";
import type { Article, Category } from '@/types/article';

// Force dynamic rendering for Vercel
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Sri Lanka How - Your Ultimate Guide to Sri Lanka",
  description: "Discover Sri Lanka with our comprehensive guides, travel tips, cultural insights, and lifestyle advice. Your ultimate how-to resource for everything Sri Lanka.",
  openGraph: {
    title: "Sri Lanka How - Your Ultimate Guide to Sri Lanka",
    description: "Discover Sri Lanka with our comprehensive guides, travel tips, cultural insights, and lifestyle advice.",
    images: ["/hero-sri-lanka.jpg"],
  },
};

// Fetch data from APIs
async function getFeaturedArticles(): Promise<Article[]> {
  const endpoint = '/api/articles?featured=true&limit=6';
  try {
    const isServer = typeof window === 'undefined';
    if (isServer) {
      console.log('[DEBUG] Home Page - Server fetch (relative) for featured articles:', endpoint);
      let response = await fetch(endpoint, { cache: 'no-store' });
      if (!response.ok) {
        console.warn('[DEBUG] Featured relative fetch failed status:', response.status, response.statusText);
        if (response.status === 401) {
          console.warn('[DEBUG] 401 on public featured articles endpoint - retrying absolute');
        }
        const baseUrl = getBaseUrl();
        const absoluteUrl = `${baseUrl}${endpoint}`;
        console.log('[DEBUG] Home Page - Retrying featured with absolute URL:', absoluteUrl);
        response = await fetch(absoluteUrl, { cache: 'no-store' });
        if (!response.ok) {
          console.error('[DEBUG] Featured articles fetch failed after retry:', response.status, response.statusText);
          throw new Error('Failed to fetch featured articles');
        }
        const retryData = await response.json();
        console.log('[DEBUG] Featured articles data received after retry:', retryData.articles?.length || 0);
        return retryData.articles || [];
      }
      const data = await response.json();
      console.log('[DEBUG] Featured articles data received:', data.articles?.length || 0, 'articles');
      return data.articles || [];
    } else {
      console.log('[DEBUG] Home Page - Client fetch for featured articles');
      const response = await fetch(endpoint, { cache: 'no-store' });
      if (!response.ok) throw new Error('Failed client featured fetch');
      const data = await response.json();
      return data.articles || [];
    }
  } catch (error) {
    console.error('[DEBUG] Error fetching featured articles:', error);
    try {
      console.log('[DEBUG] Home Page - Final fallback using fetchApi for featured');
      const response = await fetchApi(endpoint, { cache: 'no-store' });
      if (response.ok) {
        const data = await response.json();
        return data.articles || [];
      } else {
        console.error('[DEBUG] fetchApi featured fallback failed status:', response.status);
      }
    } catch (fallbackError) {
      console.error('[DEBUG] fetchApi featured fallback error:', fallbackError);
    }
    return [];
  }
}

async function getCategories(): Promise<Category[]> {
  const endpoint = '/api/categories';
  try {
    const isServer = typeof window === 'undefined';
    if (isServer) {
      console.log('[DEBUG] Home Page - Server fetch (relative) for categories:', endpoint);
      let response = await fetch(endpoint, { cache: 'no-store' });
      if (!response.ok) {
        console.warn('[DEBUG] Categories relative fetch failed status:', response.status, response.statusText);
        if (response.status === 401) {
          console.warn('[DEBUG] 401 on public categories endpoint - retrying absolute');
        }
        const baseUrl = getBaseUrl();
        const absoluteUrl = `${baseUrl}${endpoint}`;
        console.log('[DEBUG] Home Page - Retrying categories with absolute URL:', absoluteUrl);
        response = await fetch(absoluteUrl, { cache: 'no-store' });
        if (!response.ok) {
          console.error('[DEBUG] Categories fetch failed after retry:', response.status, response.statusText);
          throw new Error('Failed to fetch categories');
        }
        const retryData = await response.json();
        console.log('[DEBUG] Categories data received after retry:', retryData.categories?.length || 0);
        return retryData.categories || [];
      }
      const data = await response.json();
      console.log('[DEBUG] Categories data received:', data.categories?.length || 0, 'categories');
      return data.categories || [];
    } else {
      console.log('[DEBUG] Home Page - Client fetch for categories');
      const response = await fetch(endpoint, { cache: 'no-store' });
      if (!response.ok) throw new Error('Failed client categories fetch');
      const data = await response.json();
      return data.categories || [];
    }
  } catch (error) {
    console.error('[DEBUG] Error fetching categories:', error);
    try {
      console.log('[DEBUG] Home Page - Final fallback using fetchApi for categories');
      const response = await fetchApi(endpoint, { cache: 'no-store' });
      if (response.ok) {
        const data = await response.json();
        return data.categories || [];
      } else {
        console.error('[DEBUG] fetchApi categories fallback failed status:', response.status);
      }
    } catch (fallbackError) {
      console.error('[DEBUG] fetchApi categories fallback error:', fallbackError);
    }
    return [];
  }
}

export default async function HomePage() {
  const [featuredArticles, categories] = await Promise.all([
    getFeaturedArticles(),
    getCategories()
  ]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Your Ultimate How-to Guide for Sri Lanka
            </h1>
            <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto">
              Discover travel tips, cultural insights, lifestyle advice, and comprehensive guides 
              for everything you need to know about the Pearl of the Indian Ocean.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/guides"
                className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Explore Guides
              </Link>
              <Link
                href="/travel"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors"
              >
                Travel Tips
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
              Featured Articles & Popular Guides
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our most helpful and comprehensive guides to make your Sri Lanka experience unforgettable.
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
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 opacity-20"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">
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
                    className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
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
              className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              View All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Category Previews */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Explore by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find exactly what you&apos;re looking for with our organized content categories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/${category.slug}`}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {category.articleCount} articles
                  </span>
                  <span className="text-emerald-600 group-hover:translate-x-1 transition-transform">
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Updates</h2>
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
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 opacity-20 rounded-lg"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-emerald-600 font-medium">{article.category.name}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{new Date(article.publishedAt).toLocaleDateString()}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 hover:text-emerald-600 transition-colors">
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
                      <span className="bg-emerald-600 text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </span>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm hover:text-emerald-600 transition-colors">
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

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-emerald-800 mb-3">Quick Tip</h3>
                <p className="text-emerald-700 text-sm">
                  Always carry a reusable water bottle in Sri Lanka. Many places have safe drinking water, 
                  and it&apos;s an eco-friendly way to stay hydrated while exploring!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
