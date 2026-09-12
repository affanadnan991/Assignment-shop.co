'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeAuthModal, setAuthModalTab, loginSuccess } from '@/store/slices/authSlice';
import { authService } from '@/services/authService';
import { X, Mail, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AuthModal() {
  const dispatch = useAppDispatch();
  const { isAuthModalOpen, authModalTab } = useAppSelector((state) => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      if (authModalTab === 'login') {
        if (!email || !password) {
          throw new Error('Please enter email and password');
        }
        const data = await authService.login(email, password);
        dispatch(loginSuccess(data));
        setSuccessMessage('Logged in successfully!');
        setTimeout(() => {
          dispatch(closeAuthModal());
        }, 1200);
      } else {
        if (!name || !email || !password) {
          throw new Error('Please fill in all fields');
        }
        const data = await authService.signup(name, email, password);
        dispatch(loginSuccess(data));
        setSuccessMessage('Account created successfully!');
        setTimeout(() => {
          dispatch(closeAuthModal());
        }, 1200);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTabSwitch = (tab: 'login' | 'signup') => {
    dispatch(setAuthModalTab(tab));
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => dispatch(closeAuthModal())}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="pt-8 px-8 pb-4 text-center">
          <h2 className="font-integral text-3xl text-black uppercase tracking-tight">
            SHOP.CO
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {authModalTab === 'login' ? 'Welcome back! Sign in to continue' : 'Create an account to start shopping'}
          </p>

          {/* Navigation Tabs */}
          <div className="grid grid-cols-2 bg-[#F0F0F0] p-1 rounded-full mt-6 text-sm font-medium">
            <button
              onClick={() => handleTabSwitch('login')}
              className={`py-2.5 rounded-full transition-all ${
                authModalTab === 'login'
                  ? 'bg-black text-white shadow-md'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => handleTabSwitch('signup')}
              className={`py-2.5 rounded-full transition-all ${
                authModalTab === 'signup'
                  ? 'bg-black text-white shadow-md'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-8 pt-2">
          {error && (
            <div className="mb-4 p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2 text-red-600 text-xs font-medium animate-in slide-in-from-top-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-emerald-600 text-xs font-medium animate-in slide-in-from-top-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {authModalTab === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5 ml-1">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-gray-400 absolute left-4" />
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-[#F0F0F0] rounded-2xl text-sm border border-transparent focus:bg-white focus:border-black outline-none transition-all text-black"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5 ml-1">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-gray-400 absolute left-4" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-[#F0F0F0] rounded-2xl text-sm border border-transparent focus:bg-white focus:border-black outline-none transition-all text-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5 ml-1">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-gray-400 absolute left-4" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3 bg-[#F0F0F0] rounded-2xl text-sm border border-transparent focus:bg-white focus:border-black outline-none transition-all text-black"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-gray-400 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white font-medium py-3.5 px-6 rounded-full hover:bg-gray-800 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg mt-6 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{authModalTab === 'login' ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Social Demo Divider */}
          <div className="relative my-6 text-center">
            <hr className="border-gray-200" />
            <span className="bg-white px-3 text-xs text-gray-400 uppercase absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-medium">
              Or continue with
            </span>
          </div>

          {/* Demo Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                dispatch(
                  loginSuccess({
                    user: {
                      id: `usr_google_${Date.now()}`,
                      name: 'Google User',
                      email: 'google.user@example.com',
                      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GoogleUser',
                    },
                    token: `google_token_${Date.now()}`,
                  })
                );
                dispatch(closeAuthModal());
              }}
              className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-full text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Google
            </button>

            <button
              type="button"
              onClick={() => {
                dispatch(
                  loginSuccess({
                    user: {
                      id: `usr_apple_${Date.now()}`,
                      name: 'Apple User',
                      email: 'apple.user@example.com',
                      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AppleUser',
                    },
                    token: `apple_token_${Date.now()}`,
                  })
                );
                dispatch(closeAuthModal());
              }}
              className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-full text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
