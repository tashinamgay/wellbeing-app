import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import cihelogo from '../../assets/cihe-logo.png'
import styles from './Sidebar.module.css'

// Navigation items mapped to routes
const navItems = [
  { path: '/',             label: 'Dashboard',    icon: '⬡' },
  { path: '/activities',   label: 'Activities',   icon: '⚡' },
  { path: '/appointments', label: 'Appointments', icon: '📅' },
  { path: '/progress',     label: 'Progress',     icon: '📈' },
  { path: '/goals',        label: 'Goals',        icon: '🎯' },
]

export default function Sidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        className={styles.hamburger}
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle navigation menu"
        aria-expanded={open}
      >
        <span className={open ? styles.barOpen  : styles.bar} />
        <span className={open ? styles.barOpen2 : styles.bar} />
        <span className={open ? styles.barOpen3 : styles.bar} />
      </button>

      {/* Overlay behind open drawer on mobile */}
      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)} aria-hidden="true" />
      )}

      {/* Sidebar panel */}
      <aside className={`${styles.sidebar} ${open ? styles.sidebarOpen : ''}`} role="navigation" aria-label="Main navigation">

        {/* Brand — CIHE logo + WellTrack name */}
        <div className={styles.brand}>
          <img src={cihelogo} alt="CIHE Logo" className={styles.brandLogo} />
          <span className={styles.brandName}>WellTrack</span>
        </div>

        {/* Navigation links */}
        <nav>
          <ul className={styles.navList}>
            {navItems.map(({ path, label, icon }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  end={path === '/'}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                  }
                  onClick={() => setOpen(false)}
                >
                  <span className={styles.navIcon} aria-hidden="true">{icon}</span>
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User profile — bottom of sidebar */}
        <div className={styles.profile}>
          <div className={styles.avatar} aria-hidden="true">T</div>
          <div>
            <p className={styles.profileName}>Tashi Namgay</p>
            <p className={styles.profileRole}>Member since 2026</p>
          </div>
        </div>
      </aside>
    </>
  )
}
