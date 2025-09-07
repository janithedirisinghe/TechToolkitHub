import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    console.log('Login API called');
    
    await connectDB();
    console.log('Connected to database');
    
    const { email, password } = await request.json();
    console.log('Received login request for email:', email);

    if (!email || !password) {
      console.log('Missing email or password');
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find admin by email
    console.log('Finding admin by email:', email.toLowerCase());
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    
    if (!admin) {
      console.log('Admin not found');
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    console.log('Admin found:', admin.email);

    // Check if admin is active
    if (!admin.isActive) {
      console.log('Admin account is disabled');
      return NextResponse.json(
        { error: 'Account is disabled' },
        { status: 401 }
      );
    }

    // Verify password
    console.log('Verifying password');
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    
    if (!isPasswordValid) {
      console.log('Invalid password');
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    console.log('Password valid, updating last login');
    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    console.log('Generating token');
    // Generate JWT token
    const token = generateToken(admin._id.toString());

    console.log('Login successful');
    return NextResponse.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
