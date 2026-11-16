import React, { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES, Product } from '../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';
import { Filter, SlidersHorizontal, Sparkles, Flame, Tag, Clock } from 'lucide-react';

export const ProductSection: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useShop();

  const [activeTab, setActiveTab] = useState<'all' | 'trending' | 'new' | 'bestsellers' | 'offers'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(250);
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('all');

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // Filter by tab
    if (activeTab === 'trending') {
      list = list.filter(p => p.isTrending);
    } else if (activeTab === 'new') {
      list = list.filter(p => p.isNew);
    } else if (activeTab === 'bestsellers') {
      list = list.filter(p => p.isBestSeller);
    } else if (activeTab === 'offers') {
      list = list.filter(p => p.originalPrice > p.price);
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      list = list.filter(p => p.category === selectedCategory);
    }

    // Filter by max price
    list = list.filter(p => p.price <= maxPrice);

    // Filter by size
    if (selectedSizeFilter !== 'all') {
      list = list.filter(p => p.sizes.includes(selectedSizeFilter));
    }

    // Sort
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [activeTab, selectedCategory, maxPrice, selectedSizeFilter, sortBy]);

  return (
    <section id="shop-collection" className="py-12 sm:py-16 bg-[#FAF8F5] border-t border-[#EFE6DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs font-semibold tracking-widest text-[#C85A70] uppercase">
            Signature Ensembles
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2A1E1D] mt-1">
            Curated For Every Occasion
          </h2>
          <p className="text-xs sm:text-sm text-[#543834] mt-2 font-normal">
            Impeccably cut silhouettes crafted from pure natural fabrics, tailored to move with effortless elegance.
          </p>
        </div>

        {/* Feature Tabs (Trending Now, New Arrivals, Best Sellers, Special Offers) */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#2A1E1D] text-white shadow-md'
                : 'bg-white text-[#543834] border border-[#EFE6DE] hover:border-[#C85A70]'
            }`}
          >
            All Collections
          </button>

          <button
            id="trending-now"
            onClick={() => setActiveTab('trending')}
            className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === 'trending'
                ? 'bg-[#C85A70] text-white shadow-md'
                : 'bg-white text-[#543834] border border-[#EFE6DE] hover:border-[#C85A70]'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-300" />
            <span>Trending Now</span>
          </button>

          <button
            id="new-arrivals"
            onClick={() => setActiveTab('new')}
            className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === 'new'
                ? 'bg-[#2A1E1D] text-white shadow-md'
                : 'bg-white text-[#543834] border border-[#EFE6DE] hover:border-[#C85A70]'
            }`}
          >
            <Clock className="w-4 h-4 text-[#F4B8C5]" />
            <span>New Arrivals</span>
          </button>

          <button
            id="best-sellers"
            onClick={() => setActiveTab('bestsellers')}
            className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === 'bestsellers'
                ? 'bg-[#C85A70] text-white shadow-md'
                : 'bg-white text-[#543834] border border-[#EFE6DE] hover:border-[#C85A70]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Best Sellers</span>
          </button>

          <button
            id="special-offers"
            onClick={() => setActiveTab('offers')}
            className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === 'offers'
                ? 'bg-[#C85A70] text-white shadow-md'
                : 'bg-white text-[#543834] border border-[#EFE6DE] hover:border-[#C85A70]'
            }`}
          >
            <Tag className="w-4 h-4 text-[#F4B8C5]" />
            <span>Special Offers</span>
          </button>
        </div>

        {/* Filter and Sort Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-[#EFE6DE] shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug === 'all' ? 'All' : cat.name)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  (selectedCategory === 'All' && cat.slug === 'all') || selectedCategory === cat.name
                    ? 'bg-[#FDF2F4] text-[#C85A70] font-semibold border border-[#F4B8C5]'
                    : 'text-[#543834] hover:text-[#2A1E1D] hover:bg-[#FAF8F5]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Controls: Size Filter, Max Price, and Sort */}
          <div className="flex items-center flex-wrap gap-3 w-full md:w-auto justify-end">
            
            {/* Size Filter Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-[#543834]">
              <span className="font-medium hidden sm:inline">Size:</span>
              <select
                value={selectedSizeFilter}
                onChange={(e) => setSelectedSizeFilter(e.target.value)}
                className="bg-[#FAF8F5] border border-[#EFE6DE] rounded-xl px-2.5 py-1.5 text-xs text-[#2A1E1D] focus:outline-none focus:border-[#C85A70]"
              >
                <option value="all">All Sizes</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="hidden lg:flex items-center gap-2 text-xs text-[#543834]">
              <span>Under ${maxPrice}</span>
              <input
                type="range"
                min="50"
                max="250"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
                className="w-24 accent-[#C85A70] cursor-pointer"
              />
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-[#543834]">
              <span className="font-medium hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#FAF8F5] border border-[#EFE6DE] rounded-xl px-3 py-1.5 text-xs text-[#2A1E1D] focus:outline-none focus:border-[#C85A70]"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
              </select>
            </div>

          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#EFE6DE] max-w-lg mx-auto">
            <p className="font-serif text-2xl font-semibold text-[#2A1E1D]">No products found</p>
            <p className="text-xs text-[#543834] mt-2">
              Try adjusting your size or price filters to explore more of our collection.
            </p>
            <button
              onClick={() => {
                setActiveTab('all');
                setSelectedCategory('All');
                setMaxPrice(250);
                setSelectedSizeFilter('all');
              }}
              className="mt-5 px-6 py-2.5 rounded-full bg-[#2A1E1D] text-white text-xs font-semibold hover:bg-[#3D2826] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
