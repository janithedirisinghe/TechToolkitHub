import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us - Sri Lanka How",
  description: "Learn about Sri Lanka How, our mission to provide comprehensive guides and tips for everything Sri Lanka. Meet our team and discover our story.",
  openGraph: {
    title: "About Us - Sri Lanka How",
    description: "Learn about Sri Lanka How and our mission to help travelers and residents navigate Sri Lanka with confidence.",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            About Sri Lanka How
          </h1>
          <p className="text-xl lg:text-2xl">
            Your trusted companion for navigating the Pearl of the Indian Ocean
          </p>
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
                <span className="text-gray-900 font-medium">About</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Our Story */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="mb-6">
                Sri Lanka How was born from a simple idea: everyone deserves to experience 
                the incredible beauty, rich culture, and warm hospitality of Sri Lanka with 
                confidence and ease. As travelers and long-term residents ourselves, we 
                understand the challenges that come with navigating a new country.
              </p>
              <p className="mb-6">
                What started as personal travel notes and tips shared among friends has 
                evolved into a comprehensive resource trusted by thousands of travelers, 
                students, digital nomads, and expats. We&apos;ve walked in your shoes, made 
                the mistakes, and learned the insider secrets that make all the difference.
              </p>
              <p>
                Today, we&apos;re proud to be Sri Lanka&apos;s most comprehensive how-to resource, 
                covering everything from getting a SIM card to understanding cultural 
                nuances, from budget travel tips to expat life advice.
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="mb-16">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-emerald-800 mb-6">Our Mission</h2>
            <div className="text-emerald-700">
              <p className="text-lg mb-4">
                To empower every visitor and resident of Sri Lanka with practical, 
                accurate, and culturally-sensitive information that enhances their 
                experience and helps them navigate the country with confidence.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div>
                  <h3 className="font-semibold text-emerald-800 mb-2">🎯 What We Do</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Provide step-by-step how-to guides</li>
                    <li>• Share cultural insights and local customs</li>
                    <li>• Offer practical travel and lifestyle tips</li>
                    <li>• Update information regularly for accuracy</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-emerald-800 mb-2">💡 Why We Do It</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Make Sri Lanka accessible to everyone</li>
                    <li>• Bridge cultural gaps with understanding</li>
                    <li>• Support sustainable and responsible tourism</li>
                    <li>• Build a community of informed travelers</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What Makes Us Different</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Detailed & Practical</h3>
                <p className="text-gray-600 text-sm">
                  We provide step-by-step instructions with real-world context, 
                  not just surface-level information.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏠</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Local Perspective</h3>
                <p className="text-gray-600 text-sm">
                  Our content is created by people who live in Sri Lanka and 
                  understand both local and international perspectives.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔄</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Always Updated</h3>
                <p className="text-gray-600 text-sm">
                  We regularly update our content to ensure accuracy and relevance 
                  in Sri Lanka&apos;s changing landscape.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Values</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Cultural Respect</h3>
                  <p className="text-gray-600">
                    We approach Sri Lankan culture with deep respect and encourage 
                    visitors to do the same. Our guides emphasize cultural sensitivity 
                    and responsible tourism practices.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Accuracy & Trust</h3>
                  <p className="text-gray-600">
                    Every piece of information we publish is thoroughly researched 
                    and regularly verified. We take our responsibility as a trusted 
                    resource seriously.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Support</h3>
                  <p className="text-gray-600">
                    We believe in supporting local communities and promoting 
                    sustainable tourism that benefits both visitors and Sri Lankan 
                    people.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-600 font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Accessibility</h3>
                  <p className="text-gray-600">
                    Sri Lanka should be accessible to everyone, regardless of budget, 
                    background, or experience level. Our guides cater to all types 
                    of travelers and residents.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="mb-16">
          <div className="bg-gray-100 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">We&apos;d Love to Hear From You</h3>
                <p className="text-gray-600 mb-4">
                  Have a question about Sri Lanka? Found outdated information? 
                  Want to share your own experience? We&apos;re always here to help 
                  and continuously improve our content.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-600">📧</span>
                    <span className="text-gray-700">hello@srilankahow.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-600">💬</span>
                    <span className="text-gray-700">We typically respond within 24 hours</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Our Journey</h3>
                <p className="text-gray-600 mb-4">
                  Stay updated with the latest guides, tips, and Sri Lankan insights 
                  by following us on social media and subscribing to our newsletter.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                    Newsletter
                  </a>
                  <Link href="/contact" className="bg-white text-emerald-600 border border-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-50 transition-colors">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Thank You */}
        <section>
          <div className="text-center bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Thank You for Being Part of Our Community
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every reader, every question, and every shared experience helps us 
              build a better resource for the Sri Lanka community. Together, we&apos;re 
              making Sri Lanka more accessible and enjoyable for everyone.
            </p>
            <div className="mt-6">
              <Link 
                href="/"
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                Explore Our Guides
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
