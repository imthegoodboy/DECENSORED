import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import Community from '@/models/Community';
import User from '@/models/User';
import { verifyJWT, getAuthToken } from '@/lib/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const communities = await Community.find()
        .populate('creator', 'username displayName avatar')
        .sort({ members: -1 })
        .limit(50);

      res.status(200).json({ communities });
    } catch (error: any) {
      console.error('Get communities error:', error);
      res.status(500).json({ error: 'Failed to fetch communities' });
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

      const { name, slug, description, avatar, banner, rules = [] } = req.body;

      if (!name || !slug || !description) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const existingCommunity = await Community.findOne({ slug });
      if (existingCommunity) {
        return res.status(400).json({ error: 'Community with this slug already exists' });
      }

      const user = await User.findOne({ walletAddress: payload.walletAddress });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const community = await Community.create({
        name,
        slug,
        description,
        avatar: avatar || '',
        banner: banner || '',
        creator: user._id,
        members: [user._id],
        moderators: [user._id],
        posts: [],
        rules,
      });

      const populatedCommunity = await Community.findById(community._id)
        .populate('creator', 'username displayName avatar');

      res.status(201).json({ community: populatedCommunity });
    } catch (error: any) {
      console.error('Create community error:', error);
      res.status(500).json({ error: 'Failed to create community' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

