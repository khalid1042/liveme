-- VibeLive PostgreSQL Production Database Schema
-- Version 1.0.0
-- Strictly complies with PRD Specs & Master Prompt

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE
CREATE TYPE user_role AS ENUM ('user', 'creator', 'moderator', 'admin', 'super_admin');
CREATE TYPE user_status AS ENUM ('active', 'suspended', 'banned');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(30),
    password_hash VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'user',
    status user_status DEFAULT 'active',
    age_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);

-- 2. PROFILES TABLE
CREATE TABLE profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    display_name VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL,
    avatar_url TEXT DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    cover_url TEXT DEFAULT 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200',
    bio TEXT DEFAULT '',
    country VARCHAR(100) DEFAULT 'Global',
    language VARCHAR(50) DEFAULT 'English',
    followers_count INT DEFAULT 0,
    following_count INT DEFAULT 0,
    total_likes BIGINT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. FOLLOWS TABLE
CREATE TABLE follows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    follower_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    following_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_follow UNIQUE (follower_id, following_id),
    CONSTRAINT no_self_follow CHECK (follower_id != following_id)
);

CREATE INDEX idx_follows_follower ON follows(follower_id);
CREATE INDEX idx_follows_following ON follows(following_id);

-- 4. CATEGORIES TABLE
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    icon_name VARCHAR(50) DEFAULT 'Sparkles',
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. STREAMS TABLE
CREATE TYPE stream_status AS ENUM ('scheduled', 'live', 'ended', 'suspended');

CREATE TABLE streams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    cover_url TEXT,
    status stream_status DEFAULT 'live',
    stream_key VARCHAR(255) UNIQUE NOT NULL,
    playback_url TEXT NOT NULL,
    viewer_count INT DEFAULT 0,
    peak_viewers INT DEFAULT 0,
    total_likes BIGINT DEFAULT 0,
    total_gifts_coins BIGINT DEFAULT 0,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_streams_status ON streams(status);
CREATE INDEX idx_streams_category ON streams(category_id);
CREATE INDEX idx_streams_creator ON streams(creator_id);

-- 6. STREAM VIEWERS TABLE
CREATE TABLE stream_viewers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    stream_id UUID NOT NULL REFERENCES streams(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    left_at TIMESTAMP WITH TIME ZONE,
    watch_seconds INT DEFAULT 0
);

-- 7. CHAT MESSAGES TABLE
CREATE TYPE moderation_status AS ENUM ('clean', 'flagged', 'deleted');

CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    stream_id UUID NOT NULL REFERENCES streams(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    message VARCHAR(500) NOT NULL,
    moderation_status moderation_status DEFAULT 'clean',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_chat_messages_stream ON chat_messages(stream_id);

-- 8. GIFTS TABLE
CREATE TABLE gifts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    image_url TEXT NOT NULL,
    animation_url TEXT,
    coin_price INT NOT NULL CHECK (coin_price > 0),
    active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0
);

-- 9. WALLETS TABLE
CREATE TABLE wallets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    coin_balance BIGINT DEFAULT 0 CHECK (coin_balance >= 0),
    creator_balance DECIMAL(12, 2) DEFAULT 0.00 CHECK (creator_balance >= 0),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. WALLET TRANSACTIONS TABLE
CREATE TYPE tx_type AS ENUM ('coin_purchase', 'gift_sent', 'gift_received', 'creator_reward', 'withdrawal', 'refund', 'adjustment');
CREATE TYPE tx_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

CREATE TABLE wallet_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type tx_type NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    currency_type VARCHAR(20) DEFAULT 'COINS', -- 'COINS' or 'USD'
    reference_id VARCHAR(255),
    description VARCHAR(255),
    status tx_status DEFAULT 'completed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_wallet_tx_user ON wallet_transactions(user_id);

-- 11. PK BATTLES TABLE
CREATE TYPE pk_status AS ENUM ('active', 'ended', 'cancelled');

CREATE TABLE pk_battles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_a_id UUID NOT NULL REFERENCES users(id),
    creator_b_id UUID NOT NULL REFERENCES users(id),
    stream_a_id UUID NOT NULL REFERENCES streams(id),
    stream_b_id UUID NOT NULL REFERENCES streams(id),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP WITH TIME ZONE,
    score_a BIGINT DEFAULT 0,
    score_b BIGINT DEFAULT 0,
    winner_id UUID REFERENCES users(id),
    status pk_status DEFAULT 'active'
);

-- 12. REPORTS TABLE
CREATE TYPE report_status AS ENUM ('pending', 'reviewing', 'resolved', 'dismissed');

CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID NOT NULL REFERENCES users(id),
    target_type VARCHAR(50) NOT NULL, -- 'user', 'stream', 'chat'
    target_id UUID NOT NULL,
    reason VARCHAR(255) NOT NULL,
    evidence TEXT,
    status report_status DEFAULT 'pending',
    assigned_moderator_id UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reports_status ON reports(status);

-- 13. NOTIFICATIONS TABLE
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    payload JSONB,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_user ON notifications(user_id);

-- 14. BLOCKS TABLE
CREATE TABLE blocks (
    blocker_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    blocked_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (blocker_id, blocked_id)
);

-- 15. PAYOUTS TABLE
CREATE TYPE payout_status AS ENUM ('pending', 'approved', 'processing', 'completed', 'rejected');

CREATE TABLE payouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(12, 2) NOT NULL CHECK (amount > 0),
    payment_method VARCHAR(100) NOT NULL,
    status payout_status DEFAULT 'pending',
    requested_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP WITH TIME ZONE
);
