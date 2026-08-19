import { useState } from 'react'
import { Mail, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    // API Call Simulate (এখানে আপনার আসল API কল বসাবেন)
    setTimeout(() => {
      console.log('Newsletter subscribe:', email)
      setStatus('success')
      setEmail('')

      // ৩ সেকেন্ড পর স্টেট রিসেট হবে
      setTimeout(() => {
        setStatus('idle')
      }, 3500)
    }, 1200)
  }

  return (
    <section className="relative w-full overflow-hidden bg-gentro-black text-white py-20 md:py-28">
      {/* Background Subtle Accent Glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-96 rounded-full bg-white/5 blur-3xl" />

      <div className="container-gentro relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">

          {/* Badge Tag */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-300">
              Stay in the loop
            </p>
          </div>

          {/* Heading */}
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
            Join the GENTRO community.
          </h2>

          {/* Subtitle */}
          <p className="mt-4 text-sm text-gray-400 sm:text-base max-w-lg mx-auto leading-relaxed">
            Get early access to new collections, exclusive drops, and insider-only updates delivered straight to your inbox.
          </p>

          {/* Form / Success State */}
          <div className="mt-10 max-w-xl mx-auto">
            {status === 'success' ? (
              <div className="flex items-center justify-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-400 backdrop-blur-md transition-all duration-300">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <span className="text-sm font-medium">
                  Welcome aboard! Thank you for subscribing.
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="group relative flex flex-col sm:flex-row items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.04] p-2 backdrop-blur-md transition-all duration-300 focus-within:border-white/40 focus-within:bg-white/[0.07] hover:border-white/25"
              >
                {/* Input with Icon */}
                <div className="relative w-full flex-1 flex items-center">
                  <Mail className="absolute left-4 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-white" />
                  <input
                    type="email"
                    required
                    value={email}
                    disabled={status === 'loading'}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="
                        w-full
                        bg-transparent
                        py-3
                        pl-12
                        pr-4  
                        text-sm
                        text-white
                        placeholder-gray-500
                        border-0
                        outline-none
                        focus:border-0
                        focus:outline-none
                        focus:ring-0
                        focus-visible:border-0
                        focus-visible:outline-none
                        focus-visible:ring-0
                        disabled:opacity-50
                      "
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-gray-100 hover:shadow-lg hover:shadow-white/10 active:scale-95 disabled:opacity-70 shrink-0"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Footer Privacy Note */}
          <p className="mt-4 text-xs text-gray-500">
            By subscribing you agree to our{' '}
            <a href="#" className="underline underline-offset-4 hover:text-gray-300 transition-colors">
              Privacy Policy
            </a>
            . Unsubscribe anytime.
          </p>

        </div>
      </div>
    </section>
  )
}