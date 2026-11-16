import React from 'react';
import { LOOKBOOKS, PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';
import { Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';

export const LookbookSection: React.FC = () => {
  const { addToCart, openProductModal, showToast } = useShop();

  const handleShopLook = (itemIds: string[], lookTitle: string) => {
    const items = PRODUCTS.filter(p => itemIds.includes(p.id));
    items.forEach(item => {
      addToCart(item, item.colors[0]?.name, item.sizes[0], 1);
    });
    showToast(`Added complete "${lookTitle}" ensemble (${items.length} items) to your bag!`);
  };

  return (
    <section className="py-14 sm:py-20 bg-[#FAF8F5] border-t border-[#EFE6DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-[#C85A70] uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Style Edit</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A1E1D]">
            Curated Outfit Inspirations
          </h2>
          <p className="text-xs sm:text-sm text-[#543834] mt-2 max-w-md mx-auto">
            Take the guesswork out of styling. Complete harmonious outfits crafted by our design directors.
          </p>
        </div>

        {/* Lookbooks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {LOOKBOOKS.map((look) => {
            const bundledItems = PRODUCTS.filter(p => look.itemIds.includes(p.id));
            const bundleTotal = bundledItems.reduce((sum, item) => sum + item.price, 0);

            return (
              <div 
                key={look.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#EFE6DE] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Editorial Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                  <img
                    src={look.image}
                    alt={look.title}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#F4B8C5] block">
                      Curated Look
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                      {look.title}
                    </h3>
                  </div>
                </div>

                {/* Items in the Look */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-[#543834] leading-relaxed">
                    {look.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-[#FAF8F5]">
                    <span className="text-[11px] font-bold text-[#2A1E1D] uppercase tracking-wider block">
                      Included in this ensemble:
                    </span>
                    <div className="space-y-1.5">
                      {bundledItems.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => openProductModal(item)}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-[#FDF2F4] transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center gap-2.5">
                            <img src={item.images[0]} alt={item.name} className="w-8 h-10 object-cover rounded-md" />
                            <span className="text-xs font-medium text-[#2A1E1D] group-hover:text-[#C85A70] transition-colors">
                              {item.name}
                            </span>
                          </div>
                          <span className="text-xs font-semibold text-[#543834]">${item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bundle Total & Action */}
                  <div className="pt-4 border-t border-[#EFE6DE] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-400 block uppercase font-medium">Complete Look</span>
                      <span className="font-serif text-xl font-bold text-[#2A1E1D]">
                        ${bundleTotal}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleShopLook(look.itemIds, look.title)}
                      className="inline-flex items-center gap-1.5 bg-[#2A1E1D] hover:bg-[#C85A70] text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#F4B8C5]" />
                      <span>Shop This Look</span>
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
