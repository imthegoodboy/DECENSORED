import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Post from '@/models/Post';
import { verifyJWT, getAuthToken } from '@/lib/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const { address } = req.query;

  if (req.method === 'GET') {
    try {
      const user = await User.findOne({ walletAddress: address })
        .populate('followers', 'username displayName avatar')
        .populate('following', 'username displayName avatar');

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const posts = await Post.find({ author: user._id })
        .sort({ createdAt: -1 })
        .limit(20)
        .populate('community', 'name slug');

      res.status(200).json({
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
          postsCount: user.posts.length,
          isVerified: user.isVerified,
          subscriptionPrice: user.subscriptionPrice,
          subscriptionToken: user.subscriptionToken,
        },
        posts,
      });
    } catch (error: any) {
      console.error('Get user error:', error);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  } else if (req.method === 'POST') {
    try {
      const token = getAuthToken(req);
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const payload = verifyJWT(token);
      if (!payload || payload.walletAddress.toLowerCase() !== (address as string).toLowerCase()) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const user = await User.findOne({ walletAddress: address });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const { action, targetAddress } = req.body;

      if (action === 'follow') {
        const targetUser = await User.findOne({ walletAddress: targetAddress });
        if (!targetUser) {
          return res.status(404).json({ error: 'Target user not found' });
        }

        const isFollowing = user.following.some(
          (id) => id.toString() === targetUser._id.toString()
        );

        if (isFollowing) {
          user.following = user.following.filter(
            (id) => id.toString() !== targetUser._id.toString()
          );
          targetUser.followers = targetUser.followers.filter(
            (id) => id.toString() !== user._id.toString()
          );
        } else {
          user.following.push(targetUser._id);
          targetUser.followers.push(user._id);
        }

        await user.save();
        await targetUser.save();

        return res.status(200).json({ success: true });
      }

      if (action === 'update') {
        const { username, displayName, bio, avatar, subscriptionPrice, subscriptionToken } = req.body;

        if (username) user.username = username;
        if (displayName) user.displayName = displayName;
        if (bio !== undefined) user.bio = bio;
        if (avatar) user.avatar = avatar;
        if (subscriptionPrice !== undefined) user.subscriptionPrice = subscriptionPrice;
        if (subscriptionToken) user.subscriptionToken = subscriptionToken;

        await user.save();

        return res.status(200).json({ user });
      }

      res.status(400).json({ error: 'Invalid action' });
    } catch (error: any) {
      console.error('User action error:', error);
      res.status(500).json({ error: 'Failed to perform action' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

