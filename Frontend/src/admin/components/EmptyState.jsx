import { Inbox } from 'lucide-react'

export function EmptyState({ title = 'No data available', description, action, actionLabel, icon: Icon = Inbox }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-[#003B3D]/10 dark:bg-[#003B3D]/20 flex items-center justify-center text-[#003B3D] dark:text-[#F4BE65] mb-4">
        <Icon size={24} />
      </div>
      <h3 className="font-semibold text-[#0F172A] dark:text-white">{title}</h3>
      {description && <p className="text-[#64748B] dark:text-[#94A3B8] text-sm mt-1 max-w-xs mx-auto">{description}</p>}
      {action && actionLabel && (
        <button onClick={action} className="mt-6 bg-[#003B3D] text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-[#082B3B] transition">
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export default EmptyState
