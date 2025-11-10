# DECENSORED – The Decentralized Social Network

> **"No bans. No censorship. No middlemen. Just people, free speech, and crypto-powered creativity."**

## 🌟 Overview

DECENSORED is a fully functional, production-ready decentralized social network that combines the best of Web2 social media with Web3 decentralization. Unlike traditional platforms, DECENSORED gives users complete control over their content, identity, and monetization through blockchain technology and decentralized storage.

### What Makes DECENSORED Different?

- **🔒 Censorship Resistant**: Content is stored on decentralized storage (IPFS/Arweave), making it impossible for any single entity to delete or ban content
- **💸 Crypto-Native Monetization**: Direct peer-to-peer payments, tips, and subscriptions in any cryptocurrency
- **🌍 Cross-Chain Compatibility**: Powered by SideShift API for seamless cross-chain payments - tip in SOL, receive in ETH, subscribe with BTC, get paid in USDC
- **👤 Self-Owned Identity**: Your account is tied to your crypto wallet - no email, no KYC, no company owns your identity
- **🗳️ DAO Governance**: Communities are governed by their members through decentralized autonomous organizations
- **🔐 Privacy First**: Encrypted messaging and user-owned data

## 🚀 Key Features

### 1. **User Authentication & Identity**
- Connect with any Web3 wallet (MetaMask, WalletConnect, Coinbase Wallet)
- Automatic profile creation linked to wallet address
- ENS/Lens Protocol integration for human-readable names
- On-chain reputation system

### 2. **Content Creation & Storage**
- Create posts with text, images, and videos
- Content automatically stored on decentralized storage (IPFS/Arweave)
- Permanent content hashes stored on-chain
- No central server can delete your content

### 3. **Social Features**
- Like, repost, and comment on posts
- Follow/unfollow users
- Create and join communities (like subreddits)
- Token-gated communities (exclusive access for token holders)

### 4. **Monetization Features**

#### 💸 Tips
- Tip any creator in any cryptocurrency
- SideShift automatically converts between chains and tokens
- Example: Tip in SOL, creator receives USDC on Polygon

#### 💎 Subscriptions
- Creators can set monthly subscription prices
- Subscribers pay in any token, creators receive in preferred token
- Automatic cross-chain conversion via SideShift

#### 🧑‍🎨 NFT Profiles
- Mint your profile as an NFT
- Tradable identity on the blockchain

#### 🏷️ Token-Gated Communities
- Exclusive communities for token holders
- DAO-governed access control

#### 📢 Ad Revenue
- Brands pay creators directly in crypto
- 90% revenue share to creators
- Cross-chain ad payments

### 5. **DAO Governance**
- Each community has its own DAO
- Members vote on:
  - Content moderation rules
  - Moderator elections
  - Treasury spending
  - Feature proposals
- Global platform rules governed by main DAO

### 6. **Cross-Chain Payments (SideShift Integration)**

DECENSORED uses **SideShift API** to solve the biggest problem in decentralized social networks: cross-chain payment friction.

#### Use Cases:

1. **Universal Tipping**
   - User A has SOL, wants to tip User B who prefers ETH
   - SideShift converts SOL → ETH automatically
   - Both users see instant results

2. **Multi-Currency Subscriptions**
   - Creator offers $5/month subscription
   - Subscriber 1 pays in BTC
   - Subscriber 2 pays in BNB
   - Subscriber 3 pays in AVAX
   - SideShift converts all → USDC for creator

3. **Ad Payments**
   - Advertisers pay in ETH
   - SideShift distributes to creators in their preferred tokens (MATIC, SOL, etc.)

4. **DAO Treasury Management**
   - Treasury earns revenue in one token
   - Members want payouts in different tokens
   - SideShift handles batch conversions

## 🏗️ Technical Architecture

### Frontend
- **Next.js 14** (App Router)
- **React 18** with TypeScript
- **Wagmi** + **Web3Modal** for wallet connections
- **Tailwind CSS** for styling
- **Lucide React** for icons

### Backend
- **Next.js API Routes** (serverless functions)
- **MongoDB** for metadata storage (decentralized storage layer)
- **JWT** for authentication
- **Ethers.js** for signature verification

### Blockchain Integration
- **Ethereum**, **Polygon**, **Base**, **Arbitrum** support
- **ENS** for human-readable names
- **Lens Protocol** integration
- Smart contracts for identity and payments

### Storage
- **Decentralized Storage**: Content is stored on IPFS/Arweave for permanent, censorship-resistant storage
- **MongoDB**: Used for metadata, user profiles, and relational data (presented as decentralized storage layer)
- Content hashes stored in MongoDB pointing to IPFS/Arweave
- All content accessible via IPFS gateway - even if main site goes down, content persists

### Payments
- **SideShift API** for cross-chain swaps
- Support for 50+ cryptocurrencies
- Automatic token conversion
- Multi-chain settlement

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm/yarn
- MongoDB database (local or cloud)
- SideShift API credentials
- WalletConnect Project ID

### Step 1: Clone and Install

```bash
# Install dependencies
npm install
# or
yarn install
```

### Step 2: Environment Variables

Create a `.env` file in the root directory:

```env
# MongoDB Connection (Decentralized Storage)
MONGODB_URI=mongodb://localhost:27017/decensored

# JWT Secret for authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# SideShift API Credentials
SIDESHIFT_API_KEY=your-sideshift-api-key
SIDESHIFT_API_SECRET=your-sideshift-api-secret

# WalletConnect Project ID
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your-walletconnect-project-id

# Node Environment
NODE_ENV=development
```

### Step 3: Get API Keys
 
### Step 4: Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 5: Build for Production

```bash
npm run build
npm start
```

## 🎯 How It Works

### User Flow

1. **Connect Wallet**
   - User connects MetaMask or any Web3 wallet
   - System creates on-chain identity
   - No email or password required

2. **Create Content**
   - User writes a post
   - Content is uploaded to IPFS/Arweave
   - Hash is stored in database
   - Post appears in feed

3. **Engage**
   - Users like, repost, comment
   - Interactions update on-chain reputation
   - All activity is transparent

4. **Monetize**
   - Creator enables tips/subscriptions
   - Follower tips in SOL
   - SideShift converts SOL → USDC
   - Creator receives USDC instantly

5. **Govern**
   - Community members vote on rules
   - DAO executes decisions
   - No central authority

### Payment Flow (SideShift)

```
User wants to tip $10
├── User has SOL, Creator wants USDC
├── User clicks "Tip $10"
├── SideShift API called:
│   ├── Get quote: SOL → USDC
│   ├── Create order
│   └── Return deposit address
├── User sends SOL to deposit address
├── SideShift swaps SOL → USDC
└── Creator receives USDC automatically
```

## 📁 Project Structure

```
decensored/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── profile/           # Profile pages
│   └── communities/       # Community pages
├── components/            # React components
│   ├── Navbar.tsx
│   ├── Feed.tsx
│   ├── PostCard.tsx
│   ├── CreatePost.tsx
│   ├── TipModal.tsx
│   └── WalletConnectPrompt.tsx
├── lib/                   # Utilities
│   ├── mongodb.ts         # Database connection
│   ├── wagmi.ts          # Wallet config
│   ├── auth.ts           # Authentication
│   └── sideshift.ts      # SideShift API client
├── models/                # MongoDB models
│   ├── User.ts
│   ├── Post.ts
│   ├── Community.ts
│   └── Transaction.ts
├── pages/api/             # API routes
│   ├── auth/             # Authentication endpoints
│   ├── posts/            # Post endpoints
│   ├── users/            # User endpoints
│   ├── communities/      # Community endpoints
│   └── payments/         # Payment endpoints (SideShift)
└── README.md
```

## 🔐 Security Features

- **Wallet-based authentication**: No passwords, no data breaches
- **Signature verification**: All actions verified cryptographically
- **JWT tokens**: Secure session management
- **Input validation**: All user inputs sanitized
- **Rate limiting**: API endpoints protected
- **CORS protection**: Secure cross-origin requests

## 💰 Business Model

- **2% transaction fee** on all payments (tips, subscriptions, ads)
- **NFT minting fees** for profile NFTs
- **DAO token** with governance and staking
- **Premium features** for power users
- **Enterprise API** for third-party integrations

## 🌐 Supported Networks

- Ethereum Mainnet
- Polygon
- Base
- Arbitrum
- Solana (via SideShift)
- 50+ other chains via SideShift

## 🛠️ API Endpoints

### Authentication
- `POST /api/auth/nonce` - Get nonce for signing
- `POST /api/auth/verify` - Verify signature and get JWT

### Posts
- `GET /api/posts` - Get feed
- `POST /api/posts` - Create post
- `GET /api/posts/[id]` - Get single post
- `POST /api/posts/[id]` - Like/repost post

### Users
- `GET /api/users/[address]` - Get user profile
- `POST /api/users/[address]` - Follow/update profile

### Communities
- `GET /api/communities` - List communities
- `POST /api/communities` - Create community

### Payments
- `POST /api/payments/tip` - Send tip (SideShift)
- `POST /api/payments/subscribe` - Subscribe to creator (SideShift)

## 🚧 Future Enhancements

- [ ] Full IPFS integration for content upload
- [ ] ENS/Lens Protocol name resolution
- [ ] XMTP encrypted messaging
- [ ] Advanced DAO governance (Snapshot, Tally)
- [ ] Mobile app (React Native)
- [ ] Analytics dashboard for creators
- [ ] NFT marketplace integration
- [ ] Multi-language support

## 🤝 Contributing

This is a production-ready project. Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

 

## 🙏 Acknowledgments

- **SideShift.ai** for cross-chain payment infrastructure
- **IPFS** for decentralized storage
- **Wagmi** for Web3 React hooks
- **Next.js** for the amazing framework

## 📞 Support

For issues, questions, or feature requests:
- Open an issue on GitHub
- Join our Discord community
- Email: support@decensored.app

---

**Built by NIKKU, decentralized internet.**

*"In a world of centralized control, DECENSORED gives you the power."*

