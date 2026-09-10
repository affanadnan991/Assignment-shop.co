import { Product, Review } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

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

      const endpoint = `${API_BASE_URL}/api/products?${queryParams.toString()}`;
      const res = await fetch(endpoint, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const json = await res.json();
      return json.data || [];
    } catch (error) {
      console.error('Error in getProducts API call:', error);
      return [];
    }
  },

  // Get product by ID or Slug
  async getProductById(idOrSlug: string): Promise<Product | undefined> {
    try {
      const endpoint = `${API_BASE_URL}/api/products/${idOrSlug}`;
      const res = await fetch(endpoint, { cache: 'no-store' });
      if (!res.ok) return undefined;
      const json = await res.json();
      return json.data;
    } catch (error) {
      console.error('Error in getProductById API call:', error);
      return undefined;
    }
  },

  // Get New Arrivals
  async getNewArrivals(): Promise<Product[]> {
    try {
      const endpoint = `${API_BASE_URL}/api/products/new-arrivals`;
      const res = await fetch(endpoint, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const json = await res.json();
      return json.data || [];
    } catch (error) {
      console.error('Error in getNewArrivals API call:', error);
      return [];
    }
  },

  // Get Top Selling Products
  async getTopSelling(): Promise<Product[]> {
    try {
      const endpoint = `${API_BASE_URL}/api/products/top-selling`;
      const res = await fetch(endpoint, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const json = await res.json();
      return json.data || [];
    } catch (error) {
      console.error('Error in getTopSelling API call:', error);
      return [];
    }
  },

  // Get Related Products
  async getRelatedProducts(category: string, currentId: string): Promise<Product[]> {
    try {
      const endpoint = `${API_BASE_URL}/api/products/${currentId}/related`;
      const res = await fetch(endpoint, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const json = await res.json();
      return json.data || [];
    } catch (error) {
      console.error('Error in getRelatedProducts API call:', error);
      return [];
    }
  },

  // Get Customer Reviews
  async getReviews(): Promise<Review[]> {
    try {
      const endpoint = `${API_BASE_URL}/api/reviews`;
      const res = await fetch(endpoint, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const json = await res.json();
      return json.data || [];
    } catch (error) {
      console.error('Error in getReviews API call:', error);
      return [];
    }
  }
};
