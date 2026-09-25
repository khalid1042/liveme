import React, { useState } from 'react';
import { Shield, Lock } from 'lucide-react';
import { MOCK_STREAMS, MOCK_REPORTS, MOCK_CREATORS, MOCK_GIFTS } from '../services/mockData';
import type { Report } from '../types';

export const AdminView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reports' | 'streams' | 'users' | 'gifts'>('reports');
  const [reportsList, setReportsList] = useState<Report[]>(MOCK_REPORTS);
  const [streamsList, setStreamsList] = useState(MOCK_STREAMS);
  const [giftsList] = useState(MOCK_GIFTS);
  const [bannedUsers, setBannedUsers] = useState<string[]>([]);

  const handleResolveReport = (id: string, action: 'resolve' | 'dismiss') => {
    setReportsList(prev => prev.map(r => r.id === id ? { ...r, status: action === 'resolve' ? 'resolved' : 'dismissed' } : r));
  };

  const handleSuspendStream = (streamId: string) => {
    setStreamsList(prev => prev.filter(s => s.id !== streamId));
    alert('Stream has been terminated and suspended by Admin.');
  };

  const handleToggleBanUser = (username: string) => {
    if (bannedUsers.includes(username)) {
      setBannedUsers(bannedUsers.filter(u => u !== username));
    } else {
      setBannedUsers([...bannedUsers, username]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Shield className="w-6 h-6 text-cyan-400" />
            <span>Admin & Moderation Control Center</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">Platform management, live stream enforcement, user roles & gift catalog CRUD.</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" /> Super Admin Access
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-2xl border border-white/10 space-y-1">
          <div className="text-[11px] font-bold text-gray-400">Total Registered Users</div>
          <div className="text-2xl font-black text-white">142,500</div>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-white/10 space-y-1">
          <div className="text-[11px] font-bold text-gray-400">Active Live Streams</div>
          <div className="text-2xl font-black text-pink-400">{streamsList.length}</div>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-white/10 space-y-1">
          <div className="text-[11px] font-bold text-gray-400">Pending Moderation Reports</div>
          <div className="text-2xl font-black text-amber-400">{reportsList.filter(r => r.status === 'pending').length}</div>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-white/10 space-y-1">
          <div className="text-[11px] font-bold text-gray-400">Daily Coin Volume</div>
          <div className="text-2xl font-black text-emerald-400">4,850,000 🪙</div>
        </div>
      </div>

      <div className="flex border-b border-white/10 space-x-4">
        <button
          onClick={() => setActiveTab('reports')}
          className={`py-2.5 text-xs font-bold border-b-2 transition ${
            activeTab === 'reports' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          Reports Queue ({reportsList.length})
        </button>
        <button
          onClick={() => setActiveTab('streams')}
          className={`py-2.5 text-xs font-bold border-b-2 transition ${
            activeTab === 'streams' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          Live Streams Moderation
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`py-2.5 text-xs font-bold border-b-2 transition ${
            activeTab === 'users' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          User Account Governance
        </button>
        <button
          onClick={() => setActiveTab('gifts')}
          className={`py-2.5 text-xs font-bold border-b-2 transition ${
            activeTab === 'gifts' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          Gift Catalog Manager
        </button>
      </div>

      {activeTab === 'reports' && (
        <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 text-gray-400 uppercase font-bold border-b border-white/10">
                <tr>
                  <th className="p-3.5">Report ID</th>
                  <th className="p-3.5">Reporter</th>
                  <th className="p-3.5">Target</th>
                  <th className="p-3.5">Reason</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-200">
                {reportsList.map((rep) => (
                  <tr key={rep.id} className="hover:bg-white/5">
                    <td className="p-3.5 font-mono text-[11px] text-cyan-300">{rep.id}</td>
                    <td className="p-3.5 font-bold">{rep.reporterName}</td>
                    <td className="p-3.5 text-amber-300 font-bold">{rep.targetName} ({rep.targetType})</td>
                    <td className="p-3.5">{rep.reason}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        rep.status === 'resolved' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {rep.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3.5">
                      {rep.status === 'pending' ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleResolveReport(rep.id, 'resolve')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold"
                          >
                            Resolve / Sanction
                          </button>
                          <button
                            onClick={() => handleResolveReport(rep.id, 'dismiss')}
                            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 text-[11px] font-bold"
                          >
                            Dismiss
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-gray-500 italic">Action Taken</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'streams' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {streamsList.map((stream) => (
            <div key={stream.id} className="glass-card p-4 rounded-2xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img src={stream.coverUrl} className="w-16 h-12 rounded-xl object-cover" />
                <div>
                  <div className="font-bold text-xs text-white line-clamp-1">{stream.title}</div>
                  <div className="text-[11px] text-purple-300">{stream.creator.displayName}</div>
                  <div className="text-[10px] text-pink-400 font-bold">{stream.viewerCount.toLocaleString()} Viewers</div>
                </div>
              </div>

              <button
                onClick={() => handleSuspendStream(stream.id)}
                className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow"
              >
                Terminate Stream
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'users' && (
        <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 text-gray-400 uppercase font-bold border-b border-white/10">
                <tr>
                  <th className="p-3.5">User</th>
                  <th className="p-3.5">Username</th>
                  <th className="p-3.5">Country</th>
                  <th className="p-3.5">Followers</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Moderation Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-200">
                {MOCK_CREATORS.map((u) => {
                  const isBanned = bannedUsers.includes(u.username);
                  return (
                    <tr key={u.userId} className="hover:bg-white/5">
                      <td className="p-3.5 font-bold flex items-center gap-2">
                        <img src={u.avatarUrl} className="w-6 h-6 rounded-full object-cover" />
                        <span>{u.displayName}</span>
                      </td>
                      <td className="p-3.5 font-mono text-purple-300">{u.username}</td>
                      <td className="p-3.5">{u.country}</td>
                      <td className="p-3.5 font-mono">{u.followersCount.toLocaleString()}</td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isBanned ? 'bg-red-500/20 text-red-300' : 'bg-emerald-500/20 text-emerald-300'
                        }`}>
                          {isBanned ? 'SUSPENDED' : 'ACTIVE'}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <button
                          onClick={() => handleToggleBanUser(u.username)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                            isBanned ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                          }`}
                        >
                          {isBanned ? 'Restore Account' : 'Suspend / Ban'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'gifts' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {giftsList.map((g) => (
            <div key={g.id} className="glass-card p-4 rounded-2xl flex flex-col items-center justify-between space-y-2">
              <span className="text-4xl">{g.imageUrl}</span>
              <div className="font-bold text-xs text-white">{g.name}</div>
              <div className="text-xs font-black text-amber-400">🪙 {g.coinPrice}</div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                Active Catalog
              </span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
