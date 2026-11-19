import { useState } from 'react'

const depts = ['Cardiology','Paediatrics','Obstetrics & Gynaecology','General Surgery','Dermatology','Radiology','Emergency Medicine']
const formFieldClass = 'w-full rounded-xl border border-slate-400 bg-white p-3 text-slate-900 placeholder:text-slate-600 shadow-sm ring-1 ring-slate-200 transition focus:border-[#003B3D] focus:outline-none focus:ring-2 focus:ring-[#003B3D]/30'

export default function BookAppointment() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', dob: '', gender: '', dept: '', doctor: '', date: '', time: '', type: 'In-person', reason: '', message: '', consent: false })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const today = new Date().toISOString().split('T')[0]

  const submit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone || !form.dept || !form.date || !form.consent) {
      setStatus('Please complete required fields.')
      return
    }
    if (form.date < today) {
      setStatus('Appointment date cannot be in the past.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStatus('Appointment request submitted (demo).')
    }, 800)
  }

  return (
    <div className="bg-white">
      <section className="pt-28 sm:pt-32 md:pt-[136px] pb-10 sm:pb-12 bg-[#003B3D] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#DFAF55] uppercase tracking-widest text-sm font-semibold mb-2">Appointment Request</p>
          <h1 className="font-serif text-4xl mb-3">Book an Appointment</h1>
          <p className="text-white/80 max-w-2xl">Schedule your visit with our specialists.</p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <form onSubmit={submit} aria-label="Appointment request" className="bg-[#F8FAFC] p-5 sm:p-8 rounded-2xl space-y-4">
            <input aria-label="Full name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full Name *" className={formFieldClass} />
            <input aria-label="Email address" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email *" type="email" autoComplete="email" className={formFieldClass} />
            <input aria-label="Phone number" required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Phone *" type="tel" autoComplete="tel" className={formFieldClass} />
            <input aria-label="Date of birth" value={form.dob} onChange={e => setForm({ ...form, dob: e.target.value })} type="date" className={formFieldClass} />
            <select aria-label="Gender" value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })} className={formFieldClass}>
              <option value="">Gender</option><option>Male</option><option>Female</option><option>Other</option>
            </select>
            <select aria-label="Preferred department" required value={form.dept} onChange={e => setForm({ ...form, dept: e.target.value })} className={formFieldClass}>
              <option value="">Preferred Department *</option>
              {depts.map(d => <option key={d}>{d}</option>)}
            </select>
            <input aria-label="Preferred doctor (optional)" value={form.doctor} onChange={e => setForm({ ...form, doctor: e.target.value })} placeholder="Preferred Doctor (optional)" className={formFieldClass} />
            <input aria-label="Appointment date" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} type="date" min={today} className={formFieldClass} />
            <input aria-label="Appointment time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} type="time" className={formFieldClass} />
            <select aria-label="Appointment type" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className={formFieldClass}>
              <option>In-person</option><option>Virtual</option>
            </select>
            <textarea aria-label="Reason for appointment" value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} placeholder="Reason for appointment" rows={3} className={formFieldClass} />
            <textarea aria-label="Additional message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Additional message" rows={3} className={formFieldClass} />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" required checked={form.consent} onChange={e => setForm({ ...form, consent: e.target.checked })} className="size-4 shrink-0 accent-[#003B3D]" /> I consent to be contacted.
            </label>
            <button type="submit" disabled={loading} className="w-full bg-[#F4BE65] text-[#002B30] font-semibold py-3 rounded-xl hover:bg-[#FFD78D] transition">
              {loading ? 'Submitting...' : 'Submit Appointment'}
            </button>
            {status && <p role="status" aria-live="polite" className="text-sm text-[#003B3D]">{status}</p>}
          </form>
          <div className="space-y-6">
            <img src="https://res.cloudinary.com/hpjbmdes/image/upload/f_auto,q_auto,w_600/v1794953032/Doctor-patient_consultation_fd66fc90_2K.jpg" alt="Consultation" loading="lazy" className="rounded-2xl w-full object-cover aspect-video" />
            <div className="bg-[#F8FAFC] p-6 rounded-2xl">
              <h3 className="font-serif text-xl text-[#003B3D] mb-3">Guidelines</h3>
            <ul className="text-gray-600 text-sm space-y-4">
              <li><strong>Provide Accurate Personal Information:</strong> Enter your correct full name, phone number, email and other requested details so the hospital can contact you and maintain proper appointment records.</li>
              <li><strong>Select the Appropriate Department:</strong> Choose the department relevant to your medical concerns and the service you require to ensure you see the right specialist.</li>
              <li><strong>Choose a Convenient Appointment Date and Time:</strong> Select an available date and suitable time and submit early enough to allow proper scheduling.</li>
              <li><strong>Describe Your Medical Concerns:</strong> Provide a brief but useful explanation of your symptoms or reason for consultation to help the team prepare.</li>
              <li><strong>Review Your Appointment Details:</strong> Verify your information, selected department, date and contact details before submitting.</li>
              <li><strong>Wait for Appointment Confirmation:</strong> Submitting a request does not guarantee confirmation; wait for communication from the hospital.</li>
              <li><strong>Arrive on Time:</strong> Arrive 15–20 minutes early for registration and preliminary procedures.</li>
              <li><strong>Bring Relevant Medical Documents:</strong> Bring previous test results, prescriptions, reports and ID where applicable.</li>
            </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
