import React from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { weeklyProgress } from '../data/mockData'
import { Card, StatCard, PageHeader, ProgressBar, Badge, Button } from '../components/ui/UI'
import { LoadingSpinner, ErrorMessage } from '../components/ui/LoadingError'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import styles from './Dashboard.module.css'

// Returns greeting based on time of day
function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function Dashboard() {
  const {
    activities, activitiesLoading, activitiesError, refetchActivities,
    appointments, appointmentsLoading,
    goals, goalsLoading,
  } = useApp()

  const isLoading = activitiesLoading || appointmentsLoading || goalsLoading

  const today = new Date().toISOString().split('T')[0]
  const todayActivities    = activities.filter(a => a.date === today && a.completed)
  const totalCaloriesToday = todayActivities.reduce((s, a) => s + a.calories, 0)
  const totalMinutesToday  = todayActivities.reduce((s, a) => s + a.duration, 0)

  const upcoming    = appointments.filter(a => a.status === 'upcoming').slice(0, 3)
  const activeGoals = goals.slice(0, 3)

  return (
    <div className={styles.page}>
      <PageHeader
        title={`${getGreeting()}, Tashi Namgay 👋`}
        subtitle={new Date().toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long' })}
      />

      {isLoading && <LoadingSpinner message="Loading your dashboard…" />}

      {activitiesError && !activitiesLoading && (
        <ErrorMessage message={activitiesError} onRetry={refetchActivities} />
      )}

      {!isLoading && !activitiesError && (
        <>
          <section className={styles.statsGrid} aria-label="Today's statistics">
            <StatCard label="Calories Burned" value={totalCaloriesToday} icon="🔥" trend={12} color="var(--clr-accent)" />
            <StatCard label="Active Minutes"  value={totalMinutesToday}  icon="⏱️" trend={8}  color="var(--clr-primary)" />
            <StatCard label="Activities Done" value={todayActivities.length} icon="✅" color="var(--clr-primary-light)" />
            <StatCard label="Upcoming Appts"  value={upcoming.length}   icon="📅" color="#7c3aed" />
          </section>

          <section className={styles.chartSection} aria-label="Weekly activity chart">
            <Card>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Weekly Activity</h2>
                <Badge variant="success">This Week</Badge>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={weeklyProgress} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--clr-border)" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid var(--clr-border)', fontSize: '13px' }} />
                  <Bar dataKey="calories" fill="var(--clr-primary)" radius={[4,4,0,0]} name="Calories" />
                  <Bar dataKey="minutes"  fill="var(--clr-primary-light)" radius={[4,4,0,0]} name="Minutes" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </section>

          <div className={styles.bottomGrid}>
            <section aria-label="Upcoming appointments">
              <Card>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Upcoming Appointments</h2>
                  <Link to="/appointments"><Button variant="ghost">View all</Button></Link>
                </div>
                {upcoming.length === 0 ? (
                  <p className={styles.emptyMsg}>No upcoming appointments.</p>
                ) : (
                  <ul className={styles.apptList}>
                    {upcoming.map(appt => (
                      <li key={appt.id} className={styles.apptItem}>
                        <div className={styles.apptIcon} aria-hidden="true">📅</div>
                        <div>
                          <p className={styles.apptTitle}>{appt.title}</p>
                          <p className={styles.apptMeta}>{appt.doctor} · {appt.date} at {appt.time}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            </section>

            <section aria-label="Goals progress">
              <Card>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Goal Progress</h2>
                  <Link to="/goals"><Button variant="ghost">View all</Button></Link>
                </div>
                <ul className={styles.goalList}>
                  {activeGoals.map(goal => {
                    const pct = Math.round((goal.current / goal.target) * 100)
                    return (
                      <li key={goal.id} className={styles.goalItem}>
                        <div className={styles.goalTop}>
                          <span className={styles.goalTitle}>{goal.title}</span>
                          <span className={styles.goalPct}>{pct}%</span>
                        </div>
                        <ProgressBar value={goal.current} max={goal.target} />
                        <p className={styles.goalMeta}>{goal.current} / {goal.target} {goal.unit}</p>
                      </li>
                    )
                  })}
                </ul>
              </Card>
            </section>
          </div>
        </>
      )}
    </div>
  )
}
