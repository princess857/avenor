import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const facilities = [
  { name: 'Intensive Care Unit (ICU)', img: 'https://res.cloudinary.com/hpjbmdes/image/upload/f_auto,q_auto,w_600/v1794953327/intenseCare_unit.jpg', desc: 'The Intensive Care Unit provides critical care for patients requiring close monitoring and life support, managed by specialized ICU teams with advanced equipment and continuous observation.' },
  { name: 'Diagnostic Imaging Centre', img: 'https://res.cloudinary.com/hpjbmdes/image/upload/f_auto,q_auto,w_600/v1794953302/Diagnostic_imaging_centre.jpg', desc: 'Advanced imaging services including X-ray, ultrasound and CT for accurate diagnosis and treatment planning, supported by qualified radiology professionals.' },
  { name: 'Emergency Department', img: 'https://res.cloudinary.com/hpjbmdes/image/upload/f_auto,q_auto,w_600/v1794953273/emergency_department.jpg', desc: '24/7 emergency care for urgent medical needs, trauma and acute illnesses with rapid response teams and immediate assessment.' },
  { name: 'Medical Laboratory', img: 'https://res.cloudinary.com/hpjbmdes/image/upload/f_auto,q_auto,w_600/v1794953237/medical_laboratory_A.jpg', desc: 'Comprehensive laboratory diagnostics supporting accurate diagnosis and treatment decisions through reliable testing services.' },
  { name: 'Rehabilitation Centre', img: 'https://res.cloudinary.com/hpjbmdes/image/upload/f_auto,q_auto,w_600/v1794953217/rehabilitation-centre.jpg', desc: 'Physiotherapy and rehabilitation services to restore function, improve mobility and support recovery after illness or surgery.' },
  { name: 'Patient Waiting Lounge', img: 'https://res.cloudinary.com/hpjbmdes/image/upload/f_auto,q_auto,w_600/v1794953256/Waiting_lounge.jpg', desc: 'Comfortable waiting areas designed to provide a calm and supportive environment for patients and visitors.' },
  { name: 'Maternity Suite', img: 'https://res.cloudinary.com/hpjbmdes/image/upload/f_auto,q_auto,w_600/v1794952845/Maternity_suit_interior_change_9ea9c694_2K.jpg', desc: 'Maternity rooms providing a safe and comfortable environment for childbirth and postnatal care.' },
  { name: 'Paediatric Department', img: 'https://res.cloudinary.com/hpjbmdes/image/upload/f_auto,q_auto,w_600/v1794952832/Redecorating_pediatric_departmen__fd72cfd5_2K.jpg', desc: 'Child-friendly spaces designed to make paediatric care welcoming and reassuring for young patients.' },
  { name: 'Hospital Entrance', img: 'https://res.cloudinary.com/hpjbmdes/image/upload/f_auto,q_auto,w_600/v1794952914/Emergency_entrance_building_exte__c92e5dc2_2K.jpg', desc: 'Main entrance providing accessible and welcoming access to hospital services.' },
  { name: 'Modern Medical Equipment', img: 'https://res.cloudinary.com/hpjbmdes/image/upload/f_auto,q_auto,w_600/v1794952892/Modify_medical_equipment_interior_87af4a2f_2K.jpg', desc: 'Advanced medical equipment supporting accurate diagnosis and effective treatment across departments.' },
]

export default function Facilities() {
  return (
    <div className="bg-white">
      <section className="pt-28 sm:pt-32 md:pt-[136px] pb-10 sm:pb-12 bg-[#003B3D] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#DFAF55] uppercase tracking-widest text-sm font-semibold mb-2">Our Facilities</p>
          <h1 className="font-serif text-4xl mb-3">Hospital Facilities</h1>
          <p className="text-white/80 max-w-2xl">Modern facilities designed for patient comfort and care.</p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((f, idx) => (
            <motion.div key={idx} whileHover={{ y: -4 }} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <img src={f.img} alt={f.name} loading="lazy" className="w-full h-52 object-cover" />
              <div className="p-6">
                <h3 className="font-serif text-xl text-[#003B3D] mb-2">{f.name}</h3>
                <p className="text-gray-600 text-sm">{f.desc}</p>
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
