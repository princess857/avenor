import { useState, useMemo } from 'react'
import { Search, Bell, Check } from 'lucide-react'
import { Modal } from '../components/Modal'
import { useSupabaseResource } from '../hooks/useSupabaseResource'
import { notifications as demoNotifications } from '../data/demoData'

const typeColor = {
  appointment: 'bg-[#003B3D]/10 text-[#003B3D] dark:bg-[#54D2C0]/15 dark:text-[#8AE4D9]',
  billing: 'bg-[#10B981]/10 text-[#10B981]',
  staff: 'bg-[#F59E0B]/10 text-[#F59E0B]',
  system: 'bg-[#3B82F6]/10 text-[#3B82F6]',
  patient: 'bg-[#8B5CF6]/10 text-[#8B5CF6]',
}

const typeLabel = {
  appointment: 'Appointment',
  billing: 'Billing',
  staff: 'Staff',
  system: 'System',
  patient: 'Patient',
}

export default function Notifications() {
  const [search, setSearch] = useState('')
  const [readFilter, setReadFilter] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  const { data: notifications, loading, error } = useSupabaseResource('notifications', demoNotifications, { orderBy: 'created_at', ascending: false })

  const filtered = useMemo(() => {
    if (!notifications) return []
    return notifications.filter((n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.message.toLowerCase().includes(search.toLowerCase())
    ).filter((n) => readFilter === 'All' || (readFilter === 'Unread' ? !n.read : n.read))
  }, [notifications, search, readFilter])

  const unreadCount = useMemo(() => filtered.filter((n) => !n.read).length, [filtered])

  const markRead = (id) => {
    const n = filtered.find((x) => x.id === id)
    if (n) n.read = true
    setSelected(null)
    setModalOpen(false)
  }

  const markAllRead = () => {
    filtered.forEach((n) => { n.read = true })
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#0F172A] dark:text-white">Notifications</h1>
            <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Manage alerts and communications.</p>
          </div>
        </div>
        <div className="flex gap-4 md:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="admin-glass-surface rounded-2xl border border-[#E2E8F0] dark:border-[#1E3A3D] p-6">
              <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">Loading</p>
              <p className="text-lg font-bold text-[#0F172A] dark:text-white">—</p>
            </div>
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
            <h1 className="font-serif text-2xl font-bold text-[#0F172A] dark:text-white">Notifications</h1>
            <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Manage alerts and communications.</p>
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
          <h1 className="font-serif text-2xl font-bold text-[#0F172A] dark:text-white">Notifications</h1>
          <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Manage alerts and communications.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto justify-end">
          <button
            onClick={markAllRead}
            disabled={unreadCount === 0}
            className="admin-glass-control px-4 py-2.5 rounded-xl border text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Check size={16} /> Mark all as read
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="admin-glass-surface rounded-2xl border border-[#E2E8F0] dark:border-[#1E3A3D] p-6">
          <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">Total</p>
          <p className="text-lg font-bold text-[#0F172A] dark:text-white">{notifications.length}</p>
        </div>
        <div className="admin-glass-surface rounded-2xl border border-[#E2E8F0] dark:border-[#1E3A3D] p-6">
          <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">Unread</p>
          <p className={`text-lg font-bold ${unreadCount > 0 ? 'text-[#EF4444]' : 'text-[#10B981]'}`}>{unreadCount}</p>
        </div>
        <div className="admin-glass-surface rounded-2xl border border-[#E2E8F0] dark:border-[#1E3A3D] p-6">
          <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">Read</p>
          <p className="text-lg font-bold text-[#0F172A] dark:text-white">{notifications.length - unreadCount}</p>
        </div>
        <div className="admin-glass-surface rounded-2xl border border-[#E2E8F0] dark:border-[#1E3A3D] p-6">
          <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">Today</p>
          <p className="text-lg font-bold text-[#0F172A] dark:text-white">2</p>
        </div>
      </div>

      <div className="admin-glass-surface rounded-2xl border border-[#E2E8F0] dark:border-[#1E3A3D] p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] bg-gray-50 dark:bg-[#163A3F] text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#003B3D] focus:ring-1 focus:ring-[#003B3D] transition"
            />
          </div>
          <div className="flex flex-col gap-2 w-full sm:flex-row sm:w-auto">
            <select
              value={readFilter}
              onChange={(e) => setReadFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] bg-gray-50 dark:bg-[#163A3F] text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#003B3D] transition"
            >
              <option value="All">All</option>
              <option value="Unread">Unread</option>
              <option value="Read">Read</option>
            </select>
            <button
              onClick={() => { setSearch(''); setReadFilter('All') }}
              className="admin-glass-control px-4 py-2.5 rounded-xl border transition"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-gray-500">No notifications found.</div>
          ) : (
            filtered.map((n) => (
              <div
                key={n.id}
                onClick={() => { setSelected(n); setModalOpen(true) }}
                className={`admin-glass-sub-surface admin-notification-row flex items-center gap-4 p-4 rounded-xl border transition cursor-pointer ${!n.read ? 'admin-notification-unread' : ''}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${typeColor[n.type] || 'bg-gray-100'}`}>
                  <Bell size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#0F172A] dark:text-white truncate">{n.title}</p>
                  <p className="text-xs text-[#64748B] dark:text-[#94A3B8] truncate">{n.message}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${typeColor[n.type] || 'bg-gray-100 text-gray-600'}`}>{typeLabel[n.type]}</span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500">{n.time}</span>
                </div>
                {!n.read && <div className="w-2 h-2 rounded-full bg-[#EF4444] self-start mt-1" />}
              </div>
            ))
          )}
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Notification Details" size="md">
        {!selected ? null : (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${typeColor[selected.type] || 'bg-gray-100'}`}>
                <Bell size={20} />
              </div>
              <div>
                <p className="text-base font-bold text-[#0F172A] dark:text-white">{selected.title}</p>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider">{typeLabel[selected.type]} • {selected.time}</p>
              </div>
            </div>
            <p className="text-[#64748B] dark:text-[#94A3B8] text-sm leading-relaxed">{selected.message}</p>
          </div>
        )}
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl border border-gray-200 dark:border-[#1E3A3D] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#163A3F] transition">Close</button>
          {selected && !selected.read && (
            <button onClick={() => { markRead(selected.id); setModalOpen(false) }} className="px-4 py-2 rounded-xl bg-[#003B3D] text-white hover:bg-[#082B3B] transition">Mark as Read</button>
          )}
        </div>
      </Modal>
    </div>
  )
}
