import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Travel Guides - Sri Lanka How",
  description: "Comprehensive travel guides for Sri Lanka including destinations, transportation, accommodations, and detailed itineraries for your perfect trip.",
  openGraph: {
    title: "Travel Guides - Sri Lanka How",
    description: "Comprehensive travel guides for Sri Lanka including destinations, transportation, accommodations, and detailed itineraries.",
  },
};

// Sample travel articles data
const travelArticles = [
  {
    id: 1,
    title: "Complete Guide to Sigiriya Rock Fortress",
    excerpt: "Everything you need to know about visiting Sri Lanka's ancient rock fortress, including tickets, best times to visit, and insider tips.",
    image: "/articles/sigiriya.jpg",
    category: "Destinations",
    slug: "sigiriya-complete-guide",
    readTime: "8 min read",
    featured: true
  },
  {
    id: 2,
    title: "Best Time to Visit Sri Lanka",
    excerpt: "Weather patterns, seasonal guides, and the optimal times to visit different regions of Sri Lanka for your perfect trip.",
    image: "/articles/best-time.jpg",
    category: "Planning",
    slug: "best-time-visit-sri-lanka",
    readTime: "6 min read",
    featured: true
  },
  {
    id: 3,
    title: "Budget Travel in Sri Lanka: Complete Guide",
    excerpt: "How to travel Sri Lanka on a budget with tips for accommodation, transport, food, and activities that won't break the bank.",
    image: "/articles/budget-travel.jpg",
    category: "Budget Travel",
    slug: "budget-travel-sri-lanka",
    readTime: "15 min read",
    featured: true
  },
  {
    id: 4,
    title: "Ultimate Guide to Kandy - Cultural Capital",
    excerpt: "Explore Kandy's temples, botanical gardens, cultural shows, and hidden gems with our comprehensive city guide.",
    image: "/articles/kandy.jpg",
    category: "Destinations",
    slug: "kandy-ultimate-guide",
    readTime: "10 min read",
    featured: false
  },
  {
    id: 5,
    title: "Transportation Guide: Getting Around Sri Lanka",
    excerpt: "Complete guide to trains, buses, tuk-tuks, and other transport options for traveling around Sri Lanka efficiently.",
    image: "/articles/transport.jpg",
    category: "Transportation",
    slug: "sri-lanka-transportation-guide",
    readTime: "12 min read",
    featured: false
  },
  {
    id: 6,
    title: "Galle Fort Walking Guide",
    excerpt: "Discover the Dutch colonial architecture, museums, cafes, and shops in this UNESCO World Heritage site.",
    image: "/articles/galle.jpg",
    category: "Destinations",
    slug: "galle-fort-walking-guide",
    readTime: "7 min read",
    featured: false
  },
  {
    id: 7,
    title: "7-Day Sri Lanka Itinerary for First-Time Visitors",
    excerpt: "Perfect week-long itinerary covering cultural triangle, hill country, and beaches for first-time visitors.",
    image: "/articles/7-day-itinerary.jpg",
    category: "Itineraries",
    slug: "7-day-sri-lanka-itinerary",
    readTime: "18 min read",
    featured: true
  },
  {
    id: 8,
    title: "Beach Guide: Best Beaches in Sri Lanka",
    excerpt: "From Unawatuna to Arugam Bay, discover the best beaches for swimming, surfing, and relaxation.",
    image: "/articles/beaches.jpg",
    category: "Destinations",
    slug: "best-beaches-sri-lanka",
    readTime: "14 min read",
    featured: false
  }
];

const categories = [
  { name: "All", count: travelArticles.length },
  { name: "Destinations", count: travelArticles.filter(a => a.category === "Destinations").length },
  { name: "Planning", count: travelArticles.filter(a => a.category === "Planning").length },
  { name: "Transportation", count: travelArticles.filter(a => a.category === "Transportation").length },
  { name: "Itineraries", count: travelArticles.filter(a => a.category === "Itineraries").length },
  { name: "Budget Travel", count: travelArticles.filter(a => a.category === "Budget Travel").length },
];

export default function TravelPage() {
  const featuredArticles = travelArticles.filter(article => article.featured);
  const allArticles = travelArticles;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Travel Guides for Sri Lanka
            </h1>
            <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto">
              Discover the best destinations, transportation tips, and travel itineraries 
              to make your Sri Lankan adventure unforgettable.
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Travel Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {featuredArticles.slice(0, 2).map((article) => (
                  <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48 bg-gray-200">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 opacity-20"></div>
                      <div className="absolute top-4 left-4">
                        <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {article.category}
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                          {article.readTime}
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
                        className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
                      >
                        Read Full Guide →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
              
              {featuredArticles.length > 2 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {featuredArticles.slice(2).map((article) => (
                    <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-40 bg-gray-200">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 opacity-20"></div>
                        <div className="absolute top-3 left-3">
                          <span className="bg-emerald-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                            {article.category}
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
                            className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors text-sm"
                          >
                            Read More →
                          </Link>
                          <span className="text-xs text-gray-500">{article.readTime}</span>
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
                <h2 className="text-2xl font-bold text-gray-900">All Travel Guides</h2>
                <div className="text-sm text-gray-500">
                  {allArticles.length} articles
                </div>
              </div>

              <div className="space-y-6">
                {allArticles.map((article) => (
                  <article key={article.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="sm:w-32 sm:h-32 h-48 bg-gray-200 rounded-lg flex-shrink-0">
                        <div className="w-full h-full bg-gradient-to-r from-emerald-500 to-blue-500 opacity-20 rounded-lg"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium">
                            {article.category}
                          </span>
                          <span className="text-sm text-gray-500">{article.readTime}</span>
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

          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-24 space-y-6">
              {/* Categories */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 transition-colors flex items-center justify-between"
                    >
                      <span>{category.name}</span>
                      <span className="text-sm text-gray-500">({category.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-emerald-800 mb-3">Travel Tips</h3>
                <ul className="space-y-2 text-sm text-emerald-700">
                  <li>• Best time to visit: December to March</li>
                  <li>• Visa required for most countries</li>
                  <li>• Currency: Sri Lankan Rupee (LKR)</li>
                  <li>• Language: Sinhala, Tamil, English</li>
                  <li>• Driving: Left-hand side</li>
                </ul>
              </div>

              {/* Newsletter */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Get Travel Updates</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Subscribe to receive the latest travel guides and tips for Sri Lanka.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                  />
                  <button
                    type="button"
                    className="w-full bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors text-sm"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
