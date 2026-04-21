// ============================================================
// MOCK DATA — simulates what a real API would return
// In production, replace these with fetch() calls
// ============================================================

// ---- Wellness Activities ----
export const activitiesData = [
  { id: 1, name: 'Morning Yoga',      category: 'Fitness',    duration: 30, calories: 120, date: '2026-04-14', completed: true,  icon: '🧘' },
  { id: 2, name: '5K Run',            category: 'Fitness',    duration: 28, calories: 310, date: '2026-04-14', completed: true,  icon: '🏃' },
  { id: 3, name: 'Meditation',        category: 'Mindfulness',duration: 15, calories: 0,   date: '2026-04-14', completed: true,  icon: '🧠' },
  { id: 4, name: 'Strength Training', category: 'Fitness',    duration: 45, calories: 280, date: '2026-04-13', completed: true,  icon: '💪' },
  { id: 5, name: 'Cycling',           category: 'Fitness',    duration: 60, calories: 420, date: '2026-04-13', completed: true,  icon: '🚴' },
  { id: 6, name: 'Journalling',       category: 'Mindfulness',duration: 20, calories: 0,   date: '2026-04-13', completed: true,  icon: '📓' },
  { id: 7, name: 'Swimming',          category: 'Fitness',    duration: 40, calories: 350, date: '2026-04-12', completed: true,  icon: '🏊' },
  { id: 8, name: 'Evening Walk',      category: 'Fitness',    duration: 25, calories: 100, date: '2026-04-15', completed: false, icon: '🚶' },
  { id: 9, name: 'Breathwork',        category: 'Mindfulness',duration: 10, calories: 0,   date: '2026-04-15', completed: false, icon: '🌬️' },
]

// ---- Appointments ----
export const appointmentsData = [
  { id: 1, title: 'GP Checkup',         doctor: 'Dr. Sarah Chen',     specialty: 'General Practice', date: '2026-04-18', time: '09:30', status: 'upcoming', location: 'City Health Clinic' },
  { id: 2, title: 'Physio Session',     doctor: 'Dr. Mark Torres',    specialty: 'Physiotherapy',    date: '2026-04-20', time: '11:00', status: 'upcoming', location: 'FitPhysio Centre' },
  { id: 3, title: 'Mental Health Check',doctor: 'Dr. Priya Nair',     specialty: 'Psychology',       date: '2026-04-22', time: '14:00', status: 'upcoming', location: 'Mindwell Clinic' },
  { id: 4, title: 'Dental Cleaning',    doctor: 'Dr. James White',    specialty: 'Dentistry',        date: '2026-03-30', time: '10:00', status: 'completed',location: 'SmileBright Dental' },
  { id: 5, title: 'Blood Work',         doctor: 'Dr. Sarah Chen',     specialty: 'General Practice', date: '2026-03-20', time: '08:00', status: 'completed',location: 'City Health Clinic' },
]

// ---- Weekly progress data for the chart ----
export const weeklyProgress = [
  { day: 'Mon', calories: 310, minutes: 40, mood: 7 },
  { day: 'Tue', calories: 420, minutes: 60, mood: 8 },
  { day: 'Wed', calories: 0,   minutes: 15, mood: 6 },
  { day: 'Thu', calories: 350, minutes: 50, mood: 7 },
  { day: 'Fri', calories: 430, minutes: 75, mood: 9 },
  { day: 'Sat', calories: 280, minutes: 45, mood: 8 },
  { day: 'Sun', calories: 100, minutes: 25, mood: 7 },
]

// ---- Goals ----
export const goalsData = [
  { id: 1, title: 'Exercise 5x per week',   target: 5,   current: 3, unit: 'sessions', category: 'Fitness'    },
  { id: 2, title: 'Burn 2000 kcal/week',    target: 2000,current: 1580, unit: 'kcal', category: 'Fitness'    },
  { id: 3, title: 'Meditate daily',          target: 7,   current: 5, unit: 'days',    category: 'Mindfulness'},
  { id: 4, title: 'Drink 2L water/day',      target: 14,  current: 9, unit: 'days met',category: 'Nutrition'  },
]

// ---- Activity categories for filter dropdown ----
export const categories = ['All', 'Fitness', 'Mindfulness', 'Nutrition']
