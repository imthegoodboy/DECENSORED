import { useSignMessage } from 'wagmi';

export async function signMessageWithWallet(message: string): Promise<string> {
  // This will be called from the component using useSignMessage hook
  // The actual signing happens in the component
  return '';
}

export function formatAuthMessage(nonce: string): string {
  return `Sign this message to authenticate with DECENSORED.\n\nNonce: ${nonce}`;
}

