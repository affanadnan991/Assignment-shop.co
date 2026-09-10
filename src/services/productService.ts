import { Product, Review } from '@/types';
import productsData from '@/data/products.json';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

function getLocalProducts(params?: {
  category?: string;
  style?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: string;
  isNewArrival?: boolean;
  isTopSelling?: boolean;
}): Product[] {
  let products: Product[] = [...(productsData.products as Product[])];

  if (!params) return products;

  const { category, style, minPrice, maxPrice, search, sortBy, isNewArrival, isTopSelling } = params;

  if (category && category !== 'All') {
    products = products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (style && style !== 'All') {
    products = products.filter((p) => p.style.toLowerCase() === style.toLowerCase());
  }

  if (minPrice) {
    products = products.filter((p) => p.price >= Number(minPrice));
  }

  if (maxPrice) {
    products = products.filter((p) => p.price <= Number(maxPrice));
  }

  if (search) {
    const query = search.toLowerCase();
    products = products.filter(
      (p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
    );
  }

  if (isNewArrival) {
    products = products.filter((p) => p.isNewArrival);
  }

  if (isTopSelling) {
    products = products.filter((p) => p.isTopSelling);
  }

  if (sortBy === 'price-low') {
    products.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    products.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'newest') {
    products.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
  } else if (sortBy === 'most-popular') {
    products.sort((a, b) => b.reviewCount - a.reviewCount);
  }

  return products;
}

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

      let fetchUrl = '';
      if (API_BASE_URL) {
        fetchUrl = `${API_BASE_URL}/api/products?${queryParams.toString()}`;
      } else if (typeof window !== 'undefined') {
        fetchUrl = `/api/products?${queryParams.toString()}`;
      }

      if (fetchUrl) {
        const res = await fetch(fetchUrl, { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.length > 0) return json.data;
        }
      }
    } catch (error) {
      console.warn('Network fetch failed in getProducts, using dataset fallback:', error);
    }
    return getLocalProducts(params);
  },

  // Get product by ID or Slug
  async getProductById(idOrSlug: string): Promise<Product | undefined> {
    try {
      let fetchUrl = '';
      if (API_BASE_URL) {
        fetchUrl = `${API_BASE_URL}/api/products/${idOrSlug}`;
      } else if (typeof window !== 'undefined') {
        fetchUrl = `/api/products/${idOrSlug}`;
      }

      if (fetchUrl) {
        const res = await fetch(fetchUrl, { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json.data) return json.data;
        }
      }
    } catch (error) {
      console.warn('Network fetch failed in getProductById, using dataset fallback:', error);
    }
    const products = productsData.products as Product[];
    return products.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
  },

  // Get New Arrivals
  async getNewArrivals(): Promise<Product[]> {
    try {
      let fetchUrl = '';
      if (API_BASE_URL) {
        fetchUrl = `${API_BASE_URL}/api/products/new-arrivals`;
      } else if (typeof window !== 'undefined') {
        fetchUrl = `/api/products/new-arrivals`;
      }

      if (fetchUrl) {
        const res = await fetch(fetchUrl, { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.length > 0) return json.data;
        }
      }
    } catch (error) {
      console.warn('Network fetch failed in getNewArrivals, using dataset fallback:', error);
    }
    const products = productsData.products as Product[];
    return products.filter((p) => p.isNewArrival);
  },

  // Get Top Selling Products
  async getTopSelling(): Promise<Product[]> {
    try {
      let fetchUrl = '';
      if (API_BASE_URL) {
        fetchUrl = `${API_BASE_URL}/api/products/top-selling`;
      } else if (typeof window !== 'undefined') {
        fetchUrl = `/api/products/top-selling`;
      }

      if (fetchUrl) {
        const res = await fetch(fetchUrl, { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.length > 0) return json.data;
        }
      }
    } catch (error) {
      console.warn('Network fetch failed in getTopSelling, using dataset fallback:', error);
    }
    const products = productsData.products as Product[];
    return products.filter((p) => p.isTopSelling);
  },

  // Get Related Products
  async getRelatedProducts(category: string, currentId: string): Promise<Product[]> {
    try {
      let fetchUrl = '';
      if (API_BASE_URL) {
        fetchUrl = `${API_BASE_URL}/api/products/${currentId}/related`;
      } else if (typeof window !== 'undefined') {
        fetchUrl = `/api/products/${currentId}/related`;
      }

      if (fetchUrl) {
        const res = await fetch(fetchUrl, { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.length > 0) return json.data;
        }
      }
    } catch (error) {
      console.warn('Network fetch failed in getRelatedProducts, using dataset fallback:', error);
    }
    const products = productsData.products as Product[];
    const current = products.find((p) => p.id === currentId || p.slug === currentId);
    let related: Product[] = [];
    if (current) {
      related = products.filter((p) => p.category === current.category && p.id !== current.id).slice(0, 4);
    }
    if (related.length === 0) {
      related = products.filter((p) => p.id !== currentId).slice(0, 4);
    }
    return related;
  },

  // Get Customer Reviews
  async getReviews(): Promise<Review[]> {
    try {
      let fetchUrl = '';
      if (API_BASE_URL) {
        fetchUrl = `${API_BASE_URL}/api/reviews`;
      } else if (typeof window !== 'undefined') {
        fetchUrl = `/api/reviews`;
      }

      if (fetchUrl) {
        const res = await fetch(fetchUrl, { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.length > 0) return json.data;
        }
      }
    } catch (error) {
      console.warn('Network fetch failed in getReviews, using dataset fallback:', error);
    }
    return productsData.reviews as Review[];
  }
};
