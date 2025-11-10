import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Post from '@/models/Post';
import Community from '@/models/Community';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { q } = req.query;

    if (!q || typeof q !== 'string') {
      return res.status(400).json({ error: 'Search query required' });
    }

    const query = q.toLowerCase().trim();

    // Search users
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { displayName: { $regex: query, $options: 'i' } },
        { bio: { $regex: query, $options: 'i' } },
      ],
    })
      .select('username displayName avatar walletAddress bio')
      .limit(10);

    // Search posts
    const posts = await Post.find({
      $or: [
        { content: { $regex: query, $options: 'i' } },
        { tags: { $in: [query] } },
      ],
    })
      .populate('author', 'username displayName avatar walletAddress')
      .sort({ createdAt: -1 })
      .limit(20);

    // Search communities
    const communities = await Community.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { slug: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    })
      .select('name slug description avatar')
      .limit(10);

    res.status(200).json({
      users,
      posts,
      communities,
    });
  } catch (error: any) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to search' });
  }
}

