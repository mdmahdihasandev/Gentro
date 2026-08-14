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
  Phone,
  Check,
  AlertCircle
} from 'lucide-react'
import GentroLogo from '../../components/common/GentroLogo'
import Button from '../../components/ui/Button'

const PASSWORD_RULES = [
  { label: 'At least 8 characters', test: (p) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p) => /[A-Z]/.test(p) },
  { label: 'One lowercase letter', test: (p) => /[a-z]/.test(p) },
  { label: 'One number', test: (p) => /\d/.test(p) }
]

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
    if (formError) setFormError('')
  }

  const validate = () => {
    const newErrors = {}

    if (!form.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required'

    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email'
    }

    if (form.phone && !/^\d{10,15}$/.test(form.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Enter a valid phone number'
    }

    if (!form.password) {
      newErrors.password = 'Password is required'
    } else if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) return

    if (!acceptTerms) {
      setFormError('Please accept the Terms & Conditions to create an account.')
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1800))
    setIsLoading(false)
    navigate('/login', {
      state: {
        message: 'Account created! Please sign in with your new credentials.',
        fromRegister: true
      }
    })
  }

  const passwordStrength = PASSWORD_RULES.filter((r) => r.test(form.password)).length
  const strengthText = ['Too Weak', 'Weak', 'Fair', 'Good', 'Strong'][passwordStrength]
  const strengthColor = [
    'bg-red-500',
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-green-600'
  ][passwordStrength]

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-center mb-8 animate-fade-in">
          <Link to="/" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gentro-black focus-visible:ring-offset-4 rounded-sm p-1">
            <GentroLogo variant="logo" size="xl" />
          </Link>
        </div>

        <div className="bg-white border border-gentro-lightgray p-6 sm:p-8 animate-slide-up">
          <div className="mb-8 text-center">
            <h1 className="font-display font-semibold text-2xl sm:text-3xl text-gentro-black tracking-tight mb-2">
              Create Account
            </h1>
            <p className="text-sm text-gentro-midgray leading-relaxed">
              Join GENTRO today. Enjoy member-only prices, early access to drops & free returns.
            </p>
          </div>

          {formError && (
            <div className="mb-5 flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-200 text-sm text-red-700">
              <AlertCircle size={16} strokeWidth={2} className="shrink-0 mt-0.5" />
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gentro-black mb-2">
                  First Name <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <User size={16} strokeWidth={2} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gentro-gray" />
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    autoComplete="given-name"
                    className={`w-full pl-10 pr-4 py-3.5 border text-sm text-gentro-black placeholder:text-gentro-gray focus:outline-none transition-all bg-white ${
                      errors.firstName
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-gentro-lightgray focus:border-gentro-black'
                    }`}
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-2 text-xs text-red-600">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gentro-black mb-2">
                  Last Name <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <User size={16} strokeWidth={2} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gentro-gray" />
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    autoComplete="family-name"
                    className={`w-full pl-10 pr-4 py-3.5 border text-sm text-gentro-black placeholder:text-gentro-gray focus:outline-none transition-all bg-white ${
                      errors.lastName
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-gentro-lightgray focus:border-gentro-black'
                    }`}
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-2 text-xs text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gentro-black mb-2">
                Email Address <span className="text-red-600">*</span>
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
              <label className="block text-xs font-semibold uppercase tracking-wider text-gentro-black mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone size={16} strokeWidth={2} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gentro-gray" />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="01XXXXXXXXX"
                  autoComplete="tel"
                  className={`w-full pl-10 pr-4 py-3.5 border text-sm text-gentro-black placeholder:text-gentro-gray focus:outline-none transition-all bg-white ${
                    errors.phone
                      ? 'border-red-500 focus:border-red-600'
                      : 'border-gentro-lightgray focus:border-gentro-black'
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="mt-2 text-xs text-red-600">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gentro-black mb-2">
                Password <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Lock size={16} strokeWidth={2} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gentro-gray" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  autoComplete="new-password"
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

              {form.password && (
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gentro-gray uppercase tracking-wider font-medium">
                      Strength
                    </span>
                    <span className={`font-medium ${
                      passwordStrength <= 1 ? 'text-red-600' :
                      passwordStrength <= 2 ? 'text-orange-600' :
                      passwordStrength <= 3 ? 'text-yellow-600' : 'text-green-700'
                    }`}>
                      {strengthText}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gentro-lightgray rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${strengthColor}`}
                      style={{ width: `${(passwordStrength / 4) * 100}%` }}
                    />
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 pt-1">
                    {PASSWORD_RULES.map((rule, idx) => {
                      const passed = rule.test(form.password)
                      return (
                        <li
                          key={idx}
                          className={`flex items-center gap-1.5 text-xs ${
                            passed ? 'text-green-700' : 'text-gentro-midgray'
                          }`}
                        >
                          {passed ? (
                            <Check size={12} strokeWidth={3} />
                          ) : (
                            <span className="w-3 h-3 rounded-full border border-current shrink-0 opacity-50" />
                          )}
                          {rule.label}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gentro-black mb-2">
                Confirm Password <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Lock size={16} strokeWidth={2} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gentro-gray" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  className={`w-full pl-10 pr-12 py-3.5 border text-sm text-gentro-black placeholder:text-gentro-gray focus:outline-none transition-all bg-white ${
                    errors.confirmPassword
                      ? 'border-red-500 focus:border-red-600'
                      : 'border-gentro-lightgray focus:border-gentro-black'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gentro-gray hover:text-gentro-black transition-colors"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff size={16} strokeWidth={2} /> : <Eye size={16} strokeWidth={2} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-xs text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer group pt-2 select-none text-sm">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => {
                  setAcceptTerms(e.target.checked)
                  if (formError) setFormError('')
                }}
                className="mt-0.5 w-4 h-4 text-gentro-black focus:ring-gentro-black border-gentro-lightgray rounded-sm"
              />
              <span className="text-gentro-midgray group-hover:text-gentro-black transition-colors leading-relaxed">
                I agree to GENTRO's{' '}
                <a href="#terms" onClick={(e) => e.preventDefault()} className="text-gentro-black underline underline-offset-2 hover:opacity-70">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#privacy" onClick={(e) => e.preventDefault()} className="text-gentro-black underline underline-offset-2 hover:opacity-70">
                  Privacy Policy
                </a>
              </span>
            </label>

            <Button
              type="submit"
              className="w-full mt-2"
              size="lg"
              rightIcon={ArrowRight}
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="flex items-center gap-4 my-7">
            <div className="flex-1 h-px bg-gentro-lightgray" />
            <span className="text-[10px] sm:text-xs uppercase tracking-gentro-wider text-gentro-gray font-medium">
              Or Sign Up With
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
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-gentro-black font-medium border-b border-gentro-black pb-0.5 hover:border-transparent hover:opacity-70 transition-all"
            >
              Sign In
            </Link>
          </p>
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
