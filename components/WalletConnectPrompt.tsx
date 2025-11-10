'use client';

import { useWeb3Modal } from '@web3modal/wagmi/react';
import { Shield, Zap, Globe, Lock } from 'lucide-react';

export default function WalletConnectPrompt() {
  const { open } = useWeb3Modal();

  return (
    <div className="max-w-2xl mx-auto mt-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          DECENSORED
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
          The Decentralized Social Network
        </p>
        <p className="text-lg text-gray-500 dark:text-gray-500">
          No bans. No censorship. No middlemen.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex items-start space-x-4">
            <Shield className="h-8 w-8 text-primary-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Censorship Resistant</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your content lives forever on decentralized storage. No one can delete it.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Zap className="h-8 w-8 text-primary-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Crypto Powered</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Tip, subscribe, and monetize directly with any cryptocurrency.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Globe className="h-8 w-8 text-primary-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Global Access</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Works across any blockchain. Pay in any token, receive in any token.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Lock className="h-8 w-8 text-primary-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-lg mb-2">You Own Your Identity</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your account is tied to your wallet. No email, no KYC, no company owns you.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => open()}
          className="w-full py-4 bg-primary-600 text-white text-lg font-semibold rounded-lg hover:bg-primary-700 transition-colors"
        >
          Connect Wallet to Get Started
        </button>
      </div>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        <p>By connecting, you agree to DECENSORED's Terms of Service</p>
        <p className="mt-2">
          Powered by decentralized storage • SideShift for cross-chain payments
        </p>
      </div>
    </div>
  );
}

