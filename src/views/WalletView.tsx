import React, { useState } from 'react';
import { Coins, CheckCircle2, History, ArrowUpRight, ArrowDownLeft, Building2, Copy, Check } from 'lucide-react';
import { MOCK_COIN_PACKAGES } from '../services/mockData';
import type { WalletTransaction, CoinPackage } from '../types';

interface WalletViewProps {
  coinBalance: number;
  onBuyCoins: (pkg: CoinPackage) => void;
  transactions: WalletTransaction[];
}

export const WalletView: React.FC<WalletViewProps> = ({ coinBalance, onBuyCoins, transactions }) => {
  const [purchasingPkg, setPurchasingPkg] = useState<CoinPackage | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showBankTransferModal, setShowBankTransferModal] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const handleConfirmPurchase = (pkg: CoinPackage) => {
    setPurchasingPkg(pkg);
    setTimeout(() => {
      onBuyCoins(pkg);
      setPurchasingPkg(null);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    }, 1200);
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      
      {/* Wallet Header Balance Card */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-purple-950/40 to-slate-950 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-3xl shadow-lg">
            🪙
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-300">Your Virtual Coin Balance</div>
            <div className="text-3xl sm:text-4xl font-black text-white mt-1">
              {coinBalance.toLocaleString()} <span className="text-amber-400 text-xl font-bold">Coins</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Use coins to send virtual gifts & support creators in live streams</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2">
          <button
            onClick={() => setShowBankTransferModal(true)}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-cyan-300 font-bold text-xs flex items-center gap-1.5 transition"
          >
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span>Bank Wire Details</span>
          </button>
        </div>
      </div>

      {showSuccessToast && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>Coins successfully credited to your wallet! Transaction logged in ledger.</span>
        </div>
      )}

      {/* Coin Purchase Packages */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-gray-100 flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-400" />
            <span>Coin Purchase Packages</span>
          </h2>

          <button
            onClick={() => setShowBankTransferModal(true)}
            className="text-xs text-purple-400 hover:underline font-bold flex items-center gap-1"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Pay via Direct Bank Wire</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_COIN_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-amber-400/50 transition relative overflow-hidden"
            >
              {pkg.badge && (
                <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full gradient-btn text-white font-extrabold text-[10px]">
                  {pkg.badge}
                </span>
              )}

              <div className="space-y-2">
                <div className="text-2xl font-black text-white flex items-center gap-2">
                  🪙 {(pkg.coins + pkg.bonusCoins).toLocaleString()}
                </div>
                {pkg.bonusCoins > 0 && (
                  <div className="text-xs font-bold text-emerald-400">
                    Includes +{pkg.bonusCoins} Bonus Coins
                  </div>
                )}
                <div className="text-xs text-gray-400">Instant delivery to wallet</div>
              </div>

              <button
                onClick={() => handleConfirmPurchase(pkg)}
                disabled={purchasingPkg?.id === pkg.id}
                className="mt-6 w-full py-2.5 rounded-xl gradient-btn font-extrabold text-xs shadow-md hover:scale-105 transition disabled:opacity-50"
              >
                {purchasingPkg?.id === pkg.id ? 'Processing...' : `Buy for $${pkg.priceUSD}`}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Auditable Transaction Ledger Table */}
      <div className="space-y-4">
        <h2 className="text-lg font-extrabold text-gray-100 flex items-center gap-2">
          <History className="w-5 h-5 text-purple-400" />
          <span>Auditable Transaction History</span>
        </h2>

        <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 text-gray-400 uppercase font-bold border-b border-white/10">
                <tr>
                  <th className="p-3.5">Transaction ID</th>
                  <th className="p-3.5">Type</th>
                  <th className="p-3.5">Description</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-200">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-white/5">
                    <td className="p-3.5 font-mono text-[11px] text-purple-300">{tx.id}</td>
                    <td className="p-3.5 font-semibold">
                      {tx.type === 'coin_purchase' ? (
                        <span className="text-emerald-400 flex items-center gap-1"><ArrowDownLeft className="w-3.5 h-3.5" /> Purchase</span>
                      ) : (
                        <span className="text-pink-400 flex items-center gap-1"><ArrowUpRight className="w-3.5 h-3.5" /> Gift Sent</span>
                      )}
                    </td>
                    <td className="p-3.5">{tx.description}</td>
                    <td className={`p-3.5 font-bold ${tx.amount > 0 ? 'text-emerald-400' : 'text-pink-400'}`}>
                      {tx.amount > 0 ? `+${tx.amount.toLocaleString()}` : tx.amount.toLocaleString()} Coins
                    </td>
                    <td className="p-3.5 text-gray-400 text-[11px]">{tx.createdAt}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                        Completed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bank Wire Details Modal */}
      {showBankTransferModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md glass-panel rounded-3xl border border-white/10 p-6 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-cyan-400" />
                <span>VibeLive Official Bank Wire Details</span>
              </h3>
              <button onClick={() => setShowBankTransferModal(false)} className="text-gray-400 hover:text-white font-bold">✕</button>
            </div>

            <p className="text-xs text-gray-400">
              You can purchase VIP coin packages directly via international bank transfer or wire deposit. Use the details below:
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase">Bank Title</div>
                  <div className="font-bold text-white">VibeLive Payments LLC</div>
                </div>
                <button onClick={() => handleCopyText('VibeLive Payments LLC', 'title')} className="text-purple-400 hover:text-purple-300">
                  {copiedIndex === 'title' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase">Bank Name</div>
                  <div className="font-bold text-white">JPMorgan Chase Bank N.A.</div>
                </div>
                <button onClick={() => handleCopyText('JPMorgan Chase Bank N.A.', 'bank')} className="text-purple-400 hover:text-purple-300">
                  {copiedIndex === 'bank' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase">IBAN / Account Number</div>
                  <div className="font-mono font-bold text-amber-300">US99CHAS00019876543210</div>
                </div>
                <button onClick={() => handleCopyText('US99CHAS00019876543210', 'iban')} className="text-purple-400 hover:text-purple-300">
                  {copiedIndex === 'iban' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase">SWIFT / BIC Code</div>
                  <div className="font-mono font-bold text-cyan-300">CHASUS33XXX</div>
                </div>
                <button onClick={() => handleCopyText('CHASUS33XXX', 'swift')} className="text-purple-400 hover:text-purple-300">
                  {copiedIndex === 'swift' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowBankTransferModal(false)}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow"
              >
                Close Wire Details
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
