import Link from 'next/link';
import { Product } from '@/types';
import ProductCard from '../common/ProductCard';

interface ProductGridSectionProps {
  title: string;
  products: Product[];
  viewAllHref?: string;
}

export default function ProductGridSection({
  title,
  products,
  viewAllHref = "/shop",
}: ProductGridSectionProps) {
  return (
    <section className="py-12 sm:py-16 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <h2 className="font-integral text-3xl sm:text-5xl text-center tracking-tight text-black uppercase mb-10 sm:mb-14">
          {title}
        </h2>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10 sm:mt-14">
          <Link
            href={viewAllHref}
            className="inline-block border border-gray-300 text-black text-sm font-medium px-16 py-3.5 rounded-full hover:bg-black hover:text-white transition-colors duration-300"
          >
            View All
          </Link>
        </div>

      </div>
    </section>
  );
}
