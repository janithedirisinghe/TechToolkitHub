/**
 * Utility functions for sitemap management
 */

/**
 * Revalidates the sitemap after new content is created
 * Call this function after creating, updating, or deleting articles/categories
 */
export async function revalidateSitemap(): Promise<boolean> {
  try {
    const baseUrl ='https://www.techtoolkithub.com/'
    const revalidationToken = process.env.REVALIDATION_TOKEN
    
    if (!revalidationToken) {
      console.warn('REVALIDATION_TOKEN not set, skipping sitemap revalidation')
      return false
    }

    const response = await fetch(`${baseUrl}/api/revalidate/sitemap`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${revalidationToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      console.log('Sitemap revalidated successfully')
      return true
    } else {
      console.error('Failed to revalidate sitemap:', response.statusText)
      return false
    }
  } catch (error) {
    console.error('Error revalidating sitemap:', error)
    return false
  }
}

/**
 * Generates a manual sitemap refresh
 * Useful for development or testing purposes
 */
export async function manualSitemapRefresh(): Promise<void> {
  try {
    // Force a rebuild of the sitemap by calling the sitemap route
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://srilankahow.com'
    await fetch(`${baseUrl}/sitemap.xml`, { 
      cache: 'no-store',
      next: { revalidate: 0 }
    })
    console.log('Sitemap manually refreshed')
  } catch (error) {
    console.error('Error manually refreshing sitemap:', error)
  }
}