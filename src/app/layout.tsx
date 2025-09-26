import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
// Conditional hiding of site chrome for admin handled by a client component
import ClientChrome from '@/components/ClientChrome';
import CookieConsentBanner from '@/components/CookieConsentBanner';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TechToolkitHub - In-Depth Software Reviews & Tech Guides",
    template: "%s | TechToolkitHub"
  },
  description: "Discover the best software tools with our comprehensive reviews, tech guides, and expert insights. Your ultimate resource for software discovery and tech solutions.",
  keywords: ["software reviews", "tech tools", "productivity software", "development tools", "business software", "app reviews", "software comparison"],
  authors: [{ name: "TechToolkitHub" }],
  creator: "TechToolkitHub",
  publisher: "TechToolkitHub",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://techtoolkithub.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://techtoolkithub.com",
    siteName: "TechToolkitHub",
    title: "TechToolkitHub - In-Depth Software Reviews & Tech Guides",
    description: "Discover the best software tools with our comprehensive reviews, tech guides, and expert insights.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TechToolkitHub - In-Depth Software Reviews & Tech Guides",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/Logo.png", type: "image/png", sizes: "32x32" },
      { url: "/Logo.png", type: "image/png", sizes: "16x16" },
      { url: "/Logo.png", type: "image/png", sizes: "192x192" },
      { url: "/Logo.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/Logo.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechToolkitHub - In-Depth Software Reviews & Tech Guides",
    description: "Discover the best software tools with our comprehensive reviews, tech guides, and expert insights.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${openSans.variable} font-sans antialiased`}>
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-PET4F3LJYN" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PET4F3LJYN');
          `}
        </Script>

        {/* Organization Structured Data for Logo */}
        <Script id="organization-schema" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "TechToolkitHub",
              "url": "https://techtoolkithub.com",
              "logo": "https://techtoolkithub.com/Logo.png",
              "sameAs": [
                "https://techtoolkithub.com"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "url": "https://techtoolkithub.com/contact"
              }
            }
          `}
        </Script>
        
        <ClientChrome>
          {children}
        </ClientChrome>
        <CookieConsentBanner />
      </body>
    </html>
  );
}
