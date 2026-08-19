import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const IgIcon = ({ size = 28, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect
      x="2"
      y="2"
      width="20"
      height="20"
      rx="5"
      ry="5"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <line
      x1="17.5"
      y1="6.5"
      x2="17.51"
      y2="6.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
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
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openModal = (index) => {
    setCurrentIndex(index)
    setSelectedImage(galleryImages[index])
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  const nextImage = (e) => {
    e.stopPropagation()

    const nextIndex =
      (currentIndex + 1) % galleryImages.length

    setCurrentIndex(nextIndex)
    setSelectedImage(galleryImages[nextIndex])
  }

  const prevImage = (e) => {
    e.stopPropagation()

    const prevIndex =
      (currentIndex - 1 + galleryImages.length) %
      galleryImages.length

    setCurrentIndex(prevIndex)
    setSelectedImage(galleryImages[prevIndex])
  }

  return (
    <>
      <section className="bg-gentro-cream py-16 md:py-24">
        <div className="container-gentro">

          {/* Heading */}
          <div className="mb-12 text-center md:mb-16">
            <p className="section-subtitle mb-4">
              STREET STYLE
            </p>

            <h2 className="section-heading">
              Follow @GENTRO
            </h2>
          </div>

          {/* Gallery */}
          <div className="grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-3">
            {galleryImages.map((img, index) => (
              <div
                key={index}
                onClick={() => openModal(index)}
                className="
                  group relative aspect-square
                  cursor-pointer overflow-hidden
                "
              >
                <img
                  src={img}
                  alt={`GENTRO street style ${index + 1}`}
                  loading="lazy"
                  className="
                    absolute inset-0 h-full w-full
                    object-cover grayscale
                    transition-all duration-500
                    ease-out
                    group-hover:scale-105
                    group-hover:grayscale-0
                  "
                />

                {/* Overlay */}
                <div
                  className="
                    absolute inset-0 flex flex-col
                    items-center justify-center gap-2
                    bg-black/0 opacity-0
                    transition-all duration-300
                    group-hover:bg-black/60
                    group-hover:opacity-100
                  "
                >
                  <IgIcon
                    size={28}
                    className="text-white"
                  />

                  <span className="text-xs font-medium tracking-wide text-white">
                    View Post
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MODAL ================= */}
      {selectedImage && (
        <div
          onClick={closeModal}
          className="
            fixed inset-0 z-[999]
            flex items-center justify-center
            bg-black/85 p-4
            backdrop-blur-sm
          "
        >

          {/* Close Button */}
          <button
            onClick={closeModal}
            className="
              absolute right-5 top-5 z-50
              flex h-11 w-11 items-center
              justify-center rounded-full
              bg-white/10 text-white
              backdrop-blur-md
              transition hover:bg-white/20
            "
          >
            <X size={24} />
          </button>

          {/* Previous */}
          <button
            onClick={prevImage}
            className="
              absolute left-4 z-50
              flex h-11 w-11 items-center
              justify-center rounded-full
              bg-white/10 text-white
              backdrop-blur-md
              transition hover:bg-white/20
              md:left-8
            "
          >
            <ChevronLeft size={28} />
          </button>

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              relative max-h-[90vh]
              max-w-[90vw]
            "
          >
            <img
              src={selectedImage}
              alt="GENTRO Preview"
              className="
                max-h-[85vh]
                max-w-[90vw]
                rounded-lg
                object-contain
                shadow-2xl
              "
            />

            {/* Image Counter */}
            <div
              className="
                absolute bottom-4 left-1/2
                -translate-x-1/2
                rounded-full bg-black/60
                px-4 py-1.5
                text-xs text-white
                backdrop-blur-md
              "
            >
              {currentIndex + 1} / {galleryImages.length}
            </div>
          </div>

          {/* Next */}
          <button
            onClick={nextImage}
            className="
              absolute right-4 z-50
              flex h-11 w-11 items-center
              justify-center rounded-full
              bg-white/10 text-white
              backdrop-blur-md
              transition hover:bg-white/20
              md:right-8
            "
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </>
  )
}