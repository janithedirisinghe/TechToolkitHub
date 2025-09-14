import type { Metadata } from "next";
import Link from "next/link";
import SafeImage from '@/components/SafeImage';
import { getBaseUrl } from '@/lib/url';

// Force dynamic rendering for Vercel
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Lifestyle & Tips - Sri Lanka How",
  description: "Lifestyle tips, budget travel advice, student guides, and life hacks for living and traveling in Sri Lanka. Practical insights for every situation.",
  openGraph: {
    title: "Lifestyle & Tips - Sri Lanka How",
    description: "Lifestyle tips, budget travel advice, and practical life hacks for Sri Lanka. Get insider insights for every situation.",
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
async function getLifestyleArticles(): Promise<Article[]> {
  try {
    const baseUrl = getBaseUrl();
    const apiUrl = `${baseUrl}/api/articles?category=lifestyle`;
    
    console.log('[DEBUG] Lifestyle Page - Fetching lifestyle articles from:', apiUrl);
    console.log('[DEBUG] Base URL resolved to:', baseUrl);
    
    const response = await fetch(apiUrl, {
      cache: 'no-store'
    });

    console.log('[DEBUG] Lifestyle articles response status:', response.status);
    console.log('[DEBUG] Lifestyle articles response ok:', response.ok);

    if (!response.ok) {
      console.error('[DEBUG] Lifestyle articles fetch failed:', response.status, response.statusText);
      throw new Error('Failed to fetch lifestyle articles');
    }

    const data = await response.json();
    console.log('[DEBUG] Lifestyle articles data received:', data.articles?.length || 0, 'articles');
    return data.articles || []; 
  } catch (error) {
    console.error('[DEBUG] Error fetching lifestyle articles:', error);
    return [];
  }
}

export default async function LifestylePage() {
  const lifestyleArticles = await getLifestyleArticles();

  const featuredArticles = lifestyleArticles.filter((article: Article) => article.featured);
  const allArticles = lifestyleArticles;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-rose-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Lifestyle & Tips for Sri Lanka
            </h1>
            <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto">
              Practical lifestyle advice, budget tips, and life hacks for making 
              the most of your time in Sri Lanka, whether visiting or living there.
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
                <span className="text-gray-900 font-medium">Lifestyle</span>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Lifestyle Guides</h2>
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
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 opacity-20"></div>
                      <div className="absolute top-4 left-4">
                        <span className="bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium">
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
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={`/articles/${article.slug}`}
                        className="text-pink-600 font-medium hover:text-pink-700 transition-colors"
                      >
                        Read Guide →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* All Articles */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">All Lifestyle Content</h2>
                <div className="text-sm text-gray-500">
                  {allArticles.length} articles
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
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 opacity-20 rounded-lg"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-xs font-medium">
                            {article.category.name}
                          </span>
                          <span className="text-sm text-gray-500">{new Date(article.publishedAt).toLocaleDateString()}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-pink-600 transition-colors">
                          <Link href={`/articles/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h3>
                        <p className="text-gray-600 mb-3 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {article.tags.map((tag) => (
                            <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <Link
                          href={`/articles/${article.slug}`}
                          className="text-pink-600 font-medium hover:text-pink-700 transition-colors"
                        >
                          Read Full Article →
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

              {/* Additional Ad Space */}
              <div className="bg-white rounded-lg shadow-md p-6 min-h-[200px] flex items-center justify-center">
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
