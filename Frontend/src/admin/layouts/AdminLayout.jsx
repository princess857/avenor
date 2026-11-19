import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

export default function AdminLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 1023px)').matches)
  const location = useLocation()

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)')
    const updateViewport = (event) => setIsMobile(event.matches)

    mediaQuery.addEventListener('change', updateViewport)
    return () => mediaQuery.removeEventListener('change', updateViewport)
  }, [])

  return (
    <div className="admin-app flex min-h-screen">
      {!isMobile && <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((value) => !value)} />}
      {isMobile && (
        <Sidebar
          isMobile
          isOpen={mobileDrawerOpen}
          onClose={() => setMobileDrawerOpen(false)}
        />
      )}
      <div className={`flex min-h-screen min-w-0 flex-1 flex-col transition-[margin] duration-200 ${
        isMobile ? 'ml-0' : sidebarCollapsed ? 'ml-20' : 'ml-64'
      }`}>
        <Header onMenuClick={() => setMobileDrawerOpen(true)} />
        <main className="min-w-0 flex-1 overflow-x-hidden p-4 sm:p-5 lg:p-7">
          <Outlet context={{ location }} />
        </main>
      </div>
    </div>
  )
}
