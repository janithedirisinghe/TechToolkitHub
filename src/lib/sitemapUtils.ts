/**
 * Simple sitemap utilities without environment dependencies
 */

/**
 * Direct sitemap refresh function that can be called from anywhere
 * This bypasses the token system and directly calls Next.js revalidation
 */
export async function directSitemapRefresh(): Promise<{ success: boolean; message: string }> {
  try {
    // Get the admin token if we're in a browser environment
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    
    // Add authorization header if token exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    
    // Call our internal admin API
    const response = await fetch('/api/admin/refresh-sitemap', {
      method: 'POST',
      headers,
      credentials: 'include', // Include authentication cookies
    })

    const data = await response.json()

    if (response.ok && data.success) {
      return {
        success: true,
        message: 'Sitemap refreshed successfully'
      }
    } else {
      return {
        success: false,
        message: data.error || 'Failed to refresh sitemap'
      }
    }
  } catch (error) {
    console.error('Error refreshing sitemap:', error)
    return {
      success: false,
      message: 'Network error while refreshing sitemap'
    }
  }
}

/**
 * Add this function to your article creation/update forms
 * Call it after successful article operations
 */
export async function refreshSitemapAfterArticle(articleTitle: string): Promise<void> {
  try {
    const result = await directSitemapRefresh()
    
    if (result.success) {
      console.log(`✅ Sitemap updated after article operation: ${articleTitle}`)
    } else {
      console.warn(`⚠️ Sitemap refresh failed for article: ${articleTitle} - ${result.message}`)
    }
  } catch (error) {
    console.error(`❌ Error refreshing sitemap for article: ${articleTitle}`, error)
  }
}