import React from 'react';
import { Home, Compass, Video, User, Swords } from 'lucide-react';

interface BottomNavProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, setCurrentView }) => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-white/10 px-2 pt-2 pb-3 flex items-center justify-around shadow-2xl backdrop-blur-xl">
      <button
        onClick={() => setCurrentView('home')}
        className={`flex flex-col items-center gap-1 px-3 py-1 text-[10px] font-black transition-transform active:scale-95 ${
          currentView === 'home' ? 'text-purple-400 scale-105' : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        <Home className="w-5 h-5" />
        <span>Home</span>
      </button>

      <button
        onClick={() => setCurrentView('discover')}
        className={`flex flex-col items-center gap-1 px-3 py-1 text-[10px] font-black transition-transform active:scale-95 ${
          currentView === 'discover' ? 'text-purple-400 scale-105' : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        <Compass className="w-5 h-5" />
        <span>Discover</span>
      </button>

      {/* Prominent Floating Go Live Button */}
      <button
        onClick={() => setCurrentView('go-live')}
        className="flex flex-col items-center justify-center -mt-7 w-14 h-14 rounded-full gradient-btn shadow-xl shadow-purple-500/50 border-4 border-[#06080d] active:scale-90 transition-transform"
        aria-label="Go Live"
      >
        <Video className="w-6 h-6 text-white animate-pulse" />
      </button>

      <button
        onClick={() => setCurrentView('pk-arena')}
        className={`flex flex-col items-center gap-1 px-3 py-1 text-[10px] font-black transition-transform active:scale-95 ${
          currentView === 'pk-arena' ? 'text-pink-400 scale-105' : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        <Swords className="w-5 h-5 text-pink-400" />
        <span>PK Battle</span>
      </button>

      <button
        onClick={() => setCurrentView('creator-studio')}
        className={`flex flex-col items-center gap-1 px-3 py-1 text-[10px] font-black transition-transform active:scale-95 ${
          currentView === 'creator-studio' ? 'text-purple-400 scale-105' : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        <User className="w-5 h-5" />
        <span>Studio</span>
      </button>
    </nav>
  );
};
