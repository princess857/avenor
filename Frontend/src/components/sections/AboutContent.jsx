import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart, Shield, Users, Stethoscope } from 'lucide-react'
import { hospitalImages } from '../../config/images'

export default function AboutContent() {
  return (
    <>
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#003B3D] mb-4">Who We Are</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">Avenor International Hospital is a trusted healthcare institution committed to delivering quality, compassionate and patient-centred medical care. We combine medical expertise, modern technology and personalised treatment.</p>
            <p className="text-gray-700 text-lg leading-relaxed">Our approach focuses on the wellbeing of individuals, families and the wider community.</p>
          </div>
          <img src={hospitalImages.about.reception} alt="Reception" loading="lazy" className="rounded-2xl shadow-lg w-full object-cover aspect-[4/3]" />
        </div>
      </section>

      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-3xl font-bold text-[#003B3D] mb-6 text-center">Our Story</h2>
          <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto text-center">Built around a philosophy of compassionate, evidence-based care, Avenor continues to develop its services to meet the evolving needs of patients and the community.</p>
        </div>
      </section>

      <section className="py-20">
          <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            { icon: Heart, title: 'Mission', desc: 'To provide quality, compassionate, safe and patient-centred healthcare through professional medical services and continuous improvement.' },
            { icon: Shield, title: 'Vision', desc: 'To become a trusted healthcare institution recognised for excellence, innovation, compassion and positive contributions to community health.' },
            { icon: Users, title: 'Values', desc: 'Compassion, integrity, excellence, professionalism, patient safety, teamwork, accountability and innovation.' },
          ].map(({ icon: Icon, title, desc }) => (
            <motion.div key={title} whileHover={{ y: -4 }} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <Icon className="text-[#F4BE65] mb-4" size={28} />
              <h3 className="font-serif text-xl font-bold text-[#003B3D] mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-3xl font-bold text-[#003B3D] mb-8 text-center">Why Choose Avenor</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {['Patient-centred care','Qualified professionals','Comprehensive services','Modern diagnostics','Safe environment','Respect and dignity'].map(b => (
              <div key={b} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                <Stethoscope className="text-[#F4BE65]" size={20} />
                <span className="text-[#003B3D] font-medium">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#003B3D] mb-4">Our Approach to Patient Care</h2>
            <ul className="text-gray-700 text-lg space-y-2">
              <li>Initial consultation and assessment.</li>
              <li>Diagnosis and treatment planning.</li>
              <li>Personalised medical care.</li>
              <li>Treatment and monitoring.</li>
              <li>Follow-up and continued support.</li>
            </ul>
          </div>
          <img src={hospitalImages.about.medicalTeam} alt="Medical team" loading="lazy" className="rounded-2xl shadow-lg w-full object-cover aspect-[4/3]" />
        </div>
      </section>

      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl font-bold text-[#003B3D] mb-4">Our Medical Team</h2>
          <p className="text-gray-700 text-lg mb-6 max-w-3xl mx-auto">A multidisciplinary team of doctors, nurses, laboratory professionals, pharmacists and support staff.</p>
          <Link to="/doctors" className="bg-[#F4BE65] text-[#002B30] font-semibold px-6 py-3 rounded-xl hover:bg-[#FFD78D] transition">Meet Our Doctors</Link>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl font-bold text-[#003B3D] mb-4">Community Health Commitment</h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">We promote preventive healthcare, health education and community awareness.</p>
        </div>
      </section>

      <section className="py-20 text-center">
        <h2 className="font-serif text-3xl font-bold text-[#003B3D] mb-6">Ready to experience exceptional care?</h2>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/book-appointment" className="bg-[#F4BE65] text-[#002B30] font-semibold px-6 py-3 rounded-xl hover:bg-[#FFD78D] transition">Book Appointment</Link>
          <Link to="/departments" className="border border-[#003B3D] text-[#003B3D] px-6 py-3 rounded-xl hover:bg-[#003B3D] hover:text-white transition">Explore Departments</Link>
          <Link to="/contact" className="border border-[#003B3D] text-[#003B3D] px-6 py-3 rounded-xl hover:bg-[#003B3D] hover:text-white transition">Contact Us</Link>
        </div>
      </section>
    </>
  )
}
