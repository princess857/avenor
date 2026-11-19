import { useState, useEffect, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '../utils/supabase'

export function useSupabaseResource(tableName, demoData, options = {}) {
  const { orderBy, ascending, limit } = options
  const [data, setData] = useState(() => {
    if (isSupabaseConfigured()) return []
    return demoData || []
  })
  const [loading, setLoading] = useState(isSupabaseConfigured())
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    if (!isSupabaseConfigured() || !supabase) {
      setData(demoData || [])
      setLoading(false)
      setError(null)
      return
    }
    setLoading(true)
    setError(null)
    try {
      let query = supabase.from(tableName).select('*')
      if (orderBy) {
        query = query.order(orderBy, { ascending: ascending !== false })
      }
      if (limit) {
        query = query.limit(limit)
      }
      const { data: result, error: err } = await query
      if (err) throw err
      setData(result || [])
    } catch (err) {
      setError(err.message || 'Failed to load data')
      setData(demoData || [])
    } finally {
      setLoading(false)
    }
  }, [tableName, demoData, orderBy, ascending, limit])

  useEffect(() => {
    ;(async () => {
      await fetchData()
    })()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}
