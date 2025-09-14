import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const expectedToken = process.env.REVALIDATION_TOKEN
    
    // Basic security: check for a secret token
    if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Revalidate the sitemap
    revalidatePath('/sitemap.xml')
    
    // Also revalidate key pages that might need updates
    revalidatePath('/')
    revalidatePath('/articles')
    
    return NextResponse.json({ 
      message: 'Sitemap revalidated successfully',
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Error revalidating sitemap:', error)
    return NextResponse.json(
      { error: 'Failed to revalidate sitemap' },
      { status: 500 }
    )
  }
}

// Also allow GET requests for manual testing
export async function GET() {
  return NextResponse.json({ 
    message: 'Sitemap revalidation endpoint',
    usage: 'POST with Authorization: Bearer <token>'
  })
}