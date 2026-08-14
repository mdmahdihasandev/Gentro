import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Button from '../ui/Button'
import hero from '../../assets/images/hero.webp'
import heroone from '../../assets/images/hero1.webp'

// স্লাইডারের তথ্যসমূহ
const slides = [
  {
    id: 1,
    image: hero,
    subtitle: 'NEW COLLECTION 2026',
    title: 'DEFINE YOUR STYLE.',
    description: 'Premium modern menswear designed for the contemporary individual. Quality, fit, and confidence.',
    primaryBtnText: 'SHOP NOW',
    primaryBtnLink: '/shop',
    secondaryBtnText: 'VIEW COLLECTION',
    secondaryBtnLink: '/shop?cat=collections'
  },
  {
    id: 2,
    image: heroone,
    subtitle: 'URBAN ESSENTIALS',
    title: 'ELEVATE YOUR LOOK.',
    description: 'Discover the latest trends in urban streetwear. Designed for comfort and effortless elegance.',
    primaryBtnText: 'DISCOVER MORE',
    primaryBtnLink: '/shop?filter=new',
    secondaryBtnText: 'BEST SELLERS',
    secondaryBtnLink: '/shop?filter=bestsellers'
  },
  {
    id: 3,
    image: hero,
    subtitle: 'EXCLUSIVE TAILORING',
    title: 'CRAFTED TO PERFECTION.',
    description: 'Experience unmatched craftsmanship with our premium suits and formal wear lineup.',
    primaryBtnText: 'EXPLORE SUITS',
    primaryBtnLink: '/shop?cat=suits',
    secondaryBtnText: 'LEARN MORE',
    secondaryBtnLink: '/about'
  }
]

export default function HeroSection() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }, [])

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  // অটো-স্লাইড লজিক (মাউস হোভার করলে পজ হবে)
  useEffect(() => {
    if (isHovered) return

    const timer = setInterval(() => {
      nextSlide()
    }, 4000) // প্রতি ৪ সেকেন্ড পর পর পরিবর্তন হবে

    return () => clearInterval(timer)
  }, [nextSlide, isHovered])

  return (
    <section 
      className="relative w-full h-[85vh] min-h-[550px] max-h-[850px] overflow-hidden bg-black group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {slides.map((slide, index) => {
        const isActive = index === current

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* ব্যাকগ্রাউন্ড ইমেজ (স্মুথ জুম অ্যানিমেশন সহ) */}
            <img
              src={slide.image}
              alt={slide.title}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[7000ms] ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
            />

            {/* ওভারলে গ্রাডিয়েন্ট */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

            {/* কনটেন্ট */}
            <div className="absolute inset-0 flex items-center">
              <div className="container-gentro w-full px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0">
                  
                  {/* সাবটাইটেল */}
                  <p 
                    className={`text-xs sm:text-sm uppercase tracking-[0.25em] text-gray-300 font-semibold mb-4 transition-all duration-700 delay-100 ${
                      isActive ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                    }`}
                  >
                    {slide.subtitle}
                  </p>

                  {/* মেইন হেডিং */}
                  <h1 
                    className={`font-display font-black leading-tight text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 tracking-tight transition-all duration-700 delay-200 ${
                      isActive ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                    }`}
                  >
                    {slide.title}
                  </h1>

                  {/* বিবরণ */}
                  <p 
                    className={`text-gray-300 text-sm sm:text-base md:text-lg mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed transition-all duration-700 delay-300 ${
                      isActive ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                    }`}
                  >
                    {slide.description}
                  </p>

                  {/* বাটনসমূহ */}
                  <div 
                    className={`flex flex-col sm:flex-row justify-center md:justify-start gap-4 transition-all duration-700 delay-500 ${
                      isActive ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                    }`}
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      className="bg-[#8e8e97] text-black hover:bg-[red] font-medium px-8 transition-all duration-300 transform hover:-translate-y-0.5"
                      onClick={() => navigate(slide.primaryBtnLink)}
                    >
                      {slide.primaryBtnText}
                    </Button>
                    <Button
                      variant="secondary"
                      size="lg"
                      className="border-white/80 text-white hover:bg-[#0004ff] hover:text-black font-medium px-8 transition-all duration-300 transform hover:-translate-y-0.5 backdrop-blur-sm"
                      onClick={() => navigate(slide.secondaryBtnLink)}
                    >
                      {slide.secondaryBtnText}
                    </Button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )
      })}

      {/* নেভিগেশন অ্যারো বাটন (বাম ও ডান) */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/20 text-white backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 hover:bg-white hover:text-black transition-all duration-300"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/20 text-white backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 hover:bg-white hover:text-black transition-all duration-300"
        aria-label="Next Slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* স্লাইডার ডট ইন্ডিকেটর (নিচে) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-300 rounded-full h-2.5 ${
              current === index ? 'w-8 bg-white' : 'w-2.5 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}