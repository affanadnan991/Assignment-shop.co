import { Product } from '@/types';
import { MOCK_PRODUCTS } from '@/data/mockProducts';

/**
 * Modular API Service Abstraction Layer
 * Currently resolves mock data locally.
 * When backend API server is initialized, simply replace mock returns with fetch / axios calls to backend REST API.
 */

export const productService = {
  // Get all products (with optional filtering)
  async getProducts(): Promise<Product[]> {
    // Backend Future Integration:
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
    // return res.json();
    return Promise.resolve(MOCK_PRODUCTS);
  },

  // Get product by ID or Slug
  async getProductById(idOrSlug: string): Promise<Product | undefined> {
    const product = MOCK_PRODUCTS.find(
      (p) => p.id === idOrSlug || p.slug === idOrSlug
    );
    return Promise.resolve(product);
  },

  // Get New Arrivals
  async getNewArrivals(): Promise<Product[]> {
    const newArrivals = MOCK_PRODUCTS.filter((p) => p.isNewArrival);
    return Promise.resolve(newArrivals);
  },

  // Get Top Selling Products
  async getTopSelling(): Promise<Product[]> {
    const topSelling = MOCK_PRODUCTS.filter((p) => p.isTopSelling);
    return Promise.resolve(topSelling);
  },

  // Get Related Products
  async getRelatedProducts(category: string, currentId: string): Promise<Product[]> {
    const related = MOCK_PRODUCTS.filter(
      (p) => p.category === category && p.id !== currentId
    ).slice(0, 4);
    return Promise.resolve(related.length ? related : MOCK_PRODUCTS.slice(0, 4));
  }
};
