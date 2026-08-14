import { useState, useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  ChevronLeft,
  MapPin,
  User,
  Phone,
  Mail,
  Home,
  Building2,
  CreditCard,
  Smartphone,
  Banknote,
  Check,
  ChevronRight,
  ShieldCheck
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import Button from '../../components/ui/Button'

const BD_DISTRICTS = [
  'Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal',
  'Rangpur', 'Mymensingh', 'Comilla', 'Narayanganj', 'Gazipur', 'Cox\'s Bazar',
  'Jessore', 'Dinajpur', 'Tangail', 'Kushtia', 'Bogra', 'Faridpur'
]

export default function Checkout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { cart, clearCart } = useApp()

  const prefilledShipping = location.state?.shipping
  const prefilledDiscount = location.state?.couponDiscount || 0
  const prefilledDhaka = location.state?.isDhaka ?? true

  const SHIPPING_DHAKA = 60
  const SHIPPING_OUTSIDE = 120

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  )

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: prefilledDhaka ? 'Dhaka' : BD_DISTRICTS[1],
    area: '',
    postalCode: '',
    company: '',
    orderNote: ''
  })

  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [orderNumber] = useState(() => `GNT-${Date.now().toString().slice(-8)}`)

  const isDhaka = form.city === 'Dhaka'
  const shipping = useMemo(() => {
    if (prefilledShipping !== undefined) return prefilledShipping
    const threshold = 5000
    if (subtotal >= threshold) return 0
    return isDhaka ? SHIPPING_DHAKA : SHIPPING_OUTSIDE
  }, [prefilledShipping, subtotal, isDhaka])

  const discount = prefilledDiscount
  const total = useMemo(() => {
    return Math.max(0, subtotal + shipping - discount)
  }, [subtotal, shipping, discount])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const isFormValid = () => {
    return (
      form.fullName.trim().length >= 2 &&
      /^\d{10,15}$/.test(form.phone.replace(/\D/g, '')) &&
      form.address.trim().length >= 5 &&
      form.city !== ''
    )
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    if (!isFormValid() || cart.length === 0) return

    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 1800))
    setIsProcessing(false)
    setShowSuccess(true)
    clearCart()
  }

  const handleBackToShop = () => {
    setShowSuccess(false)
    navigate('/shop')
  }

  if (cart.length === 0 && !showSuccess) {
    return (
      <div className="container-gentro py-16 sm:py-24">
        <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
          <div className="w-24 h-24 rounded-full bg-gentro-offwhite flex items-center justify-center mb-8">
            <CreditCard size={36} strokeWidth={1.5} className="text-gentro-gray" />
          </div>
          <h1 className="font-display font-semibold text-2xl sm:text-3xl text-gentro-black mb-3">
            Nothing to Checkout
          </h1>
          <p className="text-sm text-gentro-midgray mb-8 leading-relaxed">
            Your shopping bag is empty. Add some items before proceeding to checkout.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gentro-black text-gentro-white text-sm font-medium tracking-wide hover:bg-gentro-charcoal transition-colors"
          >
            <ChevronLeft size={16} strokeWidth={2} />
            Browse Shop
          </Link>
        </div>
      </div>
    )
  }

  if (showSuccess) {
    return (
      <div className="container-gentro py-16 sm:py-24">
        <div className="flex flex-col items-center justify-center text-center max-w-lg mx-auto">
          <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mb-8 animate-scale-in">
            <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center">
              <Check size={32} strokeWidth={3} className="text-white" />
            </div>
          </div>
          <p className="text-xs uppercase tracking-gentro-wider text-gentro-gray font-medium mb-3 animate-fade-in">
            Order Confirmed
          </p>
          <h1 className="font-display font-semibold text-3xl sm:text-4xl text-gentro-black mb-3">
            Thank You!
          </h1>
          <p className="text-sm sm:text-base text-gentro-midgray mb-6 leading-relaxed">
            Your order has been placed successfully. We've sent a confirmation to your
            email. Our team will contact you shortly to schedule delivery.
          </p>

          <div className="w-full bg-gentro-offwhite p-5 sm:p-6 mb-8 text-left space-y-3 animate-slide-up">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gentro-midgray">Order Number</span>
              <span className="text-gentro-black font-semibold">{orderNumber}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gentro-midgray">Payment Method</span>
              <span className="text-gentro-black font-medium capitalize">
                {paymentMethod === 'cod' ? 'Cash on Delivery' :
                 paymentMethod === 'card' ? 'Card Payment' : 'Mobile Payment'}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gentro-midgray">Total Amount</span>
              <span className="text-gentro-black font-semibold text-lg">
                ৳{total.toLocaleString()}
              </span>
            </div>
            {form.fullName && (
              <div className="pt-3 mt-3 border-t border-gentro-lightgray space-y-1">
                <div className="text-sm">
                  <span className="text-gentro-midgray mr-2">Ship to:</span>
                  <span className="text-gentro-black font-medium">{form.fullName}</span>
                </div>
                <div className="text-sm text-gentro-midgray pl-14">
                  {form.address}, {form.area && `${form.area}, `}{form.city}
                  {form.postalCode && ` - ${form.postalCode}`}
                </div>
                <div className="text-sm text-gentro-midgray pl-14">{form.phone}</div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button onClick={handleBackToShop} size="lg" leftIcon={ChevronRight}>
              Continue Shopping
            </Button>
            <Button variant="secondary" size="lg" as="a" href="/">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container-gentro py-8 sm:py-12">
      <nav className="flex items-center gap-2 text-sm text-gentro-midgray mb-6">
        <Link to="/" className="hover:text-gentro-black transition-colors">Home</Link>
        <ChevronLeft size={14} className="rotate-180" />
        <Link to="/cart" className="hover:text-gentro-black transition-colors">Bag</Link>
        <ChevronLeft size={14} className="rotate-180" />
        <span className="text-gentro-black">Checkout</span>
      </nav>

      <h1 className="font-display font-semibold text-3xl sm:text-4xl text-gentro-black tracking-tight mb-8">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-7 xl:col-span-8 space-y-8">
          <form onSubmit={handlePlaceOrder} className="space-y-8">
            <section className="space-y-5">
              <h2 className="flex items-center gap-2.5 font-display font-semibold text-xl text-gentro-black">
                <User size={20} strokeWidth={2} className="text-gentro-midgray" />
                Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gentro-black mb-2">
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full px-4 py-3 border border-gentro-lightgray text-sm text-gentro-black placeholder:text-gentro-gray focus:border-gentro-black focus:outline-none transition-colors bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gentro-black mb-2">
                    Phone Number <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={16} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-gentro-gray" />
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="01XXXXXXXXX"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gentro-lightgray text-sm text-gentro-black placeholder:text-gentro-gray focus:border-gentro-black focus:outline-none transition-colors bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gentro-black mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={16} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-gentro-gray" />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3 border border-gentro-lightgray text-sm text-gentro-black placeholder:text-gentro-gray focus:border-gentro-black focus:outline-none transition-colors bg-white"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-5 pt-2 border-t border-gentro-lightgray">
              <h2 className="flex items-center gap-2.5 font-display font-semibold text-xl text-gentro-black">
                <MapPin size={20} strokeWidth={2} className="text-gentro-midgray" />
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gentro-black mb-2">
                    Company (Optional)
                  </label>
                  <div className="relative">
                    <Building2 size={16} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-gentro-gray" />
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Company name"
                      className="w-full pl-10 pr-4 py-3 border border-gentro-lightgray text-sm text-gentro-black placeholder:text-gentro-gray focus:border-gentro-black focus:outline-none transition-colors bg-white"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gentro-black mb-2">
                    Street Address <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <Home size={16} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-gentro-gray" />
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="House, Road, Area"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gentro-lightgray text-sm text-gentro-black placeholder:text-gentro-gray focus:border-gentro-black focus:outline-none transition-colors bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gentro-black mb-2">
                    Area / Thana
                  </label>
                  <input
                    type="text"
                    name="area"
                    value={form.area}
                    onChange={handleChange}
                    placeholder="e.g. Dhanmondi"
                    className="w-full px-4 py-3 border border-gentro-lightgray text-sm text-gentro-black placeholder:text-gentro-gray focus:border-gentro-black focus:outline-none transition-colors bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gentro-black mb-2">
                    City / District <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gentro-lightgray text-sm text-gentro-black focus:border-gentro-black focus:outline-none transition-colors bg-white appearance-none cursor-pointer"
                  >
                    {BD_DISTRICTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gentro-black mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={form.postalCode}
                    onChange={handleChange}
                    placeholder="e.g. 1205"
                    maxLength={10}
                    className="w-full sm:max-w-xs px-4 py-3 border border-gentro-lightgray text-sm text-gentro-black placeholder:text-gentro-gray focus:border-gentro-black focus:outline-none transition-colors bg-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gentro-black mb-2">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    name="orderNote"
                    value={form.orderNote}
                    onChange={handleChange}
                    placeholder="Special instructions for delivery, size, etc."
                    rows={3}
                    className="w-full px-4 py-3 border border-gentro-lightgray text-sm text-gentro-black placeholder:text-gentro-gray focus:border-gentro-black focus:outline-none transition-colors bg-white resize-none"
                  />
                </div>
              </div>
            </section>

            <section className="space-y-5 pt-2 border-t border-gentro-lightgray">
              <h2 className="flex items-center gap-2.5 font-display font-semibold text-xl text-gentro-black">
                <CreditCard size={20} strokeWidth={2} className="text-gentro-midgray" />
                Payment Method
              </h2>

              <div className="space-y-3">
                <label className={`flex items-start gap-4 p-4 sm:p-5 border cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-gentro-black bg-gentro-offwhite'
                    : 'border-gentro-lightgray hover:border-gentro-midgray'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-0.5 w-4 h-4 text-gentro-black focus:ring-gentro-black border-gentro-lightgray"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <Banknote size={18} strokeWidth={2} className="text-gentro-black" />
                      <span className="font-medium text-gentro-black text-sm">
                        Cash on Delivery
                      </span>
                    </div>
                    <p className="text-xs text-gentro-midgray pl-7 leading-relaxed">
                      Pay in cash when your order is delivered. Available across Bangladesh.
                    </p>
                  </div>
                  {paymentMethod === 'cod' && (
                    <div className="w-5 h-5 rounded-full bg-gentro-black flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} strokeWidth={3} className="text-white" />
                    </div>
                  )}
                </label>

                <label className={`flex items-start gap-4 p-4 sm:p-5 border cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'border-gentro-black bg-gentro-offwhite'
                    : 'border-gentro-lightgray hover:border-gentro-midgray'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="mt-0.5 w-4 h-4 text-gentro-black focus:ring-gentro-black border-gentro-lightgray"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <CreditCard size={18} strokeWidth={2} className="text-gentro-black" />
                      <span className="font-medium text-gentro-black text-sm">
                        Card Payment
                      </span>
                    </div>
                    <p className="text-xs text-gentro-midgray pl-7 leading-relaxed">
                      Visa, Mastercard, American Express, and all major debit/credit cards.
                      Secure SSL encrypted payment.
                    </p>
                  </div>
                  {paymentMethod === 'card' && (
                    <div className="w-5 h-5 rounded-full bg-gentro-black flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} strokeWidth={3} className="text-white" />
                    </div>
                  )}
                </label>

                <label className={`flex items-start gap-4 p-4 sm:p-5 border cursor-pointer transition-all ${
                  paymentMethod === 'mobile'
                    ? 'border-gentro-black bg-gentro-offwhite'
                    : 'border-gentro-lightgray hover:border-gentro-midgray'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'mobile'}
                    onChange={() => setPaymentMethod('mobile')}
                    className="mt-0.5 w-4 h-4 text-gentro-black focus:ring-gentro-black border-gentro-lightgray"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <Smartphone size={18} strokeWidth={2} className="text-gentro-black" />
                      <span className="font-medium text-gentro-black text-sm">
                        Mobile Payment
                      </span>
                    </div>
                    <p className="text-xs text-gentro-midgray pl-7 leading-relaxed">
                      bKash, Nagad, Rocket, Upay. Fast and secure mobile financial service payment.
                    </p>
                  </div>
                  {paymentMethod === 'mobile' && (
                    <div className="w-5 h-5 rounded-full bg-gentro-black flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} strokeWidth={3} className="text-white" />
                    </div>
                  )}
                </label>
              </div>

              <div className="flex items-start gap-3 pt-3">
                <ShieldCheck size={18} strokeWidth={2} className="text-green-700 shrink-0 mt-0.5" />
                <p className="text-xs text-gentro-midgray leading-relaxed">
                  All transactions are secured with end-to-end encryption. Your personal
                  information is never shared with third parties.
                </p>
              </div>
            </section>

            <div className="lg:hidden pt-2 space-y-3">
              <Link
                to="/cart"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-medium text-gentro-black border-b border-gentro-black pb-0.5 hover:border-transparent hover:opacity-70 transition-all"
              >
                <ChevronLeft size={14} strokeWidth={2} />
                Return to Shopping Bag
              </Link>
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={!isFormValid() || isProcessing}
              >
                {isProcessing ? 'Processing...' : `Place Order — ৳${total.toLocaleString()}`}
              </Button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-5 xl:col-span-4">
          <div className="lg:sticky lg:top-24 space-y-6">
            <div className="bg-gentro-offwhite p-5 sm:p-6">
              <h3 className="font-display font-semibold text-lg text-gentro-black mb-5">
                Order Summary ({cart.length})
              </h3>

              <ul className="space-y-4 pb-5 border-b border-gentro-lightgray max-h-80 overflow-y-auto pr-2 -mr-2">
                {cart.map((item) => (
                  <li key={item.id} className="flex gap-4">
                    <div className="relative w-20 h-24 shrink-0 bg-gentro-white overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gentro-black text-gentro-white text-[10px] font-semibold flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gentro-black line-clamp-2">
                        {item.name}
                      </p>
                      <p className="text-xs text-gentro-gray mt-1">
                        {item.color} &middot; {item.size}
                      </p>
                      <p className="text-sm font-semibold text-gentro-black mt-2">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="pt-5 space-y-3.5 text-sm">
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
                    <span>Coupon Discount</span>
                    <span className="font-medium">- ৳{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="pt-3.5 mt-3.5 border-t border-gentro-lightgray flex items-center justify-between">
                  <span className="text-gentro-black font-semibold text-base">Total</span>
                  <span className="text-gentro-black font-bold text-2xl">
                    ৳{total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block space-y-3">
              <Link
                to="/cart"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-medium text-gentro-black border-b border-gentro-black pb-0.5 hover:border-transparent hover:opacity-70 transition-all"
              >
                <ChevronLeft size={14} strokeWidth={2} />
                Return to Shopping Bag
              </Link>
              <Button
                type="button"
                onClick={handlePlaceOrder}
                className="w-full"
                size="lg"
                disabled={!isFormValid() || isProcessing}
              >
                {isProcessing ? 'Processing...' : `Place Order — ৳${total.toLocaleString()}`}
              </Button>
            </div>

            <div className="bg-gentro-offwhite p-4 sm:p-5 space-y-3 text-xs text-gentro-midgray">
              <div className="flex items-start gap-2.5">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0 mt-0.5"><path d="M3 7h18M5 7v13h14V7M8 7V4h8v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                <p>Standard delivery in <strong className="text-gentro-black">2-5 business days</strong></p>
              </div>
              <div className="flex items-start gap-2.5">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0 mt-0.5"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <p><strong className="text-gentro-black">7-day easy return</strong> on unused items with tags</p>
              </div>
              <div className="flex items-start gap-2.5">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0 mt-0.5"><path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z" stroke="currentColor" strokeWidth="1.8"/></svg>
                <p>Buyer Protection. Trusted by <strong className="text-gentro-black">50,000+</strong> customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
