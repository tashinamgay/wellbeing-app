import React, { useEffect } from 'react'
import styles from './Modal.module.css'

// ============================================================
// MODAL — accessible dialog overlay
// Props: isOpen, onClose, title, children
// ============================================================

export default function Modal({ isOpen, onClose, title, children }) {
  // Close on Escape key press — good accessibility practice
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    // Prevent body scrolling while modal is open
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    // role="dialog" + aria-modal for screen readers
    <div className={styles.overlay} onClick={onClose} aria-modal="true" role="dialog" aria-label={title}>
      {/* Stop click inside modal from closing it */}
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  )
}
