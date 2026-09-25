import React, { useState, useEffect } from 'react';
import { Download, Smartphone, Monitor, CheckCircle, X, Sparkles } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const InstallPWA: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone) {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      setShowModal(true);
    }
  };

  if (isInstalled) {
    return null;
  }

  return (
    <>
      {/* Install Button */}
      <button
        onClick={handleInstallClick}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-extrabold text-xs shadow-lg hover:scale-105 transition shrink-0 animate-pulse"
        title="Download LiveMe App on PC / Mobile"
      >
        <Download className="w-3.5 h-3.5" />
        <span className="hidden xs:inline">Get App</span>
      </button>

      {/* Install App Guidance Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-lg rounded-3xl border border-white/20 shadow-2xl p-6 relative animate-in fade-in zoom-in-95">
            
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white tracking-tight">Install LiveMe App</h2>
                <p className="text-xs text-purple-300">Enjoy full-screen live streaming & instant notifications</p>
              </div>
            </div>

            {/* Platform Instructions */}
            <div className="space-y-4">
              
              {/* Desktop (Chrome / Edge / Windows / Mac) */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 font-bold text-sm text-purple-300 mb-2">
                  <Monitor className="w-4 h-4 text-cyan-400" />
                  <span>Desktop (Chrome, Edge, Windows, Mac)</span>
                </div>
                <ol className="text-xs text-gray-300 space-y-1.5 list-decimal list-inside pl-1">
                  <li>Look for the <strong className="text-white">Install Icon ⊕</strong> in your browser address bar.</li>
                  <li>Click <strong className="text-purple-400 font-bold">"Install LiveMe"</strong> to add it to your Desktop & Taskbar.</li>
                </ol>
              </div>

              {/* Mobile (Android & Chrome) */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 font-bold text-sm text-purple-300 mb-2">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>Mobile (Android & Chrome)</span>
                </div>
                <ol className="text-xs text-gray-300 space-y-1.5 list-decimal list-inside pl-1">
                  <li>Tap the browser menu <strong className="text-white">(⋮ 3 dots)</strong> at top right.</li>
                  <li>Tap <strong className="text-emerald-400 font-bold">"Add to Home screen"</strong> or <strong className="text-emerald-400 font-bold">"Install app"</strong>.</li>
                </ol>
              </div>

              {/* iOS (iPhone / Safari) */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 font-bold text-sm text-purple-300 mb-2">
                  <Smartphone className="w-4 h-4 text-pink-400" />
                  <span>iPhone / iPad (Safari)</span>
                </div>
                <ol className="text-xs text-gray-300 space-y-1.5 list-decimal list-inside pl-1">
                  <li>Tap the <strong className="text-white">Share button</strong> (square with arrow ↑) at bottom of Safari.</li>
                  <li>Scroll down and tap <strong className="text-pink-400 font-bold">"Add to Home Screen"</strong>.</li>
                </ol>
              </div>

            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="text-[11px] text-gray-400 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> No app store download required
              </span>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition"
              >
                Got it
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
