import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import Home from './pages/Home'
import About from './pages/About'
import Doctors from './pages/Doctors'
import Departments from './pages/Departments'
import Services from './pages/Services'
import Facilities from './pages/Facilities'
import Contact from './pages/Contact'
import BookAppointment from './pages/BookAppointment'
import AdminLayout from './admin/layouts/AdminLayout'
import AdminLogin from './admin/pages/AdminLogin'
import Dashboard from './admin/pages/Dashboard'
import Appointments from './admin/pages/Appointments'
import Patients from './admin/pages/Patients'
import AdminDoctors from './admin/pages/Doctors'
import AdminDepartments from './admin/pages/Departments'
import Staff from './admin/pages/Staff'
import AdminServices from './admin/pages/Services'
import Billing from './admin/pages/Billing'
import Analytics from './admin/pages/Analytics'
import Notifications from './admin/pages/Notifications'
import WebsiteManagement from './admin/pages/WebsiteManagement'
import Settings from './admin/pages/Settings'
import NotFound from './components/layout/NotFound'
import { useAdminAuth } from './admin/hooks/useAdminAuth'

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { isAuthenticated, loading, hasRole } = useAdminAuth()
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#082B3B]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#003B3D] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />
  if (allowedRoles && !hasRole(allowedRoles)) {
    return <Navigate to="/admin/dashboard" replace />
  }
  return children || <Outlet />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/services" element={<Services />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="appointments" element={
              <ProtectedRoute allowedRoles={['super_administrator', 'hospital_administrator', 'doctor', 'receptionist', 'accountant', 'staff']}>
                <Appointments />
              </ProtectedRoute>
            } />
            <Route path="patients" element={
              <ProtectedRoute allowedRoles={['super_administrator', 'hospital_administrator', 'doctor', 'receptionist', 'accountant', 'staff']}>
                <Patients />
              </ProtectedRoute>
            } />
            <Route path="doctors" element={
              <ProtectedRoute allowedRoles={['super_administrator', 'hospital_administrator']}>
                <AdminDoctors />
              </ProtectedRoute>
            } />
            <Route path="departments" element={
              <ProtectedRoute allowedRoles={['super_administrator', 'hospital_administrator']}>
                <AdminDepartments />
              </ProtectedRoute>
            } />
            <Route path="staff" element={
              <ProtectedRoute allowedRoles={['super_administrator', 'hospital_administrator']}>
                <Staff />
              </ProtectedRoute>
            } />
            <Route path="services" element={
              <ProtectedRoute allowedRoles={['super_administrator', 'hospital_administrator', 'accountant']}>
                <AdminServices />
              </ProtectedRoute>
            } />
            <Route path="billing" element={
              <ProtectedRoute allowedRoles={['super_administrator', 'hospital_administrator', 'accountant']}>
                <Billing />
              </ProtectedRoute>
            } />
            <Route path="analytics" element={
              <ProtectedRoute allowedRoles={['super_administrator', 'hospital_administrator', 'accountant']}>
                <Analytics />
              </ProtectedRoute>
            } />
            <Route path="notifications" element={<Notifications />} />
            <Route path="website" element={
              <ProtectedRoute allowedRoles={['super_administrator', 'hospital_administrator']}>
                <WebsiteManagement />
              </ProtectedRoute>
            } />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
