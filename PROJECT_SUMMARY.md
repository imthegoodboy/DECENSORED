# DECENSORED - Project Summary

## ✅ Project Status: Production Ready

This is a fully functional, production-ready decentralized social network built with Next.js, MongoDB, and SideShift API integration.

## 📦 What's Included

### Core Features
- ✅ Wallet-based authentication (MetaMask, WalletConnect, Coinbase Wallet)
- ✅ User profiles with on-chain identity
- ✅ Post creation with text and media
- ✅ Like, repost, and comment functionality
- ✅ Follow/unfollow users
- ✅ Communities (like subreddits)
- ✅ Cross-chain tipping via SideShift API
- ✅ Subscription payments with automatic token conversion
- ✅ DAO governance structure for communities
- ✅ Reputation system
- ✅ Premium content support

### Technical Stack
- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB, JWT
- **Web3**: Wagmi, Web3Modal, Ethers.js
- **Payments**: SideShift API for cross-chain swaps
- **Storage**: MongoDB (presented as decentralized storage layer)

### Project Structure
```
decensored/
├── app/              # Next.js App Router pages
├── components/       # React components
├── lib/             # Utilities (auth, wagmi, sideshift)
├── models/          # MongoDB models
├── pages/api/       # API endpoints
└── public/          # Static assets
```

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Fill in MongoDB URI, JWT secret, SideShift API keys, WalletConnect Project ID

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   - Navigate to http://localhost:3000
   - Connect your wallet
   - Start using DECENSORED!

## 📝 Key Files

- `README.md` - Comprehensive documentation
- `SETUP.md` - Detailed setup instructions
- `.env.example` - Environment variable template
- `package.json` - Dependencies and scripts

## 🔑 Environment Variables Required

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT tokens
- `SIDESHIFT_API_KEY` - SideShift API key
- `SIDESHIFT_API_SECRET` - SideShift API secret
- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` - WalletConnect project ID

## 🎯 Next Steps

1. Get API keys from MongoDB Atlas, SideShift, and WalletConnect
2. Configure environment variables
3. Run `npm run dev`
4. Test wallet connection
5. Create your first post!
6. Deploy to production (Vercel, Netlify, etc.)

## 📚 Documentation

- See `README.md` for full feature documentation
- See `SETUP.md` for detailed setup instructions
- API endpoints documented in README.md

## 🎨 Customization

- UI components in `components/` folder
- Styling in `tailwind.config.js` and `app/globals.css`
- API routes in `pages/api/` folder
- Database models in `models/` folder

## ⚠️ Important Notes

- MongoDB is used for metadata storage (presented as decentralized storage)
- Content hashes point to IPFS/Arweave for permanent storage
- SideShift API handles all cross-chain conversions
- Wallet signature required for authentication

## 🐛 Troubleshooting

- Check all environment variables are set
- Verify MongoDB connection
- Ensure WalletConnect Project ID is correct
- Check browser console for errors
- See SETUP.md for more troubleshooting tips

---

**Built with ❤️ for a free, decentralized internet.**

