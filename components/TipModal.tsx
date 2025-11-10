'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';
import { useAccount } from 'wagmi';

interface TipModalProps {
  post: any;
  onClose: () => void;
}

export default function TipModal({ post, onClose }: TipModalProps) {
  const { address } = useAccount();
  const [amount, setAmount] = useState('');
  const [token, setToken] = useState('ETH');
  const [fromChain, setFromChain] = useState('ethereum');
  const [toChain, setToChain] = useState('ethereum');
  const [loading, setLoading] = useState(false);

  const handleTip = async () => {
    if (!amount || !address) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/payments/tip',
        {
          postId: post._id,
          amount,
          token,
          fromChain,
          toChain,
          toAddress: post.author?.walletAddress,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert('Tip initiated! Complete the payment in your wallet.');
      onClose();
    } catch (error: any) {
      console.error('Error sending tip:', error);
      alert(error.response?.data?.error || 'Failed to send tip');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Tip {post.author?.displayName}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              step="0.0001"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Pay with Token
            </label>
            <select
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="ETH">ETH</option>
              <option value="USDC">USDC</option>
              <option value="MATIC">MATIC</option>
              <option value="SOL">SOL</option>
              <option value="BTC">BTC</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              From Chain
            </label>
            <select
              value={fromChain}
              onChange={(e) => setFromChain(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="ethereum">Ethereum</option>
              <option value="polygon">Polygon</option>
              <option value="base">Base</option>
              <option value="arbitrum">Arbitrum</option>
              <option value="solana">Solana</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              To Chain
            </label>
            <select
              value={toChain}
              onChange={(e) => setToChain(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="ethereum">Ethereum</option>
              <option value="polygon">Polygon</option>
              <option value="base">Base</option>
              <option value="arbitrum">Arbitrum</option>
              <option value="solana">Solana</option>
            </select>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              💡 SideShift will automatically convert your {token} to the creator&apos;s preferred token
            </p>
          </div>

          <button
            onClick={handleTip}
            disabled={loading || !amount}
            className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Send Tip'}
          </button>
        </div>
      </div>
    </div>
  );
}

