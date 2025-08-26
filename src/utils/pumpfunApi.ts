import PumpFunAPI from 'pumpfun-api';
const pumpFun = new PumpFunAPI();

const BONKZ_CONTRACT_ADDRESS = 'Gr1PWUXKBvEWN3d67d3FxvBmawjCtA5HWqfnJxSgDz1F';

export interface TokenData {
  price: string;
  change24h: string;
  marketCap: string;
  volume24h: string;
  holders: string;
  totalSupply: string;
}

export const getTokenDataLive = async (mintAddress: string) => {
  try {
    const tokenData = await pumpFun.getTokenData(mintAddress);
    return {
      price: `$${tokenData.price}`,
      change24h: `${tokenData.change24h}%`,
      marketCap: `$${tokenData.marketCap}`,
      volume24h: `$${tokenData.volume24h}`,
      holders: tokenData.holders,
      totalSupply: tokenData.totalSupply,
    };
  } catch (error) {
    console.error('Error fetching live token data:', error);
    return null;
  }
};

export const getTokenDataSafe = async (): Promise<TokenData | null> => {
  try {
    const data = await getTokenDataLive(BONKZ_CONTRACT_ADDRESS);
    if (!data) {
      // Return fallback data if API fails
      return {
        price: '$0.0001',
        change24h: '+0.0%',
        marketCap: '$100K',
        volume24h: '$10K',
        holders: '1.2K',
        totalSupply: '1B BNKZ'
      };
    }
    return data;
  } catch (error) {
    console.error('Error in getTokenDataSafe:', error);
    // Return fallback data
    return {
      price: '$0.0001',
      change24h: '+0.0%',
      marketCap: '$100K',
      volume24h: '$10K',
      holders: '1.2K',
      totalSupply: '1B BNKZ'
    };
  }
};

export const getPumpfunUrl = (): string => {
  return `https://pump.fun/coin/${BONKZ_CONTRACT_ADDRESS}`;
};

export const getSolscanUrl = (): string => {
  return `https://solscan.io/token/${BONKZ_CONTRACT_ADDRESS}`;
};