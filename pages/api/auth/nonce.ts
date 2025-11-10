import type { NextApiRequest, NextApiResponse } from 'next';
import { generateNonce } from '@/lib/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { walletAddress } = req.body;

  if (!walletAddress) {
    return res.status(400).json({ error: 'Wallet address is required' });
  }

  const nonce = generateNonce();
  const message = `Sign this message to authenticate with DECENSORED.\n\nNonce: ${nonce}`;

  res.status(200).json({ nonce, message });
}

