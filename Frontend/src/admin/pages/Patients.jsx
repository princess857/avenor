import { useState, useMemo } from 'react'
import { Search, Filter, Users, User, Plus, Edit, Trash2, Clock, Phone, MapPin } from 'lucide-react'
import { StatCard } from '../components/StatCard'
import { DataTable } from '../components/DataTable'
import { Modal } from '../components/Modal'
import { useSupabaseResource } from '../hooks/useSupabaseResource'
import { patients as demoPatients } from '../data/demoData'

export default function Patients() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [genderFilter, setGenderFilter] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  const { data: patients, loading, error } = useSupabaseResource('patients', demoPatients, { orderBy: 'created_at', ascending: false })

  const filtered = useMemo(() => {
    if (!patients) return []
    return patients.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.toLowerCase().includes(search.toLowerCase())
    ).filter((p) => statusFilter === 'All' || p.status === statusFilter)
    .filter((p) => genderFilter === 'All' || p.gender === genderFilter)
  }, [patients, search, statusFilter, genderFilter])

  const openProfile = (p) => { setSelected(p); setModalOpen(true) }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#0F172A] dark:text-white">Patients</h1>
            <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Manage patient records and directories.</p>
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
            <h1 className="font-serif text-2xl font-bold text-[#0F172A] dark:text-white">Patients</h1>
            <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Manage patient records and directories.</p>
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
          <h1 className="font-serif text-2xl font-bold text-[#0F172A] dark:text-white">Patients</h1>
          <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Manage patient records and directories.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto justify-end">
          <button className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0F2B30] hover:bg-gray-50 dark:hover:bg-[#163A3F] text-sm font-medium transition">
            <Users size={16} /> Directory
          </button>
          <button onClick={() => openProfile(null)} className="px-4 py-2.5 rounded-xl bg-[#003B3D] text-white text-sm font-medium hover:bg-[#082B3B] transition flex items-center gap-2">
            <Plus size={16} /> Register Patient
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Total Patients" value={filtered.length} trend={0} icon={Users} />
        <StatCard title="Active" value={filtered.filter((p) => p.status === 'Active').length} trend={0} icon={Clock} />
        <StatCard title="Inactive" value={filtered.filter((p) => p.status === 'Inactive').length} trend={0} icon={User} />
        <StatCard title="Registered This Month" value="12" trend={0} icon={Plus} />
      </div>

      <div className="bg-white dark:bg-[#0F2B30] rounded-2xl border border-[#E2E8F0] dark:border-[#1E3A3D] p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search patient name, email or phone..."
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
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] bg-gray-50 dark:bg-[#163A3F] text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#003B3D] transition"
            >
              <option value="All">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <button
              onClick={() => { setSearch(''); setStatusFilter('All'); setGenderFilter('All') }}
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#163A3F] transition"
            >
              <Filter size={16} /> Reset
            </button>
          </div>
        </div>

        <DataTable
          columns={[
            { key: 'id', label: 'Patient ID' },
            { key: 'name', label: 'Name' },
            { key: 'age', label: 'Age' },
            { key: 'gender', label: 'Gender' },
            { key: 'bloodGroup', label: 'Blood Group' },
            { key: 'phone', label: 'Phone' },
            { key: 'lastVisit', label: 'Last Visit' },
            { key: 'status', label: 'Status', render: (v) => <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${v === 'Active' ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-gray-100 text-gray-600'}`}>{v}</span> },
            {
              key: 'actions', label: 'Actions',
              actions: [
                { label: 'Profile', icon: User, handler: openProfile },
                { label: 'Edit', icon: Edit, handler: openProfile },
                { label: 'Delete', icon: Trash2, handler: openProfile },
              ],
            },
          ]}
          data={filtered}
          pageSize={8}
          emptyMessage="No patients found"
        />
      </div>

      <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setSelected(null) }} title={selected ? `Patient ${selected.id}` : 'Register Patient'} size="lg">
        <div className="grid gap-4 md:grid-cols-2">
          {!selected ? (
            <div className="md:col-span-2 max-w-md mx-auto">
              <p className="text-center text-gray-500 mb-6">Complete the patient registration form below.</p>
              <form className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                    <input type="text" className="w-full pl-3 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] bg-gray-50 dark:bg-[#163A3F] text-gray-900 dark:text-white focus:outline-none focus:border-[#003B3D] focus:ring-1 transition" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</label>
                    <input type="date" className="w-full pl-3 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] bg-gray-50 dark:bg-[#163A3F] text-gray-900 dark:text-white focus:outline-none focus:border-[#003B3D] focus:ring-1 transition" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                  <input type="email" className="w-full pl-3 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] bg-gray-50 dark:bg-[#163A3F] text-gray-900 dark:text-white focus:outline-none focus:border-[#003B3D] focus:ring-1 transition" />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                    <input type="tel" className="w-full pl-3 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] bg-gray-50 dark:bg-[#163A3F] text-gray-900 dark:text-white focus:outline-none focus:border-[#003B3D] focus:ring-1 transition" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Blood Group</label>
                    <select className="w-full pl-3 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] bg-gray-50 dark:bg-[#163A3F] text-gray-900 dark:text-white focus:outline-none focus:border-[#003B3D] focus:ring-1 transition">
                      <option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                  <textarea rows={2} className="w-full pl-3 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] bg-gray-50 dark:bg-[#163A3F] text-gray-900 dark:text-white focus:outline-none focus:border-[#003B3D] focus:ring-1 transition" />
                </div>
              </form>
              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => { setModalOpen(false); setSelected(null) }} className="px-4 py-2 rounded-xl border border-gray-200 dark:border-[#1E3A3D] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#163A3F] transition">Cancel</button>
                <button className="px-6 py-2 rounded-xl bg-[#003B3D] text-white hover:bg-[#082B3B] transition">Register Patient</button>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf3782d3?w=200&h=200&fit=crop" alt={selected.name} className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-[#003B3D] dark:border-[#F4BE65]" />
                <div className="flex justify-center gap-2 mt-3">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${selected.status === 'Active' ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-gray-100 text-gray-600'}`}>{selected.status}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-[#003B3D]" /><span className="text-[#64748B] dark:text-gray-300 text-sm">{selected.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-[#003B3D]" /><span className="text-[#64748B] dark:text-gray-300 text-sm">{selected.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-[#003B3D]" /><span className="text-[#64748B] dark:text-gray-300 text-sm">Registered: {selected.registrationDate}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-[#003B3D]" /><span className="text-[#64748B] dark:text-gray-300 text-sm">Last visit: {selected.lastVisit}</span>
                </div>
              </div>
              <div className="md:col-span-2 border-t border-gray-100 dark:border-[#1E3A3D] pt-4">
                <h3 className="font-semibold text-[#0F172A] dark:text-white mb-3">Medical Summary</h3>
                <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">No significant medical history recorded. This is demonstration data only.</p>
              </div>
            </>
          )}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={() => { setModalOpen(false); setSelected(null) }} className="px-4 py-2 rounded-xl border border-gray-200 dark:border-[#1E3A3D] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#163A3F] transition">Close</button>
          <button className="px-6 py-2 rounded-xl bg-[#003B3D] text-white hover:bg-[#082B3B] transition">Save Changes</button>
        </div>
      </Modal>
    </div>
  )
}
