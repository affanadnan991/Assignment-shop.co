'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';

export default function TopBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-black text-white text-xs sm:text-sm py-2.5 px-4 relative flex items-center justify-center transition-all duration-300">
      <div className="text-center font-satoshi flex items-center gap-1.5 flex-wrap justify-center">
        <span>Sign up and get 20% off to your first order.</span>
        <Link
          href="/shop"
          className="font-semibold underline underline-offset-4 hover:text-gray-300 transition-colors"
        >
          Sign Up Now
        </Link>
      </div>

      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 sm:right-8 text-white/80 hover:text-white transition-colors p-1"
        aria-label="Close Announcement"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
