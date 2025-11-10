import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import Community from '@/models/Community';
import Post from '@/models/Post';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const { slug } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const community = await Community.findOne({ slug })
      .populate('creator', 'username displayName avatar')
      .populate('members', 'username displayName avatar')
      .populate('moderators', 'username displayName avatar');

    if (!community) {
      return res.status(404).json({ error: 'Community not found' });
    }

    const posts = await Post.find({ community: community._id })
      .populate('author', 'username displayName avatar walletAddress')
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({ community, posts });
  } catch (error: any) {
    console.error('Get community error:', error);
    res.status(500).json({ error: 'Failed to fetch community' });
  }
}

