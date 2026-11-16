import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const WishlistDrawer: React.FC = () => {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist, addToCart, openProductModal, showToast } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleMoveAllToBag = () => {
    wishlistProducts.forEach((p) => {
      addToCart(p, p.colors[0]?.name, p.sizes[0], 1);
    });
    showToast(`Moved all ${wishlistProducts.length} items to your shopping bag!`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        onClick={() => setIsWishlistOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col justify-between border-l border-[#EFE6DE]">
          
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#EFE6DE] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#C85A70] fill-current" />
              <h2 className="font-serif text-xl font-bold text-[#2A1E1D]">Saved Wishlist</h2>
              <span className="text-xs font-semibold bg-[#FDF2F4] text-[#C85A70] px-2 py-0.5 rounded-full border border-[#F4B8C5]">
                {wishlistProducts.length}
              </span>
            </div>

            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 text-stone-400 hover:text-[#2A1E1D] transition-colors rounded-full"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {wishlistProducts.length > 0 ? (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 bg-white rounded-2xl border border-[#EFE6DE] shadow-xs relative"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    onClick={() => {
                      setIsWishlistOpen(false);
                      openProductModal(product);
                    }}
                    className="w-20 h-24 object-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4
                          onClick={() => {
                            setIsWishlistOpen(false);
                            openProductModal(product);
                          }}
                          className="font-serif text-sm font-semibold text-[#2A1E1D] hover:text-[#C85A70] cursor-pointer line-clamp-1"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-stone-300 hover:text-rose-600 transition-colors p-1"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-[11px] text-[#C85A70] font-semibold mt-1">
                        ${product.price} <span className="text-stone-400 line-through text-[10px] ml-1">${product.originalPrice}</span>
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <button
                        onClick={() => {
                          addToCart(product, product.colors[0]?.name, product.sizes[0], 1);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FDF2F4] text-[#C85A70] hover:bg-[#C85A70] hover:text-white rounded-xl text-xs font-semibold border border-[#F4B8C5] transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsWishlistOpen(false);
                          openProductModal(product);
                        }}
                        className="text-xs text-stone-500 hover:text-[#2A1E1D] underline"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#FDF2F4] border border-[#F4B8C5] flex items-center justify-center mx-auto text-[#C85A70]">
                  <Heart className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2A1E1D]">Your Wishlist is Empty</h3>
                <p className="text-xs text-[#543834] max-w-xs mx-auto">
                  Click the heart icon on any outfit to save your favorite inspirations here.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="mt-4 px-6 py-2.5 bg-[#2A1E1D] text-white text-xs font-semibold rounded-full hover:bg-[#3D2826] transition-colors"
                >
                  Explore Catalog
                </button>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {wishlistProducts.length > 0 && (
            <div className="p-5 sm:p-6 bg-white border-t border-[#EFE6DE]">
              <button
                onClick={handleMoveAllToBag}
                className="w-full flex items-center justify-center gap-2 bg-[#2A1E1D] hover:bg-[#C85A70] text-white py-3.5 rounded-2xl font-semibold text-xs tracking-wider shadow-md transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#F4B8C5]" />
                <span>Move All to Bag ({wishlistProducts.length})</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
