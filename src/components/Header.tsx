import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  Sparkles, 
  ChevronDown, 
  ArrowRight,
  Phone,
  Mail,
  Sparkle
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

interface HeaderProps {
  onNavigateSection?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateSection }) => {
  const {
    cartCount,
    wishlistCount,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsAccountOpen,
    setIsAIAssistantOpen,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    openProductModal
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [clothingDropdownOpen, setClothingDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (category?: string, sectionId?: string) => {
    if (category) {
      setSelectedCategory(category);
    }
    if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
    setClothingDropdownOpen(false);
  };

  const matchingSearchProducts = searchQuery.trim()
    ? PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 4)
    : [];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#2A1E1D] text-[#FDF2F4] text-xs font-medium py-2 px-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2 text-[#E07A8B]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complimentary 1-on-1 AI Personal Styling</span>
          </div>
          <div className="mx-auto sm:mx-0 flex items-center gap-2 tracking-wide">
            <span>Free Express Shipping on Orders $99+</span>
            <span className="hidden md:inline text-[#C85A70]">•</span>
            <span className="hidden md:inline">Use code <strong className="text-[#F4B8C5] tracking-widest">HERSTORY</strong> for 15% OFF</span>
          </div>
          <div className="hidden lg:flex items-center gap-4 text-xs text-[#EFE6DE]">
            <button 
              onClick={() => setIsAccountOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Order Tracking
            </button>
            <span>|</span>
            <button 
              onClick={() => handleNavClick(undefined, 'contact-us')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Concierge Care
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm border-b border-[#F4B8C5]/30 py-3' 
            : 'bg-[#FAF8F5] border-b border-[#EFE6DE] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-[#2A1E1D] hover:text-[#C85A70] transition-colors rounded-lg focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo & Tagline */}
            <div className="flex items-center">
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('All', 'top');
                }} 
                className="group flex flex-col items-start select-none"
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#2A1E1D] group-hover:text-[#C85A70] transition-colors">
                    HerCloset
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C85A70] mb-2 group-hover:scale-125 transition-transform"></span>
                </div>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#543834] font-medium -mt-1">
                  Your Style, Your Story.
                </span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 text-[13px] font-medium tracking-wide text-[#2A1E1D]">
              <button
                onClick={() => handleNavClick('All', 'top')}
                className="hover:text-[#C85A70] transition-colors py-1 cursor-pointer"
              >
                Home
              </button>
              
              <button
                onClick={() => handleNavClick('All', 'new-arrivals')}
                className="hover:text-[#C85A70] transition-colors py-1 relative cursor-pointer"
              >
                New Arrivals
                <span className="absolute -top-2 -right-3 text-[9px] bg-[#C85A70] text-white px-1.5 py-0.2 rounded-full font-bold">
                  NEW
                </span>
              </button>

              {/* Clothing Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setClothingDropdownOpen(true)}
                onMouseLeave={() => setClothingDropdownOpen(false)}
              >
                <button
                  onClick={() => handleNavClick('All', 'shop-collection')}
                  className="flex items-center gap-1 hover:text-[#C85A70] transition-colors py-1 cursor-pointer"
                >
                  Clothing
                  <ChevronDown className="w-3.5 h-3.5 text-[#543834] group-hover:rotate-180 transition-transform duration-200" />
                </button>
                {clothingDropdownOpen && (
                  <div className="absolute top-full left-0 w-60 bg-white border border-[#EFE6DE] shadow-xl rounded-xl p-3 z-50 animate-fadeIn">
                    <button
                      onClick={() => handleNavClick('Dresses', 'shop-collection')}
                      className="w-full text-left px-3 py-2 text-xs font-semibold hover:bg-[#FDF2F4] hover:text-[#C85A70] rounded-lg transition-colors flex items-center justify-between"
                    >
                      <span>Dresses Collection</span>
                      <ArrowRight className="w-3 h-3 text-[#C85A70]" />
                    </button>
                    <button
                      onClick={() => handleNavClick('Western Wear', 'shop-collection')}
                      className="w-full text-left px-3 py-2 text-xs font-semibold hover:bg-[#FDF2F4] hover:text-[#C85A70] rounded-lg transition-colors flex items-center justify-between"
                    >
                      <span>Western Wear & Blazers</span>
                      <ArrowRight className="w-3 h-3 text-[#C85A70]" />
                    </button>
                    <button
                      onClick={() => handleNavClick('Ethnic Wear', 'shop-collection')}
                      className="w-full text-left px-3 py-2 text-xs font-semibold hover:bg-[#FDF2F4] hover:text-[#C85A70] rounded-lg transition-colors flex items-center justify-between"
                    >
                      <span>Ethnic Wear & Sarees</span>
                      <ArrowRight className="w-3 h-3 text-[#C85A70]" />
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleNavClick('Dresses', 'shop-collection')}
                className="hover:text-[#C85A70] transition-colors py-1 cursor-pointer"
              >
                Dresses
              </button>

              <button
                onClick={() => handleNavClick('Western Wear', 'shop-collection')}
                className="hover:text-[#C85A70] transition-colors py-1 cursor-pointer"
              >
                Western Wear
              </button>

              <button
                onClick={() => handleNavClick('Ethnic Wear', 'shop-collection')}
                className="hover:text-[#C85A70] transition-colors py-1 cursor-pointer"
              >
                Ethnic Wear
              </button>

              <button
                onClick={() => handleNavClick('Accessories', 'shop-collection')}
                className="hover:text-[#C85A70] transition-colors py-1 cursor-pointer"
              >
                Accessories
              </button>

              <button
                onClick={() => handleNavClick(undefined, 'about-us')}
                className="hover:text-[#C85A70] transition-colors py-1 cursor-pointer"
              >
                About Us
              </button>

              <button
                onClick={() => handleNavClick(undefined, 'contact-us')}
                className="hover:text-[#C85A70] transition-colors py-1 cursor-pointer"
              >
                Contact Us
              </button>
            </nav>

            {/* Right Action Icons & Shop Now Button */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Search Toggle / Input */}
              <div className="relative">
                <div className="flex items-center">
                  <div className={`transition-all duration-300 relative ${isSearchExpanded ? 'w-48 sm:w-64' : 'w-9 sm:w-9'}`}>
                    <input
                      type="text"
                      placeholder="Search dresses, silks, blazers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchExpanded(true)}
                      className={`w-full py-1.5 pl-9 pr-3 text-xs bg-white/80 border border-[#EFE6DE] rounded-full focus:outline-none focus:border-[#C85A70] focus:ring-1 focus:ring-[#C85A70] placeholder:text-[#543834]/60 text-[#2A1E1D] transition-all ${
                        isSearchExpanded ? 'opacity-100 shadow-sm' : 'opacity-0 cursor-pointer'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#2A1E1D] hover:text-[#C85A70] transition-colors"
                      aria-label="Search"
                    >
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Instant Search Dropdown */}
                {isSearchExpanded && searchQuery.trim() && (
                  <div className="absolute top-full right-0 mt-2 w-72 sm:w-80 bg-white border border-[#EFE6DE] shadow-2xl rounded-2xl p-3 z-50 animate-fadeIn">
                    <div className="flex items-center justify-between pb-2 border-b border-[#FAF8F5] mb-2">
                      <span className="text-[11px] font-semibold text-[#543834] uppercase tracking-wider">
                        Search Results ({matchingSearchProducts.length})
                      </span>
                      <button 
                        onClick={() => { setSearchQuery(''); setIsSearchExpanded(false); }}
                        className="text-[11px] text-[#C85A70] hover:underline"
                      >
                        Close
                      </button>
                    </div>

                    {matchingSearchProducts.length > 0 ? (
                      <div className="space-y-2">
                        {matchingSearchProducts.map((p) => (
                          <div 
                            key={p.id}
                            onClick={() => {
                              openProductModal(p);
                              setIsSearchExpanded(false);
                            }}
                            className="flex items-center gap-3 p-1.5 hover:bg-[#FDF2F4] rounded-xl cursor-pointer transition-colors"
                          >
                            <img src={p.images[0]} alt={p.name} className="w-10 h-12 object-cover rounded-md" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-[#2A1E1D] truncate">{p.name}</p>
                              <p className="text-[11px] text-[#C85A70] font-semibold">${p.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-4 text-center text-xs text-[#543834]">
                        No matches found for "{searchQuery}". Try asking our AI Stylist!
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Account Profile Icon */}
              <button
                type="button"
                onClick={() => setIsAccountOpen(true)}
                className="p-2 text-[#2A1E1D] hover:text-[#C85A70] hover:bg-[#FDF2F4] rounded-full transition-all cursor-pointer relative"
                aria-label="My Account"
                title="My Account"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Wishlist Icon */}
              <button
                type="button"
                onClick={() => setIsWishlistOpen(true)}
                className="p-2 text-[#2A1E1D] hover:text-[#C85A70] hover:bg-[#FDF2F4] rounded-full transition-all cursor-pointer relative"
                aria-label="Wishlist"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#C85A70] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scaleIn">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Cart Icon */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-[#2A1E1D] hover:text-[#C85A70] hover:bg-[#FDF2F4] rounded-full transition-all cursor-pointer relative"
                aria-label="Shopping Bag"
                title="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#2A1E1D] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scaleIn">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Prominent "Shop Now" Button */}
              <button
                onClick={() => handleNavClick('All', 'shop-collection')}
                className="hidden sm:inline-flex items-center gap-1.5 bg-[#C85A70] hover:bg-[#A84558] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[108px] bg-black/40 backdrop-blur-xs z-50">
            <div className="bg-[#FAF8F5] h-full w-4/5 max-w-sm p-6 overflow-y-auto shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#EFE6DE]">
                  <div>
                    <span className="font-serif text-xl font-bold text-[#2A1E1D]">HerCloset</span>
                    <p className="text-[10px] tracking-wider text-[#543834] uppercase">Your Style, Your Story.</p>
                  </div>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-[#543834]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-6 flex flex-col space-y-3 font-medium text-sm text-[#2A1E1D]">
                  <button
                    onClick={() => handleNavClick('All', 'top')}
                    className="text-left py-2 px-3 rounded-lg hover:bg-[#FDF2F4] hover:text-[#C85A70]"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => handleNavClick('All', 'new-arrivals')}
                    className="text-left py-2 px-3 rounded-lg hover:bg-[#FDF2F4] hover:text-[#C85A70] flex items-center justify-between"
                  >
                    <span>New Arrivals</span>
                    <span className="text-[9px] bg-[#C85A70] text-white px-2 py-0.5 rounded-full font-bold">NEW</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('Dresses', 'shop-collection')}
                    className="text-left py-2 px-3 rounded-lg hover:bg-[#FDF2F4] hover:text-[#C85A70]"
                  >
                    Dresses
                  </button>
                  <button
                    onClick={() => handleNavClick('Western Wear', 'shop-collection')}
                    className="text-left py-2 px-3 rounded-lg hover:bg-[#FDF2F4] hover:text-[#C85A70]"
                  >
                    Western Wear & Blazers
                  </button>
                  <button
                    onClick={() => handleNavClick('Ethnic Wear', 'shop-collection')}
                    className="text-left py-2 px-3 rounded-lg hover:bg-[#FDF2F4] hover:text-[#C85A70]"
                  >
                    Ethnic Wear & Sarees
                  </button>
                  <button
                    onClick={() => handleNavClick('Accessories', 'shop-collection')}
                    className="text-left py-2 px-3 rounded-lg hover:bg-[#FDF2F4] hover:text-[#C85A70]"
                  >
                    Jewelry & Accessories
                  </button>
                  <button
                    onClick={() => handleNavClick(undefined, 'about-us')}
                    className="text-left py-2 px-3 rounded-lg hover:bg-[#FDF2F4] hover:text-[#C85A70]"
                  >
                    About Us
                  </button>
                  <button
                    onClick={() => handleNavClick(undefined, 'contact-us')}
                    className="text-left py-2 px-3 rounded-lg hover:bg-[#FDF2F4] hover:text-[#C85A70]"
                  >
                    Contact Us
                  </button>
                </div>

                <div className="mt-6 pt-4 border-t border-[#EFE6DE]">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsAIAssistantOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-[#FDF2F4] border border-[#F4B8C5] text-[#C85A70] py-3 rounded-xl font-semibold text-xs hover:bg-[#FCE7EC] transition-colors"
                  >
                    <Sparkle className="w-4 h-4 text-[#C85A70]" />
                    <span>Open AI Styling Assistant</span>
                  </button>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#EFE6DE] text-xs text-[#543834] space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#C85A70]" />
                  <span>+1 (800) 437-2567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#C85A70]" />
                  <span>care@hercloset.com</span>
                </div>
                <p className="text-[11px] text-[#543834]/80 pt-2">
                  Complimentary worldwide delivery on qualifying orders.
                </p>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
