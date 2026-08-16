import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  promoCode: string;
  discountRate: number; // e.g. 0.2 for 20%
}

const getInitialCart = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('shopco_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cart state:', e);
      }
    }
  }
  return [];
};

const initialState: CartState = {
  items: getInitialCart(),
  promoCode: '',
  discountRate: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        product: Product;
        selectedColor: { name: string; hex: string };
        selectedSize: string;
        quantity: number;
      }>
    ) => {
      const { product, selectedColor, selectedSize, quantity } = action.payload;
      const existingIndex = state.items.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor.hex === selectedColor.hex &&
          item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        state.items[existingIndex].quantity += quantity;
      } else {
        state.items.push({ product, selectedColor, selectedSize, quantity });
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('shopco_cart', JSON.stringify(state.items));
      }
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ productId: string; colorHex: string; size: string }>
    ) => {
      const { productId, colorHex, size } = action.payload;
      state.items = state.items.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedColor.hex === colorHex &&
            item.selectedSize === size
          )
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem('shopco_cart', JSON.stringify(state.items));
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        colorHex: string;
        size: string;
        quantity: number;
      }>
    ) => {
      const { productId, colorHex, size, quantity } = action.payload;
      const item = state.items.find(
        (i) =>
          i.product.id === productId &&
          i.selectedColor.hex === colorHex &&
          i.selectedSize === size
      );
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(
            (i) => i !== item
          );
        } else {
          item.quantity = quantity;
        }
        if (typeof window !== 'undefined') {
          localStorage.setItem('shopco_cart', JSON.stringify(state.items));
        }
      }
    },
    applyPromoCode: (state, action: PayloadAction<string>) => {
      const code = action.payload.trim().toUpperCase();
      if (code === 'SHOP20' || code === 'DISCOUNT20') {
        state.promoCode = code;
        state.discountRate = 0.2; // 20% off
      } else if (code === 'SHOP10') {
        state.promoCode = code;
        state.discountRate = 0.1; // 10% off
      } else {
        state.promoCode = '';
        state.discountRate = 0;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.promoCode = '';
      state.discountRate = 0;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('shopco_cart');
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  applyPromoCode,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
