import React, { useState, useMemo } from 'react'
import { useApp } from '../context/AppContext'
import { Card, PageHeader, Badge, Button, EmptyState } from '../components/ui/UI'
import { LoadingSpinner, ErrorMessage } from '../components/ui/LoadingError'
import Modal from '../components/ui/Modal'
import styles from './Appointments.module.css'

// ============================================================
// APPOINTMENTS PAGE — view, book, and cancel appointments
// ============================================================

const specialties = ['General Practice','Physiotherapy','Psychology','Dentistry','Nutrition','Cardiology']

// --- Add Appointment Form ---
function AddAppointmentForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: '', doctor: '', specialty: 'General Practice',
    date: '', time: '', location: ''
  })
  const [errors, setErrors] = useState({})

  const handle = (field) => (e) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  const validate = () => {
    const errs = {}
    if (!form.title.trim())    errs.title    = 'Title is required'
    if (!form.doctor.trim())   errs.doctor   = 'Doctor name is required'
    if (!form.date)            errs.date     = 'Date is required'
    if (!form.time)            errs.time     = 'Time is required'
    if (!form.location.trim()) errs.location = 'Location is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <div className={styles.field}>
        <label htmlFor="appt-title" className={styles.label}>Appointment Title *</label>
        <input id="appt-title"
          className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
          placeholder="e.g. Annual Checkup" value={form.title} onChange={handle('title')} />
        {errors.title && <span className={styles.error}>{errors.title}</span>}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="appt-doctor" className={styles.label}>Doctor *</label>
          <input id="appt-doctor"
            className={`${styles.input} ${errors.doctor ? styles.inputError : ''}`}
            placeholder="Dr. Name" value={form.doctor} onChange={handle('doctor')} />
          {errors.doctor && <span className={styles.error}>{errors.doctor}</span>}
        </div>
        <div className={styles.field}>
          <label htmlFor="appt-spec" className={styles.label}>Specialty</label>
          <select id="appt-spec" className={styles.input} value={form.specialty} onChange={handle('specialty')}>
            {specialties.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="appt-date" className={styles.label}>Date *</label>
          <input id="appt-date" type="date"
            className={`${styles.input} ${errors.date ? styles.inputError : ''}`}
            value={form.date} onChange={handle('date')} />
          {errors.date && <span className={styles.error}>{errors.date}</span>}
        </div>
        <div className={styles.field}>
          <label htmlFor="appt-time" className={styles.label}>Time *</label>
          <input id="appt-time" type="time"
            className={`${styles.input} ${errors.time ? styles.inputError : ''}`}
            value={form.time} onChange={handle('time')} />
          {errors.time && <span className={styles.error}>{errors.time}</span>}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="appt-loc" className={styles.label}>Location *</label>
        <input id="appt-loc"
          className={`${styles.input} ${errors.location ? styles.inputError : ''}`}
          placeholder="Clinic or address" value={form.location} onChange={handle('location')} />
        {errors.location && <span className={styles.error}>{errors.location}</span>}
      </div>

      <div className={styles.formActions}>
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary">Book Appointment</Button>
      </div>
    </form>
  )
}

// --- Single appointment card ---
function AppointmentCard({ appt, onCancel }) {
  return (
    <Card className={styles.apptCard}>
      <div className={styles.apptHeader}>
        <div>
          <p className={styles.apptTitle}>{appt.title}</p>
          <p className={styles.apptDoctor}>{appt.doctor} · {appt.specialty}</p>
        </div>
        <Badge variant={appt.status}>{appt.status}</Badge>
      </div>
      <div className={styles.apptDetails}>
        <span>📅 {appt.date} at {appt.time}</span>
        <span>📍 {appt.location}</span>
      </div>
      {appt.status === 'upcoming' && (
        <Button variant="danger" onClick={() => onCancel(appt.id)} className={styles.cancelBtn}>
          Cancel Appointment
        </Button>
      )}
    </Card>
  )
}

// --- Main Appointments page ---
export default function Appointments() {
  const {
    appointments, appointmentsLoading, appointmentsError,
    refetchAppointments, addAppointment, cancelAppointment
  } = useApp()

  const [filter, setFilter]       = useState('all')
  const [showModal, setShowModal] = useState(false)

  // Filter appointments by selected status tab
  const filtered = useMemo(() => {
    if (filter === 'all') return appointments
    return appointments.filter(a => a.status === filter)
  }, [appointments, filter])

  const handleAdd = (data) => {
    addAppointment(data)
    setShowModal(false)
  }

  const statusTabs = ['all', 'upcoming', 'completed', 'cancelled']

  return (
    <div className={styles.page}>
      <PageHeader
        title="Appointments"
        subtitle={`${appointments.filter(a => a.status === 'upcoming').length} upcoming`}
        action={<Button onClick={() => setShowModal(true)}>+ Book Appointment</Button>}
      />

      {/* Loading state */}
      {appointmentsLoading && <LoadingSpinner message="Loading appointments…" />}

      {/* Error state */}
      {appointmentsError && !appointmentsLoading && (
        <ErrorMessage message={appointmentsError} onRetry={refetchAppointments} />
      )}

      {/* Content */}
      {!appointmentsLoading && !appointmentsError && (
        <>
          {/* Status filter tabs */}
          <div className={styles.tabs} role="tablist">
            {statusTabs.map(tab => (
              <button key={tab} role="tab" aria-selected={filter === tab}
                className={`${styles.tab} ${filter === tab ? styles.tabActive : ''}`}
                onClick={() => setFilter(tab)}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <EmptyState icon="📅" message="No appointments in this category." />
          ) : (
            <ul className={styles.apptList} aria-label="Appointments list">
              {filtered.map(appt => (
                <li key={appt.id}>
                  <AppointmentCard appt={appt} onCancel={cancelAppointment} />
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Book Appointment">
        <AddAppointmentForm onSubmit={handleAdd} onCancel={() => setShowModal(false)} />
      </Modal>
    </div>
  )
}
