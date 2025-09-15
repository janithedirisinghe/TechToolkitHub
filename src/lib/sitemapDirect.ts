import { revalidatePath } from 'next/cache'

/**
 * Server-side sitemap refresh function that can be called directly from API routes
 * This doesn't require authentication as it's meant for internal use
 */
export function refreshSitemapDirect(): void {
  try {
    // Force regenerate sitemap
    revalidatePath('/sitemap.xml')
    
    // Also revalidate key pages that list articles
    revalidatePath('/')
    revalidatePath('/articles')
    
    console.log('✅ Sitemap refreshed directly')
  } catch (error) {
    console.error('❌ Error refreshing sitemap directly:', error)
    throw error
  }
}

/**
 * Async wrapper for the direct refresh that returns a promise
 */
export async function refreshSitemapDirectAsync(): Promise<{ success: boolean; message: string }> {
  try {
    refreshSitemapDirect()
    return {
      success: true,
      message: 'Sitemap refreshed successfully'
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to refresh sitemap'
    }
  }
}