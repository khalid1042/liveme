import React, { useState, useEffect, useRef } from 'react';
import { Users, Heart, Gift as GiftIcon, Send, ShieldAlert, Sparkles, Volume2, VolumeX, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { LiveStream, ChatMessage, Gift } from '../types';
import { MOCK_GIFTS } from '../services/mockData';

interface LiveRoomViewProps {
  stream: LiveStream;
  coinBalance: number;
  onSendGift: (gift: Gift) => boolean;
  openCoinStore: () => void;
}

export const LiveRoomView: React.FC<LiveRoomViewProps> = ({
  stream,
  coinBalance,
  onSendGift,
  openCoinStore,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'm-1', streamId: stream.id, userId: 'u-1', username: 'CryptoKing', userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100', message: 'Hello everyone! 🔥 Amazing stream!', createdAt: 'Just now' },
    { id: 'm-2', streamId: stream.id, userId: 'u-2', username: 'SarahVibe', userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', message: 'Greetings from Toronto! ❤️', createdAt: 'Just now' },
    { id: 'm-3', streamId: stream.id, userId: 'u-3', username: 'DJ_Flex', userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100', message: 'Drop that bass!! 🎧', createdAt: 'Just now' },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [likeCount, setLikeCount] = useState(stream.totalLikes);
  const [viewerCount, setViewerCount] = useState(stream.viewerCount);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showGiftDrawer, setShowGiftDrawer] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [insufficientCoinsError, setInsufficientCoinsError] = useState(false);
  
  const [hearts, setHearts] = useState<{ id: number; left: number }[]>([]);
  const [activeGiftNotice, setActiveGiftNotice] = useState<{ sender: string; giftName: string; icon: string; price: number } | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const timer = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 5) - 2);

      const randomUsers = ['Alex99', 'Mia_Stars', 'Leo_Music', 'Luna_K', 'Rhythm_Pro'];
      const randomComments = [
        'Awesome vibe! 🔥',
        'Send some hearts ❤️❤️❤️',
        'Who is winning the battle?',
        'Crown for the queen 👑',
        'Love from Brazil 🇧🇷'
      ];
      const randomUser = randomUsers[Math.floor(Math.random() * randomUsers.length)];
      const randomComment = randomComments[Math.floor(Math.random() * randomComments.length)];

      const newMsg: ChatMessage = {
        id: 'sim-' + Date.now(),
        streamId: stream.id,
        userId: 'sim-u',
        username: randomUser,
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
        message: randomComment,
        createdAt: 'Just now'
      };

      setMessages(prev => [...prev.slice(-40), newMsg]);
    }, 4000);

    return () => clearInterval(timer);
  }, [stream.id]);

  const handleLike = () => {
    setLikeCount(prev => prev + 1);
    const newHeart = { id: Date.now(), left: Math.random() * 60 + 20 };
    setHearts(prev => [...prev, newHeart]);
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 2200);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      streamId: stream.id,
      userId: 'me',
      username: 'You',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      userRole: 'user',
      message: inputMessage.trim(),
      createdAt: 'Just now'
    };

    setMessages(prev => [...prev, newMsg]);
    setInputMessage('');
  };

  const handleTriggerGift = (gift: Gift) => {
    const success = onSendGift(gift);
    if (!success) {
      setInsufficientCoinsError(true);
      return;
    }

    setInsufficientCoinsError(false);
    setShowGiftDrawer(false);

    if (gift.coinPrice >= 500) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    setActiveGiftNotice({
      sender: 'You',
      giftName: gift.name,
      icon: gift.imageUrl,
      price: gift.coinPrice
    });

    setTimeout(() => {
      setActiveGiftNotice(null);
    }, 3200);

    const giftChatMsg: ChatMessage = {
      id: 'gift-msg-' + Date.now(),
      streamId: stream.id,
      userId: 'me',
      username: 'You',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      message: `sent ${gift.imageUrl} ${gift.name} (${gift.coinPrice} Coins)`,
      createdAt: 'Just now',
      isGiftNotice: true,
      giftIcon: gift.imageUrl,
      giftName: gift.name
    };

    setMessages(prev => [...prev, giftChatMsg]);
  };

  return (
    <div className="relative min-h-[calc(100vh-100px)] flex flex-col lg:flex-row gap-4 pb-24">

      {/* Main Video Surface */}
      <div className="flex-1 flex flex-col glass-panel rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 relative">
        
        {/* Top Header Overlay Bar */}
        <div className="absolute top-2.5 sm:top-4 left-2.5 sm:left-4 right-2.5 sm:right-4 z-30 flex items-center justify-between gap-2 bg-black/50 backdrop-blur-md p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-white/10">
          <div className="flex items-center gap-2 sm:gap-3">
            <img
              src={stream.creator.avatarUrl}
              alt={stream.creator.displayName}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full ring-2 ring-purple-500 object-cover"
            />
            <div className="min-w-0">
              <div className="font-extrabold text-[11px] sm:text-xs text-white flex items-center gap-1">
                <span className="truncate max-w-[70px] sm:max-w-none">{stream.creator.displayName}</span>
                <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
              </div>
              <div className="text-[9px] sm:text-[10px] text-purple-300 font-medium truncate">
                {stream.creator.followersCount.toLocaleString()} fans
              </div>
            </div>

            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`ml-1 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold transition shadow ${
                isFollowing
                  ? 'bg-white/20 text-gray-200'
                  : 'gradient-btn text-white hover:scale-105'
              }`}
            >
              {isFollowing ? 'Following' : '+ Follow'}
            </button>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 text-[11px] font-extrabold">
              <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-pink-400" />
              <span>{viewerCount.toLocaleString()}</span>
            </div>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 sm:p-2 rounded-full bg-white/10 text-white transition"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-green-400" />}
            </button>

            <button
              onClick={() => setShowReportModal(true)}
              className="p-1.5 sm:p-2 rounded-full bg-white/10 text-gray-300 transition"
              title="Report Stream"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Video Player Surface */}
        <div className="relative flex-1 bg-black aspect-video sm:aspect-auto min-h-[250px] sm:min-h-[480px] flex items-center justify-center overflow-hidden">
          <video
            src={stream.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
          />

          <div className="absolute right-6 bottom-14 pointer-events-none z-30">
            {hearts.map(h => (
              <div
                key={h.id}
                style={{ left: `${h.left}px` }}
                className="absolute bottom-0 text-3xl animate-float-heart"
              >
                💖
              </div>
            ))}
          </div>

          {activeGiftNotice && (
            <div className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 z-40 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-purple-900/90 via-pink-900/90 to-amber-900/90 border-2 border-amber-400/80 shadow-2xl text-center animate-gift-pop flex items-center gap-2.5 backdrop-blur-md">
              <span className="text-2xl sm:text-3xl animate-bounce">{activeGiftNotice.icon}</span>
              <div className="text-left">
                <div className="text-[10px] font-black text-amber-300 uppercase tracking-wider">
                  GIFT BURST!
                </div>
                <div className="text-[11px] font-extrabold text-white">
                  {activeGiftNotice.sender} sent {activeGiftNotice.giftName} ({activeGiftNotice.price} Coins)
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stream Info & Actions Bar */}
        <div className="p-3 sm:p-4 bg-slate-950/90 border-t border-white/10 flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h2 className="font-extrabold text-xs sm:text-sm text-gray-100 truncate">{stream.title}</h2>
            <div className="text-[11px] text-purple-400 font-semibold mt-0.5 truncate">{stream.categoryName} • {likeCount.toLocaleString()} Likes</div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={handleLike}
              className="flex items-center gap-1 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 font-extrabold text-[11px] sm:text-xs transition active:scale-110 shadow"
            >
              <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
              <span>{likeCount.toLocaleString()}</span>
            </button>

            <button
              onClick={() => setShowGiftDrawer(true)}
              className="flex items-center gap-1.5 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full gradient-btn font-extrabold text-[11px] sm:text-xs shadow-lg transition"
            >
              <GiftIcon className="w-3.5 h-3.5 text-amber-300" />
              <span>Send Gift</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Audience Chat Panel */}
      <div className="w-full lg:w-80 h-[300px] sm:h-[350px] lg:h-auto flex flex-col glass-panel rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden">
        <div className="px-3.5 py-2.5 bg-white/5 border-b border-white/10 flex items-center justify-between">
          <div className="font-extrabold text-[11px] text-gray-200 uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Live Chat Feed
          </div>
          <span className="text-[9px] text-gray-400 font-mono">WebSockets Active</span>
        </div>

        <div ref={chatContainerRef} className="flex-1 p-3 overflow-y-auto space-y-2.5 font-sans">
          {messages.map((msg) => (
            <div key={msg.id} className="text-xs leading-relaxed">
              {msg.isGiftNotice ? (
                <div className="p-2 rounded-xl bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-500/30 font-bold text-amber-300 flex items-center gap-2 text-[11px]">
                  <span>{msg.giftIcon}</span>
                  <span>{msg.username} {msg.message}</span>
                </div>
              ) : (
                <div className="flex items-start gap-2">
                  <img src={msg.userAvatar} alt="" className="w-5 h-5 rounded-full object-cover mt-0.5" />
                  <div>
                    <span className="font-extrabold text-purple-300 mr-1">{msg.username}:</span>
                    <span className="text-gray-200">{msg.message}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="p-2.5 bg-slate-950/90 border-t border-white/10 flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Say something nice..."
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
          />
          <button
            type="submit"
            className="p-1.5 rounded-full gradient-btn text-white hover:scale-105 transition shadow"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Touch-Friendly Slide-Up Gift Drawer */}
      {showGiftDrawer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full sm:max-w-md glass-panel rounded-t-3xl sm:rounded-3xl border border-white/10 p-5 space-y-4 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-gray-100 flex items-center gap-2">
                  <GiftIcon className="w-4 h-4 text-amber-400" />
                  <span>Virtual Gift Catalog</span>
                </h3>
                <div className="text-[11px] text-gray-400 mt-0.5">Balance: <span className="text-amber-300 font-bold">{coinBalance.toLocaleString()} Coins</span></div>
              </div>
              <button
                onClick={() => setShowGiftDrawer(false)}
                className="text-gray-400 hover:text-white font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {insufficientCoinsError && (
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span>Not enough coins in wallet!</span>
                </div>
                <button
                  onClick={() => { setShowGiftDrawer(false); openCoinStore(); }}
                  className="px-3 py-1 rounded-lg bg-amber-400 text-black font-extrabold text-xs"
                >
                  Buy Coins
                </button>
              </div>
            )}

            <div className="grid grid-cols-4 gap-2.5 max-h-60 overflow-y-auto p-1">
              {MOCK_GIFTS.map((gift) => (
                <button
                  key={gift.id}
                  onClick={() => handleTriggerGift(gift)}
                  className="glass-card p-2.5 rounded-2xl flex flex-col items-center justify-between hover:border-amber-400/50 hover:bg-amber-500/10 transition group"
                >
                  <span className="text-2xl sm:text-3xl group-hover:scale-125 transition-transform">{gift.imageUrl}</span>
                  <div className="text-[10px] font-bold text-gray-200 mt-1">{gift.name}</div>
                  <div className="text-[9px] font-extrabold text-amber-400 mt-0.5">
                    🪙 {gift.coinPrice}
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-2 flex justify-between items-center text-xs">
              <button
                onClick={() => { setShowGiftDrawer(false); openCoinStore(); }}
                className="text-amber-400 hover:underline font-bold"
              >
                + Recharge Coins
              </button>
              <button
                onClick={() => setShowGiftDrawer(false)}
                className="px-4 py-1.5 rounded-xl bg-white/10 text-gray-300 font-bold hover:bg-white/20 text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm glass-panel rounded-3xl border border-white/10 p-5 space-y-4">
            <h3 className="font-bold text-sm sm:text-base text-gray-100 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-400" />
              <span>Report Stream Violation</span>
            </h3>
            <p className="text-xs text-gray-400">Reports are reviewed by VibeLive moderators 24/7.</p>
            
            <div className="space-y-2 text-xs">
              {['Inappropriate Content', 'Copyright Infringement', 'Harassment or Bullying', 'Spam / Scam Activity'].map((r, i) => (
                <label key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer">
                  <input type="radio" name="reportReason" defaultChecked={i===0} className="accent-purple-500" />
                  <span className="text-gray-200 font-medium">{r}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => { setShowReportModal(false); alert('Report submitted to moderation queue!'); }}
                className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow"
              >
                Submit Report
              </button>
              <button
                onClick={() => setShowReportModal(false)}
                className="px-4 py-2 rounded-xl bg-white/10 text-gray-300 font-bold text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
