import React, { useEffect, useState } from 'react'
import { TrendingUp, Users, Zap, DollarSign } from 'lucide-react'

const Stats = () => {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(
          "https://frontend-api.pump.fun/coins/4eWwNkhJm28tDcu7GjWP8HgMZCdcXHWrftQrRpo6pump"
        )
        const data = await res.json()
        setStats({
          price: `$${Number(data.price).toFixed(6)}`,
          marketCap: `$${(data.usdMarketCap / 1e3).toFixed(1)}K`,
          volume: `$${(data.usdVolume24h / 1e3).toFixed(1)}K`,
          holders: data.holders?.toLocaleString() || "N/A",
          supply: data.supply?.toLocaleString() || "N/A"
        })
      } catch (err) {
        console.error("Error fetching Pump.fun stats", err)
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 30000) // refresh every 30s
    return () => clearInterval(interval)
  }, [])

  if (!stats) {
    return <p className="text-center text-slate-400">Loading stats...</p>
  }

  const displayStats = [
    {
      icon: DollarSign,
      label: '24h Volume',
      value: stats.volume,
      change: 'Live',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: Users,
      label: 'Holders',
      value: stats.holders,
      change: 'Live',
      color: 'from-slate-600 to-slate-700'
    },
    {
      icon: TrendingUp,
      label: 'Token Price',
      value: stats.price,
      change: 'Live',
      color: 'from-blue-600 to-purple-600'
    },
    {
      icon: Zap,
      label: 'Market Cap',
      value: stats.marketCap,
      change: 'Live',
      color: 'from-slate-700 to-gray-700'
    }
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            $BNKZ Token Statistics
          </h2>
          <p className="text-slate-300 text-lg">
            Real-time data powered by Pump.fun
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm font-medium px-2 py-1 rounded-full text-pink-400 bg-pink-400/20">
                  {stat.change}
                </div>
              </div>

              <div>
                <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                <p className="text-white text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats