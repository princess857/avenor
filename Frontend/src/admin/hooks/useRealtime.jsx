import { useEffect } from 'react'
import {
  subscribeToDoctorAppointments,
  subscribeToUserNotifications,
  subscribeToNewPatients,
} from '../utils/realtime'

// Hook: subscribe to appointments for a specific doctor.
// Returns nothing; callback fires on insert/update.
export function useDoctorAppointmentsRealtime(doctorId, callback) {
  useEffect(() => {
    if (!doctorId || !callback) return undefined
    return subscribeToDoctorAppointments(doctorId, callback)
  }, [doctorId, callback])
}

// Hook: subscribe to notifications for the current user.
export function useUserNotificationsRealtime(userId, callback) {
  useEffect(() => {
    if (!userId || !callback) return undefined
    return subscribeToUserNotifications(userId, callback)
  }, [userId, callback])
}

// Hook: subscribe to new patient registrations (admin only).
export function useNewPatientsRealtime(callback) {
  useEffect(() => {
    if (!callback) return undefined
    return subscribeToNewPatients(callback)
  }, [callback])
}

export default {
  useDoctorAppointmentsRealtime,
  useUserNotificationsRealtime,
  useNewPatientsRealtime,
}
