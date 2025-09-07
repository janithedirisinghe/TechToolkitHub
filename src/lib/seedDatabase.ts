import { config } from 'dotenv';
import { join } from 'path';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';
import Category from '@/models/Category';
import Article from '@/models/Article';

// Load environment variables
config({ path: join(process.cwd(), '.env.local') });

console.log('Environment loaded. MONGODB_URI:', process.env.MONGODB_URI ? 'Found' : 'Not found');

async function seedDatabase() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Clear existing data
    await Admin.deleteMany({});
    await Category.deleteMany({});
    await Article.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    const admin = await Admin.create({
      email: 'admin@srilankahow.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'super_admin',
      isActive: true
    });
    console.log('Created admin user');

    // Create categories
    const categories = await Category.create([
      {
        name: 'Travel',
        slug: 'travel',
        description: 'Travel guides, destinations, and tips for exploring Sri Lanka',
        color: '#059669',
        order: 1,
        isActive: true,
        articleCount: 0
      },
      {
        name: 'Guides',
        slug: 'guides',
        description: 'Practical guides and how-to articles for living in Sri Lanka',
        color: '#7C3AED',
        order: 2,
        isActive: true,
        articleCount: 0
      },
      {
        name: 'Culture',
        slug: 'culture',
        description: 'Sri Lankan culture, traditions, and local insights',
        color: '#DC2626',
        order: 3,
        isActive: true,
        articleCount: 0
      },
      {
        name: 'Lifestyle',
        slug: 'lifestyle',
        description: 'Living in Sri Lanka, expat life, and lifestyle tips',
        color: '#EA580C',
        order: 4,
        isActive: true,
        articleCount: 0
      }
    ]);
    console.log('Created categories');

    // Create sample articles
    const articles = [
      {
        title: 'Complete Guide to Sigiriya Rock Fortress',
        slug: 'complete-guide-to-sigiriya-rock-fortress',
        excerpt: 'Discover everything you need to know about visiting Sigiriya Rock Fortress, one of Sri Lanka\'s most iconic archaeological sites and UNESCO World Heritage location.',
        content: `# Complete Guide to Sigiriya Rock Fortress

Sigiriya, also known as the Lion Rock, is one of Sri Lanka's most spectacular archaeological sites and a UNESCO World Heritage location. This ancient rock fortress rises 200 meters above the surrounding jungle and offers visitors a glimpse into the island's rich history.

## History of Sigiriya

Built in the 5th century AD by King Kashyapa I, Sigiriya served as both a royal palace and fortress. The king chose this location after usurping the throne from his father and fearing revenge from his brother.

## What to See at Sigiriya

### The Frescoes
The famous Sigiriya frescoes, painted on the rock face, depict beautiful women and are considered masterpieces of ancient Sri Lankan art.

### Mirror Wall
The highly polished wall that once reflected the frescoes contains ancient graffiti and poems written by visitors over 1,000 years ago.

### Lion's Gate
The entrance to the upper palace, featuring massive lion paws carved from stone.

### Summit Palace
The ruins of King Kashyapa's palace at the summit offer panoramic views of the surrounding landscape.

## Practical Information

**Opening Hours:** 7:00 AM - 5:30 PM daily
**Entrance Fee:** $30 for foreign adults
**Best Time to Visit:** Early morning (7-9 AM) or late afternoon (4-5 PM)
**Duration:** 3-4 hours for the complete visit

## Tips for Visiting

1. Bring plenty of water and wear comfortable shoes
2. Start early to avoid crowds and heat
3. Don't forget your camera for the stunning views
4. Be prepared for a challenging climb - there are over 1,200 steps!

Sigiriya is truly a must-visit destination that combines history, culture, and natural beauty in one spectacular location.`,
        category: categories[0]._id, // Travel
        tags: ['sigiriya', 'travel', 'unesco', 'sri lanka', 'ancient', 'history'],
        featuredImage: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        status: 'published',
        featured: true,
        author: admin._id,
        metaTitle: 'Complete Guide to Sigiriya Rock Fortress - Sri Lanka How',
        metaDescription: 'Complete guide to visiting Sigiriya Rock Fortress, UNESCO World Heritage site in Sri Lanka with history, tips, and practical info.',
        metaKeywords: 'sigiriya, lion rock, sri lanka, unesco, travel guide, ancient fortress',
        views: 1245,
        publishedAt: new Date('2024-09-06')
      },
      {
        title: 'How to Get a SIM Card in Sri Lanka',
        slug: 'how-to-get-sim-card-sri-lanka',
        excerpt: 'A step-by-step guide to getting a local SIM card in Sri Lanka for tourists and visitors. Learn about different providers, requirements, and best deals.',
        content: `# How to Get a SIM Card in Sri Lanka

Getting a local SIM card in Sri Lanka is essential for staying connected during your visit. Here's everything you need to know about getting a SIM card as a tourist.

## Major Telecom Providers

### Dialog
- Largest network coverage
- Best data speeds
- Tourist packages available

### Mobitel
- Good coverage island-wide
- Competitive rates
- Reliable service

### Hutch
- Budget-friendly options
- Good for data
- Limited coverage in remote areas

## Requirements

To get a SIM card in Sri Lanka, you'll need:

1. **Passport** - Original required
2. **Passport photocopy** - Most shops can provide this
3. **Local address** - Hotel address is acceptable
4. **Registration form** - Provided by the shop

## Where to Buy

### Airport
- Available at Bandaranaike International Airport
- Convenient but slightly more expensive
- Open 24/7

### Telecom Shops
- Better prices and packages
- More options available
- Present in most towns

### Authorized Dealers
- Found everywhere
- Competitive prices
- May require some bargaining

## Tourist Packages

Most providers offer special tourist packages including:
- Data allowances (1GB to 10GB)
- Local calling minutes
- International calling credits
- Validity from 7 to 30 days

## Tips

1. Compare packages from different providers
2. Ask about data rollover policies
3. Keep your receipt for any issues
4. Download provider apps for easy top-ups
5. Test the connection before leaving the shop

Getting a SIM card in Sri Lanka is straightforward and will greatly enhance your travel experience!`,
        category: categories[1]._id, // Guides
        tags: ['sim card', 'mobile', 'telecommunications', 'tourist guide', 'connectivity'],
        featuredImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
        status: 'published',
        featured: false,
        author: admin._id,
        metaTitle: 'How to Get a SIM Card in Sri Lanka - Complete Tourist Guide',
        metaDescription: 'Step-by-step guide to getting a local SIM card in Sri Lanka. Learn about providers, requirements, and best tourist packages.',
        metaKeywords: 'sri lanka sim card, mobile phone, tourist guide, dialog, mobitel, hutch',
        views: 892,
        publishedAt: new Date('2024-09-05')
      },
      {
        title: 'Sri Lankan Food Culture: A Beginner\'s Guide',
        slug: 'sri-lankan-food-culture-beginners-guide',
        excerpt: 'Explore the rich and diverse food culture of Sri Lanka. From spicy curries to sweet treats, discover what makes Sri Lankan cuisine unique.',
        content: `# Sri Lankan Food Culture: A Beginner's Guide

Sri Lankan cuisine is a vibrant tapestry of flavors, influenced by centuries of trade, colonization, and cultural exchange. This guide will introduce you to the essentials of Sri Lankan food culture.

## Key Characteristics

### Spices and Heat
Sri Lankan food is known for its bold use of spices:
- **Cinnamon** - Ceylon cinnamon is world-famous
- **Cardamom** - Used in both sweet and savory dishes
- **Chili** - Provides the signature heat
- **Curry leaves** - Essential for authentic flavor
- **Coconut** - Used in various forms

### Rice as the Staple
Rice is the foundation of most Sri Lankan meals:
- **Red rice** - Traditional and nutritious
- **White rice** - Most common variety
- **String hoppers** - Steamed rice noodle cakes
- **Hoppers** - Bowl-shaped pancakes

## Essential Dishes

### Rice and Curry
The national dish consisting of:
- Steamed rice
- Multiple curries (vegetable, meat, fish)
- Sambols (spicy condiments)
- Papadams (crispy wafers)

### Kottu Roti
A popular street food made with:
- Chopped roti bread
- Vegetables and/or meat
- Eggs
- Spices

### String Hoppers
Delicate rice noodle cakes served with:
- Coconut milk
- Curry
- Sambol

## Eating Etiquette

### Traditional Style
- Eat with your right hand
- Mix rice with curries
- Use fingers to make small balls
- Never use left hand for eating

### Modern Style
- Spoon and fork commonly used
- Knife rarely needed
- Sharing dishes is common

## Regional Variations

### Jaffna (Northern)
- Heavy use of seafood
- Distinct Tamil influence
- Spicier preparations

### Kandy (Central)
- Mountain vegetables
- Milder spices
- Unique preparations

### Galle (Southern)
- Coconut-heavy dishes
- Portuguese influences
- Seafood specialties

## Beverages

### Traditional
- **Ceylon tea** - World-renowned black tea
- **King coconut water** - Fresh and nutritious
- **Faluda** - Sweet milk drink

### Modern
- Fresh fruit juices
- Local beer (Lion, Carlsberg)
- Arrack - Local spirit

## Dining Tips for Visitors

1. Start with mild dishes and work up to spicier ones
2. Always have yogurt or coconut milk nearby to cool heat
3. Try different regional specialties
4. Don't be afraid to eat with your hands
5. Ask for spice levels to be adjusted

Sri Lankan food culture is about sharing, family, and celebrating life through delicious, aromatic meals!`,
        category: categories[2]._id, // Culture
        tags: ['food', 'culture', 'cuisine', 'spices', 'rice', 'curry'],
        featuredImage: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-4.0.3&auto=format&fit=crop&w=2332&q=80',
        status: 'published',
        featured: true,
        author: admin._id,
        metaTitle: 'Sri Lankan Food Culture: Complete Beginner\'s Guide',
        metaDescription: 'Explore Sri Lankan cuisine and food culture. Learn about traditional dishes, spices, eating etiquette, and regional variations.',
        metaKeywords: 'sri lankan food, cuisine, culture, spices, rice and curry, traditional dishes',
        views: 756,
        publishedAt: new Date('2024-09-04')
      }
    ];

    await Article.create(articles);
    console.log('Created sample articles');

    // Update category article counts
    await Category.findByIdAndUpdate(categories[0]._id, { articleCount: 1 });
    await Category.findByIdAndUpdate(categories[1]._id, { articleCount: 1 });
    await Category.findByIdAndUpdate(categories[2]._id, { articleCount: 1 });

    console.log('Database seeded successfully!');
    console.log('Admin login: admin@srilankahow.com / admin123');

  } catch (error) {
    console.error('Seeding error:', error);
  }
}

// Run seeder if called directly
if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

export default seedDatabase;
