import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setStatus('Please complete required fields.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStatus('Message received. We will respond shortly.')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    }, 800)
  }

  return (
    <div className="bg-white">
      <section className="pt-28 sm:pt-32 md:pt-[136px] pb-10 sm:pb-12 bg-[#003B3D] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#DFAF55] uppercase tracking-widest text-sm font-semibold mb-2">We're Here to Help</p>
          <h1 className="font-serif text-4xl mb-3">Contact Us</h1>
          <p className="text-white/80 max-w-2xl">We are here to help with your healthcare needs.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {[
              { icon: MapPin, label: 'Address', value: 'Plot 12, Independence Layout, Nigeria.', href: null },
              { icon: Phone, label: 'Phone', value: '+234 800 000 0000', href: 'tel:+2348000000000' },
              { icon: Mail, label: 'Email', value: 'info@avenorhospital.com', href: 'mailto:info@avenorhospital.com' },
              { icon: Clock, label: 'Hours', value: '24/7 Emergency', href: null },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-4 bg-[#F8FAFC] p-4 rounded-xl">
                <Icon className="text-[#F4BE65]" size={20} />
                <div>
                  <p className="text-sm text-gray-500">{label}</p>
                  {href ? <a href={href} className="text-[#003B3D] font-medium hover:underline">{value}</a> : <p className="text-[#003B3D] font-medium">{value}</p>}
                </div>
              </div>
            ))}
            <img src="https://res.cloudinary.com/hpjbmdes/image/upload/f_auto,q_auto,w_600/v1794952914/Emergency_entrance_building_exte__c92e5dc2_2K.jpg" alt="Entrance" loading="lazy" className="rounded-2xl w-full object-cover aspect-video" />
          </div>
          <form onSubmit={submit} aria-label="Contact us" className="bg-[#F8FAFC] p-5 sm:p-8 rounded-2xl space-y-4">
            <input aria-label="Full name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full Name *" className="w-full p-3 rounded-xl border" />
            <input aria-label="Email address" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email *" type="email" autoComplete="email" className="w-full p-3 rounded-xl border" />
            <input aria-label="Phone number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Phone" type="tel" autoComplete="tel" className="w-full p-3 rounded-xl border" />
            <input aria-label="Subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="Subject" className="w-full p-3 rounded-xl border" />
            <textarea aria-label="Message" required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Message *" rows={5} className="w-full p-3 rounded-xl border" />
            <button type="submit" disabled={loading} className="w-full bg-[#F4BE65] text-[#002B30] font-semibold py-3 rounded-xl hover:bg-[#FFD78D] transition">
              {loading ? 'Sending...' : 'Send Message'}
            </button>
            {status && <p role="status" aria-live="polite" className="text-sm text-[#003B3D]">{status}</p>}
          </form>
        </div>
      </section>

      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <img src="https://res.cloudinary.com/hpjbmdes/image/upload/f_auto,q_auto,w_600/v1794953032/Doctor-patient_consultation_fd66fc90_2K.jpg" alt="Consultation" loading="lazy" className="rounded-2xl w-full object-cover aspect-video" />
          <img src="https://res.cloudinary.com/hpjbmdes/image/upload/f_auto,q_auto,w_600/v1794952824/Changing_patient_experience_inte__74596633_2K.jpg" alt="Interior" loading="lazy" className="rounded-2xl w-full object-cover aspect-video" />
        </div>
      </section>

      <section className="py-16 text-center">
        <Link to="/book-appointment" className="bg-[#F4BE65] text-[#002B30] font-semibold px-6 py-3 rounded-xl hover:bg-[#FFD78D] transition">Book an Appointment</Link>
      </section>
    </div>
  )
}
