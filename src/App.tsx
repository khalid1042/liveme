import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './views/HomeView';
import { LiveRoomView } from './views/LiveRoomView';
import { GoLiveView } from './views/GoLiveView';
import { PKArenaView } from './views/PKArenaView';
import { WalletView } from './views/WalletView';
import { CreatorStudioView } from './views/CreatorStudioView';
import { AdminView } from './views/AdminView';
import { SafetyView } from './views/SafetyView';
import { MOCK_STREAMS, MOCK_TRANSACTIONS, MOCK_NOTIFICATIONS } from './services/mockData';
import type { LiveStream, Gift, WalletTransaction, CoinPackage, NotificationItem } from './types';

export function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [activeStream, setActiveStream] = useState<LiveStream>(MOCK_STREAMS[0]);
  const [coinBalance, setCoinBalance] = useState<number>(1200);
  const [transactions, setTransactions] = useState<WalletTransaction[]>(MOCK_TRANSACTIONS);
  const [notifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSelectStream = (stream: LiveStream) => {
    setActiveStream(stream);
    setCurrentView('live-room');
  };

  const handleBuyCoins = (pkg: CoinPackage) => {
    const totalAdded = pkg.coins + pkg.bonusCoins;
    setCoinBalance(prev => prev + totalAdded);

    const newTx: WalletTransaction = {
      id: 'tx-' + Date.now(),
      userId: 'me',
      type: 'coin_purchase',
      amount: totalAdded,
      currencyType: 'COINS',
      description: `Purchased ${totalAdded.toLocaleString()} Coins Package ($${pkg.priceUSD})`,
      status: 'completed',
      createdAt: 'Just now'
    };

    setTransactions(prev => [newTx, ...prev]);
  };

  const handleSendGift = (gift: Gift): boolean => {
    if (coinBalance < gift.coinPrice) {
      return false;
    }

    setCoinBalance(prev => prev - gift.coinPrice);

    const newTx: WalletTransaction = {
      id: 'tx-gift-' + Date.now(),
      userId: 'me',
      type: 'gift_sent',
      amount: -gift.coinPrice,
      currencyType: 'COINS',
      referenceId: gift.id,
      description: `Sent ${gift.imageUrl} ${gift.name} to ${activeStream.creator.displayName}`,
      status: 'completed',
      createdAt: 'Just now'
    };

    setTransactions(prev => [newTx, ...prev]);
    return true;
  };

  const handleStartStreamSuccess = (data: { title: string; categoryId: string }) => {
    const newStream: LiveStream = {
      id: 'my-stream-' + Date.now(),
      creatorId: 'me',
      creator: {
        userId: 'me',
        displayName: 'Your Broadcast',
        username: '@vibeme_user',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
        coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200',
        bio: 'Live Broadcaster on VibeLive',
        country: 'Global',
        language: 'English',
        followersCount: 1520,
        followingCount: 42,
        totalLikes: 12400,
        isLive: true,
      },
      title: data.title,
      description: 'Live broadcast created by user',
      categoryId: data.categoryId,
      categoryName: 'General',
      coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      status: 'live',
      viewerCount: 1,
      peakViewers: 1,
      totalLikes: 0,
      totalGiftsCoins: 0,
      startedAt: 'Just now'
    };

    setActiveStream(newStream);
    setCurrentView('live-room');
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-gray-100 flex flex-col font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden w-full max-w-full relative">
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        coinBalance={coinBalance}
        openCoinStore={() => setCurrentView('wallet')}
        notifications={notifications}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-3 sm:px-4 py-4 sm:py-6 gap-6 pb-20 lg:pb-6 overflow-x-hidden">
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} />

        <main className="flex-1 min-w-0 overflow-x-hidden w-full max-w-full">
          {(currentView === 'home' || currentView === 'discover') && (
            <HomeView
              onSelectStream={handleSelectStream}
              searchQuery={searchQuery}
            />
          )}

          {currentView === 'live-room' && (
            <LiveRoomView
              stream={activeStream}
              coinBalance={coinBalance}
              onSendGift={handleSendGift}
              openCoinStore={() => setCurrentView('wallet')}
            />
          )}

          {currentView === 'go-live' && (
            <GoLiveView onStartStreamSuccess={handleStartStreamSuccess} />
          )}

          {currentView === 'pk-arena' && (
            <PKArenaView openCoinStore={() => setCurrentView('wallet')} />
          )}

          {currentView === 'wallet' && (
            <WalletView
              coinBalance={coinBalance}
              onBuyCoins={handleBuyCoins}
              transactions={transactions}
            />
          )}

          {currentView === 'creator-studio' && <CreatorStudioView />}
          {currentView === 'admin' && <AdminView />}
          {currentView === 'safety' && <SafetyView />}
        </main>
      </div>

      <BottomNav currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  );
}
export default App;
