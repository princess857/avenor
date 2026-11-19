import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import * as Dialog from '@radix-ui/react-dialog'
import {
  BarChart3, Building2, Calendar, ChevronLeft, CreditCard, FileText, LayoutDashboard,
  LogOut, Settings, Stethoscope, UserRound, UserRoundCog, Users, X,
} from 'lucide-react'
import { useAdminAuth } from '../hooks/useAdminAuth'

const adminSections = [
  {
    label: 'Overview',
    items: [{ path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard }],
  },
  {
    label: 'Care operations',
    items: [
      { path: '/admin/appointments', label: 'Appointments', icon: Calendar },
      { path: '/admin/patients', label: 'Patients', icon: Users },
    ],
  },
  {
    label: 'Clinical team',
    items: [
      { path: '/admin/doctors', label: 'Doctors', icon: UserRound },
      { path: '/admin/departments', label: 'Departments', icon: Building2 },
      { path: '/admin/staff', label: 'Staff', icon: UserRoundCog },
      { path: '/admin/services', label: 'Medical Services', icon: Stethoscope },
    ],
  },
  {
    label: 'Finance & reports',
    items: [
      { path: '/admin/billing', label: 'Billing', icon: CreditCard },
      { path: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
      { path: '/admin/notifications', label: 'Notifications', icon: FileText },
    ],
  },
  {
    label: 'Administration',
    items: [
      { path: '/admin/website', label: 'Website Management', icon: Building2 },
      { path: '/admin/settings', label: 'Settings', icon: Settings },
    ],
  },
]

function LogoMark() {
  return (
    <svg width="34" height="34" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="44" height="44" rx="12" stroke="#F4BE65" strokeWidth="2" />
      <path d="M14 34 L24 12 L34 34" stroke="#F4BE65" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 26 H30" stroke="#FFD78D" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="12" r="2" fill="#FFD78D" />
    </svg>
  )
}

function Navigation({ collapsed, onNavigate }) {
  const location = useLocation()

  return (
    <nav aria-label="Admin navigation" className="min-h-0 flex-1 space-y-4 overflow-y-auto px-3 py-4">
      {adminSections.map((section) => (
        <section key={section.label}>
          {!collapsed && (
            <h2 className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/50">
              {section.label}
            </h2>
          )}
          <div className="space-y-1">
            {section.items.map(({ path, label, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/admin/dashboard'}
                onClick={onNavigate}
                title={collapsed ? label : undefined}
                className={({ isActive }) => `flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors focus-visible:outline-offset-2 ${
                  isActive
                    ? 'bg-white/12 text-[#FFE0A0] shadow-inner ring-1 ring-[#F4BE65]/25'
                    : 'text-white/75 hover:bg-white/10 hover:text-white'
                } ${collapsed ? 'justify-center' : ''}`}
                aria-current={location.pathname === path ? 'page' : undefined}
              >
                <Icon size={18} aria-hidden="true" />
                {!collapsed && <span className="truncate">{label}</span>}
              </NavLink>
            ))}
          </div>
        </section>
      ))}
    </nav>
  )
}

function SignOutButton({ collapsed = false }) {
  const navigate = useNavigate()
  const { logout } = useAdminAuth()

  const handleSignOut = async () => {
    await logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-white/75 transition hover:bg-white/10 hover:text-white focus-visible:outline-offset-2 ${collapsed ? 'justify-center' : ''}`}
      aria-label={collapsed ? 'Sign out' : undefined}
      title={collapsed ? 'Sign out' : undefined}
    >
      <LogOut size={18} aria-hidden="true" />
      {!collapsed && <span>Sign out</span>}
    </button>
  )
}

export default function Sidebar({ collapsed = false, onToggle, isMobile = false, isOpen = false, onClose }) {
  if (isMobile) {
    return (
      <Dialog.Root open={isOpen} onOpenChange={(open) => { if (!open) onClose() }}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[60] bg-[#082B3B]/60 backdrop-blur-sm lg:hidden" />
          <Dialog.Content className="admin-sidebar-glass fixed inset-y-0 left-0 z-[61] flex w-[min(19rem,88vw)] flex-col border-r border-white/10 text-white shadow-2xl outline-none lg:hidden">
            <Dialog.Title className="sr-only">Avenor admin navigation</Dialog.Title>
            <div className="flex min-h-16 items-center justify-between border-b border-white/10 px-4">
              <div className="flex items-center gap-3">
                <LogoMark />
                <div className="leading-tight">
                  <div className="font-serif text-lg font-bold uppercase tracking-wide">Avenor</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/60">Admin</div>
                </div>
              </div>
              <Dialog.Close asChild>
                <button type="button" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-white/75 hover:bg-white/10 hover:text-white" aria-label="Close admin navigation">
                  <X size={20} aria-hidden="true" />
                </button>
              </Dialog.Close>
            </div>
            <Navigation collapsed={false} onNavigate={onClose} />
            <div className="border-t border-white/10 p-3">
              <SignOutButton />
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    )
  }

  return (
    <aside
      aria-label="Admin sidebar"
      className={`admin-sidebar-glass fixed inset-y-0 left-0 z-30 hidden flex-col border-r border-white/10 text-white transition-[width] duration-200 lg:flex ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className={`flex min-h-16 items-center border-b border-white/10 px-3 ${collapsed ? 'flex-col justify-center gap-1 py-2' : 'justify-between'}`}>
        {!collapsed && <div className="flex items-center gap-3">
          <LogoMark />
          <div className="leading-tight">
            <div className="font-serif text-lg font-bold uppercase tracking-wide">Avenor</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/60">Admin</div>
          </div>
        </div>}
        <button
          type="button"
          onClick={onToggle}
          className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft size={17} className={collapsed ? 'rotate-180' : ''} aria-hidden="true" />
        </button>
      </div>
      <Navigation collapsed={collapsed} />
      <div className="border-t border-white/10 p-3">
        <SignOutButton collapsed={collapsed} />
      </div>
    </aside>
  )
}
