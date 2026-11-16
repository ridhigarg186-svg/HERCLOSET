import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RotateCcw, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Hero: React.FC = () => {
  const { setIsAIAssistantOpen, setSelectedCategory } = useShop();

  const scrollToShop = (category: string = 'All') => {
    setSelectedCategory(category);
    const el = document.getElementById('shop-collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-[#FDF2F4] via-[#FAF8F5] to-[#FAF8F5] pt-6 pb-12 sm:pt-10 sm:pb-16 border-b border-[#EFE6DE]">
      {/* Decorative subtle ambient circles */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#FCE7EC]/50 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute -bottom-10 right-10 w-80 h-80 bg-[#EFE6DE]/40 rounded-full blur-2xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand Editorial Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 self-center lg:self-start bg-white/90 backdrop-blur-sm border border-[#F4B8C5] px-4 py-1.5 rounded-full shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-[#C85A70] animate-pulse"></span>
              <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[#2A1E1D]">
                New Season Collection • Spring / Summer '26
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2A1E1D] leading-[1.12]">
                Elegance Defined.<br />
                <span className="italic font-normal text-[#C85A70]">Your Style,</span> Your Story.
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-[#543834] max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Step into a world of curated silhouettes tailored for modern grace. From lustrous mulberry silk dresses and boardroom-sharp blazers to handcrafted heritage ethnic wear — designed to celebrate your individuality.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                onClick={() => scrollToShop('All')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#2A1E1D] hover:bg-[#3D2826] text-white px-8 py-3.5 rounded-full font-medium text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 text-[#F4B8C5]" />
              </button>

              <button
                onClick={() => setIsAIAssistantOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FDF2F4] text-[#2A1E1D] border border-[#F4B8C5] px-7 py-3.5 rounded-full font-semibold text-sm shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer group"
              >
                <Sparkles className="w-4 h-4 text-[#C85A70] group-hover:rotate-12 transition-transform" />
                <span>Consult AI Stylist</span>
              </button>
            </div>

            {/* Fashion Highlights & Trust Counters */}
            <div className="pt-4 border-t border-[#EFE6DE]/70 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-[#2A1E1D]">100%</p>
                <p className="text-[11px] sm:text-xs text-[#543834] font-medium">Ethical Pure Fabrics</p>
              </div>
              <div className="border-l border-[#EFE6DE] pl-4">
                <p className="font-serif text-2xl sm:text-3xl font-bold text-[#C85A70]">4.9★</p>
                <p className="text-[11px] sm:text-xs text-[#543834] font-medium">10,000+ Happy Women</p>
              </div>
              <div className="border-l border-[#EFE6DE] pl-4">
                <p className="font-serif text-2xl sm:text-3xl font-bold text-[#2A1E1D]">30 Days</p>
                <p className="text-[11px] sm:text-xs text-[#543834] font-medium">Complimentary Returns</p>
              </div>
            </div>

          </div>

          {/* Right Column: Editorial Visual Showcase with Floating Cards */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Primary Large Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[3/4] bg-[#EFE6DE]">
                <img
                  src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1200&q=85"
                  alt="HerCloset Editorial Woman in Silk Dress"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                
                {/* Gradient overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* In-Image Tag */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#F4B8C5] block mb-1">
                    Featured Look
                  </span>
                  <p className="font-serif text-xl sm:text-2xl font-semibold">
                    The Mulberry Silk Reverie
                  </p>
                  <p className="text-xs text-stone-200 mt-0.5">
                    Paired with handcrafted 18K vermeil pendant
                  </p>
                </div>
              </div>

              {/* Floating Miniature Card 1: Best Seller Badge */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-[#FCE7EC] flex items-center gap-3 animate-float">
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#FAF8F5]">
                  <img
                    src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=200&q=80"
                    alt="Slip dress preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-[#C85A70]">
                    <Sparkles className="w-3 h-3" />
                    <span>Trending Favorite</span>
                  </div>
                  <p className="text-xs font-bold text-[#2A1E1D]">Aura Silk Slip Dress</p>
                  <p className="text-[11px] text-[#543834] font-medium">$139 <span className="line-through text-stone-400">$185</span></p>
                </div>
              </div>

              {/* Floating Miniature Card 2: AI Stylist Tip */}
              <div 
                onClick={() => setIsAIAssistantOpen(true)}
                className="absolute -bottom-5 -right-3 sm:-right-5 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-[#F4B8C5] flex items-center gap-3 cursor-pointer hover:bg-[#FDF2F4] transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-[#FCE7EC] flex items-center justify-center text-[#C85A70]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#2A1E1D]">Style Match Guarantee</p>
                  <p className="text-[10px] text-[#543834]">Click to ask our AI Stylist</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Feature Benefits Strip */}
        <div className="mt-14 pt-8 border-t border-[#EFE6DE] grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#FDF2F4] border border-[#F4B8C5]/50 flex items-center justify-center shrink-0 text-[#C85A70]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#2A1E1D]">Complimentary Shipping</p>
              <p className="text-[11px] text-[#543834]">Free express delivery on $99+</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#FDF2F4] border border-[#F4B8C5]/50 flex items-center justify-center shrink-0 text-[#C85A70]">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#2A1E1D]">30-Day Easy Returns</p>
              <p className="text-[11px] text-[#543834]">Prepaid return label included</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#FDF2F4] border border-[#F4B8C5]/50 flex items-center justify-center shrink-0 text-[#C85A70]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#2A1E1D]">AI Wardrobe Stylist</p>
              <p className="text-[11px] text-[#543834]">Instant sizing & outfit pairings</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#FDF2F4] border border-[#F4B8C5]/50 flex items-center justify-center shrink-0 text-[#C85A70]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#2A1E1D]">Artisanal Integrity</p>
              <p className="text-[11px] text-[#543834]">Pure silks & ethical tailoring</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
