const IgIcon = ({ size = 28, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="currentColor" strokeWidth="1.8"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
)

const galleryImages = [
  'https://picsum.photos/seed/mens-fashion-1/500/500',
  'https://picsum.photos/seed/mens-fashion-2/500/500',
  'https://picsum.photos/seed/mens-fashion-3/500/500',
  'https://picsum.photos/seed/mens-fashion-4/500/500',
  'https://picsum.photos/seed/mens-fashion-5/500/500',
  'https://picsum.photos/seed/mens-fashion-6/500/500',
]

export default function InstagramGallery() {
  return (
    <section className="py-16 md:py-24 bg-gentro-cream">
      <div className="container-gentro">
        <div className="text-center mb-12 md:mb-16">
          <p className="section-subtitle mb-4">STREET STYLE</p>
          <h2 className="section-heading">Follow @GENTRO</h2>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
          {galleryImages.map((img, index) => (
            <div
              key={index}
              className="group aspect-square overflow-hidden relative cursor-pointer"
            >
              <img
                src={img}
                alt={`GENTRO street style ${index + 1}`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-out"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/0 group-hover:bg-black/60 transition-all duration-300 ease-out opacity-0 group-hover:opacity-100">
                <IgIcon size={28} className="text-white" />
                <span className="text-white text-xs font-medium tracking-wide">
                  View Post
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
