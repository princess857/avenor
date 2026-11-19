import { useState, useMemo } from 'react'
import { Search, Filter, Clock, Calendar, User, Plus, Edit, Trash2, Eye, Mail, Phone } from 'lucide-react'
import { StatCard } from '../components/StatCard'
import { DataTable } from '../components/DataTable'
import { Modal } from '../components/Modal'
import { useSupabaseResource } from '../hooks/useSupabaseResource'
import { recentAppointments as demoAppointments } from '../data/demoData'

const statusColor = {
  Scheduled: 'bg-[#003B3D]/10 text-[#003B3D] border-[#003B3D]/20',
  Completed: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20',
  Pending: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20',
  Cancelled: 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20',
}

const typeColor = {
  Consultation: 'bg-[#003B3D]/10 text-[#003B3D]',
  'Check-up': 'bg-[#10B981]/10 text-[#10B981]',
  'Follow-up': 'bg-[#3B82F6]/10 text-[#3B82F6]',
  Vaccination: 'bg-[#8B5CF6]/10 text-[#8B5CF6]',
  'Pre-op Assessment': 'bg-[#F59E0B]/10 text-[#F59E0B]',
  'Prenatal Visit': 'bg-[#EC4899]/10 text-[#EC4899]',
}

export default function Appointments() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  const statuses = ['All', 'Scheduled', 'Completed', 'Pending', 'Cancelled']
  const types = ['All', 'Consultation', 'Check-up', 'Follow-up', 'Vaccination', 'Pre-op Assessment', 'Prenatal Visit']

  const { data: appointments, loading, error } = useSupabaseResource('appointments', demoAppointments, { orderBy: 'appointment_date', ascending: false })

  const normalized = useMemo(() => {
    if (!appointments) return []
    return appointments.map((a) => ({
      id: a.id,
      patient: a.patient_name || a.patient || 'Unknown Patient',
      doctor: a.doctor_name || a.doctor || 'Unknown Doctor',
      specialty: a.specialty || 'General',
      date: a.appointment_date || '',
      time: a.appointment_time || '',
      status: a.status || 'Scheduled',
      type: a.type || 'Consultation',
    }))
  }, [appointments])

  const filtered = useMemo(() => {
    if (!normalized) return []
    return normalized.filter((a) =>
      a.patient.toLowerCase().includes(search.toLowerCase()) ||
      a.doctor.toLowerCase().includes(search.toLowerCase()) ||
      a.specialty.toLowerCase().includes(search.toLowerCase())
    ).filter((a) => statusFilter === 'All' || a.status === statusFilter)
    .filter((a) => typeFilter === 'All' || a.type === typeFilter)
  }, [normalized, search, statusFilter, typeFilter])

  const openDetails = (a) => { setSelected(a); setModalOpen(true) }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#0F172A] dark:text-white">Appointments</h1>
            <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Manage patient appointments and scheduling.</p>
          </div>
        </div>
        <div className="flex gap-4 md:gap-6">
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
            <h1 className="font-serif text-2xl font-bold text-[#0F172A] dark:text-white">Appointments</h1>
            <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Manage patient appointments and scheduling.</p>
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
          <h1 className="font-serif text-2xl font-bold text-[#0F172A] dark:text-white">Appointments</h1>
          <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Manage patient appointments and scheduling.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto justify-end">
          <button className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0F2B30] hover:bg-gray-50 dark:hover:bg-[#163A3F] text-sm font-medium transition">
            <Calendar size={16} /> Schedule New
          </button>
          <button className="px-4 py-2.5 rounded-xl bg-[#003B3D] text-white text-sm font-medium hover:bg-[#082B3B] transition flex items-center gap-2">
            <Plus size={16} /> New Appointment
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Total Appointments" value={filtered.length} trend={0} icon={Calendar} />
        <StatCard title="Scheduled" value={filtered.filter((a) => a.status === 'Scheduled').length} trend={0} icon={Clock} />
        <StatCard title="Completed Today" value={filtered.filter((a) => a.status === 'Completed').length} trend={0} icon={Calendar} />
        <StatCard title="Pending" value={filtered.filter((a) => a.status === 'Pending').length} trend={0} icon={User} />
      </div>

      <div className="bg-white dark:bg-[#0F2B30] rounded-2xl border border-[#E2E8F0] dark:border-[#1E3A3D] p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search patient, doctor or specialty..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] bg-gray-50 dark:bg-[#163A3F] text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#003B3D] focus:ring-1 focus:ring-[#003B3D] transition"
            />
          </div>
          <div className="flex flex-col gap-2 w-full sm:flex-row sm:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] bg-gray-50 dark:bg-[#163A3F] text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#003B3D] transition"
            >
              {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] bg-gray-50 dark:bg-[#163A3F] text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#003B3D] transition"
            >
              {types.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <button
              onClick={() => { setSearch(''); setStatusFilter('All'); setTypeFilter('All') }}
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#163A3F] transition"
            >
              <Filter size={16} /> Reset
            </button>
          </div>
        </div>

        <DataTable
          columns={[
            { key: 'id', label: 'Appointment ID' },
            { key: 'patient', label: 'Patient' },
            { key: 'doctor', label: 'Doctor' },
            { key: 'specialty', label: 'Specialty' },
            { key: 'date', label: 'Date' },
            { key: 'time', label: 'Time' },
            { key: 'type', label: 'Type', render: (v) => <span className={`px-2 py-1 rounded text-[10px] font-medium ${typeColor[v] || 'bg-gray-100 text-gray-600'}`}>{v}</span> },
            { key: 'status', label: 'Status', render: (v) => <span className={`px-2 py-1.5 rounded text-[10px] font-medium border ${statusColor[v] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>{v}</span> },
            {
              key: 'actions', label: 'Actions',
              actions: [
                { label: 'View', icon: Eye, handler: openDetails },
                { label: 'Edit', icon: Edit, handler: openDetails },
                { label: 'Cancel', icon: Trash2, handler: openDetails },
              ],
            },
          ]}
          data={filtered}
          pageSize={8}
          emptyMessage="No appointments found"
        />
      </div>

      <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setSelected(null) }} title={selected ? `Appointment ${selected.id}` : 'Appointment Details'} size="lg">
        <div className="grid gap-4 md:grid-cols-2">
          {!selected ? (
            <div className="md:col-span-2 text-center py-10 text-gray-500">Select an appointment to view details.</div>
          ) : (
            <>
              <div className="space-y-3">
                <p className="text-sm font-medium text-[#64748B]">Patient</p>
                <p className="text-[#0F172A] dark:text-white">{selected.patient}</p>
                <p className="text-sm font-medium text-[#64748B]">Doctor</p>
                <p className="text-[#0F172A] dark:text-white">{selected.doctor}</p>
                <p className="text-sm font-medium text-[#64748B]">Specialty</p>
                <p className="text-[#0F172A] dark:text-white">{selected.specialty}</p>
              </div>
              <div className="space-y-3">
                <p className="text-sm font-medium text-[#64748B]">Date</p>
                <p className="text-[#0F172A] dark:text-white">{selected.date}</p>
                <p className="text-sm font-medium text-[#64748B]">Time</p>
                <p className="text-[#0F172A] dark:text-white">{selected.time}</p>
                <p className="text-sm font-medium text-[#64748B]">Type</p>
                <p className="text-[#0F172A] dark:text-white">{selected.type}</p>
                <p className="text-sm font-medium text-[#64748B]">Status</p>
                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-medium ${statusColor[selected.status]}`}>{selected.status}</span>
              </div>
              <div className="md:col-span-2 space-y-3">
                <p className="text-sm font-medium text-[#64748B]">Contact Information</p>
                <div className="flex items-center gap-3"><Phone size={16} className="text-[#003B3D]" /><span className="text-[#64748B] dark:text-gray-300">+234 800 000 0000</span></div>
                <div className="flex items-center gap-3"><Mail size={16} className="text-[#003B3D]" /><span className="text-[#64748B] dark:text-gray-300">patient@email.com</span></div>
              </div>
            </>
          )}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={() => { setModalOpen(false); setSelected(null) }} className="px-4 py-2 rounded-xl border border-gray-200 dark:border-[#1E3A3D] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#163A3F] transition">Close</button>
          <button className="px-4 py-2 rounded-xl bg-[#003B3D] text-white hover:bg-[#082B3B] transition">Save Changes</button>
        </div>
      </Modal>
    </div>
  )
}
