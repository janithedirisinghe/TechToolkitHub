import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('[DEBUG] Test API - Environment check:');
    console.log('[DEBUG] NODE_ENV:', process.env.NODE_ENV);
    console.log('[DEBUG] MONGODB_URI exists:', !!process.env.MONGODB_URI);
    console.log('[DEBUG] MONGODB_URI length:', process.env.MONGODB_URI?.length || 0);
    console.log('[DEBUG] JWT_SECRET exists:', !!process.env.JWT_SECRET);
    console.log('[DEBUG] VERCEL_URL:', process.env.VERCEL_URL);
    console.log('[DEBUG] All env vars:', Object.keys(process.env).filter(key => 
      key.includes('MONGODB') || key.includes('JWT') || key.includes('VERCEL')
    ));

    return NextResponse.json({
      success: true,
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        MONGODB_URI_EXISTS: !!process.env.MONGODB_URI,
        MONGODB_URI_LENGTH: process.env.MONGODB_URI?.length || 0,
        JWT_SECRET_EXISTS: !!process.env.JWT_SECRET,
        VERCEL_URL: process.env.VERCEL_URL,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('[DEBUG] Test API error:', error);
    return NextResponse.json(
      { 
        error: 'Test failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}