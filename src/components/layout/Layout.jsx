import React from 'react'
import Sidebar from './Sidebar'
import Toast from '../ui/Toast'
import { useApp } from '../../context/AppContext'
import styles from './Layout.module.css'

// ============================================================
// LAYOUT — wraps every page with Sidebar + main content area
// ============================================================

export default function Layout({ children }) {
  const { toast } = useApp()

  return (
    <div className={styles.layout}>
      {/* Persistent sidebar navigation */}
      <Sidebar />

      {/* Main scrollable content area (offset for sidebar width) */}
      <main className={styles.main} id="main-content">
        {children}
      </main>

      {/* Global toast notification (shown when toast state is set) */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  )
}
