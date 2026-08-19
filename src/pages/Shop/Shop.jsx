import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { X, Filter, ChevronDown, Plus, Minus, Star } from 'lucide-react'
import { useProducts } from '../../hooks/useProducts'
import categories from '../../data/categories'
import { useApp } from '../../context/AppContext'
import ProductCard from '../../components/ui/ProductCard'
import Button from '../../components/ui/Button'

const SIZES = ['S', 'M', 'L', 'XL', 'XXL']
const COLORS = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Gray', hex: '#808080' },
  { name: 'Navy', hex: '#001F3F' },
  { name: 'Beige', hex: '#F5F5DC' },
  { name: 'Olive', hex: '#808000' }
]
const RATING_OPTIONS = [4, 3, 2, 1]

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'best-selling', label: 'Best Selling' }
]

function SidebarContent({
  products,
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
  selectedSizes,
  setSelectedSizes,
  selectedColors,
  setSelectedColors,
  minRating,
  setMinRating,
  resetFilters
}) {
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    size: true,
    color: true,
    rating: true
  })

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const categoryCounts = useMemo(() => {
    const counts = {}
    categories.forEach((cat) => {
      counts[cat.name] = products.filter((p) => p.category === cat.name).length
    })
    return counts
  }, [products])

  const toggleCategory = (catName) => {
    setSelectedCategories((prev) =>
      prev.includes(catName)
        ? prev.filter((c) => c !== catName)
        : [...prev, catName]
    )
  }

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    )
  }

  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((c) => c !== color)
        : [...prev, color]
    )
  }

  return (
    <div className="space-y-8">
      <div className="lg:hidden flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-lg uppercase tracking-gentro-wide">
          Filters
        </h3>
        <button
          onClick={resetFilters}
          className="text-xs uppercase tracking-wider text-gentro-midgray hover:text-gentro-black transition-colors"
        >
          Reset All
        </button>
      </div>

      <div>
        <button
          onClick={() => toggleSection('categories')}
          className="flex items-center justify-between w-full py-3 border-t border-gentro-lightgray"
        >
          <span className="text-xs font-semibold uppercase tracking-gentro-wide">
            Categories
          </span>
          {openSections.categories ? <Minus size={16} /> : <Plus size={16} />}
        </button>
        {openSections.categories && (
          <div className="space-y-3 pt-3 pb-1">
            {categories.map((cat) => (
              <label
                key={cat.slug}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.name)}
                  onChange={() => toggleCategory(cat.name)}
                  className="w-4 h-4 border-gentro-lightgray text-gentro-black focus:ring-gentro-black rounded-sm"
                />
                <span className="text-sm text-gentro-black group-hover:text-gentro-midgray transition-colors flex-1">
                  {cat.name}
                </span>
                <span className="text-xs text-gentro-gray">
                  ({categoryCounts[cat.name] || 0})
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div>
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full py-3 border-t border-gentro-lightgray"
        >
          <span className="text-xs font-semibold uppercase tracking-gentro-wide">
            Price
          </span>
          {openSections.price ? <Minus size={16} /> : <Plus size={16} />}
        </button>
        {openSections.price && (
          <div className="pt-3 pb-1 space-y-4">
            <div className="relative h-1 bg-gentro-lightgray rounded-full">
              <div
                className="absolute h-full bg-gentro-black rounded-full"
                style={{
                  left: `${(priceRange[0] / 10000) * 100}%`,
                  right: `${100 - (priceRange[1] / 10000) * 100}%`
                }}
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="block text-xs text-gentro-gray mb-1">Min</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gentro-midgray">
                    ৳
                  </span>
                  <input
                    type="number"
                    min={0}
                    max={10000}
                    value={priceRange[0]}
                    onChange={(e) => {
                      const v = Math.min(
                        Math.max(0, Number(e.target.value) || 0),
                        priceRange[1]
                      )
                      setPriceRange([v, priceRange[1]])
                    }}
                    className="w-full pl-7 pr-2 py-2 border border-gentro-lightgray text-sm focus:border-gentro-black focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <span className="text-gentro-gray text-sm pt-4">—</span>
              <div className="flex-1">
                <label className="block text-xs text-gentro-gray mb-1">Max</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gentro-midgray">
                    ৳
                  </span>
                  <input
                    type="number"
                    min={0}
                    max={10000}
                    value={priceRange[1]}
                    onChange={(e) => {
                      const v = Math.max(
                        Math.min(10000, Number(e.target.value) || 0),
                        priceRange[0]
                      )
                      setPriceRange([priceRange[0], v])
                    }}
                    className="w-full pl-7 pr-2 py-2 border border-gentro-lightgray text-sm focus:border-gentro-black focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <button
          onClick={() => toggleSection('size')}
          className="flex items-center justify-between w-full py-3 border-t border-gentro-lightgray"
        >
          <span className="text-xs font-semibold uppercase tracking-gentro-wide">
            Size
          </span>
          {openSections.size ? <Minus size={16} /> : <Plus size={16} />}
        </button>
        {openSections.size && (
          <div className="pt-3 pb-1">
            <div className="flex flex-wrap gap-2">
              {SIZES.map((size) => (
                <label
                  key={size}
                  className={`w-10 h-10 flex items-center justify-center text-sm font-medium border cursor-pointer transition-all select-none ${
                    selectedSizes.includes(size)
                      ? 'bg-gentro-black text-gentro-white border-gentro-black'
                      : 'border-gentro-lightgray text-gentro-black hover:border-gentro-black'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={selectedSizes.includes(size)}
                    onChange={() => toggleSize(size)}
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      <div>
        <button
          onClick={() => toggleSection('color')}
          className="flex items-center justify-between w-full py-3 border-t border-gentro-lightgray"
        >
          <span className="text-xs font-semibold uppercase tracking-gentro-wide">
            Color
          </span>
          {openSections.color ? <Minus size={16} /> : <Plus size={16} />}
        </button>
        {openSections.color && (
          <div className="pt-3 pb-1">
            <div className="space-y-3">
              {COLORS.map((color) => (
                <label
                  key={color.name}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <span
                    className={`w-5 h-5 rounded-full ring-offset-2 shrink-0 transition-all ${
                      selectedColors.includes(color.name)
                        ? 'ring-2 ring-gentro-black'
                        : ''
                    }`}
                    style={{
                      backgroundColor: color.hex,
                      border: color.name === 'White' ? '1px solid #e5e5e5' : 'none'
                    }}
                  />
                  <span className="text-sm text-gentro-black group-hover:text-gentro-midgray transition-colors">
                    {color.name}
                  </span>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={selectedColors.includes(color.name)}
                    onChange={() => toggleColor(color.name)}
                  />
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      <div>
        <button
          onClick={() => toggleSection('rating')}
          className="flex items-center justify-between w-full py-3 border-t border-gentro-lightgray"
        >
          <span className="text-xs font-semibold uppercase tracking-gentro-wide">
            Rating
          </span>
          {openSections.rating ? <Minus size={16} /> : <Plus size={16} />}
        </button>
        {openSections.rating && (
          <div className="space-y-3 pt-3 pb-1">
            {RATING_OPTIONS.map((r) => (
              <label
                key={r}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === r}
                  onChange={() => setMinRating(minRating === r ? 0 : r)}
                  className="w-4 h-4 border-gentro-lightgray text-gentro-black focus:ring-gentro-black"
                />
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`shrink-0 ${
                        i < r
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gentro-lightgray'
                      }`}
                      strokeWidth={0}
                    />
                  ))}
                </div>
                <span className="text-sm text-gentro-midgray">& Up</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-gentro-lightgray lg:hidden">
        <Button className="w-full" size="lg">
          Apply Filters
        </Button>
      </div>
    </div>
  )
}

export default function Shop() {
  const { products } = useProducts()
  const [searchParams, setSearchParams] = useSearchParams()
  const { isFilterDrawerOpen, setIsFilterDrawerOpen } = useApp()

  const urlCategory = searchParams.get('category')

  const initialCategories = urlCategory
    ? categories
        .filter((c) => c.slug === urlCategory || c.name === urlCategory)
        .map((c) => c.name)
    : []

  const [selectedCategories, setSelectedCategories] = useState(initialCategories)
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState('featured')

  useEffect(() => {
    if (urlCategory) {
      const matched = categories
        .filter((c) => c.slug === urlCategory || c.name === urlCategory)
        .map((c) => c.name)
      if (matched.length > 0) {
        setSelectedCategories(matched)
      }
    }
  }, [urlCategory])

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category))
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    )

    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.sizes?.some((s) => selectedSizes.includes(s))
      )
    }

    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        p.colors?.some((c) =>
          selectedColors.some(
            (sc) => c.toLowerCase().includes(sc.toLowerCase())
          )
        )
      )
    }

    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating)
    }

    switch (sortBy) {
      case 'newest':
        result = result.filter((p) => p.newArrival).concat(result.filter((p) => !p.newArrival))
        break
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'best-selling':
        result = result.filter((p) => p.bestseller).concat(result.filter((p) => !p.bestseller))
        break
      case 'featured':
      default:
        result = result.filter((p) => p.featured).concat(result.filter((p) => !p.featured))
    }

    return result
  }, [selectedCategories, priceRange, selectedSizes, selectedColors, minRating, sortBy])

  const totalProducts = products.length
  const shownProducts = filteredProducts.length

  const resetFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 10000])
    setSelectedSizes([])
    setSelectedColors([])
    setMinRating(0)
    setSortBy('featured')
    setSearchParams({})
    setIsFilterDrawerOpen(false)
  }

  const sidebarProps = {
    products,
    selectedCategories,
    setSelectedCategories,
    priceRange,
    setPriceRange,
    selectedSizes,
    setSelectedSizes,
    selectedColors,
    setSelectedColors,
    minRating,
    setMinRating,
    resetFilters
  }

  return (
    <div className="container-gentro py-8 sm:py-12">
      <nav className="flex items-center gap-2 text-sm text-gentro-midgray mb-6">
        <Link to="/" className="hover:text-gentro-black transition-colors">
          Home
        </Link>
        <ChevronDown size={14} className="rotate-[-90deg]" />
        <span className="text-gentro-black">Shop</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display font-semibold text-3xl sm:text-4xl text-gentro-black tracking-tight">
            Our Collection
          </h1>
          <p className="text-sm text-gentro-midgray mt-2">
            Showing {shownProducts} of {totalProducts} products
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-24">
            <SidebarContent {...sidebarProps} />
          </div>
        </aside>

        <div className="lg:col-span-9">
          <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-gentro-lightgray">
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="lg:hidden flex items-center gap-2 text-sm font-medium text-gentro-black border border-gentro-lightgray px-4 py-2.5 hover:border-gentro-black transition-colors"
            >
              <Filter size={16} strokeWidth={2} />
              Filters
            </button>
            <div className="lg:hidden" />

            <div className="flex-1 lg:flex-none flex justify-end">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-gentro-white border border-gentro-lightgray pl-4 pr-10 py-2.5 text-sm text-gentro-black focus:border-gentro-black focus:outline-none transition-colors cursor-pointer min-w-[180px]"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gentro-midgray"
                />
              </div>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <h3 className="font-display font-semibold text-xl text-gentro-black mb-3">
                No products match your filters
              </h3>
              <p className="text-sm text-gentro-midgray mb-6 max-w-sm">
                Try adjusting your search or filter criteria to find what you're looking for.
              </p>
              <Button onClick={resetFilters} variant="secondary">
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      <>
        <div
          className={`fixed inset-0 z-50 bg-black/60 transition-opacity duration-300 lg:hidden ${
            isFilterDrawerOpen
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsFilterDrawerOpen(false)}
          aria-hidden="true"
        />
        <aside
          className={`fixed top-0 left-0 z-50 h-full w-full max-w-sm bg-gentro-white shadow-2xl flex flex-col transition-transform duration-300 ease-out lg:hidden ${
            isFilterDrawerOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          aria-hidden={!isFilterDrawerOpen}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-gentro-lightgray">
            <h2 className="font-display font-semibold text-lg uppercase tracking-gentro-wide">
              Filters
            </h2>
            <button
              onClick={() => setIsFilterDrawerOpen(false)}
              className="p-1.5 text-gentro-midgray hover:text-gentro-black transition-colors"
              aria-label="Close filters"
            >
              <X size={20} strokeWidth={2} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <SidebarContent {...sidebarProps} />
          </div>
        </aside>
      </>
    </div>
  )
}
