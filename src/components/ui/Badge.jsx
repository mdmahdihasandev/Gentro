const badgeStyles = {
  NEW: 'bg-black text-gentro-white',
  SALE: 'bg-gentro-accent text-gentro-white',
  'BEST SELLER': 'bg-gentro-darkgray text-gentro-white',
  LIMITED: 'bg-red-700 text-gentro-white'
}

const labelMap = {
  NEW: 'NEW',
  SALE: 'SALE',
  'BEST SELLER': 'BEST SELLER',
  LIMITED: 'LIMITED'
}

export default function Badge({ type, className = '', positioned = true }) {
  const style = badgeStyles[type] || badgeStyles.NEW
  const label = labelMap[type] || type

  const positionClasses = positioned
    ? 'absolute top-3 left-3'
    : ''

  return (
    <span
      className={`${positionClasses} ${style} inline-flex items-center px-2.5 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider z-10 ${className}`}
    >
      {label}
    </span>
  )
}
