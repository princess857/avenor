import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const depts = [
  { name: 'Cardiology', img: 'https://res.cloudinary.com/hpjbmdes/image/upload/f_auto,q_auto,w_600/v1794953200/cardiology.jpg', desc: 'Comprehensive heart and vascular care including diagnosis, treatment and prevention of cardiovascular conditions. Our cardiologists manage hypertension, heart failure, arrhythmias and coronary artery disease with evidence-based protocols.' },
  { name: 'Paediatrics', img: 'https://res.cloudinary.com/hpjbmdes/image/upload/f_auto,q_auto,w_600/v1794953150/Paediatrician_examining_child_pa__af2c8f7a_2K.jpg', desc: 'Specialized medical care for infants, children and adolescents, focusing on growth, development and childhood illnesses. We provide immunisation, developmental assessments and family-centred care.' },
  { name: 'Obstetrics & Gynaecology', img: 'https://res.cloudinary.com/hpjbmdes/image/upload/f_auto,q_auto,w_600/v1794953129/Obstetrician_interacting_with_pa__d5b3ce9a_2K.jpg', desc: 'Maternal health, prenatal care, childbirth and women\'s reproductive health services. Our team supports safe pregnancies and comprehensive gynaecological care.' },
  { name: 'General Surgery', img: 'https://res.cloudinary.com/hpjbmdes/image/upload/f_auto,q_auto,w_600/v1794953113/Surgeon_with_patient_fbbb57d1_2K.jpg', desc: 'Surgical procedures for a wide range of conditions with patient-centred recovery. We perform both elective and emergency surgeries with modern techniques.' },
  { name: 'Dermatology', img: 'https://res.cloudinary.com/hpjbmdes/image/upload/f_auto,q_auto,w_600/v1794953174/Dermatologist_with_patient_db7e66bf_2K.jpg', desc: 'Diagnosis and treatment of skin, hair and nail conditions. Services include acne, eczema, psoriasis and skin cancer screening.' },
  { name: 'Radiology', img: 'https://res.cloudinary.com/hpjbmdes/image/upload/f_auto,q_auto,w_600/v1794953302/Diagnostic_imaging_centre.jpg', desc: 'Advanced imaging services including X-ray, ultrasound and CT for accurate diagnosis and treatment planning.' },
  { name: 'Emergency Medicine', img: 'https://res.cloudinary.com/hpjbmdes/image/upload/f_auto,q_auto,w_600/v1794953273/emergency_department.jpg', desc: '24/7 emergency care for urgent medical needs, trauma and acute illnesses with rapid response teams.' },
  { name: 'Intensive Care Unit', img: 'https://res.cloudinary.com/hpjbmdes/image/upload/f_auto,q_auto,w_600/v1794953327/intenseCare_unit.jpg', desc: 'Critical care for patients requiring close monitoring and life support, managed by specialized ICU teams.' },
  { name: 'Laboratory Medicine', img: 'https://res.cloudinary.com/hpjbmdes/image/upload/f_auto,q_auto,w_600/v1794953237/medical_laboratory_A.jpg', desc: 'Comprehensive laboratory diagnostics supporting accurate diagnosis and treatment decisions.' },
  { name: 'Rehabilitation', img: 'https://res.cloudinary.com/hpjbmdes/image/upload/f_auto,q_auto,w_600/v1794953217/rehabilitation-centre.jpg', desc: 'Physiotherapy and rehabilitation services to restore function and improve quality of life.' },
]

export default function Departments() {
  return (
    <div className="bg-white">
      <section className="pt-28 sm:pt-32 md:pt-[136px] pb-10 sm:pb-12 bg-[#003B3D] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#DFAF55] uppercase tracking-widest text-sm font-semibold mb-2">Our Specialties</p>
          <h1 className="font-serif text-4xl mb-3">Medical Departments</h1>
          <p className="text-white/80 max-w-2xl">Comprehensive specialties under one roof.</p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {depts.map((d) => (
            <motion.div key={d.name} whileHover={{ y: -4 }} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <img src={d.img} alt={d.name} loading="lazy" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="font-serif text-xl text-[#003B3D] mb-2">{d.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{d.desc}</p>
                <Link to="/book-appointment" className="text-[#F4BE65] font-semibold text-sm">View Department →</Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="py-16 text-center">
        <Link to="/book-appointment" className="bg-[#F4BE65] text-[#002B30] font-semibold px-6 py-3 rounded-xl hover:bg-[#FFD78D] transition">Book Appointment</Link>
      </section>
    </div>
  )
}
