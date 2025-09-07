import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How-to Guides - Sri Lanka How",
  description: "Step-by-step how-to guides for everything you need to know about Sri Lanka. From practical tips to detailed instructions for travelers.",
  openGraph: {
    title: "How-to Guides - Sri Lanka How",
    description: "Step-by-step how-to guides for everything you need to know about Sri Lanka. Practical tips and detailed instructions.",
  },
};

const guidesArticles = [
  {
    id: 1,
    title: "How to Get a SIM Card in Sri Lanka",
    excerpt: "Step-by-step guide to getting a local SIM card for tourists and visitors in Sri Lanka, including best networks and data plans.",
    image: "/articles/sim-card.jpg",
    category: "Communication",
    slug: "sim-card-sri-lanka-guide",
    readTime: "5 min read",
    featured: true,
    difficulty: "Easy"
  },
  {
    id: 2,
    title: "How to Book Train Tickets in Sri Lanka",
    excerpt: "Complete guide to booking train tickets online and at stations, including classes, routes, and insider tips for scenic journeys.",
    image: "/articles/train-booking.jpg",
    category: "Transportation",
    slug: "how-to-book-train-tickets",
    readTime: "8 min read",
    featured: true,
    difficulty: "Medium"
  },
  {
    id: 3,
    title: "How to Apply for Sri Lanka Visa Online",
    excerpt: "Step-by-step process to apply for Electronic Travel Authorization (ETA) for Sri Lanka, including requirements and fees.",
    image: "/articles/visa-application.jpg",
    category: "Documentation",
    slug: "sri-lanka-visa-application-guide",
    readTime: "10 min read",
    featured: true,
    difficulty: "Easy"
  },
  {
    id: 4,
    title: "How to Exchange Money in Sri Lanka",
    excerpt: "Best places to exchange currency, current rates, and tips to get the best value for your money in Sri Lanka.",
    image: "/articles/money-exchange.jpg",
    category: "Finance",
    slug: "how-to-exchange-money-sri-lanka",
    readTime: "6 min read",
    featured: false,
    difficulty: "Easy"
  },
  {
    id: 5,
    title: "How to Hire a Tuk-Tuk in Sri Lanka",
    excerpt: "Complete guide to hiring tuk-tuks, negotiating prices, safety tips, and what to expect from this popular transport method.",
    image: "/articles/tuk-tuk-guide.jpg",
    category: "Transportation",
    slug: "how-to-hire-tuk-tuk-sri-lanka",
    readTime: "7 min read",
    featured: true,
    difficulty: "Easy"
  },
  {
    id: 6,
    title: "How to Find Accommodation in Sri Lanka",
    excerpt: "Guide to finding the best places to stay, from budget guesthouses to luxury hotels, including booking tips and recommendations.",
    image: "/articles/accommodation.jpg",
    category: "Accommodation",
    slug: "how-to-find-accommodation-sri-lanka",
    readTime: "12 min read",
    featured: false,
    difficulty: "Medium"
  },
  {
    id: 7,
    title: "How to Stay Safe While Traveling in Sri Lanka",
    excerpt: "Essential safety tips, common scams to avoid, emergency contacts, and general precautions for a safe trip to Sri Lanka.",
    image: "/articles/safety-guide.jpg",
    category: "Safety",
    slug: "how-to-stay-safe-sri-lanka",
    readTime: "15 min read",
    featured: true,
    difficulty: "Medium"
  },
  {
    id: 8,
    title: "How to Navigate Colombo Public Transport",
    excerpt: "Complete guide to buses, trains, and other public transport options in Colombo, including routes, fares, and tips.",
    image: "/articles/colombo-transport.jpg",
    category: "Transportation",
    slug: "colombo-public-transport-guide",
    readTime: "9 min read",
    featured: false,
    difficulty: "Medium"
  }
];

const categories = [
  { name: "All", count: guidesArticles.length },
  { name: "Communication", count: guidesArticles.filter(a => a.category === "Communication").length },
  { name: "Transportation", count: guidesArticles.filter(a => a.category === "Transportation").length },
  { name: "Documentation", count: guidesArticles.filter(a => a.category === "Documentation").length },
  { name: "Finance", count: guidesArticles.filter(a => a.category === "Finance").length },
  { name: "Accommodation", count: guidesArticles.filter(a => a.category === "Accommodation").length },
  { name: "Safety", count: guidesArticles.filter(a => a.category === "Safety").length },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy": return "bg-green-100 text-green-800";
    case "Medium": return "bg-yellow-100 text-yellow-800";
    case "Hard": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export default function GuidesPage() {
  const featuredArticles = guidesArticles.filter(article => article.featured);
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
                  <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48 bg-gray-200">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-20"></div>
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {article.category}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(article.difficulty)}`}>
                          {article.difficulty}
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
                  <article key={article.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="sm:w-32 sm:h-32 h-48 bg-gray-200 rounded-lg flex-shrink-0">
                        <div className="w-full h-full bg-gradient-to-r from-purple-500 to-indigo-500 opacity-20 rounded-lg"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                            {article.category}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(article.difficulty)}`}>
                            {article.difficulty}
                          </span>
                          <span className="text-sm text-gray-500">{article.readTime}</span>
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
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-purple-50 hover:text-purple-700 transition-colors flex items-center justify-between"
                    >
                      <span>{category.name}</span>
                      <span className="text-sm text-gray-500">({category.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Levels */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Difficulty Levels</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Easy
                    </span>
                    <span className="text-sm text-gray-600">Quick & simple steps</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                      Medium
                    </span>
                    <span className="text-sm text-gray-600">Requires some planning</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                      Hard
                    </span>
                    <span className="text-sm text-gray-600">Complex process</span>
                  </div>
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-800 mb-3">Pro Tips</h3>
                <ul className="space-y-2 text-sm text-purple-700">
                  <li>• Always carry copies of important documents</li>
                  <li>• Download offline maps before traveling</li>
                  <li>• Learn basic Sinhala/Tamil phrases</li>
                  <li>• Keep emergency contacts handy</li>
                  <li>• Research local customs beforehand</li>
                </ul>
              </div>

              {/* Newsletter */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Guide Updates</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Get notified when we publish new how-to guides and updates.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  />
                  <button
                    type="button"
                    className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors text-sm"
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
