import { useState, useEffect, useCallback } from 'react'

// ============================================================
// useAsync — generic hook for async data fetching
// Manages loading, error, and data states in one place
// Usage: const { data, loading, error, refetch } = useAsync(fetchFn)
// ============================================================
export function useAsync(asyncFn, deps = []) {
  const [state, setState] = useState({
    data: null,
    loading: true,   // true on first load
    error: null,
  })

  // run the async function and update state accordingly
  const run = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    try {
      const result = await asyncFn()
      setState({ data: result, loading: false, error: null })
    } catch (err) {
      setState({ data: null, loading: false, error: err.message })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  // Run on mount and whenever deps change
  useEffect(() => { run() }, [run])

  return { ...state, refetch: run }
}
