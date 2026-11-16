import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, ShieldCheck, Heart, LayoutDashboard } from 'lucide-react';
import { STORE_POLICIES } from '../data/products';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { setSelectedCategory, setIsAccountOpen, setIsAIAssistantOpen, setIsAdminOpen } = useShop();

  const handleNav = (category?: string, sectionId?: string) => {
    if (category) {
      setSelectedCategory(category);
    }
    if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact-us" className="bg-[#1F1615] text-[#FAF8F5] pt-16 pb-12 border-t border-[#3D2826]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-3xl font-bold tracking-tight text-white">
                HerCloset
              </span>
              <span className="w-2 h-2 rounded-full bg-[#C85A70] mb-2"></span>
            </div>
            
            <p className="text-xs uppercase tracking-[0.25em] text-[#F4B8C5] font-medium">
              Your Style, Your Story.
            </p>

            <p className="text-xs text-[#EFE6DE]/80 leading-relaxed max-w-sm">
              A luxury women's fashion house crafting pure silk silhouettes, European tailored staples, and heirloom hand-embroidered ensembles for the discerning contemporary woman.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2 text-[#EFE6DE]">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C85A70] flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C85A70] flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C85A70] flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Wardrobe Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F4B8C5]">
              Shop Wardrobe
            </h4>
            <ul className="space-y-2 text-xs text-[#EFE6DE]/80">
              <li>
                <button onClick={() => handleNav('All', 'new-arrivals')} className="hover:text-white transition-colors cursor-pointer">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('Dresses', 'shop-collection')} className="hover:text-white transition-colors cursor-pointer">
                  Dresses & Gowns
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('Western Wear', 'shop-collection')} className="hover:text-white transition-colors cursor-pointer">
                  Western Wear & Blazers
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('Ethnic Wear', 'shop-collection')} className="hover:text-white transition-colors cursor-pointer">
                  Ethnic Wear & Sarees
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('Accessories', 'shop-collection')} className="hover:text-white transition-colors cursor-pointer">
                  Fine Jewelry & Bags
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('All', 'special-offers')} className="hover:text-white transition-colors text-[#F4B8C5] cursor-pointer">
                  Special Offers
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care & Concierge */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F4B8C5]">
              Concierge Care
            </h4>
            <ul className="space-y-2 text-xs text-[#EFE6DE]/80">
              <li>
                <button onClick={() => setIsAIAssistantOpen(true)} className="hover:text-white transition-colors flex items-center gap-1.5 text-[#F4B8C5] cursor-pointer">
                  <span>AI Personal Stylist</span>
                  <span className="text-[9px] bg-[#C85A70] text-white px-1.5 py-0.2 rounded-full">24/7</span>
                </button>
              </li>
              <li>
                <button onClick={() => setIsAccountOpen(true)} className="hover:text-white transition-colors cursor-pointer">
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={() => handleNav(undefined, 'about-us')} className="hover:text-white transition-colors cursor-pointer">
                  About Our Atelier
                </button>
              </li>
              <li>
                <span className="block text-[#EFE6DE]/60">30-Day Easy Returns</span>
              </li>
              <li>
                <span className="block text-[#EFE6DE]/60">Express Worldwide Shipping</span>
              </li>
              <li>
                <span className="block text-[#EFE6DE]/60">Fabric Care & Sizing</span>
              </li>
            </ul>
          </div>

          {/* Contact & Admin Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F4B8C5]">
              Atelier Support
            </h4>
            <ul className="space-y-3 text-xs text-[#EFE6DE]/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C85A70] shrink-0 mt-0.5" />
                <span>Madison Avenue Flagship, New York, NY 10022</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C85A70] shrink-0" />
                <span>{STORE_POLICIES.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C85A70] shrink-0" />
                <span>{STORE_POLICIES.email}</span>
              </li>
              <li className="pt-1">
                <button
                  onClick={() => setIsAdminOpen(true)}
                  className="w-full text-left flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-[#C85A70] text-white rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-xs group"
                >
                  <LayoutDashboard className="w-4 h-4 text-[#F4B8C5] group-hover:text-white transition-colors" />
                  <span>Admin Dashboard</span>
                  <span className="text-[9px] bg-[#C85A70] group-hover:bg-[#2A1E1D] text-white px-1.5 py-0.5 rounded-full ml-auto font-bold uppercase">
                    Console
                  </span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Admin Dashboard, & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EFE6DE]/60">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} HerCloset Brand Inc. All rights reserved. Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#C85A70] fill-current inline" />
            <span>for empowered women everywhere.</span>
          </div>

          <div className="flex items-center flex-wrap gap-4 text-[11px]">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-1.5 text-[#F4B8C5] hover:text-white transition-colors cursor-pointer bg-white/5 hover:bg-white/15 px-3 py-1.5 rounded-lg border border-white/10 font-medium"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#C85A70]" />
              <span>Admin Dashboard</span>
            </button>
            <span>•</span>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Accessibility</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
