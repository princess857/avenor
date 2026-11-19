import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, Globe, ArrowUp } from 'lucide-react'
import AvenorLogo from './AvenorLogo'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subStatus, setSubStatus] = useState('')
  const year = new Date().getFullYear()

  const subscribe = (e) => {
    e.preventDefault()
    if (!email) { setSubStatus('Please enter an email address.'); return }
    setSubStatus('Subscription requests are handled on the server. No data saved in this demo.')
  }

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const navLinks = [
    ['Home', '/'], ['About Us', '/about'], ['Our Doctors', '/doctors'], ['Departments', '/departments'],
    ['Medical Services', '/services'], ['Facilities', '/facilities'], ['Book Appointment', '/book-appointment'], ['Contact Us', '/contact'],
  ]

  const serviceLinks = [
    'General Medical Consultation', 'Emergency Care', 'Laboratory Services', 'Radiology and Imaging',
    'Maternity Care', 'Paediatric Care', 'Surgical Services', 'Physiotherapy and Rehabilitation',
  ]

  return (
    <footer className="bg-[#082B3B] text-white">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24 grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
        <div className="lg:col-span-1">
          <AvenorLogo />
          <p className="text-white/60 text-sm leading-relaxed mt-6 lg:mt-8">
            Avenor International Hospital is committed to delivering quality, compassionate and patient-centred healthcare.
          </p>
          <div className="flex gap-4 mt-8 lg:mt-10">
            <a href="#" className="text-white/50 hover:text-[#F4BE65] transition"><Globe size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className="font-serif text-[#DFAF55] text-base md:text-lg tracking-wide mb-6 lg:mb-8">Quick Navigation</h4>
          {navLinks.map(([l, p]) => (
            <Link key={l} to={p} className="block text-white/60 text-sm md:text-base mb-3 hover:text-[#FFD78D] transition">{l}</Link>
          ))}
        </div>

        <div>
          <h4 className="font-serif text-[#DFAF55] text-base md:text-lg tracking-wide mb-6 lg:mb-8">Our Services</h4>
          {serviceLinks.map(s => (
            <Link key={s} to="/services" className="block text-white/60 text-sm md:text-base mb-3 hover:text-[#FFD78D] transition">{s}</Link>
          ))}
        </div>

        <div>
          <h4 className="font-serif text-[#DFAF55] text-base md:text-lg tracking-wide mb-6 lg:mb-8">Contact Information</h4>
          <div className="space-y-5 text-sm md:text-base">
            <div className="flex items-start gap-3"><MapPin size={17} className="text-[#DFAF55] mt-0.5" /><span>Plot 12, Independence Layout, Nigeria.</span></div>
            <div className="flex items-center gap-3"><Phone size={17} className="text-[#DFAF55]" /><a href="tel:+2348000000000" className="hover:text-[#FFD78D] transition">+234 800 000 0000</a></div>
            <div className="flex items-center gap-3"><Mail size={17} className="text-[#DFAF55]" /><a href="mailto:info@avenorhospital.com" className="hover:text-[#FFD78D] transition">info@avenorhospital.com</a></div>
            <div className="flex items-start gap-3"><Clock size={17} className="text-[#DFAF55] mt-0.5" /><span>For appointment availability and consultation hours, please contact our hospital directly.</span></div>
          </div>
          <div className="mt-8 lg:mt-10">
            <p className="text-white/50 text-sm md:text-base">Emergency contact: use the phone number above.</p>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="bg-[#003B3D]/90 backdrop-blur-lg rounded-[24px] p-5 sm:p-8 lg:p-12 border border-white/10 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="text-center lg:text-left flex-1">
              <h2 className="font-serif text-3xl sm:text-4xl text-white mb-4 lg:mb-5">Stay Connected</h2>
              <p className="text-white/60 text-sm lg:text-base mb-6 lg:mb-0">
                Subscribe to receive hospital updates, health information and important announcements.
              </p>
            </div>
            <div className="flex-1 min-w-0">
              <form onSubmit={subscribe} className="flex w-full max-w-lg flex-col gap-3 sm:flex-row lg:ml-auto">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  autoComplete="email"
                  required
                  aria-describedby={subStatus ? 'newsletter-status' : undefined}
                  placeholder="Enter your email address"
                  className="min-w-0 w-full flex-1 px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl text-[#123B40] placeholder-[#64748B] bg-white border border-white/20 focus:border-[#DFAF55] focus:ring-1 focus:ring-[#DFAF55] transition"
                />
                <button type="submit" className="min-h-12 w-full sm:w-auto bg-[#DFAF55] text-[#123B40] font-semibold px-6 py-3.5 sm:py-4 rounded-xl hover:bg-[#FFD78D] transition whitespace-nowrap">Subscribe</button>
              </form>
              {subStatus && <p id="newsletter-status" role="status" aria-live="polite" className="mt-3 text-xs text-white/75">{subStatus}</p>}
            </div>
          </div>
          <p className="mt-6 lg:mt-8 text-center lg:text-left text-white/50 text-sm lg:text-base">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </section>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 lg:py-8 flex flex-col lg:flex-row justify-between items-center gap-4 text-xs lg:text-sm text-white/40">
          <span>© {year} Avenor International Hospital. All rights reserved.</span>
          <div className="flex gap-6 lg:gap-8">
            <span className="hover:text-[#F4BE65] cursor-pointer transition">Privacy Policy</span>
            <span className="hover:text-[#F4BE65] cursor-pointer transition">Terms and Conditions</span>
            <button onClick={scrollTop} className="hover:text-[#F4BE65] flex items-center gap-1 transition"><ArrowUp size={14} /> Back to Top</button>
          </div>
        </div>
      </div>
    </footer>
  )
}
