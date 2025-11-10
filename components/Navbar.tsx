'use client';

import { useAccount, useDisconnect } from 'wagmi';
import Link from 'next/link';
import { MessageSquare, Home, Users, TrendingUp, Mail, User } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';
import { useState } from 'react';
import MessagesModal from './MessagesModal';

interface NavbarProps {
  user: any;
}

export default function Navbar({ user }: NavbarProps) {
  const { isConnected, address, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const [showMessages, setShowMessages] = useState(false);
  
  const openWalletModal = async () => {
    if (connector) {
      await connector.connect();
    } else {
      // Fallback: try to connect injected wallet
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      }
    }
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <img src="/logo.svg" alt="DECENSORED" className="h-8 w-8" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  DECENSORED
                </span>
              </Link>
            </div>

            <div className="flex-1 flex items-center justify-center mx-8">
              <SearchBar />
            </div>

            <div className="flex items-center space-x-4">
              {isConnected && (
                <>
                  <Link
                    href="/"
                    className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors"
                  >
                    <Home className="h-5 w-5" />
                    <span className="hidden sm:inline">Home</span>
                  </Link>
                  <Link
                    href="/communities"
                    className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors"
                  >
                    <Users className="h-5 w-5" />
                    <span className="hidden sm:inline">Communities</span>
                  </Link>
                  <Link
                    href="/trending"
                    className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors"
                  >
                    <TrendingUp className="h-5 w-5" />
                    <span className="hidden sm:inline">Trending</span>
                  </Link>
                  {user && (
                    <button
                      onClick={() => setShowMessages(true)}
                      className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors relative"
                    >
                      <Mail className="h-5 w-5" />
                      <span className="hidden sm:inline">Messages</span>
                    </button>
                  )}
                  {user && (
                    <Link
                      href={`/profile/${user.walletAddress}`}
                      className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                    >
                      {user.avatar && ['🥺', '🤕', '😭', '😗', '😂'].includes(user.avatar) ? (
                        <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xl">
                          {user.avatar}
                        </div>
                      ) : (
                        <img
                          src={user.avatar || `https://ui-avatars.com/api/?name=${user.displayName}&background=0ea5e9&color=fff`}
                          alt={user.displayName}
                          className="h-8 w-8 rounded-full"
                        />
                      )}
                      <span className="text-gray-700 dark:text-gray-300 hidden md:inline">
                        {user.displayName}
                      </span>
                    </Link>
                  )}
                </>
              )}

              <ThemeToggle />

              {isConnected ? (
                <button
                  onClick={() => disconnect()}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Disconnect
                </button>
              ) : (
                <button
                  onClick={openWalletModal}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showMessages && user && (
        <MessagesModal
          isOpen={showMessages}
          onClose={() => setShowMessages(false)}
          currentUser={user}
        />
      )}
    </>
  );
}

