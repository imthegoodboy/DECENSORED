# 🚀 Quick Start Guide

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment:**
   - Copy `.env.example` to `.env`
   - Fill in MongoDB URI and other variables

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Seed dummy data:**
   - Visit: http://localhost:3000/seed
   - Click "Seed Dummy Data"
   - Wait for success message

5. **View your feed:**
   - Go to: http://localhost:3000
   - You'll see 15 dummy posts!

## Render Deployment

### Build Command:
```
npm install && npm run build
```

### Start Command:
```
npm start
```

### Environment Variables:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Random secret (32+ chars)
- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` - WalletConnect Project ID
- `SIDESHIFT_API_KEY` - Optional
- `SIDESHIFT_API_SECRET` - Optional

## Features

✅ Trending page  
✅ Messages (when logged in)  
✅ Emoji profiles (🥺🤕😭😗😂)  
✅ Likes & Comments  
✅ Communities  
✅ Search  
✅ Dark/Light theme  
✅ Share posts  

## After Deployment

1. Visit your Render URL
2. Go to `/seed` page
3. Click "Seed Dummy Data"
4. Enjoy your social network!

---

**Everything is ready! 🎉**

