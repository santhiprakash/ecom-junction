export enum UserRole {
  ADMIN = 'admin',
  INFLUENCER = 'influencer',
  USER = 'user',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  image_url: string;
  affiliate_link: string;
  source: string; // e.g., 'amazon', 'flipkart', etc.
  rating?: number;
  tags: string[];
  categories: string[];
  user_id: string;
  created_at: string;
  updated_at: string;
  notes?: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  is_public: boolean;
  user_id: string;
  products: string[]; // Array of product IDs
  created_at: string;
  updated_at: string;
  slug: string;
}

export interface Tag {
  id: string;
  name: string;
  user_id: string;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  user_id: string;
  created_at: string;
}

export interface ProductAnalytics {
  product_id: string;
  clicks: number;
  conversions: number;
  revenue: number;
  last_updated: string;
}

export interface CollectionAnalytics {
  collection_id: string;
  views: number;
  clicks: number;
  conversions: number;
  revenue: number;
  last_updated: string;
}
