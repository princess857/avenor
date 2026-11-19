import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { site } from '../../config/site'
import AvenorLogo from './AvenorLogo'

const pathMap = {
  Home: '/',
  About: '/about',
  Departments: '/departments',
  Doctors: '/doctors',
  Services: '/services',
  Facilities: '/facilities',
  Contact: '/contact',
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <nav className="fixed left-0 right-0 top-0 z-[1000] mx-auto w-full max-w-[calc(100%-24px)] pt-3 sm:w-[92%] sm:max-w-6xl sm:pt-5">
      <div style={{ background: 'rgba(15,65,65,0.75)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }} className="rounded-[24px] px-4 sm:px-8 h-[70px] sm:h-[80px] flex items-center justify-between border border-white/10 shadow-lg">
        <AvenorLogo />
        <div className="hidden xl:flex min-w-0 items-center gap-4 sm:gap-6">
          {site.nav.map((l) => (
            <NavLink key={l} to={pathMap[l]} className={({ isActive }) => `font-sans text-xs sm:text-sm transition relative ${isActive ? 'text-[#F4BE65]' : 'text-white/90 hover:text-[#F4BE65]'}`}>
              {({ isActive }) => (<>{l}{isActive && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#F4BE65]" />}</>)}
            </NavLink>
          ))}
          <button onClick={() => navigate('/book-appointment')} className="bg-[#F4BE65] text-[#002B30] font-sans font-semibold px-5 py-2 rounded-xl hover:bg-[#FFD78D] transition">Book Appointment</button>
        </div>
        <button
          type="button"
          className="relative z-50 xl:hidden min-h-11 min-w-11 inline-flex items-center justify-center text-white rounded-lg hover:bg-white/10 focus-visible:outline-offset-2"
          onClick={() => setOpen((isOpen) => !isOpen)}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          aria-controls="public-mobile-navigation"
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      {open && (
        <div id="public-mobile-navigation" className="xl:hidden mt-3 bg-[#003B3D]/95 backdrop-blur-xl rounded-2xl p-4 flex flex-col gap-2 border border-white/10 shadow-2xl z-[1001]">
          {site.nav.map((l) => (
            <NavLink key={l} to={pathMap[l]} onClick={() => setOpen(false)} className="flex min-h-11 items-center text-white/90 text-sm px-3 rounded-lg hover:bg-white/10 focus-visible:outline-offset-2">{l}</NavLink>
          ))}
          <button type="button" onClick={() => { navigate('/book-appointment'); setOpen(false) }} className="min-h-11 bg-[#F4BE65] text-[#002B30] font-semibold px-5 py-2 rounded-xl">Book Appointment</button>
        </div>
      )}
    </nav>
  )
}
