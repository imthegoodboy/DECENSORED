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

  if (req.method !== 'POST') {
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

    const { postId, content } = req.body;

    if (!postId || !content || content.trim().length === 0) {
      return res.status(400).json({ error: 'Post ID and content are required' });
    }

    const parentPost = await Post.findById(postId);
    if (!parentPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const ipfsHash = `ipfs_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    const comment = await Post.create({
      author: user._id,
      content,
      ipfsHash,
      visibility: 'public',
    });

    parentPost.comments.push(comment._id);
    await parentPost.save();

    const populatedComment = await Post.findById(comment._id)
      .populate('author', 'username displayName avatar walletAddress');

    res.status(201).json({ comment: populatedComment });
  } catch (error: any) {
    console.error('Create comment error:', error);
    res.status(500).json({ error: 'Failed to create comment' });
  }
}

