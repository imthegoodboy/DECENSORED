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

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const post = await Post.findById(id)
        .populate('author', 'username displayName avatar walletAddress reputation')
        .populate('community', 'name slug')
        .populate('likes', 'username displayName avatar')
        .populate({
          path: 'comments',
          populate: {
            path: 'author',
            select: 'username displayName avatar walletAddress'
          }
        });

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      res.status(200).json({ post });
    } catch (error: any) {
      console.error('Get post error:', error);
      res.status(500).json({ error: 'Failed to fetch post' });
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

      const { action } = req.body;

      if (action === 'like') {
        const post = await Post.findById(id);
        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }

        const isLiked = post.likes.some(
          (likeId: any) => likeId.toString() === user._id.toString()
        );

        if (isLiked) {
          post.likes = post.likes.filter(
            (likeId: any) => likeId.toString() !== user._id.toString()
          );
        } else {
          post.likes.push(user._id);
        }

        await post.save();
        return res.status(200).json({ post });
      }

      if (action === 'repost') {
        const post = await Post.findById(id);
        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }

        const isReposted = post.reposts.some(
          (repostId: any) => repostId.toString() === user._id.toString()
        );

        if (isReposted) {
          post.reposts = post.reposts.filter(
            (repostId: any) => repostId.toString() !== user._id.toString()
          );
        } else {
          post.reposts.push(user._id);
        }

        await post.save();
        return res.status(200).json({ post });
      }

      res.status(400).json({ error: 'Invalid action' });
    } catch (error: any) {
      console.error('Post action error:', error);
      res.status(500).json({ error: 'Failed to perform action' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

