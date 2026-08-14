import { Link } from 'react-router-dom'
import { Heart, ChevronLeft, ShoppingBag, X } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import Button from '../../components/ui/Button'
import ProductCard from '../../components/ui/ProductCard'

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useApp()

  const handleAddAllToCart = () => {
    wishlist.forEach((product) => {
      const size = product.sizes?.[0]
      const color = product.colors?.[0]
      addToCart(product, size, color, 1)
    })
  }

  if (wishlist.length === 0) {
    return (
      <div className="container-gentro py-16 sm:py-24">
        <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
          <div className="w-24 h-24 rounded-full bg-gentro-offwhite flex items-center justify-center mb-8">
            <Heart size={36} strokeWidth={1.5} className="text-gentro-gray" />
          </div>
          <h1 className="font-display font-semibold text-2xl sm:text-3xl text-gentro-black mb-3">
            Your Wishlist is Empty
          </h1>
          <p className="text-sm text-gentro-midgray mb-8 leading-relaxed">
            Save items you love for later. Explore our collection and tap the heart
            icon to add products here.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gentro-black text-gentro-white text-sm font-medium tracking-wide hover:bg-gentro-charcoal transition-colors"
          >
            <ChevronLeft size={16} strokeWidth={2} />
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container-gentro py-8 sm:py-12">
      <nav className="flex items-center gap-2 text-sm text-gentro-midgray mb-6">
        <Link to="/" className="hover:text-gentro-black transition-colors">Home</Link>
        <ChevronLeft size={14} className="rotate-180" />
        <span className="text-gentro-black">Wishlist ({wishlist.length})</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display font-semibold text-3xl sm:text-4xl text-gentro-black tracking-tight mb-2">
            Saved Items
          </h1>
          <p className="text-sm text-gentro-midgray">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        {wishlist.length > 0 && (
          <Button
            variant="secondary"
            size="md"
            leftIcon={ShoppingBag}
            onClick={handleAddAllToCart}
          >
            Add All to Bag
          </Button>
        )}
      </div>

      <div className="hidden sm:block">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div className="sm:hidden space-y-4 divide-y divide-gentro-lightgray">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="flex gap-4 py-4 first:pt-0"
          >
            <Link
              to={`/product/${product.id}`}
              className="w-28 h-36 shrink-0 bg-gentro-offwhite overflow-hidden"
            >
              <img
                src={product.images?.[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </Link>
            <div className="flex-1 min-w-0 flex flex-col">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-wide text-gentro-gray font-medium">
                    {product.category}
                  </p>
                  <Link
                    to={`/product/${product.id}`}
                    className="block mt-1 text-sm font-medium text-gentro-black line-clamp-2"
                  >
                    {product.name}
                  </Link>
                </div>
                <button
                  onClick={() => toggleWishlist(product)}
                  className="shrink-0 p-1.5 text-gentro-gray hover:text-gentro-black transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <X size={18} strokeWidth={2} />
                </button>
              </div>

              <div className="mt-2 flex items-center gap-2">
                <span className="text-base font-semibold text-gentro-black">
                  ৳{product.price.toLocaleString()}
                </span>
                {product.oldPrice && product.oldPrice > product.price && (
                  <span className="text-xs text-gentro-gray line-through">
                    ৳{product.oldPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <div className="mt-auto pt-3">
                <Button
                  size="sm"
                  className="w-full"
                  leftIcon={ShoppingBag}
                  onClick={() => {
                    const size = product.sizes?.[0]
                    const color = product.colors?.[0]
                    addToCart(product, size, color, 1)
                  }}
                >
                  Add to Bag
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-gentro-lightgray">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-medium text-gentro-black border-b border-gentro-black pb-0.5 hover:border-transparent hover:opacity-70 transition-all"
        >
          <ChevronLeft size={14} strokeWidth={2} />
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}
