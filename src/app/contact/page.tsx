import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us - TechToolkitHub",
  description: "Get in touch with TechToolkitHub. Ask questions about software reviews, share feedback, or suggest tools for us to review.",
  openGraph: {
    title: "Contact Us - TechToolkitHub",
    description: "Contact TechToolkitHub for questions, feedback, or suggestions about software reviews and tech guides.",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-xl lg:text-2xl">
            We&apos;re here to help with all your software questions
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
                <span className="text-gray-900 font-medium">Contact</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    name="first-name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    name="last-name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Your last name"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="">Select a topic</option>
                  <option value="general">General Question</option>
                  <option value="travel">Travel Advice</option>
                  <option value="guides">Guide Request</option>
                  <option value="feedback">Feedback</option>
                  <option value="partnership">Partnership/Collaboration</option>
                  <option value="technical">Technical Issue</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="newsletter"
                  name="newsletter"
                  className="mt-1 w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
                <label htmlFor="newsletter" className="text-sm text-gray-600">
                  Subscribe to our newsletter for the latest Sri Lanka guides and tips
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Quick Contact */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-600 text-xl">📧</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                    <p className="text-gray-600 mb-2">
                      For general inquiries, travel questions, and feedback
                    </p>
                    <a href="mailto:hello@srilankahow.com" className="text-emerald-600 hover:text-emerald-700">
                      hello@srilankahow.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-600 text-xl">⏰</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Response Time</h3>
                    <p className="text-gray-600">
                      We typically respond within 24 hours on weekdays
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-600 text-xl">🌍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Based in Sri Lanka</h3>
                    <p className="text-gray-600">
                      Our team is based in Sri Lanka, giving us first-hand local knowledge
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-emerald-800 mb-4">Before You Contact Us</h3>
              <p className="text-emerald-700 mb-4">
                Check if your question might already be answered:
              </p>
              <div className="space-y-3">
                <Link href="/guides" className="block text-emerald-700 hover:text-emerald-800 transition-colors">
                  → Browse our How-to Guides
                </Link>
                <Link href="/travel" className="block text-emerald-700 hover:text-emerald-800 transition-colors">
                  → Check our Travel section
                </Link>
                <Link href="/culture" className="block text-emerald-700 hover:text-emerald-800 transition-colors">
                  → Explore Culture & Lifestyle
                </Link>
                <Link href="/lifestyle" className="block text-emerald-700 hover:text-emerald-800 transition-colors">
                  → View Lifestyle Tips
                </Link>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Follow Us</h3>
              <p className="text-gray-600 mb-6">
                Stay updated with our latest guides and Sri Lankan insights
              </p>
              <div className="grid grid-cols-2 gap-4">
                <a href="#" className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-blue-600 text-xl">📘</span>
                  <span className="text-gray-700 font-medium">Facebook</span>
                </a>
                <a href="#" className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-pink-600 text-xl">📷</span>
                  <span className="text-gray-700 font-medium">Instagram</span>
                </a>
                <a href="#" className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-blue-400 text-xl">🐦</span>
                  <span className="text-gray-700 font-medium">Twitter</span>
                </a>
                <a href="#" className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-red-600 text-xl">📺</span>
                  <span className="text-gray-700 font-medium">YouTube</span>
                </a>
              </div>
            </div>

            {/* Partnership */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Partnership Opportunities</h3>
              <p className="text-gray-600 mb-4">
                Interested in collaborating with Sri Lanka How? We work with:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Tourism businesses and hotels</li>
                <li>• Local guides and tour operators</li>
                <li>• Travel bloggers and content creators</li>
                <li>• Educational institutions</li>
                <li>• Technology and service providers</li>
              </ul>
              <p className="text-sm text-gray-500 mt-4">
                Please mention &quot;Partnership&quot; in your subject line when contacting us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
