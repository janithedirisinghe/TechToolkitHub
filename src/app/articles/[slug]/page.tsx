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
        title: 'Article Not Found',
        description: 'The requested article could not be found.'
      };
    }
    const base = getBaseUrl();
    const canonical = `${base}/articles/${articleDoc.slug}`;
    const image = articleDoc.featuredImage || '/default-article-image.jpg';
    return {
      title: `${articleDoc.title} -  `,
      description: articleDoc.excerpt || articleDoc.metaDescription || `Read ${articleDoc.title} on   - Your ultimate guide to Sri Lanka.`,
      keywords: articleDoc.tags?.join(', ') || articleDoc.category?.name,
      authors: [{ name: articleDoc.author?.name || ' ' }],
      openGraph: {
        title: articleDoc.title,
        description: articleDoc.excerpt || articleDoc.metaDescription,
        url: canonical,
        siteName: ' ',
        images: [{ url: image, width: 1200, height: 630, alt: articleDoc.title }],
        locale: 'en_US',
        type: 'article',
        publishedTime: articleDoc.publishedAt as unknown as string,
        modifiedTime: (articleDoc as unknown as { updatedAt?: string }).updatedAt,
        authors: [articleDoc.author?.name || ' '],
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
      title: 'Your Ultimate Guide Tech Tools',
      description: 'Discover the best software tools with our comprehensive reviews, tech guides, and expert insights. Your ultimate resource for software discovery and tech solutions.'
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

        {/* Article Content - Medium-inspired styling */}
        {article.content ? (
          <div className="overflow-x-auto">
            <div
              id="article-content"
              className="prose prose-xl max-w-none text-gray-900 antialiased
                prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight prose-headings:scroll-mt-24
                prose-h1:text-4xl prose-h1:leading-tight prose-h1:mt-12 prose-h1:mb-8 prose-h1:font-extrabold prose-h1:text-gray-900 prose-h1:tracking-tight
                prose-h2:text-3xl prose-h2:leading-snug prose-h2:mt-12 prose-h2:mb-6 prose-h2:font-bold prose-h2:text-gray-900
                prose-h3:text-2xl prose-h3:leading-snug prose-h3:mt-10 prose-h3:mb-5 prose-h3:font-semibold prose-h3:text-gray-900
                prose-h4:text-xl prose-h4:leading-snug prose-h4:mt-8 prose-h4:mb-4 prose-h4:font-semibold prose-h4:text-gray-800
                prose-h5:text-lg prose-h5:leading-snug prose-h5:mt-6 prose-h5:mb-3 prose-h5:font-medium prose-h5:text-gray-800
                prose-h6:text-base prose-h6:leading-snug prose-h6:mt-6 prose-h6:mb-3 prose-h6:font-medium prose-h6:text-gray-700
                prose-p:text-xl prose-p:leading-relaxed prose-p:mb-8 prose-p:text-gray-800 prose-p:font-normal
                prose-ul:my-8 prose-ul:space-y-3 prose-ul:text-xl prose-ul:leading-relaxed prose-ul:text-gray-800
                prose-ol:my-8 prose-ol:space-y-3 prose-ol:text-xl prose-ol:leading-relaxed prose-ol:text-gray-800 prose-ol:list-decimal
                prose-li:text-xl prose-li:leading-relaxed prose-li:text-gray-800 prose-li:my-2 prose-li:pl-2
                prose-strong:font-semibold prose-strong:text-gray-900
                prose-em:italic prose-em:text-gray-800 prose-em:font-medium
                prose-a:text-gray-900 prose-a:underline prose-a:decoration-2 prose-a:underline-offset-2 prose-a:decoration-gray-300 
                hover:prose-a:decoration-gray-500 prose-a:transition-all prose-a:duration-200
                prose-img:w-full prose-img:h-auto prose-img:my-12 prose-img:rounded-none prose-img:shadow-none
                prose-pre:bg-gray-50 prose-pre:text-gray-800 prose-pre:rounded-lg prose-pre:p-6 prose-pre:my-10 prose-pre:overflow-x-auto prose-pre:border prose-pre:border-gray-200
                prose-code:bg-gray-100 prose-code:text-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-lg prose-code:font-mono
                prose-code:before:content-[''] prose-code:after:content-['']
                prose-pre:prose-code:bg-transparent prose-pre:prose-code:text-gray-800 prose-pre:prose-code:px-0 prose-pre:prose-code:py-0
                prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-8 prose-blockquote:pr-0 prose-blockquote:py-4 
                prose-blockquote:my-10 prose-blockquote:bg-transparent prose-blockquote:text-xl prose-blockquote:leading-relaxed 
                prose-blockquote:text-gray-700 prose-blockquote:italic prose-blockquote:font-medium prose-blockquote:not-italic
                prose-table:w-full prose-table:my-10 prose-table:border-collapse prose-table:bg-white prose-table:text-base
                prose-th:px-6 prose-th:py-4 prose-th:text-left prose-th:font-semibold prose-th:text-gray-900 prose-th:border-b-2 prose-th:border-gray-200 prose-th:bg-gray-50
                prose-td:px-6 prose-td:py-4 prose-td:text-gray-700 prose-td:border-b prose-td:border-gray-100 prose-td:text-base prose-td:leading-relaxed
                prose-tbody:divide-y prose-tbody:divide-gray-100
                prose-hr:border-gray-200 prose-hr:my-12 prose-hr:border-t-1
                prose-figure:my-12 prose-figcaption:text-center prose-figcaption:text-base prose-figcaption:text-gray-600 prose-figcaption:mt-4 prose-figcaption:italic
                first:prose-p:text-2xl first:prose-p:leading-normal first:prose-p:text-gray-700 first:prose-p:font-normal first:prose-p:mb-10
                selection:bg-yellow-200"
              style={{
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
              }}
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
              "name": article.author?.name || " "
            },
            "publisher": {
              "@type": "Organization",
              "name": " ",
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
              "about": {
                "@type": "SoftwareApplication",
                "name": article.title.replace(/^(Review|Test|Analysis):/i, '').trim(),
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Windows, macOS, Linux",
                "description": article.excerpt || article.metaDescription
              },
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
                }
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.5",
                "reviewCount": 1
              }
            } : {})
          })
        }}
      />
    </div>
  );
}
