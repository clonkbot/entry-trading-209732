export interface Token {
  id: string
  name: string
  symbol: string
  price: number
  priceChange24h: number
  priceChange1h: number
  marketCap: number
  volume24h: number
  holders: number
  logo: string
  contractAddress: string
  chain: 'base' | 'eth'
  trending: boolean
  isNew: boolean
  launchDate: string
}

export interface PricePoint {
  time: number
  price: number
}
