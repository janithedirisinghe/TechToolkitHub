export interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  image?: string;
  category: {
    name: string;
    slug: string;
    color: string;
  };
  tags?: string[];
  featured: boolean;
  publishedAt: string;
  updatedAt?: string;
  views: number;
  author?: {
    name: string;
  };
  metaDescription?: string;
  status?: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  order: number;
  articleCount: number;
}
