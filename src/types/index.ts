// VibeLive Core TypeScript Interface Definitions

export type UserRole = 'user' | 'creator' | 'moderator' | 'admin' | 'super_admin';
export type UserStatus = 'active' | 'suspended' | 'banned';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  ageVerified: boolean;
  createdAt: string;
}

export interface Profile {
  userId: string;
  displayName: string;
  username: string;
  avatarUrl: string;
  coverUrl: string;
  bio: string;
  country: string;
  language: string;
  followersCount: number;
  followingCount: number;
  totalLikes: number;
  isLive?: boolean;
}

export interface StreamCategory {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  sortOrder: number;
}

export type StreamStatus = 'scheduled' | 'live' | 'ended' | 'suspended';

export interface LiveStream {
  id: string;
  creatorId: string;
  creator: Profile;
  title: string;
  description: string;
  categoryId: string;
  categoryName: string;
  coverUrl: string;
  videoUrl?: string;
  status: StreamStatus;
  viewerCount: number;
  peakViewers: number;
  totalLikes: number;
  totalGiftsCoins: number;
  startedAt: string;
  endedAt?: string;
  tags?: string[];
  isPK?: boolean;
  pkOpponentId?: string;
}

export interface ChatMessage {
  id: string;
  streamId: string;
  userId: string;
  username: string;
  userAvatar: string;
  userRole?: UserRole;
  message: string;
  createdAt: string;
  isGiftNotice?: boolean;
  giftIcon?: string;
  giftName?: string;
  giftCount?: number;
}

export interface Gift {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  animationUrl?: string;
  coinPrice: number;
  active: boolean;
  sortOrder: number;
  category: 'Popular' | 'Luxury' | 'Vibe' | 'Special';
}

export interface Wallet {
  userId: string;
  coinBalance: number;
  creatorBalance: number; // in USD or diamonds
  updatedAt: string;
}

export type TxType = 'coin_purchase' | 'gift_sent' | 'gift_received' | 'creator_reward' | 'withdrawal' | 'refund' | 'adjustment';

export interface WalletTransaction {
  id: string;
  userId: string;
  type: TxType;
  amount: number;
  currencyType: 'COINS' | 'USD';
  referenceId?: string;
  description: string;
  status: 'completed' | 'pending' | 'failed';
  createdAt: string;
}

export interface CoinPackage {
  id: string;
  coins: number;
  bonusCoins: number;
  priceUSD: number;
  badge?: string;
}

export interface BankAccountDetails {
  accountTitle: string;
  bankName: string;
  accountNumberOrIban: string;
  swiftBicCode: string;
  routingNumber?: string;
  country: string;
  branchName?: string;
  isVerified: boolean;
}

export interface PKBattle {
  id: string;
  creatorA: Profile;
  creatorB: Profile;
  streamAId: string;
  streamBId: string;
  scoreA: number;
  scoreB: number;
  startedAt: string;
  durationSeconds: number; // e.g. 300 (5 mins)
  status: 'active' | 'ended';
  winnerId?: string;
}

export interface Report {
  id: string;
  reporterId: string;
  reporterName: string;
  targetType: 'user' | 'stream' | 'chat';
  targetId: string;
  targetName: string;
  reason: string;
  evidence?: string;
  status: 'pending' | 'reviewing' | 'resolved' | 'dismissed';
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  type: 'live' | 'follower' | 'gift' | 'pk' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  linkUrl?: string;
}
