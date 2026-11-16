import React, { useState } from 'react';
import { Mail, Sparkles, Check, Copy } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Newsletter: React.FC = () => {
  const { applyPromoCode, showToast } = useShop();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    setIsSubscribed(true);
    applyPromoCode('WELCOME20');
    showToast('Welcome to the HerCloset Circle! 20% code WELCOME20 applied.');
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    showToast(`Code ${code} copied to clipboard!`);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section className="py-12 sm:py-16 bg-[#2A1E1D] text-white relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C85A70]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#543834]/40 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-[#F4B8C5] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Join the HerCloset Circle</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF8F5]">
              Enjoy $20 Off Your First Order
            </h2>
            
            <p className="text-xs sm:text-sm text-[#EFE6DE]/80 max-w-lg mx-auto lg:mx-0">
              Subscribe for private atelier previews, early access to limited edition seasonal drops, and bespoke styling guides directly from our creative directors.
            </p>
          </div>

          {/* Right Signup Box & Promo Code Card */}
          <div className="lg:col-span-5">
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="email"
                      placeholder="Enter your email address..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-2xl text-xs text-white placeholder:text-stone-400 focus:outline-none focus:border-[#F4B8C5] focus:bg-white/15 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-[#C85A70] hover:bg-[#A84558] text-white px-6 py-3.5 rounded-2xl text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer shrink-0"
                  >
                    Unlock $20 Off
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#EFE6DE]/60 px-1">
                  <span>*No spam, unsubscribe anytime with one click.</span>
                  <div 
                    onClick={() => copyCode('HERSTORY')}
                    className="flex items-center gap-1 text-[#F4B8C5] hover:underline cursor-pointer"
                  >
                    <span>Instant Code: <strong>HERSTORY</strong></span>
                    {copiedCode ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </div>
                </div>
              </form>
            ) : (
              <div className="p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-[#F4B8C5]/40 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-[#C85A70] text-white mx-auto flex items-center justify-center">
                  <Check className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white">Welcome to HerCloset!</h3>
                <p className="text-xs text-[#EFE6DE]">
                  Your VIP coupon <strong>WELCOME20</strong> has been automatically applied to your cart!
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
