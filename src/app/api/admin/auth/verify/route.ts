import { NextRequest, NextResponse } from 'next/server';
import { authenticateAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateAdmin(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user
    });

  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
