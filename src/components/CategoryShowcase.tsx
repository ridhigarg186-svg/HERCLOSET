import React from 'react';
import { CATEGORIES } from '../data/products';
import { useShop } from '../context/ShopContext';
import { ArrowUpRight } from 'lucide-react';

export const CategoryShowcase: React.FC = () => {
  const { setSelectedCategory } = useShop();

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    const el = document.getElementById('shop-collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Skip "All" for category card grid
  const displayCategories = CATEGORIES.filter(c => c.slug !== 'all');

  return (
    <section className="py-12 sm:py-16 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
          <div>
            <span className="text-xs font-semibold tracking-widest text-[#C85A70] uppercase">
              Curated Wardrobe
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2A1E1D] mt-1">
              Shop by Category
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#543834] mt-2 sm:mt-0 max-w-md">
            From fluid evening dresses to timeless heritage weaves and hand-finished accessories, curated for every moment.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCategories.map((category) => (
            <div
              key={category.slug}
              onClick={() => handleCategorySelect(category.slug)}
              className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 bg-stone-200"
            >
              {/* Category Image with Zoom Effect */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
              />

              {/* Ambient Dark Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-opacity group-hover:opacity-90" />

              {/* Top Floating Badge */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm text-[#2A1E1D] flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-md">
                <ArrowUpRight className="w-4 h-4 text-[#C85A70]" />
              </div>

              {/* Category Details at Bottom */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[11px] uppercase tracking-wider text-[#F4B8C5] font-semibold block mb-1">
                  {category.count} Curated Pieces
                </span>
                <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#FDF2F4] transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-stone-200 mt-1 line-clamp-2 font-normal opacity-90">
                  {category.description}
                </p>

                <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-semibold text-[#FDF2F4] group-hover:text-white">
                  <span>Explore Collection</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
