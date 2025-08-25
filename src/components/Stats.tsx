import React from 'react'
import { TrendingUp, Users, Zap, DollarSign } from 'lucide-react'

const Stats = () => {
  const stats = [
    {
      icon: DollarSign,
      label: 'Total Volume',
      value: '0 SOL',
      change: 'Pre-Launch',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: Users,
      label: 'Total Owners',
      value: '0',
      change: 'Pre-Launch',
      color: 'from-slate-600 to-slate-700'
    },
    {
      icon: TrendingUp,
      label: 'Floor Price',
      value: '0.4 SOL',
      change: 'Launch Price',
      color: 'from-blue-600 to-purple-600'
    },
    {
      icon: Zap,
      label: 'Items Available',
      value: '5,350',
      change: 'Full Supply',
      color: 'from-slate-700 to-gray-700'
    }
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Collection Statistics
          </h2>
          <p className="text-slate-300 text-lg">
            Pre-launch data for the Bonkeez collection
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
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
