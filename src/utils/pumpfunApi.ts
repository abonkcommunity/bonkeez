
export interface TokenData {
  name: string;
  symbol: string;
  description: string;
  image: string;
  mint: string;
  usd_market_cap: number;
  reply_count: number;
  last_reply: number;
  nsfw: boolean;
  market_cap: number;
  volume_24h: number;
  created_timestamp: number;
  king_of_the_hill_timestamp?: number;
  show_name: boolean;
  uri: string;
  twitter?: string;
  telegram?: string;
  website?: string;
  associated_bonding_curve: string;
  creator: string;
  complete: boolean;
  virtual_sol_reserves: number;
  virtual_token_reserves: number;
  total_supply: number;
  raydium_pool?: string;
}

const BONKEEZ_TOKEN_MINT = "J1S9H3QjnRtBbbuD4HjPV6RpRhwuk4zKbxsnCHuTgh9w";

export async function getTokenDataSafe(): Promise<TokenData | null> {
  try {
    const response = await fetch(`https://frontend-api.pump.fun/coins/${BONKEEZ_TOKEN_MINT}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching token data:', error);
    return null;
  }
}

export function getPumpfunUrl(mintAddress: string = BONKEEZ_TOKEN_MINT): string {
  return `https://pump.fun/${mintAddress}`;
}

export function getSolscanUrl(mintAddress: string = BONKEEZ_TOKEN_MINT): string {
  return `https://solscan.io/token/${mintAddress}`;
}
