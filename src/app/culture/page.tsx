import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Culture & Lifestyle - Sri Lanka How",
  description: "Explore Sri Lankan culture, traditions, festivals, food, and lifestyle. Learn about local customs, religious practices, and cultural experiences.",
  openGraph: {
    title: "Culture & Lifestyle - Sri Lanka How",
    description: "Explore Sri Lankan culture, traditions, festivals, food, and lifestyle. Learn about local customs and cultural experiences.",
  },
};

const cultureArticles = [
  {
    id: 1,
    title: "Sri Lankan Food Culture: A Beginner's Guide",
    excerpt: "Discover the rich culinary traditions of Sri Lanka, from street food to home cooking, and learn about must-try dishes.",
    image: "/articles/food-culture.jpg",
    category: "Food & Cuisine",
    slug: "sri-lankan-food-culture",
    readTime: "12 min read",
    featured: true
  },
  {
    id: 2,
    title: "Traditional Sri Lankan Festivals",
    excerpt: "Experience the vibrant festivals of Sri Lanka, from Vesak to Kandy Esala Perahera, and learn about their cultural significance.",
    image: "/articles/festivals.jpg",
    category: "Festivals",
    slug: "traditional-sri-lankan-festivals",
    readTime: "10 min read",
    featured: true
  },
  {
    id: 3,
    title: "Buddhist Temples: Etiquette and Customs",
    excerpt: "Learn the proper way to visit Buddhist temples in Sri Lanka, including dress codes, behavior, and cultural sensitivity.",
    image: "/articles/temple-etiquette.jpg",
    category: "Religion",
    slug: "buddhist-temple-etiquette",
    readTime: "8 min read",
    featured: true
  },
  {
    id: 4,
    title: "Traditional Sri Lankan Arts and Crafts",
    excerpt: "Explore the rich tradition of Sri Lankan handicrafts including batik, woodcarving, mask making, and traditional jewelry.",
    image: "/articles/arts-crafts.jpg",
    category: "Arts & Crafts",
    slug: "traditional-arts-crafts",
    readTime: "15 min read",
    featured: false
  },
  {
    id: 5,
    title: "Wedding Traditions in Sri Lanka",
    excerpt: "Understanding Sri Lankan wedding customs, ceremonies, and traditions across different communities and religions.",
    image: "/articles/weddings.jpg",
    category: "Traditions",
    slug: "sri-lankan-wedding-traditions",
    readTime: "13 min read",
    featured: false
  },
  {
    id: 6,
    title: "Ayurveda and Traditional Medicine",
    excerpt: "Learn about Sri Lanka's ancient Ayurvedic traditions, treatments, and how to experience authentic wellness practices.",
    image: "/articles/ayurveda.jpg",
    category: "Wellness",
    slug: "ayurveda-traditional-medicine",
    readTime: "11 min read",
    featured: true
  }
];

const categories = [
  { name: "All", count: cultureArticles.length },
  { name: "Food & Cuisine", count: cultureArticles.filter(a => a.category === "Food & Cuisine").length },
  { name: "Festivals", count: cultureArticles.filter(a => a.category === "Festivals").length },
  { name: "Religion", count: cultureArticles.filter(a => a.category === "Religion").length },
  { name: "Arts & Crafts", count: cultureArticles.filter(a => a.category === "Arts & Crafts").length },
  { name: "Traditions", count: cultureArticles.filter(a => a.category === "Traditions").length },
  { name: "Wellness", count: cultureArticles.filter(a => a.category === "Wellness").length },
];

export default function CulturePage() {
  const featuredArticles = cultureArticles.filter(article => article.featured);
  const allArticles = cultureArticles;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Sri Lankan Culture & Lifestyle
            </h1>
            <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto">
              Immerse yourself in the rich cultural heritage, traditions, and vibrant 
              lifestyle of Sri Lanka. Discover festivals, food, customs, and more.
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
                <span className="text-gray-900 font-medium">Culture</span>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Cultural Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredArticles.map((article) => (
                  <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48 bg-gray-200">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-20"></div>
                      <div className="absolute top-4 left-4">
                        <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
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
                        className="text-orange-600 font-medium hover:text-orange-700 transition-colors"
                      >
                        Learn More →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* All Articles */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">All Cultural Content</h2>
                <div className="text-sm text-gray-500">
                  {allArticles.length} articles
                </div>
              </div>

              <div className="space-y-6">
                {allArticles.map((article) => (
                  <article key={article.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="sm:w-32 sm:h-32 h-48 bg-gray-200 rounded-lg flex-shrink-0">
                        <div className="w-full h-full bg-gradient-to-r from-orange-500 to-red-500 opacity-20 rounded-lg"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                            {article.category}
                          </span>
                          <span className="text-sm text-gray-500">{article.readTime}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-orange-600 transition-colors">
                          <Link href={`/articles/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <Link
                          href={`/articles/${article.slug}`}
                          className="text-orange-600 font-medium hover:text-orange-700 transition-colors"
                        >
                          Learn More →
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
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-700 transition-colors flex items-center justify-between"
                    >
                      <span>{category.name}</span>
                      <span className="text-sm text-gray-500">({category.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cultural Facts */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-orange-800 mb-3">Did You Know?</h3>
                <ul className="space-y-2 text-sm text-orange-700">
                  <li>• Sri Lanka has 4 major religions</li>
                  <li>• Sinhala & Tamil are official languages</li>
                  <li>• 70% of population is Buddhist</li>
                  <li>• Over 2,500 years of recorded history</li>
                  <li>• Home to 8 UNESCO World Heritage Sites</li>
                </ul>
              </div>

              {/* Cultural Events */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Upcoming Festivals</h3>
                <div className="space-y-3 text-sm">
                  <div className="border-l-4 border-orange-500 pl-3">
                    <div className="font-medium text-gray-900">Vesak Festival</div>
                    <div className="text-gray-600">May 2025 • Buddhist celebration</div>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-3">
                    <div className="font-medium text-gray-900">Kandy Perahera</div>
                    <div className="text-gray-600">August 2025 • Cultural parade</div>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-3">
                    <div className="font-medium text-gray-900">Diwali</div>
                    <div className="text-gray-600">October 2025 • Festival of lights</div>
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Cultural Updates</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Get notified about cultural events, festivals, and new articles.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                  />
                  <button
                    type="button"
                    className="w-full bg-orange-600 text-white py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors text-sm"
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
