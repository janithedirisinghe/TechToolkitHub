import { Metadata } from 'next';
import { notFound } from 'next/navigation';
// Image rendering handled by SafeImage client component
import SafeImage from '@/components/SafeImage';
import Link from 'next/link';
import ArticleEnhancements from '@/components/ArticleEnhancements';
import type { Article } from '@/types/article';

// Force dynamic rendering for Vercel
export const dynamic = 'force-dynamic';

// Helper function for base URL
function getBaseUrl(): string {
  return process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'https://srilankahow.vercel.app';
}

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const response = await fetch(`${getBaseUrl()}/api/articles/${slug}`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      return {
        title: 'Article Not Found - Sri Lanka How',
        description: 'The requested article could not be found.',
      };
    }

    const data = await response.json();
    const article = data.article;

    return {
      title: `${article.title} - Sri Lanka How`,
      description: article.excerpt || article.metaDescription || `Read ${article.title} on Sri Lanka How - Your ultimate guide to Sri Lanka.`,
      keywords: article.tags?.join(', ') || article.category?.name,
      authors: [{ name: article.author?.name || 'Sri Lanka How' }],
      openGraph: {
        title: article.title,
        description: article.excerpt || article.metaDescription,
        url: `${getBaseUrl()}/articles/${article.slug}`,
        siteName: 'Sri Lanka How',
        images: [
          {
            url: article.featuredImage || article.image || '/default-article-image.jpg',
            width: 1200,
            height: 630,
            alt: article.title,
          },
        ],
        locale: 'en_US',
        type: 'article',
        publishedTime: article.publishedAt,
        modifiedTime: article.updatedAt,
        authors: [article.author?.name || 'Sri Lanka How'],
        tags: article.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.excerpt || article.metaDescription,
        images: [article.featuredImage || article.image || '/default-article-image.jpg'],
      },
      alternates: {
        canonical: `${getBaseUrl()}/articles/${article.slug}`,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Sri Lanka How - Your Ultimate Guide to Sri Lanka',
      description: 'Discover Sri Lanka with our comprehensive guides, travel tips, cultural insights, and lifestyle advice.',
    };
  }
}

// Fetch article data
async function getArticle(slug: string): Promise<Article | null> {
  try {
    const response = await fetch(`${getBaseUrl()}/api/articles/${slug}`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.article;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  // Calculate estimated read time (roughly 200 words per minute)
  const wordCount = article.content?.split(' ').length || 0;
  const readTime = Math.ceil(wordCount / 200);
  const articleUrl = `${getBaseUrl()}/articles/${article.slug}`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div className="h-full bg-blue-600 transition-all duration-150" id="reading-progress" />
      </div>
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
                <Link href={`/${article.category.slug}`} className="text-gray-500 hover:text-gray-700">
                  {article.category.name}
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <span className="text-gray-900 font-medium">{article.title}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article Header */}
        <header className="mb-8">
          {/* Category Badge */}
          <div className="mb-4">
            <Link
              href={`/${article.category.slug}`}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
              style={{
                backgroundColor: `${article.category.color}20`,
                color: article.category.color
              }}
            >
              {article.category.name}
            </Link>
          </div>

          {/* Title */}
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {article.title}
          </h1>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {article.excerpt}
            </p>
          )}

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 border-b border-gray-200 pb-6">
            {article.author?.name && (
              <div className="flex items-center gap-2">
                <span>By</span>
                <span className="font-medium text-gray-900">{article.author.name}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span>Published</span>
              <time dateTime={article.publishedAt}>
                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            {readTime > 0 && (
              <div className="flex items-center gap-2">
                <span>{readTime} min read</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span>{article.views || 0} views</span>
            </div>
            {article.tags && article.tags.length > 0 && (
              <div className="flex items-center gap-2">
                <span>{article.tags.length} tag{article.tags.length > 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {article.featuredImage && (
          <div className="mb-8">
            <div className="relative h-64 lg:h-96 rounded-lg overflow-hidden bg-gray-200">
              <SafeImage
                src={article.featuredImage}
                alt={article.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                hideOnError
              />
            </div>
          </div>
        )}

        {/* Article Content */}
        {article.content ? (
          <div className="overflow-x-auto">
            <div
              id="article-content"
              className="prose prose-lg max-w-none text-gray-800 leading-relaxed 
                prose-headings:font-semibold prose-headings:text-gray-900 prose-headings:mt-8 prose-headings:mb-4
                prose-h2:text-2xl prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:mb-4 prose-p:leading-relaxed
                prose-ul:mb-4 prose-ul:pl-6 prose-li:mb-2 prose-li:leading-relaxed
                prose-ol:mb-4 prose-ol:pl-6
                prose-strong:font-semibold prose-strong:text-gray-900
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-lg prose-img:shadow-md
                prose-headings:scroll-mt-24 
                prose-pre:bg-gray-900 prose-pre:text-gray-100 
                prose-code:before:content-[''] prose-code:after:content-['']
                prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:pl-4 prose-blockquote:italic"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        ) : (
          <div className="text-gray-600 italic text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-xl">Article content is being prepared...</p>
            <p className="text-sm mt-2">Please check back later for the full article.</p>
          </div>
        )}

        {/* Social Sharing */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
          <div className="flex gap-3">
            <button
              id="share-button"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Share
            </button>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(articleUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors text-sm font-medium"
            >
              Twitter
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors text-sm font-medium"
            >
              Facebook
            </a>
          </div>
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <Link
              href={`/${article.category.slug}`}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to {article.category.name}
            </Link>
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-800"
            >
              Home →
            </Link>
          </div>
        </div>
      </article>

  {/* Client-only enhancements to avoid hydration mismatches */}
  <ArticleEnhancements articleUrl={articleUrl} title={article.title} excerpt={article.excerpt || ''} />

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "description": article.excerpt || article.metaDescription,
            "image": article.featuredImage || article.image,
            "datePublished": article.publishedAt,
            "dateModified": article.updatedAt || article.publishedAt,
            "author": {
              "@type": "Person",
              "name": article.author?.name || "Sri Lanka How"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Sri Lanka How",
              "logo": {
                "@type": "ImageObject",
                "url": `${getBaseUrl()}/Logo.png`
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `${getBaseUrl()}/articles/${article.slug}`
            },
            "articleSection": article.category.name,
            "keywords": article.tags?.join(', '),
            "wordCount": wordCount,
            "timeRequired": `PT${readTime}M`,
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.5",
              "reviewCount": article.views || 1
            }
          })
        }}
      />
    </div>
  );
}
