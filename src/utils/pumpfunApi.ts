export type TokenData = {
  price: string;
  marketCap: string;
  totalSupply: string;
};

// ✅ Your token contract address (BNKZ)
export const CA = "Gr1PWUXKBvEWN3d67d3FxvBmawjCtA5HWqfnJxSgDz1F";

// Moralis API Key (free tier = limited calls)
const API_KEY = process.env.REACT_APP_MORALIS_API_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjNjOGFhMjI3LWFhODMtNGYxNy05YTMzLTc1ZjI3ZGYwNGJjYiIsIm9yZ0lkIjoiNDY4NzIyIiwidXNlcklkIjoiNDgyMTk1IiwidHlwZUlkIjoiZWQxYTQxMDQtNmI4ZS00OGRiLWI1MmQtNDc3MWU0YjE4MGIzIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3NTY4MDM0NzUsImV4cCI6NDkxMjU2MzQ3NX0.tWWa9fiulK8pdX0h9Wy1j8vEMVq-F0aCmdAfwQPcIuE";
const headers = {
  accept: "application/json",
  "X-API-Key": API_KEY,
};

// Local cache (last successful snapshot)
let lastSnapshot: TokenData = {
  price: "N/A",
  marketCap: "N/A",
  totalSupply: "1,000,000,000",
};

// 🔹 Fetch Token Snapshot
export async function getTokenSnapshot(): Promise<TokenData> {
  try {
    const priceRes = await fetch(
      `https://solana-gateway.moralis.io/token/mainnet/${CA}/price`,
      { headers },
    );
    const priceData = await priceRes.json();

    const price = priceData?.usdPrice || 0;
    const totalSupply = 1_000_000_000; // Pump.fun always fixed
    const marketCap = price ? price * totalSupply : 0;

    const snapshot: TokenData = {
      price: price ? `$${Number(price).toFixed(12)}` : "N/A", // more decimals
      marketCap: marketCap ? `$${marketCap.toLocaleString(undefined, { maximumFractionDigits: 2 })}` : "N/A",
      totalSupply: totalSupply.toLocaleString(),
    };

    // Save for fallback
    lastSnapshot = snapshot;
    return snapshot;
  } catch (e) {
    console.warn("[Moralis] Snapshot failed, using last snapshot:", e);
    return lastSnapshot;
  }
}

// ✅ Safe alias
export async function getTokenDataSafe(): Promise<TokenData> {
  return await getTokenSnapshot();
}

// Pump.fun URL
export function getPumpfunUrl() {
  return `https://pump.fun/${CA}`;
}

// Solscan URL
export function getSolscanUrl() {
  return `https://solscan.io/token/${CA}?cluster=mainnet-beta`;
}
