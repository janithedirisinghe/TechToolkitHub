import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  color: string;
  order: number;
  isActive: boolean;
  articleCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  color: {
    type: String,
    default: '#059669'
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  articleCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for faster queries
CategorySchema.index({ slug: 1 });
CategorySchema.index({ isActive: 1, order: 1 });

export default mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
