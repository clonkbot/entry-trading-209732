import { ConnectButton } from '@rainbow-me/rainbowkit'

export function LandingPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-lime-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(132, 204, 22, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(132, 204, 22, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 text-center max-w-md">
        {/* Logo */}
        <div className="mb-8 inline-flex items-center justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-lime-400 via-emerald-400 to-teal-500 flex items-center justify-center font-black text-black text-5xl tracking-tighter animate-pulse">
              E
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-lime-400 rounded-full flex items-center justify-center">
              <span className="text-black text-xs">⚡</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4">
          <span className="bg-gradient-to-r from-lime-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
            ENTRY
          </span>
        </h1>

        <p className="text-xl text-white/60 mb-2 font-medium">
          Your entry point to Base
        </p>

        <p className="text-sm text-white/40 mb-10 leading-relaxed">
          Discover trending ETH tokens. Track your portfolio.
          Execute trades at the speed of light.
        </p>

        {/* CTA */}
        <ConnectButton.Custom>
          {({ openConnectModal }) => (
            <button
              onClick={openConnectModal}
              className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-lime-400 to-emerald-400 text-black font-bold text-lg px-8 py-4 rounded-2xl hover:opacity-90 transition-all hover:scale-105 active:scale-95 w-full max-w-xs"
            >
              <span>Connect Wallet</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          )}
        </ConnectButton.Custom>

        {/* Features */}
        <div className="mt-16 grid grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <div className="text-2xl mb-2">📈</div>
            <div className="text-xs text-white/40 uppercase tracking-wider">Real-time</div>
            <div className="text-sm font-semibold text-white/80">Price Data</div>
          </div>
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-xs text-white/40 uppercase tracking-wider">Instant</div>
            <div className="text-sm font-semibold text-white/80">Trades</div>
          </div>
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <div className="text-2xl mb-2">🔒</div>
            <div className="text-xs text-white/40 uppercase tracking-wider">Non-custodial</div>
            <div className="text-sm font-semibold text-white/80">Wallet</div>
          </div>
        </div>

        {/* Chain Badge */}
        <div className="mt-10 inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full border border-blue-500/20">
          <div className="w-4 h-4 rounded-full bg-blue-500" />
          <span className="text-sm font-medium">Built on Base</span>
        </div>
      </div>
    </div>
  )
}
