import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import { useAdminAuth } from '../hooks/useAdminAuth'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAdminAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please enter email and password.')
      return
    }
    setLoading(true)
    setError('')
    const { error } = await login(email, password)
    if (error) {
      setError(error.message || 'Invalid email or password.')
      setLoading(false)
      return
    }
    navigate('/admin/dashboard', { replace: true })
  }

  return (
    <div className="min-h-screen bg-[#082B3B] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl border border-white/10 p-8 md:p-12 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center gap-3 justify-center mb-4">
            <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
              <rect x="2" y="2" width="44" height="44" rx="12" stroke="#F4BE65" strokeWidth="2" />
              <path d="M14 34 L24 12 L34 34" stroke="#F4BE65" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M18 26 H30" stroke="#FFD78D" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="24" cy="12" r="2" fill="#FFD78D" />
            </svg>
            <div className="text-left">
              <div className="font-serif font-bold text-2xl text-[#003B3D] tracking-wide">Avenor</div>
              <div className="text-[#003B3D] text-xs tracking-[0.25em] uppercase">Admin</div>
            </div>
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#003B3D] mb-2">Sign in</h1>
          <p className="text-gray-600">Access the hospital administration dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email address</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@avenorhospital.com"
                className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:border-[#003B3D] focus:ring-1 focus:ring-[#003B3D] transition"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:border-[#003B3D] focus:ring-1 focus:ring-[#003B3D] transition"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#003B3D] text-white font-semibold py-4 rounded-xl hover:bg-[#082B3B] transition disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="animate-spin"></span>
                Signing in...
              </>
            ) : (
              <>
                Sign in <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Demo credentials: admin@avenorhospital.com / admin123
        </p>
      </div>
    </div>
  )
}
