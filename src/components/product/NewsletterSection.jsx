import { useState } from 'react'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Newsletter subscribe:', email)
    setEmail('')
  }

  return (
    <section className="w-full bg-gentro-black text-white py-16 md:py-20">
      <div className="container-gentro">
        <div className="max-w-3xl mx-auto text-center">
          <p className="uppercase tracking-gentro-wide text-gentro-gray text-sm mb-5">
            STAY IN THE LOOP
          </p>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white mb-5">
            Join the GENTRO community.
          </h2>
          <p className="text-sm text-white/70 mb-10 max-w-lg mx-auto">
            Get early access to new collections, exclusive offers, and GENTRO updates.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-xl mx-auto mb-5"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-white/50 focus:border-white focus:outline-none text-sm transition-colors"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-black text-sm font-medium tracking-wide transition-all duration-300 hover:bg-gentro-offwhite hover:tracking-widest whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-white/50">
            By subscribing you agree to our Privacy Policy.
          </p>
        </div>
      </div>
    </section>
  )
}
