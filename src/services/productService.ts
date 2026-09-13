import { Product, Review } from '@/types';

const getApiBaseUrl = () => {
  let envUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  if (envUrl.endsWith('/')) {
    envUrl = envUrl.slice(0, -1);
  }
  return envUrl;
};

const API_BASE_URL = getApiBaseUrl();

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

      const fetchUrl = `${API_BASE_URL}/api/products?${queryParams.toString()}`;
      const res = await fetch(fetchUrl, { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch (error) {
      console.error('Network fetch failed in getProducts:', error);
    }
    return [];
  },

  // Get product by ID or Slug
  async getProductById(idOrSlug: string): Promise<Product | undefined> {
    try {
      const fetchUrl = `${API_BASE_URL}/api/products/${idOrSlug}`;
      const res = await fetch(fetchUrl, { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch (error) {
      console.error('Network fetch failed in getProductById:', error);
    }
    return undefined;
  },

  // Get New Arrivals
  async getNewArrivals(): Promise<Product[]> {
    try {
      const fetchUrl = `${API_BASE_URL}/api/products/new-arrivals`;
      const res = await fetch(fetchUrl, { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch (error) {
      console.error('Network fetch failed in getNewArrivals:', error);
    }
    return [];
  },

  // Get Top Selling Products
  async getTopSelling(): Promise<Product[]> {
    try {
      const fetchUrl = `${API_BASE_URL}/api/products/top-selling`;
      const res = await fetch(fetchUrl, { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch (error) {
      console.error('Network fetch failed in getTopSelling:', error);
    }
    return [];
  },

  // Get Related Products
  async getRelatedProducts(category: string, currentId: string): Promise<Product[]> {
    try {
      const fetchUrl = `${API_BASE_URL}/api/products/${currentId}/related`;
      const res = await fetch(fetchUrl, { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch (error) {
      console.error('Network fetch failed in getRelatedProducts:', error);
    }
    return [];
  },

  // Get Customer Reviews
  async getReviews(): Promise<Review[]> {
    try {
      const fetchUrl = `${API_BASE_URL}/api/reviews`;
      const res = await fetch(fetchUrl, { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch (error) {
      console.error('Network fetch failed in getReviews:', error);
    }
    return [];
  }
};

