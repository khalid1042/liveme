import React, { useState } from 'react';
import { Search, Video, Coins, Bell, Shield, Sparkles, X } from 'lucide-react';
import type { NotificationItem } from '../types';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  coinBalance: number;
  openCoinStore: () => void;
  notifications: NotificationItem[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  coinBalance,
  openCoinStore,
  notifications,
  searchQuery,
  setSearchQuery,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/10 px-3 sm:px-6 py-2.5 sm:py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-6">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-4">
          <div 
            onClick={() => setCurrentView('home')} 
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl gradient-btn flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-pulse" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tight gradient-text font-sans">VibeLive</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-extrabold">
            <button
              onClick={() => setCurrentView('home')}
              className={`transition relative py-1 ${
                currentView === 'home' ? 'text-purple-400 font-black' : 'text-gray-300 hover:text-white'
              }`}
            >
              Home
              {currentView === 'home' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
              )}
            </button>

            <button
              onClick={() => setCurrentView('live-room')}
              className={`transition relative py-1 ${
                currentView === 'live-room' ? 'text-purple-400 font-black' : 'text-gray-300 hover:text-white'
              }`}
            >
              Live Streams
            </button>

            <button
              onClick={() => setCurrentView('pk-arena')}
              className={`transition relative py-1 flex items-center gap-1 ${
                currentView === 'pk-arena' ? 'text-pink-400 font-black' : 'text-gray-300 hover:text-white'
              }`}
            >
              <span className="text-xs">⚡</span> PK Arena
            </button>

            <button
              onClick={() => setCurrentView('creator-studio')}
              className={`transition relative py-1 ${
                currentView === 'creator-studio' ? 'text-purple-400 font-black' : 'text-gray-300 hover:text-white'
              }`}
            >
              Studio
            </button>

            <button
              onClick={() => setCurrentView('safety')}
              className={`transition relative py-1 ${
                currentView === 'safety' ? 'text-purple-400 font-black' : 'text-gray-300 hover:text-white'
              }`}
            >
              Safety
            </button>
          </nav>
        </div>

        {/* Center Search Input (Desktop) */}
        <div className="flex-1 max-w-xs lg:max-w-sm relative hidden md:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search live streams..."
            className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-1.5 text-xs text-gray-100 placeholder-gray-400 focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/30 transition-all"
          />
        </div>

        {/* Right Section: Mobile & Desktop Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          
          {/* Mobile Search Toggle Icon */}
          <button
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="md:hidden p-2 rounded-full hover:bg-white/10 text-gray-300 transition"
          >
            {showMobileSearch ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button>

          {/* Coin Wallet Button */}
          <button 
            onClick={openCoinStore}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 to-purple-500/10 border border-amber-500/30 text-amber-300 font-extrabold text-[11px] sm:text-xs transition shadow-sm"
          >
            <Coins className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-amber-400/30 animate-pulse shrink-0" />
            <span>{coinBalance.toLocaleString()}</span>
            <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-amber-400 text-black font-black text-[9px]">
              +BUY
            </span>
          </button>

          {/* Go Live Button (Desktop Only) */}
          <button
            onClick={() => setCurrentView('go-live')}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full gradient-btn font-extrabold text-xs shadow-lg hover:scale-105 transition"
          >
            <Video className="w-4 h-4" />
            <span>Go Live</span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 sm:p-2.5 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition relative"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-pink-500 rounded-full ring-2 ring-slate-950 animate-ping" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-72 max-w-[calc(100vw-2rem)] sm:w-96 glass-panel rounded-3xl border border-white/10 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h3 className="font-extrabold text-xs uppercase tracking-wider text-gray-200">Notifications</h3>
                  <span className="text-[11px] text-purple-400 font-semibold cursor-pointer">Mark read</span>
                </div>
                <div className="mt-3 space-y-2 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div 
                      key={n.id} 
                      onClick={() => {
                        setShowNotifications(false);
                        if (n.linkUrl) setCurrentView('live-room');
                      }}
                      className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 cursor-pointer transition flex items-start gap-2.5"
                    >
                      <div className="w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 text-xs font-bold">
                        {n.type === 'live' ? '🔴' : n.type === 'gift' ? '👑' : '⚡'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-gray-100">{n.title}</div>
                        <div className="text-[11px] text-gray-400 line-clamp-2">{n.message}</div>
                        <div className="text-[9px] text-gray-500 mt-1">{n.createdAt}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full ring-2 ring-purple-500/80 p-0.5 overflow-hidden hover:scale-105 transition shadow-lg shrink-0"
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400"
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-3 w-56 sm:w-60 glass-panel rounded-3xl border border-white/10 shadow-2xl p-3 z-50">
                <div className="px-3 py-2 border-b border-white/10 mb-2">
                  <div className="font-extrabold text-xs sm:text-sm text-white">Vibe Creator</div>
                  <div className="text-[11px] text-purple-400 font-medium">@vibeme_user</div>
                </div>
                <button
                  onClick={() => { setCurrentView('creator-studio'); setShowProfileMenu(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-gray-200 hover:bg-white/10 rounded-2xl transition text-left"
                >
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Creator Studio</span>
                </button>
                <button
                  onClick={() => { setCurrentView('admin'); setShowProfileMenu(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-gray-200 hover:bg-white/10 rounded-2xl transition text-left"
                >
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <span>Admin Console</span>
                </button>
                <button
                  onClick={() => { setCurrentView('safety'); setShowProfileMenu(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-gray-200 hover:bg-white/10 rounded-2xl transition text-left"
                >
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>Safety & Rules</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Mobile Search Input Drawer */}
      {showMobileSearch && (
        <div className="md:hidden mt-2 pt-2 border-t border-white/10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search streams..."
              className="w-full bg-white/5 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-xs text-white"
            />
          </div>
        </div>
      )}
    </header>
  );
};
