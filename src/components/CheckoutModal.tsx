import React, { useState } from 'react';
import { X, CheckCircle2, CreditCard, ShieldCheck, Truck, ArrowRight, Lock, Sparkles } from 'lucide-react';
import { useShop, CartItem } from '../context/ShopContext';
import { Product } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  directBuyItem?: { product: Product; color: string; size: string; quantity: number } | null;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  directBuyItem
}) => {
  const { cart, total, discountAmount, appliedPromo, clearCart, showToast } = useShop();

  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmed'>('shipping');
  const [formData, setFormData] = useState({
    firstName: 'Eleanor',
    lastName: 'Vance',
    email: 'eleanor.vance@example.com',
    phone: '+1 (555) 234-5678',
    address: '450 Lexington Avenue, Suite 1800',
    city: 'New York',
    state: 'NY',
    zipCode: '10017',
    country: 'United States',
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '•••'
  });

  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  // Items to checkout: either direct buy item or cart items
  const checkoutItems: CartItem[] = directBuyItem
    ? [{ product: directBuyItem.product, selectedColor: directBuyItem.color, selectedSize: directBuyItem.size, quantity: directBuyItem.quantity }]
    : cart;

  const checkoutSubtotal = checkoutItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const checkoutDiscount = appliedPromo ? Math.round((checkoutSubtotal * appliedPromo.discountPct) / 100) : 0;
  const isFreeShipping = checkoutSubtotal - checkoutDiscount >= 99;
  const checkoutShipping = isFreeShipping ? 0 : 12;
  const checkoutTotal = Math.max(0, checkoutSubtotal - checkoutDiscount + checkoutShipping);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrderNum = `HC-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrderNum);
    setStep('confirmed');
    if (!directBuyItem) {
      clearCart();
    }
    showToast(`Order #${generatedOrderNum} confirmed! Thank you.`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-fadeIn">
      <div className="relative bg-[#FAF8F5] rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#EFE6DE]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#EFE6DE] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#C85A70]" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2A1E1D]">
              {step === 'confirmed' ? 'Order Confirmed!' : 'Secure Checkout'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-[#2A1E1D] transition-colors rounded-full"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'confirmed' ? (
          /* Confirmation Screen */
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-50 rounded-full border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-600 animate-scaleIn">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest text-[#C85A70]">
                Thank you, {formData.firstName}!
              </span>
              <h3 className="font-serif text-3xl font-bold text-[#2A1E1D]">
                Your HerCloset Order is on Its Way
              </h3>
              <p className="text-xs sm:text-sm text-[#543834] max-w-md mx-auto">
                We have sent an order receipt and live tracking details to <strong>{formData.email}</strong>.
              </p>
            </div>

            {/* Order Details Card */}
            <div className="bg-white rounded-2xl p-5 border border-[#EFE6DE] max-w-md mx-auto text-left space-y-3 text-xs">
              <div className="flex justify-between border-b border-[#FAF8F5] pb-2">
                <span className="text-stone-400">Order Number</span>
                <span className="font-bold text-[#2A1E1D]">{orderNumber}</span>
              </div>
              <div className="flex justify-between border-b border-[#FAF8F5] pb-2">
                <span className="text-stone-400">Estimated Delivery</span>
                <span className="font-semibold text-emerald-700">3-4 Business Days (Express)</span>
              </div>
              <div className="flex justify-between border-b border-[#FAF8F5] pb-2">
                <span className="text-stone-400">Shipping Address</span>
                <span className="font-medium text-[#2A1E1D]">{formData.address}, {formData.city}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-[#2A1E1D] pt-1">
                <span>Total Paid</span>
                <span className="text-[#C85A70]">${checkoutTotal}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3.5 bg-[#2A1E1D] hover:bg-[#3D2826] text-white rounded-full text-xs font-semibold tracking-wide transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          /* Checkout Steps */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8">
            
            {/* Form Column */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Stepper Tabs */}
              <div className="flex items-center gap-4 border-b border-[#EFE6DE] pb-3 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className={`pb-1 transition-colors ${
                    step === 'shipping' ? 'border-b-2 border-[#C85A70] text-[#C85A70]' : 'text-stone-400'
                  }`}
                >
                  1. Shipping Details
                </button>
                <button
                  type="button"
                  onClick={() => setStep('payment')}
                  className={`pb-1 transition-colors ${
                    step === 'payment' ? 'border-b-2 border-[#C85A70] text-[#C85A70]' : 'text-stone-400'
                  }`}
                >
                  2. Payment & Place Order
                </button>
              </div>

              {step === 'shipping' ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-[#2A1E1D] block mb-1">First Name</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full text-xs p-2.5 bg-white border border-[#EFE6DE] rounded-xl focus:outline-none focus:border-[#C85A70]"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-[#2A1E1D] block mb-1">Last Name</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full text-xs p-2.5 bg-white border border-[#EFE6DE] rounded-xl focus:outline-none focus:border-[#C85A70]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-[#2A1E1D] block mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs p-2.5 bg-white border border-[#EFE6DE] rounded-xl focus:outline-none focus:border-[#C85A70]"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-[#2A1E1D] block mb-1">Street Address</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full text-xs p-2.5 bg-white border border-[#EFE6DE] rounded-xl focus:outline-none focus:border-[#C85A70]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-[#2A1E1D] block mb-1">City</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full text-xs p-2.5 bg-white border border-[#EFE6DE] rounded-xl focus:outline-none focus:border-[#C85A70]"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-[#2A1E1D] block mb-1">State</label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full text-xs p-2.5 bg-white border border-[#EFE6DE] rounded-xl focus:outline-none focus:border-[#C85A70]"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-[#2A1E1D] block mb-1">Zip Code</label>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        className="w-full text-xs p-2.5 bg-white border border-[#EFE6DE] rounded-xl focus:outline-none focus:border-[#C85A70]"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep('payment')}
                    className="w-full py-3.5 bg-[#2A1E1D] hover:bg-[#3D2826] text-white rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer mt-4"
                  >
                    <span>Continue to Payment</span>
                    <ArrowRight className="w-4 h-4 text-[#F4B8C5]" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  {/* Payment method selector */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-semibold text-[#2A1E1D] block">Select Payment Method</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                        className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                          formData.paymentMethod === 'card'
                            ? 'border-[#C85A70] bg-[#FDF2F4] text-[#C85A70]'
                            : 'border-[#EFE6DE] bg-white text-[#2A1E1D]'
                        }`}
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Credit Card</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: 'applepay' })}
                        className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                          formData.paymentMethod === 'applepay'
                            ? 'border-[#C85A70] bg-[#FDF2F4] text-[#C85A70]'
                            : 'border-[#EFE6DE] bg-white text-[#2A1E1D]'
                        }`}
                      >
                        <span className="font-bold"> Pay</span>
                        <span>Apple Pay</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                        className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                          formData.paymentMethod === 'cod'
                            ? 'border-[#C85A70] bg-[#FDF2F4] text-[#C85A70]'
                            : 'border-[#EFE6DE] bg-white text-[#2A1E1D]'
                        }`}
                      >
                        <Truck className="w-4 h-4" />
                        <span>Pay on Delivery</span>
                      </button>
                    </div>
                  </div>

                  {formData.paymentMethod === 'card' && (
                    <div className="space-y-3 bg-white p-4 rounded-2xl border border-[#EFE6DE]">
                      <div>
                        <label className="text-[11px] font-semibold text-[#2A1E1D] block mb-1">Card Number</label>
                        <input
                          type="text"
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                          className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#EFE6DE] rounded-xl font-mono"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-semibold text-[#2A1E1D] block mb-1">Expiry</label>
                          <input
                            type="text"
                            value={formData.cardExp}
                            onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                            className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#EFE6DE] rounded-xl font-mono"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-[#2A1E1D] block mb-1">CVC</label>
                          <input
                            type="text"
                            value={formData.cardCvc}
                            onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                            className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#EFE6DE] rounded-xl font-mono"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-stone-400 text-xs pt-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>256-bit SSL encrypted & tokenized checkout</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep('shipping')}
                      className="px-4 py-3 bg-white border border-[#EFE6DE] rounded-2xl text-xs font-semibold text-[#2A1E1D]"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3.5 bg-[#C85A70] hover:bg-[#A84558] text-white rounded-2xl text-xs font-semibold shadow-md transition-all cursor-pointer"
                    >
                      Place Order — ${checkoutTotal}
                    </button>
                  </div>
                </form>
              )}

            </div>

            {/* Order Summary Column */}
            <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-[#EFE6DE] space-y-4">
              <h3 className="font-serif text-base font-bold text-[#2A1E1D] border-b border-[#FAF8F5] pb-2">
                Order Summary ({checkoutItems.length})
              </h3>

              <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                {checkoutItems.map((item, idx) => (
                  <div key={idx} className="flex gap-3 text-xs">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-14 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#2A1E1D] truncate">{item.product.name}</p>
                      <p className="text-[11px] text-stone-400">
                        {item.selectedColor} • {item.selectedSize} (x{item.quantity})
                      </p>
                      <p className="font-semibold text-[#C85A70] mt-0.5">${item.product.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#FAF8F5] pt-3 space-y-2 text-xs text-[#543834]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#2A1E1D]">${checkoutSubtotal}</span>
                </div>
                {checkoutDiscount > 0 && (
                  <div className="flex justify-between text-[#C85A70] font-semibold">
                    <span>Discount ({appliedPromo?.code})</span>
                    <span>-${checkoutDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Shipping</span>
                  <span>{isFreeShipping ? <strong className="text-emerald-700">FREE</strong> : '$12'}</span>
                </div>
                <div className="flex justify-between font-bold text-base text-[#2A1E1D] pt-2 border-t border-[#FAF8F5]">
                  <span className="font-serif">Total Due</span>
                  <span className="font-serif text-[#C85A70]">${checkoutTotal}</span>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
