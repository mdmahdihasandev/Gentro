import { useState, useMemo, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  Check,
  X,
  ZoomIn
} from 'lucide-react'
import { useProducts } from '../../hooks/useProducts'
import { useApp } from '../../context/AppContext'
import ProductCard from '../../components/ui/ProductCard'
import Rating from '../../components/ui/Rating'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'

const COLOR_HEX_MAP = {
  Black: '#000000',
  White: '#FFFFFF',
  Gray: '#808080',
  Navy: '#001F3F',
  Beige: '#F5F5DC',
  Olive: '#808000',
  Charcoal: '#36454F',
  Maroon: '#800000',
  'Forest Green': '#228B22',
  'Navy White': '#001F3F',
  'Grey Black': '#2F2F2F',
  'Blue Green': '#0D98BA',
  'Off White': '#FAF9F6',
  Stone: '#E0D9C9',
  'Multi Pack': '#6366F1',
  'Light Blue': '#ADD8E6',
  Pink: '#FFC0CB',
  'Sage Green': '#9CAF88',
  'Sky Blue': '#87CEEB',
  'Red Check': '#B22222',
  'Green Check': '#2E8B57',
  'Blue Check': '#4169E1',
  Rust: '#B7410E',
  'Navy Print': '#001F3F',
  'Black Print': '#1A1A1A',
  Khaki: '#C3B091',
  'Medium Blue': '#0047AB',
  'Dark Wash': '#1A1A2E',
  'Mid Blue': '#1E3A8A',
  'Army Green': '#4B5320',
  Tan: '#D2B48C',
  'Royal Blue': '#4169E1',
  'Dusty Blue': '#7393B3',
  'Heather Grey': '#9CA3AF',
  'Navy Orange': '#001F3F',
  'Black Grey': '#2F2F2F',
  'Green Cream': '#F0E68C',
  'Dark Brown': '#5C4033',
  Burgundy: '#800020',
  Cognac: '#9A463D',
  'Gold White': '#FFD700',
  'Rose Gold': '#B76E79',
  Camel: '#C19A6B',
  'Gold Green': '#D4AF37',
  'Silver Black': '#A8A9AD',
  'Gunmetal Blue': '#2C3539'
}

const SIZE_GUIDE_DATA = [
  { size: 'S', chest: '36-38', shoulder: '17-17.5', length: '27-27.5' },
  { size: 'M', chest: '39-41', shoulder: '18-18.5', length: '28-28.5' },
  { size: 'L', chest: '42-44', shoulder: '19-19.5', length: '29-29.5' },
  { size: 'XL', chest: '45-47', shoulder: '20-20.5', length: '30-30.5' },
  { size: 'XXL', chest: '48-50', shoulder: '21-21.5', length: '31-31.5' }
]

const SAMPLE_REVIEWS = [
  {
    id: 1,
    name: 'Rahim Ahmed',
    date: 'March 15, 2025',
    rating: 5,
    text: 'Absolutely love this product! The quality is outstanding and it fits perfectly. The fabric feels premium and the stitching is immaculate. Will definitely be buying more from Gentro.'
  },
  {
    id: 2,
    name: 'Fatima Khatun',
    date: 'February 28, 2025',
    rating: 4,
    text: 'Great value for money. The color is exactly as shown in the pictures. Only reason for 4 stars is the delivery took a bit longer than expected, but overall very satisfied.'
  },
  {
    id: 3,
    name: 'Tanvir Hasan',
    date: 'February 10, 2025',
    rating: 5,
    text: 'This is my third purchase from Gentro and they never disappoint. The attention to detail is remarkable. Highly recommend to anyone looking for quality clothing in Bangladesh.'
  }
]

const TABS = [
  { id: 'description', label: 'Description' },
  { id: 'details', label: 'Details' },
  { id: 'size-fit', label: 'Size & Fit' },
  { id: 'shipping', label: 'Shipping & Returns' },
  { id: 'reviews', label: 'Reviews' }
]

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, setIsCartDrawerOpen, toggleWishlist, wishlist } = useApp()
  const { products, loading } = useProducts()

  const product = useMemo(
    () => products.find((p) => String(p.id) === String(id)),
    [id, products]
  )

  const [mainImageIndex, setMainImageIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false)

  // Image Zoom State & Ref
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const imageContainerRef = useRef(null)

  // ---- NEW: Lightbox state & ref ----
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxZoomPos, setLightboxZoomPos] = useState({ x: 50, y: 50 })
  const [isLightboxHovered, setIsLightboxHovered] = useState(false)
  const lightboxImageRef = useRef(null)

  // ---- NEW: Thumbnail slider ref ----
  const thumbScrollRef = useRef(null)

  // Update default state when product changes
  useEffect(() => {
    if (product) {
      setMainImageIndex(0)
      setSelectedColor(product.colors?.[0] || '')
      setSelectedSize(product.sizes?.[0] || '')
      setQuantity(1)
    }
  }, [product])

  // ---- NEW: Close lightbox with Escape key ----
  useEffect(() => {
    if (!isLightboxOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsLightboxOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isLightboxOpen])

  const isInWishlist = wishlist.some((item) => item.id === product?.id)

  const relatedProducts = useMemo(() => {
    if (!product) return []
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 6)
  }, [product, products])

  // Handle Mouse Hover Zoom Logic (main image)
  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setZoomPosition({ x, y })
  }

  // ---- NEW: Handle Mouse Hover Zoom Logic (lightbox image) ----
  const handleLightboxMouseMove = (e) => {
    if (!lightboxImageRef.current) return
    const { left, top, width, height } = lightboxImageRef.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setLightboxZoomPos({ x, y })
  }

  // ---- NEW: Scroll thumbnail slider left/right ----
  const scrollThumbs = (direction) => {
    if (!thumbScrollRef.current) return
    const scrollAmount = 110 // roughly one thumbnail width + gap
    thumbScrollRef.current.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    })
  }

  if (loading) {
    return <div className="container-gentro py-20 text-center text-gentro-midgray">Loading product...</div>
  }

  if (!product) {
    return (
      <div className="container-gentro py-20 text-center">
        <h1 className="font-display font-semibold text-3xl text-gentro-black mb-4">
          Product Not Found
        </h1>
        <p className="text-gentro-midgray mb-8">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-8 py-3 bg-gentro-black text-gentro-white text-sm font-medium tracking-wide hover:bg-gentro-charcoal transition-colors"
        >
          <ChevronLeft size={16} strokeWidth={2} />
          Back to Shop
        </Link>
      </div>
    )
  }

  const images = product.images || []
  const currentImage = images[mainImageIndex] || images[0]

  const prevImage = (e) => {
    e.stopPropagation()
    setMainImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const nextImage = (e) => {
    e.stopPropagation()
    setMainImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  // ---- NEW: prev/next inside lightbox ----
  const lightboxPrevImage = (e) => {
    e.stopPropagation()
    setMainImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const lightboxNextImage = (e) => {
    e.stopPropagation()
    setMainImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const inStock = product.stock > 0

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity)
    setIsCartDrawerOpen(true)
  }

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity)
    navigate('/checkout')
  }

  const handleQtyMinus = () => {
    setQuantity((q) => Math.max(1, q - 1))
  }

  const handleQtyPlus = () => {
    setQuantity((q) => Math.min(product.stock || 10, q + 1))
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="space-y-4 text-sm text-gentro-midgray leading-relaxed">
            <p>{product.description}</p>
            <p>
              Designed with the modern individual in mind, this piece combines
              timeless aesthetics with contemporary comfort. Every detail is
              thoughtfully considered — from the precision of the stitching to
              the quality of the materials — ensuring a product that not only
              looks exceptional but stands the test of time. Whether you're
              dressing up for an evening out or keeping it casual, this item
              effortlessly transitions between occasions, making it a versatile
              addition to any wardrobe.
            </p>
          </div>
        )
      case 'details':
        return (
          <ul className="space-y-3 text-sm text-gentro-midgray">
            <li className="flex gap-3">
              <span className="text-gentro-black font-medium shrink-0 w-24">
                Material:
              </span>
              <span>
                Premium 100% combed cotton (blended with 5% elastane where
                applicable for stretch)
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-gentro-black font-medium shrink-0 w-24">
                Origin:
              </span>
              <span>
                Proudly manufactured in Bangladesh with locally sourced,
                ethically produced materials
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-gentro-black font-medium shrink-0 w-24">
                Care:
              </span>
              <span>
                Machine wash cold with like colors. Do not bleach. Tumble dry
                low. Warm iron inside out. Do not dry clean.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-gentro-black font-medium shrink-0 w-24">
                Fit:
              </span>
              <span>
                True to size. Model is 6'0"/183cm and wears a size M. For a
                relaxed fit, we recommend sizing up.
              </span>
            </li>
          </ul>
        )
      case 'size-fit':
        return (
          <div className="space-y-4 text-sm text-gentro-midgray">
            <p>
              Our model wears a size <strong className="text-gentro-black">M</strong> and is
              6'0"/183cm tall with a 38"/96cm chest, 32"/81cm waist, and 34"/86cm hips.
            </p>
            <p>
              This garment is designed with a regular, true-to-size fit. If you
              prefer a more relaxed or oversized silhouette, we recommend sizing
              up by one size. Please refer to our size guide for precise
              measurements.
            </p>
            <button
              onClick={() => setIsSizeGuideOpen(true)}
              className="text-xs uppercase tracking-wider text-gentro-black font-medium border-b border-gentro-black pb-0.5 hover:border-transparent transition-all"
            >
              View Size Guide
            </button>
          </div>
        )
      case 'shipping':
        return (
          <div className="space-y-6 text-sm text-gentro-midgray">
            <div>
              <h4 className="font-display font-semibold text-gentro-black mb-2">
                Shipping
              </h4>
              <p>
                All orders are processed within 1-2 business days. Standard
                delivery within Bangladesh takes <strong className="text-gentro-black">2-5 business days</strong>
                depending on your location.
              </p>
              <p className="mt-2">
                <strong className="text-gentro-black">Dhaka Metro:</strong> ৳60 flat rate<br />
                <strong className="text-gentro-black">Outside Dhaka:</strong> ৳120 flat rate<br />
                <strong className="text-gentro-black">Free Delivery:</strong> On orders over ৳5000
              </p>
            </div>
            <div>
              <h4 className="font-display font-semibold text-gentro-black mb-2">
                Returns
              </h4>
              <p>
                We offer a <strong className="text-gentro-black">7-day easy return policy</strong> on all
                unused, unworn items with tags attached. Simply contact our
                customer support team to initiate a return. Refunds are processed
                within 5-7 business days of receiving the returned item.
              </p>
              <p className="mt-2">
                Please note: Custom or personalized items are non-returnable.
                Sale items are eligible for exchange only.
              </p>
            </div>
          </div>
        )
      case 'reviews':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Rating value={product.rating} size="md" />
                <span className="text-sm text-gentro-midgray">
                  Based on {product.reviews} reviews
                </span>
              </div>
              <Button variant="secondary" size="sm">
                Write a Review
              </Button>
            </div>
            <div className="space-y-6 border-t border-gentro-lightgray pt-6">
              {SAMPLE_REVIEWS.map((review) => (
                <div key={review.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gentro-black text-sm">
                        {review.name}
                      </p>
                      <p className="text-xs text-gentro-gray">
                        {review.date}
                      </p>
                    </div>
                    <Rating value={review.rating} size="sm" />
                  </div>
                  <p className="text-sm text-gentro-midgray leading-relaxed pt-1">
                    {review.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const getColorHex = (colorName) =>
    COLOR_HEX_MAP[colorName] || `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`

  return (
    <div className="container-gentro py-8 sm:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-4">
          {/* Main Large Image Container with Hover Zoom + Click to open Lightbox */}
          <div
            ref={imageContainerRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            onClick={() => setIsLightboxOpen(true)} // NEW: click to open lightbox
            className="relative aspect-[3/4] overflow-hidden bg-gentro-offwhite group cursor-zoom-in"
          >
            {product.oldPrice && product.oldPrice > product.price && product.discount && (
              <div className="absolute top-3 left-3 z-10">
                <Badge type="SALE" />
              </div>
            )}

            <img
              src={currentImage}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-200 ${
                isHovered ? 'opacity-0' : 'opacity-100'
              }`}
            />

            {/* Dynamic Zoomed View */}
            {isHovered && (
              <div
                className="absolute inset-0 bg-no-repeat pointer-events-none transition-all duration-75"
                style={{
                  backgroundImage: `url(${currentImage})`,
                  backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  backgroundSize: '250%'
                }}
              />
            )}

            {/* NEW: Zoom hint icon */}
            <div className="absolute bottom-3 right-3 z-10 w-9 h-9 rounded-full bg-gentro-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn size={16} strokeWidth={2} className="text-gentro-black" />
            </div>

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-gentro-white/90 backdrop-blur-sm text-gentro-black opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gentro-white focus:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gentro-black"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} strokeWidth={2} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-gentro-white/90 backdrop-blur-sm text-gentro-black opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gentro-white focus:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gentro-black"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} strokeWidth={2} />
                </button>
              </>
            )}
          </div>

          {/* NEW: Thumbnail Slider (with left/right arrows) */}
          {images.length > 1 && (
            <div className="relative">
              {images.length > 4 && (
                <button
                  onClick={() => scrollThumbs('prev')}
                  className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-gentro-white shadow-md flex items-center justify-center text-gentro-black hover:bg-gentro-offwhite transition-colors"
                  aria-label="Scroll thumbnails left"
                >
                  <ChevronLeft size={14} strokeWidth={2} />
                </button>
              )}

              <div
                ref={thumbScrollRef}
                className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-hide scroll-smooth"
              >
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMainImageIndex(idx)}
                    className={`shrink-0 snap-start w-20 h-24 sm:w-24 sm:h-28 overflow-hidden transition-all focus-visible:outline-none ${
                      mainImageIndex === idx
                        ? 'ring-2 ring-gentro-black ring-offset-2'
                        : 'ring-1 ring-transparent hover:ring-gentro-lightgray opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      aria-hidden="true"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {images.length > 4 && (
                <button
                  onClick={() => scrollThumbs('next')}
                  className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-gentro-white shadow-md flex items-center justify-center text-gentro-black hover:bg-gentro-offwhite transition-colors"
                  aria-label="Scroll thumbnails right"
                >
                  <ChevronRight size={14} strokeWidth={2} />
                </button>
              )}
            </div>
          )}
        </div>

        <div>
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-gentro-wide text-gentro-gray font-medium">
              {product.category}
            </p>
            <h1 className="text-3xl font-display font-semibold text-gentro-black leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-3">
              <Rating value={product.rating} showCount count={product.reviews} />
            </div>
            <div className="flex items-center gap-3 pt-1">
              <span className="text-2xl font-semibold text-gentro-black">
                ৳{product.price.toLocaleString()}
              </span>
              {product.oldPrice && product.oldPrice > product.price && (
                <span className="text-base text-gentro-gray line-through">
                  ৳{product.oldPrice.toLocaleString()}
                </span>
              )}
              {product.discount && product.oldPrice && product.oldPrice > product.price && (
                <span className="inline-flex items-center text-xs font-semibold bg-gentro-accent/10 text-gentro-accent px-2.5 py-1">
                  -{product.discount}%
                </span>
              )}
              <span
                className={`ml-auto text-xs font-medium uppercase tracking-wider px-2.5 py-1 ${
                  inStock
                    ? 'bg-green-50 text-green-700'
                    : 'bg-red-50 text-red-700'
                }`}
              >
                {inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            <p className="text-sm text-gentro-midgray leading-relaxed pt-2">
              {product.description}
            </p>
          </div>

          <div className="space-y-6 mt-8 pt-6 border-t border-gentro-lightgray">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-gentro-black">
                  Color
                </span>
                <span className="text-xs text-gentro-midgray">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.colors?.map((color) => {
                  const hex = getColorHex(color)
                  const isSelected = selectedColor === color
                  return (
                    <button
                      key={color}
                      title={color}
                      onClick={() => setSelectedColor(color)}
                      className={`group relative w-9 h-9 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gentro-black focus-visible:ring-offset-2 ${
                        isSelected ? 'ring-2 ring-gentro-black ring-offset-2' : ''
                      }`}
                      aria-label={`Select color ${color}`}
                    >
                      <span
                        className="absolute inset-0 rounded-full"
                        style={{
                          backgroundColor: hex,
                          border:
                            color === 'White' ||
                            hex.toLowerCase() === '#ffffff' ||
                            hex.toLowerCase() === '#faf9f6'
                              ? '1px solid #e5e5e5'
                              : 'none'
                        }}
                      />
                      {isSelected && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <Check
                            size={16}
                            strokeWidth={3}
                            className={
                              hex.toLowerCase() === '#000000' ||
                              hex.toLowerCase() === '#1a1a1a' ||
                              hex.toLowerCase() === '#1a1a2e'
                                ? 'text-white'
                                : 'text-gentro-black'
                            }
                          />
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-gentro-black">
                  Size
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs text-gentro-midgray hover:text-gentro-black border-b border-gentro-midgray hover:border-gentro-black pb-0.5 transition-all uppercase tracking-wider"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes?.map((size) => {
                  const isSelected = selectedSize === size
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[3rem] h-10 px-4 text-sm font-medium rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gentro-black focus-visible:ring-offset-2 ${
                        isSelected
                          ? 'bg-gentro-black text-gentro-white'
                          : 'border border-gentro-lightgray text-gentro-black hover:border-gentro-black'
                      }`}
                    >
                      {size}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="inline-flex items-center border border-gentro-lightgray">
                <button
                  onClick={handleQtyMinus}
                  className="w-11 h-11 flex items-center justify-center text-gentro-midgray hover:text-gentro-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gentro-black focus-visible:ring-inset"
                  aria-label="Decrease quantity"
                >
                  <Minus size={18} strokeWidth={2} />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Math.max(1, Math.min(product.stock || 10, Number(e.target.value) || 1))
                    )
                  }
                  className="w-12 h-11 text-center text-sm font-medium text-gentro-black border-x border-gentro-lightgray focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  onClick={handleQtyPlus}
                  className="w-11 h-11 flex items-center justify-center text-gentro-midgray hover:text-gentro-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gentro-black focus-visible:ring-inset"
                  aria-label="Increase quantity"
                >
                  <Plus size={18} strokeWidth={2} />
                </button>
              </div>

              <button
                onClick={() => toggleWishlist(product)}
                className={`w-11 h-11 shrink-0 flex items-center justify-center border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gentro-black focus-visible:ring-offset-2 ${
                  isInWishlist
                    ? 'border-gentro-black bg-gentro-black text-gentro-white'
                    : 'border-gentro-lightgray text-gentro-black hover:border-gentro-black'
                }`}
                aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart
                  size={18}
                  strokeWidth={2}
                  className={isInWishlist ? 'fill-current' : ''}
                />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                onClick={handleAddToCart}
                className="flex-1"
                size="lg"
                disabled={!inStock}
              >
                Add to Cart
              </Button>
              <Button
                onClick={handleBuyNow}
                variant="secondary"
                className="flex-1"
                size="lg"
                disabled={!inStock}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 sm:mt-20 border-t border-gentro-lightgray pt-8 sm:pt-10">
        <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-2 border-b border-gentro-lightgray scrollbar-hide mb-8">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 px-4 sm:px-6 py-3 text-xs sm:text-sm font-medium uppercase tracking-wider whitespace-nowrap transition-all border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'text-gentro-black border-gentro-black'
                  : 'text-gentro-midgray border-transparent hover:text-gentro-black hover:border-gentro-lightgray'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div>{renderTabContent()}</div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16 sm:mt-20">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display font-semibold text-2xl sm:text-3xl text-gentro-black tracking-tight">
              You May Also Like
            </h2>
            <Link
              to="/shop"
              className="hidden sm:inline-flex text-xs uppercase tracking-gentro-wide font-medium text-gentro-midgray hover:text-gentro-black border-b border-gentro-midgray hover:border-gentro-black pb-0.5 transition-all"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      <Modal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        title="Size Guide"
      >
        <div className="space-y-4">
          <p className="text-sm text-gentro-midgray">
            All measurements are in inches. For the best fit, compare with a
            similar garment you own.
          </p>
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gentro-lightgray">
                  <th className="py-3 text-left text-xs font-semibold uppercase tracking-wider text-gentro-black">
                    Size
                  </th>
                  <th className="py-3 text-center text-xs font-semibold uppercase tracking-wider text-gentro-black">
                    Chest (in)
                  </th>
                  <th className="py-3 text-center text-xs font-semibold uppercase tracking-wider text-gentro-black">
                    Shoulder (in)
                  </th>
                  <th className="py-3 text-center text-xs font-semibold uppercase tracking-wider text-gentro-black">
                    Length (in)
                  </th>
                </tr>
              </thead>
              <tbody>
                {SIZE_GUIDE_DATA.map((row) => (
                  <tr key={row.size} className="border-b border-gentro-lightgray/50">
                    <td className="py-3 font-medium text-gentro-black">
                      {row.size}
                    </td>
                    <td className="py-3 text-center text-gentro-midgray">
                      {row.chest}
                    </td>
                    <td className="py-3 text-center text-gentro-midgray">
                      {row.shoulder}
                    </td>
                    <td className="py-3 text-center text-gentro-midgray">
                      {row.length}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button
            onClick={() => setIsSizeGuideOpen(false)}
            className="w-full"
            size="md"
          >
            Got it
          </Button>
        </div>
      </Modal>

      {/* ---- NEW: Fullscreen Lightbox ---- */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-gentro-white/10 text-gentro-white hover:bg-gentro-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gentro-white"
            aria-label="Close"
          >
            <X size={22} strokeWidth={2} />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={lightboxPrevImage}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-gentro-white/10 text-gentro-white hover:bg-gentro-white/20 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} strokeWidth={2} />
              </button>
              <button
                onClick={lightboxNextImage}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-gentro-white/10 text-gentro-white hover:bg-gentro-white/20 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight size={24} strokeWidth={2} />
              </button>
            </>
          )}

          <div
            ref={lightboxImageRef}
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={() => setIsLightboxHovered(true)}
            onMouseLeave={() => setIsLightboxHovered(false)}
            onMouseMove={handleLightboxMouseMove}
            className="relative w-full h-full max-w-3xl max-h-[85vh] overflow-hidden cursor-zoom-in"
          >
            <img
              src={currentImage}
              alt={product.name}
              className={`w-full h-full object-contain transition-opacity duration-150 ${
                isLightboxHovered ? 'opacity-0' : 'opacity-100'
              }`}
            />
            {isLightboxHovered && (
              <div
                className="absolute inset-0 bg-no-repeat bg-contain pointer-events-none"
                style={{
                  backgroundImage: `url(${currentImage})`,
                  backgroundPosition: `${lightboxZoomPos.x}% ${lightboxZoomPos.y}%`,
                  backgroundSize: '200%'
                }}
              />
            )}
          </div>

          {/* Thumbnail strip inside lightbox */}
          {images.length > 1 && (
            <div
              className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto scrollbar-hide px-2"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImageIndex(idx)}
                  className={`shrink-0 w-12 h-14 sm:w-14 sm:h-16 overflow-hidden transition-all ${
                    mainImageIndex === idx
                      ? 'ring-2 ring-gentro-white'
                      : 'ring-1 ring-gentro-white/30 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}