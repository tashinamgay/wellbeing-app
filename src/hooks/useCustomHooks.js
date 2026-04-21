import { useState, useEffect } from 'react'

// ============================================================
// CUSTOM HOOKS — reusable stateful logic extracted from components
// ============================================================

// useLocalStorage: persists state to localStorage so data survives page refresh
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

// useDebounce: delays updating a value until user stops typing
// Useful for search inputs — avoids filtering on every keystroke
export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer) // cleanup on next render
  }, [value, delay])

  return debounced
}

// useMediaQuery: returns true/false based on a CSS media query
// Lets components adapt to screen size without CSS
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const mq = window.matchMedia(query)
    const handler = (e) => setMatches(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [query])

  return matches
}
