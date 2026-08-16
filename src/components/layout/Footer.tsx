'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#F0F0F0] text-black relative mt-32">
      {/* Floating Newsletter Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 absolute left-0 right-0 -top-24 sm:-top-28">
        <div className="bg-black text-white rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <h2 className="font-integral text-2xl sm:text-4xl tracking-tight leading-tight max-w-xl text-center md:text-left uppercase">
            STAY UP TO DATE ABOUT OUR LATEST OFFERS
          </h2>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col gap-3.5 min-w-[280px] sm:min-w-[340px]">
            <div className="flex items-center bg-white rounded-full px-4 py-3 gap-3">
              <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-transparent border-none outline-none w-full text-sm text-black placeholder:text-gray-400"
              />
            </div>

            <button
              type="submit"
              className="bg-white text-black font-medium text-sm py-3 px-6 rounded-full hover:bg-gray-200 transition-colors w-full cursor-pointer"
            >
              {subscribed ? 'Subscribed Successfully!' : 'Subscribe to Newsletter'}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 sm:pt-40 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12 border-b border-gray-200 pb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="font-integral text-2xl sm:text-3xl tracking-tighter uppercase">
              SHOP.CO
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              We have clothes that suit your style and which you&apos;re proud to wear. From women to men.
            </p>

            {/* Social Icons SVGs */}
            <div className="flex items-center gap-3 pt-2">
              {/* Twitter / X */}
              <a href="#" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center bg-white hover:bg-black hover:text-white transition-colors p-2" aria-label="Twitter">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center bg-black text-white hover:bg-gray-800 transition-colors p-2" aria-label="Facebook">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center bg-white hover:bg-black hover:text-white transition-colors p-2" aria-label="Instagram">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* GitHub */}
              <a href="#" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center bg-white hover:bg-black hover:text-white transition-colors p-2" aria-label="GitHub">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h3 className="font-semibold text-sm tracking-wider uppercase mb-4 text-black">COMPANY</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-black transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Features</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Works</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Career</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h3 className="font-semibold text-sm tracking-wider uppercase mb-4 text-black">HELP</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-black transition-colors">Customer Support</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Delivery Details</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Terms & Conditions</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h3 className="font-semibold text-sm tracking-wider uppercase mb-4 text-black">FAQ</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-black transition-colors">Account</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Manage Deliveries</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Orders</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Payments</Link></li>
            </ul>
          </div>

          {/* Links Column 4 */}
          <div>
            <h3 className="font-semibold text-sm tracking-wider uppercase mb-4 text-black">RESOURCES</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-black transition-colors">Free eBooks</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Development Tutorial</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">How to - Blog</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Youtube Playlist</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4 text-xs text-gray-500">
          <p>Shop.co © 2000-2026, All Rights Reserved</p>

          <div className="flex items-center gap-2">
            <span className="bg-white px-2.5 py-1 rounded border border-gray-200 text-[10px] font-bold text-gray-700">VISA</span>
            <span className="bg-white px-2.5 py-1 rounded border border-gray-200 text-[10px] font-bold text-gray-700">Mastercard</span>
            <span className="bg-white px-2.5 py-1 rounded border border-gray-200 text-[10px] font-bold text-blue-700">PayPal</span>
            <span className="bg-white px-2.5 py-1 rounded border border-gray-200 text-[10px] font-bold text-black">Apple Pay</span>
            <span className="bg-white px-2.5 py-1 rounded border border-gray-200 text-[10px] font-bold text-gray-700">G Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
