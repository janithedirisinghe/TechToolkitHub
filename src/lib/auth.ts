import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';

// Get JWT_SECRET with fallback
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-for-development';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

interface TokenPayload extends JwtPayload {
  userId: string;
}

export async function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    
    await connectDB();
    const admin = await Admin.findById(decoded.userId).select('-password');
    
    if (!admin || !admin.isActive) {
      return null;
    }

    return {
      id: admin._id.toString(),
      email: admin.email,
      role: admin.role,
      name: admin.name
    };
  } catch {
    return null;
  }
}

export async function authenticateAdmin(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    return await verifyToken(token);
  } catch {
    return null;
  }
}

export function generateToken(userId: string) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}
