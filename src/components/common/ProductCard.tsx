import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import RatingStars from './RatingStars';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col space-y-3 cursor-pointer"
    >
      {/* Product Image Container */}
      <div className="relative w-full aspect-square bg-[#F0EEED] rounded-2xl overflow-hidden flex items-center justify-center p-4 group-hover:shadow-md transition-all duration-300">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {product.discountPercentage && (
          <span className="absolute top-3 left-3 bg-[#FF3333]/10 text-[#FF3333] text-xs font-semibold px-2.5 py-1 rounded-full">
            -{product.discountPercentage}%
          </span>
        )}
      </div>

      {/* Product Information */}
      <div className="flex flex-col space-y-1.5 px-1">
        <h3 className="font-bold text-base text-black uppercase tracking-tight line-clamp-1 group-hover:text-gray-600 transition-colors">
          {product.name}
        </h3>

        <RatingStars rating={product.rating} />

        {/* Pricing */}
        <div className="flex items-center gap-2.5 pt-1">
          <span className="font-bold text-xl sm:text-2xl text-black">
            ${product.price}
          </span>

          {product.originalPrice && (
            <span className="font-bold text-lg sm:text-xl text-gray-400 line-through">
              ${product.originalPrice}
            </span>
          )}

          {product.discountPercentage && (
            <span className="bg-[#FF3333]/10 text-[#FF3333] text-xs font-semibold px-2 py-0.5 rounded-full">
              -{product.discountPercentage}%
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
