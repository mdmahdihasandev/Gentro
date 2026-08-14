import { useNavigate } from 'react-router-dom'

export default function BrandStory() {
  const navigate = useNavigate()

  return (
    <section className="py-16 md:py-24 bg-gentro-white">
      <div className="container-gentro">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          <div className="aspect-[3/4] w-full overflow-hidden">
            <img
              src="https://picsum.photos/seed/mens-brand/800/1067"
              alt="GENTRO brand story"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="section-subtitle mb-5">OUR PHILOSOPHY</p>
            <h2 className="section-heading mb-8 leading-tight">
              Designed for those who move differently.
            </h2>
            <div className="space-y-5 mb-10 text-gentro-midgray text-base leading-relaxed">
              <p>
                At GENTRO, we believe that true style lies in simplicity and craftsmanship. Every piece is thoughtfully designed with a minimalist, contemporary aesthetic that transcends fleeting trends. We focus on creating garments that not only look exceptional but feel incredible from the first moment you put them on.
              </p>
              <p>
                Our commitment to premium quality means sourcing only the finest fabrics, employing skilled artisans, and paying meticulous attention to every stitch and seam. We build pieces that are made to last — wardrobe staples that age beautifully and remain effortlessly versatile season after season. GENTRO is for the modern man who values substance over spectacle.
              </p>
            </div>
            <div className="self-start">
              <button
                onClick={() => navigate('/about')}
                className="btn-secondary"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
