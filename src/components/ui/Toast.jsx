import React from 'react'
import styles from './Toast.module.css'

// ============================================================
// TOAST — floating notification that auto-disappears
// Receives: message (string), type ('success' | 'error')
// ============================================================

export default function Toast({ message, type = 'success' }) {
  return (
    // role="alert" ensures screen readers announce it
    <div className={`${styles.toast} ${styles[type]}`} role="alert" aria-live="polite">
      <span className={styles.icon} aria-hidden="true">
        {type === 'success' ? '✓' : '✕'}
      </span>
      {message}
    </div>
  )
}
