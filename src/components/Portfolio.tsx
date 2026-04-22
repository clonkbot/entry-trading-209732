import { useAccount, useBalance } from 'wagmi'
import { formatEther } from 'viem'
import { mockTokens, formatPrice, formatMarketCap } from '../data/tokens'
import type { Token } from '../types'

interface PortfolioProps {
  onSelectToken: (token: Token) => void
}

// Simulated user holdings
const userHoldings = [
  { tokenId: '2', amount: 15000 },
  { tokenId: '5', amount: 500 },
  { tokenId: '4', amount: 25000 },
]

export function Portfolio({ onSelectToken }: PortfolioProps) {
  const { address } = useAccount()
  const { data: balance } = useBalance({ address })

  const ethBalance = balance ? parseFloat(formatEther(balance.value)) : 0
  const ethPrice = 3245.67 // Mock ETH price

  const holdings = userHoldings.map(h => {
    const token = mockTokens.find(t => t.id === h.tokenId)
    if (!token) return null
    const value = h.amount * token.price
    return { ...h, token, value }
  }).filter(Boolean) as { tokenId: string; amount: number; token: Token; value: number }[]

  const totalTokenValue = holdings.reduce((sum, h) => sum + h.value, 0)
  const totalEthValue = ethBalance * ethPrice
  const totalValue = totalTokenValue + totalEthValue

  return (
    <div className="max-w-lg mx-auto px-4 py-4">
      {/* Portfolio Value */}
      <div className="bg-gradient-to-br from-lime-400/10 via-emerald-400/10 to-teal-400/10 rounded-3xl p-6 mb-6 border border-lime-400/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(132,204,22,0.1),transparent_50%)]" />
        <div className="relative z-10">
          <div className="text-sm text-white/50 mb-1">Total Balance</div>
          <div className="text-4xl font-black tracking-tight mb-2">
            ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lime-400 text-sm font-semibold">+$1,234.56</span>
            <span className="text-lime-400/60 text-sm">(+12.4% today)</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1.5l-9 5.25v10.5l9 5.25 9-5.25V6.75l-9-5.25zm0 2.25l6.75 3.9375L12 11.625 5.25 7.6875 12 3.75zm-7.5 5.0625l6.75 3.9375v7.875l-6.75-3.9375v-7.875zm15 0v7.875l-6.75 3.9375v-7.875l6.75-3.9375z"/>
              </svg>
            </div>
            <span className="text-xs text-white/40 uppercase tracking-wider">ETH</span>
          </div>
          <div className="text-lg font-bold">{ethBalance.toFixed(4)} ETH</div>
          <div className="text-sm text-white/40">${(ethBalance * ethPrice).toFixed(2)}</div>
        </div>
        <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-lime-500/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="text-xs text-white/40 uppercase tracking-wider">Tokens</span>
          </div>
          <div className="text-lg font-bold">{holdings.length} Assets</div>
          <div className="text-sm text-white/40">${formatMarketCap(totalTokenValue)}</div>
        </div>
      </div>

      {/* Holdings */}
      <div className="mb-4">
        <h3 className="text-sm text-white/40 uppercase tracking-wider mb-3 px-1">Your Holdings</h3>
        <div className="space-y-3">
          {holdings.map(({ token, amount, value }) => (
            <button
              key={token.id}
              onClick={() => onSelectToken(token)}
              className="w-full bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-white/10 rounded-2xl p-4 transition-all active:scale-[0.98] text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-2xl border border-white/10">
                  {token.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white truncate">{token.name}</div>
                  <div className="text-sm text-white/40">
                    {amount.toLocaleString()} {token.symbol}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-white">${value.toFixed(2)}</div>
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
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-sm text-white/40 uppercase tracking-wider mb-3 px-1">Recent Activity</h3>
        <div className="space-y-2">
          {[
            { type: 'buy', token: 'BRETT', amount: 500, price: 72.50, time: '2h ago' },
            { type: 'sell', token: 'DEGEN', amount: 5000, price: 117.00, time: '5h ago' },
            { type: 'buy', token: 'TOSHI', amount: 25000, price: 22.25, time: '1d ago' },
          ].map((activity, i) => (
            <div key={i} className="flex items-center gap-3 py-3 px-4 bg-white/[0.02] rounded-xl border border-white/5">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                activity.type === 'buy' ? 'bg-lime-500/20' : 'bg-red-500/20'
              }`}>
                <svg className={`w-4 h-4 ${activity.type === 'buy' ? 'text-lime-400' : 'text-red-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {activity.type === 'buy' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  )}
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-medium">
                  {activity.type === 'buy' ? 'Bought' : 'Sold'} {activity.amount.toLocaleString()} {activity.token}
                </div>
                <div className="text-sm text-white/40">{activity.time}</div>
              </div>
              <div className="text-right">
                <div className={`font-semibold ${activity.type === 'buy' ? 'text-red-400' : 'text-lime-400'}`}>
                  {activity.type === 'buy' ? '-' : '+'}${activity.price.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
