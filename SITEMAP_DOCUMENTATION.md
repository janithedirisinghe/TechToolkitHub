# SEO Files: robots.txt and sitemap.xml

This document explains the implementation of the robust `robots.txt` and dynamic `sitemap.xml` files for the SriLankaHow website.

## 🤖 robots.txt (src/app/robots.ts)

### Features
- **Dynamic Base URL**: Uses environment variable `NEXT_PUBLIC_BASE_URL` with fallback
- **Multiple User-Agent Rules**: Specific rules for different crawlers
- **AI Crawler Blocking**: Blocks AI training crawlers (GPTBot, Claude-Web, etc.)
- **SEO-Friendly**: Allows search engines while protecting sensitive routes

### Configuration
The robots.txt blocks:
- `/api/` - API routes
- `/admin/` - Admin interface
- `/_next/` - Next.js internal files
- `/private/` - Private content
- `/.well-known/` - System files
- `/test/` - Test routes

### Environment Variables
```env
NEXT_PUBLIC_BASE_URL=https://srilankahow.com
```

## 🗺️ sitemap.xml (src/app/sitemap.ts)

### Features
- **Dynamic Content**: Automatically includes all published articles and active categories
- **Database Integration**: Fetches real data from MongoDB
- **Fallback System**: Uses static sitemap if database connection fails
- **SEO Optimized**: Proper priorities and change frequencies
- **Auto-Updates**: Revalidates when content is created/updated/deleted

### URL Structure
The sitemap includes:

1. **Static Pages** (Priority: 0.3-1.0)
   - Homepage: `/` (priority: 1.0, daily updates)
   - Category pages: `/travel`, `/culture`, etc. (priority: 0.8, weekly)
   - Utility pages: `/about`, `/contact` (priority: 0.7-0.8, monthly)
   - Legal pages: `/privacy`, `/terms` (priority: 0.3, yearly)

2. **Dynamic Articles** (Priority: 0.7)
   - Format: `/articles/{slug}`
   - Uses actual publication/update dates
   - Only includes published articles
   - Monthly change frequency

3. **Category Pages** (Priority: 0.6)
   - Format: `/{category-slug}`
   - Only includes active categories
   - Weekly change frequency

### Automatic Updates

The sitemap automatically updates when:
- New articles are published
- Articles are updated (if published)
- Articles are deleted (if published)
- Categories are created/updated

## 🔄 Sitemap Revalidation System

### Components

1. **Revalidation API** (`src/app/api/revalidate/sitemap/route.ts`)
   - Secured endpoint for sitemap updates
   - Requires `REVALIDATION_TOKEN` for security
   - Revalidates sitemap and key pages

2. **Utility Functions** (`src/lib/sitemap.ts`)
   - `revalidateSitemap()`: Programmatic sitemap updates
   - `manualSitemapRefresh()`: Development/testing helper

3. **Integration Points**
   - Article creation API (`src/app/api/admin/articles/route.ts`)
   - Article update API (`src/app/api/admin/articles/[id]/route.ts`)
   - Article deletion API (same file)

### Environment Variables
```env
# Required for sitemap functionality
NEXT_PUBLIC_BASE_URL=https://srilankahow.com
MONGODB_URI=mongodb://localhost:27017/srilankahow

# Required for automatic revalidation
REVALIDATION_TOKEN=your-secure-revalidation-token-here
```

## 🛠️ Setup Instructions

1. **Environment Configuration**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual values
   ```

2. **Environment Variables**
   ```env
   NEXT_PUBLIC_BASE_URL=https://yourdomain.com
   MONGODB_URI=your-mongodb-connection-string
   REVALIDATION_TOKEN=generate-a-secure-random-token
   ```

3. **Deployment**
   - The files are generated at build time
   - Sitemap updates automatically during content management
   - No manual intervention required

## 📊 Testing

### Build Test
```bash
npm run build
```
This will generate and validate both files.

### Manual Sitemap Refresh
```javascript
import { manualSitemapRefresh } from '@/lib/sitemap'
await manualSitemapRefresh()
```

### API Testing
```bash
# Test revalidation endpoint
curl -X POST https://yourdomain.com/api/revalidate/sitemap \
  -H "Authorization: Bearer your-token" \
  -H "Content-Type: application/json"
```

## 🔍 Monitoring

### Check Sitemap Status
- Visit: `https://yourdomain.com/sitemap.xml`
- Should include all published articles and active categories
- Check last modification dates

### Check robots.txt
- Visit: `https://yourdomain.com/robots.txt`
- Verify correct domain and rules

### Search Console Integration
- Submit sitemap to Google Search Console
- Monitor indexing status and errors
- URL: `https://yourdomain.com/sitemap.xml`

## 🔒 Security Features

1. **AI Crawler Protection**: Blocks training data collection
2. **Route Protection**: Hides admin and API routes
3. **Token-Based Revalidation**: Secure sitemap updates
4. **Environment-Based Configuration**: Secure secrets management

## 🚀 Performance

- **Build-Time Generation**: Static files for optimal performance
- **Efficient Queries**: Database queries optimized for sitemap generation
- **Fallback System**: Continues working even if database is down
- **Selective Revalidation**: Only updates when content changes

## 📝 Best Practices

1. **Regular Monitoring**: Check sitemap in Search Console
2. **Token Security**: Use strong, unique revalidation tokens
3. **Environment Management**: Keep production URLs updated
4. **Database Performance**: Monitor sitemap generation during high content creation
5. **Testing**: Verify sitemap after content updates

This implementation ensures your sitemap stays current automatically while providing robust SEO benefits and security.