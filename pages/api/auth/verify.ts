import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { verifySignature, generateJWT } from '@/lib/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { walletAddress, signature, message } = req.body;

    if (!walletAddress || !signature || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const isValid = await verifySignature(message, signature, walletAddress);

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    let user = await User.findOne({ walletAddress: walletAddress.toLowerCase() });

    if (!user) {
      user = await User.create({
        walletAddress: walletAddress.toLowerCase(),
        username: `user_${walletAddress.slice(0, 8)}`,
        displayName: `User ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`,
        bio: '',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(walletAddress.slice(0, 6))}&background=0ea5e9&color=fff`,
        reputation: 0,
        followers: [],
        following: [],
        posts: [],
        isProfileComplete: false,
      });
    }

    const token = generateJWT(walletAddress);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        walletAddress: user.walletAddress,
        username: user.username,
        displayName: user.displayName,
        bio: user.bio,
        avatar: user.avatar,
        reputation: user.reputation,
        followersCount: user.followers.length,
        followingCount: user.following.length,
        isProfileComplete: user.isProfileComplete,
      },
    });
  } catch (error: any) {
    console.error('Auth verify error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

