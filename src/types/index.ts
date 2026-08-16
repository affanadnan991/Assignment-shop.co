export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  gallery: string[];
  category: string;
  style: 'Casual' | 'Formal' | 'Party' | 'Gym';
  colors: { name: string; hex: string }[];
  sizes: ('S' | 'M' | 'L' | 'XL' | 'XXL')[];
  isNewArrival?: boolean;
  isTopSelling?: boolean;
  inStock: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  isVerified: boolean;
}

export interface CartItem {
  product: Product;
  selectedColor: { name: string; hex: string };
  selectedSize: string;
  quantity: number;
}

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  colors: string[];
  sizes: string[];
  style: string;
  sortBy: 'most-popular' | 'newest' | 'price-low' | 'price-high';
  searchQuery: string;
}
