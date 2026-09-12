'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/store/hooks';
import { loginSuccess } from '@/store/slices/authSlice';
import { authService } from '@/services/authService';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!email || !password) {
        throw new Error('Please enter your email and password');
      }

      const data = await authService.login(email, password);
      dispatch(loginSuccess(data));
      setSuccess(true);

      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full max-w-md bg-white border border-gray-100 shadow-xl rounded-3xl p-8 sm:p-10 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="font-integral text-3xl text-black uppercase tracking-tighter block">
            SHOP.CO
          </Link>
          <h1 className="text-2xl font-bold text-black tracking-tight">Sign In to Your Account</h1>
          <p className="text-gray-500 text-sm">Enter your credentials to access your profile and orders</p>
        </div>

        {/* Feedback Alerts */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-medium animate-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-600 text-sm font-medium animate-in slide-in-from-top-2">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>Logged in successfully! Redirecting...</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-2 ml-1">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="w-5 h-5 text-gray-400 absolute left-4" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-[#F0F0F0] rounded-2xl text-sm border border-transparent focus:bg-white focus:border-black outline-none transition-all text-black"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2 ml-1">
              <label className="text-xs font-semibold text-gray-700 uppercase">
                Password
              </label>
              <a href="#" className="text-xs text-gray-500 hover:text-black font-medium transition-colors">
                Forgot password?
              </a>
            </div>
            <div className="relative flex items-center">
              <Lock className="w-5 h-5 text-gray-400 absolute left-4" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3.5 bg-[#F0F0F0] rounded-2xl text-sm border border-transparent focus:bg-white focus:border-black outline-none transition-all text-black"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-gray-400 hover:text-black transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center gap-2 pt-1 ml-1">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
            />
            <label htmlFor="remember" className="text-xs text-gray-600 font-medium cursor-pointer">
              Remember me for 30 days
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white font-medium py-4 px-6 rounded-full hover:bg-gray-800 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg pt-4 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center pt-4 border-t border-gray-100 text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-bold text-black hover:underline ml-1">
            Sign up now
          </Link>
        </div>

      </div>
    </div>
  );
}
