import React from 'react';
import { Star, Quote, CheckCircle2, Heart } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Ananya Sharma',
    role: 'Architect & Creative Director',
    location: 'San Francisco, CA',
    quote: 'The Aura Silk Slip Dress is pure magic. I was hesitant about buying silk online, but the bias cut drapes so gracefully. The AI Stylist suggested pairing it with the Rose Quartz pendant, which made my anniversary dinner unforgettable.',
    rating: 5,
    outfit: 'Aura Silk Slip Dress in Blush Rose',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    name: 'Dr. Rebecca Vance',
    role: 'Biotech Executive',
    location: 'Boston, MA',
    quote: 'The Sienna Linen Blazer and Palazzo trousers have become my signature conference armor. Breathable, structured without stiffness, and the pockets are genuinely deep. HerCloset understands what working women actually need.',
    rating: 5,
    outfit: 'Sienna Tailored Blazer & Palazzo Trousers',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 3,
    name: 'Simran & Natasha',
    role: 'Bridesmaids & Designers',
    location: 'London, UK',
    quote: 'We ordered the Zahra Chanderi Anarkali sets for our best friend’s destination wedding. The organza dupatta was so lightweight yet looked so opulent in photos. The 30-day exchange made sizing completely stress-free.',
    rating: 5,
    outfit: 'Zahra Handcrafted Chanderi Anarkali',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80'
  }
];

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#FAF8F5] border-t border-[#EFE6DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-[#C85A70] uppercase mb-2">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Community Stories</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A1E1D]">
            Loved by 10,000+ Women
          </h2>
          <p className="text-xs sm:text-sm text-[#543834] mt-2">
            Real stories from women celebrating milestone moments in HerCloset designs.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE6DE] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                <Quote className="w-8 h-8 text-[#F4B8C5] mb-4 opacity-75" />
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[#543834] leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              {/* Author & Verified Tag */}
              <div className="pt-4 border-t border-[#FAF8F5] flex items-center gap-3">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#F4B8C5]"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-bold text-[#2A1E1D]">{t.name}</h3>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <p className="text-[11px] text-[#543834]">{t.role}</p>
                  <p className="text-[10px] text-[#C85A70] font-medium mt-0.5">{t.outfit}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Press Mentions Bar */}
        <div className="mt-14 pt-8 border-t border-[#EFE6DE] text-center">
          <p className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold mb-4">
            Featured In
          </p>
          <div className="flex items-center justify-center flex-wrap gap-8 sm:gap-14 text-stone-400 font-serif text-lg tracking-wider">
            <span className="hover:text-[#2A1E1D] transition-colors">VOGUE</span>
            <span className="hover:text-[#2A1E1D] transition-colors">HARPER'S BAZAAR</span>
            <span className="hover:text-[#2A1E1D] transition-colors">ELLE</span>
            <span className="hover:text-[#2A1E1D] transition-colors">GRAZIA</span>
            <span className="hover:text-[#2A1E1D] transition-colors">MARIE CLAIRE</span>
          </div>
        </div>

      </div>
    </section>
  );
};
