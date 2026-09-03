import { useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, X, ArrowUpRight } from 'lucide-react'
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
      {/* Subtle Backdrop Overlay */}
      <div
        className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSearchOpen(false)}
        aria-hidden="true"
      />

      {/* Main Search Panel */}
      <div className="relative bg-[#111317] text-neutral-100 border-b border-neutral-800 shadow-2xl max-h-[85vh] overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          
          {/* Search Bar Input */}
          <div className="relative max-w-2xl mx-auto">
            <Search
              size={18}
              strokeWidth={1.75}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
            />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, styles, collections..."
              className="w-full pl-8 pr-10 py-3 bg-transparent border-b border-neutral-700 text-neutral-100 text-base placeholder:text-neutral-500 font-light focus:outline-none focus:border-neutral-200 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-8 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white uppercase tracking-wider"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close search"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Search Content & Results */}
          {searchQuery.trim() && (
            <div className="max-w-3xl mx-auto mt-10 space-y-8">
              
              {/* Category Pills */}
              {matchedCategories.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400 mb-3">
                    Categories
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {matchedCategories.map((category) => (
                      <Link
                        key={category.slug}
                        to={`/shop?category=${category.slug}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 hover:text-white hover:border-neutral-600 transition-all"
                      >
                        <span>{category.name}</span>
                        <span className="text-[10px] text-neutral-500 bg-neutral-800 px-1.5 py-0.2 rounded">
                          {category.itemCount}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* No Results Empty State */}
              {!hasResults ? (
                <div className="py-12 text-center">
                  <p className="text-neutral-400 text-sm font-light">
                    No results found for &ldquo;<span className="text-white font-normal">{searchQuery}</span>&rdquo;
                  </p>
                  <p className="text-neutral-500 text-xs mt-1 font-light">
                    Check spelling or try searching for another term.
                  </p>
                </div>
              ) : (
                <>
                  {/* Products Grid */}
                  {matchedProducts.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400">
                          Products ({matchedProducts.length})
                        </h4>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {displayedProducts.map((product) => (
                          <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            onClick={() => setIsSearchOpen(false)}
                            className="group block"
                          >
                            <div className="aspect-[3/4] overflow-hidden bg-neutral-900 rounded-sm mb-2">
                              <img
                                src={product.images?.[0]}
                                alt={product.name}
                                loading="lazy"
                                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                              />
                            </div>
                            <h3 className="text-xs font-normal text-neutral-200 line-clamp-1 group-hover:text-white transition-colors">
                              {product.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs font-medium text-white">
                                ৳{product.price?.toLocaleString()}
                              </span>
                              {product.oldPrice && product.oldPrice > product.price && (
                                <span className="text-[10px] text-neutral-500 line-through">
                                  ৳{product.oldPrice?.toLocaleString()}
                                </span>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* View All Button */}
                  {matchedProducts.length > 0 && (
                    <div className="pt-6 text-center border-t border-neutral-800">
                      <Link
                        to={`/shop?search=${encodeURIComponent(searchQuery.trim())}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-neutral-300 hover:text-white transition-colors"
                      >
                        <span>See all {matchedProducts.length} items</span>
                        <ArrowUpRight size={14} />
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