interface MiniChartProps {
  positive: boolean
  data: number[]
}

export function MiniChart({ positive, data }: MiniChartProps) {
  const width = 64
  const height = 40
  const padding = 2

  const minY = Math.min(...data)
  const maxY = Math.max(...data)
  const range = maxY - minY || 1

  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * (width - padding * 2)
    const y = padding + ((maxY - value) / range) * (height - padding * 2)
    return `${x},${y}`
  }).join(' ')

  const strokeColor = positive ? '#a3e635' : '#f87171'
  const gradientId = positive ? 'gradient-green' : 'gradient-red'

  // Create area path
  const areaPath = `M ${padding},${height - padding} L ${points.split(' ').map((p, i) => {
    if (i === 0) return p
    return `L ${p}`
  }).join(' ')} L ${width - padding},${height - padding} Z`

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0.3" />
          <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={areaPath}
        fill={`url(#${gradientId})`}
      />
      <polyline
        points={points}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
