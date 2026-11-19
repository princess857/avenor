import { useState, useMemo, useId } from 'react'
import { Search, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { EmptyState } from './EmptyState'

export function DataTable({ columns, data, pageSize = 10, searchable = true, emptyMessage = 'No records found' }) {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sort, setSort] = useState({ key: null, direction: 'asc' })
  const searchId = useId()
  const dataColumns = columns.filter((column) => !column.actions)
  const hasActions = columns.some((column) => column.actions)

  const filteredData = useMemo(() => {
    let result = data
    if (search) {
      const term = search.toLowerCase()
      result = result.filter((row) =>
        columns.some((col) => {
          const val = row[col.key]
          return val != null && String(val).toLowerCase().includes(term)
        })
      )
    }
    if (sort.key) {
      result = [...result].sort((a, b) => {
        const aVal = a[sort.key]
        const bVal = b[sort.key]
        if (aVal < bVal) return sort.direction === 'asc' ? -1 : 1
        if (aVal > bVal) return sort.direction === 'asc' ? 1 : -1
        return 0
      })
    }
    return result
  }, [data, search, columns, sort])

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize))
  const paginated = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  return (
    <div className="admin-glass-surface min-w-0 overflow-hidden rounded-2xl border border-[var(--border-default)]">
      <div className="flex flex-col gap-3 border-b border-[var(--border-default)] p-4 sm:flex-row sm:items-center sm:justify-between">
        {searchable && (
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <label htmlFor={searchId} className="sr-only">Search table records</label>
            <input
              id={searchId}
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-[#1E3A3D] bg-gray-50 dark:bg-[#163A3F] text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#003B3D] focus:ring-1 focus:ring-[#003B3D] transition"
            />
          </div>
        )}
      </div>
      <div
        className="overflow-x-auto"
        role="region"
        aria-label={`${columns.map(({ label }) => label).join(', ')} table`}
        tabIndex={0}
      >
        <table className="admin-data-table w-full min-w-[36rem] text-sm">
          <thead className="bg-gray-50 dark:bg-[#163A3F]">
            <tr>
              {dataColumns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={sort.key === col.key ? (sort.direction === 'asc' ? 'ascending' : 'descending') : 'none'}
                  className="p-0 text-left font-medium text-gray-700 dark:text-gray-300"
                >
                  <button
                    type="button"
                    className={`flex min-h-11 w-full items-center px-4 py-3 text-left hover:bg-gray-100 focus-visible:z-10 dark:hover:bg-[#1E3A3D] transition ${sort.key === col.key ? 'text-[#003B3D] dark:text-[#F4BE65] font-bold' : ''}`}
                    onClick={() => setSort((prev) => (prev.key === col.key ? { key: col.key, direction: prev.direction === 'asc' ? 'desc' : 'asc' } : { key: col.key, direction: 'asc' }))}
                  >
                    {col.label}
                    {sort.key === col.key && (sort.direction === 'asc' ? <ArrowUpDown size={14} className="ml-1" aria-hidden="true" /> : <ArrowUpDown size={14} className="ml-1 rotate-180" aria-hidden="true" />)}
                  </button>
                </th>
              ))}
              {hasActions && <th scope="col" className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300 w-20">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0] dark:divide-[#1E3A3D]">
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={dataColumns.length + (hasActions ? 1 : 0)} className="px-4 py-8 text-center">
                  <EmptyState title={emptyMessage} />
                </td>
              </tr>
            ) : (
              paginated.map((row) => (
                <tr key={row.id} className="bg-white dark:bg-[#0F2B30] hover:bg-gray-50 dark:hover:bg-[#163A3F] transition">
                  {dataColumns.map((col) => {
                    const val = row[col.key]
                    return (
                      <td key={col.key} className="px-4 py-3 text-gray-900 dark:text-white">
                        {col.render ? col.render(val, row) : val}
                      </td>
                    )
                  })}
                  {hasActions && (
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {columns
                          .filter((c) => c.actions)
                          .flatMap((c) => c.actions)
                          .map((action, index) => (
                            <button
                              key={`${action.label}-${index}`}
                              onClick={(e) => {
                                e.stopPropagation()
                                action.handler(row)
                              }}
                              className="p-2 rounded-lg text-gray-500 hover:text-[#003B3D] dark:hover:text-[#F4BE65] transition"
                              title={action.label}
                            >
                              {action.icon ? <action.icon size={16} /> : null}
                            </button>
                          ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-[var(--border-default)] p-3">
        <div className="text-xs text-[var(--text-muted)]">
          Showing {filteredData.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} entries
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-[#1E3A3D] text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#163A3F] disabled:opacity-50 disabled:cursor-not-allowed transition text-sm"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-[#1E3A3D] text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#163A3F] disabled:opacity-50 disabled:cursor-not-allowed transition text-sm"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default DataTable
