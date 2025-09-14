import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - TechToolkitHub",
  description: "Privacy Policy for TechToolkitHub: how we collect, use, store and safeguard data including cookies, analytics, and affiliate tracking.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-sm mt-3 text-indigo-200">Last updated: September 14, 2025</p>
        </div>
      </section>

      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav aria-label="Breadcrumb" className="text-sm">
            <ol className="flex items-center space-x-2 text-gray-500">
              <li><Link href="/" className="hover:text-gray-700">Home</Link></li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-900 font-medium">Privacy Policy</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 lg:p-10">
          <div className="prose prose-slate max-w-none prose-headings:font-semibold">
            <p className="text-gray-600">This Privacy Policy explains how <span className="font-semibold text-gray-900">TechToolkitHub</span> (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) collects, uses, stores, and protects information when you access our software reviews, guides, comparison tools, and related resources.</p>

            <h2>1. Summary Overview</h2>
            <p className="text-sm text-gray-500">(For a quick read—details are below)</p>
            <ul>
              <li>We minimize personal data collection.</li>
              <li>We use privacy‑respecting analytics aggregation where possible.</li>
              <li>Affiliate links may include tracking parameters for commission attribution.</li>
              <li>Most non‑essential scripts are deferred until consent.</li>
            </ul>

            <h2>2. Data We Collect</h2>
            <h3>Voluntarily Provided</h3>
            <ul>
              <li>Contact form submissions (name, email, message).</li>
              <li>Newsletter sign‑ups (email address).</li>
              <li>Feedback or survey responses (contextual answers only).</li>
            </ul>
            <h3>Automatically Collected (Server / Client Logs)</h3>
            <ul>
              <li>IP (short‑lived in logs for security + rate limiting, then rotated / anonymized).</li>
              <li>User agent, device type, referrer.</li>
              <li>Pages viewed, time on page, interaction events (aggregated).</li>
            </ul>

            <h2>3. Cookies & Tracking Categories</h2>
            <p>We group storage & tracking into categories surfaced in the cookie banner:</p>
            <ul>
              <li><strong>Essential:</strong> Core site delivery, load balancing, security (cannot be disabled).</li>
              <li><strong>Analytics:</strong> Understand article performance & feature usefulness.</li>
              <li><strong>Preferences:</strong> Theme, dismissed banners, saved comparison filters.</li>
              <li><strong>Affiliate Attribution:</strong> Tracks outbound vendor click conversions (anonymized, no user profile building).</li>
            </ul>
            <p>We do not serve behavioral advertising or run retargeting pixels.</p>

            <h2>4. Analytics Approach</h2>
            <p>We may use privacy‑minded platforms or self‑hosted tooling to measure high‑level product interest (e.g., category popularity, feature comparison usage). IP addresses may be truncated; we do not merge analytics events with personal form submissions.</p>

            <h2>5. Affiliate Links</h2>
            <p>Clicking certain outbound links may append a vendor parameter (e.g., <code>?ref</code> or <code>utm_*</code>). This helps attribute referrals. We do not receive personal data about your downstream vendor account—only aggregated commission reporting.</p>

            <h2>6. Legal Bases (EEA / Similar Jurisdictions)</h2>
            <ul>
              <li>Legitimate interest: security logging, service integrity.</li>
              <li>Consent: non‑essential cookies (analytics, preferences, affiliate tags where required).</li>
              <li>Contract: responding to direct inquiries you initiate.</li>
              <li>Legal obligation: compliance with regulatory inquiries.</li>
            </ul>

            <h2>7. Data Retention</h2>
            <ul>
              <li>Error & access logs: typically ≤ 30–90 days (security review cycles).</li>
              <li>Newsletter emails: retained until you unsubscribe.</li>
              <li>Support / contact threads: up to 12 months for continuity.</li>
              <li>Aggregated analytics: indefinite in non‑identifiable form.</li>
            </ul>

            <h2>8. Information Sharing</h2>
            <ul>
              <li>Vendors assisting with infrastructure (hosting, email delivery) under confidentiality terms.</li>
              <li>Regulatory authorities where legally compelled.</li>
              <li>Potential acquirer in a merger or asset transfer (with continuity safeguards).</li>
            </ul>
            <p>We do <span className="font-semibold">not</span> sell personal data.</p>

            <h2>9. International Transfers</h2>
            <p>Data may be processed in multiple jurisdictions. Where required, we rely on standard contractual clauses or equivalent safeguards for cross‑border transfers.</p>

            <h2>10. Security Measures</h2>
            <ul>
              <li>Hardened hosting + TLS encryption.</li>
              <li>Principle of least privilege for internal tooling.</li>
              <li>Periodic dependency & vulnerability scanning.</li>
              <li>Content Security Policy (CSP) (progressively tightening).</li>
            </ul>

            <h2>11. Your Rights (Depending on Region)</h2>
            <ul>
              <li>Access / export your personal data.</li>
              <li>Rectify inaccuracies.</li>
              <li>Erase (where retention is not legally required).</li>
              <li>Restrict or object to certain processing.</li>
              <li>Withdraw consent for analytics / preferences at any time (use the cookie settings link or clear local storage).</li>
            </ul>

            <h2>12. Children</h2>
            <p>The site is not directed to children under 13 (or higher age as defined by local law). We do not knowingly collect their data. Requests for removal can be submitted via the contact channels below.</p>

            <h2>13. Automated Decision‑Making</h2>
            <p>We do not conduct automated decision‑making producing legal or similarly significant effects.</p>

            <h2>14. Updates to This Policy</h2>
            <p>Material changes will be timestamped at the top of this page. Continued use after publication constitutes acceptance.</p>

            <h2>15. Contact</h2>
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 not-prose text-sm">
              <p className="text-gray-800"><strong>Email:</strong> privacy@techtoolkithub.com<br />
              <strong>Contact:</strong> <Link href="/contact" className="text-indigo-600 hover:text-indigo-700">Contact Form</Link></p>
            </div>

            <h2>16. Quick Opt-Out Guidance</h2>
            <p>You may clear site data in your browser settings to remove stored preferences. After that, the cookie banner will reappear allowing you to reapply consent choices.</p>

            <div className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded-lg not-prose text-xs leading-relaxed text-slate-600">
              <p><strong>Note:</strong> This document is provided for transparency and does not create contractual obligations beyond those outlined in the Terms &amp; Conditions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
