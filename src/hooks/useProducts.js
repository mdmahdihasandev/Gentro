import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'

const normalizeProduct = (product) => ({
  ...product,
  images: product.images?.length ? product.images : [product.image].filter(Boolean),
  image: product.image || product.images?.[0] || '',
  oldPrice: Number(product.old_price ?? product.oldPrice ?? product.price),
  rating: Number(product.rating ?? 4.5),
  reviews: Number(product.reviews ?? 0),
  stock: Number(product.stock ?? 0),
  sizes: product.sizes?.length ? product.sizes : ['M', 'L'],
  colors: product.colors?.length ? product.colors : ['#000000'],
  featured: product.is_featured ?? product.featured ?? false,
  bestseller: product.is_bestseller ?? product.bestseller ?? false,
  newArrival: product.is_new ?? product.newArrival ?? false,
})

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    const load = async () => {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false })
      if (!active) return
      if (error) {
        console.error('Unable to load products from Supabase:', error.message)
        setProducts([])
      } else {
        setProducts(data.map(normalizeProduct))
      }
      setLoading(false)
    }

    load()
    const channel = supabase
      // Each component can use this hook, so every subscription needs its own channel.
      .channel(`storefront-products-${crypto.randomUUID()}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, load)
      .subscribe()

    return () => {
      active = false
      supabase.removeChannel(channel)
    }
  }, [])

  return { products, loading }
}
