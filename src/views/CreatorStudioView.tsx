import React, { useState } from 'react';
import { BarChart3, Users, Gift, DollarSign, ArrowUpRight, Award, CheckCircle, Building2, ShieldCheck } from 'lucide-react';
import { MOCK_STREAMS } from '../services/mockData';
import type { BankAccountDetails } from '../types';

export const CreatorStudioView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'bank-settings'>('analytics');
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState('250.00');
  const [payoutSuccess, setPayoutSuccess] = useState(false);

  // Bank Account State
  const [bankDetails, setBankDetails] = useState<BankAccountDetails>({
    accountTitle: 'Aria Vibe Live Ltd.',
    bankName: 'JPMorgan Chase Bank',
    accountNumberOrIban: 'US89CHAS30001234567890',
    swiftBicCode: 'CHASUS33XXX',
    routingNumber: '021000021',
    country: 'United States',
    branchName: 'New York Central Branch',
    isVerified: true
  });

  const [bankSavedToast, setBankSavedToast] = useState(false);

  const handleSaveBankDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setBankSavedToast(true);
    setTimeout(() => setBankSavedToast(false), 3000);
  };

  const handleRequestPayout = (e: React.FormEvent) => {
    e.preventDefault();
    setPayoutSuccess(true);
    setTimeout(() => {
      setPayoutSuccess(false);
      setShowPayoutModal(false);
    }, 2200);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-purple-400" />
            <span>Creator Analytics & Studio</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">Track stream performance, manage bank details & request payout withdrawals.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab(activeTab === 'analytics' ? 'bank-settings' : 'analytics')}
            className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-200 border border-white/10 font-bold text-xs flex items-center gap-2 transition"
          >
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span>{activeTab === 'analytics' ? 'Bank Account Details' : 'Back to Analytics'}</span>
          </button>

          <button
            onClick={() => setShowPayoutModal(true)}
            className="px-5 py-2.5 rounded-full gradient-btn font-extrabold text-xs shadow-lg flex items-center gap-2"
          >
            <DollarSign className="w-4 h-4" />
            <span>Request Earnings Payout</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-white/10 space-x-6">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`py-2 text-xs font-bold border-b-2 transition ${
            activeTab === 'analytics' ? 'border-purple-400 text-purple-300' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          Performance & Revenue
        </button>
        <button
          onClick={() => setActiveTab('bank-settings')}
          className={`py-2 text-xs font-bold border-b-2 transition flex items-center gap-1.5 ${
            activeTab === 'bank-settings' ? 'border-purple-400 text-purple-300' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Bank & Payout Details</span>
          {bankDetails.isVerified && (
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          )}
        </button>
      </div>

      {/* Tab 1: Analytics & Revenue Overview */}
      {activeTab === 'analytics' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-1">
              <div className="text-xs font-bold text-gray-400 flex items-center justify-between">
                <span>Total Stream Viewers</span>
                <Users className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-black text-white">48,920</div>
              <div className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> +14.2% this week
              </div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-1">
              <div className="text-xs font-bold text-gray-400 flex items-center justify-between">
                <span>Peak Concurrent Viewers</span>
                <Award className="w-4 h-4 text-pink-400" />
              </div>
              <div className="text-2xl font-black text-white">15,800</div>
              <div className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> Peak during PK Battle
              </div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-1">
              <div className="text-xs font-bold text-gray-400 flex items-center justify-between">
                <span>Total Gifts Received</span>
                <Gift className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-white">980,000 🪙</div>
              <div className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> +28.5% gift growth
              </div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-1">
              <div className="text-xs font-bold text-gray-400 flex items-center justify-between">
                <span>Available Balance</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-emerald-400">$1,450.00</div>
              <div className="text-[11px] font-semibold text-gray-400">Ready for direct bank transfer</div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-extrabold text-gray-100">Recent Stream Sessions</h2>
            <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 text-gray-400 uppercase font-bold border-b border-white/10">
                    <tr>
                      <th className="p-3.5">Stream Title</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Viewers</th>
                      <th className="p-3.5">Gift Revenue</th>
                      <th className="p-3.5">Duration</th>
                      <th className="p-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-200">
                    {MOCK_STREAMS.map((s) => (
                      <tr key={s.id} className="hover:bg-white/5">
                        <td className="p-3.5 font-bold">{s.title}</td>
                        <td className="p-3.5 text-purple-300">{s.categoryName}</td>
                        <td className="p-3.5 font-mono">{s.viewerCount.toLocaleString()}</td>
                        <td className="p-3.5 font-bold text-amber-400">{s.totalGiftsCoins.toLocaleString()} 🪙</td>
                        <td className="p-3.5 text-gray-400">1h 24m</td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 text-[10px] font-bold">
                            {s.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Tab 2: Bank Details Form */}
      {activeTab === 'bank-settings' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-cyan-400" />
                <span>Bank Account & Payout Setup</span>
              </h2>
              <p className="text-xs text-gray-400 mt-1">Configure your direct bank deposit details for creator gift revenue payouts.</p>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Bank Profile</span>
            </div>
          </div>

          {bankSavedToast && (
            <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span>Bank details saved securely! Payout withdrawals will automatically process to this bank account.</span>
            </div>
          )}

          <form onSubmit={handleSaveBankDetails} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Account Holder Full Legal Title *</label>
                <input
                  type="text"
                  required
                  value={bankDetails.accountTitle}
                  onChange={(e) => setBankDetails({ ...bankDetails, accountTitle: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Bank Name *</label>
                <input
                  type="text"
                  required
                  value={bankDetails.bankName}
                  onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                  placeholder="e.g. JPMorgan Chase, HSBC, Barclays"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Account Number / IBAN *</label>
                <input
                  type="text"
                  required
                  value={bankDetails.accountNumberOrIban}
                  onChange={(e) => setBankDetails({ ...bankDetails, accountNumberOrIban: e.target.value })}
                  placeholder="e.g. US89CHAS30001234567890"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">SWIFT / BIC Code *</label>
                <input
                  type="text"
                  required
                  value={bankDetails.swiftBicCode}
                  onChange={(e) => setBankDetails({ ...bankDetails, swiftBicCode: e.target.value })}
                  placeholder="e.g. CHASUS33XXX"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Routing Number / Sort Code (Optional)</label>
                <input
                  type="text"
                  value={bankDetails.routingNumber || ''}
                  onChange={(e) => setBankDetails({ ...bankDetails, routingNumber: e.target.value })}
                  placeholder="e.g. 021000021"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Bank Country *</label>
                <input
                  type="text"
                  required
                  value={bankDetails.country}
                  onChange={(e) => setBankDetails({ ...bankDetails, country: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl gradient-btn font-extrabold text-xs shadow-lg hover:scale-105 transition"
              >
                Save Bank Details
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Payout Withdrawal Request Modal */}
      {showPayoutModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md glass-panel rounded-3xl border border-white/10 p-6 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                <span>Withdraw Creator Earnings</span>
              </h3>
              <button onClick={() => setShowPayoutModal(false)} className="text-gray-400 hover:text-white font-bold">✕</button>
            </div>

            {payoutSuccess ? (
              <div className="p-6 text-center space-y-3 text-emerald-400">
                <CheckCircle className="w-12 h-12 mx-auto" />
                <div className="font-extrabold text-sm text-white">Payout Request Submitted!</div>
                <p className="text-xs text-gray-400">Transfer ring to <span className="text-white font-bold">{bankDetails.bankName} ({bankDetails.accountNumberOrIban.slice(-4)})</span>. Expected in 1-2 business days.</p>
              </div>
            ) : (
              <form onSubmit={handleRequestPayout} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Available Creator Balance</label>
                  <div className="text-2xl font-black text-emerald-400">$1,450.00 USD</div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Withdrawal Amount ($ USD)</label>
                  <input
                    type="number"
                    required
                    value={payoutAmount}
                    onChange={(e) => setPayoutAmount(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Direct Bank Account Selection */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Destination Bank Account</span>
                    <span className="text-emerald-400 font-bold">VERIFIED</span>
                  </div>
                  <div className="text-xs font-extrabold text-white flex items-center gap-2 mt-1">
                    <Building2 className="w-4 h-4 text-purple-400" />
                    <span>{bankDetails.bankName}</span>
                  </div>
                  <div className="text-[11px] font-mono text-purple-300">
                    Title: {bankDetails.accountTitle} | IBAN: {bankDetails.accountNumberOrIban}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button type="submit" className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow">
                    Confirm Transfer to Bank
                  </button>
                  <button type="button" onClick={() => setShowPayoutModal(false)} className="px-4 py-2.5 rounded-xl bg-white/10 text-gray-300 font-bold text-xs">
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
