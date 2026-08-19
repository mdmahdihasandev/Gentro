import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useProducts } from '../../hooks/useProducts'
import ProductCard from '../ui/ProductCard'

export default function NewArrivals() {
  const navigate = useNavigate()
  const { products, loading } = useProducts()
  const newProducts = products.filter((product) => product.newArrival).slice(0, 8)

  return (
    <section className="py-16 md:py-24 bg-gentro-white">
      <div className="container-gentro">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-14">
          <div>
            <p className="section-subtitle mb-3">LATEST DROPS</p>
            <h2 className="section-heading">New Arrivals</h2>
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

        {loading ? (
          <div className="text-center py-10">
            Loading products...
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {newProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
