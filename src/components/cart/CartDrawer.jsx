import { Link, useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export default function CartDrawer() {
  const navigate = useNavigate()
  const { isCartDrawerOpen, setIsCartDrawerOpen, cart, removeFromCart, updateQuantity } = useApp()

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = () => {
    setIsCartDrawerOpen(false)
    navigate('/checkout')
  }

  const handleCartPage = () => {
    setIsCartDrawerOpen(false)
    navigate('/cart')
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/60 transition-opacity duration-300 ${
          isCartDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsCartDrawerOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-gentro-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isCartDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isCartDrawerOpen}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gentro-lightgray">
          <button
            onClick={handleCartPage}
            className="font-display font-semibold text-gentro-black uppercase tracking-gentro-wide text-sm hover:opacity-70 transition-opacity text-left"
          >
            Shopping Bag ({cart.length})
          </button>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-1.5 text-gentro-midgray hover:text-gentro-black transition-colors"
            aria-label="Close cart"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-gentro-midgray text-sm mb-6">Your bag is empty</p>
              <Link
                to="/shop"
                onClick={() => setIsCartDrawerOpen(false)}
                className="px-8 py-3 bg-gentro-black text-gentro-white text-sm font-medium tracking-wide hover:bg-gentro-charcoal transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <ul className="space-y-5">
              {cart.map((item) => (
                <li key={item.id} className="flex gap-4">
                  <Link
                    to={`/product/${item.productId}`}
                    onClick={() => setIsCartDrawerOpen(false)}
                    className="w-24 h-32 bg-gentro-offwhite shrink-0 overflow-hidden"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        to={`/product/${item.productId}`}
                        onClick={() => setIsCartDrawerOpen(false)}
                        className="text-sm font-medium text-gentro-black line-clamp-1 hover:text-gentro-midgray transition-colors"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gentro-gray hover:text-gentro-black transition-colors shrink-0"
                        aria-label="Remove item"
                      >
                        <X size={16} strokeWidth={2} />
                      </button>
                    </div>
                    <p className="text-xs text-gentro-gray mt-1">
                      {item.color} &middot; {item.size}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="inline-flex items-center border border-gentro-lightgray">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-gentro-midgray hover:text-gentro-black transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center text-sm text-gentro-black">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-gentro-midgray hover:text-gentro-black transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-sm font-semibold text-gentro-black">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-gentro-lightgray p-6 space-y-4">
            <button
              onClick={handleCartPage}
              className="w-full flex items-center justify-between text-sm hover:text-gentro-midgray transition-colors"
            >
              <span className="text-gentro-midgray">View Bag</span>
              <span className="text-gentro-black font-semibold text-lg">
                ৳{subtotal.toLocaleString()}
              </span>
            </button>
            <p className="text-xs text-gentro-gray">
              Shipping and taxes calculated at checkout
            </p>
            <button
              onClick={handleCheckout}
              className="w-full py-3.5 bg-gentro-black text-gentro-white text-sm font-medium uppercase tracking-wider hover:bg-gentro-charcoal transition-colors"
            >
              Checkout
            </button>
            <button
              onClick={() => {
                setIsCartDrawerOpen(false)
                navigate('/shop')
              }}
              className="w-full py-3 border border-gentro-black text-gentro-black text-sm font-medium uppercase tracking-wider hover:bg-gentro-black hover:text-gentro-white transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
