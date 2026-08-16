'use client';

import { use, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import { productService } from '@/services/productService';
import { Product } from '@/types';
import RatingStars from '@/components/common/RatingStars';
import ProductCard from '@/components/common/ProductCard';
import { MOCK_REVIEWS } from '@/data/mockProducts';
import { Check, Minus, Plus, CheckCircle2, SlidersHorizontal } from 'lucide-react';

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string }>({ name: '', hex: '' });
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'faqs'>('reviews');
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const prod = await productService.getProductById(id);
      if (prod) {
        setProduct(prod);
        setSelectedImage(prod.imageUrl);
        if (prod.colors.length > 0) setSelectedColor(prod.colors[0]);
        if (prod.sizes.length > 0) setSelectedSize(prod.sizes[0]);

        const related = await productService.getRelatedProducts(prod.category, prod.id);
        setRelatedProducts(related);
      }
      setLoading(false);
    }
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto" />
      </div>
    );
  }

  if (!product) {
    return notFound();
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product,
        selectedColor,
        selectedSize,
        quantity,
      })
    );
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed bottom-8 right-8 bg-black text-white px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 z-50 animate-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">Added to cart successfully!</span>
        </div>
      )}

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 flex-wrap">
        <Link href="/" className="hover:text-black transition-colors">Home</Link>
        <span>&gt;</span>
        <Link href="/shop" className="hover:text-black transition-colors">Shop</Link>
        <span>&gt;</span>
        <span className="font-semibold text-black uppercase">{product.category}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-16">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 flex flex-col-reverse md:flex-row gap-4">
          {/* Gallery Thumbnails */}
          <div className="flex md:flex-col gap-3">
            {product.gallery.map((imgUrl, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(imgUrl)}
                className={`relative w-20 h-20 sm:w-24 sm:h-24 bg-[#F0EEED] rounded-2xl overflow-hidden border-2 transition-all ${
                  selectedImage === imgUrl ? 'border-black' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <Image
                  src={imgUrl}
                  alt={`${product.name} thumbnail ${index}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Large Image */}
          <div className="relative flex-1 aspect-square bg-[#F0EEED] rounded-3xl overflow-hidden">
            <Image
              src={selectedImage || product.imageUrl}
              alt={product.name}
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Column: Product Info & Selectors */}
        <div className="lg:col-span-6 flex flex-col space-y-6">
          
          {/* Title & Rating */}
          <div className="space-y-3">
            <h1 className="font-integral text-3xl sm:text-4xl text-black uppercase leading-tight">
              {product.name}
            </h1>
            <RatingStars rating={product.rating} reviewCount={product.reviewCount} size={20} />
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="font-bold text-3xl text-black">${product.price}</span>
            {product.originalPrice && (
              <span className="font-bold text-2xl text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
            {product.discountPercentage && (
              <span className="bg-[#FF3333]/10 text-[#FF3333] text-xs font-semibold px-3 py-1 rounded-full">
                -{product.discountPercentage}%
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed border-b border-gray-100 pb-6">
            {product.description}
          </p>

          {/* Color Picker */}
          <div className="space-y-3 border-b border-gray-100 pb-6">
            <span className="text-sm text-gray-500 font-medium">Select Colors</span>
            <div className="flex items-center gap-3">
              {product.colors.map((color) => {
                const isSelected = selectedColor.hex === color.hex;
                return (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color.hex }}
                    className="w-9 h-9 rounded-full relative flex items-center justify-center transition-all transform hover:scale-105"
                  >
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size Picker */}
          <div className="space-y-3 border-b border-gray-100 pb-6">
            <span className="text-sm text-gray-500 font-medium">Choose Size</span>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                      isSelected
                        ? 'bg-black text-white'
                        : 'bg-[#F0F0F0] text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {size === 'S'
                      ? 'Small'
                      : size === 'M'
                      ? 'Medium'
                      : size === 'L'
                      ? 'Large'
                      : size === 'XL'
                      ? 'X-Large'
                      : 'XX-Large'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity & Add to Cart CTA */}
          <div className="flex items-center gap-4 pt-2">
            
            {/* Quantity Stepper */}
            <div className="flex items-center bg-[#F0F0F0] rounded-full px-5 py-3 gap-5">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="text-black hover:opacity-70 transition-opacity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-bold text-base text-black min-w-[20px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="text-black hover:opacity-70 transition-opacity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add To Cart Button */}
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-black text-white font-medium text-sm sm:text-base py-3.5 px-8 rounded-full hover:bg-gray-800 transition-colors shadow-lg"
            >
              Add to Cart
            </button>

          </div>

        </div>

      </div>

      {/* Tabs Section */}
      <div className="border-t border-gray-200 pt-8 mb-16">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 justify-around text-center text-sm sm:text-base font-medium mb-8">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-4 transition-colors relative ${
              activeTab === 'details' ? 'text-black font-bold border-b-2 border-black' : 'text-gray-400 hover:text-black'
            }`}
          >
            Product Details
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-4 transition-colors relative ${
              activeTab === 'reviews' ? 'text-black font-bold border-b-2 border-black' : 'text-gray-400 hover:text-black'
            }`}
          >
            Rating & Reviews ({product.reviewCount})
          </button>
          <button
            onClick={() => setActiveTab('faqs')}
            className={`pb-4 transition-colors relative ${
              activeTab === 'faqs' ? 'text-black font-bold border-b-2 border-black' : 'text-gray-400 hover:text-black'
            }`}
          >
            FAQs
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xl text-black">
                All Reviews <span className="text-sm font-normal text-gray-500">({product.reviewCount})</span>
              </h3>
              <div className="flex items-center gap-3">
                <button className="bg-[#F0F0F0] p-2.5 rounded-full hover:bg-gray-200 transition-colors">
                  <SlidersHorizontal className="w-4 h-4 text-black" />
                </button>
                <button className="bg-black text-white text-xs sm:text-sm font-medium px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors">
                  Write a Review
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_REVIEWS.map((review) => (
                <div
                  key={review.id}
                  className="border border-gray-200 rounded-2xl p-6 space-y-3 bg-white"
                >
                  <RatingStars rating={review.rating} />
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-base text-black">{review.author}</h4>
                    {review.isVerified && <CheckCircle2 className="w-4 h-4 fill-emerald-500 text-white" />}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">&ldquo;{review.comment}&rdquo;</p>
                  <span className="text-xs text-gray-400 block pt-2">{review.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'details' && (
          <div className="max-w-3xl space-y-4 text-gray-600 text-sm leading-relaxed">
            <p>100% Premium Cotton fabric. Pre-shrunk to maintain fit after washing.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Machine wash cold with like colors</li>
              <li>Tumble dry low or hang dry</li>
              <li>Cool iron if needed</li>
            </ul>
          </div>
        )}

        {activeTab === 'faqs' && (
          <div className="max-w-3xl space-y-4 text-gray-600 text-sm">
            <div className="border border-gray-200 rounded-2xl p-4">
              <h4 className="font-bold text-black mb-1">What is the return policy?</h4>
              <p>We offer 30-day hassle free returns on all unworn items with original tags intact.</p>
            </div>
            <div className="border border-gray-200 rounded-2xl p-4">
              <h4 className="font-bold text-black mb-1">How long does shipping take?</h4>
              <p>Standard delivery takes 3-5 business days. Express shipping options are available at checkout.</p>
            </div>
          </div>
        )}

      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-8">
          <h2 className="font-integral text-3xl sm:text-4xl text-center uppercase tracking-tight text-black mb-10">
            YOU MIGHT ALSO LIKE
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((relProd) => (
              <ProductCard key={relProd.id} product={relProd} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
