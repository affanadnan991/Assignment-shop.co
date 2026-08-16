'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setCategory,
  setPriceRange,
  toggleColor,
  toggleSize,
  setStyle,
  resetFilters,
} from '@/store/slices/filterSlice';
import { SlidersHorizontal, ChevronRight, RotateCcw } from 'lucide-react';

const CATEGORIES = ['All', 'T-shirts', 'Shorts', 'Shirts', 'Jeans'];
const STYLES = ['All', 'Casual', 'Formal', 'Party', 'Gym'];
const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
const COLORS = [
  { name: 'Olive Green', hex: '#4F5D4E' },
  { name: 'Navy Blue', hex: '#1A2530' },
  { name: 'Black', hex: '#111111' },
  { name: 'Red', hex: '#9E2A2B' },
  { name: 'Orange', hex: '#E85D04' },
  { name: 'Khaki', hex: '#C2B280' },
  { name: 'Blue', hex: '#263E59' },
  { name: 'Light Blue', hex: '#8EA8C3' },
];

export default function FilterSidebar() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.filter);

  return (
    <aside className="w-full lg:w-64 bg-white border border-gray-200 rounded-3xl p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <h3 className="font-bold text-xl text-black flex items-center gap-2">
          Filters <SlidersHorizontal className="w-5 h-5 text-gray-500" />
        </h3>

        <button
          onClick={() => dispatch(resetFilters())}
          className="text-xs text-gray-500 hover:text-black flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* Category List */}
      <div className="border-b border-gray-100 pb-6 space-y-3">
        <h4 className="font-bold text-sm text-black">Categories</h4>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => dispatch(setCategory(cat))}
              className={`w-full flex items-center justify-between text-sm py-1 transition-colors ${
                filter.category === cat ? 'font-bold text-black' : 'text-gray-600 hover:text-black'
              }`}
            >
              <span>{cat}</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="border-b border-gray-100 pb-6 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-sm text-black">Price</h4>
          <span className="text-xs font-semibold text-gray-600">
            ${filter.minPrice} - ${filter.maxPrice}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="500"
          step="10"
          value={filter.maxPrice}
          onChange={(e) =>
            dispatch(
              setPriceRange({ min: filter.minPrice, max: Number(e.target.value) })
            )
          }
          className="w-full accent-black cursor-pointer"
        />
      </div>

      {/* Colors Filter */}
      <div className="border-b border-gray-100 pb-6 space-y-3">
        <h4 className="font-bold text-sm text-black">Colors</h4>
        <div className="flex flex-wrap gap-2.5">
          {COLORS.map((col) => {
            const isSelected = filter.colors.includes(col.name);
            return (
              <button
                key={col.name}
                onClick={() => dispatch(toggleColor(col.name))}
                style={{ backgroundColor: col.hex }}
                className={`w-8 h-8 rounded-full border-2 transition-all transform hover:scale-110 ${
                  isSelected ? 'border-black ring-2 ring-black/20 scale-110' : 'border-transparent'
                }`}
                title={col.name}
              />
            );
          })}
        </div>
      </div>

      {/* Size Filter */}
      <div className="border-b border-gray-100 pb-6 space-y-3">
        <h4 className="font-bold text-sm text-black">Size</h4>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((sz) => {
            const isSelected = filter.sizes.includes(sz);
            return (
              <button
                key={sz}
                onClick={() => dispatch(toggleSize(sz))}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-black text-white'
                    : 'bg-[#F0F0F0] text-gray-600 hover:bg-gray-200'
                }`}
              >
                {sz}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dress Style Filter */}
      <div className="space-y-3">
        <h4 className="font-bold text-sm text-black">Dress Style</h4>
        <div className="space-y-2">
          {STYLES.map((st) => (
            <button
              key={st}
              onClick={() => dispatch(setStyle(st))}
              className={`w-full flex items-center justify-between text-sm py-1 transition-colors ${
                filter.style === st ? 'font-bold text-black' : 'text-gray-600 hover:text-black'
              }`}
            >
              <span>{st}</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
