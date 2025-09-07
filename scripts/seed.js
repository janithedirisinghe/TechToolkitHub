#!/usr/bin/env node

// Load environment variables
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Import and run seeder
import seedDatabase from '../src/lib/seedDatabase.js';

seedDatabase();
