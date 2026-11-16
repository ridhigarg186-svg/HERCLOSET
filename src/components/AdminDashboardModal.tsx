import React, { useState } from 'react';
import { 
  X, 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Sparkles, 
  TrendingUp, 
  DollarSign, 
  Users, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Search, 
  Tag, 
  Sliders, 
  Save, 
  Trash2,
  RefreshCw,
  Truck
} from 'lucide-react';
import { PRODUCTS, Product, STORE_POLICIES } from '../data/products';
import { useShop } from '../context/ShopContext';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AdminOrder {
  id: string;
  customerName: string;
  email: string;
  items: string;
  total: number;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Pending';
  tracking: string;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
  const { appliedPromo, showToast } = useShop();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'ai-analytics' | 'settings'>('overview');
  const [productCatalog, setProductCatalog] = useState<Product[]>(PRODUCTS);
  const [productSearch, setProductSearch] = useState('');
  
  // New product form state
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<'Dresses' | 'Western Wear' | 'Ethnic Wear' | 'Accessories'>('Dresses');
  const [newProdPrice, setNewProdPrice] = useState('110');
  const [newProdOriginalPrice, setNewProdOriginalPrice] = useState('145');
  const [newProdStock, setNewProdStock] = useState('15');

  // Orders management state
  const [orders, setOrders] = useState<AdminOrder[]>([
    {
      id: 'HC-94821',
      customerName: 'Eleanor Vance',
      email: 'eleanor.vance@example.com',
      items: 'Aura Silk Slip Dress (Blush Rose, S)',
      total: 139,
      date: 'Today, 10:24 AM',
      status: 'Processing',
      tracking: 'FX-8492018'
    },
    {
      id: 'HC-94820',
      customerName: 'Sophia Reynolds',
      email: 'sophia.r@example.com',
      items: 'Zahra Chanderi Anarkali Set (M) + Kundan Jhumkas',
      total: 241,
      date: 'Yesterday, 4:15 PM',
      status: 'Shipped',
      tracking: 'FX-7392109'
    },
    {
      id: 'HC-94819',
      customerName: 'Maya Kapoor',
      email: 'maya.k@example.com',
      items: 'Sienna Tailored Blazer + Palazzo Trousers',
      total: 214,
      date: 'Oct 19, 2026',
      status: 'Delivered',
      tracking: 'FX-6291048'
    },
    {
      id: 'HC-94818',
      customerName: 'Claire Dupont',
      email: 'claire.d@example.com',
      items: 'Palma Handcrafted Leather Bucket Tote',
      total: 145,
      date: 'Oct 18, 2026',
      status: 'Delivered',
      tracking: 'FX-5192837'
    }
  ]);

  // Settings
  const [shippingThreshold, setShippingThreshold] = useState(STORE_POLICIES.freeShippingThreshold);
  const [promoCodes, setPromoCodes] = useState([
    { code: 'HERSTORY', discount: 15, active: true },
    { code: 'WELCOME20', discount: 20, active: true },
    { code: 'VIPSTYLE', discount: 25, active: false }
  ]);
  const [newPromoCode, setNewPromoCode] = useState('');
  const [newPromoDiscount, setNewPromoDiscount] = useState('10');

  if (!isOpen) return null;

  // Filtered products for admin list
  const filteredAdminProducts = productCatalog.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.id.toLowerCase().includes(productSearch.toLowerCase())
  );

  const handleToggleStock = (productId: string) => {
    setProductCatalog(prev =>
      prev.map(p => {
        if (p.id === productId) {
          const nextStock = !p.inStock;
          showToast(`Updated stock status for ${p.name}: ${nextStock ? 'In Stock' : 'Out of Stock'}`);
          return { ...p, inStock: nextStock };
        }
        return p;
      })
    );
  };

  const handleUpdateStockCount = (productId: string, delta: number) => {
    setProductCatalog(prev =>
      prev.map(p => {
        if (p.id === productId) {
          const newCount = Math.max(0, p.stockCount + delta);
          return { ...p, stockCount: newCount, inStock: newCount > 0 };
        }
        return p;
      })
    );
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    const newProduct: Product = {
      id: `hc-${Date.now().toString().slice(-4)}`,
      name: newProdName.trim(),
      category: newProdCategory,
      subCategory: 'Curated Collection',
      price: parseFloat(newProdPrice) || 99,
      originalPrice: parseFloat(newProdOriginalPrice) || 129,
      rating: 5.0,
      reviewCount: 1,
      description: 'Newly added exquisite silhouette crafted from ethical natural fabrics for the modern HerCloset woman.',
      details: ['Handcrafted artisanal tailoring', 'Pure breathable fibers', 'Tailored comfort fit'],
      fabricCare: 'Dry clean recommended or gentle hand wash.',
      images: [
        'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80'
      ],
      colors: [
        { name: 'Blush Rose', hex: '#E8A598' },
        { name: 'Warm Ivory', hex: '#FAF8F5' }
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      isNew: true,
      inStock: true,
      stockCount: parseInt(newProdStock, 10) || 15,
      pairWithIds: ['hc-05'],
      tags: ['new', 'chic', 'hercloset'],
      reviews: []
    };

    setProductCatalog([newProduct, ...productCatalog]);
    setShowAddProduct(false);
    setNewProdName('');
    showToast(`Added new product "${newProduct.name}" to HerCloset catalog!`);
  };

  const handleUpdateOrderStatus = (orderId: string, status: AdminOrder['status']) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status } : o))
    );
    showToast(`Order #${orderId} marked as ${status}`);
  };

  const handleAddPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromoCode.trim()) return;
    setPromoCodes([
      ...promoCodes,
      { code: newPromoCode.trim().toUpperCase(), discount: parseInt(newPromoDiscount, 10) || 10, active: true }
    ]);
    setNewPromoCode('');
    showToast(`Promo code ${newPromoCode.toUpperCase()} activated!`);
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0) + 47850;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-fadeIn">
      <div className="relative bg-[#FAF8F5] rounded-3xl max-w-6xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-[#EFE6DE] flex flex-col">
        
        {/* Top Header */}
        <div className="p-5 sm:p-6 bg-[#2A1E1D] text-white flex items-center justify-between border-b border-[#3D2826] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C85A70] flex items-center justify-center text-white shadow-md">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
                  HerCloset Atelier Console
                </h2>
                <span className="bg-[#C85A70] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Admin
                </span>
              </div>
              <p className="text-xs text-[#F4B8C5]">
                Manage orders, real-time inventory, store settings, and AI Stylist interactions.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-300 hover:text-white rounded-full transition-colors cursor-pointer"
            aria-label="Close admin dashboard"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 px-6 py-3 bg-white border-b border-[#EFE6DE] text-xs font-semibold overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-[#2A1E1D] text-white shadow-xs'
                : 'text-[#543834] hover:bg-[#FAF8F5]'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-[#F4B8C5]" />
            <span>Store Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'products'
                ? 'bg-[#2A1E1D] text-white shadow-xs'
                : 'text-[#543834] hover:bg-[#FAF8F5]'
            }`}
          >
            <Package className="w-4 h-4 text-[#F4B8C5]" />
            <span>Catalog & Inventory ({productCatalog.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-[#2A1E1D] text-white shadow-xs'
                : 'text-[#543834] hover:bg-[#FAF8F5]'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-[#F4B8C5]" />
            <span>Orders & Dispatch ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('ai-analytics')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'ai-analytics'
                ? 'bg-[#2A1E1D] text-white shadow-xs'
                : 'text-[#543834] hover:bg-[#FAF8F5]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#C85A70]" />
            <span>AI Stylist Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'bg-[#2A1E1D] text-white shadow-xs'
                : 'text-[#543834] hover:bg-[#FAF8F5]'
            }`}
          >
            <Sliders className="w-4 h-4 text-[#F4B8C5]" />
            <span>Promo & Store Settings</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* 1. OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-[#EFE6DE] shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#543834]">
                    <span>Total Sales (30 Days)</span>
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="font-serif text-3xl font-bold text-[#2A1E1D]">${totalRevenue.toLocaleString()}</p>
                  <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+18.4% vs last month</span>
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#EFE6DE] shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#543834]">
                    <span>Orders Fulfilled</span>
                    <ShoppingBag className="w-4 h-4 text-[#C85A70]" />
                  </div>
                  <p className="font-serif text-3xl font-bold text-[#2A1E1D]">328</p>
                  <p className="text-[11px] text-[#543834]">12 currently in transit</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#EFE6DE] shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#543834]">
                    <span>Avg. Order Value (AOV)</span>
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="font-serif text-3xl font-bold text-[#2A1E1D]">$148.20</p>
                  <p className="text-[11px] text-stone-400">Industry benchmark: $115</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#EFE6DE] shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#543834]">
                    <span>AI Stylist Consultations</span>
                    <Sparkles className="w-4 h-4 text-[#C85A70]" />
                  </div>
                  <p className="font-serif text-3xl font-bold text-[#C85A70]">1,420</p>
                  <p className="text-[11px] text-emerald-700 font-semibold">41.8% conversion rate</p>
                </div>
              </div>

              {/* Quick Action Alerts */}
              <div className="bg-[#FDF2F4] p-4 rounded-2xl border border-[#F4B8C5] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-[#C85A70] shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-[#2A1E1D]">Inventory Attention Required</h4>
                    <p className="text-[11px] text-[#543834]">
                      2 items have less than 10 units remaining: <strong>Noor Velvet Sharara (6 left)</strong> and <strong>Mira Organza Saree (7 left)</strong>.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('products')}
                  className="px-3 py-1.5 bg-[#C85A70] text-white text-xs font-semibold rounded-xl hover:bg-[#A84558] transition-colors shrink-0"
                >
                  Manage Stock
                </button>
              </div>

              {/* Recent Orders Preview */}
              <div className="bg-white rounded-2xl p-5 border border-[#EFE6DE] shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#FAF8F5] pb-3">
                  <h3 className="font-serif text-lg font-bold text-[#2A1E1D]">Live Order Activity</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-xs text-[#C85A70] font-semibold hover:underline">
                    View All Orders →
                  </button>
                </div>

                <div className="space-y-3">
                  {orders.slice(0, 3).map(order => (
                    <div key={order.id} className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F5] border border-[#EFE6DE] text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#2A1E1D]">{order.id}</span>
                          <span className="text-stone-400">•</span>
                          <span className="font-semibold text-[#543834]">{order.customerName}</span>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5">{order.items}</p>
                      </div>

                      <div className="text-right flex items-center gap-4">
                        <span className="font-bold text-[#2A1E1D]">${order.total}</span>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          order.status === 'Processing' ? 'bg-amber-100 text-amber-800' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          'bg-emerald-100 text-emerald-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* 2. PRODUCTS & INVENTORY TAB */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search catalog by name or category..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#EFE6DE] rounded-xl focus:outline-none focus:border-[#C85A70]"
                  />
                </div>

                <button
                  onClick={() => setShowAddProduct(!showAddProduct)}
                  className="w-full sm:w-auto px-4 py-2 bg-[#2A1E1D] hover:bg-[#3D2826] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#F4B8C5]" />
                  <span>{showAddProduct ? 'Cancel' : 'Add New Style'}</span>
                </button>
              </div>

              {/* Add New Product Form */}
              {showAddProduct && (
                <form onSubmit={handleAddProduct} className="p-4 bg-white rounded-2xl border border-[#F4B8C5] shadow-sm space-y-3 animate-fadeIn">
                  <h4 className="font-serif text-base font-bold text-[#2A1E1D]">Add New Garment to Catalog</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-semibold text-[#2A1E1D] block mb-1">Product Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Celine Crushed Velvet Slip Dress"
                        value={newProdName}
                        onChange={(e) => setNewProdName(e.target.value)}
                        required
                        className="w-full p-2 text-xs bg-[#FAF8F5] border border-[#EFE6DE] rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-[#2A1E1D] block mb-1">Category</label>
                      <select
                        value={newProdCategory}
                        onChange={(e) => setNewProdCategory(e.target.value as any)}
                        className="w-full p-2 text-xs bg-[#FAF8F5] border border-[#EFE6DE] rounded-lg"
                      >
                        <option value="Dresses">Dresses</option>
                        <option value="Western Wear">Western Wear</option>
                        <option value="Ethnic Wear">Ethnic Wear</option>
                        <option value="Accessories">Accessories</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-[#2A1E1D] block mb-1">Stock Units</label>
                      <input
                        type="number"
                        value={newProdStock}
                        onChange={(e) => setNewProdStock(e.target.value)}
                        className="w-full p-2 text-xs bg-[#FAF8F5] border border-[#EFE6DE] rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-[#2A1E1D] block mb-1">Sale Price ($)</label>
                      <input
                        type="number"
                        value={newProdPrice}
                        onChange={(e) => setNewProdPrice(e.target.value)}
                        className="w-full p-2 text-xs bg-[#FAF8F5] border border-[#EFE6DE] rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-[#2A1E1D] block mb-1">Original Price ($)</label>
                      <input
                        type="number"
                        value={newProdOriginalPrice}
                        onChange={(e) => setNewProdOriginalPrice(e.target.value)}
                        className="w-full p-2 text-xs bg-[#FAF8F5] border border-[#EFE6DE] rounded-lg"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#C85A70] hover:bg-[#A84558] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    Save & Publish to Store
                  </button>
                </form>
              )}

              {/* Products Table */}
              <div className="bg-white rounded-2xl border border-[#EFE6DE] overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F5] border-b border-[#EFE6DE] text-[#2A1E1D] font-semibold">
                    <tr>
                      <th className="p-3">Product</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Stock Count</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#FAF8F5]">
                    {filteredAdminProducts.map(p => (
                      <tr key={p.id} className="hover:bg-[#FDF2F4]/40 transition-colors">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <img src={p.images[0]} alt={p.name} className="w-10 h-12 object-cover rounded-lg shrink-0" />
                            <div>
                              <p className="font-bold text-[#2A1E1D]">{p.name}</p>
                              <p className="text-[10px] text-stone-400">ID: {p.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-[#543834] font-medium">{p.category}</td>
                        <td className="p-3 font-bold text-[#2A1E1D]">
                          ${p.price} <span className="line-through text-stone-400 font-normal text-[10px]">${p.originalPrice}</span>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleUpdateStockCount(p.id, -1)}
                              className="w-5 h-5 bg-[#FAF8F5] rounded text-stone-600 hover:bg-stone-200 flex items-center justify-center font-bold"
                            >
                              -
                            </button>
                            <span className={`font-bold ${p.stockCount < 10 ? 'text-amber-700' : 'text-[#2A1E1D]'}`}>
                              {p.stockCount}
                            </span>
                            <button
                              onClick={() => handleUpdateStockCount(p.id, 1)}
                              className="w-5 h-5 bg-[#FAF8F5] rounded text-stone-600 hover:bg-stone-200 flex items-center justify-center font-bold"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            p.inStock && p.stockCount > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {p.inStock && p.stockCount > 0 ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => handleToggleStock(p.id)}
                            className="text-[11px] text-[#C85A70] hover:underline font-semibold"
                          >
                            {p.inStock ? 'Mark Out of Stock' : 'Mark In Stock'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* 3. ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-[#2A1E1D]">Customer Orders & Shipment Status</h3>
                <span className="text-xs text-[#543834] font-medium">{orders.length} Total Registered</span>
              </div>

              <div className="space-y-3">
                {orders.map(order => (
                  <div key={order.id} className="bg-white rounded-2xl p-4 border border-[#EFE6DE] shadow-xs space-y-3 text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#FAF8F5] pb-2">
                      <div>
                        <span className="font-bold text-[#2A1E1D] text-sm">{order.id}</span>
                        <span className="text-stone-400 mx-2">•</span>
                        <span className="text-stone-500">{order.date}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-stone-400 text-[11px]">Update Status:</span>
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as any)}
                          className="bg-[#FAF8F5] border border-[#EFE6DE] rounded-lg px-2.5 py-1 text-xs font-semibold text-[#2A1E1D]"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Pending">Pending</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <div>
                        <p className="text-stone-400 text-[11px]">Customer</p>
                        <p className="font-bold text-[#2A1E1D]">{order.customerName}</p>
                        <p className="text-stone-500 text-[11px]">{order.email}</p>
                      </div>

                      <div>
                        <p className="text-stone-400 text-[11px]">Ensemble Ordered</p>
                        <p className="font-medium text-[#2A1E1D]">{order.items}</p>
                      </div>

                      <div className="sm:text-right">
                        <p className="text-stone-400 text-[11px]">Total & Tracking</p>
                        <p className="font-bold text-sm text-[#C85A70]">${order.total}</p>
                        <p className="text-[11px] text-stone-500 font-mono">FedEx: {order.tracking}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. AI ANALYTICS TAB */}
          {activeTab === 'ai-analytics' && (
            <div className="space-y-6">
              
              <div className="p-5 bg-gradient-to-r from-[#2A1E1D] to-[#3D2826] text-white rounded-3xl shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-[#F4B8C5] text-xs font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <span>Gemini 3.8 Flash • Fashion Intelligence Engine</span>
                </div>
                <h3 className="font-serif text-2xl font-bold">HerCloset AI Stylist Inquiries</h3>
                <p className="text-xs text-[#EFE6DE]/80 max-w-xl">
                  Real-time conversational styling assisting customers with occasion matching, fabric recommendations, and outfit pairings.
                </p>
              </div>

              {/* Top Queried Occasions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-[#EFE6DE] space-y-3">
                  <h4 className="text-xs font-bold text-[#2A1E1D] uppercase tracking-wider">Top Customer Styling Prompts</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center p-2 rounded-xl bg-[#FAF8F5]">
                      <span>"Cocktail dress under $150"</span>
                      <span className="font-bold text-[#C85A70]">412 requests</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-xl bg-[#FAF8F5]">
                      <span>"Accessories matching Mulberry Silk Dress"</span>
                      <span className="font-bold text-[#C85A70]">340 requests</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-xl bg-[#FAF8F5]">
                      <span>"Festive Ethnic Wear in pastel tones"</span>
                      <span className="font-bold text-[#C85A70]">289 requests</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-xl bg-[#FAF8F5]">
                      <span>"Tailored workwear with linen blazer"</span>
                      <span className="font-bold text-[#C85A70]">215 requests</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#EFE6DE] space-y-3">
                  <h4 className="text-xs font-bold text-[#2A1E1D] uppercase tracking-wider">Top AI Recommended Products</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-[#FAF8F5]">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#C85A70]">#1</span>
                        <span>Aura Mulberry Silk Slip Dress</span>
                      </div>
                      <span className="font-bold text-[#2A1E1D]">540 picks</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-[#FAF8F5]">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#C85A70]">#2</span>
                        <span>Elysian Rose Quartz Pendant</span>
                      </div>
                      <span className="font-bold text-[#2A1E1D]">480 picks</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-[#FAF8F5]">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#C85A70]">#3</span>
                        <span>Sienna Double-Breasted Linen Blazer</span>
                      </div>
                      <span className="font-bold text-[#2A1E1D]">320 picks</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* 5. SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              
              {/* Promo Codes Management */}
              <div className="bg-white p-5 rounded-2xl border border-[#EFE6DE] space-y-4">
                <div className="flex items-center justify-between border-b border-[#FAF8F5] pb-2">
                  <h4 className="font-serif text-base font-bold text-[#2A1E1D]">Store Promotional Discount Codes</h4>
                  <span className="text-xs text-stone-400">Active for checkout</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {promoCodes.map((p, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-[#F4B8C5] bg-[#FDF2F4] flex items-center justify-between text-xs">
                      <div>
                        <p className="font-mono font-bold text-[#C85A70]">{p.code}</p>
                        <p className="text-[11px] text-[#543834]">{p.discount}% OFF storewide</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${p.active ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'}`}>
                        {p.active ? 'Active' : 'Paused'}
                      </span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddPromoCode} className="pt-2 flex gap-2">
                  <input
                    type="text"
                    placeholder="New code (e.g. FLASH30)"
                    value={newPromoCode}
                    onChange={(e) => setNewPromoCode(e.target.value)}
                    className="flex-1 text-xs p-2 bg-[#FAF8F5] border border-[#EFE6DE] rounded-xl uppercase font-mono"
                  />
                  <input
                    type="number"
                    placeholder="Discount %"
                    value={newPromoDiscount}
                    onChange={(e) => setNewPromoDiscount(e.target.value)}
                    className="w-24 text-xs p-2 bg-[#FAF8F5] border border-[#EFE6DE] rounded-xl"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#2A1E1D] hover:bg-[#3D2826] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    Create Code
                  </button>
                </form>
              </div>

              {/* Free Shipping Configuration */}
              <div className="bg-white p-5 rounded-2xl border border-[#EFE6DE] space-y-3">
                <h4 className="font-serif text-base font-bold text-[#2A1E1D]">Shipping Policy Configuration</h4>
                <div className="flex items-center gap-4 text-xs">
                  <label className="font-semibold text-[#2A1E1D]">Free Express Shipping Threshold ($):</label>
                  <input
                    type="number"
                    value={shippingThreshold}
                    onChange={(e) => setShippingThreshold(parseInt(e.target.value, 10) || 0)}
                    className="w-24 p-2 bg-[#FAF8F5] border border-[#EFE6DE] rounded-xl font-bold text-[#2A1E1D]"
                  />
                  <button
                    onClick={() => {
                      STORE_POLICIES.freeShippingThreshold = shippingThreshold;
                      showToast(`Free shipping threshold updated to $${shippingThreshold}!`);
                    }}
                    className="px-4 py-2 bg-[#C85A70] text-white text-xs font-semibold rounded-xl hover:bg-[#A84558] transition-colors cursor-pointer"
                  >
                    Save Threshold
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
