import { useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useProducts } from '../../hooks/useProducts'
import categories from '../../data/categories'

export default function SearchOverlay() {
  const { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery } = useApp()
  const { products } = useProducts()
  const inputRef = useRef(null)

  useEffect(() => {
    if (!isSearchOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsSearchOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    setTimeout(() => inputRef.current?.focus(), 50)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isSearchOpen, setIsSearchOpen])

  const matchedProducts = useMemo(() => {
    if (!searchQuery.trim()) return []
    const query = searchQuery.toLowerCase()
    return products.filter((p) => p.name.toLowerCase().includes(query))
  }, [searchQuery, products])

  const matchedCategories = useMemo(() => {
    if (!searchQuery.trim()) return []
    const query = searchQuery.toLowerCase()
    return categories.filter((c) => c.name.toLowerCase().includes(query))
  }, [searchQuery])

  const displayedProducts = matchedProducts.slice(0, 8)
  const hasResults = matchedProducts.length > 0 || matchedCategories.length > 0

  if (!isSearchOpen) return null

  return (
    <div className="fixed inset-0 z-[90] animate-fade-in">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={() => setIsSearchOpen(false)}
        aria-hidden="true"
      />
      <div className="relative bg-gentro-white border-b border-gentro-lightgray animate-slide-down max-h-screen overflow-y-auto">
        <div className="container-gentro py-6">
          <div className="relative max-w-2xl mx-auto">
            <Search
              size={22}
              strokeWidth={2}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-gentro-midgray pointer-events-none"
            />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, categories, styles..."
              className="w-full pl-10 pr-12 py-4 bg-transparent border-b-2 border-gentro-lightgray text-gentro-black text-lg placeholder:text-gentro-gray focus:outline-none focus:border-gentro-black transition-colors"
            />
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gentro-midgray hover:text-gentro-black transition-colors"
              aria-label="Close search"
            >
              <X size={22} strokeWidth={2} />
            </button>
          </div>

          {searchQuery.trim() && (
            <div className="max-w-4xl mx-auto mt-8 space-y-8">
              {matchedCategories.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-gentro-wide text-gentro-midgray mb-3">
                    Categories
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {matchedCategories.map((category) => (
                      <Link
                        key={category.slug}
                        to={`/shop?category=${category.slug}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gentro-offwhite border border-gentro-lightgray text-gentro-black text-sm font-medium hover:bg-gentro-black hover:text-gentro-white hover:border-gentro-black transition-colors"
                      >
                        <span>{category.name}</span>
                        <span className="text-xs text-gentro-gray bg-gentro-white/60 px-2 py-0.5 rounded-full">
                          {category.itemCount}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {!hasResults ? (
                <div className="py-16 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gentro-offwhite">
                    <Search size={28} strokeWidth={2} className="text-gentro-gray" />
                  </div>
                  <p className="text-gentro-midgray text-base">No products found</p>
                  <p className="text-gentro-gray text-sm mt-1">
                    Try searching for something else
                  </p>
                </div>
              ) : (
                <>
                  {matchedProducts.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-gentro-wide text-gentro-midgray mb-4">
                        Products ({matchedProducts.length})
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {displayedProducts.map((product) => (
                          <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            onClick={() => setIsSearchOpen(false)}
                            className="group block"
                          >
                            <div className="aspect-[3/4] overflow-hidden bg-gentro-offwhite mb-3">
                              <img
                                src={product.images?.[0]}
                                alt={product.name}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                            <h3 className="text-sm font-medium text-gentro-black line-clamp-2 group-hover:text-gentro-midgray transition-colors mb-1">
                              {product.name}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-gentro-black">
                                ৳{product.price?.toLocaleString()}
                              </span>
                              {product.oldPrice && product.oldPrice > product.price && (
                                <span className="text-xs text-gentro-gray line-through">
                                  ৳{product.oldPrice?.toLocaleString()}
                                </span>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {matchedProducts.length > 0 && (
                    <div className="pt-2 pb-4 text-center border-t border-gentro-lightgray">
                      <Link
                        to={`/shop?search=${encodeURIComponent(searchQuery.trim())}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="inline-flex items-center gap-2 text-sm font-medium text-gentro-black hover:text-gentro-midgray transition-colors underline underline-offset-4 decoration-1"
                      >
                        View all {matchedProducts.length} products
                        <X size={14} strokeWidth={2.5} className="rotate-45" />
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
