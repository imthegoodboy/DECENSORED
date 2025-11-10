# DECENSORED Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Required environment variables:

- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A random secret string for JWT tokens
- `SIDESHIFT_API_KEY`: Your SideShift API key
- `SIDESHIFT_API_SECRET`: Your SideShift API secret
- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`: Your WalletConnect project ID

### 3. Get API Keys

#### MongoDB
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Replace `<password>` with your database password

#### SideShift
1. Go to [SideShift.ai](https://sideshift.ai)
2. Sign up for an account
3. Navigate to API settings
4. Generate API key and secret

#### WalletConnect
1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com)
2. Create a new project
3. Copy your Project ID

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Connect Your Wallet

1. Click "Connect Wallet" in the navbar
2. Select your wallet (MetaMask, WalletConnect, etc.)
3. Sign the authentication message
4. Start using DECENSORED!

## Production Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables for Production

Make sure to set all environment variables in your hosting platform:

- Vercel: Add in Project Settings → Environment Variables
- Heroku: Use `heroku config:set KEY=value`
- AWS: Use AWS Systems Manager Parameter Store

### Database

For production, use MongoDB Atlas (cloud) instead of local MongoDB.

## Troubleshooting

### Wallet Connection Issues

- Make sure `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` is set correctly
- Check browser console for errors
- Try a different wallet provider

### API Errors

- Verify all environment variables are set
- Check MongoDB connection
- Verify SideShift API credentials

### Build Errors

- Run `npm install` again
- Delete `node_modules` and `.next` folders
- Clear npm cache: `npm cache clean --force`

## Next Steps

1. Customize the UI in `components/` folder
2. Add more features in `pages/api/` folder
3. Deploy to Vercel, Netlify, or your preferred platform
4. Set up custom domain
5. Enable analytics

## Support

For help, check the [README.md](./README.md) or open an issue on GitHub.

