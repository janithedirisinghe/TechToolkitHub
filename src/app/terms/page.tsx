import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service - Sri Lanka How",
  description: "Terms of Service for Sri Lanka How. Read our terms and conditions for using our website, content, and services.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-300">
            Last updated: September 7, 2025
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
                <span className="text-gray-900 font-medium">Terms of Service</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              Welcome to Sri Lanka How. These Terms of Service (&quot;Terms&quot;) govern your 
              use of our website located at srilankahow.com and any related services 
              provided by Sri Lanka How.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-600 mb-6">
              By accessing and using this website, you accept and agree to be bound by 
              the terms and provision of this agreement. If you do not agree to abide 
              by the above, please do not use this service.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Use License</h2>
            <p className="text-gray-600 mb-4">
              Permission is granted to temporarily download one copy of the materials 
              on Sri Lanka How&apos;s website for personal, non-commercial transitory viewing only. 
              This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Content and Intellectual Property</h2>
            <p className="text-gray-600 mb-4">
              All content on this website, including but not limited to text, graphics, 
              logos, images, and software, is the property of Sri Lanka How or its content 
              suppliers and is protected by international copyright laws.
            </p>
            <p className="text-gray-600 mb-6">
              You may share our content with proper attribution and links back to the 
              original source. However, republishing entire articles without permission 
              is prohibited.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">User-Generated Content</h2>
            <p className="text-gray-600 mb-4">
              When you submit comments, reviews, or other content to our website, you grant 
              Sri Lanka How a non-exclusive, royalty-free, perpetual license to use, 
              modify, and distribute that content. You are responsible for ensuring that 
              any content you submit:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Is accurate and not misleading</li>
              <li>Does not infringe on the rights of others</li>
              <li>Is not offensive, harmful, or inappropriate</li>
              <li>Complies with applicable laws and regulations</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Prohibited Uses</h2>
            <p className="text-gray-600 mb-4">
              You may not use our website for any of the following purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Engaging in any unlawful or fraudulent activity</li>
              <li>Transmitting malware, viruses, or harmful code</li>
              <li>Spamming or sending unsolicited communications</li>
              <li>Attempting to gain unauthorized access to our systems</li>
              <li>Interfering with the proper functioning of the website</li>
              <li>Impersonating another person or entity</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Information Accuracy</h2>
            <p className="text-gray-600 mb-6">
              While we strive to provide accurate and up-to-date information about Sri Lanka, 
              we make no warranties about the completeness, reliability, or accuracy of this 
              information. Travel conditions, regulations, and other factors can change 
              rapidly. You should verify important information independently before making 
              travel decisions.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Disclaimer</h2>
            <p className="text-gray-600 mb-4">
              The information on this website is provided on an &quot;as is&quot; basis. To the 
              fullest extent permitted by law, Sri Lanka How excludes:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>All warranties, whether express or implied</li>
              <li>All liability for any direct, indirect, or consequential loss or damage</li>
              <li>All liability arising from any user&apos;s reliance on materials found or accessed through this website</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">External Links</h2>
            <p className="text-gray-600 mb-6">
              Our website may contain links to third-party websites. These links are 
              provided for your convenience only. We have no control over the content 
              of these websites and assume no responsibility for them or for any loss 
              or damage that may arise from your use of them.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Privacy Policy</h2>
            <p className="text-gray-600 mb-6">
              Your privacy is important to us. Please review our Privacy Policy, which 
              also governs your use of the website, to understand our practices.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Termination</h2>
            <p className="text-gray-600 mb-6">
              We may terminate or suspend your access to our website immediately, without 
              prior notice or liability, for any reason whatsoever, including without 
              limitation if you breach the Terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Limitation of Liability</h2>
            <p className="text-gray-600 mb-6">
              In no event shall Sri Lanka How, nor its directors, employees, partners, 
              agents, suppliers, or affiliates, be liable for any indirect, incidental, 
              punitive, consequential, or special damages arising from your use of the website.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Governing Law</h2>
            <p className="text-gray-600 mb-6">
              These Terms shall be interpreted and governed by the laws of Sri Lanka. 
              Any disputes arising under these Terms shall be subject to the exclusive 
              jurisdiction of the courts of Sri Lanka.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Changes to Terms</h2>
            <p className="text-gray-600 mb-6">
              We reserve the right to revise these Terms at any time without notice. 
              By using this website, you are agreeing to be bound by the then current 
              version of these Terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Information</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> legal@srilankahow.com<br />
                <strong>Website:</strong> <Link href="/contact" className="text-emerald-600 hover:text-emerald-700">Contact Form</Link>
              </p>
            </div>

            <div className="mt-8 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <h3 className="text-lg font-semibold text-emerald-800 mb-2">Travel Disclaimer</h3>
              <p className="text-emerald-700 text-sm">
                Travel involves inherent risks. While we provide information to help you 
                make informed decisions, you travel at your own risk. Always check current 
                travel advisories, health requirements, and local conditions before traveling 
                to Sri Lanka.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
