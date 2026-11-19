import { useState, useMemo } from 'react'
import { Search, User, Plus, Edit, Trash2, Clock, Building2 } from 'lucide-react'
import { StatCard } from '../components/StatCard'
import { DataTable } from '../components/DataTable'
import { Modal } from '../components/Modal'
import { useSupabaseResource } from '../hooks/useSupabaseResource'
import { staff as demoStaff } from '../data/demoData'

const statusColorStaff = {
  Active: 'bg-[#10B981]/10 text-[#10B981]',
  'On Leave': 'bg-[#F59E0B]/10 text-[#F59E0B]',
}

export default function Staff() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)

  const { data: staff, loading, error } = useSupabaseResource('staff', demoStaff, { orderBy: 'name' })

  const filtered = useMemo(() => {
    if (!staff) return []
    return staff.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.role.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase())
    ).filter((s) => statusFilter === 'All' || s.status === statusFilter)
  }, [staff, search, statusFilter])

  const departmentsCount = useMemo(() => new Set(filtered.map((s) => s.department)).size, [filtered])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#0F172A] dark:text-white">Staff</h1>
            <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Manage hospital staff and personnel.</p>
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
            <h1 className="font-serif text-2xl font-bold text-[#0F172A] dark:text-white">Staff</h1>
            <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Manage hospital staff and personnel.</p>
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
          <h1 className="font-serif text-2xl font-bold text-[#0F172A] dark:text-white">Staff</h1>
          <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Manage hospital staff and personnel.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto justify-end">
          <button className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0F2B30] hover:bg-gray-50 dark:hover:bg-[#163A3F] text-sm font-medium transition">
            <User size={16} /> Directory
          </button>
          <button className="px-4 py-2.5 rounded-xl bg-[#003B3D] text-white text-sm font-medium hover:bg-[#082B3B] transition flex items-center gap-2">
            <Plus size={16} /> Add Staff
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Total Staff" value={filtered.length} trend={0} icon={User} />
        <StatCard title="Active" value={filtered.filter((s) => s.status === 'Active').length} trend={0} icon={Clock} />
        <StatCard title="On Leave" value={filtered.filter((s) => s.status === 'On Leave').length} trend={0} icon={User} />
        <StatCard title="Departments" value={departmentsCount} trend={0} icon={Building2} />
      </div>

      <div className="bg-white dark:bg-[#0F2B30] rounded-2xl border border-[#E2E8F0] dark:border-[#1E3A3D] p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search staff name, role or department..."
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
              <option value="On Leave">On Leave</option>
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
            { key: 'id', label: 'Staff ID' },
            { key: 'name', label: 'Name' },
            { key: 'role', label: 'Role' },
            { key: 'department', label: 'Department' },
            { key: 'phone', label: 'Phone' },
            { key: 'status', label: 'Status', render: (v) => <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${statusColorStaff[v] || 'bg-gray-100 text-gray-600'}`}>{v}</span> },
            { key: 'joinDate', label: 'Join Date' },
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
          emptyMessage="No staff members found"
        />
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Staff Details" size="lg">
        <div className="text-center py-10 text-gray-500">Select a staff member to view details.</div>
      </Modal>
    </div>
  )
}
