import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions - TechToolkitHub",
  description: "Terms & Conditions governing use of TechToolkitHub software reviews, guides, and related services.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Terms & Conditions</h1>
          <p className="text-sm mt-3 text-blue-200">Last updated: September 14, 2025</p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav aria-label="Breadcrumb" className="text-sm">
            <ol className="flex items-center space-x-2 text-gray-500">
              <li><Link href="/" className="hover:text-gray-700">Home</Link></li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-900 font-medium">Terms & Conditions</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 lg:p-10">
          <div className="prose prose-slate prose-headings:font-semibold max-w-none">
            <p className="text-gray-600">Welcome to <span className="font-semibold text-gray-900">TechToolkitHub</span> (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;). These Terms &amp; Conditions (&quot;Terms&quot;) govern your access to and use of the TechToolkitHub website, content, tools, review materials, and any related services. By accessing or using the site you agree to these Terms. If you disagree with any part, do not use the site.</p>

            <h2>1. Purpose of the Site</h2>
            <p>TechToolkitHub provides independent software reviews, comparisons, pricing breakdowns, productivity guides, tutorials, and industry commentary. Content is offered for informational and educational purposes only and does not constitute professional, legal, security, accounting, or investment advice.</p>

            <h2>2. Review Independence & Methodology</h2>
            <p>We aim for objectivity. Reviews may reference hands‑on testing, vendor documentation, release notes, performance benchmarks, user feedback, pricing transparency, integration breadth, and security posture (where publicly disclosed). While we strive for accuracy, software evolves rapidly and no guarantee is made that older reviews remain current.</p>
            <ul>
              <li>We do not sell ranking positions.</li>
              <li>Sponsored placements or affiliate relationships are disclosed.</li>
              <li>Subjective opinions are clearly separated from factual statements where practical.</li>
            </ul>

            <h2>3. Affiliate & Referral Disclosure</h2>
            <p>Some outbound links may be affiliate or tracking links. If you click such a link and make a purchase or sign up, we may earn a commission—at no additional cost to you. These relationships help fund research, testing environments, and editorial operations. Affiliate status does not affect the integrity of our evaluations.</p>

            <h2>4. Use of Content & License</h2>
            <p>You are granted a limited, revocable, non‑exclusive license to access and view publicly available content for personal, non‑commercial use. Except where explicitly permitted:</p>
            <ul>
              <li>No bulk scraping, automated harvesting, or mirroring.</li>
              <li>No republication of full articles without written permission.</li>
              <li>Attribution with a do‑follow link is required for quoted excerpts (≤ 100 words).</li>
            </ul>

            <h2>5. Account & Authentication (Future Features)</h2>
            <p>If user accounts, saved toolkits, or comment systems are introduced, you agree to provide accurate information and maintain credential security. We may suspend or terminate access for misuse, abuse, fraud, or violation of these Terms.</p>

            <h2>6. Prohibited Activities</h2>
            <ul>
              <li>Security probing, vulnerability exploitation, or attempting to bypass access controls.</li>
              <li>Injecting or distributing malware, spyware, or malicious automation.</li>
              <li>Commercial resale of structured datasets derived from our content without license.</li>
              <li>False impersonation of staff, experts, or vendors.</li>
              <li>Misuse of contact channels for spam or undisclosed solicitation.</li>
            </ul>

            <h2>7. Intellectual Property</h2>
            <p>All branding, layouts, curated datasets, comparison matrices, review scoring frameworks, copy, illustrations, and custom UI components are protected by copyright, trademark, and/or database rights. Third‑party marks belong to their respective owners.</p>

            <h2>8. Third‑Party Software & Pricing Data</h2>
            <p>Logos, pricing snapshots, feature claims, and roadmap references originate from vendor disclosures at the time of publication. These may change without notice. Always confirm critical purchase decisions directly with the vendor.</p>

            <h2>9. Disclaimers</h2>
            <p>The site and content are provided &quot;as is&quot; without warranties of any kind—express or implied—including fitness for a particular purpose, accuracy, availability, merchantability, or non‑infringement. We do not warrant that: (a) content will remain accurate; (b) the site will be uninterrupted, secure, or error‑free; or (c) defects will be corrected.</p>

            <h2>10. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, we shall not be liable for indirect, incidental, consequential, special, exemplary, or punitive damages; loss of profits, revenue, data, goodwill; business interruption; procurement of substitute services; or reliance damages arising from site use—even if advised of the possibility. Aggregate liability shall not exceed USD 100.</p>

            <h2>11. External Links</h2>
            <p>Outbound links to vendor sites, documentation, marketplaces, or community resources are provided for convenience. We do not control and are not responsible for third‑party content, security posture, availability, or privacy practices.</p>

            <h2>12. Privacy & Data Practices</h2>
            <p>Your use of the site is also governed by our <Link href="/privacy" className="text-blue-600 hover:text-blue-700 underline">Privacy Policy</Link>, which explains analytics, cookies, affiliate tracking, log data, and user rights.</p>

            <h2>13. Cookies & Consent</h2>
            <p>We use essential cookies (operational), analytics cookies (aggregated usage insights), preference cookies (UI choices), and affiliate attribution parameters. Non‑essential categories will only run after consent—see cookie banner controls.</p>

            <h2>14. Changes & Versioning</h2>
            <p>We may amend these Terms to reflect operational, legal, or regulatory changes. Material changes will be dated at the top of this page. Continued use after updates constitutes acceptance.</p>

            <h2>15. Suspension & Termination</h2>
            <p>We may restrict or terminate access for abuse, legal risk, security threats, systematic scraping, or violation of these Terms. Sections relating to IP, disclaimers, limitation of liability, and governing law survive termination.</p>

            <h2>16. Governing Law & Jurisdiction</h2>
            <p>These Terms are governed by the laws of the jurisdiction in which the site operator is established. Where required, conflict‑of‑laws principles are excluded. Disputes shall be subject to exclusive jurisdiction of competent courts in that locale unless mandatory consumer law provides otherwise.</p>

            <h2>17. Contact</h2>
            <p>Questions or legal notices:</p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 not-prose text-sm">
              <p className="text-gray-800"><strong>Email:</strong> legal@techtoolkithub.com<br />
              <strong>Contact:</strong> <Link href="/contact" className="text-blue-600 hover:text-blue-700">Contact Form</Link></p>
            </div>

            <div className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded-lg not-prose text-xs leading-relaxed text-slate-600">
              <p><strong>Editorial Integrity Notice:</strong> We regularly refresh core comparative guides. Archived articles may remain for historical context and may not reflect new pricing tiers, licensing changes, or deprecated features.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
