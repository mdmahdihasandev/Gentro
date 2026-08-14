import { Shield, Truck, RotateCcw, Lock, Headphones } from 'lucide-react'

const benefits = [
  {
    icon: Shield,
    title: 'Premium Quality',
    description: 'Crafted with the finest materials and expert craftsmanship for lasting durability.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Quick and reliable shipping nationwide so you receive your order without delay.',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: 'Hassle-free 14-day return policy because your satisfaction is our priority.',
  },
  {
    icon: Lock,
    title: 'Secure Payment',
    description: 'Your transactions are protected with industry-leading encryption and security.',
  },
  {
    icon: Headphones,
    title: 'Customer Support',
    description: 'Friendly and knowledgeable support team ready to assist you anytime.',
  },
]

export default function WhyGentro() {
  return (
    <section className="py-16 md:py-24 bg-gentro-offwhite">
      <div className="container-gentro">
        <div className="text-center mb-12 md:mb-16">
          <p className="section-subtitle mb-4">WHY GENTRO</p>
          <h2 className="section-heading">Built for quality.</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex flex-col items-center text-center p-4 md:p-6"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mb-5 bg-gentro-white rounded-full text-gentro-black shadow-sm">
                <benefit.icon
                  size={28}
                  strokeWidth={2}
                />
              </div>
              <h3 className="uppercase tracking-wide text-sm font-semibold text-gentro-black mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
