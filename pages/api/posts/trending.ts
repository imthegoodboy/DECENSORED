import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import Post from '@/models/Post';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get trending posts based on likes, reposts, and tips
    const posts = await Post.find()
      .populate('author', 'username displayName avatar walletAddress')
      .populate('community', 'name slug')
      .sort({ 
        // Sort by engagement score: (likes * 1) + (reposts * 2) + (totalTips * 0.1)
        createdAt: -1 
      })
      .limit(20);

    // Calculate trending score for each post
    const postsWithScore = posts.map((post: any) => {
      const likesCount = post.likes?.length || 0;
      const repostsCount = post.reposts?.length || 0;
      const tipsCount = post.totalTips || 0;
      const commentsCount = post.comments?.length || 0;
      const hoursSinceCreation = (Date.now() - new Date(post.createdAt).getTime()) / (1000 * 60 * 60);
      
      // Trending score: engagement / time decay
      const engagementScore = (likesCount * 1) + (repostsCount * 2) + (tipsCount * 0.1) + (commentsCount * 1.5);
      const timeDecay = Math.max(1, hoursSinceCreation / 24); // Decay over 24 hours
      const trendingScore = engagementScore / timeDecay;

      return {
        ...post.toObject(),
        trendingScore,
      };
    });

    // Sort by trending score
    postsWithScore.sort((a: any, b: any) => b.trendingScore - a.trendingScore);

    res.status(200).json({ 
      posts: postsWithScore.slice(0, 15) // Top 15 trending
    });
  } catch (error: any) {
    console.error('Get trending posts error:', error);
    res.status(500).json({ error: 'Failed to fetch trending posts' });
  }
}

