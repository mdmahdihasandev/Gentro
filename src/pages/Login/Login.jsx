import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ChevronLeft,
  ArrowRight,
  User,
  Check
} from 'lucide-react'
import GentroLogo from '../../components/common/GentroLogo'
import Button from '../../components/ui/Button'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email'
    }
    if (!form.password) {
      newErrors.password = 'Password is required'
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    navigate('/')
  }

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8 animate-fade-in">
          <Link to="/" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gentro-black focus-visible:ring-offset-4 rounded-sm p-1">
            <GentroLogo variant="logo" size="xl" />
          </Link>
        </div>

        <div className="bg-white border border-gentro-lightgray p-6 sm:p-8 animate-slide-up">
          <div className="mb-8 text-center">
            <h1 className="font-display font-semibold text-2xl sm:text-3xl text-gentro-black tracking-tight mb-2">
              Welcome Back
            </h1>
            <p className="text-sm text-gentro-midgray leading-relaxed">
              Sign in to your GENTRO account to access orders, wishlists & exclusive offers.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gentro-black mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} strokeWidth={2} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gentro-gray" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={`w-full pl-10 pr-4 py-3.5 border text-sm text-gentro-black placeholder:text-gentro-gray focus:outline-none transition-all bg-white ${
                    errors.email
                      ? 'border-red-500 focus:border-red-600'
                      : 'border-gentro-lightgray focus:border-gentro-black'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gentro-black">
                  Password
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => e.preventDefault()}
                  className="text-xs uppercase tracking-wider text-gentro-black border-b border-gentro-black pb-0.5 hover:border-transparent hover:opacity-70 transition-all font-medium"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <Lock size={16} strokeWidth={2} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gentro-gray" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className={`w-full pl-10 pr-12 py-3.5 border text-sm text-gentro-black placeholder:text-gentro-gray focus:outline-none transition-all bg-white ${
                    errors.password
                      ? 'border-red-500 focus:border-red-600'
                      : 'border-gentro-lightgray focus:border-gentro-black'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gentro-gray hover:text-gentro-black transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} strokeWidth={2} /> : <Eye size={16} strokeWidth={2} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-xs text-red-600">{errors.password}</p>
              )}
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer group select-none text-sm pt-1">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 text-gentro-black focus:ring-gentro-black border-gentro-lightgray rounded-sm"
              />
              <span className="text-gentro-black group-hover:text-gentro-midgray transition-colors">
                Keep me signed in
              </span>
            </label>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              rightIcon={ArrowRight}
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="flex items-center gap-4 my-7">
            <div className="flex-1 h-px bg-gentro-lightgray" />
            <span className="text-[10px] sm:text-xs uppercase tracking-gentro-wider text-gentro-gray font-medium">
              Or Continue With
            </span>
            <div className="flex-1 h-px bg-gentro-lightgray" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 py-3 border border-gentro-lightgray text-sm font-medium text-gentro-black hover:border-gentro-black transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4"><path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4.1-5.5 4.1-3.3 0-6-2.7-6-6.2s2.7-6.2 6-6.2c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.3 14.6 2.3 12 2.3 6.7 2.3 2.4 6.6 2.4 12s4.3 9.7 9.6 9.7c5.5 0 9.2-3.9 9.2-9.4 0-.6-.1-1.1-.2-1.6L12 10.2z"/></svg>
              Google
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 py-3 border border-gentro-lightgray text-sm font-medium text-gentro-black hover:border-gentro-black transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.2-.5-1.3.1-2.7 0 0 .8-.3 2.7 1 .8-.2 1.7-.3 2.5-.3.9 0 1.7.1 2.5.3 1.9-1.3 2.7-1 2.7-1 .6 1.4.2 2.5.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5 3.9-1.3 6.8-5.1 6.8-9.5C22 6.5 17.5 2 12 2z"/></svg>
              Facebook
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-gentro-midgray">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-gentro-black font-medium border-b border-gentro-black pb-0.5 hover:border-transparent hover:opacity-70 transition-all"
            >
              Create Account
            </Link>
          </p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 flex-wrap text-xs text-gentro-gray">
          <div className="flex items-center gap-1.5">
            <Check size={12} strokeWidth={2.5} className="text-green-700" />
            Secure SSL
          </div>
          <div className="flex items-center gap-1.5">
            <Check size={12} strokeWidth={2.5} className="text-green-700" />
            Privacy Protected
          </div>
          <div className="flex items-center gap-1.5">
            <User size={12} strokeWidth={2} />
            50k+ Members
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-gentro-gray hover:text-gentro-black transition-colors font-medium"
          >
            <ChevronLeft size={14} strokeWidth={2} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
