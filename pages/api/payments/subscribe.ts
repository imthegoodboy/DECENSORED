import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
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

    const { creatorId, amount, token: tokenSymbol, fromChain, toChain, toAddress } = req.body;

    if (!creatorId || !amount || !tokenSymbol || !fromChain || !toChain || !toAddress) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const creator = await User.findById(creatorId);
    if (!creator) {
      return res.status(404).json({ error: 'Creator not found' });
    }

    if (!creator.subscriptionPrice || creator.subscriptionPrice === 0) {
      return res.status(400).json({ error: 'Creator does not have subscriptions enabled' });
    }

    const settleToken = creator.subscriptionToken || 'USDC';

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
      to: creator._id,
      amount: parseFloat(amount),
      token: tokenSymbol,
      fromChain,
      toChain,
      sideshiftId: order.id,
      type: 'subscription',
      status: 'pending',
    });

    if (!creator.subscribers.some((id: any) => id.toString() === fromUser._id.toString())) {
      creator.subscribers.push(fromUser._id);
      await creator.save();
    }

    res.status(201).json({
      transaction: {
        id: transaction._id,
        sideshiftOrder: order,
        status: transaction.status,
      },
    });
  } catch (error: any) {
    console.error('Subscription payment error:', error);
    res.status(500).json({ error: error.message || 'Failed to process subscription' });
  }
}

