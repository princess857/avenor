// Realtime subscriptions helper
// Subscribes to Supabase Realtime changes for appointments and notifications.
// Only active when Supabase credentials are configured.
// Subscriptions are cleaned up on unmount to avoid memory leaks.
// Sensitive patient information is NOT broadcast to public/unauthorized channels.

import { supabase, isSupabaseConfigured } from '../utils/supabase'

// Subscribe to new/updated appointments for a given doctor.
// callback receives the appointment payload.
export function subscribeToDoctorAppointments(doctorId, callback) {
  if (!isSupabaseConfigured() || !supabase) return () => {}

  const channel = supabase
    .channel(`doctor-appointments-${doctorId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'appointments',
        filter: `doctor_id=eq.${doctorId}`,
      },
      (payload) => callback(payload)
    )
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'appointments',
        filter: `doctor_id=eq.${doctorId}`,
      },
      (payload) => callback(payload)
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}

// Subscribe to new notifications for the current user.
export function subscribeToUserNotifications(userId, callback) {
  if (!isSupabaseConfigured() || !supabase) return () => {}

  const channel = supabase
    .channel(`user-notifications-${userId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => callback(payload)
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}

// Subscribe to new patient registrations (admin only).
export function subscribeToNewPatients(callback) {
  if (!isSupabaseConfigured() || !supabase) return () => {}

  const channel = supabase
    .channel('new-patients')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'patients',
      },
      (payload) => callback(payload)
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}

export default {
  subscribeToDoctorAppointments,
  subscribeToUserNotifications,
  subscribeToNewPatients,
}
