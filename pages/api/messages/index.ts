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

  if (req.method === 'POST') {
    try {
      const token = getAuthToken(req);
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const payload = verifyJWT(token);
      if (!payload) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      const fromUser = await User.findOne({ walletAddress: payload.walletAddress });
      if (!fromUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      const { to, content } = req.body;

      if (!to || !content) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const toUser = await User.findById(to);
      if (!toUser) {
        return res.status(404).json({ error: 'Target user not found' });
      }

      const message = await Message.create({
        from: fromUser._id,
        to: toUser._id,
        content,
        isRead: false,
      });

      const populatedMessage = await Message.findById(message._id)
        .populate('from', 'username displayName avatar')
        .populate('to', 'username displayName avatar');

      res.status(201).json({ message: populatedMessage });
    } catch (error: any) {
      console.error('Send message error:', error);
      res.status(500).json({ error: 'Failed to send message' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

