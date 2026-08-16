'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, User, ChevronDown, Menu, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSearchQuery, setCategory, setStyle } from '@/store/slices/filterSlice';

export default function Navbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      dispatch(setSearchQuery(searchInput.trim()));
      router.push(`/shop?search=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const handleCategoryClick = (categoryName: string, styleName?: string) => {
    dispatch(setCategory(categoryName));
    if (styleName) {
      dispatch(setStyle(styleName));
    }
    setIsShopDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 backdrop-blur-md bg-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4 sm:gap-8">
          
          {/* Mobile Menu Button & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-black p-1 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link href="/" className="font-integral text-2xl sm:text-3xl tracking-tighter text-black uppercase">
              SHOP.CO
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-black">
            {/* Shop Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsShopDropdownOpen(true)}
              onMouseLeave={() => setIsShopDropdownOpen(false)}
            >
              <Link
                href="/shop"
                className="flex items-center gap-1 hover:text-gray-600 transition-colors py-2"
              >
                Shop <ChevronDown className="w-4 h-4 opacity-70" />
              </Link>

              {isShopDropdownOpen && (
                <div className="absolute top-full left-0 w-48 bg-white border border-gray-100 shadow-xl rounded-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <Link
                    href="/shop"
                    onClick={() => handleCategoryClick('All')}
                    className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                  >
                    All Clothes
                  </Link>
                  <Link
                    href="/shop"
                    onClick={() => handleCategoryClick('T-shirts')}
                    className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                  >
                    T-Shirts
                  </Link>
                  <Link
                    href="/shop"
                    onClick={() => handleCategoryClick('Jeans')}
                    className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                  >
                    Jeans
                  </Link>
                  <Link
                    href="/shop"
                    onClick={() => handleCategoryClick('Shirts')}
                    className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                  >
                    Shirts
                  </Link>
                  <hr className="my-1 border-gray-100" />
                  <Link
                    href="/shop"
                    onClick={() => handleCategoryClick('All', 'Casual')}
                    className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                  >
                    Casual Style
                  </Link>
                  <Link
                    href="/shop"
                    onClick={() => handleCategoryClick('All', 'Formal')}
                    className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                  >
                    Formal Style
                  </Link>
                </div>
              )}
            </div>

            <Link href="/shop?filter=on-sale" className="hover:text-gray-600 transition-colors whitespace-nowrap">
              On Sale
            </Link>
            <Link href="/shop?filter=new-arrivals" className="hover:text-gray-600 transition-colors whitespace-nowrap">
              New Arrivals
            </Link>
            <Link href="#brands" className="hover:text-gray-600 transition-colors whitespace-nowrap">
              Brands
            </Link>
          </nav>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md items-center bg-[#F0F0F0] rounded-full px-4 py-2.5 gap-3 focus-within:ring-2 focus-within:ring-black transition-all"
          >
            <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search for products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-sm placeholder:text-gray-400 text-black"
            />
          </form>

          {/* Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/cart"
              className="relative p-2 text-black hover:text-gray-600 transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-scale-up">
                  {totalCartCount > 99 ? '99+' : totalCartCount}
                </span>
              )}
            </Link>

            <button
              className="p-2 text-black hover:text-gray-600 transition-colors"
              aria-label="User Account"
            >
              <User className="w-6 h-6" />
            </button>
          </div>

        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center bg-[#F0F0F0] rounded-full px-4 py-2 gap-2"
          >
            <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search for products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-xs placeholder:text-gray-400 text-black"
            />
          </form>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-300">
          <Link
            href="/shop"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-lg font-medium text-black py-2 border-b border-gray-100"
          >
            Shop All
          </Link>
          <Link
            href="/shop?filter=on-sale"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-lg font-medium text-black py-2 border-b border-gray-100"
          >
            On Sale
          </Link>
          <Link
            href="/shop?filter=new-arrivals"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-lg font-medium text-black py-2 border-b border-gray-100"
          >
            New Arrivals
          </Link>
          <Link
            href="#brands"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-lg font-medium text-black py-2 border-b border-gray-100"
          >
            Brands
          </Link>
        </div>
      )}
    </header>
  );
}
