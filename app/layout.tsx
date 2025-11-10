import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DECENSORED - The Decentralized Social Network',
  description: 'No bans. No censorship. No middlemen. Just people, free speech, and crypto-powered creativity.',
  keywords: 'decentralized social network, web3, blockchain, crypto, censorship-free, sideShift',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

