import React from 'react'
import { TrendingUp, Users, Zap, DollarSign } from 'lucide-react'

const Stats = () => {
  const stats = [
    {
      icon: DollarSign,
      label: 'Total Volume',
      value: '2,847 SOL',
      change: '+12.5%',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: Users,
      label: 'Total Owners',
      value: '1,234',
      change: '+8.2%',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      icon: TrendingUp,
      label: 'Floor Price',
      value: '8.5 SOL',
      change: '+15.3%',
      color: 'from-purple-400 to-pink-500'
    },
    {
      icon: Zap,
      label: 'Items Listed',
      value: '156',
      change: '-2.1%',
      color: 'from-yellow-400 to-orange-500'
    }
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Collection Statistics
          </h2>
          <p className="text-gray-300 text-lg">
            Real-time data from the Bonkeez marketplace
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                  stat.change.startsWith('+') 
                    ? 'text-green-400 bg-green-400/20' 
                    : 'text-red-400 bg-red-400/20'
                }`}>
                  {stat.change}
                </div>
              </div>
              
              <div>
                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
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
