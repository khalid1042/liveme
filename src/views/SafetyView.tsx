import React from 'react';
import { Shield, HeartHandshake } from 'lucide-react';

export const SafetyView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-950 to-purple-950/40 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
          <Shield className="w-4 h-4 text-emerald-400" />
          VibeLive Trust & Safety Center
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          A Safe, Inclusive Place to Live Stream & Connect
        </h1>
        <p className="text-sm text-gray-300 max-w-2xl leading-relaxed">
          VibeLive is committed to fostering positive social interactions, protecting user privacy, maintaining fair financial transactions, and maintaining zero tolerance for harassment or dangerous content.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <HeartHandshake className="w-5 h-5 text-purple-400" />
          <span>Community Guidelines & Safety Principles</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass-card p-5 rounded-2xl space-y-2 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
              🚫
            </div>
            <h3 className="font-extrabold text-sm text-white">Zero Tolerance for Harassment</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Bullying, hate speech, threats, discrimination, or non-consensual sharing of personal information will result in immediate permanent account suspension.
            </p>
          </div>

          <div className="glass-card p-5 rounded-2xl space-y-2 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold">
              🔞
            </div>
            <h3 className="font-extrabold text-sm text-white">Age-Aware & Minor Protections</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              VibeLive requires age verification. Enhanced safety filters and privacy controls are active to safeguard young audiences and creators.
            </p>
          </div>

          <div className="glass-card p-5 rounded-2xl space-y-2 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              🪙
            </div>
            <h3 className="font-extrabold text-sm text-white">Auditable Wallet & Virtual Currency</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              All coin transactions, virtual gift exchanges, and creator payouts are protected by double-entry immutable ledgers and server-authoritative checks.
            </p>
          </div>

          <div className="glass-card p-5 rounded-2xl space-y-2 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              🛡️
            </div>
            <h3 className="font-extrabold text-sm text-white">24/7 Human + AI Moderation</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Our automated content detection tools assist human moderation teams around the clock to review reported streams, comments, and uploads.
            </p>
          </div>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3">
        <h3 className="font-bold text-sm text-gray-200">Legal & Governance Policies</h3>
        <div className="flex flex-wrap gap-3 text-xs font-semibold">
          <a href="#terms" className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-purple-300 transition">Terms of Service</a>
          <a href="#privacy" className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-purple-300 transition">Privacy Policy</a>
          <a href="#cookies" className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-purple-300 transition">Cookie Consent & Preferences</a>
          <a href="#dmca" className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-purple-300 transition">DMCA Copyright Policy</a>
        </div>
      </div>
    </div>
  );
};
