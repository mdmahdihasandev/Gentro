import { X, ChevronRight, User, Heart, Package } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import GentroLogo from '../common/GentroLogo'

export default function MobileMenu() {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useApp()

  const closeMenu = () => setIsMobileMenuOpen(false)

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'New Arrivals', path: '/new-arrivals' },
    { name: 'Collections', path: '/collections' },
    { name: 'Best Sellers', path: '/best-sellers' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/80 backdrop-blur-md transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile Drawer Slide-out */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-full max-w-xs bg-[#0a0a0c] text-white shadow-2xl flex flex-col border-r border-white/10 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#0f0f12]">
          <GentroLogo variant="wordmark" size="sm" />
          <button
            onClick={closeMenu}
            className="p-1.5 text-gray-400 hover:text-white rounded-md hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  onClick={closeMenu}
                  className="flex items-center justify-between py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-gray-300 hover:text-white hover:pl-2 border-b border-white/5 transition-all duration-300 group"
                >
                  <span>{link.name}</span>
                  <ChevronRight size={14} className="text-gray-600 group-hover:text-white transition-colors" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Account Quick Links */}
          <div className="space-y-3 pt-6 border-t border-white/10">
            <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-2">
              Account & Support
            </p>

            <Link
              to="/login"
              onClick={closeMenu}
              className="flex items-center space-x-3 py-2 text-xs text-gray-300 hover:text-white transition-colors"
            >
              <User size={15} className="text-gray-400" />
              <span>My Account</span>
            </Link>

            <Link
              to="/wishlist"
              onClick={closeMenu}
              className="flex items-center space-x-3 py-2 text-xs text-gray-300 hover:text-white transition-colors"
            >
              <Heart size={15} className="text-gray-400" />
              <span>Wishlist</span>
            </Link>

            <Link
              to="/login"
              onClick={closeMenu}
              className="flex items-center space-x-3 py-2 text-xs text-gray-300 hover:text-white transition-colors"
            >
              <Package size={15} className="text-gray-400" />
              <span>Track Order</span>
            </Link>
          </div>
        </nav>

        {/* Footer Accent */}
        <div className="p-6 border-t border-white/10 bg-[#0f0f12] text-center">
          <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase">
            GENTRO • Premium Menswear
          </p>
        </div>
      </aside>
    </>
  )
}