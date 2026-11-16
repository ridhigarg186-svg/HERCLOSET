/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryShowcase } from './components/CategoryShowcase';
import { ProductSection } from './components/ProductSection';
import { LookbookSection } from './components/LookbookSection';
import { AboutSection } from './components/AboutSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AccountModal } from './components/AccountModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { AIAssistant } from './components/AIAssistant';
import { FloatingControls } from './components/FloatingControls';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { Product } from './data/products';
import { CheckCircle2, Info, AlertCircle } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { activeProductModal, closeProductModal, toasts, isAdminOpen, setIsAdminOpen } = useShop();

  // Direct buy state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [directBuyItem, setDirectBuyItem] = useState<{
    product: Product;
    color: string;
    size: string;
    quantity: number;
  } | null>(null);

  const handleBuyNowDirect = (product: Product, color: string, size: string, quantity: number) => {
    setDirectBuyItem({ product, color, size, quantity });
    closeProductModal();
    setIsCheckoutOpen(true);
  };

  const handleProceedToCheckoutFromCart = () => {
    setDirectBuyItem(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#2A1E1D] selection:bg-[#FCE7EC] selection:text-[#C85A70]">
      
      {/* Toast Notifications */}
      <div className="fixed top-20 right-4 z-50 space-y-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center gap-2.5 bg-[#2A1E1D] text-white px-4 py-3 rounded-2xl shadow-xl border border-[#C85A70]/40 text-xs font-medium animate-fadeIn max-w-sm"
          >
            {toast.type === 'info' ? (
              <Info className="w-4 h-4 text-[#F4B8C5] shrink-0" />
            ) : toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      {/* Main Header & Navigation */}
      <Header />

      {/* Hero Banner Section */}
      <Hero />

      {/* Category Showcase Section */}
      <CategoryShowcase />

      {/* Product Catalog & Section with Filters & Sorting */}
      <ProductSection />

      {/* Lookbook / Style Edit Section */}
      <LookbookSection />

      {/* About Us & Craftsmanship Section */}
      <AboutSection />

      {/* Customer Reviews & Testimonials Section */}
      <ReviewsSection />

      {/* VIP Circle / Newsletter Banner */}
      <Newsletter />

      {/* Brand Footer */}
      <Footer />

      {/* Slide-over Drawers & Interactive Modals */}
      <CartDrawer onProceedToCheckout={handleProceedToCheckoutFromCart} />
      <WishlistDrawer />
      <AccountModal />

      {/* Product Details Modal */}
      <ProductDetailModal
        product={activeProductModal}
        onClose={closeProductModal}
        onBuyNowDirect={handleBuyNowDirect}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          setDirectBuyItem(null);
        }}
        directBuyItem={directBuyItem}
      />

      {/* Admin Dashboard Modal */}
      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Floating AI Shopping Assistant & Screen Top/Bottom Controls */}
      <AIAssistant />
      <FloatingControls />

    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainAppContent />
    </ShopProvider>
  );
}
