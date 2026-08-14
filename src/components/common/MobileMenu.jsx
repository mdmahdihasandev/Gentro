import { X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import GentroLogo from '../common/GentroLogo'

export default function MobileMenu() {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useApp()

  const closeMenu = () => setIsMobileMenuOpen(false)

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/60 transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-full max-w-xs bg-gentro-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gentro-lightgray">
          <GentroLogo variant="wordmark" size="sm" />
          <button
            onClick={closeMenu}
            className="p-1.5 text-gentro-midgray hover:text-gentro-black transition-colors"
            aria-label="Close menu"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-6">
          <ul className="space-y-1">
            <li>
              <Link
                to="/"
                onClick={closeMenu}
                className="block py-3 text-sm font-medium text-gentro-black uppercase tracking-wide border-b border-gentro-offwhite hover:text-gentro-gray transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={closeMenu}
                className="block py-3 text-sm font-medium text-gentro-black uppercase tracking-wide border-b border-gentro-offwhite hover:text-gentro-gray transition-colors"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={closeMenu}
                className="block py-3 text-sm font-medium text-gentro-black uppercase tracking-wide border-b border-gentro-offwhite hover:text-gentro-gray transition-colors"
              >
                New Arrivals
              </Link>
            </li>
            <li>
              <Link
                to="/collections"
                onClick={closeMenu}
                className="block py-3 text-sm font-medium text-gentro-black uppercase tracking-wide border-b border-gentro-offwhite hover:text-gentro-gray transition-colors"
              >
                Collections
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={closeMenu}
                className="block py-3 text-sm font-medium text-gentro-black uppercase tracking-wide border-b border-gentro-offwhite hover:text-gentro-gray transition-colors"
              >
                Best Sellers
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={closeMenu}
                className="block py-3 text-sm font-medium text-gentro-black uppercase tracking-wide border-b border-gentro-offwhite hover:text-gentro-gray transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={closeMenu}
                className="block py-3 text-sm font-medium text-gentro-black uppercase tracking-wide hover:text-gentro-gray transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>

          <div className="mt-10 space-y-3 pt-6 border-t border-gentro-lightgray">
            <Link
              to="/login"
              onClick={closeMenu}
              className="block text-sm text-gentro-midgray hover:text-gentro-black transition-colors"
            >
              My Account
            </Link>
            <Link
              to="/wishlist"
              onClick={closeMenu}
              className="block text-sm text-gentro-midgray hover:text-gentro-black transition-colors"
            >
              Wishlist
            </Link>
            <Link
              to="/login"
              onClick={closeMenu}
              className="block text-sm text-gentro-midgray hover:text-gentro-black transition-colors"
            >
              Track Order
            </Link>
          </div>
        </nav>
      </aside>
    </>
  )
}
