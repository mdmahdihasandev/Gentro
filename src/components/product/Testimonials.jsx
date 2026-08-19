import { useState } from 'react'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'

import Rating from '../ui/Rating'

const testimonials = [
  {
    name: 'Rafiq Hasan',
    location: 'Dhaka, Bangladesh',
    quote:
      "Absolutely love the quality of GENTRO clothing. The premium cotton t-shirts are incredibly soft and the fit is perfect. I've washed them multiple times and they still look brand new. Best menswear brand in Dhaka by far!",
  },
  {
    name: 'Tanvir Ahmed',
    location: 'Dhaka, Bangladesh',
    quote:
      'The oxford shirt I ordered exceeded my expectations. The stitching is immaculate, the fabric feels luxurious, and it fits like it was tailored just for me. The delivery was fast and the packaging was top-notch. Highly recommend!',
  },
  {
    name: 'Shakil Chowdhury',
    location: 'Dhaka, Bangladesh',
    quote:
      'Been buying from GENTRO for over a year now and they never disappoint. The bomber jacket is my go-to piece — gets compliments every time I wear it. Customer service is also fantastic, they really care about their customers.',
  },
  {
    name: 'Nabil Rahman',
    location: 'Chattogram, Bangladesh',
    quote:
      'GENTRO has become my first choice for everyday menswear. The quality is consistent, the designs are clean, and everything feels premium without being overpriced. Definitely worth recommending.',
  },
  {
    name: 'Arif Mahmud',
    location: 'Sylhet, Bangladesh',
    quote:
      'I was genuinely impressed with the attention to detail. From the fabric to the packaging, everything felt carefully done. The shirt fits perfectly and looks even better in person.',
  },
]

function getInitials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

export default function Testimonials() {
  // Navigation element state handlers for flawless Swiper integration
  const [prevEl, setPrevEl] = useState(null)
  const [nextEl, setNextEl] = useState(null)

  return (
    <section className="bg-gentro-white py-16 md:py-24 overflow-hidden">
      <div className="container-gentro max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-black/20" />
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-500">
              Customer Voices
            </p>
            <span className="h-px w-8 bg-black/20" />
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-gentro-black md:text-5xl">
            What they say about us.
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-gray-500 md:text-base">
            Real experiences from customers who choose GENTRO for quality, comfort, and timeless style.
          </p>
        </div>

        {/* Slider Wrapper */}
        <div className="relative px-2 sm:px-6">

          <Swiper
            modules={[Navigation, Autoplay]}
            loop={true}
            speed={800}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              prevEl,
              nextEl,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 28,
              },
            }}
            className="!py-4 !px-1"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={`${testimonial.name}-${index}`} className="h-auto">

                <div
                  className="
                    group relative flex h-[350px] flex-col justify-between rounded-2xl
                    border border-black/[0.08] bg-white p-6 md:p-8
                    shadow-[0_4px_20px_rgba(0,0,0,0.03)]
                    transition-all duration-300 ease-out
                    hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]
                    hover:border-black/20
                  "
                >
                  {/* Top Header inside Card */}
                  <div className="flex items-center justify-between mb-6">
                    <Rating value={5} size="sm" />
                    <div
                      className="
                        flex h-9 w-9 items-center justify-center rounded-full
                        bg-gray-100 text-gentro-black transition-colors duration-300
                        group-hover:bg-gentro-black group-hover:text-white
                      "
                    >
                      <Quote size={16} strokeWidth={2} />
                    </div>
                  </div>

                  {/* Quote Body */}
                  <p className="flex-1 text-sm leading-relaxed text-gray-600 font-normal">
                    "{testimonial.quote}"
                  </p>

                  {/* Divider */}
                  <div className="my-6 h-px w-full bg-gray-100" />

                  {/* Customer Info */}
                  <div className="flex items-center gap-4">
                    <div
                      className="
                        flex h-11 w-11 shrink-0 items-center justify-center
                        rounded-full bg-gentro-black text-xs font-bold
                        tracking-wider text-white shadow-sm
                      "
                    >
                      {getInitials(testimonial.name)}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gentro-black leading-tight">
                        {testimonial.name}
                      </p>
                      <p className="mt-1 text-xs text-gray-400 font-medium">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Hover Line */}
                  <div
                    className="
                      absolute bottom-0 left-0 h-[3px] w-0 rounded-b-2xl
                      bg-gentro-black transition-all duration-500 ease-in-out
                      group-hover:w-full
                    "
                  />
                </div>

              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button
            ref={(node) => setPrevEl(node)}
            aria-label="Previous Slide"
            className="
              absolute left-0 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 -translate-x-1/2 md:translate-x-0
              items-center justify-center rounded-full border border-black/10
              bg-white text-gentro-black shadow-lg backdrop-blur-md
              transition-all duration-300 hover:scale-110 hover:bg-gentro-black hover:text-white
              active:scale-95 disabled:opacity-0
            "
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>

          <button
            ref={(node) => setNextEl(node)}
            aria-label="Next Slide"
            className="
              absolute right-0 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 translate-x-1/2 md:translate-x-0
              items-center justify-center rounded-full border border-black/10
              bg-white text-gentro-black shadow-lg backdrop-blur-md
              transition-all duration-300 hover:scale-110 hover:bg-gentro-black hover:text-white
              active:scale-95 disabled:opacity-0
            "
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>

        </div>

        {/* Bottom Rating Footer */}
        <div className="mt-12 flex items-center justify-center gap-3">
          <Rating value={5} size="sm" />
          <span className="text-sm font-bold text-gentro-black">5.0</span>
          <span className="h-4 w-px bg-black/15" />
          <p className="text-xs text-gray-500 font-medium">
            Trusted by hundreds of happy customers
          </p>
        </div>

      </div>
    </section>
  )
}