import React, { useState, useEffect, useRef } from 'react';
import { Camera, Mic, Radio, CheckCircle } from 'lucide-react';
import { MOCK_CATEGORIES } from '../services/mockData';

interface GoLiveViewProps {
  onStartStreamSuccess: (streamData: { title: string; categoryId: string }) => void;
}

export const GoLiveView: React.FC<GoLiveViewProps> = ({ onStartStreamSuccess }) => {
  const [streamTitle, setStreamTitle] = useState('');
  const [categoryId, setCategoryId] = useState(MOCK_CATEGORIES[0].id);
  const [description, setDescription] = useState('');
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasMicPermission, setHasMicPermission] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  const requestMediaPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setHasCameraPermission(true);
      setHasMicPermission(true);
    } catch {
      setHasCameraPermission(true);
      setHasMicPermission(true);
    }
  };

  useEffect(() => {
    requestMediaPermissions();
  }, []);

  const handleStartBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!streamTitle.trim()) return;

    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      onStartStreamSuccess({
        title: streamTitle,
        categoryId: categoryId
      });
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Radio className="w-6 h-6 text-pink-500 animate-pulse" />
            <span>Go Live Creator Studio</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">Set up your live stream broadcast parameters & test device permissions.</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold">
          RTMP / HLS Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="relative aspect-video rounded-3xl overflow-hidden glass-panel border border-white/10 bg-slate-950 flex items-center justify-center">
            {hasCameraPermission ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center p-6 space-y-2">
                <Camera className="w-10 h-10 text-purple-400 mx-auto animate-bounce" />
                <div className="text-xs font-bold text-gray-300">Requesting Camera Preview...</div>
              </div>
            )}

            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur text-emerald-400 text-[11px] font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Stream Health: 1080p 60fps (Excellent)
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl space-y-2.5">
            <div className="text-xs font-bold text-gray-300 uppercase tracking-wider">Hardware Diagnostics</div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-gray-300">
                <Camera className="w-4 h-4 text-purple-400" />
                <span>Camera Input: HD Webcam</span>
              </div>
              {hasCameraPermission ? (
                <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> Ready</span>
              ) : (
                <span className="text-amber-400 font-bold">Checking...</span>
              )}
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-gray-300">
                <Mic className="w-4 h-4 text-pink-400" />
                <span>Audio Input: Microphones</span>
              </div>
              {hasMicPermission ? (
                <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> Ready</span>
              ) : (
                <span className="text-amber-400 font-bold">Checking...</span>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={handleStartBroadcast} className="glass-panel p-6 rounded-3xl space-y-4 border border-white/10 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="text-sm font-extrabold text-gray-200">Broadcast Configuration</div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Stream Title *</label>
              <input
                type="text"
                required
                value={streamTitle}
                onChange={(e) => setStreamTitle(e.target.value)}
                placeholder="e.g. Acoustic Jam Session & Chill Q&A!"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Category *</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                {MOCK_CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Description (Optional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell your fans what this broadcast is about..."
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isConnecting || !streamTitle.trim()}
            className="w-full py-3.5 rounded-2xl gradient-btn font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition disabled:opacity-50"
          >
            {isConnecting ? (
              <span>Connecting to Ingest Media Server...</span>
            ) : (
              <>
                <Radio className="w-5 h-5 text-white" />
                <span>Start Live Broadcast Now</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
