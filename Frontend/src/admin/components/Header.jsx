import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Bell, ChevronDown, Home, Menu, Moon, Sun, UserRound } from 'lucide-react'
import { useAdminAuth } from '../hooks/useAdminAuth'
import { useTheme } from '../hooks/useTheme'

const breadcrumbMap = {
  '/admin/dashboard': 'Dashboard',
  '/admin/appointments': 'Appointments',
  '/admin/patients': 'Patients',
  '/admin/doctors': 'Doctors',
  '/admin/departments': 'Departments',
  '/admin/staff': 'Staff',
  '/admin/services': 'Medical Services',
  '/admin/billing': 'Billing',
  '/admin/analytics': 'Analytics',
  '/admin/notifications': 'Notifications',
  '/admin/website': 'Website Management',
  '/admin/settings': 'Settings',
}

export default function Header({ onMenuClick }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { user, role, logout } = useAdminAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const current = breadcrumbMap[location.pathname] || 'Dashboard'

  const handleSignOut = async () => {
    await logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <header className="admin-glass-header sticky top-0 z-40 border-b">
      <div className="flex min-h-16 items-center gap-3 px-4 sm:px-6">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-[#334155] hover:bg-gray-100 focus-visible:outline-offset-2 dark:text-gray-200 dark:hover:bg-[#163A3F] lg:hidden"
          aria-label="Open admin navigation"
          aria-haspopup="dialog"
        >
          <Menu size={20} aria-hidden="true" />
        </button>

        <div className="min-w-0 flex-1">
          <div className="hidden items-center gap-2 text-xs text-[#64748B] dark:text-[#94A3B8] sm:flex">
            <Home size={14} aria-hidden="true" />
            <span>Avenor Admin</span>
            <span aria-hidden="true">/</span>
            <span className="truncate font-medium text-[#0F172A] dark:text-white">{current}</span>
          </div>
          <span className="block truncate text-sm font-semibold text-[#0F172A] dark:text-white sm:hidden">{current}</span>
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-[#475569] hover:bg-gray-100 focus-visible:outline-offset-2 dark:text-gray-200 dark:hover:bg-[#163A3F]"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={19} aria-hidden="true" /> : <Sun size={19} aria-hidden="true" />}
          </button>

          <Link
            to="/admin/notifications"
            className="relative inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-[#475569] hover:bg-gray-100 focus-visible:outline-offset-2 dark:text-gray-200 dark:hover:bg-[#163A3F]"
            aria-label="Notifications"
          >
            <Bell size={19} aria-hidden="true" />
            <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-[#B42318]" />
          </Link>

          <DropdownMenu.Root open={userMenuOpen} onOpenChange={setUserMenuOpen}>
            <DropdownMenu.Trigger asChild>
              <button
                type="button"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl px-2 text-[#334155] hover:bg-gray-100 focus-visible:outline-offset-2 dark:text-gray-200 dark:hover:bg-[#163A3F] sm:px-3"
                aria-label="Open account menu"
              >
                <span className="inline-flex size-8 items-center justify-center rounded-full bg-[#003B3D]/10 text-[#003B3D] dark:bg-[#F4BE65]/15 dark:text-[#FFD78D]">
                  <UserRound size={17} aria-hidden="true" />
                </span>
                <span className="hidden max-w-36 text-left sm:block">
                  <span className="block truncate text-xs font-semibold">{user?.email || 'Administrator'}</span>
                  <span className="block truncate text-[11px] capitalize text-[#64748B] dark:text-[#94A3B8]">{(role || 'admin').replaceAll('_', ' ')}</span>
                </span>
                <ChevronDown size={15} className="hidden sm:block" aria-hidden="true" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="end"
                sideOffset={8}
                className="admin-glass-popover z-[100] min-w-52 rounded-xl border p-1.5 outline-none"
              >
                <DropdownMenu.Label className="px-3 py-2 text-xs text-[#64748B] dark:text-[#94A3B8]">
                  {user?.email || 'Administrator'}
                </DropdownMenu.Label>
                <DropdownMenu.Separator className="my-1 h-px bg-[#E2E8F0] dark:bg-[#1E3A3D]" />
                <DropdownMenu.Item asChild>
                  <Link to="/admin/settings" className="flex min-h-10 items-center rounded-lg px-3 text-sm text-[#0F172A] outline-none hover:bg-gray-100 focus:bg-gray-100 dark:text-white dark:hover:bg-[#163A3F] dark:focus:bg-[#163A3F]">
                    Account settings
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onSelect={handleSignOut}
                  className="flex min-h-10 cursor-pointer items-center rounded-lg px-3 text-sm text-[#B42318] outline-none hover:bg-red-50 focus:bg-red-50 dark:hover:bg-red-950/30 dark:focus:bg-red-950/30"
                >
                  Sign out
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
    </header>
  )
}
