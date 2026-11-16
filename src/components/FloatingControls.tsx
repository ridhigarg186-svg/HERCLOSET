import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, ArrowLeftRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const FloatingControls: React.FC = () => {
  const { isAIAssistantOpen } = useShop();
  const [scrollProgress, setScrollProgress] = useState(0);

  // Position preference: 'right' (default, removed from left corner) or 'left'
  const [cornerPosition, setCornerPosition] = useState<'right' | 'left'>(() => {
    try {
      return (localStorage.getItem('hercloset_nav_corner') as 'right' | 'left') || 'right';
    } catch {
      return 'right';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('hercloset_nav_corner', cornerPosition);
    } catch (e) {
      console.error(e);
    }
  }, [cornerPosition]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.round((window.scrollY / totalHeight) * 100));
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  const toggleCorner = () => {
    setCornerPosition(prev => (prev === 'right' ? 'left' : 'right'));
  };

  // Position classes:
  // When in right corner:
  // If AI chat is open, shift to the left of the chat window on screens >= sm, or stay safely positioned.
  const positionClasses = cornerPosition === 'right'
    ? isAIAssistantOpen
      ? 'fixed bottom-24 right-4 sm:right-[436px] z-40'
      : 'fixed bottom-24 right-7.5 z-40'
    : 'fixed bottom-6 left-6 z-40';

  return (
    <div className={`${positionClasses} flex flex-col items-center gap-2 select-none transition-all duration-300`}>
      
      {/* Top Button */}
      <button
        onClick={scrollToTop}
        className="group relative w-11 h-11 rounded-2xl bg-white/95 backdrop-blur-md text-[#2A1E1D] hover:text-white hover:bg-[#2A1E1D] hover:border-[#2A1E1D] border border-[#EFE6DE] shadow-xl flex flex-col items-center justify-center transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 cursor-pointer"
        aria-label="Scroll to Top of Screen"
        title="Scroll to Top"
      >
        <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 text-[#C85A70] group-hover:text-white" />
        <span className="text-[9px] font-bold tracking-tight uppercase -mt-0.5 group-hover:text-white">Top</span>
        
        {/* Tooltip */}
        <span className={`absolute ${cornerPosition === 'right' ? 'right-14' : 'left-14'} bg-[#2A1E1D] text-white text-[11px] font-semibold px-2.5 py-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg`}>
          Scroll to Top
        </span>
      </button>

      {/* Bottom Button */}
      <button
        onClick={scrollToBottom}
        className="group relative w-11 h-11 rounded-2xl bg-white/95 backdrop-blur-md text-[#2A1E1D] hover:text-white hover:bg-[#2A1E1D] hover:border-[#2A1E1D] border border-[#EFE6DE] shadow-xl flex flex-col items-center justify-center transition-all duration-300 transform hover:translate-y-1 active:translate-y-0 cursor-pointer"
        aria-label="Scroll to Bottom of Screen"
        title="Scroll to Bottom"
      >
        <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5 text-[#C85A70] group-hover:text-white" />
        <span className="text-[9px] font-bold tracking-tight uppercase -mt-0.5 group-hover:text-white">Btm</span>
        
        {/* Tooltip */}
        <span className={`absolute ${cornerPosition === 'right' ? 'right-14' : 'left-14'} bg-[#2A1E1D] text-white text-[11px] font-semibold px-2.5 py-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg`}>
          Scroll to Bottom
        </span>
      </button>

      {/* Corner Switcher Toggle (Switch between Right Corner & Left Corner) */}
      <button
        onClick={toggleCorner}
        className="w-7 h-7 rounded-full bg-white/80 hover:bg-[#FAF8F5] text-[#543834] hover:text-[#C85A70] border border-[#EFE6DE] shadow-xs flex items-center justify-center transition-colors cursor-pointer group relative mt-0.5"
        title={`Move buttons to ${cornerPosition === 'right' ? 'Left' : 'Right'} corner`}
        aria-label="Toggle screen corner position"
      >
        <ArrowLeftRight className="w-3 h-3 transition-transform group-hover:scale-110" />
        <span className={`absolute ${cornerPosition === 'right' ? 'right-9' : 'left-9'} bg-[#2A1E1D] text-white text-[10px] font-medium px-2 py-0.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md`}>
          Move to {cornerPosition === 'right' ? 'Left' : 'Right'} corner
        </span>
      </button>

    </div>
  );
};
