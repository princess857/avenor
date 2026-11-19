import { useState, useEffect, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '../utils/supabase'

export function useSupabaseStats(queries, demoValues) {
  const [stats, setStats] = useState(() => {
    if (isSupabaseConfigured()) return demoValues || {}
    return demoValues || {}
  })
  const [loading, setLoading] = useState(isSupabaseConfigured())
  const [error, setError] = useState(null)

  const fetchStats = useCallback(async () => {
    if (!isSupabaseConfigured() || !supabase) {
      setStats(demoValues || {})
      setLoading(false)
      setError(null)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const entries = await Promise.all(queries.map(async ({ key, table, select = '*', filter }) => {
        let q = supabase.from(table).select(select, { count: 'exact', head: true })
        if (filter) q = q.filter(...filter)
        const { count, error: err } = await q
        if (err) throw err
        return [key, count ?? 0]
      }))
      const results = Object.fromEntries(entries)
      setStats(results)
    } catch (err) {
      setError(err.message || 'Failed to load statistics')
      setStats(demoValues || {})
    } finally {
      setLoading(false)
    }
  }, [queries, demoValues])

  useEffect(() => {
    ;(async () => {
      await fetchStats()
    })()
  }, [fetchStats])

  return { stats, loading, error, refetch: fetchStats }
}
