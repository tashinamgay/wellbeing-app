import React from 'react'
import styles from './LoadingError.module.css'

// ============================================================
// LoadingSpinner — shown while async data is being fetched
// ============================================================
export function LoadingSpinner({ message = 'Loading…' }) {
  return (
    // role="status" announces to screen readers that content is loading
    <div className={styles.spinnerWrap} role="status" aria-label={message}>
      <div className={styles.spinner} aria-hidden="true" />
      <p className={styles.spinnerText}>{message}</p>
    </div>
  )
}

// ============================================================
// ErrorMessage — shown when an async fetch fails
// onRetry allows user to re-trigger the fetch
// ============================================================
export function ErrorMessage({ message, onRetry }) {
  return (
    // role="alert" causes screen readers to announce the error immediately
    <div className={styles.errorWrap} role="alert">
      <span className={styles.errorIcon} aria-hidden="true">⚠️</span>
      <p className={styles.errorText}>{message || 'Something went wrong.'}</p>
      {onRetry && (
        <button className={styles.retryBtn} onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  )
}
