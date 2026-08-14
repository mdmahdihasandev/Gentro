import { useNavigate } from 'react-router-dom'

export default function PromoBanner() {
  const navigate = useNavigate()

  return (
    <section className="w-full bg-gentro-offwhite overflow-hidden relative aspect-[16/7] md:aspect-[16/5]">
      <img
        src="https://picsum.photos/seed/gentro-promo-banner/1920/800"
        alt="Promo fashion banner"
        className="absolute inset-y-0 right-0 w-full md:w-1/2 h-full object-cover opacity-80 md:opacity-100"
      />
      <div className="absolute inset-y-0 left-0 w-full md:w-1/2 flex items-center bg-gentro-black/80 md:bg-gentro-black px-8 md:px-20 py-12 md:py-0">
        <div className="max-w-lg">
          <p className="uppercase tracking-gentro-wide text-white/80 text-sm mb-5">
            THE NEW STANDARD
          </p>
          <h2 className="font-display font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-none mb-6">
            ELEVATE EVERYDAY.
          </h2>
          <p className="text-white/75 text-base md:text-lg mb-8">
            Explore the latest GENTRO collection designed for premium comfort and enduring style.
          </p>
          <button
            onClick={() => navigate('/shop')}
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-black text-sm font-medium tracking-wide transition-all duration-300 hover:bg-gentro-offwhite hover:tracking-widest"
          >
            SHOP COLLECTION
          </button>
        </div>
      </div>
    </section>
  )
}
