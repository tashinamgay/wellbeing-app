import React, { useState, useMemo } from 'react'
import { useApp } from '../context/AppContext'
import { categories } from '../data/mockData'
import { Card, PageHeader, Badge, Button, EmptyState } from '../components/ui/UI'
import { LoadingSpinner, ErrorMessage } from '../components/ui/LoadingError'
import Modal from '../components/ui/Modal'
import { useDebounce } from '../hooks/useCustomHooks'
import styles from './Activities.module.css'

// ============================================================
// ACTIVITIES PAGE — log, browse, filter, and toggle activities
// ============================================================

// --- Add Activity Form (rendered inside Modal) ---
function AddActivityForm({ onSubmit, onCancel }) {
  // Controlled form state
  const [form, setForm] = useState({
    name: '', category: 'Fitness', duration: '', calories: '', icon: '🏃'
  })
  const [errors, setErrors] = useState({})

  const handle = (field) => (e) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  // Client-side validation — returns true if all fields are valid
  const validate = () => {
    const errs = {}
    if (!form.name.trim())                    errs.name     = 'Activity name is required'
    if (!form.duration || form.duration < 1)  errs.duration = 'Enter a valid duration'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit({
      name: form.name.trim(),
      category: form.category,
      duration: Number(form.duration),
      calories: Number(form.calories) || 0,
      icon: form.icon,
      date: new Date().toISOString().split('T')[0], // today
    })
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <div className={styles.field}>
        <label htmlFor="act-name" className={styles.label}>Activity Name *</label>
        <input id="act-name"
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          placeholder="e.g. Morning Run" value={form.name} onChange={handle('name')}
          aria-describedby={errors.name ? 'act-name-err' : undefined} />
        {errors.name && <span id="act-name-err" className={styles.error}>{errors.name}</span>}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="act-cat" className={styles.label}>Category</label>
          <select id="act-cat" className={styles.input} value={form.category} onChange={handle('category')}>
            {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="act-icon" className={styles.label}>Icon</label>
          <select id="act-icon" className={styles.input} value={form.icon} onChange={handle('icon')}>
            {['🏃','🧘','💪','🚴','🏊','🚶','🧠','📓','🌬️','⚽','🤸'].map(i =>
              <option key={i} value={i}>{i}</option>
            )}
          </select>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="act-dur" className={styles.label}>Duration (mins) *</label>
          <input id="act-dur" type="number" min="1" max="300"
            className={`${styles.input} ${errors.duration ? styles.inputError : ''}`}
            placeholder="30" value={form.duration} onChange={handle('duration')}
            aria-describedby={errors.duration ? 'act-dur-err' : undefined} />
          {errors.duration && <span id="act-dur-err" className={styles.error}>{errors.duration}</span>}
        </div>
        <div className={styles.field}>
          <label htmlFor="act-cal" className={styles.label}>Calories Burned</label>
          <input id="act-cal" type="number" min="0"
            className={styles.input} placeholder="0"
            value={form.calories} onChange={handle('calories')} />
        </div>
      </div>

      <div className={styles.formActions}>
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary">Log Activity</Button>
      </div>
    </form>
  )
}

// --- Single activity card ---
function ActivityCard({ activity, onToggle }) {
  return (
    <Card className={`${styles.actCard} ${activity.completed ? styles.actCardDone : ''}`}>
      <div className={styles.actTop}>
        <span className={styles.actIcon} aria-hidden="true">{activity.icon}</span>
        <div className={styles.actInfo}>
          <p className={styles.actName}>{activity.name}</p>
          <p className={styles.actMeta}>{activity.duration} min · {activity.calories} kcal · {activity.date}</p>
        </div>
        <Badge variant={activity.category.toLowerCase()}>{activity.category}</Badge>
      </div>
      <button
        className={`${styles.toggleBtn} ${activity.completed ? styles.toggleDone : ''}`}
        onClick={() => onToggle(activity.id)}
        aria-label={activity.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {activity.completed ? '✓ Done' : 'Mark Done'}
      </button>
    </Card>
  )
}

// --- Main Activities page ---
export default function Activities() {
  const {
    activities, activitiesLoading, activitiesError,
    refetchActivities, toggleActivity, addActivity
  } = useApp()

  const [search, setSearch]       = useState('')
  const [category, setCategory]   = useState('All')
  const [showModal, setShowModal] = useState(false)

  // Debounce search to avoid re-filtering on every keystroke
  const debouncedSearch = useDebounce(search, 300)

  // Memoised filtered list — only recalculates when activities/filter changes
  const filtered = useMemo(() => {
    return activities.filter(a => {
      const matchSearch = a.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      const matchCat    = category === 'All' || a.category === category
      return matchSearch && matchCat
    })
  }, [activities, debouncedSearch, category])

  const handleAdd = (data) => {
    addActivity(data)
    setShowModal(false)
  }

  return (
    <div className={styles.page}>
      <PageHeader
        title="Activities"
        subtitle={`${activities.filter(a => a.completed).length} completed this week`}
        action={<Button onClick={() => setShowModal(true)}>+ Log Activity</Button>}
      />

      {/* ---- Loading state ---- */}
      {activitiesLoading && <LoadingSpinner message="Loading activities…" />}

      {/* ---- Error state with retry button ---- */}
      {activitiesError && !activitiesLoading && (
        <ErrorMessage message={activitiesError} onRetry={refetchActivities} />
      )}

      {/* ---- Content (only shown when data is ready) ---- */}
      {!activitiesLoading && !activitiesError && (
        <>
          {/* Filter bar */}
          <div className={styles.filters} role="search">
            <input
              type="search"
              className={styles.searchInput}
              placeholder="Search activities…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search activities"
            />
            <div className={styles.categoryTabs} role="group" aria-label="Filter by category">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`${styles.catBtn} ${category === cat ? styles.catBtnActive : ''}`}
                  onClick={() => setCategory(cat)}
                  aria-pressed={category === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Empty state */}
          {filtered.length === 0 ? (
            <EmptyState icon="🏃" message="No activities found. Try a different filter or log one!" />
          ) : (
            <ul className={styles.activityGrid} aria-label="Activity list">
              {filtered.map(activity => (
                <li key={activity.id}>
                  <ActivityCard activity={activity} onToggle={toggleActivity} />
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {/* Add Activity Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Log New Activity">
        <AddActivityForm onSubmit={handleAdd} onCancel={() => setShowModal(false)} />
      </Modal>
    </div>
  )
}
