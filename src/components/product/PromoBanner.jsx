import { useNavigate } from 'react-router-dom'

export default function PromoBanner() {
  const navigate = useNavigate()

  return (
    <section className="relative w-full py-12 md:py-20 bg-[#0f1115] overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-gradient-to-br from-[#1a1d24] to-[#121418] border border-white/10 p-6 md:p-12 lg:p-16 shadow-2xl overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content (Text Area) */}
            <div className="lg:col-span-7 z-10 flex flex-col justify-center">
              
              {/* Top Tag & Badge */}
              <div className="flex items-center space-x-3 mb-6">
                <span className="px-3 py-1 text-[11px] font-semibold tracking-widest uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full">
                  New Season Arrival
                </span>
                <span className="text-gray-400 text-xs tracking-widest uppercase hidden sm:inline-block">
                  • Pure Cotton Collection
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-white leading-[1.15] mb-6">
                Elegance in <br />
                <span className="italic font-light text-amber-200/90">Every Thread.</span>
              </h1>

              {/* Body Text */}
              <p className="text-gray-300 text-base md:text-lg font-light leading-relaxed max-w-xl mb-8">
                Experience tailored perfection with GENTRO’s executive shirt collection. Crafted from 100% Egyptian cotton for flawless drape and all-day confidence.
              </p>

              {/* Features List */}
              <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6 mb-8 max-w-lg">
                <div>
                  <p className="text-white font-medium text-sm md:text-base">100% Cotton</p>
                  <p className="text-gray-400 text-xs">Breathable Fabric</p>
                </div>
                <div>
                  <p className="text-white font-medium text-sm md:text-base">Custom Fit</p>
                  <p className="text-gray-400 text-xs">Tailored Precision</p>
                </div>
                <div>
                  <p className="text-white font-medium text-sm md:text-base">Wrinkle Free</p>
                  <p className="text-gray-400 text-xs">Easy Maintenance</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => navigate('/shop')}
                  className="px-8 py-4 bg-white text-black font-semibold text-xs md:text-sm tracking-widest uppercase rounded-lg hover:bg-amber-400 hover:text-black transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg"
                >
                  Explore Shirts
                </button>
                <button
                  onClick={() => navigate('/collections')}
                  className="px-8 py-4 bg-transparent text-white border border-white/20 font-semibold text-xs md:text-sm tracking-widest uppercase rounded-lg hover:border-white hover:bg-white/5 transition-all duration-300"
                >
                  View Lookbook
                </button>
              </div>

            </div>

            {/* Right Content (Image Showcase) */}
            <div className="lg:col-span-5 relative z-10">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Luxury Image */}
                <div className="relative rounded-xl overflow-hidden aspect-[3/4] shadow-2xl border border-white/10 group">
                  <img
                    src="https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?q=80&w=1000&auto=format&fit=crop"
                    alt="GENTRO Luxury Tailored Shirt"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                </div>

                {/* Floating Glassmorphic Quality Badge */}
                <div className="absolute -bottom-5 -left-5 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-2xl max-w-[200px]">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-serif font-bold text-lg">
                      G
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold uppercase tracking-wider">Premium Grade</p>
                      <p className="text-gray-300 text-[10px]">Handcrafted Finish</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}