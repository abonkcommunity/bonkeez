import PumpFunAPI from 'pumpfun-api';
const pumpFun = new PumpFunAPI();

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
