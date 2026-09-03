import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, Search, User, Heart, ShoppingBag } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import logo from '../../assets/images/main-logo.png'

export default function Navbar() {
  const {
    cart,
    wishlist,
    setIsMobileMenuOpen,
    setIsCartDrawerOpen,
    setIsSearchOpen
  } = useApp()

  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  // স্ক্রোল ইফেক্ট
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const wishlistCount = wishlist.length

  // একজ্যাক্ট URL চেক করার হেলপার ফাংশন (যাতে ১টি ক্লিক করলে অন্যটি Active না হয়)
  const isActivePath = (path) => {
    const currentFullPath = location.pathname + location.search
    if (path === '/') return currentFullPath === '/'
    return currentFullPath === path
  }

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'New Arrivals', path: '/shop?filter=new' },
    { name: 'Collections', path: '/shop?cat=collections' },
    { name: 'Best Sellers', path: '/shop?filter=bestsellers' },
    { name: 'About', path: '/about' }
  ]

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-neutral-200/60 shadow-xs py-2.5'
          : 'bg-white py-3.5 border-b border-neutral-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          
          {/* Left: Mobile Menu & Logo */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-1.5 -ml-1 text-neutral-800 hover:text-black transition-colors"
              aria-label="Open menu"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <img 
                className="h-[60px] sm:h-[70px] sm:w-[70px] rounded-[70px] w-[60px] object-contain transition-transform duration-300 hover:opacity-90" 
                src={logo} 
                alt="Gentro Logo" 
              />
            </Link>
          </div>

          {/* Center: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            {navItems.map((item) => {
              const active = isActivePath(item.path)
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-[11px] uppercase tracking-[0.18em] transition-all duration-300 relative py-1 ${
                    active
                      ? 'text-neutral-950 font-semibold'
                      : 'text-neutral-500 hover:text-neutral-950 font-medium'
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-neutral-950 transition-all duration-300 ${
                      active ? 'w-full' : 'w-0 hover:w-full'
                    }`}
                  />
                </Link>
              )
            })}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-0.5 sm:gap-1">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-neutral-700 hover:text-black transition-colors"
              aria-label="Search"
            >
              <Search size={19} strokeWidth={1.5} />
            </button>

            <Link
              to="/login"
              className="hidden sm:block p-2 text-neutral-700 hover:text-black transition-colors"
              aria-label="Account"
            >
              <User size={19} strokeWidth={1.5} />
            </Link>

            <Link
              to="/wishlist"
              className="relative p-2 text-neutral-700 hover:text-black transition-colors"
              aria-label="Wishlist"
            >
              <Heart size={19} strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-black text-white text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative p-2 text-neutral-700 hover:text-black transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag size={19} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-black text-white text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  )
}