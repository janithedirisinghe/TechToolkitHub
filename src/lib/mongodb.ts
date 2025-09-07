import mongoose from 'mongoose';
import { config } from 'dotenv';
import { join } from 'path';

// Load environment variables
config({ path: join(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB() {
  console.log('Attempting to connect to MongoDB...');
  console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
  
  if (cached.conn) {
    console.log('Using cached connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log('Creating new MongoDB connection...');
    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }
  
  try {
    cached.conn = await cached.promise;
    console.log('MongoDB connected successfully');
  } catch (e) {
    console.error('MongoDB connection failed:', e);
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
