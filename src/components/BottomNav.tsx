import React from 'react';
import { Home, Tv, Video, User, Swords } from 'lucide-react';

interface BottomNavProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, setCurrentView }) => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0d111a]/90 glass-panel border-t border-white/10 px-3 pt-2 pb-3 flex items-center justify-around shadow-2xl backdrop-blur-2xl">
      
      {/* Home */}
      <button
        onClick={() => setCurrentView('home')}
        className={`relative flex flex-col items-center gap-1 px-3 py-1 text-[10px] font-black transition-all active:scale-95 ${
          currentView === 'home' ? 'text-purple-400 scale-105' : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        <Home className="w-5 h-5" />
        <span>Home</span>
        {currentView === 'home' && (
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50" />
        )}
      </button>

      {/* Live Streams */}
      <button
        onClick={() => setCurrentView('live-room')}
        className={`relative flex flex-col items-center gap-1 px-3 py-1 text-[10px] font-black transition-all active:scale-95 ${
          currentView === 'live-room' ? 'text-purple-400 scale-105' : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        <Tv className="w-5 h-5" />
        <span>Live</span>
        {currentView === 'live-room' && (
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50" />
        )}
      </button>

      {/* Prominent Center Go Live Button */}
      <button
        onClick={() => setCurrentView('go-live')}
        className="flex flex-col items-center justify-center -mt-6 w-14 h-14 rounded-full gradient-btn shadow-2xl shadow-purple-500/60 border-4 border-[#06080d] active:scale-90 transition-transform"
        aria-label="Go Live"
      >
        <Video className="w-6 h-6 text-white animate-pulse" />
      </button>

      {/* PK Battle */}
      <button
        onClick={() => setCurrentView('pk-arena')}
        className={`relative flex flex-col items-center gap-1 px-3 py-1 text-[10px] font-black transition-all active:scale-95 ${
          currentView === 'pk-arena' ? 'text-pink-400 scale-105' : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        <Swords className="w-5 h-5 text-pink-400" />
        <span>PK Arena</span>
        {currentView === 'pk-arena' && (
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-pink-500 rounded-full shadow-lg shadow-pink-500/50" />
        )}
      </button>

      {/* Creator Studio */}
      <button
        onClick={() => setCurrentView('creator-studio')}
        className={`relative flex flex-col items-center gap-1 px-3 py-1 text-[10px] font-black transition-all active:scale-95 ${
          currentView === 'creator-studio' ? 'text-purple-400 scale-105' : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        <User className="w-5 h-5" />
        <span>Studio</span>
        {currentView === 'creator-studio' && (
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50" />
        )}
      </button>

    </nav>
  );
};
