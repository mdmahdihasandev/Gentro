import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AppContext = createContext(null)

const loadFromStorage = (key, fallback) => {
  if (typeof window === 'undefined') return fallback
  try {
    const stored = window.localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error)
    return fallback
  }
}

const saveToStorage = (key, value) => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error)
  }
}

export function AppProvider({ children }) {
  const [cart, setCart] = useState(() => loadFromStorage('gentro_cart', []))
  const [wishlist, setWishlist] = useState(() => loadFromStorage('gentro_wishlist', []))

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    saveToStorage('gentro_cart', cart)
  }, [cart])

  useEffect(() => {
    saveToStorage('gentro_wishlist', wishlist)
  }, [wishlist])

  const addToCart = useCallback((product, size, color, qty = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.productId === product.id && item.size === size && item.color === color
      )

      if (existingIndex > -1) {
        const updatedCart = [...prevCart]
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          quantity: updatedCart[existingIndex].quantity + qty
        }
        return updatedCart
      }

      const cartItem = {
        id: `${product.id}-${size}-${color}-${Date.now()}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size,
        color,
        quantity: qty
      }
      return [...prevCart, cartItem]
    })
  }, [])

  const removeFromCart = useCallback((id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }, [])

  const updateQuantity = useCallback((id, qty) => {
    if (qty < 1) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id))
      return
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    )
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const toggleWishlist = useCallback((product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item.id === product.id)
      if (exists) {
        return prevWishlist.filter((item) => item.id !== product.id)
      }
      return [...prevWishlist, product]
    })
  }, [])

  const clearWishlist = useCallback(() => {
    setWishlist([])
  }, [])

  const openQuickView = useCallback((product) => {
    setQuickViewProduct(product)
    setIsQuickViewOpen(true)
  }, [])

  const closeQuickView = useCallback(() => {
    setIsQuickViewOpen(false)
    setQuickViewProduct(null)
  }, [])

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,

    wishlist,
    toggleWishlist,

    isMobileMenuOpen,
    setIsMobileMenuOpen,

    isCartDrawerOpen,
    setIsCartDrawerOpen,

    isQuickViewOpen,
    setIsQuickViewOpen: openQuickView,
    closeQuickView,
    quickViewProduct,
    setQuickViewProduct,

    isFilterDrawerOpen,
    setIsFilterDrawerOpen,

    isSearchOpen,
    setIsSearchOpen,

    searchQuery,
    setSearchQuery
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === null) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

export default AppContext
