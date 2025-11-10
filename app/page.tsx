'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Feed from '@/components/Feed';
import WalletConnectPrompt from '@/components/WalletConnectPrompt';
import axios from 'axios';

export default function Home() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (isConnected && address) {
      authenticateUser();
    } else {
      setLoading(false);
    }
  }, [isConnected, address]);

  const authenticateUser = async () => {
    try {
      setAuthError(null);
      const nonceRes = await axios.post('/api/auth/nonce', {
        walletAddress: address,
      });

      const message = nonceRes.data.message;
      
      // Sign message with wallet
      const signature = await signMessageAsync({ message });

      const verifyRes = await axios.post('/api/auth/verify', {
        walletAddress: address,
        signature,
        message,
      });

      localStorage.setItem('token', verifyRes.data.token);
      setUser(verifyRes.data.user);
    } catch (error: any) {
      console.error('Auth error:', error);
      if (error.message && !error.message.includes('User rejected')) {
        setAuthError('Authentication failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar user={user} />
      <main className="max-w-4xl mx-auto px-4 py-8">
        {authError && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {authError}
          </div>
        )}
        {isConnected ? <Feed user={user} /> : <WalletConnectPrompt />}
      </main>
    </div>
  );
}

