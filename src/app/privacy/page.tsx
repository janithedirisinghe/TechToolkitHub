import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - Sri Lanka How",
  description: "Sri Lanka How privacy policy. Learn how we collect, use, and protect your personal information when you use our website and services.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Privacy Policy
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
                <span className="text-gray-900 font-medium">Privacy Policy</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              At Sri Lanka How, we are committed to protecting your privacy and ensuring 
              the security of your personal information. This Privacy Policy explains how 
              we collect, use, disclose, and safeguard your information when you visit our 
              website srilankahow.com.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Personal Information</h3>
            <p className="text-gray-600 mb-4">
              We may collect personal information that you voluntarily provide when you:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Subscribe to our newsletter</li>
              <li>Contact us through our contact form</li>
              <li>Leave comments on our articles</li>
              <li>Participate in surveys or promotions</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Automatically Collected Information</h3>
            <p className="text-gray-600 mb-4">
              When you visit our website, we may automatically collect certain information:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>IP address and location data</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Pages visited and time spent on site</li>
              <li>Referring website</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>To provide and maintain our website</li>
              <li>To send newsletters and updates (with your consent)</li>
              <li>To respond to your inquiries and provide customer support</li>
              <li>To analyze website usage and improve our content</li>
              <li>To prevent fraud and ensure website security</li>
              <li>To comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Cookies and Tracking Technologies</h2>
            <p className="text-gray-600 mb-4">
              We use cookies and similar tracking technologies to enhance your browsing experience:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
            </ul>
            <p className="text-gray-600 mb-6">
              You can control cookies through your browser settings, but disabling certain 
              cookies may limit website functionality.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Information Sharing and Disclosure</h2>
            <p className="text-gray-600 mb-4">
              We do not sell, trade, or rent your personal information to third parties. 
              We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>With your explicit consent</li>
              <li>To comply with legal requirements or court orders</li>
              <li>To protect our rights, property, or safety</li>
              <li>With trusted service providers who assist in operating our website</li>
              <li>In connection with a business transfer or merger</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Third-Party Services</h2>
            <p className="text-gray-600 mb-4">
              Our website may contain links to third-party websites or integrate with 
              third-party services. We use the following third-party services:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Google Analytics for website analytics</li>
              <li>Email service providers for newsletters</li>
              <li>Social media platforms for content sharing</li>
            </ul>
            <p className="text-gray-600 mb-6">
              These third parties have their own privacy policies, and we are not 
              responsible for their practices.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Data Security</h2>
            <p className="text-gray-600 mb-6">
              We implement appropriate security measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. However, 
              no method of transmission over the internet is 100% secure, and we cannot 
              guarantee absolute security.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Your Rights</h2>
            <p className="text-gray-600 mb-4">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Access: Request access to your personal data</li>
              <li>Correction: Request correction of inaccurate data</li>
              <li>Deletion: Request deletion of your personal data</li>
              <li>Portability: Request transfer of your data</li>
              <li>Withdrawal: Withdraw consent for data processing</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Children&apos;s Privacy</h2>
            <p className="text-gray-600 mb-6">
              Our website is not intended for children under 13 years of age. We do not 
              knowingly collect personal information from children under 13. If we become 
              aware that we have collected personal information from a child under 13, 
              we will take steps to delete such information.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">International Data Transfers</h2>
            <p className="text-gray-600 mb-6">
              Your information may be transferred to and processed in countries other than 
              your own. We ensure that such transfers comply with applicable data protection 
              laws and provide adequate protection for your personal information.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Changes to This Privacy Policy</h2>
            <p className="text-gray-600 mb-6">
              We may update this Privacy Policy from time to time. We will notify you of 
              any material changes by posting the new Privacy Policy on our website and 
              updating the &quot;Last updated&quot; date. Your continued use of our website after 
              any changes constitutes acceptance of the updated policy.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Privacy Policy or our data practices, 
              please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> privacy@srilankahow.com<br />
                <strong>Website:</strong> <Link href="/contact" className="text-emerald-600 hover:text-emerald-700">Contact Form</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
