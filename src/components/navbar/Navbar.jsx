import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, Search, User, Heart, ShoppingBag } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import logo from '../../assets/images/logo.webp'

export default function Navbar() {
  const {
    cart,
    wishlist,
    setIsMobileMenuOpen,
    setIsCartDrawerOpen,
    setIsSearchOpen
  } = useApp()

  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const wishlistCount = wishlist.length

  const navLinkClass = ({ isActive }) =>
    `text-sm transition-all duration-200 relative group py-1 ${
      isActive
        ? 'text-gentro-black font-semibold'
        : 'text-gentro-midgray hover:text-gentro-black font-medium'
    }`

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 my-[10px] ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-gentro-lightgray shadow-sm'
          : 'bg-transparent shadow-none'
      }`}
    >
      <div className="container-gentro px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* বাম দিক: মোবাইল মেনু বাটন এবং লোগোর জায়গা */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-gentro-black hover:text-gentro-gray transition-colors duration-200"
              aria-label="Open menu"
            >
              <Menu size={22} strokeWidth={2} />
            </button>

            {/* লোগোর জায়গা (এখানে আপনার Logo কম্পোনেন্ট বা img ট্যাগ বসাবেন) */}
            <Link to="/" className="flex items-center">
              
                <img className='rounded-[50px] w-[80px] h-[80px]' src={logo} alt="Logo" />
             
            </Link>
          </div>

          {/* মাঝখান: সেন্টার্ড নেভিগেশন লিঙ্কসমূহ */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10 mx-auto">
            <NavLink to="/" end className={navLinkClass}>
              Home
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gentro-black group-hover:w-full transition-all duration-200" />
            </NavLink>
            <NavLink to="/shop" className={navLinkClass}>
              Shop
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gentro-black group-hover:w-full transition-all duration-200" />
            </NavLink>
            <NavLink to="/shop?filter=new" className={navLinkClass}>
              New Arrivals
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gentro-black group-hover:w-full transition-all duration-200" />
            </NavLink>
            <NavLink to="/shop?cat=collections" className={navLinkClass}>
              Collections
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gentro-black group-hover:w-full transition-all duration-200" />
            </NavLink>
            <NavLink to="/shop?filter=bestsellers" className={navLinkClass}>
              Best Sellers
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gentro-black group-hover:w-full transition-all duration-200" />
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gentro-black group-hover:w-full transition-all duration-200" />
            </NavLink>
          </nav>

          {/* ডান দিক: সার্চ, একাউন্ট, উইশলিস্ট ও কার্ট আইকন */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gentro-midgray hover:text-gentro-black transition-colors duration-200"
              aria-label="Search"
            >
              <Search size={20} strokeWidth={2} />
            </button>
            <Link
              to="/login"
              className="hidden sm:block p-2 text-gentro-midgray hover:text-gentro-black transition-colors duration-200"
              aria-label="Account"
            >
              <User size={20} strokeWidth={2} />
            </Link>
            <Link
              to="/wishlist"
              className="relative p-2 text-gentro-midgray hover:text-gentro-black transition-colors duration-200"
              aria-label="Wishlist"
            >
              <Heart size={20} strokeWidth={2} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 -translate-y-1/2 translate-x-1/2 bg-gentro-black text-white text-[10px] px-1.5 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-medium leading-none">
                  {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative p-2 text-gentro-midgray hover:text-gentro-black transition-colors duration-200"
              aria-label="Cart"
            >
              <ShoppingBag size={20} strokeWidth={2} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 -translate-y-1/2 translate-x-1/2 bg-gentro-black text-white text-[10px] px-1.5 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-medium leading-none">
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