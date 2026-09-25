import React from 'react';
import { Home, Compass, Radio, Swords, Wallet, BarChart3, ShieldCheck, Users, Video } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  const mainNavItems = [
    { id: 'home', label: 'Home Feed', icon: Home },
    { id: 'discover', label: 'Discover & Explore', icon: Compass },
    { id: 'live-room', label: 'Live Stream Room', icon: Radio },
    { id: 'pk-arena', label: 'PK Battle Arena', icon: Swords, badge: 'HOT' },
    { id: 'wallet', label: 'Wallet & Coins', icon: Wallet },
    { id: 'creator-studio', label: 'Creator Studio', icon: BarChart3 },
    { id: 'admin', label: 'Admin Console', icon: Users },
    { id: 'safety', label: 'Safety & Rules', icon: ShieldCheck },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-white/10 glass-panel p-4 h-[calc(100vh-65px)] sticky top-[65px]">
      <div className="space-y-1 flex-1">
        <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">Navigation</div>
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                isActive
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-gray-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-pink-500 text-white animate-pulse">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/20 text-center">
        <div className="w-10 h-10 rounded-full gradient-btn mx-auto flex items-center justify-center mb-2 shadow-md">
          <Video className="w-5 h-5 text-white" />
        </div>
        <h4 className="text-xs font-bold text-gray-200">Become a Creator</h4>
        <p className="text-[11px] text-gray-400 mt-1 mb-3">Broadcast live, build fans & earn rewards</p>
        <button
          onClick={() => setCurrentView('go-live')}
          className="w-full py-2 rounded-xl gradient-btn text-xs font-bold shadow"
        >
          Start Streaming
        </button>
      </div>
    </aside>
  );
};
