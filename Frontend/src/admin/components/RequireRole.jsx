import { useAdminAuth } from '../hooks/useAdminAuth'

// RequireRole gates rendering of its children to users who hold one of the
// allowed roles. Falls back gracefully in demo mode (role = super_administrator).
export function RequireRole({ allowedRoles, children, fallback = null }) {
  const { isAuthenticated, hasRole } = useAdminAuth()

  if (!isAuthenticated) return fallback
  if (!hasRole(allowedRoles)) return fallback
  return children
}

export default RequireRole