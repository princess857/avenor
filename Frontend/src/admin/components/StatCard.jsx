import { TrendingUp, TrendingDown } from 'lucide-react'

export function StatCard({ title, value, icon: Icon, trend, subtitle }) {
  const isPositive = trend >= 0
  return (
    <div className="admin-glass-surface rounded-2xl border border-[var(--border-default)] p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="mb-1 text-sm font-medium uppercase tracking-wider text-[var(--text-muted)]">{title}</p>
          <p className="text-2xl font-bold text-[var(--text-primary)]">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-[var(--text-muted)]">{subtitle}</p>}
        </div>
        <div className="flex size-10 items-center justify-center rounded-xl bg-[#003B3D]/10 text-[#003B3D] dark:bg-[#F4BE65]/15 dark:text-[#F4BE65]">
          <Icon size={18} />
        </div>
      </div>
      {trend !== undefined && (
        <div className="mt-4 flex items-center gap-1">
          {isPositive ? <TrendingUp size={12} className="text-[#10B981]" /> : <TrendingDown size={12} className="text-[#EF4444]" />}
          <span className={`text-xs font-semibold ${isPositive ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
            {Math.abs(trend)}% vs last period
          </span>
        </div>
      )}
    </div>
  )
}

export default StatCard
