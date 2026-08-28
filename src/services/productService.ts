import { Product, Review } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const productService = {
  // Get all products (with optional filtering and sorting)
  async getProducts(params?: {
    category?: string;
    style?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    sortBy?: string;
    isNewArrival?: boolean;
    isTopSelling?: boolean;
  }): Promise<Product[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            queryParams.append(key, String(value));
          }
        });
      }

      const res = await fetch(`${API_BASE_URL}/api/products?${queryParams.toString()}`, {
        cache: 'no-store'
      });
      if (!res.ok) throw new Error('Failed to fetch products');
      const json = await res.json();
      return json.data || [];
    } catch (error) {
      console.error('Error in getProducts:', error);
      return [];
    }
  },

  // Get product by ID or Slug
  async getProductById(idOrSlug: string): Promise<Product | undefined> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/products/${idOrSlug}`, {
        cache: 'no-store'
      });
      if (!res.ok) return undefined;
      const json = await res.json();
      return json.data;
    } catch (error) {
      console.error('Error in getProductById:', error);
      return undefined;
    }
  },

  // Get New Arrivals
  async getNewArrivals(): Promise<Product[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/products/new-arrivals`, {
        cache: 'no-store'
      });
      if (!res.ok) throw new Error('Failed to fetch new arrivals');
      const json = await res.json();
      return json.data || [];
    } catch (error) {
      console.error('Error in getNewArrivals:', error);
      return [];
    }
  },

  // Get Top Selling Products
  async getTopSelling(): Promise<Product[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/products/top-selling`, {
        cache: 'no-store'
      });
      if (!res.ok) throw new Error('Failed to fetch top selling');
      const json = await res.json();
      return json.data || [];
    } catch (error) {
      console.error('Error in getTopSelling:', error);
      return [];
    }
  },

  // Get Related Products
  async getRelatedProducts(category: string, currentId: string): Promise<Product[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/products/${currentId}/related`, {
        cache: 'no-store'
      });
      if (!res.ok) throw new Error('Failed to fetch related products');
      const json = await res.json();
      return json.data || [];
    } catch (error) {
      console.error('Error in getRelatedProducts:', error);
      return [];
    }
  },

  // Get Customer Reviews
  async getReviews(): Promise<Review[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/reviews`, {
        cache: 'no-store'
      });
      if (!res.ok) throw new Error('Failed to fetch reviews');
      const json = await res.json();
      return json.data || [];
    } catch (error) {
      console.error('Error in getReviews:', error);
      return [];
    }
  }
};
