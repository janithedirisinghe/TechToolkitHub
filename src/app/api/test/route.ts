import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      message: 'Test API is working',
      timestamp: new Date().toISOString(),
      env: {
        hasMongoUri: !!process.env.MONGODB_URI,
        hasJwtSecret: !!process.env.JWT_SECRET,
        mongoUri: process.env.MONGODB_URI ? 'SET' : 'NOT_SET',
        jwtSecret: process.env.JWT_SECRET ? 'SET' : 'NOT_SET',
        nodeEnv: process.env.NODE_ENV,
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Test API failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
