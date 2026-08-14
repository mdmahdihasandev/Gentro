import { lazy, Suspense } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { ChevronLeft, Construction } from 'lucide-react'

const Home = lazy(() => import('../pages/Home'))
const Shop = lazy(() => import('../pages/Shop'))
const ProductDetails = lazy(() => import('../pages/ProductDetails'))
const Cart = lazy(() => import('../pages/Cart'))
const Checkout = lazy(() => import('../pages/Checkout'))
const Wishlist = lazy(() => import('../pages/Wishlist'))
const Login = lazy(() => import('../pages/Login'))
const Register = lazy(() => import('../pages/Register'))

const PageLoader = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '100%'
  }}>
    <p style={{ fontSize: '1.125rem', letterSpacing: '0.1em', fontWeight: 500 }}>
      Loading GENTRO...
    </p>
  </div>
)

function NotFound() {
  const location = useLocation()
  const page = location.pathname
  const titleMap = {
    '/about': 'About GENTRO',
    '/contact': 'Contact Us',
    '/shipping': 'Shipping Policy',
    '/returns': 'Returns & Exchange',
    '/privacy': 'Privacy Policy',
    '/terms': 'Terms & Conditions',
    '/help': 'Help Center',
    '/track-order': 'Track Your Order',
    '/size-guide': 'Size Guide',
    '/faqs': 'Frequently Asked Questions',
    '/collections': 'Our Collections'
  }
  const title = titleMap[page] || 'Page Not Found'
  const isInfoPage = titleMap[page] !== undefined

  return (
    <div className="container-gentro py-16 sm:py-24">
      <div className="flex flex-col items-center justify-center text-center max-w-xl mx-auto animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-gentro-offwhite flex items-center justify-center mb-8">
          <Construction size={36} strokeWidth={1.5} className="text-gentro-gray" />
        </div>
        <p className="text-xs uppercase tracking-gentro-wider text-gentro-gray font-medium mb-3">
          {isInfoPage ? 'Coming Soon' : '404'}
        </p>
        <h1 className="font-display font-semibold text-3xl sm:text-4xl text-gentro-black mb-4 tracking-tight">
          {title}
        </h1>
        <p className="text-sm sm:text-base text-gentro-midgray mb-8 leading-relaxed">
          {isInfoPage
            ? 'This page is currently being prepared. We\'re working hard to bring you the best shopping experience. Please check back soon or explore our collection in the meantime.'
            : `The page "${page}" doesn't exist or has been moved. Please check the URL or explore our collection.`}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gentro-black text-gentro-white text-sm font-medium tracking-wide hover:bg-gentro-charcoal transition-colors"
          >
            Browse Shop
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3 border border-gentro-black text-gentro-black text-sm font-medium tracking-wide hover:bg-gentro-black hover:text-gentro-white transition-colors"
          >
            <ChevronLeft size={16} strokeWidth={2} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<NotFound />} />
        <Route path="/contact" element={<NotFound />} />
        <Route path="/shipping" element={<NotFound />} />
        <Route path="/returns" element={<NotFound />} />
        <Route path="/privacy" element={<NotFound />} />
        <Route path="/terms" element={<NotFound />} />
        <Route path="/help" element={<NotFound />} />
        <Route path="/track-order" element={<NotFound />} />
        <Route path="/size-guide" element={<NotFound />} />
        <Route path="/faqs" element={<NotFound />} />
        <Route path="/collections" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
