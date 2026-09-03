import { ShieldCheck, Truck, RotateCcw, Lock, Headphones } from 'lucide-react'

const benefits = [
  {
    icon: ShieldCheck,
    title: '100% Premium Cotton',
    description: 'Soft, breathable long-staple cotton crafted for long-lasting comfort.',
    bgColor: 'bg-amber-50 text-amber-700 border-amber-200/60',
    iconBg: 'bg-amber-100 text-amber-800',
  },
  {
    icon: Truck,
    title: 'Express Delivery',
    description: 'Fast and reliable shipping nationwide right to your doorstep.',
    bgColor: 'bg-blue-50 text-blue-700 border-blue-200/60',
    iconBg: 'bg-blue-100 text-blue-800',
  },
  {
    icon: RotateCcw,
    title: 'Hassle-Free Returns',
    description: 'Easy 14-day return & exchange policy for a worry-free purchase.',
    bgColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
    iconBg: 'bg-emerald-100 text-emerald-800',
  },
  {
    icon: Lock,
    title: 'Secure Payment',
    description: '100% safe & encrypted payments through all major providers.',
    bgColor: 'bg-indigo-50 text-indigo-700 border-indigo-200/60',
    iconBg: 'bg-indigo-100 text-indigo-800',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    description: 'Friendly support team available to assist with your order anytime.',
    bgColor: 'bg-rose-50 text-rose-700 border-rose-200/60',
    iconBg: 'bg-rose-100 text-rose-800',
  },
]

export default function WhyGentro() {
  return (
    <section className="py-16 md:py-24 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-2 block">
            Why Choose Gentro
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight mb-3">
            Quality & Comfort You Can Trust
          </h2>
          <p className="text-sm md:text-base text-slate-600 leading-relaxed">
            We focus on providing high-quality tailored shirts and an effortless shopping experience.
          </p>
        </div>

        {/* Clean Colorful Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon

            return (
              <div
                key={benefit.title}
                className={`
                  p-6 rounded-xl border bg-white shadow-sm transition-all duration-300
                  hover:-translate-y-1 hover:shadow-md flex flex-col justify-between
                `}
              >
                <div>
                  {/* Top Bar with Icon and Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`p-3 rounded-lg ${benefit.iconBg}`}>
                      <Icon size={20} strokeWidth={2} />
                    </div>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${benefit.bgColor}`}>
                      0{index + 1}
                    </span>
                  </div>

                  {/* Text */}
                  <h3 className="text-sm font-semibold text-slate-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}