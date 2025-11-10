import axios from 'axios';

const SIDESHIFT_API_KEY = process.env.SIDESHIFT_API_KEY;
const SIDESHIFT_API_SECRET = process.env.SIDESHIFT_API_SECRET;
const SIDESHIFT_BASE_URL = 'https://sideshift.ai/api/v2';

export interface SideShiftQuote {
  depositCoin: string;
  depositNetwork: string;
  settleCoin: string;
  settleNetwork: string;
  depositAmount?: string;
  settleAmount?: string;
}

export interface SideShiftOrder {
  id: string;
  type: string;
  depositCoin: string;
  depositNetwork: string;
  settleCoin: string;
  settleNetwork: string;
  depositAmount: string;
  settleAmount: string;
  depositAddress: string;
  settleAddress: string;
  status: string;
  createdAt: string;
}

export class SideShiftClient {
  private apiKey: string;
  private apiSecret: string;

  constructor() {
    if (!SIDESHIFT_API_KEY || !SIDESHIFT_API_SECRET) {
      throw new Error('SideShift API credentials not configured');
    }
    this.apiKey = SIDESHIFT_API_KEY;
    this.apiSecret = SIDESHIFT_API_SECRET;
  }

  private getAuthHeaders() {
    const credentials = Buffer.from(`${this.apiKey}:${this.apiSecret}`).toString('base64');
    return {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json',
    };
  }

  async getQuote(params: SideShiftQuote): Promise<any> {
    try {
      // Public API doesn't require auth for quotes
      const response = await axios.get(`${SIDESHIFT_BASE_URL}/quotes`, {
        params,
      });
      return response.data;
    } catch (error: any) {
      console.error('SideShift quote error:', error.response?.data || error.message);
      throw new Error(`Failed to get quote: ${error.response?.data?.message || error.message}`);
    }
  }

  async createOrder(params: {
    depositCoin: string;
    depositNetwork: string;
    settleCoin: string;
    settleNetwork: string;
    depositAmount?: string;
    settleAmount?: string;
    settleAddress: string;
  }): Promise<SideShiftOrder> {
    try {
      const response = await axios.post(
        `${SIDESHIFT_BASE_URL}/orders`,
        params,
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error: any) {
      console.error('SideShift order creation error:', error.response?.data || error.message);
      throw new Error(`Failed to create order: ${error.response?.data?.message || error.message}`);
    }
  }

  async getOrder(orderId: string): Promise<SideShiftOrder> {
    try {
      const response = await axios.get(`${SIDESHIFT_BASE_URL}/orders/${orderId}`, {
        headers: this.getAuthHeaders(),
      });
      return response.data;
    } catch (error: any) {
      console.error('SideShift get order error:', error.response?.data || error.message);
      throw new Error(`Failed to get order: ${error.response?.data?.message || error.message}`);
    }
  }

  async getSupportedCoins(): Promise<any> {
    try {
      const response = await axios.get(`${SIDESHIFT_BASE_URL}/coins`, {
        headers: this.getAuthHeaders(),
      });
      return response.data;
    } catch (error: any) {
      console.error('SideShift get coins error:', error.response?.data || error.message);
      throw new Error(`Failed to get supported coins: ${error.response?.data?.message || error.message}`);
    }
  }
}

export const sideshiftClient = new SideShiftClient();

