import { useState } from 'react'
import { mockTokens, formatPrice, formatMarketCap } from '../data/tokens'
import type { Token } from '../types'
import { MiniChart } from './MiniChart'

type SortOption = 'trending' | 'gainers' | 'new' | 'volume'

interface TokenListProps {
  onSelectToken: (token: Token) => void
}

export function TokenList({ onSelectToken }: TokenListProps) {
  const [activeSort, setActiveSort] = useState<SortOption>('trending')
  const [searchQuery, setSearchQuery] = useState('')

  const sortedTokens = [...mockTokens]
    .filter(token =>
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (activeSort) {
        case 'trending':
          return (b.trending ? 1 : 0) - (a.trending ? 1 : 0) || b.volume24h - a.volume24h
        case 'gainers':
          return b.priceChange24h - a.priceChange24h
        case 'new':
          return new Date(b.launchDate).getTime() - new Date(a.launchDate).getTime()
        case 'volume':
          return b.volume24h - a.volume24h
        default:
          return 0
      }
    })

  return (
    <div className="max-w-lg mx-auto px-4 py-4">
      {/* Search */}
      <div className="relative mb-4">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search tokens..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-lime-400/50 focus:ring-1 focus:ring-lime-400/50 transition-all"
        />
      </div>

      {/* Sort Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {[
          { key: 'trending', label: '🔥 Trending' },
          { key: 'gainers', label: '📈 Gainers' },
          { key: 'new', label: '✨ New' },
          { key: 'volume', label: '💰 Volume' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveSort(key as SortOption)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeSort === key
                ? 'bg-lime-400 text-black'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Token List */}
      <div className="space-y-3">
        {sortedTokens.map((token, index) => (
          <button
            key={token.id}
            onClick={() => onSelectToken(token)}
            className="w-full bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-white/10 rounded-2xl p-4 transition-all active:scale-[0.98] text-left group"
          >
            <div className="flex items-center gap-3">
              {/* Rank */}
              <div className="w-6 text-center text-white/30 text-sm font-medium">
                {index + 1}
              </div>

              {/* Logo */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-2xl border border-white/10">
                {token.logo}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white truncate">{token.name}</span>
                  {token.trending && (
                    <span className="flex-shrink-0 text-xs bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded-md">
                      🔥
                    </span>
                  )}
                  {token.isNew && (
                    <span className="flex-shrink-0 text-xs bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded-md">
                      NEW
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-white/40">{token.symbol}</span>
                  <span className="text-white/20">•</span>
                  <span className="text-white/40">{formatMarketCap(token.marketCap)}</span>
                </div>
              </div>

              {/* Chart */}
              <div className="w-16 h-10 flex-shrink-0">
                <MiniChart
                  positive={token.priceChange24h >= 0}
                  data={generateChartData(token.priceChange24h)}
                />
              </div>

              {/* Price & Change */}
              <div className="text-right flex-shrink-0">
                <div className="font-bold text-white">{formatPrice(token.price)}</div>
                <div className={`text-sm font-semibold ${
                  token.priceChange24h >= 0 ? 'text-lime-400' : 'text-red-400'
                }`}>
                  {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(1)}%
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {sortedTokens.length === 0 && (
        <div className="text-center py-12 text-white/40">
          <div className="text-4xl mb-3">🔍</div>
          <p>No tokens found</p>
        </div>
      )}
    </div>
  )
}

function generateChartData(priceChange: number): number[] {
  const points = 12
  const data: number[] = []
  let value = 50

  for (let i = 0; i < points; i++) {
    const trend = priceChange >= 0 ? 0.1 : -0.1
    const noise = (Math.random() - 0.5) * 20
    value = Math.max(10, Math.min(90, value + trend * 10 + noise))
    data.push(value)
  }

  // Push toward the trend direction at the end
  if (priceChange >= 0) {
    data[data.length - 1] = Math.min(90, data[data.length - 1] + 10)
  } else {
    data[data.length - 1] = Math.max(10, data[data.length - 1] - 10)
  }

  return data
}
