import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function MainLayout() {
  return (
    <div className="public-site relative">
      <Navbar />
      <main className="pt-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
