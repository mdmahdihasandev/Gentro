const variantClasses = {
  primary: 'bg-gentro-black text-gentro-white hover:bg-gentro-charcoal hover:tracking-widest disabled:opacity-50 disabled:cursor-not-allowed',
  secondary: 'border border-gentro-black bg-transparent text-gentro-black hover:bg-gentro-black hover:text-gentro-white hover:tracking-widest',
  ghost: 'bg-transparent text-gentro-midgray hover:text-gentro-black',
  outline: 'border border-gentro-lightgray bg-transparent text-gentro-black hover:border-gentro-black hover:bg-gentro-offwhite'
}

const sizeClasses = {
  sm: 'px-4 py-2 text-xs gap-1.5',
  md: 'px-8 py-3 text-sm gap-2',
  lg: 'px-10 py-4 text-base gap-2.5'
}

const iconSizeMap = {
  sm: 14,
  md: 16,
  lg: 18
}

export default function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className = '',
  children,
  href,
  ...props
}) {
  const base = 'inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gentro-black focus-visible:ring-offset-2'
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
  const iconSize = iconSizeMap[size]

  if (Component === 'a' && href) {
    return (
      <a href={href} className={classes} {...props}>
        {LeftIcon && <LeftIcon size={iconSize} strokeWidth={2} />}
        <span>{children}</span>
        {RightIcon && <RightIcon size={iconSize} strokeWidth={2} />}
      </a>
    )
  }

  return (
    <Component className={classes} {...props}>
      {LeftIcon && <LeftIcon size={iconSize} strokeWidth={2} />}
      <span>{children}</span>
      {RightIcon && <RightIcon size={iconSize} strokeWidth={2} />}
    </Component>
  )
}
