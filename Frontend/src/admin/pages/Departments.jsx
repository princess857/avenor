import { useState, useMemo } from 'react'
import { Search, Building2, Plus, Edit, Trash2, Users, CreditCard } from 'lucide-react'
import { StatCard } from '../components/StatCard'
import { DataTable } from '../components/DataTable'
import { Modal } from '../components/Modal'
import { useSupabaseResource } from '../hooks/useSupabaseResource'
import { departments as demoDepartments } from '../data/demoData'

export default function AdminDepartments() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)

  const { data: departments, loading, error } = useSupabaseResource('departments', demoDepartments, { orderBy: 'name' })

  const filtered = useMemo(() => {
    if (!departments) return []
    return departments.filter((d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      (d.head && d.head.toLowerCase().includes(search.toLowerCase()))
    ).filter((d) => statusFilter === 'All' || d.status === statusFilter)
  }, [departments, search, statusFilter])

  const totalDoctors = useMemo(() => filtered.reduce((s, d) => s + (d.doctors || 0), 0), [filtered])
  const totalPatients = useMemo(() => filtered.reduce((s, d) => s + (d.patients || 0), 0), [filtered])
  const totalRevenue = useMemo(() => filtered.reduce((s, d) => s + (d.revenue || 0), 0), [filtered])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#0F172A] dark:text-white">Departments</h1>
            <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Manage hospital departments and their performance.</p>
          </div>
        </div>
        <div className="flex gap-4 md:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <StatCard key={i} title="Loading" value="—" trend={0} icon={Building2} />
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
            <h1 className="font-serif text-2xl font-bold text-[#0F172A] dark:text-white">Departments</h1>
            <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Manage hospital departments and their performance.</p>
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
          <h1 className="font-serif text-2xl font-bold text-[#0F172A] dark:text-white">Departments</h1>
          <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Manage hospital departments and their performance.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto justify-end">
          <button className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0F2B30] hover:bg-gray-50 dark:hover:bg-[#163A3F] text-sm font-medium transition">
            <Building2 size={16} /> Directory
          </button>
          <button className="px-4 py-2.5 rounded-xl bg-[#003B3D] text-white text-sm font-medium hover:bg-[#082B3B] transition flex items-center gap-2">
            <Plus size={16} /> Add Department
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Total Departments" value={filtered.length} trend={0} icon={Building2} />
        <StatCard title="Total Doctors" value={totalDoctors} trend={0} icon={Users} />
        <StatCard title="Total Patients" value={totalPatients} trend={0} icon={Users} />
        <StatCard title="Total Revenue" value={`₦${totalRevenue.toLocaleString()}`} trend={0} icon={CreditCard} />
      </div>

      <div className="bg-white dark:bg-[#0F2B30] rounded-2xl border border-[#E2E8F0] dark:border-[#1E3A3D] p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search department name or head..."
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
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <button
              onClick={() => { setSearch(''); setStatusFilter('All') }}
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#163A3F] transition"
            >
              Reset
            </button>
          </div>
        </div>

        <DataTable
          columns={[
            { key: 'id', label: 'Dept ID' },
            { key: 'name', label: 'Department' },
            { key: 'head', label: 'Head of Department' },
            { key: 'doctors', label: 'Doctors' },
            { key: 'patients', label: 'Patients' },
            { key: 'revenue', label: 'Revenue', render: (v) => '₦' + v.toLocaleString() },
            { key: 'status', label: 'Status', render: (v) => <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${v === 'Active' ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-gray-100 text-gray-600'}`}>{v}</span> },
            {
              key: 'actions', label: 'Actions',
              actions: [
                { label: 'Edit', icon: Edit, handler: () => {} },
                { label: 'Delete', icon: Trash2, handler: () => {} },
              ],
            },
          ]}
          data={filtered}
          pageSize={8}
          emptyMessage="No departments found"
        />
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Department Details" size="lg">
        <div className="text-center py-10 text-gray-500">Select a department to view details.</div>
      </Modal>
    </div>
  )
}
