import { useState, useMemo } from 'react'
import { Search, Globe, FileText } from 'lucide-react'
import { useSupabaseResource } from '../hooks/useSupabaseResource'
import { websiteContent as demoWebsiteContent } from '../data/demoData'

export default function WebsiteManagement() {
  const [search, setSearch] = useState('')
  const [edits, setEdits] = useState({})
  const [saved, setSaved] = useState(new Set())

  const { data: websiteContent, loading, error } = useSupabaseResource('site_content', demoWebsiteContent, { orderBy: 'section' })

  const filtered = useMemo(() => {
    if (!websiteContent) return []
    return websiteContent.filter((c) =>
      c.section.toLowerCase().includes(search.toLowerCase()) ||
      c.field.toLowerCase().includes(search.toLowerCase()) ||
      (c.value && c.value.toLowerCase().includes(search.toLowerCase())) ||
      (c.currentValue && c.currentValue.toLowerCase().includes(search.toLowerCase()))
    )
  }, [websiteContent, search])

  const handleChange = (id, value) => {
    setEdits({ ...edits, [id]: value })
    setSaved(new Set([...saved].filter((s) => s !== id)))
  }

  const handleSave = (id) => {
    setSaved(new Set([...saved, id]))
  }

  const handleReset = (id) => {
    const original = websiteContent.find((c) => (c.section + c.field) === id)
    setEdits({ ...edits, [id]: original ? (original.value || original.currentValue) : '' })
    setSaved(new Set([...saved].filter((s) => s !== id)))
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#0F172A] dark:text-white">Website Management</h1>
            <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Manage public website content. Changes are preview-only and do not overwrite the live site.</p>
          </div>
        </div>
        <div className="flex gap-4 md:gap-6">
          {[1].map((i) => (
            <div key={i} className="bg-white dark:bg-[#0F2B30] rounded-2xl border border-[#E2E8F0] dark:border-[#1E3A3D] p-6 shadow-sm">
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
            <h1 className="font-serif text-2xl font-bold text-[#0F172A] dark:text-white">Website Management</h1>
            <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Manage public website content. Changes are preview-only and do not overwrite the live site.</p>
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
          <h1 className="font-serif text-2xl font-bold text-[#0F172A] dark:text-white">Website Management</h1>
          <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Manage public website content. Changes are preview-only and do not overwrite the live site.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto justify-end">
          <button className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0F2B30] hover:bg-gray-50 dark:hover:bg-[#163A3F] text-sm font-medium transition">
            <Globe size={16} /> Preview Site
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0F2B30] rounded-2xl border border-[#E2E8F0] dark:border-[#1E3A3D] p-6 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search section, field or value..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] bg-gray-50 dark:bg-[#163A3F] text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#003B3D] focus:ring-1 focus:ring-[#003B3D] transition"
            />
          </div>
          <span className="text-xs text-[#64748B] dark:text-[#94A3B8] bg-yellow-50 dark:bg-[#78350F]/20 text-[#92400E] dark:text-[#FCD34D] px-3 py-1 rounded-full">
            Preview mode - not published
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm divide-y divide-[#E2E8F0] dark:divide-[#1E3A3D]">
            <thead className="bg-gray-50 dark:bg-[#163A3F]">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">Section</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">Field</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">Current Value</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">Edited Value</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300 w-32">Status</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300 w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const id = item.section + item.field
                const currentValue = item.value ?? item.currentValue
                const edited = edits[id] ?? currentValue
                const isSaved = saved.has(id)
                const isDirty = edited !== currentValue
                return (
                  <tr key={id} className="bg-white dark:bg-[#0F2B30]">
                    <td className="px-4 py-3 text-gray-900 dark:text-white">{item.section}</td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white font-medium">{item.field}</td>
                    <td className="px-4 py-3 text-[#64748B] dark:text-[#94A3B8] text-xs truncate max-w-[200px]">{currentValue}</td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={edited}
                        onChange={(e) => handleChange(id, e.target.value)}
                        className="w-full pl-3 pr-4 py-2 rounded-xl border border-gray-200 dark:border-[#1E3A3D] bg-gray-50 dark:bg-[#163A3F] text-gray-900 dark:text-white text-xs focus:outline-none focus:border-[#003B3D] focus:ring-1 transition"
                      />
                    </td>
                    <td className="px-4 py-3">
                      {isSaved ? (
                        <span className="text-xs font-medium text-[#10B981]">Saved</span>
                      ) : isDirty ? (
                        <span className="text-xs font-medium text-[#F59E0B]">Unsaved</span>
                      ) : (
                        <span className="text-xs text-gray-400 dark:text-gray-500">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {isDirty && !isSaved && (
                        <button onClick={() => handleSave(id)} className="px-3 py-1.5 rounded text-[10px] font-medium bg-[#003B3D] text-white hover:bg-[#082B3B] transition">Save</button>
                      )}
                      {isDirty && (
                        <button onClick={() => handleReset(id)} className="ml-2 px-3 py-1.5 rounded text-[10px] font-medium border border-gray-200 dark:border-[#1E3A3D] text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#163A3F] transition">Reset</button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filtered.some((item) => {
          const id = item.section + item.field
          const currentValue = item.value ?? item.currentValue
          return edits[id] !== undefined && edits[id] !== currentValue && !saved.has(id)
        }) && (
          <div className="mt-4 p-4 rounded-xl bg-[#003B3D]/5 dark:bg-[#003B3D]/20 border border-[#003B3D]/20 flex items-center gap-3">
            <FileText size={18} className="text-[#003B3D]" />
            <div>
              <p className="text-sm font-medium text-[#0F172A] dark:text-white">Unsaved changes detected</p>
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">Save individual fields or discard changes. The live website will not be affected.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
