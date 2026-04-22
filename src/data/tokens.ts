import type { Token } from '../types'

export const mockTokens: Token[] = [
  {
    id: '1',
    name: 'Based Pepe',
    symbol: 'BPEPE',
    price: 0.00000847,
    priceChange24h: 156.7,
    priceChange1h: 12.3,
    marketCap: 2450000,
    volume24h: 890000,
    holders: 4521,
    logo: '🐸',
    contractAddress: '0x1234...abcd',
    chain: 'base',
    trending: true,
    isNew: false,
    launchDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'Degen Token',
    symbol: 'DEGEN',
    price: 0.0234,
    priceChange24h: 42.5,
    priceChange1h: 3.8,
    marketCap: 89000000,
    volume24h: 12500000,
    holders: 156000,
    logo: '🎩',
    contractAddress: '0x5678...efgh',
    chain: 'base',
    trending: true,
    isNew: false,
    launchDate: '2024-02-01',
  },
  {
    id: '3',
    name: 'Based Chad',
    symbol: 'CHAD',
    price: 0.000123,
    priceChange24h: -8.2,
    priceChange1h: -2.1,
    marketCap: 5600000,
    volume24h: 1200000,
    holders: 8900,
    logo: '💪',
    contractAddress: '0x9abc...ijkl',
    chain: 'base',
    trending: false,
    isNew: false,
    launchDate: '2024-01-20',
  },
  {
    id: '4',
    name: 'Toshi',
    symbol: 'TOSHI',
    price: 0.00089,
    priceChange24h: 23.4,
    priceChange1h: 5.6,
    marketCap: 34000000,
    volume24h: 4500000,
    holders: 67000,
    logo: '🐱',
    contractAddress: '0xdef0...mnop',
    chain: 'base',
    trending: true,
    isNew: false,
    launchDate: '2023-12-10',
  },
  {
    id: '5',
    name: 'Brett',
    symbol: 'BRETT',
    price: 0.145,
    priceChange24h: 67.8,
    priceChange1h: 8.9,
    marketCap: 245000000,
    volume24h: 45000000,
    holders: 234000,
    logo: '🔵',
    contractAddress: '0x1234...qrst',
    chain: 'base',
    trending: true,
    isNew: false,
    launchDate: '2024-01-05',
  },
  {
    id: '6',
    name: 'Moon Rocket',
    symbol: 'MOON',
    price: 0.0000034,
    priceChange24h: 892.3,
    priceChange1h: 45.6,
    marketCap: 450000,
    volume24h: 320000,
    holders: 1200,
    logo: '🚀',
    contractAddress: '0x5678...uvwx',
    chain: 'base',
    trending: true,
    isNew: true,
    launchDate: '2024-03-10',
  },
  {
    id: '7',
    name: 'Diamond Hands',
    symbol: 'DIAM',
    price: 0.00567,
    priceChange24h: -15.4,
    priceChange1h: -1.2,
    marketCap: 12000000,
    volume24h: 2300000,
    holders: 23000,
    logo: '💎',
    contractAddress: '0x9abc...yzab',
    chain: 'base',
    trending: false,
    isNew: false,
    launchDate: '2024-02-15',
  },
  {
    id: '8',
    name: 'Onchain Summer',
    symbol: 'SUMMER',
    price: 0.00234,
    priceChange24h: 34.2,
    priceChange1h: 7.8,
    marketCap: 8900000,
    volume24h: 1800000,
    holders: 15600,
    logo: '☀️',
    contractAddress: '0xdef0...cdef',
    chain: 'base',
    trending: false,
    isNew: true,
    launchDate: '2024-03-08',
  },
  {
    id: '9',
    name: 'Fren Token',
    symbol: 'FREN',
    price: 0.0000789,
    priceChange24h: 12.3,
    priceChange1h: 0.5,
    marketCap: 3400000,
    volume24h: 670000,
    holders: 6700,
    logo: '🤝',
    contractAddress: '0x1234...ghij',
    chain: 'base',
    trending: false,
    isNew: false,
    launchDate: '2024-01-28',
  },
  {
    id: '10',
    name: 'Rug Pull Survivor',
    symbol: 'SURVIVE',
    price: 0.0000012,
    priceChange24h: 1234.5,
    priceChange1h: 78.9,
    marketCap: 180000,
    volume24h: 145000,
    holders: 890,
    logo: '🛡️',
    contractAddress: '0x5678...klmn',
    chain: 'base',
    trending: true,
    isNew: true,
    launchDate: '2024-03-11',
  },
]

export function formatPrice(price: number): string {
  if (price >= 1) {
    return `$${price.toFixed(2)}`
  } else if (price >= 0.001) {
    return `$${price.toFixed(4)}`
  } else if (price >= 0.0000001) {
    const formatted = price.toFixed(10)
    const match = formatted.match(/^0\.(0*)([1-9]\d{0,3})/)
    if (match) {
      const zeros = match[1].length
      const digits = match[2]
      return `$0.0${zeros > 0 ? `{${zeros}}` : ''}${digits}`
    }
  }
  return `$${price.toExponential(2)}`
}

export function formatMarketCap(value: number): string {
  if (value >= 1000000000) {
    return `$${(value / 1000000000).toFixed(2)}B`
  } else if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}K`
  }
  return `$${value.toFixed(0)}`
}

export function formatNumber(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`
  }
  return value.toFixed(0)
}

export function generatePriceHistory(basePrice: number, points: number = 24): { time: number; price: number }[] {
  const history: { time: number; price: number }[] = []
  let currentPrice = basePrice * (0.5 + Math.random() * 0.5)
  const now = Date.now()

  for (let i = 0; i < points; i++) {
    const volatility = 0.05 + Math.random() * 0.15
    const direction = Math.random() > 0.45 ? 1 : -1
    currentPrice = currentPrice * (1 + direction * volatility * Math.random())

    history.push({
      time: now - (points - i) * 3600000,
      price: currentPrice,
    })
  }

  // Ensure last price matches current price
  history.push({
    time: now,
    price: basePrice,
  })

  return history
}
