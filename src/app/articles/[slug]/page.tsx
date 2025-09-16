import { Metadata } from 'next';
import { notFound } from 'next/navigation';
// Image rendering handled by SafeImage client component
import SafeImage from '@/components/SafeImage';
import Link from 'next/link';
import ArticleEnhancements from '@/components/ArticleEnhancements';
import { getArticleFullContent } from '@/lib/data';
import { getBaseUrl } from '@/lib/url';
import type { IArticle } from '@/models/Article';
import type { ICategory } from '@/models/Category';
import type { Article } from '@/types/article';

// Force dynamic rendering for Vercel
export const dynamic = 'force-dynamic';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = params;
  try {
  const articleDoc = await getArticleFullContent(slug) as (IArticle & { category?: ICategory; author?: { name?: string } });
    if (!articleDoc) {
      return {
        title: 'Article Not Found - Sri Lanka How',
        description: 'The requested article could not be found.'
      };
    }
    const base = getBaseUrl();
    const canonical = `${base}/articles/${articleDoc.slug}`;
    const image = articleDoc.featuredImage || '/default-article-image.jpg';
    return {
      title: `${articleDoc.title} - Sri Lanka How`,
      description: articleDoc.excerpt || articleDoc.metaDescription || `Read ${articleDoc.title} on Sri Lanka How - Your ultimate guide to Sri Lanka.`,
      keywords: articleDoc.tags?.join(', ') || articleDoc.category?.name,
      authors: [{ name: articleDoc.author?.name || 'Sri Lanka How' }],
      openGraph: {
        title: articleDoc.title,
        description: articleDoc.excerpt || articleDoc.metaDescription,
        url: canonical,
        siteName: 'Sri Lanka How',
        images: [{ url: image, width: 1200, height: 630, alt: articleDoc.title }],
        locale: 'en_US',
        type: 'article',
        publishedTime: articleDoc.publishedAt as unknown as string,
        modifiedTime: (articleDoc as unknown as { updatedAt?: string }).updatedAt,
        authors: [articleDoc.author?.name || 'Sri Lanka How'],
        tags: articleDoc.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: articleDoc.title,
        description: articleDoc.excerpt || articleDoc.metaDescription,
        images: [image],
      },
      alternates: { canonical },
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
  } catch (err) {
    console.error('[DEBUG] generateMetadata error:', err);
    return {
      title: 'Sri Lanka How - Your Ultimate Guide to Sri Lanka',
      description: 'Discover Sri Lanka with our comprehensive guides, travel tips, cultural insights, and lifestyle advice.'
    };
  }
}

// Fetch article data
async function getArticle(slug: string): Promise<Article | null> {
  try {
    const doc = await getArticleFullContent(slug);
    if (!doc) return null;
    return doc as unknown as Article;
  } catch (err) {
    console.error('[DEBUG] getArticle error:', err);
    return null;
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = params;
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
            {/* <div className="flex items-center gap-2">
              <span>{article.views || 0} views</span>
            </div> */}
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
            ...(article.category.slug === 'software-reviews' ? {
              "review": {
                "@type": "Review",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "4.5",
                  "bestRating": "5"
                },
                "author": {
                  "@type": "Person",
                  "name": article.author?.name || "TechToolkitHub Team"
                },
                "itemReviewed": {
                  "@type": "SoftwareApplication",
                  "name": article.title.replace(/^(Review|Test|Analysis):/i, '').trim(),
                  "applicationCategory": "BusinessApplication",
                  "operatingSystem": "Windows, macOS, Linux",
                  "description": article.excerpt || article.metaDescription
                }
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.5",
                "reviewCount": 1,
                "itemReviewed": {
                  "@type": "SoftwareApplication",
                  "name": article.title.replace(/^(Review|Test|Analysis):/i, '').trim(),
                  "applicationCategory": "BusinessApplication",
                  "operatingSystem": "Windows, macOS, Linux",
                  "description": article.excerpt || article.metaDescription
                }
              }
            } : {})
          })
        }}
      />
    </div>
  );
}
