import React, { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { fetchWeeklyProgress } from '../data/dataService'
import { Card, PageHeader, Badge } from '../components/ui/UI'
import { LoadingSpinner, ErrorMessage } from '../components/ui/LoadingError'
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, CartesianGrid,
  RadarChart, Radar, PolarGrid, PolarAngleAxis
} from 'recharts'
import styles from './Progress.module.css'

// ============================================================
// PROGRESS PAGE — visual charts of weekly activity and mood
// Demonstrates direct async fetch inside a page component
// ============================================================

const CHARTS = ['Calories', 'Minutes', 'Mood']

export default function Progress() {
  const { activities } = useApp()
  const [activeChart, setActiveChart] = useState('Calories')

  // Local async state for weekly progress data
  const [weeklyData, setWeeklyData]   = useState([])
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState(null)

  // Fetch weekly progress when component mounts
  useEffect(() => {
    setLoading(true)
    fetchWeeklyProgress()
      .then(data => { setWeeklyData(data); setLoading(false) })
      .catch(err  => { setError(err.message); setLoading(false) })
  }, []) // empty deps = runs once on mount

  const retry = () => {
    setError(null); setLoading(true)
    fetchWeeklyProgress()
      .then(data => { setWeeklyData(data); setLoading(false) })
      .catch(err  => { setError(err.message); setLoading(false) })
  }

  // Compute summary stats from all completed activities
  const completed = activities.filter(a => a.completed)
  const totalCal  = completed.reduce((s, a) => s + a.calories, 0)
  const totalMin  = completed.reduce((s, a) => s + a.duration, 0)
  const avgMood   = weeklyData.length
    ? (weeklyData.reduce((s, d) => s + d.mood, 0) / weeklyData.length).toFixed(1)
    : '–'

  // Shape mood data for radar chart
  const moodData = weeklyData.map(d => ({ subject: d.day, score: d.mood }))

  return (
    <div className={styles.page}>
      <PageHeader
        title="Progress"
        subtitle="Your activity and wellness trends this week"
      />

      {/* Summary stat chips — shown even while chart loads */}
      <div className={styles.summaryRow} aria-label="Weekly summary">
        <div className={styles.summaryChip}>
          <span className={styles.chipLabel}>Total Calories</span>
          <span className={styles.chipValue} style={{ color: 'var(--clr-accent)' }}>{totalCal.toLocaleString()}</span>
          <span className={styles.chipUnit}>kcal burned</span>
        </div>
        <div className={styles.summaryChip}>
          <span className={styles.chipLabel}>Active Time</span>
          <span className={styles.chipValue} style={{ color: 'var(--clr-primary)' }}>{totalMin}</span>
          <span className={styles.chipUnit}>minutes total</span>
        </div>
        <div className={styles.summaryChip}>
          <span className={styles.chipLabel}>Avg Mood</span>
          <span className={styles.chipValue} style={{ color: '#7c3aed' }}>{avgMood}</span>
          <span className={styles.chipUnit}>out of 10</span>
        </div>
        <div className={styles.summaryChip}>
          <span className={styles.chipLabel}>Activities</span>
          <span className={styles.chipValue} style={{ color: 'var(--clr-primary-light)' }}>{completed.length}</span>
          <span className={styles.chipUnit}>completed</span>
        </div>
      </div>

      {/* Chart card */}
      <Card className={styles.chartCard}>
        <div className={styles.chartHeader}>
          <h2 className={styles.sectionTitle}>Weekly Trends</h2>
          <div className={styles.chartTabs} role="tablist">
            {CHARTS.map(c => (
              <button key={c} role="tab" aria-selected={activeChart === c}
                className={`${styles.chartTab} ${activeChart === c ? styles.chartTabActive : ''}`}
                onClick={() => setActiveChart(c)}>{c}</button>
            ))}
          </div>
        </div>

        {/* Loading state for chart */}
        {loading && <LoadingSpinner message="Loading chart data…" />}

        {/* Error state for chart */}
        {error && !loading && <ErrorMessage message={error} onRetry={retry} />}

        {/* Charts (shown once data is ready) */}
        {!loading && !error && (
          <>
            {activeChart === 'Calories' && (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={weeklyData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--clr-border)" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '13px' }} />
                  <Bar dataKey="calories" fill="var(--clr-accent)" radius={[5,5,0,0]} name="Calories" />
                </BarChart>
              </ResponsiveContainer>
            )}

            {activeChart === 'Minutes' && (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={weeklyData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--clr-border)" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '13px' }} />
                  <Line type="monotone" dataKey="minutes" stroke="var(--clr-primary)"
                    strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} name="Minutes" />
                </LineChart>
              </ResponsiveContainer>
            )}

            {activeChart === 'Mood' && (
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={moodData} cx="50%" cy="50%" outerRadius="70%">
                  <PolarGrid stroke="var(--clr-border)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                  <Radar name="Mood" dataKey="score" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.3} />
                  <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '13px' }} />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </>
        )}
      </Card>

      {/* Category breakdown */}
      <Card className={styles.breakdownCard}>
        <h2 className={styles.sectionTitle} style={{ marginBottom: '16px' }}>Activity Breakdown</h2>
        <div className={styles.breakdownGrid}>
          {['Fitness','Mindfulness'].map(cat => {
            const catActs = completed.filter(a => a.category === cat)
            const catMin  = catActs.reduce((s, a) => s + a.duration, 0)
            return (
              <div key={cat} className={styles.breakdownItem}>
                <div className={styles.breakdownTop}>
                  <Badge variant={cat.toLowerCase()}>{cat}</Badge>
                  <span className={styles.breakdownCount}>{catActs.length} sessions</span>
                </div>
                <p className={styles.breakdownStat}>{catMin} minutes</p>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
