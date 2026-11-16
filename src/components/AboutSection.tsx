import React from 'react';
import { Sparkles, Feather, HeartHandshake, Leaf } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about-us" className="py-16 sm:py-24 bg-white border-t border-[#EFE6DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Montage */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden aspect-[3/4] shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80"
                    alt="Atelier fabric weaving"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 bg-[#FDF2F4] rounded-2xl border border-[#F4B8C5]/50">
                  <p className="font-serif text-2xl font-bold text-[#C85A70]">100%</p>
                  <p className="text-xs font-semibold text-[#2A1E1D]">Traceable Natural Fibers</p>
                  <p className="text-[11px] text-[#543834] mt-0.5">Grade 6A Mulberry Silk, European Flax & Chanderi</p>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EFE6DE]">
                  <p className="font-serif text-2xl font-bold text-[#2A1E1D]">350+</p>
                  <p className="text-xs font-semibold text-[#2A1E1D]">Master Artisans Empowered</p>
                  <p className="text-[11px] text-[#543834] mt-0.5">Heritage hand-embroidery & tilla craftsmanship</p>
                </div>
                <div className="rounded-3xl overflow-hidden aspect-[3/4] shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80"
                    alt="HerCloset Woman portrait"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Central Monogram Seal */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full border-4 border-[#FDF2F4] shadow-xl flex flex-col items-center justify-center text-center p-2">
              <span className="font-serif text-lg font-bold text-[#2A1E1D]">HC</span>
              <span className="text-[8px] uppercase tracking-widest text-[#C85A70]">Atelier</span>
            </div>
          </div>

          {/* Right Column: Story Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C85A70] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Brand Philosophy</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A1E1D] leading-tight">
              Fashion that honors who you are.
            </h2>

            <p className="text-xs sm:text-sm text-[#543834] leading-relaxed">
              At <strong>HerCloset</strong>, we believe every piece in your wardrobe is a chapter in your personal chronicle. Founded with a vision to eliminate fast fashion compromises, we blend timeless silhouette architecture with ethically sourced pure silks, European linen, and heirloom Indian textiles.
            </p>

            <p className="text-xs sm:text-sm text-[#543834] leading-relaxed">
              Whether you are commanding a boardroom, walking into an intimate sunset soiree, or celebrating heritage traditions, HerCloset gives you garments that breathe, move, and make you feel undeniably radiant.
            </p>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#EFE6DE]">
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-full bg-[#FDF2F4] flex items-center justify-center text-[#C85A70]">
                  <Feather className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-[#2A1E1D]">Zero Compromise</h3>
                <p className="text-[11px] text-[#543834]">Tailored for breathability and liquid silhouette drape.</p>
              </div>

              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-full bg-[#FDF2F4] flex items-center justify-center text-[#C85A70]">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-[#2A1E1D]">Fair Trade Artisans</h3>
                <p className="text-[11px] text-[#543834]">Supporting master handloom weavers and zardozi craftswomen.</p>
              </div>

              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-full bg-[#FDF2F4] flex items-center justify-center text-[#C85A70]">
                  <Leaf className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-[#2A1E1D]">Plastic-Free</h3>
                <p className="text-[11px] text-[#543834]">100% biodegradable keepsake boxes and recyclable liners.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
