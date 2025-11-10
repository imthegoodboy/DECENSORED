import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import Message from '@/models/Message';
import User from '@/models/User';
import { verifyJWT, getAuthToken } from '@/lib/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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

    const { userId } = req.query;

    const messages = await Message.find({
      $or: [
        { from: user._id, to: userId },
        { from: userId, to: user._id },
      ],
    })
      .sort({ createdAt: 1 })
      .populate('from', 'username displayName avatar')
      .populate('to', 'username displayName avatar')
      .limit(100);

    // Mark messages as read
    await Message.updateMany(
      {
        from: userId,
        to: user._id,
        isRead: false,
      },
      {
        isRead: true,
      }
    );

    res.status(200).json({ messages });
  } catch (error: any) {
    console.error('Get messages error:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
}

