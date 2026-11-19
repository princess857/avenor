import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { Calendar, Users, User, Building2, CreditCard, Activity, ChevronRight } from 'lucide-react'
import { StatCard } from '../components/StatCard'
import { DataTable } from '../components/DataTable'
import { PatientTrendChart, RevenueChart, StatusChart } from '../components/charts'
import { useSupabaseStats } from '../hooks/useSupabaseStats'
import { useSupabaseResource } from '../hooks/useSupabaseResource'
import {
  demoStats, patientTrendData, appointmentStatusData, revenueData,
  recentAppointments as demoRecentAppointments, patients as demoPatients,
  departments as demoDepartments, activityLog as demoActivityLog,
} from '../data/demoData'

const statusColor = {
  Scheduled: 'bg-[#003B3D]/10 text-[#003B3D] dark:bg-[#54D2C0]/15 dark:text-[#8AE4D9]',
  Completed: 'bg-[#10B981]/10 text-[#10B981]',
  Pending: 'bg-[#F59E0B]/10 text-[#F59E0B]',
  Cancelled: 'bg-[#EF4444]/10 text-[#EF4444]',
}

const dashboardStatQueries = [
  { key: 'totalPatients', table: 'patients', select: '*' },
  { key: 'totalDoctors', table: 'doctors', select: '*' },
  { key: 'totalAppointments', table: 'appointments', select: '*' },
  { key: 'pendingAppointments', table: 'appointments', select: '*', filter: ['status', 'eq', 'pending'] },
  { key: 'completedAppointments', table: 'appointments', select: '*', filter: ['status', 'eq', 'completed'] },
  { key: 'totalDepartments', table: 'departments', select: '*' },
  { key: 'totalStaff', table: 'staff', select: '*' },
]

const dashboardDemoStats = {
  totalPatients: demoStats.totalPatients,
  totalDoctors: demoStats.availableDoctors,
  totalAppointments: demoStats.todayAppointments,
  pendingAppointments: 0,
  completedAppointments: 0,
  totalDepartments: demoDepartments.length,
  totalStaff: demoPatients.length,
}

export default function Dashboard() {
  const { stats, loading: statsLoading, error: statsError } = useSupabaseStats(
    dashboardStatQueries,
    dashboardDemoStats
  )

  const { data: recentAppointments, loading: apptLoading, error: apptError } = useSupabaseResource(
    'appointments',
    demoRecentAppointments,
    { orderBy: 'appointment_date', ascending: false, limit: 5 }
  )

  const { data: patients, loading: patientsLoading } = useSupabaseResource(
    'patients',
    demoPatients,
    { orderBy: 'created_at', ascending: false, limit: 4 }
  )

  const { data: departments, loading: deptLoading } = useSupabaseResource(
    'departments',
    demoDepartments,
    { orderBy: 'name' }
  )

  const { data: activityLog, loading: activityLoading } = useSupabaseResource(
    'activity_logs',
    demoActivityLog,
    { orderBy: 'created_at', ascending: false, limit: 10 }
  )

  const loading = statsLoading || apptLoading || patientsLoading || deptLoading || activityLoading
  const error = statsError || apptError

  const totalPatientsVal = stats.totalPatients ?? demoStats.totalPatients
  const totalDoctorsVal = stats.totalDoctors ?? demoStats.availableDoctors
  const totalAppointmentsVal = stats.totalAppointments ?? demoStats.todayAppointments

  const statCards = [
    { title: 'Total Patients', value: totalPatientsVal, trend: +5.6, icon: Users, subtitle: (demoStats.previousPeriod.totalPatients).toLocaleString() + ' last period' },
    { title: "Today's Appointments", value: totalAppointmentsVal, trend: +16.7, icon: Calendar, subtitle: (demoStats.previousPeriod.todayAppointments).toLocaleString() + ' last period' },
    { title: 'Available Doctors', value: totalDoctorsVal, trend: +7.7, icon: User, subtitle: (demoStats.previousPeriod.availableDoctors).toLocaleString() + ' last period' },
    { title: 'Total Revenue', value: `₦${demoStats.totalRevenue.toLocaleString()}`, trend: +9.8, icon: CreditCard, subtitle: '₦' + (demoStats.previousPeriod.totalRevenue).toLocaleString() + ' last period' },
  ]

  const statusBadge = (status) => (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusColor[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  )

  const normalizedAppointments = useMemo(() => {
    if (!recentAppointments) return []
    return recentAppointments.map((a) => ({
      id: a.id,
      patient: a.patient_name || a.patient || 'Unknown Patient',
      doctor: a.doctor_name || a.doctor || 'Unknown Doctor',
      specialty: a.specialty || 'General',
      date: a.appointment_date || '',
      time: a.appointment_time || '',
      status: a.status || 'Scheduled',
    }))
  }, [recentAppointments])

  const normalizedDepartments = useMemo(() => {
    if (!departments) return []
    return departments.map((d) => ({
      id: d.id,
      name: d.name,
      head: d.head_doctor_name || d.head || 'TBD',
      doctors: d.doctor_count || 0,
      patients: d.patient_count || 0,
      revenue: d.revenue || 0,
      status: d.status || 'Active',
    }))
  }, [departments])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#0F172A] dark:text-white">Dashboard</h1>
            <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Welcome back, Administrator. Here's what's happening at Avenor today.</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <StatCard key={i} title="Loading" value="—" trend={0} icon={Calendar} />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#0F172A] dark:text-white">Dashboard</h1>
            <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Welcome back, Administrator. Here's what's happening at Avenor today.</p>
          </div>
        </div>
        <div className="admin-glass-surface rounded-2xl border border-[#E2E8F0] dark:border-[#1E3A3D] p-6">
          <p className="text-[#EF4444] text-sm">{error}</p>
          <p className="text-[#64748B] dark:text-[#94A3B8] text-sm mt-2">Using demonstration data instead.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#0F172A] dark:text-white">Dashboard</h1>
          <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Welcome back, Administrator. Here's what's happening at Avenor today.</p>
        </div>
        <div className="flex gap-2">
          <button className="admin-glass-control px-4 py-2 rounded-xl border text-sm font-medium transition hover:bg-gray-50 dark:hover:bg-[#163A3F]">
            Export Report
          </button>
          <button className="px-4 py-2 rounded-xl bg-[#003B3D] text-white text-sm font-medium hover:bg-[#082B3B] transition">
            Quick Actions
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, i) => (
          <StatCard key={i} title={card.title} value={card.value} trend={card.trend} icon={card.icon} subtitle={card.subtitle} />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="admin-glass-surface min-w-0 lg:col-span-2 rounded-2xl border border-[#E2E8F0] dark:border-[#1E3A3D] p-6">
          <h2 className="font-serif text-lg font-bold text-[#0F172A] dark:text-white mb-4 flex items-center gap-2">
            <Activity size={18} className="text-[#003B3D]" /> Patient &amp; Appointment Trends
          </h2>
          <PatientTrendChart data={patientTrendData} />
        </div>
        <div className="admin-glass-surface min-w-0 rounded-2xl border border-[#E2E8F0] dark:border-[#1E3A3D] p-6">
          <h2 className="font-serif text-lg font-bold text-[#0F172A] dark:text-white mb-4 flex items-center gap-2">
            <Calendar size={18} className="text-[#003B3D]" /> Appointment Status
          </h2>
          <StatusChart data={appointmentStatusData} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="admin-glass-surface min-w-0 rounded-2xl border border-[#E2E8F0] dark:border-[#1E3A3D] p-6">
          <h2 className="font-serif text-lg font-bold text-[#0F172A] dark:text-white mb-4 flex items-center gap-2">
            <CreditCard size={18} className="text-[#003B3D]" /> Revenue Overview
          </h2>
          <RevenueChart data={revenueData} />
        </div>
        <div className="admin-glass-surface min-w-0 lg:col-span-2 rounded-2xl border border-[#E2E8F0] dark:border-[#1E3A3D] p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#0F172A] dark:text-white">Recent Appointments</h2>
              <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Latest scheduled and completed patient visits.</p>
            </div>
            <Link to="/admin/appointments" className="text-sm font-medium text-[#003B3D] hover:text-[#082B3B] flex items-center gap-1 transition">
              View all <ChevronRight size={14} />
            </Link>
          </div>
          <DataTable
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'patient', label: 'Patient' },
              { key: 'doctor', label: 'Doctor' },
              { key: 'specialty', label: 'Specialty' },
              { key: 'date', label: 'Date' },
              { key: 'time', label: 'Time' },
              { key: 'status', label: 'Status', render: (val) => statusBadge(val) },
            ]}
            data={normalizedAppointments}
            pageSize={5}
            searchable={false}
            emptyMessage="No recent appointments"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="admin-glass-surface min-w-0 rounded-2xl border border-[#E2E8F0] dark:border-[#1E3A3D] p-6">
          <h2 className="font-serif text-lg font-bold text-[#0F172A] dark:text-white mb-4 flex items-center gap-2">
            <Users size={18} className="text-[#003B3D]" /> Recent Patient Registrations
          </h2>
          <div className="space-y-3">
            {(patients || []).slice(0, 4).map((p) => (
              <div key={p.id} className="admin-glass-sub-surface flex items-center gap-3 p-3 rounded-xl border">
                <div className="w-10 h-10 rounded-full bg-[#003B3D]/10 text-[#003B3D] dark:bg-[#54D2C0]/15 dark:text-[#8AE4D9] flex items-center justify-center text-sm font-semibold">
                  {p.name ? p.name.charAt(0) : '?'}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#0F172A] dark:text-white">{p.name || 'Unknown Patient'}</p>
                  <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">{p.id} • {p.gender}, {p.age}</p>
                </div>
                <span className="px-2 py-1 rounded text-[10px] font-medium bg-[#10B981]/10 text-[#10B981]">{p.status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="admin-glass-surface min-w-0 lg:col-span-2 rounded-2xl border border-[#E2E8F0] dark:border-[#1E3A3D] p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#0F172A] dark:text-white flex items-center gap-2">
                <Building2 size={18} className="text-[#003B3D]" /> Department Performance
              </h2>
              <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Patient load and revenue by department.</p>
            </div>
          </div>
          <DataTable
            columns={[
              { key: 'name', label: 'Department' },
              { key: 'head', label: 'Head of Department' },
              { key: 'doctors', label: 'Doctors' },
              { key: 'patients', label: 'Patients' },
              { key: 'revenue', label: 'Revenue', render: (v) => '₦' + v.toLocaleString() },
              { key: 'status', label: 'Status', render: (val) => <span className="px-2 py-1 rounded text-[10px] font-medium bg-[#10B981]/10 text-[#10B981]">{val}</span> },
            ]}
            data={normalizedDepartments}
            pageSize={5}
            searchable={false}
            emptyMessage="No departments"
          />
        </div>
      </div>

      <div className="admin-glass-surface rounded-2xl border border-[#E2E8F0] dark:border-[#1E3A3D] p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h2 className="font-serif text-lg font-bold text-[#0F172A] dark:text-white flex items-center gap-2">
              <Activity size={18} className="text-[#003B3D]" /> Recent Administrative Activity
            </h2>
            <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Audit trail of recent actions taken in the admin dashboard.</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="admin-data-table w-full min-w-[36rem] text-sm divide-y divide-[#E2E8F0] dark:divide-[#1E3A3D]">
            <thead className="bg-gray-50 dark:bg-[#163A3F]">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">Action</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">User</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">Details</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">Time</th>
              </tr>
            </thead>
            <tbody>
              {(activityLog || []).map((a) => (
                <tr key={a.action + a.time} className="bg-white dark:bg-[#0F2B30]">
                  <td className="px-4 py-3 text-gray-900 dark:text-white">{a.action}</td>
                  <td className="px-4 py-3 text-gray-900 dark:text-white">{a.user}</td>
                  <td className="px-4 py-3 text-[#64748B] dark:text-[#94A3B8]">{a.details}</td>
                  <td className="px-4 py-3 text-[#64748B] dark:text-[#94A3B8] text-sm">{a.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
