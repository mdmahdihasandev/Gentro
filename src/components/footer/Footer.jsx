import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react'
import GentroLogo from '../common/GentroLogo'

const SocialIcon = ({ name, size = 16 }) => {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg'
  }
  switch (name) {
    case 'facebook':
      return (
        <svg {...common}>
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case 'instagram':
      return (
        <svg {...common}>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="1.6"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="currentColor" strokeWidth="1.6"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      )
    case 'tiktok':
      return (
        <svg {...common}>
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case 'youtube':
      return (
        <svg {...common}>
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" stroke="currentColor" strokeWidth="1.6"/>
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"/>
        </svg>
      )
    default:
      return null
  }
}

export default function Footer() {
  const paymentMethods = ['Cash on Delivery', 'Visa', 'Mastercard', 'bKash', 'Nagad']

  return (
    <footer className="bg-[#111317] text-neutral-300 border-t border-neutral-800/80 font-sans">
      
      {/* Top Newsletter Section */}
      <div className="border-b border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-medium text-white tracking-wide uppercase">Join the Club</h3>
            <p className="text-xs text-neutral-400 font-light mt-1">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="w-full md:w-auto flex items-center gap-2">
            <div className="relative w-full sm:w-80">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-700/70 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-white transition-colors"
                required
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>Join</span>
              <ArrowRight size={14} />
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <GentroLogo variant="full" size="md" />
            <p className="mt-4 text-xs text-neutral-400 font-light leading-relaxed">
              Designed for those who move differently. GENTRO is premium modern men&apos;s fashion for the contemporary individual.
            </p>

            <div className="mt-6 space-y-2.5">
              <div className="flex items-start gap-2.5 text-xs text-neutral-400">
                <MapPin size={14} className="mt-0.5 shrink-0 text-neutral-500" />
                <span>House 42, Road 11, Banani, Dhaka 1213</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-neutral-400">
                <Phone size={14} className="shrink-0 text-neutral-500" />
                <span>+880 1700-000000</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-neutral-400">
                <Mail size={14} className="shrink-0 text-neutral-500" />
                <span>hello@gentro.com</span>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-white mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5">
              {['New Arrivals', 'Best Sellers', 'T-Shirts', 'Shirts', 'Pants', 'Hoodies', 'Jackets', 'Accessories'].map((item) => (
                <li key={item}>
                  <a href={`/shop?cat=${item.toLowerCase()}`} className="text-xs text-neutral-400 hover:text-white transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-white mb-4">
              Information
            </h4>
            <ul className="space-y-2.5">
              <li><a href="/about" className="text-xs text-neutral-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-xs text-neutral-400 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="/shipping" className="text-xs text-neutral-400 hover:text-white transition-colors">Shipping Policy</a></li>
              <li><a href="/returns" className="text-xs text-neutral-400 hover:text-white transition-colors">Returns & Exchange</a></li>
              <li><a href="/privacy" className="text-xs text-neutral-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-xs text-neutral-400 hover:text-white transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-white mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5">
              <li><a href="/help" className="text-xs text-neutral-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="/track-order" className="text-xs text-neutral-400 hover:text-white transition-colors">Order Tracking</a></li>
              <li><a href="/size-guide" className="text-xs text-neutral-400 hover:text-white transition-colors">Size Guide</a></li>
              <li><a href="/faqs" className="text-xs text-neutral-400 hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-white mb-4">
              Follow Us
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: 'facebook', label: 'Facebook', url: 'https://facebook.com' },
                { name: 'instagram', label: 'Instagram', url: 'https://instagram.com' },
                { name: 'tiktok', label: 'TikTok', url: 'https://tiktok.com' },
                { name: 'youtube', label: 'YouTube', url: 'https://youtube.com' },
              ].map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-xs text-neutral-400 hover:text-white transition-colors group"
                  >
                    <span className="p-1.5 rounded-full bg-neutral-900 border border-neutral-800 group-hover:border-neutral-600 transition-colors">
                      <SocialIcon name={social.name} size={14} />
                    </span>
                    <span>{social.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex flex-wrap items-center gap-2">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-[10px] text-neutral-400"
              >
                {method}
              </span>
            ))}
          </div>
          <p className="font-light">
            &copy; {new Date().getFullYear()} GENTRO. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}