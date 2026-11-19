import { hospitalImages } from '../../config/images'

export default function AboutSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-[#F4BE65] uppercase tracking-[0.3em] text-sm mb-3">About Avenor</p>
          <h2 className="font-serif text-4xl text-[#003B3D] mb-6">A Legacy of Healing, A Future of Innovation</h2>
          <p className="text-gray-600 mb-4">Avenor International Hospital delivers world-class healthcare with cutting-edge technology and compassionate specialists.</p>
          <p className="text-gray-600">Our mission: exceptional care for every patient. Vision: a healthier world through advanced medicine.</p>
        </div>
        <img src={hospitalImages.about.reception} alt="Reception" loading="lazy" className="rounded-2xl shadow-lg w-full object-cover aspect-[4/3]" />
      </div>
    </section>
  )
}
