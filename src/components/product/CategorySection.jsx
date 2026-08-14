import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import categories from '../../data/categories'

export default function CategorySection() {
  const navigate = useNavigate()

  return (
    <section className="py-16 md:py-24 bg-gentro-white">
      <div className="container-gentro">
        <div className="text-center mb-12 md:mb-16">
          <p className="section-subtitle mb-4">SHOP BY CATEGORY</p>
          <h2 className="section-heading">Explore Categories</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category) => (
            <div
              key={category.slug}
              className="aspect-[4/5] overflow-hidden relative group cursor-pointer"
              onClick={() => navigate(`/shop?category=${category.slug}`)}
            >
              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 duration-500 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="uppercase text-white tracking-gentro-wide text-lg mb-2 font-medium">
                  {category.name}
                </h3>
                <div className="flex items-center gap-1 text-sm text-white/80 group-hover:translate-x-1 transition-transform duration-300">
                  <span>Explore</span>
                  <ArrowRight size={14} strokeWidth={2} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
