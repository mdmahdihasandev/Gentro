import { useNavigate } from 'react-router-dom'
import { Heart, Eye, ShoppingBag } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import Badge from './Badge'
import Rating from './Rating'

export default function ProductCard({ product }) {
  const navigate = useNavigate()
  const { toggleWishlist, openQuickView, addToCart, wishlist } = useApp()
   console.log('ProductCard product:', product)

  const isInWishlist = wishlist.some((item) => item.id === product.id)

  const badgeType = product.is_new
  ? 'NEW'
  : product.old_price && product.old_price > product.price
  ? 'SALE'
  : product.bestseller
  ? 'BEST SELLER'
  : null

  const handleCardClick = () => {
    navigate(`/product/${product.id}`)
  }

  const handleWishlistClick = (e) => {
    e.stopPropagation()
    toggleWishlist(product)
  }

  const handleQuickViewClick = (e) => {
    e.stopPropagation()
    openQuickView(product)
  }

  const handleAddToCart = (e) => {
    e.stopPropagation()
    const firstSize = product.sizes?.[0]
    const firstColor = product.colors?.[0]
    addToCart(product, firstSize, firstColor, 1)
  }

  return (
    <div
      className="group cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gentro-offwhite">
        {badgeType && <Badge type={badgeType} />}

        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center bg-gentro-white/90 backdrop-blur-sm text-gentro-black hover:bg-gentro-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gentro-black focus-visible:ring-offset-2"
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={18}
            strokeWidth={2}
            className={isInWishlist ? 'fill-red-500 text-red-500' : ''}
          />
        </button>

        {/* <img
         src={product.image}
        //  src={product.images?.[0]}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:opacity-0"
        />
        {product.images?.[1] && (
          <img
             src={product.image}
            //  src={product.images?.[1]}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-105"
          />
        )} */}

        <img
  src={product.image}
  alt={product.name}
  loading="lazy"
  className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105"
/>

        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <div className="flex items-center gap-2">
            <button
              onClick={handleQuickViewClick}
              className="flex-1 flex items-center justify-center gap-1.5 bg-gentro-white/95 backdrop-blur-sm text-gentro-black py-2.5 text-xs font-medium uppercase tracking-wider hover:bg-gentro-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gentro-black focus-visible:ring-offset-2"
            >
              <Eye size={15} strokeWidth={2} />
              Quick View
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-1.5 bg-gentro-black text-gentro-white py-2.5 text-xs font-medium uppercase tracking-wider hover:bg-gentro-charcoal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gentro-black focus-visible:ring-offset-2"
            >
              <ShoppingBag size={15} strokeWidth={2} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>


      <div className="pt-4 space-y-1.5">
        
        {/* <Rating value={product.rating} showCount count={product.reviews} size="xs" />
        <Rating value={product.rating} showCount count={product.review_count} size="xs"/> */}

        <div className="text-xs text-gentro-gray">
  ⭐ {product.rating} ({product.review_count} reviews)
</div>
        
        <h3 className="line-clamp-1 text-sm font-medium text-gentro-black group-hover:text-gentro-midgray transition-colors">
          {product.name}
          
        </h3>
        <div className="flex items-center gap-2 pt-0.5">
          <span className="text-sm font-semibold text-gentro-black">
            ৳{product.price?.toLocaleString()}
          </span>
          {/* {product.oldPrice && product.oldPrice > product.price && (
            <span className="text-xs text-gentro-gray line-through">
              ৳{product.oldPrice?.toLocaleString()}
            </span>
          )} */}

            {product.old_price && product.old_price > product.price && (
              <span className="text-xs text-gentro-gray line-through">
                ৳{product.old_price.toLocaleString()}
              </span>
            )}

        </div>
      </div>
    </div>
  )
}
