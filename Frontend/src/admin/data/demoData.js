import { format } from 'date-fns'

const today = new Date()
const daysAgo = (n) => format(Date.now() - n * 86400000, 'yyyy-MM-dd')

export const demoStats = {
  totalPatients: 1247,
  todayAppointments: 28,
  availableDoctors: 14,
  totalRevenue: 485230,
  previousPeriod: {
    totalPatients: 1180,
    todayAppointments: 24,
    availableDoctors: 13,
    totalRevenue: 442100,
  },
}

export const patientTrendData = [
  { month: 'Jan', patients: 85, appointments: 120 },
  { month: 'Feb', patients: 102, appointments: 145 },
  { month: 'Mar', patients: 130, appointments: 168 },
  { month: 'Apr', patients: 115, appointments: 152 },
  { month: 'May', patients: 142, appointments: 189 },
  { month: 'Jun', patients: 168, appointments: 214 },
]

export const appointmentStatusData = [
  { name: 'Scheduled', value: 45 },
  { name: 'Completed', value: 120 },
  { name: 'Pending', value: 30 },
  { name: 'Cancelled', value: 15 },
]

export const revenueData = [
  { month: 'Jan', revenue: 32000 },
  { month: 'Feb', revenue: 41000 },
  { month: 'Mar', revenue: 52000 },
  { month: 'Apr', revenue: 48000 },
  { month: 'May', revenue: 61000 },
  { month: 'Jun', revenue: 74000 },
]

export const recentAppointments = [
  { id: 'APT-001', patient: 'James Okonkwo', doctor: 'Dr. Sarah Adebayo', specialty: 'Cardiology', date: daysAgo(1), time: '09:00 AM', status: 'Scheduled', type: 'Consultation' },
  { id: 'APT-002', patient: 'Grace Nkosi', doctor: 'Dr. Michael Chukwu', specialty: 'Paediatrics', date: daysAgo(1), time: '10:30 AM', status: 'Completed', type: 'Check-up' },
  { id: 'APT-003', patient: 'Samuel Adeyemi', doctor: 'Dr. Fatima Ibrahim', specialty: 'Gynaecology', date: daysAgo(2), time: '11:00 AM', status: 'Pending', type: 'Consultation' },
  { id: 'APT-004', patient: 'Chioma Eze', doctor: 'Dr. David Okafor', specialty: 'General Surgery', date: daysAgo(3), time: '02:15 PM', status: 'Completed', type: 'Follow-up' },
  { id: 'APT-005', patient: 'Khalid Hassan', doctor: 'Dr. Sarah Adebayo', specialty: 'Cardiology', date: daysAgo(3), time: '04:00 PM', status: 'Cancelled', type: 'Consultation' },
  { id: 'APT-006', patient: 'Aisha Bello', doctor: 'Dr. Michael Chukwu', specialty: 'Paediatrics', date: daysAgo(4), time: '09:45 AM', status: 'Scheduled', type: 'Vaccination' },
  { id: 'APT-007', patient: 'Tunde Ajala', doctor: 'Dr. David Okafor', specialty: 'General Surgery', date: daysAgo(5), time: '11:30 AM', status: 'Scheduled', type: 'Pre-op Assessment' },
  { id: 'APT-008', patient: 'Zainab Musa', doctor: 'Dr. Fatima Ibrahim', specialty: 'Gynaecology', date: daysAgo(5), time: '03:00 PM', status: 'Completed', type: 'Prenatal Visit' },
]

export const upcomingAppointments = [
  { id: 'APT-009', patient: 'Emeka Nwosu', doctor: 'Dr. Sarah Adebayo', specialty: 'Cardiology', date: format(Date.now() + 86400000, 'yyyy-MM-dd'), time: '08:30 AM', status: 'Scheduled' },
  { id: 'APT-010', patient: 'Blessing Peter', doctor: 'Dr. Michael Chukwu', specialty: 'Paediatrics', date: format(Date.now() + 86400000, 'yyyy-MM-dd'), time: '10:00 AM', status: 'Scheduled' },
  { id: 'APT-011', patient: 'Danjuma Ali', doctor: 'Dr. Fatima Ibrahim', specialty: 'Gynaecology', date: format(Date.now() + 172800000, 'yyyy-MM-dd'), time: '02:00 PM', status: 'Scheduled' },
]

export const patients = [
  { id: 'PAT-001', name: 'James Okonkwo', age: 45, gender: 'Male', phone: '+234 800 123 4567', email: 'j.okonkwo@email.com', bloodGroup: 'O+', registrationDate: daysAgo(30), lastVisit: daysAgo(5), status: 'Active' },
  { id: 'PAT-002', name: 'Grace Nkosi', age: 32, gender: 'Female', phone: '+234 800 234 5678', email: 'g.nkosi@email.com', bloodGroup: 'A-', registrationDate: daysAgo(45), lastVisit: daysAgo(1), status: 'Active' },
  { id: 'PAT-003', name: 'Samuel Adeyemi', age: 28, gender: 'Male', phone: '+234 800 345 6789', email: 's.adeyemi@email.com', bloodGroup: 'B+', registrationDate: daysAgo(60), lastVisit: daysAgo(12), status: 'Active' },
  { id: 'PAT-004', name: 'Chioma Eze', age: 39, gender: 'Female', phone: '+234 800 456 7890', email: 'c.eze@email.com', bloodGroup: 'AB+', registrationDate: daysAgo(90), lastVisit: daysAgo(3), status: 'Active' },
  { id: 'PAT-005', name: 'Khalid Hassan', age: 52, gender: 'Male', phone: '+234 800 567 8901', email: 'k.hassan@email.com', bloodGroup: 'O-', registrationDate: daysAgo(15), lastVisit: daysAgo(8), status: 'Active' },
  { id: 'PAT-006', name: 'Aisha Bello', age: 26, gender: 'Female', phone: '+234 800 678 9012', email: 'a.bello@email.com', bloodGroup: 'A+', registrationDate: daysAgo(20), lastVisit: daysAgo(2), status: 'Active' },
  { id: 'PAT-007', name: 'Tunde Ajala', age: 41, gender: 'Male', phone: '+234 800 789 0123', email: 't.ajala@email.com', bloodGroup: 'B-', registrationDate: daysAgo(120), lastVisit: daysAgo(18), status: 'Inactive' },
  { id: 'PAT-008', name: 'Zainab Musa', age: 30, gender: 'Female', phone: '+234 800 890 1234', email: 'z.musa@email.com', bloodGroup: 'O+', registrationDate: daysAgo(35), lastVisit: daysAgo(5), status: 'Active' },
]

export const doctors = [
  { id: 'DOC-001', name: 'Dr. Sarah Adebayo', specialty: 'Cardiology', department: 'Cardiology', phone: '+234 800 111 2222', email: 's.adebayo@avenorhospital.com', status: 'Available', rating: 4.9, patients: 128, experience: '12 years' },
  { id: 'DOC-002', name: 'Dr. Michael Chukwu', specialty: 'Paediatrics', department: 'Paediatrics', phone: '+234 800 111 3333', email: 'm.chukwu@avenorhospital.com', status: 'Available', rating: 4.8, patients: 95, experience: '9 years' },
  { id: 'DOC-003', name: 'Dr. Fatima Ibrahim', specialty: 'Gynaecology', department: 'Obstetrics & Gynaecology', phone: '+234 800 111 4444', email: 'f.ibrahim@avenorhospital.com', status: 'Busy', rating: 4.7, patients: 142, experience: '11 years' },
  { id: 'DOC-004', name: 'Dr. David Okafor', specialty: 'General Surgery', department: 'Surgery', phone: '+234 800 111 5555', email: 'd.okafor@avenorhospital.com', status: 'Available', rating: 4.9, patients: 87, experience: '15 years' },
  { id: 'DOC-005', name: 'Dr. Amina Yusuf', specialty: 'Dermatology', department: 'Dermatology', phone: '+234 800 111 6666', email: 'a.yusuf@avenorhospital.com', status: 'Off Duty', rating: 4.6, patients: 63, experience: '7 years' },
  { id: 'DOC-006', name: 'Dr. Emeka Nwachukwu', specialty: 'Orthopaedics', department: 'Orthopaedics', phone: '+234 800 111 7777', email: 'e.nwachukwu@avenorhospital.com', status: 'Available', rating: 4.8, patients: 71, experience: '10 years' },
]

export const departments = [
  { id: 'DEP-001', name: 'Cardiology', head: 'Dr. Sarah Adebayo', doctors: 4, patients: 340, revenue: 125000, status: 'Active' },
  { id: 'DEP-002', name: 'Paediatrics', head: 'Dr. Michael Chukwu', doctors: 3, patients: 210, revenue: 89000, status: 'Active' },
  { id: 'DEP-003', name: 'Obstetrics & Gynaecology', head: 'Dr. Fatima Ibrahim', doctors: 5, patients: 280, revenue: 110000, status: 'Active' },
  { id: 'DEP-004', name: 'General Surgery', head: 'Dr. David Okafor', doctors: 6, patients: 190, revenue: 145000, status: 'Active' },
  { id: 'DEP-005', name: 'Dermatology', head: 'Dr. Amina Yusuf', doctors: 2, patients: 95, revenue: 56000, status: 'Active' },
  { id: 'DEP-006', name: 'Orthopaedics', head: 'Dr. Emeka Nwachukwu', doctors: 3, patients: 132, revenue: 98000, status: 'Active' },
]

export const staff = [
  { id: 'STF-001', name: 'Blessing Peter', role: 'Head Nurse', department: 'Cardiology', phone: '+234 800 222 3333', email: 'b.peter@avenorhospital.com', status: 'Active', joinDate: daysAgo(200) },
  { id: 'STF-002', name: 'Chinedu Okafor', role: 'Receptionist', department: 'Front Desk', phone: '+234 800 222 4444', email: 'c.okafor@avenorhospital.com', status: 'Active', joinDate: daysAgo(180) },
  { id: 'STF-003', name: 'Fatima Sanusi', role: 'Lab Technician', department: 'Laboratory', phone: '+234 800 222 5555', email: 'f.sanusi@avenorhospital.com', status: 'Active', joinDate: daysAgo(150) },
  { id: 'STF-004', name: 'Ibrahim Musa', role: 'Pharmacist', department: 'Pharmacy', phone: '+234 800 222 6666', email: 'i.musa@avenorhospital.com', status: 'On Leave', joinDate: daysAgo(120) },
  { id: 'STF-005', name: 'Nkechi Okoro', role: 'Radiographer', department: 'Radiology', phone: '+234 800 222 7777', email: 'n.okoro@avenorhospital.com', status: 'Active', joinDate: daysAgo(100) },
  { id: 'STF-006', name: 'Usman Garba', role: 'Administrator', department: 'Administration', phone: '+234 800 222 8888', email: 'u.garba@avenorhospital.com', status: 'Active', joinDate: daysAgo(300) },
]

export const services = [
  { id: 'SRV-001', name: 'General Medical Consultation', category: 'Consultation', description: 'Routine check-up and general health assessment.', price: 15000, duration: '30 mins', status: 'Active' },
  { id: 'SRV-002', name: 'Cardiac Screening', category: 'Cardiology', description: 'Comprehensive cardiovascular health evaluation.', price: 45000, duration: '45 mins', status: 'Active' },
  { id: 'SRV-003', name: 'Paediatric Vaccination', category: 'Paediatrics', description: 'Childhood immunisation and vaccination schedule.', price: 25000, duration: '20 mins', status: 'Active' },
  { id: 'SRV-004', name: 'Prenatal Care Package', category: 'Obstetrics', description: 'Complete antenatal care for expectant mothers.', price: 120000, duration: '60 mins', status: 'Active' },
  { id: 'SRV-005', name: 'General Surgery Consultation', category: 'Surgery', description: 'Surgical assessment and pre-operative evaluation.', price: 60000, duration: '40 mins', status: 'Active' },
  { id: 'SRV-006', name: 'Dermatology Assessment', category: 'Dermatology', description: 'Skin condition diagnosis and treatment planning.', price: 35000, duration: '30 mins', status: 'Active' },
  { id: 'SRV-007', name: 'Emergency Care', category: 'Emergency', description: '24/7 emergency medical attention and stabilisation.', price: 80000, duration: 'Varies', status: 'Active' },
  { id: 'SRV-008', name: 'Physiotherapy Session', category: 'Rehabilitation', description: 'Post-injury rehabilitation and physical therapy.', price: 30000, duration: '45 mins', status: 'Active' },
]

export const billing = [
  { id: 'INV-001', patient: 'James Okonkwo', amount: 45000, status: 'Paid', date: daysAgo(10), dueDate: daysAgo(5), service: 'Cardiac Screening' },
  { id: 'INV-002', patient: 'Grace Nkosi', amount: 25000, status: 'Pending', date: daysAgo(8), dueDate: daysAgo(2), service: 'Paediatric Vaccination' },
  { id: 'INV-003', patient: 'Samuel Adeyemi', amount: 60000, status: 'Partial', date: daysAgo(15), dueDate: daysAgo(10), service: 'General Surgery Consultation' },
  { id: 'INV-004', patient: 'Chioma Eze', amount: 120000, status: 'Paid', date: daysAgo(20), dueDate: daysAgo(15), service: 'Prenatal Care Package' },
  { id: 'INV-005', patient: 'Khalid Hassan', amount: 35000, status: 'Pending', date: daysAgo(5), dueDate: today.toISOString().split('T')[0], service: 'Dermatology Assessment' },
  { id: 'INV-006', patient: 'Aisha Bello', amount: 15000, status: 'Paid', date: daysAgo(3), dueDate: daysAgo(1), service: 'General Medical Consultation' },
  { id: 'INV-007', patient: 'Tunde Ajala', amount: 80000, status: 'Overdue', date: daysAgo(30), dueDate: daysAgo(25), service: 'Emergency Care' },
  { id: 'INV-008', patient: 'Zainab Musa', amount: 30000, status: 'Paid', date: daysAgo(7), dueDate: daysAgo(3), service: 'Physiotherapy Session' },
]

export const notifications = [
  { id: 'NOT-001', title: 'New Appointment Request', message: 'James Okonkwo requested a cardiology consultation for tomorrow.', time: '10 minutes ago', read: false, type: 'appointment' },
  { id: 'NOT-002', title: 'Payment Received', message: 'Payment of ₦45,000 received from Chioma Eze.', time: '2 hours ago', read: false, type: 'billing' },
  { id: 'NOT-003', title: 'Doctor On Leave', message: 'Dr. Amina Yusuf is on leave today. Appointments rescheduled.', time: '5 hours ago', read: true, type: 'staff' },
  { id: 'NOT-004', title: 'System Maintenance', message: 'Scheduled maintenance on Sunday 2:00 AM - 4:00 AM.', time: '1 day ago', read: true, type: 'system' },
  { id: 'NOT-005', title: 'New Patient Registration', message: 'Emeka Nwosu registered as a new patient.', time: '2 days ago', read: true, type: 'patient' },
]

export const websiteContent = [
  { section: 'Home', field: 'Hero Title', currentValue: 'Exceptional Healthcare, Close to You', editable: true },
  { section: 'Home', field: 'Hero Subtitle', currentValue: 'Avenor International Hospital provides compassionate, patient-centred medical care.', editable: true },
  { section: 'About', field: 'About Description', currentValue: 'Avenor International Hospital is committed to delivering quality, compassionate and patient-centred healthcare.', editable: true },
  { section: 'Contact', field: 'Phone Number', currentValue: '+234 800 000 0000', editable: true },
  { section: 'Contact', field: 'Email Address', currentValue: 'info@avenorhospital.com', editable: true },
  { section: 'Contact', field: 'Address', currentValue: 'Plot 12, Independence Layout, Nigeria.', editable: true },
]

export const activityLog = [
  { action: 'Appointment Created', user: 'Admin User', time: '10 minutes ago', details: 'APT-009 for Emeka Nwosu' },
  { action: 'Patient Updated', user: 'Admin User', time: '45 minutes ago', details: 'Grace Nkosi contact info' },
  { action: 'Invoice Paid', user: 'Admin User', time: '2 hours ago', details: 'INV-004 - Chioma Eze' },
  { action: 'Doctor Status Changed', user: 'Admin User', time: '5 hours ago', details: 'Dr. Fatima Ibrahim set to Busy' },
  { action: 'New Staff Added', user: 'Admin User', time: '1 day ago', details: 'Blessing Peter - Head Nurse' },
]
