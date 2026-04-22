import { useState } from 'react'
import { useAccount, useBalance } from 'wagmi'
import { formatEther } from 'viem'
import { formatPrice, formatMarketCap, formatNumber, generatePriceHistory } from '../data/tokens'
import type { Token } from '../types'
import { PriceChart } from './PriceChart'

interface TokenDetailProps {
  token: Token
  onBack: () => void
}

type TimeRange = '1H' | '24H' | '7D' | '30D'

export function TokenDetail({ token, onBack }: TokenDetailProps) {
  const { address } = useAccount()
  const { data: balance } = useBalance({ address })
  const [timeRange, setTimeRange] = useState<TimeRange>('24H')
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy')
  const [amount, setAmount] = useState('')

  const ethBalance = balance ? parseFloat(formatEther(balance.value)) : 0
  const priceHistory = generatePriceHistory(token.price, timeRange === '1H' ? 60 : timeRange === '24H' ? 24 : timeRange === '7D' ? 168 : 720)

  const estimatedTokens = amount ? parseFloat(amount) / token.price : 0

  return (
    <div className="min-h-screen bg-black text-white pb-32">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-xl border border-white/10">
                {token.logo}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">{token.symbol}</span>
                  {token.trending && <span className="text-orange-400 text-xs">🔥</span>}
                </div>
                <div className="text-sm text-white/40">{token.name}</div>
              </div>
            </div>
            <button className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Price */}
        <div className="mb-6">
          <div className="text-4xl font-black tracking-tight mb-1">
            {formatPrice(token.price)}
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-lg font-semibold ${
              token.priceChange24h >= 0 ? 'text-lime-400' : 'text-red-400'
            }`}>
              {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
            </span>
            <span className="text-white/30">24h</span>
            <span className={`text-sm ${
              token.priceChange1h >= 0 ? 'text-lime-400/60' : 'text-red-400/60'
            }`}>
              {token.priceChange1h >= 0 ? '+' : ''}{token.priceChange1h.toFixed(1)}% 1h
            </span>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white/[0.02] rounded-2xl border border-white/5 p-4 mb-6">
          <div className="flex gap-2 mb-4">
            {(['1H', '24H', '7D', '30D'] as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  timeRange === range
                    ? 'bg-lime-400 text-black'
                    : 'bg-white/5 text-white/40 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <div className="h-48">
            <PriceChart data={priceHistory} positive={token.priceChange24h >= 0} />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white/[0.03] rounded-xl p-4 border border-white/5">
            <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Market Cap</div>
            <div className="text-lg font-bold">{formatMarketCap(token.marketCap)}</div>
          </div>
          <div className="bg-white/[0.03] rounded-xl p-4 border border-white/5">
            <div className="text-xs text-white/40 uppercase tracking-wider mb-1">24h Volume</div>
            <div className="text-lg font-bold">{formatMarketCap(token.volume24h)}</div>
          </div>
          <div className="bg-white/[0.03] rounded-xl p-4 border border-white/5">
            <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Holders</div>
            <div className="text-lg font-bold">{formatNumber(token.holders)}</div>
          </div>
          <div className="bg-white/[0.03] rounded-xl p-4 border border-white/5">
            <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Chain</div>
            <div className="text-lg font-bold flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500" />
              Base
            </div>
          </div>
        </div>

        {/* Contract */}
        <div className="bg-white/[0.03] rounded-xl p-4 border border-white/5 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Contract</div>
              <div className="text-sm font-mono text-white/60">{token.contractAddress}</div>
            </div>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Trade Section */}
        <div className="bg-gradient-to-b from-white/[0.05] to-white/[0.02] rounded-2xl border border-white/10 p-5">
          {/* Buy/Sell Toggle */}
          <div className="flex gap-2 mb-5 p-1 bg-white/5 rounded-xl">
            <button
              onClick={() => setTradeType('buy')}
              className={`flex-1 py-2.5 rounded-lg font-bold text-sm transition-all ${
                tradeType === 'buy'
                  ? 'bg-lime-400 text-black'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setTradeType('sell')}
              className={`flex-1 py-2.5 rounded-lg font-bold text-sm transition-all ${
                tradeType === 'sell'
                  ? 'bg-red-400 text-black'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              Sell
            </button>
          </div>

          {/* Amount Input */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/40">You pay</span>
              <span className="text-sm text-white/40">
                Balance: {ethBalance.toFixed(4)} ETH
              </span>
            </div>
            <div className="relative">
              <input
                type="number"
                placeholder="0.0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-2xl font-bold text-white placeholder:text-white/20 focus:outline-none focus:border-lime-400/50 focus:ring-1 focus:ring-lime-400/50"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <span className="text-white/60 font-medium">ETH</span>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              {['25%', '50%', '75%', 'MAX'].map((pct) => (
                <button
                  key={pct}
                  onClick={() => {
                    const multiplier = pct === 'MAX' ? 1 : parseInt(pct) / 100
                    setAmount((ethBalance * multiplier).toFixed(6))
                  }}
                  className="flex-1 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-semibold text-white/40 hover:text-white transition-colors"
                >
                  {pct}
                </button>
              ))}
            </div>
          </div>

          {/* You receive */}
          <div className="mb-5">
            <div className="text-sm text-white/40 mb-2">You receive</div>
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">
                  {estimatedTokens > 0 ? formatNumber(estimatedTokens) : '0'}
                </span>
                <span className="text-white/60 font-medium">{token.symbol}</span>
              </div>
            </div>
          </div>

          {/* Trade Button */}
          <button
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all active:scale-[0.98] ${
              tradeType === 'buy'
                ? 'bg-gradient-to-r from-lime-400 to-emerald-400 text-black hover:opacity-90'
                : 'bg-gradient-to-r from-red-400 to-orange-400 text-black hover:opacity-90'
            }`}
          >
            {tradeType === 'buy' ? 'Buy' : 'Sell'} {token.symbol}
          </button>

          <p className="text-center text-xs text-white/30 mt-3">
            Swaps powered by Uniswap V3 on Base
          </p>
        </div>
      </div>
    </div>
  )
}
