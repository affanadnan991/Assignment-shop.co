import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: number;
}

export default function RatingStars({ rating, reviewCount, size = 16 }: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.3;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5 text-amber-400">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return <Star key={i} className="fill-amber-400 stroke-amber-400" style={{ width: size, height: size }} />;
          } else if (i === fullStars && hasHalfStar) {
            return (
              <div key={i} className="relative" style={{ width: size, height: size }}>
                <Star className="text-gray-300 stroke-gray-300 absolute inset-0" style={{ width: size, height: size }} />
                <div className="overflow-hidden absolute inset-0 w-1/2">
                  <Star className="fill-amber-400 stroke-amber-400" style={{ width: size, height: size }} />
                </div>
              </div>
            );
          } else {
            return <Star key={i} className="text-gray-300 stroke-gray-300" style={{ width: size, height: size }} />;
          }
        })}
      </div>
      <span className="text-xs text-black font-medium">
        {rating.toFixed(1)}/5
        {reviewCount !== undefined && <span className="text-gray-500 font-normal ml-1">({reviewCount})</span>}
      </span>
    </div>
  );
}
