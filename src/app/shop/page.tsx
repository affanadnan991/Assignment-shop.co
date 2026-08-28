'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSortBy } from '@/store/slices/filterSlice';
import FilterSidebar from '@/components/shop/FilterSidebar';
import ProductCard from '@/components/common/ProductCard';
import { productService } from '@/services/productService';
import { Product } from '@/types';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

export default function ShopPage() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.filter);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend API when filters change
  useEffect(() => {
    let isMounted = true;
    async function fetchProducts() {
      setLoading(true);
      const data = await productService.getProducts({
        category: filter.category,
        style: filter.style,
        minPrice: filter.minPrice,
        maxPrice: filter.maxPrice,
        search: filter.searchQuery,
        sortBy: filter.sortBy,
      });

      if (isMounted) {
        // Additional color and size client-side filter if colors/sizes array specified
        let filtered = data;
        if (filter.colors.length > 0) {
          filtered = filtered.filter((p) =>
            p.colors.some((c) => filter.colors.includes(c.name))
          );
        }
        if (filter.sizes.length > 0) {
          filtered = filtered.filter((p) =>
            p.sizes.some((s) => filter.sizes.includes(s as any))
          );
        }

        setProducts(filtered);
        setLoading(false);
      }
    }

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [
    filter.category,
    filter.style,
    filter.minPrice,
    filter.maxPrice,
    filter.colors,
    filter.sizes,
    filter.sortBy,
    filter.searchQuery,
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-black transition-colors">Home</Link>
        <span>&gt;</span>
        <span className="font-semibold text-black">Shop</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block">
          <FilterSidebar />
        </div>

        {/* Mobile Filter Trigger Button */}
        <div className="lg:hidden flex justify-between items-center bg-[#F0F0F0] p-4 rounded-2xl">
          <span className="font-bold text-base text-black">Filter Products</span>
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="flex items-center gap-2 bg-black text-white text-xs px-4 py-2 rounded-full font-medium"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
        </div>

        {/* Mobile Filter Drawer */}
        {isMobileFilterOpen && (
          <div className="lg:hidden">
            <FilterSidebar />
          </div>
        )}

        {/* Products Grid & Catalog View */}
        <div className="flex-1 space-y-6">
          
          {/* Header Row: Title & Sorting */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="font-integral text-3xl text-black uppercase">
              {filter.category === 'All' ? 'Casual' : filter.category}
              <span className="text-xs font-normal text-gray-500 lowercase ml-2 font-satoshi">
                Showing {products.length} Products
              </span>
            </h1>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Sort by:</span>
              <div className="relative inline-block">
                <select
                  value={filter.sortBy}
                  onChange={(e) => dispatch(setSortBy(e.target.value as any))}
                  className="bg-transparent font-bold text-black border-none outline-none cursor-pointer pr-6 appearance-none"
                >
                  <option value="most-popular">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <ChevronDown className="w-4 h-4 text-black absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Product Cards Grid */}
          {loading ? (
            <div className="py-20 text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black mx-auto" />
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-3xl space-y-4">
              <p className="text-gray-500 text-lg">No products found matching your current filter selection.</p>
            </div>
          )}

          {/* Pagination */}
          <div className="border-t border-gray-200 pt-8 flex items-center justify-between">
            <button className="border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium hover:bg-black hover:text-white transition-colors">
              Previous
            </button>
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center">1</span>
              <span className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center cursor-pointer">2</span>
              <span className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center cursor-pointer">3</span>
              <span>...</span>
              <span className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center cursor-pointer">10</span>
            </div>
            <button className="border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium hover:bg-black hover:text-white transition-colors">
              Next
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
