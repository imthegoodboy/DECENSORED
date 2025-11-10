# DECENSORED - Deployment Guide for Render

## 🚀 Deploying to Render

### Prerequisites
- GitHub account with your code pushed
- Render account (sign up at https://render.com)
- MongoDB database (MongoDB Atlas recommended)
- SideShift API credentials (optional - public API works without auth)
- WalletConnect Project ID

### Step 1: Prepare Your Repository

1. Make sure all your code is committed and pushed to GitHub
2. Ensure `render.yaml` is in the root directory
3. Verify `.env.example` has all required variables

### Step 2: Create MongoDB Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Replace `<password>` with your database password

### Step 3: Deploy on Render

#### Option A: Using render.yaml (Recommended)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Blueprint"
3. Connect your GitHub repository
4. Render will automatically detect `render.yaml`
5. Add your environment variables:
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - A random secret string (generate with `openssl rand -base64 32`)
   - `SIDESHIFT_API_KEY` - (Optional) SideShift API key
   - `SIDESHIFT_API_SECRET` - (Optional) SideShift API secret
   - `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` - Your WalletConnect project ID
   - `NODE_ENV` - Set to `production`

6. Click "Apply" to deploy

#### Option B: Manual Setup

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: decensored
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free (or paid for better performance)

5. Add Environment Variables (same as above)

6. Click "Create Web Service"

### Step 4: Get WalletConnect Project ID

1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com)
2. Create a new project
3. Copy your Project ID
4. Add it to Render environment variables as `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`

### Step 5: Verify Deployment

1. Wait for build to complete (usually 5-10 minutes)
2. Check build logs for any errors
3. Visit your Render URL (e.g., `https://decensored.onrender.com`)
4. Test wallet connection
5. Create a test post

### Environment Variables Reference

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/decensored?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
SIDESHIFT_API_KEY=optional-api-key
SIDESHIFT_API_SECRET=optional-api-secret
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your-walletconnect-project-id
NODE_ENV=production
```

### Troubleshooting

#### Build Fails
- Check build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version (Render uses Node 18+ by default)

#### Database Connection Issues
- Verify MongoDB URI is correct
- Check MongoDB Atlas IP whitelist (add `0.0.0.0/0` for Render)
- Ensure database user has read/write permissions

#### Wallet Connection Not Working
- Verify `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` is set
- Check browser console for errors
- Ensure HTTPS is enabled (Render provides this automatically)

#### Application Crashes
- Check runtime logs in Render dashboard
- Verify all environment variables are set
- Check MongoDB connection
- Review API endpoint errors

### Post-Deployment

1. **Custom Domain** (Optional):
   - Go to Render dashboard → Your service → Settings
   - Add custom domain
   - Update DNS records as instructed

2. **Monitoring**:
   - Enable Render monitoring
   - Set up alerts for downtime

3. **Backups**:
   - Enable MongoDB Atlas backups
   - Regular database exports recommended

### Performance Tips

- Use Render's paid plan for better performance
- Enable MongoDB Atlas M10+ cluster for production
- Use CDN for static assets (Render provides this)
- Optimize images before uploading
- Enable Next.js image optimization

### Support

- Render Docs: https://render.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com
- Next.js Deployment: https://nextjs.org/docs/deployment

---

**Your DECENSORED app is now live! 🎉**

