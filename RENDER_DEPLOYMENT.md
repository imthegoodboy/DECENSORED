# Render Deployment Guide for DECENSORED

## 🚀 Quick Deploy Steps

### 1. Build Command
```
npm install && npm run build
```

### 2. Start Command
```
npm start
```

## 📋 Complete Setup Instructions

### Step 1: Prepare Your Repository
1. Push all code to GitHub
2. Make sure `render.yaml` is in the root directory
3. Verify all environment variables are documented

### Step 2: Create Render Web Service

#### Option A: Using render.yaml (Recommended)
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Blueprint"
3. Connect your GitHub repository
4. Render will auto-detect `render.yaml`
5. Review settings and click "Apply"

#### Option B: Manual Setup
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `decensored`
   - **Environment**: `Node`
   - **Region**: `Oregon` (or closest to you)
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: Leave empty (or `/` if required)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: `Free` (or upgrade for better performance)

### Step 3: Environment Variables

Add these in Render Dashboard → Your Service → Environment:

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/decensored?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
SIDESHIFT_API_KEY=optional-api-key
SIDESHIFT_API_SECRET=optional-api-secret
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your-walletconnect-project-id
```

**Important Notes:**
- `MONGODB_URI`: Get from MongoDB Atlas
- `JWT_SECRET`: Generate with `openssl rand -base64 32`
- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`: Required for wallet connections
- SideShift API keys are optional (public API works without them)

### Step 4: MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster (M0)
3. Create database user
4. Whitelist IP: Add `0.0.0.0/0` to allow all IPs (or Render's IPs)
5. Get connection string
6. Replace `<password>` with your password
7. Add to Render environment variables

### Step 5: WalletConnect Setup

1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com)
2. Create new project
3. Copy Project ID
4. Add to Render as `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`

### Step 6: Deploy

1. Click "Create Web Service" or "Apply"
2. Wait for build to complete (5-10 minutes)
3. Check build logs for any errors
4. Once deployed, visit your Render URL

### Step 7: Seed Dummy Data

After deployment:
1. Visit: `https://your-app.onrender.com/seed`
2. Click "Seed Dummy Data"
3. Wait for success message
4. Visit home page to see posts!

## 🔧 Troubleshooting

### Build Fails
- **Error**: "Module not found"
  - Solution: Check `package.json` has all dependencies
  - Run `npm install` locally to verify

- **Error**: "Type error"
  - Solution: Run `npm run build` locally first
  - Fix all TypeScript errors before deploying

- **Error**: "Collecting page data failed"
  - Solution: Added `export const dynamic = 'force-dynamic'` to all pages
  - This is already fixed in the codebase

### Runtime Errors
- **Error**: "MongoDB connection failed"
  - Check MongoDB URI is correct
  - Verify IP whitelist includes Render IPs
  - Check database user has read/write permissions

- **Error**: "WalletConnect not working"
  - Verify `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` is set
  - Check it's prefixed with `NEXT_PUBLIC_` (required for client-side)

### Performance Issues
- Free tier has limitations:
  - Spins down after 15 minutes of inactivity
  - First request after spin-down takes ~30 seconds
  - Upgrade to paid plan for better performance

## 📊 Monitoring

1. **Build Logs**: Check Render dashboard for build errors
2. **Runtime Logs**: View real-time logs in Render dashboard
3. **Metrics**: Monitor CPU, memory, and response times

## 🔄 Updates

To update your app:
1. Push changes to GitHub
2. Render automatically detects changes
3. Triggers new build
4. Deploys automatically

## 🎯 Post-Deployment Checklist

- [ ] App loads without errors
- [ ] MongoDB connection working
- [ ] Wallet connection working
- [ ] Can create posts
- [ ] Can like/comment on posts
- [ ] Seed data works (`/seed` page)
- [ ] All pages accessible
- [ ] Search functionality works
- [ ] Messages work (if logged in)

## 💡 Pro Tips

1. **Custom Domain**: Add in Render Settings → Custom Domains
2. **Environment Variables**: Use Render's sync feature for team sharing
3. **Auto-Deploy**: Enable in Settings → Auto-Deploy
4. **Health Checks**: Set up in Settings → Health Check Path (`/api/health`)

## 📞 Support

- Render Docs: https://render.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com
- Next.js Deployment: https://nextjs.org/docs/deployment

---

**Your DECENSORED app is now live on Render! 🎉**

