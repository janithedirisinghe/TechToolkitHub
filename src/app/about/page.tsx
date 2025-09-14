import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us - TechToolkitHub",
  description: "Learn about TechToolkitHub, our mission to provide comprehensive software reviews and tech guides. Meet our team and discover our story.",
  openGraph: {
    title: "About Us - TechToolkitHub",
    description: "Learn about TechToolkitHub and our mission to help users find the perfect software solutions.",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            About TechToolkitHub
          </h1>
          <p className="text-xl lg:text-2xl">
            Your trusted companion for discovering the best software solutions
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
                TechToolkitHub was born from a simple idea: everyone deserves access to 
                honest, comprehensive software reviews that help them make informed decisions 
                about the tools they use daily. As technology professionals and software 
                enthusiasts ourselves, we understand the challenge of finding the right software.
              </p>
              <p className="mb-6">
                What started as personal software testing notes and recommendations shared 
                among colleagues has evolved into a comprehensive resource trusted by thousands 
                of developers, business owners, and tech enthusiasts. We&apos;ve tested the software, 
                experienced the pain points, and discovered the hidden gems that make all the difference.
              </p>
              <p>
                Today, we&apos;re proud to be a leading software review platform, 
                covering everything from productivity tools to development frameworks, 
                from budget solutions to enterprise software recommendations.
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="mb-16">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Our Mission</h2>
            <div className="text-blue-700">
              <p className="text-lg mb-4">
                To empower every developer, business owner, and technology user with 
                honest, comprehensive software reviews and insights that help them 
                choose the right tools for their specific needs and budget.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">🎯 What We Do</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Provide in-depth software reviews</li>
                    <li>• Compare tools and alternatives</li>
                    <li>• Offer practical implementation guides</li>
                    <li>• Update reviews regularly for accuracy</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">💡 Why We Do It</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Make software selection easier</li>
                    <li>• Help users avoid costly mistakes</li>
                    <li>• Support informed technology decisions</li>
                    <li>• Build a community of informed users</li>
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
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Detailed & Thorough</h3>
                <p className="text-gray-600 text-sm">
                  We provide comprehensive software testing with real-world scenarios, 
                  not just feature lists or marketing claims.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏠</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">User-Centric</h3>
                <p className="text-gray-600 text-sm">
                  Our reviews focus on real user needs and practical applications, 
                  not just technical specifications.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔄</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Always Updated</h3>
                <p className="text-gray-600 text-sm">
                  We regularly update our reviews to reflect software updates, 
                  new features, and changing market conditions.
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
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Unbiased Reviews</h3>
                  <p className="text-gray-600">
                    We maintain complete editorial independence and provide honest assessments 
                    of software products. Our reviews are not influenced by vendor relationships 
                    or advertising partnerships.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Thorough Testing</h3>
                  <p className="text-gray-600">
                    Every software product we review undergoes comprehensive testing 
                    across multiple scenarios and use cases to provide accurate, 
                    real-world insights.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">User-First Approach</h3>
                  <p className="text-gray-600">
                    We prioritize user needs and real-world applications over 
                    marketing hype. Our goal is to help users make informed 
                    software decisions.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Accessibility</h3>
                  <p className="text-gray-600">
                    Software tools should be accessible to everyone, regardless of budget, 
                    technical expertise, or company size. Our reviews cater to all 
                    user types and use cases.
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
                  Have a question about software? Found outdated information in our reviews? 
                  Want to suggest a tool for us to review? We&apos;re always here to help 
                  and continuously improve our content.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-blue-600">📧</span>
                    <span className="text-gray-700">hello@techtoolkithub.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-blue-600">💬</span>
                    <span className="text-gray-700">We typically respond within 24 hours</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Our Journey</h3>
                <p className="text-gray-600 mb-4">
                  Stay updated with the latest software reviews, tech insights, and tool recommendations 
                  by following us on social media and subscribing to our newsletter.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Newsletter
                  </a>
                  <Link href="/contact" className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
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
              Every reader, every question, and every software suggestion helps us 
              build a better resource for the tech community. Together, we&apos;re 
              making software discovery easier and more informed for everyone.
            </p>
            <div className="mt-6">
              <Link 
                href="/"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Explore Our Reviews
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
