import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-[#F2F0F1] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 sm:pt-16 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 flex flex-col space-y-6 sm:space-y-8 z-10">
            <h1 className="font-integral text-4xl sm:text-6xl lg:text-[64px] leading-[1.05] tracking-tighter text-black uppercase">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h1>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl">
              Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
            </p>

            <div>
              <Link
                href="/shop"
                className="inline-block bg-black text-white text-base font-medium px-14 py-4 rounded-full hover:bg-gray-800 transition-all transform hover:-translate-y-0.5 shadow-lg"
              >
                Shop Now
              </Link>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-gray-200/60 max-w-lg">
              <div>
                <span className="font-bold text-2xl sm:text-4xl text-black block">200+</span>
                <span className="text-xs sm:text-sm text-gray-500">International Brands</span>
              </div>
              <div>
                <span className="font-bold text-2xl sm:text-4xl text-black block">2,000+</span>
                <span className="text-xs sm:text-sm text-gray-500">High-Quality Products</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="font-bold text-2xl sm:text-4xl text-black block">30,000+</span>
                <span className="text-xs sm:text-sm text-gray-500">Happy Customers</span>
              </div>
            </div>
          </div>

          {/* Right Image Column with Star Vectors */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Decorative Stars */}
            <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-20 animate-pulse">
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28 0C28 15.464 40.536 28 56 28C40.536 28 28 40.536 28 56C28 40.536 15.464 28 0 28C15.464 28 28 15.464 28 0Z" fill="black"/>
              </svg>
            </div>

            <div className="absolute bottom-16 left-4 z-20">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 0C18 9.94113 26.0589 18 36 18C26.0589 18 18 26.0589 18 36C18 26.0589 9.94113 18 0 18C9.94113 18 18 9.94113 18 0Z" fill="black"/>
              </svg>
            </div>

            {/* Model Image Frame using public/assets/hero.jpg */}
            <div className="relative w-full max-w-md lg:max-w-none h-[420px] sm:h-[580px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/assets/hero.jpg"
                alt="Fashion Models"
                fill
                priority
                className="object-cover object-top"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
