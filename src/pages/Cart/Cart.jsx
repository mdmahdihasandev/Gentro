import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, X, Minus, Plus, ShoppingBag, Trash2, Tag } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import Button from '../../components/ui/Button'
import { useProducts } from '../../hooks/useProducts'

const FREE_SHIPPING_THRESHOLD = 5000
const SHIPPING_DHAKA = 60
const SHIPPING_OUTSIDE = 120

export default function Cart() {
  const navigate = useNavigate()
  const { cart, removeFromCart, updateQuantity, clearCart } = useApp()
  const { products } = useProducts()
  const [couponCode, setCouponCode] = useState('')
  const [couponMessage, setCouponMessage] = useState('')
  const [discount, setDiscount] = useState(0)
  const [isDhaka, setIsDhaka] = useState(true)

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  )

  const shipping = useMemo(() => {
    if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0
    return isDhaka ? SHIPPING_DHAKA : SHIPPING_OUTSIDE
  }, [subtotal, isDhaka])

  const total = useMemo(() => {
    const beforeDiscount = subtotal + shipping
    return Math.max(0, beforeDiscount - discount)
  }, [subtotal, shipping, discount])

  const progressToFreeShipping = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  const amountForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)

  const handleApplyCoupon = (e) => {
    e.preventDefault()
    const code = couponCode.trim().toUpperCase()
    if (code === 'GENTRO10') {
      const disc = Math.round(subtotal * 0.1)
      setDiscount(disc)
      setCouponMessage(`Coupon applied! Saved ৳${disc.toLocaleString()}`)
    } else if (code === 'NEW20') {
      const disc = Math.round(subtotal * 0.2)
      setDiscount(disc)
      setCouponMessage(`Welcome coupon applied! Saved ৳${disc.toLocaleString()}`)
    } else if (code === '') {
      setCouponMessage('')
      setDiscount(0)
    } else {
      setCouponMessage('Invalid coupon code.')
      setDiscount(0)
    }
  }

  const handleCheckout = () => {
    if (cart.length === 0) return
    navigate('/checkout', {
      state: { couponDiscount: discount, shipping, isDhaka }
    })
  }

  if (cart.length === 0) {
    return (
      <div className="container-gentro py-16 sm:py-24">
        <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
          <div className="w-24 h-24 rounded-full bg-gentro-offwhite flex items-center justify-center mb-8">
            <ShoppingBag size={36} strokeWidth={1.5} className="text-gentro-gray" />
          </div>
          <h1 className="font-display font-semibold text-2xl sm:text-3xl text-gentro-black mb-3">
            Your Bag is Empty
          </h1>
          <p className="text-sm text-gentro-midgray mb-8 leading-relaxed">
            Looks like you haven't added anything yet. Explore our latest collection
            and find your style.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gentro-black text-gentro-white text-sm font-medium tracking-wide hover:bg-gentro-charcoal transition-colors"
          >
            <ChevronLeft size={16} strokeWidth={2} />
            Continue Shopping
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
        <span className="text-gentro-black">Shopping Bag</span>
      </nav>

      {amountForFreeShipping > 0 && (
        <div className="mb-8 p-4 sm:p-5 bg-gentro-offwhite">
          <div className="flex items-center justify-between text-xs sm:text-sm mb-2.5">
            <span className="text-gentro-black font-medium">
              Add ৳{amountForFreeShipping.toLocaleString()} more for FREE Shipping!
            </span>
            <span className="text-gentro-gray font-medium">
              ৳{subtotal.toLocaleString()} / ৳{FREE_SHIPPING_THRESHOLD.toLocaleString()}
            </span>
          </div>
          <div className="h-1.5 w-full bg-gentro-lightgray/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-gentro-black rounded-full transition-all duration-500"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-7 xl:col-span-8 space-y-1">
          <div className="flex items-center justify-between pb-4 mb-2 border-b border-gentro-lightgray">
            <h1 className="font-display font-semibold text-2xl sm:text-3xl text-gentro-black tracking-tight">
              Shopping Bag ({cart.length})
            </h1>
            <button
              onClick={clearCart}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-gentro-midgray hover:text-red-600 transition-colors font-medium"
            >
              <Trash2 size={14} strokeWidth={2} />
              Clear All
            </button>
          </div>

          <ul className="divide-y divide-gentro-lightgray">
            {cart.map((item) => {
              const product = products.find((p) => p.id === item.productId)
              return (
                <li key={item.id} className="py-5 sm:py-6 flex gap-4 sm:gap-6 group">
                  <Link
                    to={`/product/${item.productId}`}
                    className="w-24 sm:w-32 h-32 sm:h-40 shrink-0 bg-gentro-offwhite overflow-hidden"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/product/${item.productId}`}
                          className="block"
                        >
                          <h3 className="text-sm sm:text-base font-medium text-gentro-black line-clamp-2 group-hover:text-gentro-midgray transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="shrink-0 p-1.5 text-gentro-gray hover:text-gentro-black transition-colors rounded-full hover:bg-gentro-offwhite"
                          aria-label="Remove item"
                        >
                          <X size={18} strokeWidth={2} />
                        </button>
                      </div>

                      <p className="mt-2 text-xs text-gentro-gray">
                        {product?.category}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gentro-midgray">
                        <span>Color: <span className="text-gentro-black font-medium">{item.color}</span></span>
                        <span>Size: <span className="text-gentro-black font-medium">{item.size}</span></span>
                      </div>
                    </div>

                    <div className="sm:min-w-[140px] sm:pl-6 sm:border-l sm:border-gentro-lightgray sm:text-right space-y-3">
                      <div className="flex items-center justify-between sm:justify-end gap-3">
                        <div className="inline-flex items-center border border-gentro-lightgray">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-9 h-9 flex items-center justify-center text-gentro-midgray hover:text-gentro-black transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} strokeWidth={2} />
                          </button>
                          <span className="w-9 h-9 flex items-center justify-center text-sm text-gentro-black font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-9 h-9 flex items-center justify-center text-gentro-midgray hover:text-gentro-black transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} strokeWidth={2} />
                          </button>
                        </div>
                      </div>
                      <div>
                        {product?.oldPrice && product.oldPrice > item.price && (
                          <p className="text-xs text-gentro-gray line-through sm:text-right">
                            ৳{(product.oldPrice * item.quantity).toLocaleString()}
                          </p>
                        )}
                        <p className="text-base sm:text-lg font-semibold text-gentro-black sm:text-right">
                          ৳{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="mt-8 pt-6 border-t border-gentro-lightgray">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-medium text-gentro-black border-b border-gentro-black pb-0.5 hover:border-transparent hover:opacity-70 transition-all"
            >
              <ChevronLeft size={14} strokeWidth={2} />
              Continue Shopping
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 xl:col-span-4">
          <div className="lg:sticky lg:top-24 space-y-6">
            <div className="bg-gentro-offwhite p-5 sm:p-6">
              <h3 className="font-display font-semibold text-lg text-gentro-black mb-4">
                Order Summary
              </h3>

              <div className="space-y-3.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gentro-midgray">Subtotal</span>
                  <span className="text-gentro-black font-medium">
                    ৳{subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gentro-midgray">Shipping</span>
                  <span className="text-gentro-black font-medium">
                    {shipping === 0 ? 'FREE' : `৳${shipping}`}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex items-center justify-between text-green-700">
                    <span>Discount</span>
                    <span className="font-medium">- ৳{discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="pt-3.5 mt-3.5 border-t border-gentro-lightgray flex items-center justify-between">
                  <span className="text-gentro-black font-semibold text-base">Total</span>
                  <span className="text-gentro-black font-semibold text-xl">
                    ৳{total.toLocaleString()}
                  </span>
                </div>

                <p className="text-xs text-gentro-gray pt-1">
                  (VAT included. Taxes calculated at checkout if applicable)
                </p>
              </div>

              <form onSubmit={handleApplyCoupon} className="mt-6 pt-5 border-t border-gentro-lightgray">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gentro-black mb-3">
                  Gift Card or Discount Code
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag
                      size={16}
                      strokeWidth={2}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gentro-gray"
                    />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter code"
                      className="w-full pl-9 pr-3 py-3 border border-gentro-lightgray bg-gentro-white text-sm text-gentro-black placeholder:text-gentro-gray focus:border-gentro-black focus:outline-none transition-colors uppercase"
                    />
                  </div>
                  <Button type="submit" variant="secondary" size="md">
                    Apply
                  </Button>
                </div>
                {couponMessage && (
                  <p className={`mt-2.5 text-xs ${couponMessage.includes('applied') ? 'text-green-700' : 'text-red-600'}`}>
                    {couponMessage}
                  </p>
                )}
                <p className="mt-3 text-xs text-gentro-gray">
                  Try: <span className="font-medium text-gentro-black">GENTRO10</span> or{' '}
                  <span className="font-medium text-gentro-black">NEW20</span>
                </p>
              </form>

              <div className="mt-6 pt-5 border-t border-gentro-lightgray space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group text-sm">
                  <input
                    type="radio"
                    name="city"
                    checked={isDhaka}
                    onChange={() => setIsDhaka(true)}
                    className="w-4 h-4 text-gentro-black focus:ring-gentro-black border-gentro-lightgray"
                  />
                  <span className="text-gentro-black group-hover:text-gentro-midgray transition-colors">
                    Dhaka Metro (৳{SHIPPING_DHAKA})
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group text-sm">
                  <input
                    type="radio"
                    name="city"
                    checked={!isDhaka}
                    onChange={() => setIsDhaka(false)}
                    className="w-4 h-4 text-gentro-black focus:ring-gentro-black border-gentro-lightgray"
                  />
                  <span className="text-gentro-black group-hover:text-gentro-midgray transition-colors">
                    Outside Dhaka (৳{SHIPPING_OUTSIDE})
                  </span>
                </label>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              className="w-full"
              size="lg"
              leftIcon={ShoppingBag}
            >
              Proceed to Checkout
            </Button>

            <div className="flex items-center justify-center gap-4 flex-wrap pt-2">
              <div className="flex items-center gap-1.5 text-xs text-gentro-gray">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z" stroke="currentColor" strokeWidth="1.8"/></svg>
                Secure Checkout
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gentro-gray">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                7-Day Returns
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
