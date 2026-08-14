import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, ChevronRight } from 'lucide-react'
import AnnouncementBar from '../components/common/AnnouncementBar'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import CartDrawer from '../components/cart/CartDrawer'
import MobileMenu from '../components/common/MobileMenu'
import SearchOverlay from '../components/common/SearchOverlay'
import Modal from '../components/ui/Modal'
import Rating from '../components/ui/Rating'
import Button from '../components/ui/Button'
import { useApp } from '../context/AppContext'

function QuickViewContent({ product, onClose }) {
  const { addToCart } = useApp()

  if (!product) return null

  const handleAddToCart = () => {
    const firstSize = product.sizes?.[0]
    const firstColor = product.colors?.[0]
    addToCart(product, firstSize, firstColor, 1)
    onClose()
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="aspect-[3/4] bg-gentro-offwhite overflow-hidden">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-center">
        <div className="mb-3">
          <p className="text-xs uppercase tracking-gentro-wide text-gentro-gray font-medium">
            {product.category}
          </p>
        </div>
        <h2 className="font-display font-semibold text-2xl text-gentro-black mb-3">
          {product.name}
        </h2>
        <div className="mb-4">
          <Rating value={product.rating} showCount count={product.reviews} />
        </div>
        <div className="flex items-center gap-3 mb-5">
          <span className="text-2xl font-bold text-gentro-black">
            ৳{product.price?.toLocaleString()}
          </span>
          {product.oldPrice && product.oldPrice > product.price && (
            <>
              <span className="text-sm text-gentro-gray line-through">
                ৳{product.oldPrice?.toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5">
                -{product.discount}%
              </span>
            </>
          )}
        </div>
        <p className="text-sm text-gentro-midgray leading-relaxed mb-6 line-clamp-3">
          {product.description}
        </p>
        {product.colors && product.colors.length > 0 && (
          <div className="mb-5">
            <p className="text-xs uppercase tracking-wider text-gentro-gray font-medium mb-2">
              Color: <span className="text-gentro-black">{product.colors[0]}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <span
                  key={color}
                  className="px-3 py-1.5 text-xs border border-gentro-lightgray text-gentro-midgray first:border-gentro-black first:text-gentro-black"
                >
                  {color}
                </span>
              ))}
            </div>
          </div>
        )}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-6">
            <p className="text-xs uppercase tracking-wider text-gentro-gray font-medium mb-2">
              Size
            </p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <span
                  key={size}
                  className="w-10 h-10 flex items-center justify-center text-sm border border-gentro-lightgray text-gentro-midgray first:border-gentro-black first:text-gentro-black first:font-semibold"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="space-y-3">
          <Button
            variant="primary"
            size="md"
            leftIcon={ShoppingBag}
            onClick={handleAddToCart}
            className="w-full"
          >
            Add to Cart
          </Button>
          <Button
            as={Link}
            to={`/product/${product.id}`}
            variant="secondary"
            size="md"
            rightIcon={ChevronRight}
            className="w-full"
            onClick={onClose}
          >
            View Full Details
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function MainLayout({ children }) {
  const {
    isMobileMenuOpen,
    isCartDrawerOpen,
    isQuickViewOpen,
    closeQuickView,
    quickViewProduct,
    isSearchOpen
  } = useApp()

  const anyDrawerOpen = isMobileMenuOpen || isCartDrawerOpen || isSearchOpen

  useEffect(() => {
    if (anyDrawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [anyDrawerOpen])

  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />

      <MobileMenu />
      <CartDrawer />
      <SearchOverlay />

      <Modal
        isOpen={isQuickViewOpen}
        onClose={closeQuickView}
        title="Quick View"
      >
        <QuickViewContent
          product={quickViewProduct}
          onClose={closeQuickView}
        />
      </Modal>
    </div>
  )
}
