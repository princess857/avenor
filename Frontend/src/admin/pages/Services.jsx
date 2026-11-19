import { useState, useMemo } from 'react'
import { Search, Building2, Plus, Edit, Trash2, Clock, Stethoscope } from 'lucide-react'
import { StatCard } from '../components/StatCard'
import { DataTable } from '../components/DataTable'
import { Modal } from '../components/Modal'
import { useSupabaseResource } from '../hooks/useSupabaseResource'
import { services as demoServices } from '../data/demoData'

export default function AdminServices() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)

  const { data: services, loading, error } = useSupabaseResource('services', demoServices, { orderBy: 'name' })

  const categories = useMemo(() => ['All', ...new Set((services || []).map((s) => s.category))], [services])

  const filtered = useMemo(() => {
    if (!services) return []
    return services.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase())
    ).filter((s) => statusFilter === 'All' || s.status === statusFilter)
    .filter((s) => categoryFilter === 'All' || s.category === categoryFilter)
  }, [services, search, statusFilter, categoryFilter])

  const avgPrice = useMemo(() => {
    if (filtered.length === 0) return 0
    return filtered.reduce((s, svc) => s + (svc.price || 0), 0) / filtered.length
  }, [filtered])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#0F172A] dark:text-white">Medical Services</h1>
            <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Manage the hospital service catalog and pricing.</p>
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
            <h1 className="font-serif text-2xl font-bold text-[#0F172A] dark:text-white">Medical Services</h1>
            <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Manage the hospital service catalog and pricing.</p>
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
          <h1 className="font-serif text-2xl font-bold text-[#0F172A] dark:text-white">Medical Services</h1>
          <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Manage the hospital service catalog and pricing.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto justify-end">
          <button className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0F2B30] hover:bg-gray-50 dark:hover:bg-[#163A3F] text-sm font-medium transition">
            <Building2 size={16} /> Catalog
          </button>
          <button className="px-4 py-2.5 rounded-xl bg-[#003B3D] text-white text-sm font-medium hover:bg-[#082B3B] transition flex items-center gap-2">
            <Plus size={16} /> Add Service
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Total Services" value={filtered.length} trend={0} icon={Building2} />
        <StatCard title="Active" value={filtered.filter((s) => s.status === 'Active').length} trend={0} icon={Clock} />
        <StatCard title="Categories" value={categories.length - 1} trend={0} icon={Stethoscope} />
        <StatCard title="Avg. Price" value={`₦${avgPrice.toLocaleString()}`} trend={0} icon={Stethoscope} />
      </div>

      <div className="bg-white dark:bg-[#0F2B30] rounded-2xl border border-[#E2E8F0] dark:border-[#1E3A3D] p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search service name, category or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] bg-gray-50 dark:bg-[#163A3F] text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#003B3D] focus:ring-1 focus:ring-[#003B3D] transition"
            />
          </div>
          <div className="flex flex-col gap-2 w-full sm:flex-row sm:w-auto">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] bg-gray-50 dark:bg-[#163A3F] text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#003B3D] transition"
            >
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
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
              onClick={() => { setSearch(''); setCategoryFilter('All'); setStatusFilter('All') }}
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#163A3F] transition"
            >
              Reset
            </button>
          </div>
        </div>

        <DataTable
          columns={[
            { key: 'id', label: 'Service ID' },
            { key: 'name', label: 'Service' },
            { key: 'category', label: 'Category' },
            { key: 'description', label: 'Description' },
            { key: 'price', label: 'Price', render: (v) => '₦' + v.toLocaleString() },
            { key: 'duration', label: 'Duration' },
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
          emptyMessage="No services found"
        />
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Service Details" size="lg">
        <div className="text-center py-10 text-gray-500">Select a service to view details.</div>
      </Modal>
    </div>
  )
}
