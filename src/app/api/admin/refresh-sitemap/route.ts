import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { authenticateAdmin } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Authenticate admin user
    const user = await authenticateAdmin(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Force regenerate sitemap
    revalidatePath('/sitemap.xml')
    
    // Also revalidate key pages
    revalidatePath('/')
    revalidatePath('/articles')
    
    console.log('✅ Sitemap manually refreshed by admin:', user.email)
    
    return NextResponse.json({ 
      success: true,
      message: 'Sitemap refreshed successfully',
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('❌ Error refreshing sitemap:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to refresh sitemap' },
      { status: 500 }
    )
  }
}

// Allow GET requests to show status
export async function GET(request: NextRequest) {
  try {
    const user = await authenticateAdmin(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ 
      message: 'Sitemap refresh endpoint',
      usage: 'POST to refresh sitemap',
      user: user.email
    })
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}