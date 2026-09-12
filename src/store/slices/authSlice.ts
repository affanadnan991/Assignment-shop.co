import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '@/types';

// Helper to get initial state from localStorage safely
const getInitialUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem('shop_co_user');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const getInitialToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem('shop_co_token');
  } catch {
    return null;
  }
};

const initialUser = getInitialUser();
const initialToken = getInitialToken();

const initialState: AuthState = {
  user: initialUser,
  token: initialToken,
  isAuthenticated: !!initialUser,
  isAuthModalOpen: false,
  authModalTab: 'login',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isAuthModalOpen = false;

      if (typeof window !== 'undefined') {
        localStorage.setItem('shop_co_user', JSON.stringify(action.payload.user));
        localStorage.setItem('shop_co_token', action.payload.token);
      }
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      if (typeof window !== 'undefined') {
        localStorage.removeItem('shop_co_user');
        localStorage.removeItem('shop_co_token');
      }
    },

    openAuthModal: (state, action: PayloadAction<'login' | 'signup' | undefined>) => {
      state.isAuthModalOpen = true;
      if (action.payload) {
        state.authModalTab = action.payload;
      }
    },

    closeAuthModal: (state) => {
      state.isAuthModalOpen = false;
    },

    setAuthModalTab: (state, action: PayloadAction<'login' | 'signup'>) => {
      state.authModalTab = action.payload;
    },

    initializeAuth: (state) => {
      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('shop_co_user');
        const storedToken = localStorage.getItem('shop_co_token');
        if (storedUser && storedToken) {
          try {
            state.user = JSON.parse(storedUser);
            state.token = storedToken;
            state.isAuthenticated = true;
          } catch {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
          }
        }
      }
    },
  },
});

export const {
  loginSuccess,
  logout,
  openAuthModal,
  closeAuthModal,
  setAuthModalTab,
  initializeAuth,
} = authSlice.actions;

export default authSlice.reducer;
