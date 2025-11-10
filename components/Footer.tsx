'use client';

import Link from 'next/link';
import { MessageSquare, Github, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/logo.svg" alt="DECENSORED" className="h-8 w-8" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                DECENSORED
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              The Decentralized Social Network. No bans. No censorship. No middlemen.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/trending" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">
                  Trending
                </Link>
              </li>
              <li>
                <Link href="/communities" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">
                  Communities
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">
                  Search
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/README.md" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">
                  Documentation
                </a>
              </li>
              <li>
                <a href="/SETUP.md" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">
                  Setup Guide
                </a>
              </li>
              <li>
                <span className="text-gray-600 dark:text-gray-400">API</span>
              </li>
              <li>
                <span className="text-gray-600 dark:text-gray-400">Help Center</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Powered By</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-gray-600 dark:text-gray-400">SideShift</span>
                <span className="text-xs text-gray-500 ml-2">Cross-chain payments</span>
              </li>
              <li>
                <span className="text-gray-600 dark:text-gray-400">IPFS</span>
                <span className="text-xs text-gray-500 ml-2">Decentralized storage</span>
              </li>
              <li>
                <span className="text-gray-600 dark:text-gray-400">Ethereum</span>
                <span className="text-xs text-gray-500 ml-2">Blockchain</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2024 DECENSORED. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

