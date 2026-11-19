// Supabase Authentication Hook
// Wraps @supabase/supabase-js auth (login, logout, session, password reset).
// Falls back to demonstration mode when Supabase credentials are not configured.
// Never exposes service_role or secret keys.

import { useState, useEffect, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '../utils/supabase'

const DEMO_EMAIL = 'admin@avenorhospital.com'
const DEMO_PASSWORD = 'admin123'

export function useSupabaseAuth() {
  const [user, setUser] = useState(() => {
    if (!isSupabaseConfigured()) {
      const token = localStorage.getItem('avenor-admin-token')
      if (token) return { id: 'demo-user', email: DEMO_EMAIL }
    }
    return null
  })
  const [role, setRole] = useState(() => {
    if (!isSupabaseConfigured()) {
      const token = localStorage.getItem('avenor-admin-token')
      if (token) return 'super_administrator'
    }
    return null
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Restore session on mount
  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setTimeout(() => setLoading(false), 0)
      return
    }

    supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (sessionError) {
        setError(sessionError.message)
      } else {
        setUser(data.session?.user ?? null)
        setRole(data.session?.user?.user_metadata?.role ?? null)
      }
      setLoading(false)
    })

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      setRole(session?.user?.user_metadata?.role ?? null)
      setLoading(false)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const signIn = useCallback(async (email, password) => {
    setError(null)
    setLoading(true)

    if (!isSupabaseConfigured()) {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
            const demoUser = { id: 'demo-user', email }
            localStorage.setItem('avenor-admin-token', 'demo-token')
            setUser(demoUser)
            setRole('super_administrator')
            setLoading(false)
            resolve({ data: { user: demoUser }, error: null })
          } else {
            setError('Invalid email or password.')
            setLoading(false)
            resolve({ data: { user: null }, error: new Error('Invalid email or password.') })
          }
        }, 800)
      })
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      if (data.user) {
        setRole(data.user.user_metadata?.role ?? null)
      }
      return { data, error: null }
    } catch (err) {
      setError(err.message || 'Login failed.')
      return { data: { user: null }, error: err }
    } finally {
      setLoading(false)
    }
  }, [])

  const signUp = useCallback(async (email, password, userRole = 'staff') => {
    setError(null)
    setLoading(true)

    if (!isSupabaseConfigured()) {
      setError('Demo mode does not support registration.')
      setLoading(false)
      return { data: null, error: new Error('Demo mode does not support registration.') }
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { role: userRole } }
      })
      if (error) throw error
      return { data, error: null }
    } catch (err) {
      setError(err.message || 'Registration failed.')
      return { data: null, error: err }
    } finally {
      setLoading(false)
    }
  }, [])

  const resetPassword = useCallback(async (email) => {
    setError(null)
    setLoading(true)

    if (!isSupabaseConfigured()) {
      setError('Demo mode does not support password reset.')
      setLoading(false)
      return { data: null, error: new Error('Demo mode does not support password reset.') }
    }

    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-password`
      })
      if (error) throw error
      return { data, error: null }
    } catch (err) {
      setError(err.message || 'Password reset failed.')
      return { data: null, error: err }
    } finally {
      setLoading(false)
    }
  }, [])

  const signOut = useCallback(async () => {
    setError(null)

    if (isSupabaseConfigured()) {
      await supabase.auth.signOut()
    } else {
      localStorage.removeItem('avenor-admin-token')
    }

    setUser(null)
    setRole(null)
  }, [])

  const isAuthenticated = Boolean(user)
  const isAdmin = role === 'super_administrator' || role === 'hospital_administrator'
  const hasRole = (allowedRoles) => role && allowedRoles.includes(role)

  return {
    user,
    role,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    hasRole,
    signIn,
    signUp,
    resetPassword,
    signOut,
    isSupabaseConfigured: isSupabaseConfigured(),
  }
}

export default useSupabaseAuth
