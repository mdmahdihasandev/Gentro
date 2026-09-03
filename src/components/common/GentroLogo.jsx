const sizeMap = {
  sm: { wordmark: 'text-sm tracking-[0.25em]', mark: 18, gap: 'gap-2' },
  md: { wordmark: 'text-lg sm:text-xl tracking-[0.3em]', mark: 24, gap: 'gap-2.5' },
  lg: { wordmark: 'text-2xl tracking-[0.35em]', mark: 32, gap: 'gap-3' },
  xl: { wordmark: 'text-4xl tracking-[0.4em]', mark: 42, gap: 'gap-4' }
}

// Minimalist High-End Geometric 'G' Crest LogoMark
function LogoMark({ size, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="36" height="36" rx="6" stroke="currentColor" strokeWidth="2" opacity="0.2" />
      <path
        d="M24 14H15C13.3431 14 12 15.3431 12 17V23C12 24.6569 13.3431 26 15 26H25V20H19"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function GentroLogo({ variant = 'wordmark', size = 'md', className = '' }) {
  const config = sizeMap[size] || sizeMap.md

  if (variant === 'wordmark') {
    return (
      <span
        className={`font-serif font-bold uppercase text-white hover:opacity-90 transition-opacity select-none ${config.wordmark} ${className}`}
      >
        GENTRO
      </span>
    )
  }

  return (
    <div className={`inline-flex items-center text-white select-none ${config.gap} ${className}`}>
      <LogoMark size={config.mark} className="text-white shrink-0" />
      <span className={`font-serif font-bold uppercase ${config.wordmark}`}>
        GENTRO
      </span>
    </div>
  )
}