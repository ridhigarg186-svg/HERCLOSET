import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Ruler, 
  Sparkles, 
  Check, 
  Plus, 
  Minus,
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import { Product, PRODUCTS, SIZE_CHART, Review } from '../data/products';
import { useShop } from '../context/ShopContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onBuyNowDirect: (product: Product, color: string, size: string, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onBuyNowDirect
}) => {
  const { isInWishlist, toggleWishlist, addToCart, openProductModal, showToast } = useShop();

  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'fabric' | 'reviews'>('details');

  // Customer reviews state
  const [reviewsList, setReviewsList] = useState<Review[]>(product.reviews || []);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  // Suggested matching products
  const matchingProducts = PRODUCTS.filter(p => product.pairWithIds?.includes(p.id));

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    onBuyNowDirect(product, selectedColor, selectedSize, quantity);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      rating: newReviewRating,
      date: 'Just now',
      comment: newReviewComment.trim(),
      verified: true,
      sizePurchased: selectedSize
    };

    setReviewsList([newRev, ...reviewsList]);
    setNewReviewAuthor('');
    setNewReviewComment('');
    setShowReviewForm(false);
    showToast('Thank you for sharing your review!');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-fadeIn">
      
      {/* Modal Container */}
      <div className="relative bg-[#FAF8F5] rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#EFE6DE]">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-[#2A1E1D] hover:text-[#C85A70] hover:bg-white flex items-center justify-center shadow-md transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8">
          
          {/* Left Column: Gallery Images & Thumbnails */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Featured Image */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white shadow-sm border border-[#EFE6DE]">
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-top"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {product.isNew && (
                  <span className="bg-[#2A1E1D] text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full">
                    NEW
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="bg-[#FDF2F4] text-[#C85A70] border border-[#F4B8C5] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-24 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      selectedImage === idx
                        ? 'border-[#C85A70] shadow-md ring-2 ring-[#F4B8C5]'
                        : 'border-[#EFE6DE] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover object-top" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Details & Purchase Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              {/* Category, Rating, and Wishlist */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-widest text-[#C85A70] uppercase">
                  {product.category} • {product.subCategory}
                </span>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                    isFavorited
                      ? 'bg-[#C85A70] text-white'
                      : 'bg-white border border-[#EFE6DE] text-[#2A1E1D] hover:text-[#C85A70]'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-current' : ''}`} />
                  <span>{isFavorited ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>

              {/* Title */}
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A1E1D]">
                {product.name}
              </h1>

              {/* Price & Rating */}
              <div className="flex items-center justify-between py-2 border-y border-[#EFE6DE]">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-3xl font-bold text-[#2A1E1D]">
                    ${product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-stone-400 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    In Stock ({product.stockCount} left)
                  </span>
                </div>

                <div className="flex items-center gap-1 text-sm font-semibold text-[#2A1E1D]">
                  <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                  <span>{product.rating}</span>
                  <span className="text-xs text-[#543834] font-normal">({reviewsList.length} reviews)</span>
                </div>
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-[#543834] leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#2A1E1D]">Color: <span className="font-normal text-[#543834]">{selectedColor}</span></span>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                        selectedColor === color.name
                          ? 'border-[#C85A70] bg-[#FDF2F4] text-[#C85A70] shadow-xs'
                          : 'border-[#EFE6DE] bg-white text-[#2A1E1D] hover:border-stone-400'
                      }`}
                    >
                      <span 
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0" 
                        style={{ backgroundColor: color.hex }} 
                      />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection & Size Guide */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#2A1E1D]">Select Size:</span>
                  <button
                    type="button"
                    onClick={() => setIsSizeGuideOpen(!isSizeGuideOpen)}
                    className="inline-flex items-center gap-1 text-[#C85A70] hover:underline font-medium cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Guide Chart</span>
                  </button>
                </div>

                <div className="flex items-center flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[44px] h-11 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'bg-[#2A1E1D] text-white border-[#2A1E1D] shadow-sm'
                          : 'bg-white text-[#2A1E1D] border-[#EFE6DE] hover:border-[#C85A70]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {/* Inline Size Guide Modal/Drawer */}
                {isSizeGuideOpen && (
                  <div className="mt-3 p-4 bg-white rounded-2xl border border-[#F4B8C5] shadow-md animate-fadeIn">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-[#2A1E1D]">HerCloset Standard Sizing (Inches)</span>
                      <button onClick={() => setIsSizeGuideOpen(false)} className="text-xs text-stone-400 hover:text-black">
                        ✕
                      </button>
                    </div>
                    <table className="w-full text-[11px] text-[#543834] text-left">
                      <thead>
                        <tr className="border-b border-[#FAF8F5] font-semibold text-[#2A1E1D]">
                          <th className="py-1">Size</th>
                          <th className="py-1">Bust</th>
                          <th className="py-1">Waist</th>
                          <th className="py-1">Hip</th>
                        </tr>
                      </thead>
                      <tbody>
                        {SIZE_CHART.map((s) => (
                          <tr key={s.size} className="border-b border-stone-100">
                            <td className="py-1 font-semibold">{s.size} ({s.us})</td>
                            <td className="py-1">{s.bust}</td>
                            <td className="py-1">{s.waist}</td>
                            <td className="py-1">{s.hip}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Quantity Stepper & Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-[#2A1E1D]">Quantity:</span>
                  <div className="flex items-center bg-white border border-[#EFE6DE] rounded-xl overflow-hidden shadow-xs">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2.5 hover:bg-[#FAF8F5] text-[#2A1E1D] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-xs font-bold text-[#2A1E1D]">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2.5 hover:bg-[#FAF8F5] text-[#2A1E1D] transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="w-full flex items-center justify-center gap-2 bg-[#2A1E1D] hover:bg-[#3D2826] text-white py-3.5 px-6 rounded-2xl font-semibold text-xs tracking-wide shadow-md transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#F4B8C5]" />
                    <span>Add to Shopping Bag</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="w-full flex items-center justify-center gap-2 bg-[#C85A70] hover:bg-[#A84558] text-white py-3.5 px-6 rounded-2xl font-semibold text-xs tracking-wide shadow-md transition-all cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Buy Now — Instant Checkout</span>
                  </button>
                </div>
              </div>

              {/* Service Badges */}
              <div className="pt-4 border-t border-[#EFE6DE] grid grid-cols-3 gap-2 text-center text-[10px] text-[#543834]">
                <div className="flex flex-col items-center">
                  <Truck className="w-4 h-4 text-[#C85A70] mb-1" />
                  <span>Free Express Delivery over $99</span>
                </div>
                <div className="flex flex-col items-center">
                  <RotateCcw className="w-4 h-4 text-[#C85A70] mb-1" />
                  <span>30-Day Easy Returns</span>
                </div>
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-4 h-4 text-[#C85A70] mb-1" />
                  <span>100% Genuine Guaranteed</span>
                </div>
              </div>

            </div>

            {/* Product Tabs (Details, Fabric & Care, Customer Reviews) */}
            <div className="mt-6 pt-4 border-t border-[#EFE6DE]">
              <div className="flex items-center gap-4 border-b border-[#EFE6DE] pb-2 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab('details')}
                  className={`pb-1 transition-colors cursor-pointer ${
                    activeTab === 'details'
                      ? 'border-b-2 border-[#C85A70] text-[#C85A70]'
                      : 'text-[#543834] hover:text-[#2A1E1D]'
                  }`}
                >
                  Features & Fit
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('fabric')}
                  className={`pb-1 transition-colors cursor-pointer ${
                    activeTab === 'fabric'
                      ? 'border-b-2 border-[#C85A70] text-[#C85A70]'
                      : 'text-[#543834] hover:text-[#2A1E1D]'
                  }`}
                >
                  Fabric & Care
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-1 transition-colors cursor-pointer ${
                    activeTab === 'reviews'
                      ? 'border-b-2 border-[#C85A70] text-[#C85A70]'
                      : 'text-[#543834] hover:text-[#2A1E1D]'
                  }`}
                >
                  Reviews ({reviewsList.length})
                </button>
              </div>

              <div className="pt-3">
                {activeTab === 'details' && (
                  <ul className="space-y-1.5 text-xs text-[#543834]">
                    {product.details.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#C85A70] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === 'fabric' && (
                  <div className="text-xs text-[#543834] space-y-2">
                    <p className="leading-relaxed">{product.fabricCare}</p>
                    <p className="text-[11px] text-stone-400 italic">
                      Crafted with sustainable, fair-trade production standards in artisan workshops.
                    </p>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#2A1E1D]">Verified Customer Experiences</span>
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(!showReviewForm)}
                        className="text-xs text-[#C85A70] font-semibold hover:underline"
                      >
                        {showReviewForm ? 'Cancel' : '+ Write a Review'}
                      </button>
                    </div>

                    {/* Write a review form */}
                    {showReviewForm && (
                      <form onSubmit={handleAddReview} className="bg-white p-3.5 rounded-xl border border-[#F4B8C5] space-y-2.5">
                        <div className="flex items-center gap-2">
                          <label className="text-[11px] font-semibold text-[#2A1E1D]">Your Rating:</label>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setNewReviewRating(star)}
                                className="text-stone-300 hover:text-[#D4AF37]"
                              >
                                <Star className={`w-3.5 h-3.5 ${star <= newReviewRating ? 'fill-[#D4AF37] text-[#D4AF37]' : ''}`} />
                              </button>
                            ))}
                          </div>
                        </div>

                        <input
                          type="text"
                          placeholder="Your Name (e.g. Maya S.)"
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          className="w-full text-xs p-2 bg-[#FAF8F5] border border-[#EFE6DE] rounded-lg focus:outline-none focus:border-[#C85A70]"
                          required
                        />

                        <textarea
                          placeholder="Tell other women how it looks and fits..."
                          value={newReviewComment}
                          onChange={(e) => setNewReviewComment(e.target.value)}
                          rows={2}
                          className="w-full text-xs p-2 bg-[#FAF8F5] border border-[#EFE6DE] rounded-lg focus:outline-none focus:border-[#C85A70]"
                          required
                        />

                        <button
                          type="submit"
                          className="px-4 py-1.5 bg-[#C85A70] text-white text-xs font-semibold rounded-lg hover:bg-[#A84558] transition-colors"
                        >
                          Submit Review
                        </button>
                      </form>
                    )}

                    <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                      {reviewsList.map((rev) => (
                        <div key={rev.id} className="p-2.5 bg-white rounded-xl border border-[#FAF8F5]">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-[#2A1E1D]">{rev.author}</span>
                              {rev.verified && (
                                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 rounded-sm font-medium">
                                  Verified Buyer
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-stone-400">{rev.date}</span>
                          </div>

                          <div className="flex items-center gap-1 my-1">
                            {Array.from({ length: rev.rating }).map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
                            ))}
                            {rev.sizePurchased && (
                              <span className="text-[10px] text-stone-400 ml-2">Size: {rev.sizePurchased}</span>
                            )}
                          </div>

                          <p className="text-xs text-[#543834] leading-relaxed">{rev.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Complete The Look / Matching Pairings */}
            {matchingProducts.length > 0 && (
              <div className="pt-4 border-t border-[#EFE6DE]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#2A1E1D] mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-[#C85A70]" />
                  <span>Style With — Complete The Look</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {matchingProducts.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => openProductModal(item)}
                      className="group/pair p-2 bg-white rounded-xl border border-[#EFE6DE] hover:border-[#F4B8C5] cursor-pointer transition-all"
                    >
                      <img src={item.images[0]} alt={item.name} className="w-full h-20 object-cover rounded-lg" />
                      <p className="text-[11px] font-medium text-[#2A1E1D] truncate mt-1.5 group-hover/pair:text-[#C85A70]">
                        {item.name}
                      </p>
                      <p className="text-[10px] font-bold text-[#C85A70]">${item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
