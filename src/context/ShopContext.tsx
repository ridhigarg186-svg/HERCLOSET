import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PRODUCTS } from '../data/products';

export interface CartItem {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface ShopContextType {
  cart: CartItem[];
  wishlist: string[];
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isAccountOpen: boolean;
  isAdminOpen: boolean;
  isAIAssistantOpen: boolean;
  activeProductModal: Product | null;
  searchQuery: string;
  selectedCategory: string;
  appliedPromo: { code: string; discountPct: number } | null;
  toasts: Toast[];
  
  // Actions
  addToCart: (product: Product, color?: string, size?: string, quantity?: number) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  setIsCartOpen: (open: boolean) => void;
  setIsWishlistOpen: (open: boolean) => void;
  setIsAccountOpen: (open: boolean) => void;
  setIsAdminOpen: (open: boolean) => void;
  setIsAIAssistantOpen: (open: boolean) => void;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: string) => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  
  // Computations
  cartCount: number;
  wishlistCount: number;
  subtotal: number;
  discountAmount: number;
  total: number;
  freeShippingRemaining: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Local storage initialization
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('hercloset_cart');
      return saved ? JSON.parse(saved) : [
        {
          product: PRODUCTS[0],
          selectedColor: PRODUCTS[0].colors[0].name,
          selectedSize: 'S',
          quantity: 1
        }
      ];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('hercloset_wishlist');
      return saved ? JSON.parse(saved) : ['hc-02', 'hc-05'];
    } catch {
      return ['hc-02', 'hc-05'];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPct: number } | null>({
    code: 'HERSTORY',
    discountPct: 15
  });
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('hercloset_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem('hercloset_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const addToCart = (product: Product, color?: string, size?: string, quantity: number = 1) => {
    const chosenColor = color || product.colors[0]?.name || 'Default';
    const chosenSize = size || product.sizes[0] || 'Standard';

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === chosenColor &&
          item.selectedSize === chosenSize
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, selectedColor: chosenColor, selectedSize: chosenSize, quantity }];
      }
    });

    showToast(`Added "${product.name}" to your shopping bag!`);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
    showToast('Item removed from your bag.', 'info');
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const product = PRODUCTS.find((p) => p.id === productId);
      if (exists) {
        showToast(`Removed "${product?.name || 'Item'}" from wishlist`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`Saved "${product?.name || 'Item'}" to your wishlist!`);
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const openProductModal = (product: Product) => {
    setActiveProductModal(product);
  };

  const closeProductModal = () => {
    setActiveProductModal(null);
  };

  const applyPromoCode = (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'HERSTORY') {
      setAppliedPromo({ code: 'HERSTORY', discountPct: 15 });
      showToast('Promo code HERSTORY applied! 15% discount active.');
      return { success: true, message: '15% discount applied successfully!' };
    } else if (normalized === 'WELCOME20') {
      setAppliedPromo({ code: 'WELCOME20', discountPct: 20 });
      showToast('VIP code WELCOME20 applied! 20% discount active.');
      return { success: true, message: '20% discount applied successfully!' };
    } else {
      return { success: false, message: 'Invalid promo code. Try "HERSTORY" for 15% off.' };
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Promo code removed', 'info');
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = appliedPromo ? Math.round((subtotal * appliedPromo.discountPct) / 100) : 0;
  const total = Math.max(0, subtotal - discountAmount);
  const freeShippingRemaining = Math.max(0, 99 - total);

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        isWishlistOpen,
        isAccountOpen,
        isAdminOpen,
        isAIAssistantOpen,
        activeProductModal,
        searchQuery,
        selectedCategory,
        appliedPromo,
        toasts,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        setIsCartOpen,
        setIsWishlistOpen,
        setIsAccountOpen,
        setIsAdminOpen,
        setIsAIAssistantOpen,
        openProductModal,
        closeProductModal,
        setSearchQuery,
        setSelectedCategory,
        applyPromoCode,
        removePromoCode,
        showToast,
        cartCount,
        wishlistCount,
        subtotal,
        discountAmount,
        total,
        freeShippingRemaining
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
