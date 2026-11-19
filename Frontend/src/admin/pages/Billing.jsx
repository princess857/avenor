import { useState, useMemo } from 'react'
import { Search, CreditCard, Plus, Edit, Trash2, FileText, Clock } from 'lucide-react'
import { StatCard } from '../components/StatCard'
import { DataTable } from '../components/DataTable'
import { Modal } from '../components/Modal'
import { useSupabaseResource } from '../hooks/useSupabaseResource'
import { billing as demoBilling } from '../data/demoData'

const statusColorBill = {
  Paid: 'bg-[#10B981]/10 text-[#10B981]',
  Pending: 'bg-[#F59E0B]/10 text-[#F59E0B]',
  Partial: 'bg-[#3B82F6]/10 text-[#3B82F6]',
  Overdue: 'bg-[#EF4444]/10 text-[#EF4444]',
}

export default function Billing() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)

  const { data: billing, loading, error } = useSupabaseResource('invoices', demoBilling, { orderBy: 'created_at', ascending: false })

  const filtered = useMemo(() => {
    if (!billing) return []
    return billing.filter((b) =>
      b.patient_name?.toLowerCase().includes(search.toLowerCase()) ||
      b.patient?.toLowerCase().includes(search.toLowerCase()) ||
      b.service_name?.toLowerCase().includes(search.toLowerCase()) ||
      b.service?.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase())
    ).filter((b) => statusFilter === 'All' || b.status === statusFilter)
  }, [billing, search, statusFilter])

  const total = useMemo(() => filtered.reduce((s, b) => s + (b.amount || 0), 0), [filtered])
  const paid = useMemo(() => filtered.filter((b) => b.status === 'Paid').reduce((s, b) => s + (b.amount || 0), 0), [filtered])
  const pending = useMemo(() => filtered.filter((b) => b.status === 'Pending' || b.status === 'Overdue').reduce((s, b) => s + (b.amount || 0), 0), [filtered])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#0F172A] dark:text-white">Billing &amp; Payments</h1>
            <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Manage invoices, payments and financial records.</p>
          </div>
        </div>
        <div className="flex gap-4 md:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <StatCard key={i} title="Loading" value="—" trend={0} icon={CreditCard} />
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
            <h1 className="font-serif text-2xl font-bold text-[#0F172A] dark:text-white">Billing &amp; Payments</h1>
            <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Manage invoices, payments and financial records.</p>
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
          <h1 className="font-serif text-2xl font-bold text-[#0F172A] dark:text-white">Billing &amp; Payments</h1>
          <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Manage invoices, payments and financial records.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto justify-end">
          <button className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0F2B30] hover:bg-gray-50 dark:hover:bg-[#163A3F] text-sm font-medium transition">
            <FileText size={16} /> Invoices
          </button>
          <button className="px-4 py-2.5 rounded-xl bg-[#003B3D] text-white text-sm font-medium hover:bg-[#082B3B] transition flex items-center gap-2">
            <Plus size={16} /> New Invoice
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Total Invoiced" value={`₦${total.toLocaleString()}`} trend={0} icon={CreditCard} />
        <StatCard title="Paid" value={`₦${paid.toLocaleString()}`} trend={0} icon={Clock} />
        <StatCard title="Pending" value={`₦${pending.toLocaleString()}`} trend={0} icon={CreditCard} />
        <StatCard title="Total Invoices" value={filtered.length} trend={0} icon={FileText} />
      </div>

      <div className="bg-white dark:bg-[#0F2B30] rounded-2xl border border-[#E2E8F0] dark:border-[#1E3A3D] p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search invoice, patient or service..."
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
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Partial">Partial</option>
              <option value="Overdue">Overdue</option>
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
            { key: 'id', label: 'Invoice ID' },
            { key: 'patient', label: 'Patient' },
            { key: 'service', label: 'Service' },
            { key: 'amount', label: 'Amount', render: (v) => '₦' + v.toLocaleString() },
            { key: 'date', label: 'Date' },
            { key: 'dueDate', label: 'Due Date' },
            { key: 'status', label: 'Status', render: (v) => <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${statusColorBill[v] || 'bg-gray-100 text-gray-600'}`}>{v}</span> },
            {
              key: 'actions', label: 'Actions',
              actions: [
                { label: 'View', icon: FileText, handler: () => {} },
                { label: 'Edit', icon: Edit, handler: () => {} },
                { label: 'Delete', icon: Trash2, handler: () => {} },
              ],
            },
          ]}
          data={filtered}
          pageSize={8}
          emptyMessage="No invoices found"
        />
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Invoice Details" size="lg">
        <div className="text-center py-10 text-gray-500">Select an invoice to view details.</div>
      </Modal>
    </div>
  )
}
