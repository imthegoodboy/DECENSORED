import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import Post from '@/models/Post';
import User from '@/models/User';
import { verifyJWT, getAuthToken } from '@/lib/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const { page = 1, limit = 20, community, author } = req.query;

      const query: any = {};
      if (community) query.community = community;
      if (author) query.author = author;

      const posts = await Post.find(query)
        .populate('author', 'username displayName avatar walletAddress')
        .populate('community', 'name slug')
        .sort({ createdAt: -1 })
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit));

      const total = await Post.countDocuments(query);

      res.status(200).json({
        posts,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      });
    } catch (error: any) {
      console.error('Get posts error:', error);
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  } else if (req.method === 'POST') {
    try {
      const token = getAuthToken(req);
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const payload = verifyJWT(token);
      if (!payload) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      const user = await User.findOne({ walletAddress: payload.walletAddress });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const { content, media = [], community, tags = [], visibility = 'public', isPremium, premiumPrice, premiumToken } = req.body;

      if (!content || content.trim().length === 0) {
        return res.status(400).json({ error: 'Content is required' });
      }

      const ipfsHash = `ipfs_${Date.now()}_${Math.random().toString(36).substring(7)}`;

      const post = await Post.create({
        author: user._id,
        content,
        media,
        ipfsHash,
        community: community || undefined,
        tags,
        visibility,
        isPremium: isPremium || false,
        premiumPrice: premiumPrice || 0,
        premiumToken: premiumToken || 'USDC',
      });

      user.posts.push(post._id);
      await user.save();

      const populatedPost = await Post.findById(post._id)
        .populate('author', 'username displayName avatar walletAddress')
        .populate('community', 'name slug');

      res.status(201).json({ post: populatedPost });
    } catch (error: any) {
      console.error('Create post error:', error);
      res.status(500).json({ error: 'Failed to create post' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

