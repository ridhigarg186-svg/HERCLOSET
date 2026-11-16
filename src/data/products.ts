export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  fitRating?: 'Runs small' | 'True to size' | 'Runs large';
  sizePurchased?: string;
}

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'Dresses' | 'Western Wear' | 'Ethnic Wear' | 'Accessories';
  subCategory: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  description: string;
  details: string[];
  fabricCare: string;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  isNew?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  inStock: boolean;
  stockCount: number;
  pairWithIds: string[];
  tags: string[];
  reviews: Review[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'hc-01',
    name: 'Aura Mulberry Silk Slip Dress',
    category: 'Dresses',
    subCategory: 'Maxi Dresses',
    price: 139,
    originalPrice: 185,
    rating: 4.9,
    reviewCount: 48,
    description: 'Cut on the bias from pure 19-momme mulberry silk, the Aura Slip Dress effortlessly drapes the silhouette with a subtle cowl neckline and delicate adjustable criss-cross back straps. Perfect for evening celebrations, dinner dates, or layered beneath our structured blazer.',
    details: [
      '100% Grade 6A Mulberry Silk',
      'Bias cut for natural fluid movement',
      'Gentle cowl neckline & French seams',
      'Floor grazing length with graceful side slit',
      'Adjustable slim back straps'
    ],
    fabricCare: 'Dry clean recommended, or hand wash cold in delicate silk detergent. Iron inside out on lowest silk setting.',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Blush Rose', hex: '#E8A598' },
      { name: 'Warm Champagne', hex: '#F3E5AB' },
      { name: 'Espresso Noir', hex: '#2A1E1D' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: true,
    isTrending: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 14,
    pairWithIds: ['hc-05', 'hc-09', 'hc-10'],
    tags: ['cocktail', 'evening', 'party', 'silk', 'romantic', 'wedding guest'],
    reviews: [
      {
        id: 'r1',
        author: 'Evelyn V.',
        rating: 5,
        date: '2 days ago',
        comment: 'The drape of this silk dress is heavenly. It feels expensive and fits like a dream! Wore it to a wedding and got so many compliments.',
        verified: true,
        fitRating: 'True to size',
        sizePurchased: 'S'
      },
      {
        id: 'r2',
        author: 'Sophia R.',
        rating: 5,
        date: '1 week ago',
        comment: 'High quality silk, gorgeous blush tone. The side slit gives it just the right amount of edge.',
        verified: true,
        fitRating: 'True to size',
        sizePurchased: 'M'
      }
    ]
  },
  {
    id: 'hc-02',
    name: 'Zahra Handcrafted Chanderi Anarkali Set',
    category: 'Ethnic Wear',
    subCategory: 'Anarkali Sets',
    price: 189,
    originalPrice: 245,
    rating: 5.0,
    reviewCount: 39,
    description: 'A poetic celebration of heritage craftsmanship. Features a flowing kalidar kurta woven in fine blush pink Chanderi silk with delicate golden zari embroidery along the yoke, complemented by matching churidar pants and a featherlight scallop-edged organza dupatta.',
    details: [
      'Pure Chanderi Silk Kurta with Cotton Muslin lining',
      'Hand-embellished zari and gota patti threadwork',
      'Kalidar flare exceeding 4.5 meters',
      'Includes scallop-bordered pure organza dupatta',
      'Comfortable elasticated waistband pants with pocket'
    ],
    fabricCare: 'Professional dry clean only. Preserve in breathable cotton garment bag.',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Pastel Blush', hex: '#F4B8C5' },
      { name: 'Ivory Gold', hex: '#F5EFEB' },
      { name: 'Sage Mint', hex: '#A8C3A0' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isNew: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 8,
    pairWithIds: ['hc-10', 'hc-12'],
    tags: ['ethnic', 'festive', 'traditional', 'wedding', 'anarkali', 'chanderi', 'embroidered'],
    reviews: [
      {
        id: 'r3',
        author: 'Priya M.',
        rating: 5,
        date: '3 days ago',
        comment: 'Pure luxury! The zari work is exceptionally neat and the organza dupatta is so ethereal. Best ethnic purchase of the year.',
        verified: true,
        fitRating: 'True to size',
        sizePurchased: 'L'
      }
    ]
  },
  {
    id: 'hc-03',
    name: 'Sienna Tailored Double-Breasted Linen Blazer',
    category: 'Western Wear',
    subCategory: 'Jackets & Blazers',
    price: 125,
    originalPrice: 160,
    rating: 4.8,
    reviewCount: 32,
    description: 'Impeccably tailored from breathable European linen with structured shoulder pads, tortoise shell buttons, and a tapered waistline. A transitional wardrobe staple for boardroom confidence and weekend brunch effortless chic.',
    details: [
      '100% Breathable European Flax Linen',
      'Half-lined in airy viscose for summer comfort',
      'Double-breasted front with real horn-finish buttons',
      'Front flap pockets & peak lapels',
      'Slightly oversized structured silhouette'
    ],
    fabricCare: 'Dry clean only to maintain shoulder pad architecture.',
    images: [
      'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Warm Ivory', hex: '#F7F4EF' },
      { name: 'Dusty Cocoa', hex: '#543834' },
      { name: 'Blush Cream', hex: '#F9E5E3' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isTrending: true,
    inStock: true,
    stockCount: 19,
    pairWithIds: ['hc-04', 'hc-09'],
    tags: ['blazer', 'workwear', 'formal', 'linen', 'tailored', 'chic'],
    reviews: [
      {
        id: 'r4',
        author: 'Claire D.',
        rating: 5,
        date: '5 days ago',
        comment: 'The cut is so flattering! The linen has great substance without feeling stiff. I wear it with jeans and trousers alike.',
        verified: true,
        fitRating: 'True to size',
        sizePurchased: 'S'
      }
    ]
  },
  {
    id: 'hc-04',
    name: 'Palazzo High-Waisted Pleated Trousers',
    category: 'Western Wear',
    subCategory: 'Trousers',
    price: 89,
    originalPrice: 115,
    rating: 4.7,
    reviewCount: 27,
    description: 'Fluid wide-leg trousers engineered with front knife pleats, slanted side pockets, and an elongated clean waistband. Drapes effortlessly over heels or leather loafers.',
    details: [
      'Premium Tencel-Rayon blend with liquid drape',
      'High-rise waist with hidden hook-and-bar closure',
      'Full wide-leg silhouette with front pleat detail',
      'Deep functional side pockets',
      'Wrinkle-resistant fabric'
    ],
    fabricCare: 'Machine wash gentle cycle cold with like colors. Hang to dry.',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Espresso Brown', hex: '#2A1E1D' },
      { name: 'Alabaster Ivory', hex: '#FBF9F5' },
      { name: 'Dusty Rose', hex: '#DCA2A9' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isBestSeller: true,
    inStock: true,
    stockCount: 22,
    pairWithIds: ['hc-03', 'hc-07', 'hc-09'],
    tags: ['pants', 'trousers', 'workwear', 'formal', 'high-waist', 'pleated'],
    reviews: [
      {
        id: 'r5',
        author: 'Maya K.',
        rating: 5,
        date: '1 week ago',
        comment: 'These are the best trousers I have ever owned. High waisted, super flattering around the hips, and leg lengthening.',
        verified: true,
        fitRating: 'Runs large',
        sizePurchased: 'XS'
      }
    ]
  },
  {
    id: 'hc-05',
    name: 'Elysian Rose Quartz & 18K Vermeil Pendant',
    category: 'Accessories',
    subCategory: 'Jewelry',
    price: 65,
    originalPrice: 85,
    rating: 4.9,
    reviewCount: 54,
    description: 'A genuine faceted rose quartz gemstone set by hand in thick 18K gold vermeil over sterling silver. Suspended on a delicate adjustable cable chain with our HerCloset hallmark charm.',
    details: [
      'Ethically sourced untreated Rose Quartz crystal',
      '18K Gold Vermeil (2.5 micron over 925 Sterling Silver)',
      'Adjustable 16 to 18 inch chain length',
      'Hypoallergenic & nickel-free',
      'Comes packaged in HerCloset velvet keepsake box'
    ],
    fabricCare: 'Avoid direct contact with perfumes and water. Polish gently with included microfiber cloth.',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Warm Gold', hex: '#D4AF37' },
      { name: 'Rose Gold', hex: '#B76E79' }
    ],
    sizes: ['One Size'],
    isTrending: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 35,
    pairWithIds: ['hc-01', 'hc-06', 'hc-08'],
    tags: ['jewelry', 'necklace', 'gold', 'gemstone', 'pendant', 'accessories'],
    reviews: [
      {
        id: 'r6',
        author: 'Ananya S.',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Dainty and stunning! The pale rose quartz glows under warm lights. Never take it off.',
        verified: true
      }
    ]
  },
  {
    id: 'hc-06',
    name: 'Mira Floral Embroidered Organza Saree',
    category: 'Ethnic Wear',
    subCategory: 'Sarees',
    price: 175,
    originalPrice: 220,
    rating: 4.9,
    reviewCount: 41,
    description: 'Drape yourself in ethereal grace. Woven in sheer blush organza silk and embellished with delicate hand-embroidered pastel florals, pearl accents, and scalloped resham borders. Comes with an unstitched heavy silk blouse piece.',
    details: [
      'Pure Organza Silk 5.5m body',
      'Includes 0.8m unstitched raw silk blouse fabric',
      'Hand-crafted threadwork with Japanese seed pearl detailing',
      'Airy and crisp drape holding elegant pleats',
      'Artisanal handcrafted piece'
    ],
    fabricCare: 'Strictly dry clean only. Roll wrap inside muslin cloth.',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Blush Powder', hex: '#F8D8DC' },
      { name: 'Vintage Lavender', hex: '#E6E0F8' },
      { name: 'Champagne Ivory', hex: '#F7F3E8' }
    ],
    sizes: ['Free Size (5.5m)'],
    isNew: true,
    isTrending: true,
    inStock: true,
    stockCount: 7,
    pairWithIds: ['hc-05', 'hc-10'],
    tags: ['saree', 'ethnic', 'organza', 'embroidered', 'wedding', 'reception', 'pastel'],
    reviews: [
      {
        id: 'r7',
        author: 'Tara N.',
        rating: 5,
        date: '4 days ago',
        comment: 'An absolute masterpiece. The organza has such a royal feel and the scalloped border is breathtaking in person.',
        verified: true
      }
    ]
  },
  {
    id: 'hc-07',
    name: 'Seraphina Silk Cowl Neck Camisole',
    category: 'Western Wear',
    subCategory: 'Tops & Blouses',
    price: 58,
    originalPrice: 75,
    rating: 4.8,
    reviewCount: 62,
    description: 'Lustrous sandwashed silk camisole featuring a graceful fluid cowl neck and micro-adjustable spaghetti straps. Perfect paired with high-rise trousers or under your favorite knit cardigan.',
    details: [
      '100% Sandwashed Silk Charmeuse',
      'Flattering cowl neckline with double-layer chest facing',
      'French seam finishing throughout',
      'Breathable, temperature-regulating natural silk',
      'Hip-length curved hemline'
    ],
    fabricCare: 'Hand wash cold or dry clean. Hang dry in shade.',
    images: [
      'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Warm Ivory', hex: '#FFFDF9' },
      { name: 'Blush Petal', hex: '#FADADD' },
      { name: 'Espresso', hex: '#2A1E1D' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isBestSeller: true,
    inStock: true,
    stockCount: 28,
    pairWithIds: ['hc-04', 'hc-03', 'hc-05'],
    tags: ['top', 'camisole', 'silk', 'blouse', 'western', 'layering'],
    reviews: [
      {
        id: 'r8',
        author: 'Jennifer T.',
        rating: 5,
        date: '6 days ago',
        comment: 'Luxurious feel! The neckline is cut at the perfect drop — flattering without being too revealing.',
        verified: true,
        fitRating: 'True to size',
        sizePurchased: 'M'
      }
    ]
  },
  {
    id: 'hc-08',
    name: 'Soleil Floral Chiffon Tiered Maxi Dress',
    category: 'Dresses',
    subCategory: 'Maxi Dresses',
    price: 118,
    originalPrice: 148,
    rating: 4.9,
    reviewCount: 38,
    description: 'Brimming with bohemian romance, this tiered maxi is crafted from semi-sheer georgette chiffon adorned with watercolor botanical prints. Features ruffled flutter sleeves, a smocked elastic bodice, and a tiered sweeping hem.',
    details: [
      'Lightweight chiffon with full viscose lining',
      'Comfort-stretch smocked bodice fitting all bust shapes',
      'Delicate ruffled flutter sleeves',
      'Tiered gathered skirt with romantic flutter motion',
      'Ankle length'
    ],
    fabricCare: 'Machine wash delicate cold in mesh laundry bag. Low iron.',
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Blush Floral', hex: '#F7C6CF' },
      { name: 'Ivory Wildflower', hex: '#F8F6F0' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    isNew: true,
    inStock: true,
    stockCount: 16,
    pairWithIds: ['hc-05', 'hc-09'],
    tags: ['dress', 'floral', 'summer', 'vacation', 'resort', 'boho', 'maxi'],
    reviews: [
      {
        id: 'r9',
        author: 'Rhea B.',
        rating: 5,
        date: '1 week ago',
        comment: 'Twirl factor 10/10! The smocked top is comfortable and holds you nicely without needing a strapless bra.',
        verified: true,
        fitRating: 'True to size',
        sizePurchased: 'S'
      }
    ]
  },
  {
    id: 'hc-09',
    name: 'Palma Handcrafted Leather Bucket Tote',
    category: 'Accessories',
    subCategory: 'Bags',
    price: 145,
    originalPrice: 195,
    rating: 4.9,
    reviewCount: 46,
    description: 'Sculpted from buttery Italian vegetable-tanned leather in warm espresso with solid brushed gold hardware. Features an internal removable canvas pouch, drawstring closure, and detachable crossbody strap.',
    details: [
      '100% Full-grain vegetable tanned Italian leather',
      'Custom gold-tone HerCloset embossed hardware',
      'Removable organic cotton drawstring pouch',
      'Accommodates 11-inch iPad, wallet, cosmetic pouch, sunglasses',
      'Reinforced bottom feet for durability'
    ],
    fabricCare: 'Wipe clean with soft damp cloth. Condition leather biannually.',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Espresso Brown', hex: '#2A1E1D' },
      { name: 'Warm Biscuit', hex: '#C49A7A' },
      { name: 'Ivory Cream', hex: '#FAF5EE' }
    ],
    sizes: ['One Size (10" x 8" x 6")'],
    isBestSeller: true,
    inStock: true,
    stockCount: 12,
    pairWithIds: ['hc-01', 'hc-03', 'hc-04'],
    tags: ['bag', 'tote', 'leather', 'handbag', 'accessories', 'luxury'],
    reviews: [
      {
        id: 'r10',
        author: 'Morgan P.',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Leather smells incredible! Looks and feels like a $600 designer bag. I carry it everywhere.',
        verified: true
      }
    ]
  },
  {
    id: 'hc-10',
    name: 'Kashmiri Kundan & Pearl Jhumka Earrings',
    category: 'Accessories',
    subCategory: 'Jewelry',
    price: 52,
    originalPrice: 70,
    rating: 4.9,
    reviewCount: 31,
    description: 'Heirloom-inspired drop earrings handcrafted with precision Kundan stonework, blushing meenakari detailing on the reverse, and cascading clusters of natural seed pearls.',
    details: [
      'Brass alloy with 22K micro gold plating',
      'Faceted glass Kundan stones with foil backing',
      'Freshwater baroque seed pearl drops',
      'Traditional push-back mechanism with comfort pad',
      'Lightweight hollow dome construction (14g each)'
    ],
    fabricCare: 'Store dry in air-tight container. Keep away from water and cosmetics.',
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Blush & Gold', hex: '#E5A5A5' },
      { name: 'Pearl Antique', hex: '#F4ECE1' }
    ],
    sizes: ['One Size (2.8" drop)'],
    isTrending: true,
    inStock: true,
    stockCount: 20,
    pairWithIds: ['hc-02', 'hc-06'],
    tags: ['earrings', 'jewelry', 'ethnic', 'kundan', 'pearls', 'festive', 'jhumka'],
    reviews: [
      {
        id: 'r11',
        author: 'Ritika G.',
        rating: 5,
        date: '1 week ago',
        comment: 'Not heavy on the ears at all, which is so rare for jhumkas! The pink detailing matches my anarkali perfectly.',
        verified: true
      }
    ]
  },
  {
    id: 'hc-11',
    name: 'Helena Knitted Ribbed Cardigan & Cami Set',
    category: 'Western Wear',
    subCategory: 'Co-ords & Knits',
    price: 98,
    originalPrice: 130,
    rating: 4.7,
    reviewCount: 29,
    description: 'A cozy 2-piece knit set spun from ultra-soft fine merino and cotton blend yarn. Includes a square-neck fitted cropped camisole and an easy relaxed button-down cardigan with shell buttons.',
    details: [
      '70% Combed Cotton, 30% Extra-fine Merino Wool',
      '2-piece matching set (Cami + Cardigan)',
      'Subtle vertical rib texture creating a slimming contour',
      'Natural freshwater shell buttons',
      'Soft on sensitive skin with zero itch'
    ],
    fabricCare: 'Hand wash cold flat dry. Store folded to preserve knit elasticity.',
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Oatmeal Ivory', hex: '#EBE6DC' },
      { name: 'Rose Quartz', hex: '#F2D3D8' },
      { name: 'Mocha Brown', hex: '#4B3832' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    isNew: true,
    inStock: true,
    stockCount: 15,
    pairWithIds: ['hc-04', 'hc-09'],
    tags: ['knitwear', 'cardigan', 'sweater', 'co-ord', 'casual', 'cozy'],
    reviews: [
      {
        id: 'r12',
        author: 'Hannah M.',
        rating: 5,
        date: '3 weeks ago',
        comment: 'So soft and flattering! The knit is high quality, holds its shape, and goes with everything in my capsule wardrobe.',
        verified: true,
        fitRating: 'True to size',
        sizePurchased: 'S'
      }
    ]
  },
  {
    id: 'hc-12',
    name: 'Noor Embroidered Velvet Peplum Sharara Set',
    category: 'Ethnic Wear',
    subCategory: 'Sharara Sets',
    price: 215,
    originalPrice: 280,
    rating: 5.0,
    reviewCount: 22,
    description: 'Crafted from plush micro-velvet in royal deep espresso, adorned with hand-carved tilla and sequin embroidery along the neckline and cuffs. Paired with flared crinkled silk georgette sharara pants and an embroidered net dupatta.',
    details: [
      'Plush Silk Micro-Velvet Top with Shantoon lining',
      'Georgette flared multi-tiered sharara pants with elasticated back',
      'Intricate tilla work and cutdana beadwork done by master artisans',
      'Includes 2.5m scalloped sheer net dupatta',
      'Ideal for winter weddings, sangeet, and gala receptions'
    ],
    fabricCare: 'Strictly professional dry clean only.',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Velvet Espresso', hex: '#2A1E1D' },
      { name: 'Dusty Plum Rose', hex: '#633A4A' },
      { name: 'Antique Gold', hex: '#C29B38' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    isTrending: true,
    inStock: true,
    stockCount: 6,
    pairWithIds: ['hc-10', 'hc-05'],
    tags: ['ethnic', 'sharara', 'velvet', 'wedding', 'festive', 'embroidered', 'luxury'],
    reviews: [
      {
        id: 'r13',
        author: 'Simran K.',
        rating: 5,
        date: '5 days ago',
        comment: 'Fit for a royal! The velvet is buttery soft, rich dark color, and the flare on the sharara is breathtaking when walking.',
        verified: true,
        fitRating: 'True to size',
        sizePurchased: 'M'
      }
    ]
  }
];

export const CATEGORIES = [
  {
    name: 'All',
    slug: 'all',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
    count: PRODUCTS.length,
    description: 'Explore the full HerCloset curation'
  },
  {
    name: 'Dresses',
    slug: 'Dresses',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80',
    count: PRODUCTS.filter(p => p.category === 'Dresses').length,
    description: 'Silk slips, romantic floral maxis & evening silhouettes'
  },
  {
    name: 'Western Wear',
    slug: 'Western Wear',
    image: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=600&q=80',
    count: PRODUCTS.filter(p => p.category === 'Western Wear').length,
    description: 'Tailored blazers, wide-leg trousers, co-ords & fine knits'
  },
  {
    name: 'Ethnic Wear',
    slug: 'Ethnic Wear',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    count: PRODUCTS.filter(p => p.category === 'Ethnic Wear').length,
    description: 'Handcrafted anarkalis, organza sarees & embroidered shararas'
  },
  {
    name: 'Accessories',
    slug: 'Accessories',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
    count: PRODUCTS.filter(p => p.category === 'Accessories').length,
    description: 'Fine 18K vermeil jewelry, Italian leather totes & Kundan drops'
  }
];

export const STORE_POLICIES = {
  freeShippingThreshold: 99,
  shippingTimes: '2 - 4 business days with premium tracked courier',
  returnsPolicy: '30-day hassle-free complimentary returns and exchanges',
  customerSupportHours: 'Monday – Saturday: 9:00 AM – 8:00 PM EST',
  phone: '+1 (800) 437-2567',
  email: 'care@hercloset.com',
  locations: 'Flagship Studios in New York, London, & Mumbai'
};

export const SIZE_CHART = [
  { size: 'XS', us: '0-2', bust: '31-33"', waist: '24-26"', hip: '34-36"' },
  { size: 'S', us: '4-6', bust: '33-35"', waist: '26-28"', hip: '36-38"' },
  { size: 'M', us: '8-10', bust: '35-37"', waist: '28-30"', hip: '38-40"' },
  { size: 'L', us: '12-14', bust: '38-40"', waist: '31-33"', hip: '41-43"' },
  { size: 'XL', us: '16', bust: '41-43"', waist: '34-36"', hip: '44-46"' },
  { size: 'XXL', us: '18', bust: '44-46"', waist: '37-39"', hip: '47-49"' }
];

export const LOOKBOOKS = [
  {
    id: 'lb-1',
    title: 'The Golden Hour Cocktail',
    description: 'Effortless silk shimmer with warm gold touches for memorable evenings.',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
    itemIds: ['hc-01', 'hc-05', 'hc-09']
  },
  {
    id: 'lb-2',
    title: 'Modern Power Dressing',
    description: 'Crisp European linen tailored blazer meets high-rise fluid trousers.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    itemIds: ['hc-03', 'hc-04', 'hc-07', 'hc-09']
  },
  {
    id: 'lb-3',
    title: 'Festive Pastel Symphony',
    description: 'Chanderi silk embroidered anarkali paired with heirloom Kundan jhumkas.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    itemIds: ['hc-02', 'hc-10']
  }
];
