'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { MOCK_REVIEWS } from '@/data/mockProducts';
import RatingStars from '../common/RatingStars';

export default function CustomerReviews() {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % MOCK_REVIEWS.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + MOCK_REVIEWS.length) % MOCK_REVIEWS.length);
  };

  // Create infinite wrapping array slice for display
  const visibleReviews = [
    MOCK_REVIEWS[startIndex],
    MOCK_REVIEWS[(startIndex + 1) % MOCK_REVIEWS.length],
    MOCK_REVIEWS[(startIndex + 2) % MOCK_REVIEWS.length],
  ];

  return (
    <section className="py-12 sm:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <h2 className="font-integral text-3xl sm:text-5xl tracking-tight text-black uppercase">
            OUR HAPPY CUSTOMERS
          </h2>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full border border-gray-200 hover:bg-black hover:text-white transition-colors"
              aria-label="Previous Reviews"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full border border-gray-200 hover:bg-black hover:text-white transition-colors"
              aria-label="Next Reviews"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reviews Cards Slider */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleReviews.map((review, idx) => (
            <div
              key={`${review.id}-${idx}`}
              className="border border-gray-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-4 bg-white hover:shadow-lg transition-shadow duration-300"
            >
              <div className="space-y-3">
                <RatingStars rating={review.rating} size={20} />

                <div className="flex items-center gap-1.5 pt-1">
                  <h4 className="font-bold text-lg text-black">{review.author}</h4>
                  {review.isVerified && (
                    <CheckCircle2 className="w-5 h-5 fill-emerald-500 text-white" />
                  )}
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              <span className="text-xs text-gray-400 font-medium">
                {review.date}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
