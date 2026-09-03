import { useNavigate } from 'react-router-dom'

export default function BrandStory() {
  const navigate = useNavigate()

  return (
    <section className="py-20 md:py-28 bg-[#faf9f6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image Collage / Visuals */}
          <div className="lg:col-span-6 relative">
            {/* Main Image */}
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1000&auto=format&fit=crop"
                alt="GENTRO Craftsmanship Shirt"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Accent Card Badge */}
            <div className="absolute -bottom-6 -right-4 md:bottom-8 md:-right-8 z-20 bg-white p-5 md:p-6 rounded-xl shadow-xl max-w-[220px] border border-gray-100 hidden sm:block">
              <span className="block text-3xl font-serif font-bold text-slate-900 mb-1">100%</span>
              <p className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                Premium Breathable Cotton & Tailored Fit
              </p>
            </div>

            {/* Decorative Background Frame */}
            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-slate-300 rounded-2xl -z-0 hidden sm:block" />
          </div>

          {/* Right Column: Story Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Tagline */}
            <div className="flex items-center space-x-3 mb-4">
              <span className="w-8 h-[2px] bg-slate-900"></span>
              <span className="uppercase tracking-[0.2em] text-xs font-bold text-slate-700">
                OUR CRAFTSMANSHIP
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.2] mb-6">
              Precision tailored shirts, crafted for timeless style.
            </h2>

            {/* Description Paragraphs */}
            <div className="space-y-4 text-slate-600 text-base md:text-lg leading-relaxed mb-8">
              <p>
                At GENTRO, we believe a great shirt is the foundation of every modern man’s wardrobe. We combine precision tailoring with clean, minimalist aesthetics to craft shirts that feel custom-made.
              </p>
              <p>
                From hand-selected long-staple cotton to reinforced stitching, every detail is meticulously engineered for flawless drape, effortless comfort, and lasting durability.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-6 py-6 border-y border-gray-200 mb-8">
              <div>
                <h4 className="font-semibold text-slate-900 text-sm md:text-base">Fine Fabrics</h4>
                <p className="text-xs md:text-sm text-gray-500 mt-1">Sourced for softness and durability</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-sm md:text-base">Perfect Fit</h4>
                <p className="text-xs md:text-sm text-gray-500 mt-1">Designed for mobility and comfort</p>
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <button
                onClick={() => navigate('/about')}
                className="inline-flex items-center space-x-3 bg-slate-900 text-white px-8 py-4 rounded-md text-xs md:text-sm font-semibold tracking-widest uppercase hover:bg-slate-800 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <span>Read Our Story</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}