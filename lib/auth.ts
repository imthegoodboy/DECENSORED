import jwt from 'jsonwebtoken';
import { ethers } from 'ethers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface AuthPayload {
  walletAddress: string;
  nonce: string;
}

export function generateNonce(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function generateJWT(walletAddress: string): string {
  return jwt.sign({ walletAddress }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyJWT(token: string): { walletAddress: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { walletAddress: string };
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function verifySignature(
  message: string,
  signature: string,
  address: string
): Promise<boolean> {
  try {
    const recoveredAddress = ethers.verifyMessage(message, signature);
    return recoveredAddress.toLowerCase() === address.toLowerCase();
  } catch (error) {
    return false;
  }
}

export function getAuthToken(req: any): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
}

