const sizeMap = {
  sm: { wordmark: 'text-sm', mark: 20, gap: 2 },
  md: { wordmark: 'text-base', mark: 28, gap: 3 },
  lg: { wordmark: 'text-lg', mark: 36, gap: 3 },
  xl: { wordmark: 'text-2xl', mark: 48, gap: 4 }
}

function LogoMark({ size, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10 8 L10 40 Q10 44 14 44 L34 44 Q42 44 46 38 L54 30 Q56 28 56 24 L56 8 L44 8 L44 22 L38 28 L34 16 Q32 12 28 12 L22 12 L22 32 L18 32 L18 8 Z"
        fill="#0A0A0A"
      />
      <path
        d="M44 14 L54 14 L54 20 L50 24 L44 18 Z"
        fill="#0A0A0A"
      />
    </svg>
  )
}

export default function GentroLogo({ variant = 'wordmark', size = 'md', className = '' }) {
  const config = sizeMap[size] || sizeMap.md

  if (variant === 'wordmark') {
    return (
      <span
        className={`gentro-wordmark ${config.wordmark} ${className}`}
      >
        GENTRO
      </span>
    )
  }

  return (
    <div className={`inline-flex items-center gap-${config.gap} ${className}`}>
      <LogoMark size={config.mark} />
      <span className={`gentro-wordmark ${config.wordmark}`}>
        GENTRO
      </span>
    </div>
  )
}
