import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Tag, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { STORE_POLICIES } from '../data/products';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onProceedToCheckout }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    total,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    freeShippingRemaining,
    openProductModal
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput.trim()) return;

    const res = applyPromoCode(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoInput('');
    }
  };

  const freeShippingPct = Math.min(100, Math.round(((STORE_POLICIES.freeShippingThreshold - freeShippingRemaining) / STORE_POLICIES.freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col justify-between border-l border-[#EFE6DE]">
          
          {/* Drawer Header */}
          <div className="p-5 sm:p-6 border-b border-[#EFE6DE] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C85A70]" />
              <h2 className="font-serif text-xl font-bold text-[#2A1E1D]">Shopping Bag</h2>
              <span className="text-xs font-semibold bg-[#FDF2F4] text-[#C85A70] px-2 py-0.5 rounded-full border border-[#F4B8C5]">
                {cart.length} {cart.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-stone-400 hover:text-[#2A1E1D] transition-colors rounded-full"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-[#FDF2F4] p-3.5 border-b border-[#F4B8C5]/40 text-xs">
            {freeShippingRemaining > 0 ? (
              <p className="text-[#543834] font-medium text-center">
                Add <strong className="text-[#C85A70]">${freeShippingRemaining}</strong> more for <strong>Free Express Shipping</strong>!
              </p>
            ) : (
              <p className="text-emerald-700 font-bold text-center flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>You’ve unlocked Free Express Shipping!</span>
              </p>
            )}
            <div className="w-full bg-[#EFE6DE] h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-[#C85A70] h-full transition-all duration-500 rounded-full" 
                style={{ width: `${freeShippingPct}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div 
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${index}`}
                  className="flex gap-4 p-3 bg-white rounded-2xl border border-[#EFE6DE] shadow-xs relative"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    onClick={() => {
                      setIsCartOpen(false);
                      openProductModal(item.product);
                    }}
                    className="w-20 h-24 object-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 
                          onClick={() => {
                            setIsCartOpen(false);
                            openProductModal(item.product);
                          }}
                          className="font-serif text-sm font-semibold text-[#2A1E1D] hover:text-[#C85A70] cursor-pointer line-clamp-1"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-stone-300 hover:text-rose-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-[11px] text-[#543834] mt-0.5">
                        Color: <span className="font-medium text-[#2A1E1D]">{item.selectedColor}</span> | Size: <span className="font-medium text-[#2A1E1D]">{item.selectedSize}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#FAF8F5]">
                      <div className="flex items-center bg-[#FAF8F5] border border-[#EFE6DE] rounded-lg">
                        <button
                          type="button"
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          className="p-1.5 text-stone-500 hover:text-black"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-[#2A1E1D]">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                          className="p-1.5 text-stone-500 hover:text-black"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-serif text-base font-bold text-[#2A1E1D]">
                          ${item.product.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#FDF2F4] border border-[#F4B8C5] flex items-center justify-center mx-auto text-[#C85A70]">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2A1E1D]">Your Bag is Empty</h3>
                <p className="text-xs text-[#543834] max-w-xs mx-auto">
                  Explore our curated collections of silk dresses, tailored blazers, and handcrafted ethnic wear to find your signature piece.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-6 py-2.5 bg-[#2A1E1D] text-white text-xs font-semibold rounded-full hover:bg-[#3D2826] transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>

          {/* Drawer Footer with Calculations & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 bg-white border-t border-[#EFE6DE] space-y-4">
              
              {/* Promo Code Input */}
              <div>
                {!appliedPromo ? (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                      <input
                        type="text"
                        placeholder="Promo code (e.g. HERSTORY)"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 bg-[#FAF8F5] border border-[#EFE6DE] rounded-xl text-xs uppercase tracking-wider text-[#2A1E1D] focus:outline-none focus:border-[#C85A70]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#2A1E1D] hover:bg-[#3D2826] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between p-2.5 bg-[#FDF2F4] rounded-xl border border-[#F4B8C5] text-xs">
                    <div className="flex items-center gap-1.5 text-[#C85A70] font-semibold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Code <strong>{appliedPromo.code}</strong> applied ({appliedPromo.discountPct}% off)</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-stone-400 hover:text-stone-600 text-[11px] underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {promoError && (
                  <p className="text-[11px] text-rose-600 mt-1 pl-1">{promoError}</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#543834]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#2A1E1D]">${subtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#C85A70] font-semibold">
                    <span>Discount ({appliedPromo?.code})</span>
                    <span>-${discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span>{freeShippingRemaining === 0 ? <strong className="text-emerald-700">FREE</strong> : '$12'}</span>
                </div>

                <div className="flex justify-between text-base font-bold text-[#2A1E1D] pt-2 border-t border-[#FAF8F5]">
                  <span className="font-serif">Total</span>
                  <span className="font-serif">${total + (freeShippingRemaining === 0 ? 0 : 12)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onProceedToCheckout();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#2A1E1D] hover:bg-[#C85A70] text-white py-4 rounded-2xl font-semibold text-xs tracking-wider shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#F4B8C5]" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
