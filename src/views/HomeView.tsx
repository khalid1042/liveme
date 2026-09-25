import React, { useState } from 'react';
import { Radio, Users, Play, Sparkles, Filter, TrendingUp, Trophy, Zap, ArrowDown } from 'lucide-react';
import { MOCK_CATEGORIES, MOCK_STREAMS } from '../services/mockData';
import type { LiveStream } from '../types';

interface HomeViewProps {
  onSelectStream: (stream: LiveStream) => void;
  searchQuery: string;
}

export const HomeView: React.FC<HomeViewProps> = ({ onSelectStream, searchQuery }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredStreams = MOCK_STREAMS.filter(stream => {
    const matchesCategory = activeCategory === 'all' || stream.categoryId === activeCategory;
    const matchesSearch = searchQuery === '' || 
      stream.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stream.creator.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stream.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredStream = MOCK_STREAMS[0];
  const pkStreams = MOCK_STREAMS.filter(s => s.isPK);

  return (
    <div className="space-y-16 pb-24">
      
      {/* 1. Hero Landing Banner */}
      <div className="relative rounded-[2.5rem] overflow-hidden glass-panel border border-purple-500/20 p-8 sm:p-14 min-h-[440px] flex flex-col justify-end group shadow-2xl">
        <img
          src={featuredStream.coverUrl}
          alt={featuredStream.title}
          className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06080d] via-[#06080d]/65 to-black/30" />

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full gradient-live text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg live-pulse">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              LIVE NOW
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-500/20 backdrop-blur text-purple-300 border border-purple-500/30">
              {featuredStream.categoryName}
            </span>
            <span className="text-xs font-bold text-gray-300 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur">
              <Users className="w-3.5 h-3.5 text-pink-400" />
              {featuredStream.viewerCount.toLocaleString()} Live Viewers
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-black uppercase tracking-widest text-purple-300">
              GO LIVE. CONNECT. BE SEEN.
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-none group-hover:text-purple-200 transition-colors">
              WHERE CREATORS THRIVE
            </h1>
          </div>

          <p className="text-sm text-gray-300 max-w-xl leading-relaxed">
            Join the ultimate live-streaming community. Discover talented creators, chat in real time, send animated virtual gifts, and participate in PK battles!
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onSelectStream(featuredStream)}
              className="flex items-center gap-2.5 px-8 py-3.5 rounded-full gradient-btn font-extrabold text-sm shadow-xl hover:scale-105 active:scale-95 transition"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start Watching</span>
            </button>

            <button
              onClick={() => onSelectStream(featuredStream)}
              className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white font-bold text-sm border border-white/20 transition"
            >
              <Radio className="w-4 h-4 text-pink-400" />
              <span>Start Streaming</span>
            </button>
          </div>
        </div>

        <div className="absolute bottom-4 right-8 hidden sm:flex items-center gap-2 text-xs font-bold text-gray-400 animate-bounce">
          <span>Explore Platform</span>
          <ArrowDown className="w-4 h-4 text-purple-400" />
        </div>
      </div>

      {/* 2. Platform Stats Counter Section */}
      <div className="space-y-6 text-center max-w-4xl mx-auto">
        <div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            A Premier Live Streaming Platform
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            Connecting millions of creators and fans worldwide in real time.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl stat-box-registered text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-cyan-300">450M+</div>
            <div className="text-xs font-bold text-gray-400">Registered Users</div>
          </div>

          <div className="p-5 rounded-3xl stat-box-active text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-emerald-300">20M+</div>
            <div className="text-xs font-bold text-gray-400">Daily Active Viewers</div>
          </div>

          <div className="p-5 rounded-3xl stat-box-countries text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-green-300">190+</div>
            <div className="text-xs font-bold text-gray-400">Countries Supported</div>
          </div>

          <div className="p-5 rounded-3xl stat-box-monthly text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-amber-300">8M+</div>
            <div className="text-xs font-bold text-gray-400">Monthly Broadcasters</div>
          </div>
        </div>
      </div>

      {/* 3. Browse Categories */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-gray-100 flex items-center gap-2 tracking-wide uppercase">
            <Filter className="w-4 h-4 text-purple-400" />
            <span>Browse Categories</span>
          </h2>
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all border ${
              activeCategory === 'all'
                ? 'gradient-btn text-white border-transparent shadow-lg shadow-purple-500/30'
                : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            🔥 All Streams
          </button>
          {MOCK_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all border ${
                activeCategory === cat.id
                  ? 'gradient-btn text-white border-transparent shadow-lg shadow-purple-500/30'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Live PK Battle Championship Section */}
      {pkStreams.length > 0 && (
        <div className="p-6 sm:p-8 rounded-[2rem] glass-panel border border-pink-500/30 bg-gradient-to-r from-purple-950/40 via-slate-950/80 to-pink-950/40 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-pink-500/20 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-amber-400 animate-bounce" />
              </div>
              <div>
                <h3 className="font-black text-sm text-gray-100 tracking-wide uppercase flex items-center gap-2">
                  <span>PK BATTLE CHAMPIONSHIP</span>
                  <span className="px-2 py-0.5 rounded-full bg-pink-500 text-white font-black text-[9px] animate-pulse">
                    LIVE
                  </span>
                </h3>
                <p className="text-xs text-gray-400">Head-to-head 5-minute stream battles!</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pkStreams.slice(0, 2).map(stream => (
              <div 
                key={stream.id}
                onClick={() => onSelectStream(stream)}
                className="glass-card p-4 rounded-2xl cursor-pointer hover:border-pink-500/60 flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <img src={stream.creator.avatarUrl} className="w-12 h-12 rounded-full ring-2 ring-pink-500 object-cover shadow-md" />
                    <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 bg-gradient-to-r from-pink-600 to-purple-600 text-[9px] font-black rounded-md text-white shadow">
                      PK
                    </span>
                  </div>
                  <div>
                    <div className="font-extrabold text-xs text-gray-100 group-hover:text-pink-300 transition line-clamp-1">{stream.title}</div>
                    <div className="text-[11px] text-pink-400 font-bold mt-0.5">{stream.creator.displayName}</div>
                    <div className="text-[10px] text-gray-400 flex items-center gap-1 mt-1 font-semibold">
                      <Zap className="w-3 h-3 text-amber-400" />
                      {stream.viewerCount.toLocaleString()} watching
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-full gradient-btn text-xs font-black shrink-0 shadow-md group-hover:scale-105 transition">
                  Join PK
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Hot Live Streams Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-gray-100 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <span>Hot Live Streams</span>
          </h2>
          <span className="text-xs text-gray-400 font-semibold">{filteredStreams.length} Broadcasters Live</span>
        </div>

        {filteredStreams.length === 0 ? (
          <div className="glass-panel p-16 rounded-[2rem] text-center space-y-3">
            <Radio className="w-12 h-12 text-gray-600 mx-auto" />
            <div className="text-sm font-bold text-gray-300">No live streams found</div>
            <p className="text-xs text-gray-500">Try choosing a different category or search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStreams.map(stream => (
              <div
                key={stream.id}
                onClick={() => onSelectStream(stream)}
                className="glass-card rounded-3xl overflow-hidden cursor-pointer group flex flex-col shadow-xl"
              >
                <div className="relative aspect-video overflow-hidden bg-slate-950">
                  <img
                    src={stream.coverUrl}
                    alt={stream.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06080d] via-transparent to-black/30" />

                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full gradient-live text-white font-black text-[10px] tracking-wider uppercase shadow-md flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      LIVE
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-purple-300 text-[10px] font-bold border border-white/10">
                      {stream.categoryName}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur text-pink-400 text-[11px] font-extrabold flex items-center gap-1">
                    <Users className="w-3 h-3 text-pink-400" />
                    {stream.viewerCount.toLocaleString()}
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-xs">
                    <div className="w-14 h-14 rounded-full gradient-btn flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                      <Play className="w-7 h-7 fill-white ml-0.5" />
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <h3 className="font-extrabold text-sm text-gray-100 group-hover:text-purple-300 transition line-clamp-2 leading-snug">
                    {stream.title}
                  </h3>

                  <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                    <img
                      src={stream.creator.avatarUrl}
                      alt={stream.creator.displayName}
                      className="w-9 h-9 rounded-full ring-2 ring-purple-500/50 object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-extrabold text-gray-100 truncate flex items-center gap-1">
                        {stream.creator.displayName}
                        <Sparkles className="w-3 h-3 text-amber-400" />
                      </div>
                      <div className="text-[11px] text-gray-400 truncate">
                        {stream.creator.followersCount.toLocaleString()} followers
                      </div>
                    </div>

                    <button 
                      onClick={(e) => { e.stopPropagation(); onSelectStream(stream); }}
                      className="px-3.5 py-1.5 rounded-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-xs font-bold transition shadow"
                    >
                      Watch
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 6. Why Broadcasters Choose VibeLive Showcase */}
      <div className="glass-panel p-8 sm:p-12 rounded-[2.5rem] border border-purple-500/20 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-4xl font-black text-white">Why Broadcasters Choose VibeLive</h2>
          <p className="text-sm text-gray-400">Everything creators need to build an audience and monetize live content.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-3xl space-y-3 border border-white/10">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-2xl">
              📹
            </div>
            <h3 className="font-extrabold text-base text-white">Ultra-Low Latency Streaming</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Broadcast live video with sub-second latency across WebRTC and HLS, delivering real-time interaction to global fans.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl space-y-3 border border-white/10">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold text-2xl">
              💎
            </div>
            <h3 className="font-extrabold text-base text-white">Virtual Gifts & Creator Economy</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Earn direct revenue from fans sending animated 3D gifts, backed by an immutable ledger and instant coin store recharge.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl space-y-3 border border-white/10">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-2xl">
              ⚔️
            </div>
            <h3 className="font-extrabold text-base text-white">PK Battles & Engagement</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Engage your fans with live side-by-side 5-minute PK battles, boosting interactivity, watch time, and gift earnings.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
