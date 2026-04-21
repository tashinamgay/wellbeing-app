import React from 'react'
import styles from './UI.module.css'

// ============================================================
// REUSABLE UI COMPONENTS
// Small building blocks used throughout the app
// ============================================================

// ---- Card: standard surface container ----
export function Card({ children, className = '', onClick }) {
  return (
    <div
      className={`${styles.card} ${className}`}
      onClick={onClick}
      // Make card focusable/clickable if it has an onClick
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {children}
    </div>
  )
}

// ---- StatCard: shows a headline metric with icon ----
export function StatCard({ label, value, icon, trend, color }) {
  return (
    <Card className={styles.statCard}>
      <div className={styles.statTop}>
        <span className={styles.statLabel}>{label}</span>
        {/* Trend badge: shows % change */}
        {trend && (
          <span className={`${styles.trend} ${trend > 0 ? styles.trendUp : styles.trendDown}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className={styles.statBottom}>
        <span className={styles.statValue} style={{ color }}>{value}</span>
        <span className={styles.statIcon} aria-hidden="true">{icon}</span>
      </div>
    </Card>
  )
}

// ---- Badge: small coloured label for categories / statuses ----
export function Badge({ children, variant = 'default' }) {
  return (
    <span className={`${styles.badge} ${styles[`badge_${variant}`]}`}>
      {children}
    </span>
  )
}

// ---- Button: primary, secondary, or danger variants ----
export function Button({ children, onClick, variant = 'primary', type = 'button', disabled = false, className = '' }) {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[`btn_${variant}`]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {children}
    </button>
  )
}

// ---- ProgressBar: visual progress towards a goal ----
export function ProgressBar({ value, max, color = 'var(--clr-primary)' }) {
  // Clamp percentage between 0–100
  const pct = Math.min(100, Math.round((value / max) * 100))

  return (
    <div className={styles.progressTrack} role="progressbar" aria-valuenow={value} aria-valuemax={max}>
      <div
        className={styles.progressFill}
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  )
}

// ---- PageHeader: page title + optional subtitle ----
export function PageHeader({ title, subtitle, action }) {
  return (
    <header className={styles.pageHeader}>
      <div>
        <h1 className={styles.pageTitle}>{title}</h1>
        {subtitle && <p className={styles.pageSubtitle}>{subtitle}</p>}
      </div>
      {/* Optional action button slot on the right */}
      {action && <div>{action}</div>}
    </header>
  )
}

// ---- EmptyState: shown when a list is empty ----
export function EmptyState({ icon, message }) {
  return (
    <div className={styles.emptyState} role="status">
      <span className={styles.emptyIcon} aria-hidden="true">{icon}</span>
      <p>{message}</p>
    </div>
  )
}
