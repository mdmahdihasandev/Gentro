import { Link, useNavigate } from 'react-router-dom'
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react'
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
      {/* Dark Overlay Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/80 backdrop-blur-md transition-opacity duration-300 ${
          isCartDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsCartDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* Cart Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-[#0a0a0c] text-white shadow-2xl flex flex-col border-l border-white/10 transition-transform duration-300 ease-in-out ${
          isCartDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isCartDrawerOpen}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#0f0f12]">
          <button
            onClick={handleCartPage}
            className="flex items-center gap-2.5 font-sans font-semibold text-white uppercase tracking-[0.2em] text-xs hover:text-gray-300 transition-colors"
          >
            <ShoppingBag size={16} className="text-white/80" />
            <span>Your Bag ({cart.length})</span>
          </button>
          
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-1.5 text-gray-400 hover:text-white rounded-md hover:bg-white/10 transition-colors"
            aria-label="Close cart"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Product Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-5 text-gray-400">
                <ShoppingBag size={26} strokeWidth={1.5} />
              </div>
              <p className="text-gray-400 text-sm font-light tracking-wide mb-6">Your shopping bag is empty</p>
              <Link
                to="/shop"
                onClick={() => setIsCartDrawerOpen(false)}
                className="px-8 py-3.5 bg-white text-black text-xs font-semibold tracking-[0.15em] uppercase rounded-sm hover:bg-gray-200 transition-all"
              >
                Explore Collection
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li 
                  key={item.id} 
                  className="flex gap-4 p-3.5 rounded-lg bg-[#121215] border border-white/5 hover:border-white/10 transition-all"
                >
                  {/* Image */}
                  <Link
                    to={`/product/${item.productId}`}
                    onClick={() => setIsCartDrawerOpen(false)}
                    className="w-20 h-24 bg-[#1a1a1e] rounded overflow-hidden shrink-0 border border-white/10"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  
                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/product/${item.productId}`}
                          onClick={() => setIsCartDrawerOpen(false)}
                          className="text-xs font-medium text-white line-clamp-1 hover:text-gray-300 transition-colors"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-500 hover:text-red-400 transition-colors p-1 -mr-1"
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} strokeWidth={2} />
                        </button>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider">
                        {item.color} &middot; {item.size}
                      </p>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="inline-flex items-center rounded border border-white/15 bg-[#0a0a0c]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-6 flex items-center justify-center text-gray-400 hover:text-white transition-colors text-xs"
                        >
                          -
                        </button>
                        <span className="w-7 h-6 flex items-center justify-center text-[11px] font-semibold text-white border-x border-white/10">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-6 flex items-center justify-center text-gray-400 hover:text-white transition-colors text-xs"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-xs font-bold text-white tracking-wide">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Bottom Total & Action Buttons */}
        {cart.length > 0 && (
          <div className="border-t border-white/10 bg-[#0f0f12] p-6 space-y-4">
            <button
              onClick={handleCartPage}
              className="w-full flex items-center justify-between transition-colors group"
            >
              <span className="text-xs uppercase tracking-wider text-gray-400 group-hover:text-white transition-colors">Subtotal</span>
              <span className="text-white font-bold text-lg">
                ৳{subtotal.toLocaleString()}
              </span>
            </button>
            
            <p className="text-[10px] text-gray-400 font-light">
              Taxes & shipping fee calculated at checkout.
            </p>
            
            <div className="space-y-2 pt-1">
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 bg-white text-black text-xs font-bold uppercase tracking-[0.15em] rounded-sm hover:bg-gray-200 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={14} />
              </button>
              
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false)
                  navigate('/shop')
                }}
                className="w-full py-3 border border-white/20 text-white text-xs font-semibold uppercase tracking-[0.15em] rounded-sm hover:bg-white/5 transition-all"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}