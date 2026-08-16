'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch } from '@/store/hooks';
import { setStyle } from '@/store/slices/filterSlice';

export default function BrowseByStyle() {
  const dispatch = useAppDispatch();

  const handleStyleClick = (styleName: string) => {
    dispatch(setStyle(styleName));
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F0F0F0] rounded-[32px] sm:rounded-[40px] px-6 py-10 sm:p-16">
          
          {/* Title */}
          <h2 className="font-integral text-3xl sm:text-5xl text-center tracking-tight text-black uppercase mb-8 sm:mb-16">
            BROWSE BY DRESS STYLE
          </h2>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
            
            {/* 1. Casual (Span 5 cols on desktop) */}
            <Link
              href="/shop"
              onClick={() => handleStyleClick('Casual')}
              className="group relative bg-white h-[190px] sm:h-[289px] rounded-[20px] sm:rounded-[24px] overflow-hidden md:col-span-5 transition-transform duration-300 hover:shadow-md"
            >
              <span className="absolute top-4 left-6 sm:top-6 sm:left-9 z-10 font-bold text-2xl sm:text-3xl text-black">
                Casual
              </span>
              <div className="absolute inset-0 flex justify-end items-end">
                <div className="relative w-[75%] h-full">
                  <Image
                    src="/assets/browse by dress style/casual.png"
                    alt="Casual Style"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover object-right-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </Link>

            {/* 2. Formal (Span 7 cols on desktop) */}
            <Link
              href="/shop"
              onClick={() => handleStyleClick('Formal')}
              className="group relative bg-white h-[190px] sm:h-[289px] rounded-[20px] sm:rounded-[24px] overflow-hidden md:col-span-7 transition-transform duration-300 hover:shadow-md"
            >
              <span className="absolute top-4 left-6 sm:top-6 sm:left-9 z-10 font-bold text-2xl sm:text-3xl text-black">
                Formal
              </span>
              <div className="absolute inset-0 flex justify-end items-end">
                <div className="relative w-[85%] h-full">
                  <Image
                    src="/assets/browse by dress style/formal.png"
                    alt="Formal Style"
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover object-right-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </Link>

            {/* 3. Party (Span 7 cols on desktop) */}
            <Link
              href="/shop"
              onClick={() => handleStyleClick('Party')}
              className="group relative bg-white h-[190px] sm:h-[289px] rounded-[20px] sm:rounded-[24px] overflow-hidden md:col-span-7 transition-transform duration-300 hover:shadow-md"
            >
              <span className="absolute top-4 left-6 sm:top-6 sm:left-9 z-10 font-bold text-2xl sm:text-3xl text-black">
                Party
              </span>
              <div className="absolute inset-0 flex justify-end items-end">
                <div className="relative w-[85%] h-full">
                  <Image
                    src="/assets/browse by dress style/party.png"
                    alt="Party Style"
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover object-right-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </Link>

            {/* 4. Gym (Span 5 cols on desktop) */}
            <Link
              href="/shop"
              onClick={() => handleStyleClick('Gym')}
              className="group relative bg-white h-[190px] sm:h-[289px] rounded-[20px] sm:rounded-[24px] overflow-hidden md:col-span-5 transition-transform duration-300 hover:shadow-md"
            >
              <span className="absolute top-4 left-6 sm:top-6 sm:left-9 z-10 font-bold text-2xl sm:text-3xl text-black">
                Gym
              </span>
              <div className="absolute inset-0 flex justify-end items-end">
                <div className="relative w-[75%] h-full">
                  <Image
                    src="/assets/browse by dress style/gym.png"
                    alt="Gym Style"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover object-right-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}
