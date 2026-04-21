// ============================================================
// DATA SERVICE — simulates real async API calls
// In production: replace simulateFetch() with actual fetch()
// All functions return a Promise so components handle loading/error states
// ============================================================

import {
  activitiesData,
  appointmentsData,
  goalsData,
  weeklyProgress,
} from './mockData'

// Simulates network delay (200–600ms) like a real API call
// Pass shouldFail=true to test error handling
function simulateFetch(data, delay = 400, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Failed to load data. Please try again.'))
      } else {
        resolve(data)
      }
    }, delay)
  })
}

// Fetch all activities
export async function fetchActivities() {
  return simulateFetch(activitiesData, 500)
}

// Fetch all appointments
export async function fetchAppointments() {
  return simulateFetch(appointmentsData, 400)
}

// Fetch goals
export async function fetchGoals() {
  return simulateFetch(goalsData, 350)
}

// Fetch weekly progress data for charts
export async function fetchWeeklyProgress() {
  return simulateFetch(weeklyProgress, 300)
}
