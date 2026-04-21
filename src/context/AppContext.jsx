import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { fetchActivities, fetchAppointments, fetchGoals } from '../data/dataService'

// ============================================================
// APP CONTEXT — global state + async data loading
// All data is fetched asynchronously on mount (simulating a real API)
// Components get: data, loading flag, error message, and action functions
// ============================================================

const AppContext = createContext(null)

export function AppProvider({ children }) {

  // ---- Activities ----
  const [activities, setActivities]     = useState([])
  const [activitiesLoading, setActLoad] = useState(true)
  const [activitiesError, setActError]  = useState(null)

  // ---- Appointments ----
  const [appointments, setAppointments]    = useState([])
  const [appointmentsLoading, setApptLoad] = useState(true)
  const [appointmentsError, setApptError]  = useState(null)

  // ---- Goals ----
  const [goals, setGoals]           = useState([])
  const [goalsLoading, setGoalLoad] = useState(true)
  const [goalsError, setGoalError]  = useState(null)

  // ---- Toast notifications ----
  const [toast, setToast] = useState(null)

  // Show a toast for 3 seconds then auto-dismiss
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  // ---- Async fetch on mount ----
  // useEffect with empty deps [] = runs once when the app first loads
  useEffect(() => {
    // Load activities
    setActLoad(true)
    fetchActivities()
      .then(data => { setActivities(data); setActLoad(false) })
      .catch(err  => { setActError(err.message); setActLoad(false) })

    // Load appointments
    setApptLoad(true)
    fetchAppointments()
      .then(data => { setAppointments(data); setApptLoad(false) })
      .catch(err  => { setApptError(err.message); setApptLoad(false) })

    // Load goals
    setGoalLoad(true)
    fetchGoals()
      .then(data => { setGoals(data); setGoalLoad(false) })
      .catch(err  => { setGoalError(err.message); setGoalLoad(false) })
  }, [])

  // ---- Refetch helpers (for "Try Again" button on errors) ----
  const refetchActivities = useCallback(() => {
    setActLoad(true); setActError(null)
    fetchActivities()
      .then(data => { setActivities(data); setActLoad(false) })
      .catch(err  => { setActError(err.message); setActLoad(false) })
  }, [])

  const refetchAppointments = useCallback(() => {
    setApptLoad(true); setApptError(null)
    fetchAppointments()
      .then(data => { setAppointments(data); setApptLoad(false) })
      .catch(err  => { setApptError(err.message); setApptLoad(false) })
  }, [])

  // ---- Activity actions ----
  const toggleActivity = useCallback((id) => {
    setActivities(prev =>
      prev.map(a => a.id === id ? { ...a, completed: !a.completed } : a)
    )
    showToast('Activity updated!', 'success')
  }, [showToast])

  const addActivity = useCallback((activity) => {
    const newActivity = { ...activity, id: Date.now(), completed: false }
    setActivities(prev => [newActivity, ...prev])
    showToast('Activity logged!', 'success')
  }, [showToast])

  // ---- Appointment actions ----
  const addAppointment = useCallback((appt) => {
    const newAppt = { ...appt, id: Date.now(), status: 'upcoming' }
    setAppointments(prev => [newAppt, ...prev])
    showToast('Appointment booked!', 'success')
  }, [showToast])

  const cancelAppointment = useCallback((id) => {
    setAppointments(prev =>
      prev.map(a => a.id === id ? { ...a, status: 'cancelled' } : a)
    )
    showToast('Appointment cancelled.', 'error')
  }, [showToast])

  // ---- Goal actions ----
  const addGoal = useCallback((goal) => {
    setGoals(prev => [{ ...goal, id: Date.now() }, ...prev])
    showToast('Goal added!', 'success')
  }, [showToast])

  // Expose all state + actions to consuming components
  const value = {
    activities, activitiesLoading, activitiesError,
    refetchActivities, toggleActivity, addActivity,
    appointments, appointmentsLoading, appointmentsError,
    refetchAppointments, addAppointment, cancelAppointment,
    goals, goalsLoading, goalsError, addGoal,
    toast, showToast,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// Custom hook — components call useApp() to get context
export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}
