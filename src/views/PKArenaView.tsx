import React, { useState, useEffect } from 'react';
import { Swords, Clock } from 'lucide-react';
import { MOCK_CREATORS } from '../services/mockData';

export const PKArenaView: React.FC<{ openCoinStore: () => void }> = ({ openCoinStore }) => {
  const [scoreA, setScoreA] = useState(14500);
  const [scoreB, setScoreB] = useState(18200);
  const [timeLeft, setTimeLeft] = useState(240);

  const creatorA = MOCK_CREATORS[2];
  const creatorB = MOCK_CREATORS[1];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
      if (Math.random() > 0.6) {
        setScoreA(s => s + Math.floor(Math.random() * 200));
      } else {
        setScoreB(s => s + Math.floor(Math.random() * 200));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const total = scoreA + scoreB;
  const percentA = total > 0 ? Math.round((scoreA / total) * 100) : 50;
  const percentB = 100 - percentA;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between glass-panel p-4 sm:p-6 rounded-3xl border border-pink-500/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-600 to-purple-600 flex items-center justify-center shadow-lg">
            <Swords className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
              <span>LIVE PK BATTLE CHAMPIONSHIP</span>
              <span className="px-2 py-0.5 rounded bg-pink-500 text-white font-extrabold text-[10px]">OFFICIAL</span>
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">Send gifts to boost your favorite creator's battle score in real time!</p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-black/60 border border-white/10 text-amber-300 font-mono font-extrabold text-base">
          <Clock className="w-4 h-4 text-amber-400 animate-spin" />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 grid grid-cols-1 sm:grid-cols-2 bg-slate-950">
        <div className="relative aspect-video sm:aspect-auto min-h-[300px] border-b sm:border-b-0 sm:border-r border-pink-500/30 overflow-hidden flex flex-col justify-between p-4">
          <video
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2.5 bg-black/60 backdrop-blur p-2 rounded-xl">
              <img src={creatorA.avatarUrl} className="w-8 h-8 rounded-full ring-2 ring-purple-500 object-cover" />
              <div>
                <div className="font-extrabold text-xs text-white">{creatorA.displayName}</div>
                <div className="text-[10px] text-purple-300">Creator A</div>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-purple-600/80 text-white font-extrabold text-xs shadow">
              {scoreA.toLocaleString()} pts
            </span>
          </div>

          <div className="relative z-10 text-center">
            <button
              onClick={openCoinStore}
              className="px-6 py-2.5 rounded-full gradient-btn font-extrabold text-xs shadow-xl hover:scale-105 transition"
            >
              👑 Gift Creator A
            </button>
          </div>
        </div>

        <div className="relative aspect-video sm:aspect-auto min-h-[300px] overflow-hidden flex flex-col justify-between p-4">
          <video
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2.5 bg-black/60 backdrop-blur p-2 rounded-xl">
              <img src={creatorB.avatarUrl} className="w-8 h-8 rounded-full ring-2 ring-cyan-500 object-cover" />
              <div>
                <div className="font-extrabold text-xs text-white">{creatorB.displayName}</div>
                <div className="text-[10px] text-cyan-300">Creator B</div>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-cyan-600/80 text-white font-extrabold text-xs shadow">
              {scoreB.toLocaleString()} pts
            </span>
          </div>

          <div className="relative z-10 text-center">
            <button
              onClick={openCoinStore}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-extrabold text-xs shadow-xl hover:scale-105 transition"
            >
              🚀 Gift Creator B
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 h-4 bg-slate-900 flex overflow-hidden border-t border-white/20">
          <div style={{ width: `${percentA}%` }} className="bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-500 flex items-center justify-start px-2 text-[9px] font-black text-white">
            {percentA}%
          </div>
          <div style={{ width: `${percentB}%` }} className="bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500 flex items-center justify-end px-2 text-[9px] font-black text-white">
            {percentB}%
          </div>
        </div>
      </div>
    </div>
  );
};
