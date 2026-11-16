import React, { useState } from 'react';
import { Heart, Star, Eye, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../data/products';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isInWishlist, toggleWishlist, addToCart, openProductModal } = useShop();
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, selectedColor, selectedSize, 1);
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div 
      className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-[#EFE6DE] shadow-xs hover:shadow-xl hover:border-[#F4B8C5]/60 transition-all duration-300 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div 
        onClick={() => openProductModal(product)} 
        className="relative w-full aspect-[4/5] bg-[#FAF8F5] overflow-hidden cursor-pointer"
      >
        <img
          src={isHovered && product.images[1] ? product.images[1] : product.images[activeImageIndex]}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105"
        />

        {/* Badges (Discount, New, Best Seller) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="bg-[#2A1E1D] text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
              NEW
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-[#C85A70] text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
              BESTSELLER
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-[#FDF2F4] text-[#C85A70] border border-[#F4B8C5] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 z-10 shadow-md ${
            isFavorited
              ? 'bg-[#C85A70] text-white'
              : 'bg-white/90 backdrop-blur-sm text-[#2A1E1D] hover:bg-white hover:text-[#C85A70]'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current scale-110' : ''} transition-transform`} />
        </button>

        {/* Quick View Floating Action Bar on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openProductModal(product);
            }}
            className="flex-1 bg-white/95 backdrop-blur-md hover:bg-white text-[#2A1E1D] text-xs font-semibold py-2.5 px-3 rounded-xl shadow-lg border border-[#EFE6DE] flex items-center justify-center gap-1.5 transition-all transform hover:-translate-y-0.5"
          >
            <Eye className="w-3.5 h-3.5 text-[#C85A70]" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Star Rating */}
          <div className="flex items-center justify-between text-xs text-[#543834] mb-1.5">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#C85A70]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 font-semibold text-[#2A1E1D]">
              <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
              <span>{product.rating}</span>
              <span className="text-[10px] text-stone-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => openProductModal(product)}
            className="font-serif text-base sm:text-lg font-semibold text-[#2A1E1D] hover:text-[#C85A70] transition-colors cursor-pointer line-clamp-1"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Color Swatches */}
          <div className="mt-2.5 flex items-center gap-1.5">
            {product.colors.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={() => setSelectedColor(color.name)}
                className={`w-4 h-4 rounded-full border transition-all ${
                  selectedColor === color.name 
                    ? 'ring-2 ring-offset-1 ring-[#C85A70] scale-110' 
                    : 'border-stone-300 hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={color.name}
              />
            ))}
            <span className="text-[11px] text-[#543834] ml-1">
              {selectedColor}
            </span>
          </div>

          {/* Sizes Selection Chips */}
          <div className="mt-3 flex items-center flex-wrap gap-1">
            <span className="text-[10px] font-medium text-stone-400 uppercase mr-1">Size:</span>
            {product.sizes.slice(0, 5).map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border transition-colors ${
                  selectedSize === size
                    ? 'bg-[#2A1E1D] text-white border-[#2A1E1D]'
                    : 'bg-[#FAF8F5] text-[#2A1E1D] border-[#EFE6DE] hover:border-[#C85A70]'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Price & Add to Cart Button */}
        <div className="mt-4 pt-3 border-t border-[#FAF8F5] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg sm:text-xl font-bold text-[#2A1E1D]">
              ${product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-stone-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={isAdding}
            className={`p-2.5 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer shadow-xs ${
              isAdding
                ? 'bg-emerald-700 text-white'
                : 'bg-[#FDF2F4] text-[#C85A70] hover:bg-[#C85A70] hover:text-white border border-[#F4B8C5]'
            }`}
            title="Add to Bag"
            aria-label="Add to Bag"
          >
            {isAdding ? <Check className="w-4 h-4 animate-scaleIn" /> : <ShoppingBag className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
