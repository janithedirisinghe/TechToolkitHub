import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Article Not Found - Sri Lanka How',
  description: 'The article you are looking for could not be found. Browse our collection of Sri Lanka travel guides and articles.',
};

export default function ArticleNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="text-6xl mb-6">🔍</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Article Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The article you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Go to Homepage
          </Link>
          <Link
            href="/articles"
            className="block w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Browse All Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
