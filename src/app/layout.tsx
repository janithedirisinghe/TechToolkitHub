import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    default: "Sri Lanka How - Your Ultimate Guide to Sri Lanka",
    template: "%s | Sri Lanka How"
  },
  description: "Discover Sri Lanka with our comprehensive guides, travel tips, cultural insights, and lifestyle advice. Your ultimate how-to resource for everything Sri Lanka.",
  keywords: ["Sri Lanka", "travel guide", "tourism", "culture", "lifestyle", "how-to", "travel tips"],
  authors: [{ name: "Sri Lanka How" }],
  creator: "Sri Lanka How",
  publisher: "Sri Lanka How",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://srilankahow.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://srilankahow.com",
    siteName: "Sri Lanka How",
    title: "Sri Lanka How - Your Ultimate Guide to Sri Lanka",
    description: "Discover Sri Lanka with our comprehensive guides, travel tips, cultural insights, and lifestyle advice.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sri Lanka How - Your Ultimate Guide to Sri Lanka",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Lanka How - Your Ultimate Guide to Sri Lanka",
    description: "Discover Sri Lanka with our comprehensive guides, travel tips, cultural insights, and lifestyle advice.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${openSans.variable} font-sans antialiased`}
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
