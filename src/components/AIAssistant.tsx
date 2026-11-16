import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  ShoppingBag, 
  Eye, 
  RefreshCw, 
  ChevronDown, 
  ArrowRight,
  Sparkle,
  SlidersHorizontal,
  Bot
} from 'lucide-react';
import { Product } from '../data/products';
import { useShop } from '../context/ShopContext';

interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  recommendedProducts?: Product[];
  timestamp: string;
}

export const AIAssistant: React.FC = () => {
  const { isAIAssistantOpen, setIsAIAssistantOpen, openProductModal, addToCart } = useShop();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: "Hello darling! Welcome to HerCloset. I am your personal AI Stylist. Tell me about your upcoming occasion, preferred colors, silhouette style, or budget — or ask me anything about our fabrics, sizing, and deliveries!",
      timestamp: 'Just now'
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [occasion, setOccasion] = useState('');
  const [budget, setBudget] = useState('');
  const [size, setSize] = useState('');
  const [showPreferences, setShowPreferences] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAIAssistantOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        inputRef.current?.focus();
      }, 150);
    }
  }, [isAIAssistantOpen, messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputQuery).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const preferences: Record<string, string> = {};
      if (occasion) preferences.occasion = occasion;
      if (budget) preferences.budget = budget;
      if (size) preferences.size = size;

      const response = await fetch('/api/ai-stylist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          userQuery: text,
          preferences
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: data.reply || "Here are my curated recommendations for you:",
        recommendedProducts: data.recommendedProducts || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error contacting AI Stylist:', error);
      // Graceful fallback response
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          role: 'assistant',
          content: "I'm experiencing a brief pause with my cloud styling wardrobe, but here are some of our most celebrated pieces you might adore! Feel free to ask about our silk dresses, linen blazers, or complimentary returns.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-1',
        role: 'assistant',
        content: "Hello again! How can I curate your wardrobe today?",
        timestamp: 'Just now'
      }
    ]);
  };

  const suggestedQuestions = [
    "Cocktail dress under $150",
    "Pair accessories with the Mulberry Silk Dress",
    "Pastel festive Ethnic Wear",
    "Tailored workwear with a linen blazer",
    "What is your return & exchange policy?"
  ];

  return (
    <>
      {/* Floating Bottom-Right AI Assistant Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {/* Pulsing Label for Attention */}
        {!isAIAssistantOpen && (
          <div 
            onClick={() => setIsAIAssistantOpen(true)}
            className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-[#F4B8C5] shadow-lg cursor-pointer hover:bg-[#FDF2F4] transition-all transform hover:-translate-x-1"
          >
            <Sparkle className="w-3.5 h-3.5 text-[#C85A70] animate-spin" />
            <span className="text-xs font-semibold text-[#2A1E1D]">Need styling advice?</span>
          </div>
        )}

        <button
          onClick={() => setIsAIAssistantOpen(!isAIAssistantOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 ${
            isAIAssistantOpen
              ? 'bg-[#2A1E1D] text-white'
              : 'bg-gradient-to-tr from-[#C85A70] to-[#E07A8B] text-white ring-4 ring-[#FCE7EC]'
          }`}
          aria-label="Open AI Fashion Assistant"
          title="HerCloset AI Stylist"
        >
          {isAIAssistantOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="relative">
              <Sparkles className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping" />
            </div>
          )}
        </button>
      </div>

      {/* Modern Luxury Chat Window */}
      {isAIAssistantOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-40 w-[94vw] sm:w-[420px] max-h-[78vh] h-[640px] bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#F4B8C5]/80 flex flex-col overflow-hidden animate-scaleIn">
          
          {/* Header */}
          <div className="bg-[#2A1E1D] p-4 text-white flex items-center justify-between border-b border-[#3D2826]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#C85A70] to-[#E07A8B] flex items-center justify-center text-white shadow-xs">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif text-base font-bold text-white">HerCloset AI Stylist</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </div>
                <p className="text-[10px] text-[#F4B8C5] tracking-wide">
                  Online • Personal Fashion Concierge
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-stone-300">
              <button
                onClick={() => setShowPreferences(!showPreferences)}
                className={`p-1.5 rounded-lg hover:text-white transition-colors ${showPreferences ? 'bg-white/10 text-white' : ''}`}
                title="Styling Preferences"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetChat}
                className="p-1.5 rounded-lg hover:text-white transition-colors"
                title="Restart Chat"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsAIAssistantOpen(false)}
                className="p-1.5 rounded-lg hover:text-white transition-colors"
                title="Close Window"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Optional Preferences Quick Filter Bar */}
          {showPreferences && (
            <div className="p-3 bg-white border-b border-[#EFE6DE] text-xs space-y-2 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#2A1E1D] text-[11px] uppercase tracking-wider">
                  Styling Filters:
                </span>
                <button
                  onClick={() => { setOccasion(''); setBudget(''); setSize(''); }}
                  className="text-[10px] text-[#C85A70] hover:underline"
                >
                  Clear
                </button>
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="bg-[#FAF8F5] border border-[#EFE6DE] rounded-lg p-1.5 text-[11px] text-[#2A1E1D]"
                >
                  <option value="">Occasion</option>
                  <option value="Cocktail">Cocktail</option>
                  <option value="Wedding Guest">Wedding</option>
                  <option value="Work & Boardroom">Workwear</option>
                  <option value="Festive Ethnic">Festive</option>
                  <option value="Casual Weekend">Casual</option>
                </select>

                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="bg-[#FAF8F5] border border-[#EFE6DE] rounded-lg p-1.5 text-[11px] text-[#2A1E1D]"
                >
                  <option value="">Budget</option>
                  <option value="Under $100">Under $100</option>
                  <option value="Under $150">Under $150</option>
                  <option value="Under $200">Under $200</option>
                </select>

                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="bg-[#FAF8F5] border border-[#EFE6DE] rounded-lg p-1.5 text-[11px] text-[#2A1E1D]"
                >
                  <option value="">My Size</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </div>
            </div>
          )}

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-xs ${
                    msg.role === 'user'
                      ? 'bg-[#2A1E1D] text-white rounded-br-none'
                      : 'bg-white text-[#2A1E1D] border border-[#EFE6DE] rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>
                </div>

                {/* Embedded Clickable Recommended Products */}
                {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                  <div className="mt-2.5 w-full space-y-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#C85A70] block">
                      Recommended for You:
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {msg.recommendedProducts.map((prod) => (
                        <div
                          key={prod.id}
                          className="flex items-center gap-3 p-2.5 bg-white rounded-xl border border-[#F4B8C5]/70 shadow-xs hover:border-[#C85A70] transition-all"
                        >
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="w-12 h-14 object-cover rounded-lg shrink-0 cursor-pointer"
                            onClick={() => openProductModal(prod)}
                          />

                          <div className="flex-1 min-w-0">
                            <h4
                              onClick={() => openProductModal(prod)}
                              className="font-serif text-xs font-semibold text-[#2A1E1D] hover:text-[#C85A70] cursor-pointer truncate"
                            >
                              {prod.name}
                            </h4>
                            <p className="text-[11px] font-bold text-[#C85A70]">${prod.price}</p>
                            <p className="text-[10px] text-stone-400 truncate">
                              Sizes: {prod.sizes.join(', ')}
                            </p>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => openProductModal(prod)}
                              className="p-1.5 text-stone-500 hover:text-[#2A1E1D] bg-[#FAF8F5] rounded-lg border border-[#EFE6DE]"
                              title="View details"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => addToCart(prod, prod.colors[0]?.name, prod.sizes[0], 1)}
                              className="p-1.5 text-[#C85A70] hover:text-white bg-[#FDF2F4] hover:bg-[#C85A70] rounded-lg border border-[#F4B8C5] transition-colors"
                              title="Add to shopping bag"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <span className="text-[10px] text-stone-400 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-[#543834] bg-white p-3 rounded-2xl border border-[#EFE6DE] max-w-[70%]">
                <Sparkles className="w-4 h-4 text-[#C85A70] animate-spin" />
                <span>HerCloset Stylist is curating...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Pills */}
          <div className="px-3 py-2 bg-white border-t border-[#FAF8F5] overflow-x-auto flex items-center gap-1.5 scrollbar-none">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(q)}
                disabled={isLoading}
                className="whitespace-nowrap px-2.5 py-1 rounded-full text-[10px] font-medium bg-[#FAF8F5] hover:bg-[#FDF2F4] text-[#543834] hover:text-[#C85A70] border border-[#EFE6DE] transition-colors shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-[#EFE6DE]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask for outfit pairings, sizes, fabrics..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                disabled={isLoading}
                className="flex-1 py-2.5 px-3.5 text-xs bg-[#FAF8F5] border border-[#EFE6DE] rounded-2xl focus:outline-none focus:border-[#C85A70] text-[#2A1E1D] placeholder:text-stone-400"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim() || isLoading}
                className={`p-2.5 rounded-2xl transition-all cursor-pointer ${
                  inputQuery.trim() && !isLoading
                    ? 'bg-[#C85A70] text-white hover:bg-[#A84558] shadow-md'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
                aria-label="Send query"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};
