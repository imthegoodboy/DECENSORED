'use client';

import { createConfig, http } from 'wagmi';
import { mainnet, polygon, base, arbitrum } from 'wagmi/chains';
import { walletConnect, injected, coinbaseWallet } from 'wagmi/connectors';

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'demo-project-id';

const metadata = {
  name: 'DECENSORED',
  description: 'The Decentralized Social Network',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://decensored.app',
  icons: ['https://decensored.app/logo.png'],
};

const chains = [mainnet, polygon, base, arbitrum] as const;

export const config = createConfig({
  chains,
  connectors: [
    walletConnect({ projectId, metadata, showQrModal: true }),
    injected({ shimDisconnect: true }),
    coinbaseWallet({ appName: metadata.name }),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [base.id]: http(),
    [arbitrum.id]: http(),
  },
  ssr: true,
});

