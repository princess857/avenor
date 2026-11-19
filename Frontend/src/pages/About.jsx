import AboutContent from '../components/sections/AboutContent'

export default function About() {
  return (
    <div className="bg-white">
      <section className="pt-28 sm:pt-32 md:pt-[136px] pb-6 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#DFAF55] uppercase tracking-widest text-sm font-semibold mb-2">About Avenor</p>
          <h1 className="font-serif text-4xl font-bold text-[#003B3D] mt-2">About Avenor International Hospital</h1>
        </div>
      </section>
      <AboutContent />
    </div>
  )
}
