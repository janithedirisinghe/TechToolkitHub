import mongoose, { Document, Schema } from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Admin from './Admin'; // Import Admin model to ensure it's registered before Article
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Category from './Category'; // Import Category model to ensure it's registered before Article

export interface IArticle extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: mongoose.Types.ObjectId;
  tags: string[];
  featuredImage?: string;
  status: 'draft' | 'published';
  featured: boolean;
  author: mongoose.Types.ObjectId;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  views: number;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  featuredImage: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  featured: {
    type: Boolean,
    default: false
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  metaTitle: {
    type: String,
    trim: true,
    maxlength: 60
  },
  metaDescription: {
    type: String,
    trim: true,
    maxlength: 160
  },
  metaKeywords: {
    type: String,
    trim: true
  },
  views: {
    type: Number,
    default: 0
  },
  publishedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes for better performance
// Note: slug index is already created by unique: true in schema
ArticleSchema.index({ status: 1, publishedAt: -1 });
ArticleSchema.index({ category: 1, status: 1 });
ArticleSchema.index({ featured: 1, status: 1 });
ArticleSchema.index({ tags: 1 });

// Update publishedAt when status changes to published
ArticleSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

export default mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);
