import React, { useState } from 'react';
import { X, User, Package, MapPin, Sparkles, Award, Clock } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AccountModal: React.FC = () => {
  const { isAccountOpen, setIsAccountOpen } = useShop();
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses' | 'rewards'>('orders');

  if (!isAccountOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-fadeIn">
      <div className="relative bg-[#FAF8F5] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#EFE6DE]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#EFE6DE] bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FDF2F4] border border-[#F4B8C5] flex items-center justify-center text-[#C85A70]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-[#2A1E1D]">Eleanor Vance</h2>
              <div className="flex items-center gap-1.5 text-xs text-[#C85A70] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>HerCloset Rose Gold Member (450 Points)</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsAccountOpen(false)}
            className="p-2 text-stone-400 hover:text-[#2A1E1D] transition-colors rounded-full"
            aria-label="Close account modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 p-4 bg-white border-b border-[#EFE6DE] text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'orders' ? 'bg-[#2A1E1D] text-white' : 'text-[#543834] hover:bg-[#FAF8F5]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>My Orders</span>
          </button>

          <button
            onClick={() => setActiveTab('rewards')}
            className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'rewards' ? 'bg-[#2A1E1D] text-white' : 'text-[#543834] hover:bg-[#FAF8F5]'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>VIP Rewards</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'addresses' ? 'bg-[#2A1E1D] text-white' : 'text-[#543834] hover:bg-[#FAF8F5]'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Saved Addresses</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-4 border border-[#EFE6DE] shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-[#FAF8F5] pb-2 text-xs">
                  <div>
                    <span className="font-bold text-[#2A1E1D]">Order #HC-849201</span>
                    <p className="text-[11px] text-stone-400">Placed on October 18, 2026</p>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-1 rounded-full text-[11px] border border-emerald-200 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Out for Delivery</span>
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=200&q=80"
                      alt="Aura Silk Dress"
                      className="w-12 h-14 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-semibold text-[#2A1E1D]">Aura Mulberry Silk Slip Dress</p>
                      <p className="text-[11px] text-[#543834]">Color: Blush Rose • Size: S</p>
                    </div>
                  </div>
                  <span className="font-bold text-[#2A1E1D]">$139</span>
                </div>

                <div className="pt-2 border-t border-[#FAF8F5] flex items-center justify-between text-xs">
                  <span className="text-stone-400">FedEx Express: 748920491823</span>
                  <button className="text-[#C85A70] font-semibold hover:underline">
                    Track Package
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-[#EFE6DE] shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-[#FAF8F5] pb-2 text-xs">
                  <div>
                    <span className="font-bold text-[#2A1E1D]">Order #HC-712034</span>
                    <p className="text-[11px] text-stone-400">Delivered on September 24, 2026</p>
                  </div>
                  <span className="bg-stone-100 text-stone-600 font-semibold px-2.5 py-1 rounded-full text-[11px]">
                    Completed
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=200&q=80"
                      alt="Rose quartz pendant"
                      className="w-12 h-14 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-semibold text-[#2A1E1D]">Elysian Rose Quartz Pendant</p>
                      <p className="text-[11px] text-[#543834]">18K Vermeil • One Size</p>
                    </div>
                  </div>
                  <span className="font-bold text-[#2A1E1D]">$65</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rewards' && (
            <div className="space-y-4">
              <div className="p-5 bg-gradient-to-r from-[#FDF2F4] to-[#FCE7EC] rounded-2xl border border-[#F4B8C5] text-center space-y-2">
                <span className="text-xs uppercase font-bold tracking-widest text-[#C85A70]">Loyalty Balance</span>
                <p className="font-serif text-4xl font-bold text-[#2A1E1D]">450 Points</p>
                <p className="text-xs text-[#543834]">
                  You are only 50 points away from unlocking a $25 Atelier Voucher!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-[#EFE6DE]">
                  <p className="font-semibold text-[#2A1E1D]">Complimentary Hemming</p>
                  <p className="text-[11px] text-stone-400 mt-1">Available at any flagship boutique</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#EFE6DE]">
                  <p className="font-semibold text-[#2A1E1D]">Private Atelier Previews</p>
                  <p className="text-[11px] text-stone-400 mt-1">48 hours early access to new seasonal drops</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-3">
              <div className="p-4 bg-white rounded-2xl border border-[#C85A70] relative text-xs space-y-1">
                <span className="absolute top-3 right-3 text-[10px] bg-[#FDF2F4] text-[#C85A70] font-bold px-2 py-0.5 rounded-full border border-[#F4B8C5]">
                  Default Address
                </span>
                <p className="font-bold text-[#2A1E1D]">Eleanor Vance</p>
                <p className="text-[#543834]">450 Lexington Avenue, Suite 1800</p>
                <p className="text-[#543834]">New York, NY 10017, United States</p>
                <p className="text-[#543834] pt-1">+1 (555) 234-5678</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
