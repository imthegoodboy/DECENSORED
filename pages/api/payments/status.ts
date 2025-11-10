import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import Transaction from '@/models/Transaction';
import { sideshiftClient } from '@/lib/sideshift';
import { verifyJWT, getAuthToken } from '@/lib/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
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

    const { transactionId } = req.query;

    if (!transactionId) {
      return res.status(400).json({ error: 'Transaction ID required' });
    }

    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    if (transaction.sideshiftId) {
      try {
        const order = await sideshiftClient.getOrder(transaction.sideshiftId);
        transaction.status = order.status === 'complete' ? 'completed' : 
                           order.status === 'failed' ? 'failed' : 'pending';
        if (order.status === 'complete') {
          transaction.txHash = (order as any).settleTxHash || order.id || '';
        }
        await transaction.save();
      } catch (error) {
        console.error('Error checking SideShift order:', error);
      }
    }

    res.status(200).json({ transaction });
  } catch (error: any) {
    console.error('Get transaction status error:', error);
    res.status(500).json({ error: 'Failed to get transaction status' });
  }
}

