import { useSupabaseAuth } from '../hooks/useSupabaseAuth'
import { AdminAuthContext } from './AdminAuthContext'

export function AdminAuthProvider({ children }) {
  const {
    user, role, loading, error, isAuthenticated, isAdmin, hasRole,
    signIn, signOut, isSupabaseConfigured,
  } = useSupabaseAuth()

  const value = {
    user,
    role,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    hasRole,
    isSupabaseConfigured,
    login: signIn,
    logout: signOut,
    signOut,
    signUp: undefined,
    resetPassword: undefined,
  }

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export default AdminAuthProvider
