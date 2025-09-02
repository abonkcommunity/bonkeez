// src/utils/moralisApi.ts
export type TokenData = {
  price: string;
  marketCap: string;
  volume24h: string;
  holders: string;
  totalSupply: string;
  change24h: number;
};

const CA = "Gr1PWUXKBvEWN3d67d3FxvBmawjCtA5HWqfnJxSgDz1F";

export async function getTokenDataSafe(): Promise<TokenData | null> {
  try {
    const res = await fetch(`/api/moralis/${CA}`);
    if (!res.ok) throw new Error(`Failed to fetch BNKZ token data (status ${res.status})`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching BNKZ token data:", err);
    return null;
  }
}

export function getSolscanUrl() {
  return `https://solscan.io/token/${CA}?cluster=mainnet-beta`;
}