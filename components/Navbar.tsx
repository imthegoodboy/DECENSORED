'use client';

import { useAccount, useDisconnect } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import Link from 'next/link';
import { MessageSquare, Home, Users, TrendingUp, Mail, User } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useState } from 'react';
import MessagesModal from './MessagesModal';

interface NavbarProps {
  user: any;
}

export default function Navbar({ user }: NavbarProps) {
  const { isConnected, address } = useAccount();
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const [showMessages, setShowMessages] = useState(false);

  return (
    <>
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  DECENSORED
                </span>
              </Link>
            </div>

          <div className="flex items-center space-x-4">
            {isConnected && (
              <>
                <Link
                  href="/"
                  className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary-600"
                >
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </Link>
                <Link
                  href="/communities"
                  className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary-600"
                >
                  <Users className="h-5 w-5" />
                  <span>Communities</span>
                </Link>
                <Link
                  href="/trending"
                  className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary-600"
                >
                  <TrendingUp className="h-5 w-5" />
                  <span>Trending</span>
                </Link>
                {user && (
                  <Link
                    href={`/profile/${user.walletAddress}`}
                    className="flex items-center space-x-2"
                  >
                    <img
                      src={user.avatar || '/default-avatar.png'}
                      alt={user.displayName}
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      {user.displayName}
                    </span>
                  </Link>
                )}
              </>
            )}

            {isConnected ? (
              <button
                onClick={() => disconnect()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Disconnect
              </button>
            ) : (
              <button
                onClick={() => open()}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

