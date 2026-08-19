import { Shield, Truck, RotateCcw, Lock, Headphones } from 'lucide-react'

const benefits = [
  {
    icon: Shield,
    title: 'Premium Quality',
    description:
      'Crafted with the finest materials and expert craftsmanship for lasting durability.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description:
      'Quick and reliable shipping nationwide so you receive your order without delay.',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description:
      'Hassle-free 14-day return policy because your satisfaction is our priority.',
  },
  {
    icon: Lock,
    title: 'Secure Payment',
    description:
      'Your transactions are protected with industry-leading encryption and security.',
  },
  {
    icon: Headphones,
    title: 'Customer Support',
    description:
      'Friendly and knowledgeable support team ready to assist you anytime.',
  },
]

export default function WhyGentro() {
  return (
    <section className="relative overflow-hidden bg-gentro-offwhite py-20 md:py-28">
      <div className="container-gentro">

        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gentro-black/30" />

            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-500">
              Why Gentro
            </p>

            <span className="h-px w-8 bg-gentro-black/30" />
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-gentro-black md:text-5xl">
            Built for quality.
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-500 md:text-base">
            Everything we do is focused on delivering quality, reliability,
            and an effortless shopping experience.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-5">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon

            return (
              <div
                key={benefit.title}
                className="
                  group relative flex flex-col items-center
                  rounded-2xl border border-black/[0.06]
                  bg-gentro-white/70 px-5 py-8 text-center
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-black/[0.12]
                  hover:bg-white
                  hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)]
                "
              >
                {/* Number */}
                <span className="absolute right-4 top-4 text-[10px] font-medium tracking-widest text-gray-300">
                  0{index + 1}
                </span>

                {/* Icon */}
                <div
                  className="
                    mb-6 flex h-16 w-16 items-center justify-center
                    rounded-full border border-black/[0.07]
                    bg-white text-gentro-black
                    shadow-[0_5px_20px_rgba(0,0,0,0.04)]
                    transition-all duration-300
                    group-hover:scale-105
                    group-hover:border-black/[0.15]
                    group-hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)]
                  "
                >
                  <Icon
                    size={25}
                    strokeWidth={1.7}
                  />
                </div>

                {/* Title */}
                <h3
                  className="
                    mb-3 text-[13px] font-semibold uppercase
                    tracking-[0.08em] text-gentro-black
                  "
                >
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-[13px] leading-6 text-gray-500">
                  {benefit.description}
                </p>

                {/* Bottom Line */}
                <div
                  className="
                    mt-6 h-px w-0 bg-gentro-black/20
                    transition-all duration-300
                    group-hover:w-10
                  "
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}