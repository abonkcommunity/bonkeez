import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Users, Zap, ExternalLink } from 'lucide-react';
import { getTokenDataSafe, getSolscanUrl, type TokenData } from '../utils/moralisApi';

const TokenStats = () => {
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getTokenDataSafe();
        if (data) setTokenData(data);
      } catch {
        setTokenData({
          price: '$0.000001',
          marketCap: 'N/A',
          volume24h: 'N/A',
          holders: 'N/A',
          totalSupply: '1B',
          change24h: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !tokenData) return <p>Loading token stats...</p>;

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-emerald-500/5 to-slate-600/5">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center bg-emerald-400/20 text-emerald-400 px-6 py-3 rounded-full text-lg font-bold mb-6">
          <Zap className="w-5 h-5 mr-2" />
          $BNKZ Token Live on Solana
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">$BNKZ Token Statistics</h2>
        <div className="flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-4 text-slate-400">
          <span className="font-mono text-sm">Contract: Gr1PWUXKBvEWN3d67d3FxvBmawjCtA5HWqfnJxSgDz1F</span>
          <button onClick={() => window.open(getSolscanUrl(), '_blank', 'noopener,noreferrer')} className="text-emerald-400 hover:text-emerald-300 flex items-center space-x-1">
            <ExternalLink className="w-4 h-4" />
            View on Solscan
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          <div className="bg-white/5 p-4 rounded-2xl">
            <DollarSign className="w-6 h-6 text-white mb-2" />
            <p className="text-slate-400 text-xs">Token Price</p>
            <p className="text-white text-xl font-bold">{tokenData.price}</p>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl">
            <TrendingUp className="w-6 h-6 text-white mb-2" />
            <p className="text-slate-400 text-xs">Market Cap</p>
            <p className="text-white text-xl font-bold">{tokenData.marketCap}</p>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl">
            <Zap className="w-6 h-6 text-white mb-2" />
            <p className="text-slate-400 text-xs">24h Volume</p>
            <p className="text-white text-xl font-bold">{tokenData.volume24h}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-white/5 p-4 rounded-2xl">
            <Users className="w-6 h-6 text-slate-400 mb-2" />
            <p className="text-slate-400 text-xs">Token Holders</p>
            <p className="text-white text-xl font-bold">{tokenData.holders}</p>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl">
            <Zap className="w-6 h-6 text-emerald-400 mb-2" />
            <p className="text-slate-400 text-xs">Total Supply</p>
            <p className="text-white text-xl font-bold">{tokenData.totalSupply}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenStats;
