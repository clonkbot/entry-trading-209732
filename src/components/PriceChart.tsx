interface PriceChartProps {
  data: { time: number; price: number }[]
  positive: boolean
}

export function PriceChart({ data, positive }: PriceChartProps) {
  if (data.length < 2) return null

  const width = 100
  const height = 100
  const paddingX = 0
  const paddingY = 5

  const prices = data.map(d => d.price)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const priceRange = maxPrice - minPrice || 1

  const points = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1)) * (width - paddingX * 2)
    const y = paddingY + ((maxPrice - d.price) / priceRange) * (height - paddingY * 2)
    return { x, y }
  })

  const pathD = points.map((p, i) =>
    i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`
  ).join(' ')

  const areaD = `${pathD} L ${width - paddingX} ${height} L ${paddingX} ${height} Z`

  const strokeColor = positive ? '#a3e635' : '#f87171'
  const gradientId = `chart-gradient-${positive ? 'green' : 'red'}`

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="w-full h-full"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0.25" />
          <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={areaD}
        fill={`url(#${gradientId})`}
      />
      <path
        d={pathD}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
