import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Layout from './components/layout/Layout'

// ============================================================
// APP ROOT — sets up context provider and client-side routes
// Lazy loading: each page loads only when navigated to
// (improves initial load performance)
// ============================================================

const Dashboard    = lazy(() => import('./pages/Dashboard'))
const Activities   = lazy(() => import('./pages/Activities'))
const Appointments = lazy(() => import('./pages/Appointments'))
const Progress     = lazy(() => import('./pages/Progress'))
const Goals        = lazy(() => import('./pages/Goals'))

// Simple loading fallback while lazy chunk downloads
function PageLoader() {
  return (
    <div style={{ padding: '48px', textAlign: 'center', color: 'var(--clr-muted)' }}>
      Loading…
    </div>
  )
}

export default function App() {
  return (
    // AppProvider wraps everything so any component can access global state
    <AppProvider>
      <Layout>
        {/* Suspense shows PageLoader while lazy component loads */}
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/"             element={<Dashboard />}    />
            <Route path="/activities"   element={<Activities />}   />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/progress"     element={<Progress />}     />
            <Route path="/goals"        element={<Goals />}        />
            {/* Catch-all: redirect unknown routes to dashboard */}
            <Route path="*"             element={<Dashboard />}    />
          </Routes>
        </Suspense>
      </Layout>
    </AppProvider>
  )
}
