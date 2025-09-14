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
      email: 'admin@techtoolkithub.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'super_admin',
      isActive: true
    });
    console.log('Created admin user');

    // Create categories
    const categories = await Category.create([
      {
        name: 'Software Reviews',
        slug: 'software-reviews',
        description: 'In-depth software reviews, comparisons, and recommendations',
        color: '#2563EB',
        order: 1,
        isActive: true,
        articleCount: 0
      },
      {
        name: 'Dev Tools',
        slug: 'dev-tools',
        description: 'Development tools, frameworks, and programming software reviews',
        color: '#7C3AED',
        order: 2,
        isActive: true,
        articleCount: 0
      },
      {
        name: 'Productivity',
        slug: 'productivity',
        description: 'Productivity software, project management, and workflow tools',
        color: '#059669',
        order: 3,
        isActive: true,
        articleCount: 0
      },
      {
        name: 'Business Tools',
        slug: 'business-tools',
        description: 'Business software, CRM, marketing tools, and enterprise solutions',
        color: '#DC2626',
        order: 4,
        isActive: true,
        articleCount: 0
      }
    ]);
    console.log('Created categories');

    // Create sample articles
    const articles = [
      {
        title: 'Complete Review of Visual Studio Code 2024',
        slug: 'complete-review-visual-studio-code-2024',
        excerpt: 'Discover everything you need to know about Visual Studio Code, the world\'s most popular code editor. In-depth review of features, extensions, and performance.',
        content: `# Complete Review of Visual Studio Code 2024

Visual Studio Code (VS Code) has become the go-to code editor for developers worldwide. This comprehensive review covers everything you need to know about Microsoft's free, open-source editor.

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
        category: categories[0]._id, // Software Reviews
        tags: ['vscode', 'code editor', 'microsoft', 'development', 'programming', 'review'],
        featuredImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        status: 'published',
        featured: true,
        author: admin._id,
        metaTitle: 'Complete Review of Visual Studio Code 2024 - TechToolkitHub',
        metaDescription: 'Comprehensive review of Visual Studio Code features, performance, pros and cons. Best code editor for developers in 2024.',
        metaKeywords: 'visual studio code, vscode, code editor, development tools, programming',
        views: 1245,
        publishedAt: new Date('2024-09-06')
      },
      {
        title: 'Docker Desktop Review: Complete Container Development Platform',
        slug: 'docker-desktop-review-2024',
        excerpt: 'In-depth review of Docker Desktop for containerization and development. Features, performance, pricing, and alternatives compared.',
        content: `# Docker Desktop Review: Complete Container Development Platform

Docker Desktop has become the go-to solution for developers working with containers. In this comprehensive review, we'll explore its features, performance, and whether it's worth the investment for your development workflow.

## What is Docker Desktop?

Docker Desktop is a comprehensive development environment that makes it easy to build, share, and run containerized applications and microservices. It provides an intuitive GUI alongside powerful CLI tools.

## Key Features

### Container Management
- Easy container lifecycle management
- Visual container monitoring
- Resource usage tracking

### Development Integration
- Seamless IDE integration
- Hot reload support
- Multi-platform builds

### Kubernetes Support
- Built-in Kubernetes cluster
- Easy deployment testing
- Development environment parity

### Hutch
- Budget-friendly options
- Good for data
- Limited coverage in remote areas

## Performance Analysis

Our testing revealed impressive performance metrics:

1. **Startup Time** - Fast application initialization
2. **Resource Usage** - Optimized memory consumption
3. **Build Speed** - Efficient container building
4. **Network Performance** - Reliable container networking

## Pricing Structure

### Personal Use
- Free for personal projects
- Educational discounts available
- Open source project support

### Business Plans
- Subscription-based pricing
- Enterprise features included
- Priority support available

### Cost Considerations
- ROI through development efficiency
- Reduced deployment complexity
- Team collaboration benefits

## Pros and Cons

### Advantages
- User-friendly interface for container management
- Excellent development workflow integration
- Strong ecosystem and community support
- Cross-platform compatibility

### Disadvantages
- Resource intensive on some systems
- Subscription cost for commercial use
- Learning curve for container concepts
- Limited free tier features

## Alternatives to Consider

1. **Podman** - Open source alternative
2. **Rancher Desktop** - Kubernetes-focused solution
3. **Colima** - Lightweight container runtime
4. **Native Docker CLI** - Command-line only approach

## Verdict

Docker Desktop remains the gold standard for containerized development, offering an excellent balance of features, usability, and performance. While the pricing may be a consideration for some teams, the productivity gains often justify the investment.

**Rating: 4.5/5 stars**

Docker Desktop is highly recommended for development teams looking to streamline their containerization workflow.`,
        category: categories[1]._id, // Dev Tools
        tags: ['docker', 'containers', 'development tools', 'devops', 'containerization', 'review'],
        featuredImage: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
        status: 'published',
        featured: false,
        author: admin._id,
        metaTitle: 'Docker Desktop Review 2024: Complete Analysis',
        metaDescription: 'Comprehensive Docker Desktop review covering features, performance, pricing, and alternatives. Is it worth it for your development workflow?',
        metaKeywords: 'docker desktop, container development, devops tools, docker review, containerization',
        views: 892,
        publishedAt: new Date('2024-09-05')
      },
      {
        title: 'Notion vs. Obsidian: Ultimate Productivity App Comparison 2024',
        slug: 'notion-vs-obsidian-productivity-comparison-2024',
        excerpt: 'Comprehensive comparison of Notion and Obsidian for productivity and note-taking. Features, pricing, pros and cons to help you choose.',
        content: `# Notion vs. Obsidian: Ultimate Productivity App Comparison 2024

Choosing the right productivity and note-taking app can significantly impact your workflow. In this detailed comparison, we'll examine Notion and Obsidian to help you make the best choice for your needs.

## Overview of Both Apps

### Notion
Notion is an all-in-one workspace that combines note-taking, databases, task management, and collaboration tools in a single platform.

### Obsidian
Obsidian is a powerful knowledge management tool that uses a local folder of plain text Markdown files, focusing on linking ideas and creating a "second brain."

## Feature Comparison

### Note-Taking Capabilities
- **Notion**: Block-based editor with rich formatting options
- **Obsidian**: Markdown-based with live preview
- **Winner**: Tie - depends on preference

### Database Functionality
- **Notion**: Powerful relational databases with multiple views
- **Obsidian**: Basic table support with community plugins
- **Winner**: Notion

### Linking and Connections
- **Notion**: Basic internal linking
- **Obsidian**: Advanced graph view and backlinks
- **Winner**: Obsidian

## Performance Analysis
- Steamed rice
- Multiple curries (vegetable, meat, fish)
- Sambols (spicy condiments)
- Papadams (crispy wafers)

### Speed and Performance
- **Notion**: Can be slow with large databases
- **Obsidian**: Fast and responsive, works offline
- **Winner**: Obsidian

### Learning Curve
- **Notion**: Moderate learning curve, intuitive interface
- **Obsidian**: Steeper learning curve, more customization
- **Winner**: Notion

## Pricing Comparison

### Notion Pricing
- **Personal**: Free for individual use
- **Plus**: $8/month per user
- **Business**: $15/month per user
- **Enterprise**: Custom pricing

### Obsidian Pricing
- **Personal**: Free for non-commercial use
- **Commercial**: $50/year per user
- **Catalyst**: $25+ for early access to features

## Use Case Scenarios
- Distinct Tamil influence
- Spicier preparations

### Kandy (Central)
- Mountain vegetables
### Choose Notion If:
- You need database functionality
- Team collaboration is important
- You want an all-in-one solution
- You prefer visual organization

### Choose Obsidian If:
- You value speed and offline access
- You love linking ideas and concepts
- You prefer local file storage
- You want extensive customization

## Final Verdict

Both Notion and Obsidian are excellent productivity tools, but they serve different needs:

**Notion** excels as a comprehensive workspace for teams and individuals who need databases, project management, and collaboration features.

**Obsidian** shines for knowledge workers, researchers, and anyone building a personal knowledge management system.

## Our Recommendation

- **For Teams**: Notion
- **For Personal Knowledge Management**: Obsidian
- **For Beginners**: Notion
- **For Power Users**: Obsidian

The best choice depends on your specific workflow, team needs, and personal preferences. Consider trying both with their free tiers to see which feels more natural for your use case.`,
        category: categories[2]._id, // Productivity
        tags: ['notion', 'obsidian', 'productivity', 'note-taking', 'comparison', 'workflow'],
        featuredImage: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80',
        status: 'published',
        featured: true,
        author: admin._id,
        metaTitle: 'Notion vs Obsidian 2024: Productivity Comparison',
        metaDescription: 'Detailed comparison of Notion vs Obsidian for productivity and note-taking. Features, pricing, pros and cons to help you choose the best app.',
        metaKeywords: 'notion vs obsidian, productivity apps, note-taking software, knowledge management, productivity comparison',
        views: 756,
        publishedAt: new Date('2024-09-04')
      },
      {
        title: 'Slack vs Microsoft Teams: Complete Business Communication Comparison',
        slug: 'slack-vs-microsoft-teams-business-communication-2024',
        excerpt: 'Comprehensive comparison of Slack and Microsoft Teams for business communication. Features, integrations, pricing, and which is best for your team.',
        content: `# Slack vs Microsoft Teams: Complete Business Communication Comparison

Choosing the right team communication platform is crucial for business productivity. In this comprehensive comparison, we'll examine Slack and Microsoft Teams to help you make the best decision for your organization.

## Platform Overview

### Slack
Slack pioneered modern workplace communication with its channel-based messaging, extensive integrations, and user-friendly interface that has become the gold standard for team collaboration.

### Microsoft Teams
Microsoft Teams is an integrated collaboration platform that combines chat, video meetings, file storage, and application integration within the Microsoft 365 ecosystem.

## Core Features Comparison

### Messaging and Channels
- **Slack**: Intuitive channel organization with threads
- **Teams**: Channel structure with conversation threading
- **Winner**: Tie - both offer excellent messaging

### Video Conferencing
- **Slack**: Basic video calls, requires third-party for advanced features
- **Teams**: Advanced video features, large meeting support
- **Winner**: Microsoft Teams

### File Sharing and Storage
- **Slack**: Limited storage, integrates with cloud services
- **Teams**: Native OneDrive/SharePoint integration, generous storage
- **Winner**: Microsoft Teams

## Integration Capabilities

### Third-Party Apps
- **Slack**: 2,000+ app integrations, robust API
- **Teams**: Growing app store, strong Microsoft ecosystem
- **Winner**: Slack

### Microsoft 365 Integration
- **Slack**: Available but requires setup
- **Teams**: Native, seamless integration
- **Winner**: Microsoft Teams

## Pricing Analysis

### Slack Pricing
- **Free**: Limited features and storage
- **Pro**: $7.25/user/month
- **Business+**: $12.50/user/month
- **Enterprise Grid**: Custom pricing

### Teams Pricing
- **Free**: Basic features with limitations
- **Microsoft 365 Business Basic**: $6/user/month
- **Microsoft 365 Business Standard**: $12.50/user/month
- **Enterprise plans**: $8-$57/user/month

## Security and Compliance

### Enterprise Security
- **Slack**: Enterprise-grade security, compliance certifications
- **Teams**: Advanced security, extensive compliance features
- **Winner**: Microsoft Teams (slight edge)

### Data Governance
- **Slack**: Good data retention and governance tools
- **Teams**: Comprehensive governance within Microsoft ecosystem
- **Winner**: Microsoft Teams

## User Experience

### Interface Design
- **Slack**: Clean, intuitive, loved by users
- **Teams**: Functional but can feel cluttered
- **Winner**: Slack

### Mobile Experience
- **Slack**: Excellent mobile apps
- **Teams**: Good mobile experience, improving
- **Winner**: Slack

## Decision Framework

### Choose Slack If:
- You prioritize user experience and simplicity
- Your team uses diverse third-party tools
- You need extensive customization options
- You're not heavily invested in Microsoft ecosystem

### Choose Microsoft Teams If:
- You already use Microsoft 365
- Video conferencing is a priority
- You need comprehensive file collaboration
- Cost efficiency within Microsoft stack is important

## Final Recommendation

**For Microsoft 365 Users**: Microsoft Teams is the clear winner due to seamless integration, better value, and comprehensive features.

**For Non-Microsoft Environments**: Slack offers superior user experience and integration flexibility.

**For Hybrid Needs**: Consider your primary workflows - Teams for document collaboration, Slack for communication-focused teams.

Both platforms are excellent choices, and the best option depends on your existing technology stack and team preferences.`,
        category: categories[3]._id, // Business Tools
        tags: ['slack', 'microsoft teams', 'business communication', 'team collaboration', 'productivity', 'comparison'],
        featuredImage: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        status: 'published',
        featured: false,
        author: admin._id,
        metaTitle: 'Slack vs Microsoft Teams 2024: Complete Guide',
        metaDescription: 'Detailed comparison of Slack vs Microsoft Teams for business communication. Features, pricing, integrations, and recommendations for your team.',
        metaKeywords: 'slack vs teams, business communication, team collaboration, microsoft teams, slack comparison, workplace chat',
        views: 1124,
        publishedAt: new Date('2024-09-03')
      }
    ];

    await Article.create(articles);
    console.log('Created sample articles');

    // Update category article counts
    await Category.findByIdAndUpdate(categories[0]._id, { articleCount: 1 }); // Software Reviews
    await Category.findByIdAndUpdate(categories[1]._id, { articleCount: 1 }); // Dev Tools
    await Category.findByIdAndUpdate(categories[2]._id, { articleCount: 1 }); // Productivity
    await Category.findByIdAndUpdate(categories[3]._id, { articleCount: 1 }); // Business Tools

    console.log('Database seeded successfully!');
    console.log('Admin login: admin@techtoolkithub.com / admin123');

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
