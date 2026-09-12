'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  removeFromCart,
  updateQuantity,
  applyPromoCode,
  clearCart,
} from '@/store/slices/cartSlice';
import { Trash2, Tag, ArrowRight, Minus, Plus, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { items, promoCode, discountRate } = useAppSelector((state) => state.cart);
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [branch, setBranch] = useState('USA');
  const [paymentType, setPaymentType] = useState('Card');
  const [placingOrder, setPlacingOrder] = useState(false);

  // Calculations
  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const discountAmount = subtotal * discountRate;
  const deliveryFee = items.length > 0 ? 15 : 0;
  const total = subtotal - discountAmount + deliveryFee;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerEmail.trim()) {
      return alert('Please enter customer name and email.');
    }

    setPlacingOrder(true);
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    try {
      const orderPayload = {
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        branch,
        paymentType,
        quantity: items.reduce((sum, i) => sum + i.quantity, 0),
        totalAmount: Number(total.toFixed(2)),
        status: 'Pending',
        items: items.map((i) => ({
          id: i.product.id,
          name: i.product.name,
          price: i.product.price,
          quantity: i.quantity,
          selectedColor: i.selectedColor,
          selectedSize: i.selectedSize
        }))
      };

      const res = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      const json = await res.json();
      if (res.ok && json.success) {
        alert(`🎉 Order Placed Successfully!\nOrder ID: ${json.data.id}\nYour order has been sent to shop.co for verification.`);
        dispatch(clearCart());
        setIsCheckoutOpen(false);
      } else {
        alert('Failed to place order: ' + (json.message || 'Unknown error'));
      }
    } catch (err: any) {
      alert('Error connecting to backend: ' + err.message);
    } finally {
      setPlacingOrder(false);
    }
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    dispatch(applyPromoCode(promoInput));

    const codeUpper = promoInput.trim().toUpperCase();
    if (codeUpper === 'SHOP20' || codeUpper === 'DISCOUNT20' || codeUpper === 'SHOP10') {
      setPromoMessage({ text: `Promo code ${codeUpper} applied!`, isError: false });
    } else {
      setPromoMessage({ text: 'Invalid promo code. Try "SHOP20"', isError: true });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-black transition-colors">Home</Link>
        <span>&gt;</span>
        <span className="font-semibold text-black">Cart</span>
      </nav>

      <h1 className="font-integral text-3xl sm:text-5xl text-black uppercase tracking-tight mb-8">
        YOUR CART
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl space-y-6">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto text-gray-500">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-black">Your Cart is Empty</h2>
          <p className="text-gray-500 max-w-sm mx-auto text-sm">
            Looks like you haven&apos;t added any clothes to your cart yet. Explore our collection!
          </p>
          <Link
            href="/shop"
            className="inline-block bg-black text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors shadow-lg"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Cart Items List */}
          <div className="lg:col-span-7 border border-gray-200 rounded-3xl p-6 space-y-6 bg-white">
            {items.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedColor.hex}-${item.selectedSize}-${idx}`}
                className={`flex gap-4 sm:gap-6 ${idx !== items.length - 1 ? 'border-b border-gray-100 pb-6' : ''
                  }`}
              >
                {/* Product Thumbnail */}
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-[#F0EEED] rounded-2xl overflow-hidden flex-shrink-0">
                  <Image
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Details & Actions */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-black uppercase">
                        {item.product.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Size: <span className="text-black font-medium">{item.selectedSize}</span>
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1.5">
                        Color:
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-gray-300 inline-block"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        <span className="text-black font-medium">{item.selectedColor.name}</span>
                      </p>
                    </div>

                    {/* Delete Item Button */}
                    <button
                      onClick={() =>
                        dispatch(
                          removeFromCart({
                            productId: item.product.id,
                            colorHex: item.selectedColor.hex,
                            size: item.selectedSize,
                          })
                        )
                      }
                      className="text-red-500 hover:text-red-700 transition-colors p-1"
                      aria-label="Remove Item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Price & Quantity Stepper */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-bold text-xl sm:text-2xl text-black">
                      ${item.product.price}
                    </span>

                    <div className="flex items-center bg-[#F0F0F0] rounded-full px-4 py-2 gap-4">
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              productId: item.product.id,
                              colorHex: item.selectedColor.hex,
                              size: item.selectedSize,
                              quantity: item.quantity - 1,
                            })
                          )
                        }
                        className="text-black hover:opacity-70"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-bold text-sm text-black min-w-[16px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              productId: item.product.id,
                              colorHex: item.selectedColor.hex,
                              size: item.selectedSize,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                        className="text-black hover:opacity-70"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            ))}

            <div className="pt-2 text-right">
              <button
                onClick={() => dispatch(clearCart())}
                className="text-xs text-gray-500 hover:text-red-600 underline underline-offset-4"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="lg:col-span-5 border border-gray-200 rounded-3xl p-6 space-y-6 bg-white sticky top-24">
            <h2 className="font-bold text-2xl text-black">Order Summary</h2>

            <div className="space-y-4 text-sm sm:text-base border-b border-gray-100 pb-6">
              <div className="flex items-center justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-bold text-black">${subtotal}</span>
              </div>

              <div className="flex items-center justify-between text-gray-600">
                <span>Discount ({discountRate * 100}%)</span>
                <span className="font-bold text-red-500">-${discountAmount.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span className="font-bold text-black">${deliveryFee}</span>
              </div>

              <div className="flex items-center justify-between text-black font-bold text-lg pt-2 border-t border-gray-100">
                <span>Total</span>
                <span className="text-2xl">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Promo Code Box */}
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <div className="flex gap-2">
                <div className="flex-1 flex items-center bg-[#F0F0F0] rounded-full px-4 py-3 gap-2">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Add promo code (e.g. SHOP20)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="bg-transparent border-none outline-none w-full text-xs sm:text-sm text-black placeholder:text-gray-400 uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Apply
                </button>
              </div>

              {promoMessage && (
                <p className={`text-xs font-medium ${promoMessage.isError ? 'text-red-500' : 'text-emerald-600'}`}>
                  {promoMessage.text}
                </p>
              )}
            </form>

            {/* Checkout Button */}
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full bg-black text-white text-base font-medium py-4 rounded-full flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors shadow-xl"
            >
              Go to Checkout <ArrowRight className="w-5 h-5" />
            </button>

          </div>

        </div>
      )}

      {/* CHECKOUT MODAL */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="font-bold text-xl text-black">Checkout & Place Order</h3>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="text-gray-400 hover:text-black font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-4 text-sm">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 text-black focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. john@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 text-black focus:outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Branch / Country</label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full bg-gray-100 border border-gray-200 rounded-xl px-3 py-2.5 text-black focus:outline-none focus:border-black"
                  >
                    <option value="USA">USA</option>
                    <option value="Canada">Canada</option>
                    <option value="UK">UK</option>
                    <option value="India">India</option>
                    <option value="Germany">Germany</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Payment Method</label>
                  <select
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value)}
                    className="w-full bg-gray-100 border border-gray-200 rounded-xl px-3 py-2.5 text-black focus:outline-none focus:border-black"
                  >
                    <option value="Card">Card</option>
                    <option value="Paypal">Paypal</option>
                    <option value="UPI">UPI</option>
                    <option value="Cash">Cash</option>
                  </select>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 space-y-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Items Count:</span>
                  <span className="font-bold text-black">{items.reduce((s, i) => s + i.quantity, 0)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-black pt-1 border-t">
                  <span>Order Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(false)}
                  className="px-5 py-2.5 rounded-full text-gray-500 hover:text-black font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={placingOrder}
                  className="px-7 py-2.5 rounded-full bg-black text-white font-bold hover:bg-gray-800 shadow-lg disabled:opacity-50"
                >
                  {placingOrder ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
