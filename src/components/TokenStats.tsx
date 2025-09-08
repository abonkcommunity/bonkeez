import React, { useState } from "react";
import { TrendingUp, DollarSign, ExternalLink, Zap, RefreshCw } from "lucide-react";
import { getPumpfunUrl, getSolscanUrl, getTokenSnapshot, type TokenData } from "../utils/pumpfunApi";

const TokenStats: React.FC = () => {
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSnapshot = async () => {
    setLoading(true);
    setError(null);
    try {
      const snap = await getTokenSnapshot();
      setTokenData(snap);
    } catch (e: any) {
      setError(e.message || "Failed to fetch token data");
    } finally {
      setLoading(false);
    }
  };

  const handlePumpfunClick = () => {
    window.open(getPumpfunUrl(), "_blank", "noopener,noreferrer");
  };

  const handleSolscanClick = () => {
    window.open(getSolscanUrl(), "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-700/5 to-slate-600/5">
      <div className="max-w-7xl mx-auto text-center">
        {/* Header */}
        <div className="inline-flex items-center bg-purple-700/20 text-purple-300 px-6 py-3 rounded-full text-lg font-bold mb-6">
          <Zap className="w-5 h-5 mr-2" />
          $BNKZ Token Live on Pump.fun
        </div>

        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
          $BNKZ Token Statistics
        </h2>
        <p className="text-xl text-slate-300 mb-6">
          The official Bonkeez ecosystem token powering the marketplace
        </p>

        {/* Contract + Links */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-slate-400 mb-8">
          <span className="font-mono text-sm">
            Contract: Gr1PWUXKBvEWN3d67d3FxvBmawjCtA5HWqfnJxSgDz1F
          </span>
          <button
            onClick={handleSolscanClick}
            className="flex items-center space-x-1 text-purple-300 hover:text-purple-200 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View on Solscan</span>
          </button>
        </div>

        {/* Fetch Button */}
        {!tokenData && !loading && (
          <button
            onClick={fetchSnapshot}
            className="px-6 py-3 rounded-xl bg-purple-700/30 text-purple-200 font-bold hover:bg-purple-700/50 transition-colors"
          >
            Load Token Data
          </button>
        )}

        {/* Loading */}
        {loading && (
          <div className="animate-pulse text-slate-400">Fetching latest data...</div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-4 text-red-400 flex items-center justify-center space-x-2">
            <span>{error}</span>
            <button
              onClick={fetchSnapshot}
              className="flex items-center space-x-1 px-2 py-1 rounded bg-purple-600/20 text-purple-200 hover:bg-purple-600/30"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Stats grid */}
        {tokenData && !loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
            <div className="bg-gradient-to-br from-emerald-500/10 to-slate-600/10 rounded-2xl p-6 border border-purple-700/20">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-700 to-purple-800 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-slate-400 text-sm mb-1">Price</p>
              <h3 className="text-2xl font-bold text-white">{tokenData.price}</h3>
            </div>
            <div className="bg-gradient-to-br from-emerald-500/10 to-slate-600/10 rounded-2xl p-6 border border-purple-700/20">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-700 to-purple-800 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-slate-400 text-sm mb-1">Market Cap</p>
              <h3 className="text-2xl font-bold text-white">{tokenData.marketCap}</h3>
            </div>
            <div className="bg-gradient-to-br from-emerald-500/10 to-slate-600/10 rounded-2xl p-6 border border-purple-700/20">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-700 to-purple-800 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-slate-400 text-sm mb-1">Total Supply</p>
              <h3 className="text-2xl font-bold text-white">{tokenData.totalSupply}</h3>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TokenStats;
