import { useState, useMemo } from 'react'
import { Search, Filter, User, Plus, Edit, Trash2, Clock, Stethoscope } from 'lucide-react'
import { StatCard } from '../components/StatCard'
import { DataTable } from '../components/DataTable'
import { Modal } from '../components/Modal'
import { RequireRole } from '../components/RequireRole'
import { useSupabaseResource } from '../hooks/useSupabaseResource'
import { doctors as demoDoctors } from '../data/demoData'

const statusColorDoc = {
  Available: 'bg-[#10B981]/10 text-[#10B981]',
  Busy: 'bg-[#F59E0B]/10 text-[#F59E0B]',
  'Off Duty': 'bg-gray-100 text-gray-600',
}

export default function AdminDoctors() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [specialtyFilter, setSpecialtyFilter] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)

  const { data: doctors, loading, error } = useSupabaseResource('doctors', demoDoctors, { orderBy: 'name' })

  const specialties = useMemo(() => ['All', ...new Set((doctors || []).map((d) => d.specialty))], [doctors])

  const filtered = useMemo(() => {
    if (!doctors) return []
    return doctors.filter((d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase()) ||
      d.department.toLowerCase().includes(search.toLowerCase())
    ).filter((d) => statusFilter === 'All' || d.status === statusFilter)
    .filter((d) => specialtyFilter === 'All' || d.specialty === specialtyFilter)
  }, [doctors, search, statusFilter, specialtyFilter])

  const avgRating = useMemo(() => {
    if (filtered.length === 0) return 0
    return (filtered.reduce((s, d) => s + (d.rating || 0), 0) / filtered.length).toFixed(1)
  }, [filtered])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#0F172A] dark:text-white">Doctors</h1>
            <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Manage the medical team and physician directory.</p>
          </div>
        </div>
        <div className="flex gap-4 md:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <StatCard key={i} title="Loading" value="—" trend={0} icon={User} />
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
            <h1 className="font-serif text-2xl font-bold text-[#0F172A] dark:text-white">Doctors</h1>
            <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Manage the medical team and physician directory.</p>
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
          <h1 className="font-serif text-2xl font-bold text-[#0F172A] dark:text-white">Doctors</h1>
          <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Manage the medical team and physician directory.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto justify-end">
          <button className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0F2B30] hover:bg-gray-50 dark:hover:bg-[#163A3F] text-sm font-medium transition">
            <Stethoscope size={16} /> Directory
          </button>
          <RequireRole allowedRoles={['super_administrator', 'hospital_administrator']}>
            <button className="px-4 py-2.5 rounded-xl bg-[#003B3D] text-white text-sm font-medium hover:bg-[#082B3B] transition flex items-center gap-2">
              <Plus size={16} /> Add Doctor
            </button>
          </RequireRole>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Total Doctors" value={filtered.length} trend={0} icon={User} />
        <StatCard title="Available" value={filtered.filter((d) => d.status === 'Available').length} trend={0} icon={Clock} />
        <StatCard title="Busy" value={filtered.filter((d) => d.status === 'Busy').length} trend={0} icon={User} />
        <StatCard title="Avg. Rating" value={avgRating} trend={0} icon={Stethoscope} />
      </div>

      <div className="bg-white dark:bg-[#0F2B30] rounded-2xl border border-[#E2E8F0] dark:border-[#1E3A3D] p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search doctor, specialty or department..."
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
              <option value="All">All Status</option>
              <option value="Available">Available</option>
              <option value="Busy">Busy</option>
              <option value="Off Duty">Off Duty</option>
            </select>
            <select
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] bg-gray-50 dark:bg-[#163A3F] text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#003B3D] transition"
            >
              {specialties.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <button
              onClick={() => { setSearch(''); setStatusFilter('All'); setSpecialtyFilter('All') }}
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#163A3F] transition"
            >
              <Filter size={16} /> Reset
            </button>
          </div>
        </div>

        <DataTable
          columns={[
            { key: 'id', label: 'Doctor ID' },
            { key: 'name', label: 'Name' },
            { key: 'specialty', label: 'Specialty' },
            { key: 'department', label: 'Department' },
            { key: 'status', label: 'Status', render: (v) => <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${statusColorDoc[v] || 'bg-gray-100 text-gray-600'}`}>{v}</span> },
            { key: 'rating', label: 'Rating', render: (v) => <span className="text-[#0F172A] dark:text-white font-medium">{v}</span> },
            { key: 'patients', label: 'Patients' },
            {
              key: 'actions', label: 'Actions',
              actions: [
                { label: 'View', icon: User, handler: () => {} },
                { label: 'Edit', icon: Edit, handler: () => {} },
                { label: 'Remove', icon: Trash2, handler: () => {} },
              ],
            },
          ]}
          data={filtered}
          pageSize={8}
          emptyMessage="No doctors found"
        />
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Doctor Details" size="lg">
        <div className="text-center py-10 text-gray-500">Select a doctor to view details.</div>
      </Modal>
    </div>
  )
}
