import HeroSection from '../components/product/HeroSection'
import CategorySection from '../components/product/CategorySection'
import FeaturedCollection from '../components/product/FeaturedCollection'
import NewArrivals from '../components/product/NewArrivals'
import PromoBanner from '../components/product/PromoBanner'
import BestSellers from '../components/product/BestSellers'
import BrandStory from '../components/product/BrandStory'
import WhyGentro from '../components/product/WhyGentro'
import Testimonials from '../components/product/Testimonials'
import InstagramGallery from '../components/product/InstagramGallery'
import NewsletterSection from '../components/product/NewsletterSection'

export default function Home() {
  return (
    <div className="w-full overflow-hidden">
      <HeroSection />
      <CategorySection />
      <FeaturedCollection />
      <NewArrivals />
      <PromoBanner />
      <BestSellers />
      <BrandStory />
      <WhyGentro />
      <Testimonials />
      <InstagramGallery />
      <NewsletterSection />
    </div>
  )
}
