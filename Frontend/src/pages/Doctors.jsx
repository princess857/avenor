import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, User } from 'lucide-react'

const doctors = [
  { specialty: 'Senior Doctor', img: 'https://res.cloudinary.com/hpjbmdes/image/upload/f_auto,q_auto,w_600,c_fill,g_face/v1794821557/gallery-C.jpg', desc: 'Experienced clinician providing comprehensive primary and preventive care.' },
  { specialty: 'Cardiologist', img: 'https://res.cloudinary.com/hpjbmdes/image/upload/f_auto,q_auto,w_600,c_fill,g_face/v1794951305/senior-cardiologist.jpg', desc: 'Specialist in heart and vascular conditions.' },
  { specialty: 'Paediatrician', img: 'https://res.cloudinary.com/hpjbmdes/image/upload/f_auto,q_auto,w_600,c_fill,g_face/v1794951333/male_paediatrician.jpg', desc: 'Child health and development specialist.' },
  { specialty: 'General Surgeon', img: 'https://res.cloudinary.com/hpjbmdes/image/upload/f_auto,q_auto,w_600,c_fill,g_face/v1794951372/female_general_surgeon.jpg', desc: 'Surgical care across a range of conditions.' },
  { specialty: 'Gynaecologist', img: 'https://res.cloudinary.com/hpjbmdes/image/upload/f_auto,q_auto,w_600,c_fill,g_face/v1794951397/male-gynaecologist.jpg', desc: 'Women\'s reproductive health specialist.' },
  { specialty: 'Orthopaedic Surgeon', img: 'https://res.cloudinary.com/hpjbmdes/image/upload/f_auto,q_auto,w_600,c_fill,g_face/v1794951415/male_orthopaedic_surgeon.jpg', desc: 'Bone, joint and musculoskeletal care.' },
]
const searchInputClass = 'w-full rounded-xl border border-slate-400 bg-white py-2 pl-10 pr-4 text-slate-900 placeholder:text-slate-600 shadow-sm ring-1 ring-slate-200 transition focus:border-[#003B3D] focus:outline-none focus:ring-2 focus:ring-[#003B3D]/30'

export default function Doctors() {
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('All')
  const specialties = ['All', ...new Set(doctors.map(d => d.specialty))]
  const filtered = doctors.filter(d => (filter === 'All' || d.specialty === filter) && d.specialty.toLowerCase().includes(q.toLowerCase()))
  return (
    <div className="bg-white">
      <section className="pt-28 sm:pt-32 md:pt-[136px] pb-10 sm:pb-12 bg-[#003B3D] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#DFAF55] uppercase tracking-widest text-sm font-semibold mb-2">Meet Our Doctors</p>
          <h1 className="font-serif text-4xl mb-3">Our Medical Team</h1>
          <p className="text-white/80 max-w-2xl">Experienced, compassionate professionals dedicated to patient care.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-3xl text-[#003B3D] mb-4">Introduction to Our Medical Team</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">Our multidisciplinary team delivers accurate diagnosis and personalised treatment through collaboration and ethical practice.</p>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input aria-label="Search specialty" value={q} onChange={e => setQ(e.target.value)} placeholder="Search specialty" className={searchInputClass} />
          </div>
          <div className="flex flex-wrap gap-2">
            {specialties.map(s => (
              <button key={s} type="button" aria-pressed={filter === s} onClick={() => setFilter(s)} className={`min-h-10 rounded-full border px-3 py-1 text-sm font-medium transition focus-visible:outline-offset-2 ${filter === s ? 'border-[#DFAF55] bg-[#F4BE65] text-[#002B30]' : 'border-slate-400 bg-white text-slate-700 hover:border-[#003B3D] hover:bg-slate-50'}`}>{s}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((d, idx) => (
            <motion.div key={idx} whileHover={{ y: -4 }} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <img src={d.img} alt={d.specialty} loading="lazy" className="w-full h-64 object-cover" />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <User size={16} className="text-[#F4BE65]" />
                  <h3 className="font-serif text-xl text-[#003B3D]">{d.specialty}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">{d.desc}</p>
                <div className="flex gap-3">
                  <button className="flex-1 border border-[#003B3D] text-[#003B3D] py-2 rounded-xl hover:bg-[#003B3D] hover:text-white transition text-sm">View Profile</button>
                  <Link to="/book-appointment" className="flex-1 bg-[#F4BE65] text-[#002B30] py-2 rounded-xl text-center text-sm font-semibold hover:bg-[#FFD78D] transition">Book</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-3xl text-[#003B3D] mb-6 text-center">Medical Specialties</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {['General Medicine','Cardiology','Paediatrics','Obstetrics & Gynaecology','General Surgery','Dermatology','Emergency Medicine'].map(s => (
              <div key={s} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-[#003B3D] font-medium">{s}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="font-serif text-3xl text-[#003B3D] mb-4">Our Approach to Patient Care</h2>
            <ul className="text-gray-700 space-y-2">
              <li>Listening carefully to patients.</li>
              <li>Thorough assessments.</li>
              <li>Clear explanations.</li>
              <li>Personalised treatment plans.</li>
              <li>Monitoring and follow-up.</li>
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-3xl text-[#003B3D] mb-4">Collaborative Healthcare</h2>
            <p className="text-gray-700">Doctors work with nurses, lab scientists, pharmacists, radiographers and physiotherapists.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F8FAFC] text-center">
        <h2 className="font-serif text-3xl text-[#003B3D] mb-6">Why Trust Our Medical Team?</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {['Patient-centred care','Professional responsibility','Compassion','Evidence-based decisions','Teamwork','Confidentiality'].map(b => (
            <span key={b} className="bg-white px-4 py-2 rounded-full shadow-sm text-[#003B3D]">{b}</span>
          ))}
        </div>
      </section>

      <section className="py-16 text-center">
        <Link to="/book-appointment" className="bg-[#F4BE65] text-[#002B30] font-semibold px-6 py-3 rounded-xl hover:bg-[#FFD78D] transition mr-4">Book an Appointment</Link>
        <Link to="/departments" className="border border-[#003B3D] text-[#003B3D] px-6 py-3 rounded-xl hover:bg-[#003B3D] hover:text-white transition">Explore Departments</Link>
      </section>
    </div>
  )
}
