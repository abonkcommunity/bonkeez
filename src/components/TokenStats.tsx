import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  DollarSign,
  Users,
  Zap,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import {
  getTokenDataSafe,
  getPumpfunUrl,
  getSolscanUrl,
  startPumpPortalWs,
  type TokenData,
} from "../utils/pumpfunApi";

const TokenStats: React.FC = () => {
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [loading, setLoading] = useState(true);
  const [wsAvailable, setWsAvailable] = useState<boolean | null>(null);
  const [wsConnection, setWsConnection] = useState<ReturnType<typeof startPumpPortalWs> | null>(null);

  useEffect(() => {
    let mounted = true;
    let wsFirstMessage = false;
    let wsTimeout: NodeJS.Timeout | null = null;

    // Initialize with mock data
    async function initData() {
      const snap = await getTokenDataSafe();
      if (mounted) {
        setTokenData(snap);
        setLoading(false);
      }
    }
    initData();

    // Set up WebSocket
    wsTimeout = setTimeout(() => {
      if (!wsFirstMessage && mounted) {
        setWsAvailable(false);
      }
    }, 30_000); // 30s timeout for slow networks

    const conn = startPumpPortalWs(
      (data) => {
        if (!mounted) return;
        if (!wsFirstMessage) {
          wsFirstMessage = true;
          if (wsTimeout) {
            clearTimeout(wsTimeout);
            wsTimeout = null;
          }
          setWsAvailable(true);
        }
        setTokenData(data);
      },
      {}
    );
    setWsConnection(conn);

    return () => {
      mounted = false;
      if (wsTimeout) clearTimeout(wsTimeout);
      conn.close();
    };
  }, []);

  const handlePumpfunClick = () => {
    window.open(getPumpfunUrl(), "_blank", "noopener,noreferrer");
  };

  const handleSolscanClick = () => {
    window.open(getSolscanUrl(), "_blank", "noopener,noreferrer");
  };

  const handleRetry = () => {
    if (wsConnection) {
      setWsAvailable(null);
      setLoading(true);
      wsConnection.reconnect();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  if (loading || !tokenData) {
    return (
      <section className="py-16 px-4 bg-gradient-to-r from-purple-700/5 to-slate-600/5">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-white/10 rounded-lg w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-white/5 rounded w-96 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="stats"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-700/5 to-slate-600/5"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-purple-700/20 text-purple-300 px-6 py-3 rounded-full text-lg font-bold mb-6">
            <Zap className="w-5 h-5 mr-2" />
            $BNKZ Token Live on Pump.fun
            {wsAvailable === true && (
              <span className="ml-4 px-2 py-1 text-xs rounded bg-emerald-600/20 text-emerald-200">
                Live feed
              </span>
            )}
            {wsAvailable === false && (
              <div className="ml-4 flex items-center space-x-2">
                <span className="px-2 py-1 text-xs rounded bg-yellow-600/20 text-yellow-200">
                  Realtime not available (no recent trades or connection issue)
                </span>
                <button
                  onClick={handleRetry}
                  className="px-2 py-1 text-xs rounded bg-purple-600/20 text-purple-200 hover:bg-purple-600/30"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            $BNKZ Token Statistics
          </h2>
          <p className="text-xl text-slate-300 mb-6">
            The official Bonkeez ecosystem token powering the marketplace
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-slate-400">
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
        </div>

        {/* --- Stats grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-emerald-500/10 to-slate-600/10 rounded-2xl p-6 border border-purple-700/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-700 to-purple-800 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div
                className={`px-3 py-1 rounded-full text-sm font-bold ${
                  tokenData.change24h >= 0
                    ? "text-purple-300 bg-emerald-400/20"
                    : "text-red-400 bg-red-400/20"
                }`}
              >
                {tokenData.change24h >= 0 ? "+" : ""}
                {tokenData.change24h.toFixed(1)}%
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
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-1">Holders</p>
            <h3 className="text-2xl font-bold text-white">{tokenData.holders}</h3>
          </div>
          <div className="bg-gradient-to-br from-emerald-500/10 to-slate-600/10 rounded-2xl p-6 border border-purple-700/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-700 to-purple-800 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-1">24h Volume</p>
            <h3 className="text-2xl font-bold text-white">{tokenData.volume24h}</h3>
          </div>
          <div className="bg-gradient-to-br from-emerald-500/10 to-slate-600/10 rounded-2xl p-6 border border-purple-700/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-700 to-purple-800 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-1">Total Supply</p>
            <h3 className="text-2xl font-bold text-white">{tokenData.totalSupply}</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenStats;