import { Truck, RotateCcw, ShieldCheck } from 'lucide-react'

export default function AnnouncementBar() {
  return (
    <div className="w-full bg-[#0a0a0c] text-white border-b border-white/10 py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        
        {/* Desktop View (Full Version with Icons) */}
        <div className="hidden md:flex items-center space-x-8 text-[11px] font-medium tracking-[0.2em] uppercase text-gray-300">
          <div className="flex items-center space-x-2">
            <Truck size={14} className="text-amber-400" />
            <span>Free Shipping Over ৳2000</span>
          </div>

          <span className="text-white/20">•</span>

          <div className="flex items-center space-x-2">
            <ShieldCheck size={14} className="text-amber-400" />
            <span>100% Secure Checkout</span>
          </div>

          <span className="text-white/20">•</span>

          <div className="flex items-center space-x-2">
            <RotateCcw size={14} className="text-amber-400" />
            <span>7-Day Easy Returns</span>
          </div>
        </div>

        {/* Mobile & Small Screen View (Clean Centered Version) */}
        <div className="flex md:hidden items-center justify-center space-x-2 text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-200">
          <Truck size={13} className="text-amber-400 shrink-0" />
          <span>Free Shipping On Orders Over ৳2000</span>
        </div>

      </div>
    </div>
  )
}