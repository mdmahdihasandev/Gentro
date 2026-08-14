import { Star, StarHalf } from 'lucide-react'

export default function Rating({ value = 0, showCount = false, count = 0, size = 'sm' }) {
  const sizeMap = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20
  }
  const iconSize = sizeMap[size] || sizeMap.sm
  const fullStars = Math.floor(value)
  const hasHalf = value - fullStars >= 0.25 && value - fullStars < 0.75
  const adjustedFull = hasHalf ? fullStars : (value - fullStars >= 0.75 ? fullStars + 1 : fullStars)
  const emptyStars = 5 - adjustedFull - (hasHalf ? 1 : 0)

  return (
    <div className="inline-flex items-center gap-1">
      <div className="inline-flex items-center">
        {Array.from({ length: adjustedFull }).map((_, i) => (
          <Star
            key={`full-${i}`}
            size={iconSize}
            className="fill-yellow-400 text-yellow-400 shrink-0"
            strokeWidth={0}
          />
        ))}
        {hasHalf && (
          <StarHalf
            key="half"
            size={iconSize}
            className="fill-yellow-400 text-yellow-400 shrink-0"
            strokeWidth={0}
          />
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            size={iconSize}
            className="text-gentro-lightgray shrink-0"
            strokeWidth={1.5}
          />
        ))}
      </div>
      {showCount && (
        <span className="text-xs text-gentro-gray ml-1 font-medium">
          ({count})
        </span>
      )}
    </div>
  )
}
