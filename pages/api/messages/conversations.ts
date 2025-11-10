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

    // Get all unique users the current user has messaged or been messaged by
    const sentMessages = await Message.find({ from: user._id }).distinct('to');
    const receivedMessages = await Message.find({ to: user._id }).distinct('from');
    const allUserIds = [...new Set([...sentMessages, ...receivedMessages])];

    const conversations = await Promise.all(
      allUserIds.map(async (otherUserId) => {
        const otherUser = await User.findById(otherUserId).select(
          'username displayName avatar'
        );
        if (!otherUser) return null;

        const lastMessage = await Message.findOne({
          $or: [
            { from: user._id, to: otherUserId },
            { from: otherUserId, to: user._id },
          ],
        })
          .sort({ createdAt: -1 })
          .populate('from', 'username displayName')
          .populate('to', 'username displayName');

        const unreadCount = await Message.countDocuments({
          from: otherUserId,
          to: user._id,
          isRead: false,
        });

        return {
          user: otherUser,
          lastMessage,
          unreadCount,
        };
      })
    );

    const validConversations = conversations.filter((c) => c !== null);

    res.status(200).json({ conversations: validConversations });
  } catch (error: any) {
    console.error('Get conversations error:', error);
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
}

