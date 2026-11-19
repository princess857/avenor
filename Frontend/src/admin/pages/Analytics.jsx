import { useState } from 'react'
import { BarChart3, Users, Calendar, CreditCard, Clock, FileText } from 'lucide-react'
import { StatCard } from '../components/StatCard'
import { PatientTrendChart, RevenueChart, StatusChart } from '../components/charts'
import { useSupabaseStats } from '../hooks/useSupabaseStats'
import {
  patientTrendData, revenueData, appointmentStatusData,
} from '../data/demoData'

const analyticsStatQueries = [
  { key: 'newPatients', table: 'patients', select: '*' },
  { key: 'appointments', table: 'appointments', select: '*' },
]

const analyticsDemoStats = { newPatients: 1247, appointments: 2840 }

export default function Analytics() {
  const [dateRange, setDateRange] = useState('30d')
  const [metricFilter, setMetricFilter] = useState('All')

  const { stats, loading, error } = useSupabaseStats(analyticsStatQueries, analyticsDemoStats)

  const ranges = ['7d', '30d', '90d', '1y']
  const metrics = ['All', 'Patients', 'Appointments', 'Revenue']

  const newPatientsVal = stats?.newPatients ?? 1247
  const appointmentsVal = stats?.appointments ?? 2840

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#0F172A] dark:text-white">Analytics &amp; Reports</h1>
            <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Track hospital performance and generate reports.</p>
          </div>
        </div>
        <div className="flex gap-4 md:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <StatCard key={i} title="Loading" value="—" trend={0} icon={Users} />
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
            <h1 className="font-serif text-2xl font-bold text-[#0F172A] dark:text-white">Analytics &amp; Reports</h1>
            <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Track hospital performance and generate reports.</p>
          </div>
        </div>
        <div className="bg-white dark:bg-[#0F2B30] rounded-2xl border border-[#E2E8F0] dark:border-[#1E3A3D] p-6 shadow-sm">
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
          <h1 className="font-serif text-2xl font-bold text-[#0F172A] dark:text-white">Analytics &amp; Reports</h1>
          <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Track hospital performance and generate reports.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto justify-end">
          <div className="flex gap-2">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] bg-gray-50 dark:bg-[#163A3F] text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#003B3D] transition"
            >
              {ranges.map((r) => <option key={r} value={r}>{r === '1y' ? '1 Year' : r === '90d' ? '90 Days' : r === '30d' ? '30 Days' : '7 Days'}</option>)}
            </select>
            <select
              value={metricFilter}
              onChange={(e) => setMetricFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] bg-gray-50 dark:bg-[#163A3F] text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#003B3D] transition"
            >
              {metrics.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <button className="px-4 py-2.5 rounded-xl bg-[#003B3D] text-white text-sm font-medium hover:bg-[#082B3B] transition flex items-center gap-2">
            <FileText size={16} /> Export Report
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="New Patients" value={newPatientsVal.toLocaleString()} trend={+12.4} icon={Users} />
        <StatCard title="Appointments" value={appointmentsVal.toLocaleString()} trend={+8.2} icon={Calendar} />
        <StatCard title="Revenue" value="₦485,230" trend={+9.8} icon={CreditCard} />
        <StatCard title="Completion Rate" value="94.2%" trend={+3.1} icon={Clock} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="min-w-0 lg:col-span-2 bg-white dark:bg-[#0F2B30] rounded-2xl border border-[#E2E8F0] dark:border-[#1E3A3D] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg font-bold text-[#0F172A] dark:text-white">Patient Registration Trends</h2>
            <a href="#" className="text-sm font-medium text-[#003B3D] hover:text-[#082B3B]">View full report</a>
          </div>
          <PatientTrendChart data={patientTrendData} />
        </div>
        <div className="min-w-0 bg-white dark:bg-[#0F2B30] rounded-2xl border border-[#E2E8F0] dark:border-[#1E3A3D] p-6 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-[#0F172A] dark:text-white mb-4">Revenue Overview</h2>
          <RevenueChart data={revenueData} />
        </div>
        <div className="min-w-0 bg-white dark:bg-[#0F2B30] rounded-2xl border border-[#E2E8F0] dark:border-[#1E3A3D] p-6 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-[#0F172A] dark:text-white mb-4">Appointment Status</h2>
          <StatusChart data={appointmentStatusData} />
        </div>
      </div>

      <div className="bg-white dark:bg-[#0F2B30] rounded-2xl border border-[#E2E8F0] dark:border-[#1E3A3D] p-6 shadow-sm">
        <h2 className="font-serif text-lg font-bold text-[#0F172A] dark:text-white mb-4 flex items-center gap-2">
          <BarChart3 size={18} className="text-[#003B3D]" /> Performance Summary
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Patient Satisfaction', value: '92%', delta: '+2%' },
            { label: 'Avg. Wait Time', value: '18 mins', delta: '-5 mins' },
            { label: 'Bed Occupancy', value: '78%', delta: '+4%' },
            { label: 'Emergency Visits', value: '142', delta: '+12' },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-xl bg-gray-50 dark:bg-[#163A3F] border border-gray-100 dark:border-transparent">
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider">{item.label}</p>
              <p className="text-lg font-bold text-[#0F172A] dark:text-white">{item.value}</p>
              <p className="text-xs text-[#10B981]">{item.delta}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
