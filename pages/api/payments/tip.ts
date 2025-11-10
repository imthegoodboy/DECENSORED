import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Post from '@/models/Post';
import Transaction from '@/models/Transaction';
import { verifyJWT, getAuthToken } from '@/lib/auth';
import { sideshiftClient } from '@/lib/sideshift';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

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

    const { postId, amount, token: tokenSymbol, fromChain, toChain, toAddress } = req.body;

    if (!postId || !amount || !tokenSymbol || !fromChain || !toChain || !toAddress) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const toUser = await User.findById(post.author);
    if (!toUser) {
      return res.status(404).json({ error: 'Post author not found' });
    }

    const settleToken = toUser.subscriptionToken || 'USDC';

    const quote = await sideshiftClient.getQuote({
      depositCoin: tokenSymbol,
      depositNetwork: fromChain,
      settleCoin: settleToken,
      settleNetwork: toChain,
      depositAmount: amount.toString(),
    });

    const order = await sideshiftClient.createOrder({
      depositCoin: tokenSymbol,
      depositNetwork: fromChain,
      settleCoin: settleToken,
      settleNetwork: toChain,
      depositAmount: amount.toString(),
      settleAmount: quote.settleAmount,
      settleAddress: toAddress,
    });

    const transaction = await Transaction.create({
      from: fromUser._id,
      to: toUser._id,
      amount: parseFloat(amount),
      token: tokenSymbol,
      fromChain,
      toChain,
      sideshiftId: order.id,
      type: 'tip',
      post: post._id,
      status: 'pending',
    });

    post.tips.push(transaction._id);
    post.totalTips += parseFloat(quote.settleAmount || '0');
    await post.save();

    toUser.reputation += 1;
    await toUser.save();

    res.status(201).json({
      transaction: {
        id: transaction._id,
        sideshiftOrder: order,
        status: transaction.status,
      },
    });
  } catch (error: any) {
    console.error('Tip payment error:', error);
    res.status(500).json({ error: error.message || 'Failed to process tip' });
  }
}

