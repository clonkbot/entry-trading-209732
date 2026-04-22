import { useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useBalance } from 'wagmi'
import { formatEther } from 'viem'
import { TokenList } from './components/TokenList'
import { TokenDetail } from './components/TokenDetail'
import { Portfolio } from './components/Portfolio'
import { LandingPage } from './components/LandingPage'
import type { Token } from './types'

function App() {
  const { isConnected, address } = useAccount()
  const { data: balance } = useBalance({ address })
  const [activeTab, setActiveTab] = useState<'discover' | 'portfolio'>('discover')
  const [selectedToken, setSelectedToken] = useState<Token | null>(null)

  const formattedBalance = balance
    ? parseFloat(formatEther(balance.value)).toFixed(4)
    : '0.0000'

  if (selectedToken) {
    return (
      <TokenDetail
        token={selectedToken}
        onBack={() => setSelectedToken(null)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-lime-400 via-emerald-400 to-teal-500 flex items-center justify-center font-black text-black text-sm tracking-tighter">
                E
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-lime-400 rounded-full animate-pulse" />
            </div>
            <span className="font-black text-xl tracking-tight">ENTRY</span>
          </div>

          {isConnected ? (
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-[10px] text-white/40 uppercase tracking-wider">Balance</div>
                <div className="text-sm font-bold text-lime-400">{formattedBalance} ETH</div>
              </div>
              <ConnectButton.Custom>
                {({ account, chain, openAccountModal }) => (
                  <button
                    onClick={openAccountModal}
                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 transition-colors rounded-xl px-3 py-2 border border-white/10"
                  >
                    {chain?.hasIcon && chain.iconUrl && (
                      <img src={chain.iconUrl} alt="" className="w-5 h-5 rounded-full" />
                    )}
                    <span className="text-sm font-medium">
                      {account?.displayName}
                    </span>
                  </button>
                )}
              </ConnectButton.Custom>
            </div>
          ) : (
            <ConnectButton.Custom>
              {({ openConnectModal }) => (
                <button
                  onClick={openConnectModal}
                  className="bg-gradient-to-r from-lime-400 to-emerald-400 text-black font-bold text-sm px-4 py-2 rounded-xl hover:opacity-90 transition-opacity"
                >
                  Connect
                </button>
              )}
            </ConnectButton.Custom>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 pb-24">
        {isConnected ? (
          activeTab === 'discover' ? (
            <TokenList onSelectToken={setSelectedToken} />
          ) : (
            <Portfolio onSelectToken={setSelectedToken} />
          )
        ) : (
          <LandingPage />
        )}
      </main>

      {/* Bottom Navigation */}
      {isConnected && (
        <nav className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-white/5 pb-safe">
          <div className="max-w-lg mx-auto px-4 py-2">
            <div className="flex justify-around">
              <button
                onClick={() => setActiveTab('discover')}
                className={`flex flex-col items-center gap-1 py-2 px-6 rounded-2xl transition-all ${
                  activeTab === 'discover'
                    ? 'bg-lime-400/10 text-lime-400'
                    : 'text-white/40 hover:text-white/60'
                }`}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="text-xs font-semibold">Discover</span>
              </button>
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`flex flex-col items-center gap-1 py-2 px-6 rounded-2xl transition-all ${
                  activeTab === 'portfolio'
                    ? 'bg-lime-400/10 text-lime-400'
                    : 'text-white/40 hover:text-white/60'
                }`}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span className="text-xs font-semibold">Portfolio</span>
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* Footer */}
      <footer className="fixed bottom-20 left-0 right-0 text-center pointer-events-none">
        <p className="text-[10px] text-white/20 tracking-wide">
          Requested by @_knone_ · Built by @clonkbot
        </p>
      </footer>
    </div>
  )
}

export default App
