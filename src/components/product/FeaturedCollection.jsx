import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import products from '../../data/products'
import ProductCard from '../ui/ProductCard'

export default function FeaturedCollection() {
  const navigate = useNavigate()
  const featuredProducts = products.filter((p) => p.featured).slice(0, 8)

  return (
    <section className="py-16 md:py-24 bg-gentro-cream">
      <div className="container-gentro">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-14">
          <div>
            <p className="section-subtitle mb-3">CURATED SELECTION</p>
            <h2 className="section-heading">Featured Collection</h2>
          </div>
          <button
            onClick={() => navigate('/shop')}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gentro-black hover:text-gentro-midgray transition-colors group self-start sm:self-end"
          >
            <span>View All</span>
            <ArrowRight
              size={16}
              strokeWidth={2}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
