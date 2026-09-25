import React, { useState } from 'react';
import { 
  Search, Video, Coins, Bell, Shield, Sparkles, X, Menu, 
  Home, Swords, Tv, Settings, ChevronRight
} from 'lucide-react';
import type { NotificationItem } from '../types';
import { InstallPWA } from './InstallPWA';

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
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const navigateTo = (view: string) => {
    setCurrentView(view);
    setShowMobileDrawer(false);
    setShowProfileMenu(false);
    setShowNotifications(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full max-w-full overflow-x-hidden glass-panel border-b border-white/10 px-2 sm:px-6 py-2.5 sm:py-3.5 backdrop-blur-2xl">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-1.5 sm:gap-6 overflow-hidden">
          
          {/* Left: Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Mobile Drawer Hamburger Button */}
            <button
              onClick={() => setShowMobileDrawer(!showMobileDrawer)}
              className="lg:hidden p-2 rounded-xl hover:bg-white/10 text-gray-200 focus:outline-none active:scale-95 transition"
              aria-label="Toggle Navigation Menu"
            >
              {showMobileDrawer ? <X className="w-5 h-5 text-purple-400" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Brand Logo */}
            <div 
              onClick={() => navigateTo('home')} 
              className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl gradient-btn flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-white animate-pulse" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-2xl font-black tracking-tight gradient-text font-sans">LiveMe</span>
              </div>
            </div>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-extrabold ml-2">
              <button
                onClick={() => navigateTo('home')}
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
                onClick={() => navigateTo('live-room')}
                className={`transition relative py-1 ${
                  currentView === 'live-room' ? 'text-purple-400 font-black' : 'text-gray-300 hover:text-white'
                }`}
              >
                Live Streams
              </button>

              <button
                onClick={() => navigateTo('pk-arena')}
                className={`transition relative py-1 flex items-center gap-1 ${
                  currentView === 'pk-arena' ? 'text-pink-400 font-black' : 'text-gray-300 hover:text-white'
                }`}
              >
                <span className="text-xs">⚡</span> PK Arena
              </button>

              <button
                onClick={() => navigateTo('creator-studio')}
                className={`transition relative py-1 ${
                  currentView === 'creator-studio' ? 'text-purple-400 font-black' : 'text-gray-300 hover:text-white'
                }`}
              >
                Studio
              </button>

              <button
                onClick={() => navigateTo('safety')}
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

          {/* Right Section: Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="md:hidden p-1.5 sm:p-2 rounded-full hover:bg-white/10 text-gray-300 transition"
              aria-label="Toggle Search"
            >
              {showMobileSearch ? <X className="w-4 h-4 text-purple-400" /> : <Search className="w-4 h-4" />}
            </button>

            {/* Coin Wallet Badge */}
            <button 
              onClick={openCoinStore}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 to-purple-500/15 border border-amber-500/30 text-amber-300 font-extrabold text-[11px] sm:text-xs transition active:scale-95 shadow-sm"
            >
              <Coins className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-amber-400/30 animate-pulse shrink-0" />
              <span className="font-bold">{coinBalance.toLocaleString()}</span>
              <span className="hidden xs:inline-block ml-0.5 px-1.5 py-0.2 rounded-full bg-amber-400 text-black font-black text-[9px]">
                +BUY
              </span>
            </button>

            {/* Go Live Button (Desktop Only) */}
            <button
              onClick={() => navigateTo('go-live')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full gradient-btn font-extrabold text-xs shadow-lg hover:scale-105 transition"
            >
              <Video className="w-4 h-4" />
              <span>Go Live</span>
            </button>

            {/* Download App PWA Button */}
            <InstallPWA />

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-1.5 sm:p-2.5 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition relative"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-pink-500 rounded-full ring-2 ring-slate-950 animate-ping" />
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-72 max-w-[calc(100vw-1.5rem)] sm:w-96 glass-panel rounded-3xl border border-white/10 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <h3 className="font-extrabold text-xs uppercase tracking-wider text-gray-200">Notifications</h3>
                    <span className="text-[11px] text-purple-400 font-semibold cursor-pointer">Mark read</span>
                  </div>
                  <div className="mt-3 space-y-2 max-h-72 overflow-y-auto">
                    {notifications.map((n) => (
                      <div 
                        key={n.id} 
                        onClick={() => navigateTo('live-room')}
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

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-7 h-7 sm:w-10 sm:h-10 rounded-full ring-2 ring-purple-500/80 p-0.5 overflow-hidden hover:scale-105 transition shadow-lg shrink-0"
                aria-label="User Profile Menu"
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
                    onClick={() => navigateTo('creator-studio')}
                    className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-gray-200 hover:bg-white/10 rounded-2xl transition text-left"
                  >
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>Creator Studio</span>
                  </button>
                  <button
                    onClick={() => navigateTo('admin')}
                    className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-gray-200 hover:bg-white/10 rounded-2xl transition text-left"
                  >
                    <Shield className="w-4 h-4 text-cyan-400" />
                    <span>Admin Console</span>
                  </button>
                  <button
                    onClick={() => navigateTo('safety')}
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

        {/* Expandable Mobile Search Bar */}
        {showMobileSearch && (
          <div className="md:hidden mt-2 pt-2 border-t border-white/10 animate-in slide-in-from-top-2">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search live streams, creators, tags..."
                className="w-full bg-white/10 border border-purple-500/40 rounded-full pl-10 pr-9 py-2 text-xs text-white placeholder-gray-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu Drawer Sheet (Slide-out Overlay) */}
      {showMobileDrawer && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="w-4/5 max-w-sm h-full bg-[#0d111a] border-r border-white/10 p-5 flex flex-col justify-between shadow-2xl animate-in slide-in-from-left duration-300">
            
            {/* Drawer Top Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl gradient-btn flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg gradient-text">LiveMe</h3>
                    <p className="text-[10px] text-purple-300 font-semibold uppercase tracking-wider">Live & Creator Hub</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowMobileDrawer(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Search Bar inside Drawer */}
              <div className="relative mb-5">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search streams..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Drawer Navigation Links */}
              <div className="space-y-1">
                
                <button
                  onClick={() => navigateTo('home')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition ${
                    currentView === 'home' ? 'bg-purple-600/30 border border-purple-500/50 text-purple-300' : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Home className="w-4 h-4 text-purple-400" />
                    <span>Home Feeds</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>

                <button
                  onClick={() => navigateTo('live-room')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition ${
                    currentView === 'live-room' ? 'bg-purple-600/30 border border-purple-500/50 text-purple-300' : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Tv className="w-4 h-4 text-purple-400" />
                    <span>Live Streams</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-red-500 text-white font-black text-[9px] uppercase animate-pulse">LIVE</span>
                </button>

                <button
                  onClick={() => navigateTo('pk-arena')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition ${
                    currentView === 'pk-arena' ? 'bg-pink-600/30 border border-pink-500/50 text-pink-300' : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Swords className="w-4 h-4 text-pink-400" />
                    <span>PK Battle Arena</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-extrabold text-[10px]">HOT ⚡</span>
                </button>

                <button
                  onClick={() => navigateTo('creator-studio')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition ${
                    currentView === 'creator-studio' ? 'bg-purple-600/30 border border-purple-500/50 text-purple-300' : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Creator Studio</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>

                <button
                  onClick={() => navigateTo('safety')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition ${
                    currentView === 'safety' ? 'bg-purple-600/30 border border-purple-500/50 text-purple-300' : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span>Safety & Community</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>

                <button
                  onClick={() => navigateTo('admin')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition ${
                    currentView === 'admin' ? 'bg-purple-600/30 border border-purple-500/50 text-purple-300' : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Settings className="w-4 h-4 text-cyan-400" />
                    <span>Admin Control Center</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>

              </div>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              
              {/* Go Live Prominent CTA */}
              <button
                onClick={() => navigateTo('go-live')}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl gradient-btn font-extrabold text-sm shadow-xl"
              >
                <Video className="w-4 h-4 text-white" />
                <span>Start Streaming Now</span>
              </button>

              {/* Wallet Summary */}
              <div 
                onClick={() => { openCoinStore(); setShowMobileDrawer(false); }}
                className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between cursor-pointer hover:bg-amber-500/20 transition"
              >
                <div className="flex items-center gap-2.5">
                  <Coins className="w-5 h-5 text-amber-400 fill-amber-400/30" />
                  <div>
                    <div className="text-[10px] text-amber-300 font-extrabold uppercase">Coin Balance</div>
                    <div className="text-xs font-black text-white">{coinBalance.toLocaleString()} Coins</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-xl bg-amber-400 text-black font-black text-[10px]">RECHARGE</span>
              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
};
