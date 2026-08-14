import { MapPin, Phone, Mail } from 'lucide-react'
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
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case 'instagram':
      return (
        <svg {...common}>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="currentColor" strokeWidth="1.8"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      )
    case 'tiktok':
      return (
        <svg {...common}>
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case 'youtube':
      return (
        <svg {...common}>
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" stroke="currentColor" strokeWidth="1.8"/>
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"/>
        </svg>
      )
    default:
      return null
  }
}

export default function Footer() {
  const paymentMethods = ['Cash', 'Visa', 'Mastercard', 'bKash', 'Nagad']

  return (
    <footer className="bg-gentro-cream border-t border-gentro-lightgray">
      <div className="container-gentro py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <GentroLogo variant="full" size="md" />
            <p className="mt-5 text-sm text-gentro-gray leading-relaxed">
              Designed for those who move differently. GENTRO is premium modern men&apos;s fashion for the contemporary individual.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3 text-sm text-gentro-gray">
                <MapPin size={16} strokeWidth={2} className="mt-0.5 flex-shrink-0 text-gentro-midgray" />
                <span>House 42, Road 11, Banani, Dhaka 1213, Bangladesh</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gentro-gray">
                <Phone size={16} strokeWidth={2} className="flex-shrink-0 text-gentro-midgray" />
                <span>+880 1700-000000</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gentro-gray">
                <Mail size={16} strokeWidth={2} className="flex-shrink-0 text-gentro-midgray" />
                <span>hello@gentro.com</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-gentro-wide font-semibold text-gentro-black mb-5">
              Shop
            </h4>
            <ul className="space-y-3">
              <li><a href="/shop?filter=new" className="text-sm text-gentro-gray hover:text-gentro-black transition-colors duration-200">New Arrivals</a></li>
              <li><a href="/shop?filter=bestsellers" className="text-sm text-gentro-gray hover:text-gentro-black transition-colors duration-200">Best Sellers</a></li>
              <li><a href="/shop?cat=tshirts" className="text-sm text-gentro-gray hover:text-gentro-black transition-colors duration-200">T-Shirts</a></li>
              <li><a href="/shop?cat=shirts" className="text-sm text-gentro-gray hover:text-gentro-black transition-colors duration-200">Shirts</a></li>
              <li><a href="/shop?cat=pants" className="text-sm text-gentro-gray hover:text-gentro-black transition-colors duration-200">Pants</a></li>
              <li><a href="/shop?cat=hoodies" className="text-sm text-gentro-gray hover:text-gentro-black transition-colors duration-200">Hoodies</a></li>
              <li><a href="/shop?cat=jackets" className="text-sm text-gentro-gray hover:text-gentro-black transition-colors duration-200">Jackets</a></li>
              <li><a href="/shop?cat=accessories" className="text-sm text-gentro-gray hover:text-gentro-black transition-colors duration-200">Accessories</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-gentro-wide font-semibold text-gentro-black mb-5">
              Information
            </h4>
            <ul className="space-y-3">
              <li><a href="/about" className="text-sm text-gentro-gray hover:text-gentro-black transition-colors duration-200">About Us</a></li>
              <li><a href="/contact" className="text-sm text-gentro-gray hover:text-gentro-black transition-colors duration-200">Contact</a></li>
              <li><a href="/shipping" className="text-sm text-gentro-gray hover:text-gentro-black transition-colors duration-200">Shipping Policy</a></li>
              <li><a href="/returns" className="text-sm text-gentro-gray hover:text-gentro-black transition-colors duration-200">Returns</a></li>
              <li><a href="/privacy" className="text-sm text-gentro-gray hover:text-gentro-black transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="/terms" className="text-sm text-gentro-gray hover:text-gentro-black transition-colors duration-200">Terms &amp; Conditions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-gentro-wide font-semibold text-gentro-black mb-5">
              Customer Service
            </h4>
            <ul className="space-y-3">
              <li><a href="/help" className="text-sm text-gentro-gray hover:text-gentro-black transition-colors duration-200">Help Center</a></li>
              <li><a href="/track-order" className="text-sm text-gentro-gray hover:text-gentro-black transition-colors duration-200">Order Tracking</a></li>
              <li><a href="/size-guide" className="text-sm text-gentro-gray hover:text-gentro-black transition-colors duration-200">Size Guide</a></li>
              <li><a href="/faqs" className="text-sm text-gentro-gray hover:text-gentro-black transition-colors duration-200">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-gentro-wide font-semibold text-gentro-black mb-5">
              Social
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-sm text-gentro-gray hover:text-gentro-black transition-colors duration-200">
                  <SocialIcon name="facebook" size={16} />
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-sm text-gentro-gray hover:text-gentro-black transition-colors duration-200">
                  <SocialIcon name="instagram" size={16} />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-sm text-gentro-gray hover:text-gentro-black transition-colors duration-200">
                  <SocialIcon name="tiktok" size={16} />
                  <span>TikTok</span>
                </a>
              </li>
              <li>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-sm text-gentro-gray hover:text-gentro-black transition-colors duration-200">
                  <SocialIcon name="youtube" size={16} />
                  <span>YouTube</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gentro-lightgray flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-2.5">
            {paymentMethods.map((method) => (
              <div
                key={method}
                className="px-3 py-1.5 bg-gentro-white border border-gentro-lightgray text-xs font-medium text-gentro-midgray rounded"
              >
                {method}
              </div>
            ))}
          </div>
          <p className="text-xs text-gentro-gray">
            &copy; 2026 GENTRO. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
