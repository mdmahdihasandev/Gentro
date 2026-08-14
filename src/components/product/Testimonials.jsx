import Rating from '../ui/Rating'

const testimonials = [
  {
    name: 'Rafiq Hasan',
    quote: 'Absolutely love the quality of GENTRO clothing. The premium cotton t-shirts are incredibly soft and the fit is perfect. I\'ve washed them multiple times and they still look brand new. Best menswear brand in Dhaka by far!',
  },
  {
    name: 'Tanvir Ahmed',
    quote: 'The oxford shirt I ordered exceeded my expectations. The stitching is immaculate, the fabric feels luxurious, and it fits like it was tailored just for me. The delivery was fast and the packaging was top-notch. Highly recommend!',
  },
  {
    name: 'Shakil Chowdhury',
    quote: 'Been buying from GENTRO for over a year now and they never disappoint. The bomber jacket is my go-to piece — gets compliments every time I wear it. Customer service is also fantastic, they really care about their customers.',
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
  return (
    <section className="py-16 md:py-24 bg-gentro-white">
      <div className="container-gentro">
        <div className="text-center mb-12 md:mb-16">
          <p className="section-subtitle mb-4">CUSTOMER VOICES</p>
          <h2 className="section-heading">What they say about us.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-gentro-cream p-6 md:p-8 flex flex-col"
            >
              <div className="mb-5">
                <Rating value={5} size="sm" />
              </div>
              <p className="text-gentro-midgray text-base leading-relaxed mb-8 flex-1">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-gentro-lightgray/30">
                <div className="w-12 h-12 rounded-full bg-gentro-black text-white flex items-center justify-center font-display font-semibold text-sm shrink-0">
                  {getInitials(testimonial.name)}
                </div>
                <div>
                  <p className="font-semibold text-gentro-black text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-gentro-gray text-xs">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
