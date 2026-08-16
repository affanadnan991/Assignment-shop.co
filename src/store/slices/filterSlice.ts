import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState } from '@/types';

const initialState: FilterState = {
  category: 'All',
  minPrice: 0,
  maxPrice: 500,
  colors: [],
  sizes: [],
  style: 'All',
  sortBy: 'most-popular',
  searchQuery: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.minPrice = action.payload.min;
      state.maxPrice = action.payload.max;
    },
    toggleColor: (state, action: PayloadAction<string>) => {
      const color = action.payload;
      if (state.colors.includes(color)) {
        state.colors = state.colors.filter((c) => c !== color);
      } else {
        state.colors.push(color);
      }
    },
    toggleSize: (state, action: PayloadAction<string>) => {
      const size = action.payload;
      if (state.sizes.includes(size)) {
        state.sizes = state.sizes.filter((s) => s !== size);
      } else {
        state.sizes.push(size);
      }
    },
    setStyle: (state, action: PayloadAction<string>) => {
      state.style = action.payload;
    },
    setSortBy: (state, action: PayloadAction<FilterState['sortBy']>) => {
      state.sortBy = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const {
  setCategory,
  setPriceRange,
  toggleColor,
  toggleSize,
  setStyle,
  setSortBy,
  setSearchQuery,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
