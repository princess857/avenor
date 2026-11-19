import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const services = [
  { title: 'General Medical Consultations', img: 'https://res.cloudinary.com/hpjbmdes/image/upload/f_auto,q_auto,w_600/v1794953032/Doctor-patient_consultation_fd66fc90_2K.jpg', desc: 'Comprehensive primary care consultations covering assessment, diagnosis and treatment planning for a wide range of health concerns including fever, infections, chronic conditions and preventive care.' },
  { title: 'Dermatology Services', img: 'https://res.cloudinary.com/hpjbmdes/image/upload/f_auto,q_auto,w_600/v1794953090/Dermatologist_examining_patient_8476c5d8_2K.jpg', desc: 'Diagnosis and treatment of skin, hair and nail conditions including acne, eczema, psoriasis and skin cancer screening with patient-centred dermatological care.' },
  { title: 'Nursing & Home Care', img: 'https://res.cloudinary.com/hpjbmdes/image/upload/f_auto,q_auto,w_600/v1794953011/Providing_compassionate_nursing___a9492cea_2K.jpg', desc: 'Compassionate nursing support and home care services for recovery, chronic illness management and post-treatment follow-up.' },
  { title: 'Maternity & Antenatal Care', img: 'https://res.cloudinary.com/hpjbmdes/image/upload/f_auto,q_auto,w_600/v1794952987/Maternity_experience_with_interi__46124d18_2K.jpg', desc: 'Maternal health services including antenatal care, delivery support, postnatal follow-up and newborn care.' },
  { title: 'Pharmacy Services', img: 'https://res.cloudinary.com/hpjbmdes/image/upload/f_auto,q_auto,w_600/v1794952935/Person_in_hospital_pharmacy_6997962c_2K.jpg', desc: 'Hospital pharmacy providing medication dispensing, counselling and prescription management.' },
  { title: 'Preventive Healthcare', img: 'https://res.cloudinary.com/hpjbmdes/image/upload/f_auto,q_auto,w_600/v1794952883/Remodeling_wellness_and_checkup___35cdc9de_2K.jpg', desc: 'Health screening and wellness checkups for early detection and prevention of disease.' },
]

export default function Services() {
  return (
    <div className="bg-white">
      <section className="pt-28 sm:pt-32 md:pt-[136px] pb-10 sm:pb-12 bg-[#003B3D] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#DFAF55] uppercase tracking-widest text-sm font-semibold mb-2">Exceptional Care</p>
          <h1 className="font-serif text-4xl mb-3">Medical Services</h1>
          <p className="text-white/80 max-w-2xl">Comprehensive healthcare services for every need.</p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, idx) => (
            <motion.div key={idx} whileHover={{ y: -4 }} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {s.img ? (
                <img src={s.img} alt={s.title} loading="lazy" className="w-full h-48 object-cover" />
              ) : (
                <div className="w-full h-48 bg-[#F8FAFC] flex items-center justify-center">
                  <s.icon size={48} className="text-[#F4BE65]" />
                </div>
              )}
              <div className="p-6">
                <h3 className="font-serif text-xl text-[#003B3D] mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{s.desc}</p>
                <div className="flex gap-3">
                  <button className="flex-1 border border-[#003B3D] text-[#003B3D] py-2 rounded-xl hover:bg-[#003B3D] hover:text-white transition text-sm">Learn More</button>
                  <Link to="/book-appointment" className="flex-1 bg-[#F4BE65] text-[#002B30] py-2 rounded-xl text-center text-sm font-semibold hover:bg-[#FFD78D] transition">Book</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="py-16 text-center">
        <Link to="/book-appointment" className="bg-[#F4BE65] text-[#002B30] font-semibold px-6 py-3 rounded-xl hover:bg-[#FFD78D] transition">Book an Appointment</Link>
      </section>
    </div>
  )
}
