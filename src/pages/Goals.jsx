import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Card, PageHeader, Badge, Button, ProgressBar, EmptyState } from '../components/ui/UI'
import { LoadingSpinner, ErrorMessage } from '../components/ui/LoadingError'
import Modal from '../components/ui/Modal'
import styles from './Goals.module.css'

// ============================================================
// GOALS PAGE — set and track personal wellness goals
// ============================================================

const categoryColors = {
  Fitness:     'var(--clr-primary)',
  Mindfulness: '#7c3aed',
  Nutrition:   '#f59e0b',
}

// --- Add Goal Form ---
function AddGoalForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: '', target: '', current: '0', unit: '', category: 'Fitness'
  })
  const [errors, setErrors] = useState({})

  const handle = (field) => (e) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  const validate = () => {
    const errs = {}
    if (!form.title.trim())              errs.title  = 'Goal title is required'
    if (!form.target || form.target < 1) errs.target = 'Target must be at least 1'
    if (!form.unit.trim())               errs.unit   = 'Unit is required (e.g. days, kcal)'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit({
      title: form.title.trim(),
      target: Number(form.target),
      current: Number(form.current) || 0,
      unit: form.unit.trim(),
      category: form.category,
    })
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <div className={styles.field}>
        <label htmlFor="goal-title" className={styles.label}>Goal Title *</label>
        <input id="goal-title"
          className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
          placeholder="e.g. Exercise 5x per week"
          value={form.title} onChange={handle('title')} />
        {errors.title && <span className={styles.error}>{errors.title}</span>}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="goal-target" className={styles.label}>Target *</label>
          <input id="goal-target" type="number" min="1"
            className={`${styles.input} ${errors.target ? styles.inputError : ''}`}
            placeholder="5" value={form.target} onChange={handle('target')} />
          {errors.target && <span className={styles.error}>{errors.target}</span>}
        </div>
        <div className={styles.field}>
          <label htmlFor="goal-current" className={styles.label}>Current Progress</label>
          <input id="goal-current" type="number" min="0"
            className={styles.input} placeholder="0"
            value={form.current} onChange={handle('current')} />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="goal-unit" className={styles.label}>Unit *</label>
          <input id="goal-unit"
            className={`${styles.input} ${errors.unit ? styles.inputError : ''}`}
            placeholder="sessions, kcal, days…"
            value={form.unit} onChange={handle('unit')} />
          {errors.unit && <span className={styles.error}>{errors.unit}</span>}
        </div>
        <div className={styles.field}>
          <label htmlFor="goal-cat" className={styles.label}>Category</label>
          <select id="goal-cat" className={styles.input} value={form.category} onChange={handle('category')}>
            <option value="Fitness">Fitness</option>
            <option value="Mindfulness">Mindfulness</option>
            <option value="Nutrition">Nutrition</option>
          </select>
        </div>
      </div>

      <div className={styles.formActions}>
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary">Add Goal</Button>
      </div>
    </form>
  )
}

// --- Single goal card ---
function GoalCard({ goal }) {
  const pct   = Math.min(100, Math.round((goal.current / goal.target) * 100))
  const color = categoryColors[goal.category] || 'var(--clr-primary)'
  const done  = pct >= 100

  return (
    <Card className={`${styles.goalCard} ${done ? styles.goalDone : ''}`}>
      <div className={styles.goalHeader}>
        <div>
          <p className={styles.goalTitle}>{goal.title}</p>
          <p className={styles.goalMeta}>{goal.current} / {goal.target} {goal.unit}</p>
        </div>
        <div className={styles.goalRight}>
          <Badge variant={goal.category.toLowerCase()}>{goal.category}</Badge>
          {done && <span className={styles.doneTag} aria-label="Goal achieved">🏆</span>}
        </div>
      </div>
      <ProgressBar value={goal.current} max={goal.target} color={color} />
      <div className={styles.pctRow}>
        <span className={styles.pctLabel} style={{ color }}>{pct}% complete</span>
        {done && <span className={styles.achievedText}>Goal achieved!</span>}
      </div>
    </Card>
  )
}

// --- Main Goals page ---
export default function Goals() {
  const { goals, goalsLoading, goalsError, addGoal } = useApp()

  const [showModal, setShowModal] = useState(false)

  const achieved   = goals.filter(g => g.current >= g.target).length
  const inProgress = goals.length - achieved

  const handleAdd = (data) => {
    addGoal(data)
    setShowModal(false)
  }

  return (
    <div className={styles.page}>
      <PageHeader
        title="Goals"
        subtitle={`${achieved} achieved · ${inProgress} in progress`}
        action={<Button onClick={() => setShowModal(true)}>+ Add Goal</Button>}
      />

      {/* Loading state */}
      {goalsLoading && <LoadingSpinner message="Loading goals…" />}

      {/* Error state */}
      {goalsError && !goalsLoading && (
        <ErrorMessage message={goalsError} />
      )}

      {/* Content */}
      {!goalsLoading && !goalsError && (
        <>
          {/* Summary chips */}
          <div className={styles.summaryRow}>
            <div className={styles.summaryBadge}>
              <span className={styles.sbValue}>{goals.length}</span>
              <span className={styles.sbLabel}>Total Goals</span>
            </div>
            <div className={styles.summaryBadge}>
              <span className={styles.sbValue} style={{ color: 'var(--clr-success)' }}>{achieved}</span>
              <span className={styles.sbLabel}>Achieved</span>
            </div>
            <div className={styles.summaryBadge}>
              <span className={styles.sbValue} style={{ color: 'var(--clr-primary)' }}>{inProgress}</span>
              <span className={styles.sbLabel}>In Progress</span>
            </div>
          </div>

          {goals.length === 0 ? (
            <EmptyState icon="🎯" message="No goals yet. Add one to get started!" />
          ) : (
            <ul className={styles.goalsList} aria-label="Goals list">
              {goals.map(goal => (
                <li key={goal.id}><GoalCard goal={goal} /></li>
              ))}
            </ul>
          )}
        </>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Goal">
        <AddGoalForm onSubmit={handleAdd} onCancel={() => setShowModal(false)} />
      </Modal>
    </div>
  )
}
