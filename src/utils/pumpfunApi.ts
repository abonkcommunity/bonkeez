export type TokenData = {
  price: string;
  marketCap: string;
  volume24h: string;
  holders: string;
  totalSupply: string;
  change24h: number;
};

// ✅ Your token contract address (BNKZ)
export const CA = "Gr1PWUXKBvEWN3d67d3FxvBmawjCtA5HWqfnJxSgDz1F";

// Safe fallback data (mock)
export async function getTokenDataSafe(): Promise<TokenData> {
  return {
    price: "$0.0000002",
    marketCap: "$5.8k",
    volume24h: "0",
    holders: "7",
    totalSupply: "1B",
    change24h: 0,
  };
}

// 🔹 PumpPortal WS connection for real-time trade data
export function startPumpPortalWs(
  onUpdate: (data: TokenData) => void,
  { apiKey }: { apiKey?: string } = {}
) {
  const url = "wss://pumpportal.fun/api/data";
  let ws: WebSocket | null = null;
  let lastPrice: number | null = null;
  let reconnectAttempts = 0;
  let reconnectTimeout: NodeJS.Timeout | null = null;

  const connect = () => {
    ws = new WebSocket(url, apiKey ? [apiKey] : undefined);

    ws.onopen = () => {
      console.log("[PumpPortal] Connected");
      reconnectAttempts = 0; // Reset reconnect attempts
      // Subscribe to token trades for your CA
      ws.send(
        JSON.stringify({
          method: "subscribeTokenTrade",
          keys: [CA],
        })
      );
    };

    ws.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data.toString());
        console.log("[PumpPortal] Raw message:", data); // Debug log
        if (data.message) {
          console.log("[PumpPortal message]", data.message);
          return;
        }
        if (data.mint === CA && data.solAmount && data.tokenAmount) {
          // Calculate price (SOL per token, converted to USD assuming 1 SOL = $130)
          const solPrice = 130; // Approximate SOL price, adjust as needed
          const price = (data.solAmount / data.tokenAmount) * solPrice;
          const priceChange = lastPrice ? ((price - lastPrice) / lastPrice) * 100 : 0;
          lastPrice = price;

          const tokenData: TokenData = {
            price: `$${price.toFixed(8)}`,
            marketCap: "N/A", // PumpPortal doesn't provide market cap
            volume24h: data.solAmount ? `${(data.solAmount * solPrice).toFixed(2)}` : "N/A",
            holders: "N/A", // Not provided by PumpPortal
            totalSupply: "N/A", // Not provided by PumpPortal
            change24h: Number(priceChange.toFixed(1)),
          };
          console.log("[PumpPortal] Trade data processed:", tokenData); // Debug log
          onUpdate(tokenData);
        }
      } catch (e) {
        console.warn("[PumpPortal parse failed]", e);
      }
    };

    ws.onerror = (err) => {
      console.error("[PumpPortal] Error:", err);
      onUpdate(getTokenDataSafe());
    };

    ws.onclose = () => {
      console.log("[PumpPortal] Disconnected");
      reconnectAttempts++;
      console.log(`[PumpPortal] Reconnecting (attempt ${reconnectAttempts})...`);
      reconnectTimeout = setTimeout(connect, 5000 * Math.min(reconnectAttempts, 10)); // Cap backoff at 50s
    };
  };

  connect();

  return {
    close: () => {
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
      if (ws) ws.close();
    },
    reconnect: () => {
      reconnectAttempts = 0;
      if (ws) ws.close();
      connect();
    },
  };
}

// Pump.fun URL for BNKZ
export function getPumpfunUrl() {
  return `https://pump.fun/${CA}`;
}

// Solscan URL for BNKZ
export function getSolscanUrl() {
  return `https://solscan.io/token/${CA}?cluster=mainnet-beta`;
}