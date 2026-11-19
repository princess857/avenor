import { site } from '../../config/site'

export default function HeroContent() {
  return (
    <div className="px-4 xs:px-6 sm:px-12 md:px-16 max-w-full md:max-w-[55%] text-white">
      <p className="text-[#F4BE65] uppercase tracking-[0.3em] text-sm mb-4">{site.eyebrow}</p>
      <h1 className="font-serif mb-4 whitespace-pre-line" style={{ fontSize: 'clamp(2.25rem, 4.5vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>{site.title}</h1>
      <p className="text-[#FFD78D] font-medium mb-4" style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.5rem)' }}>{site.sub}</p>
      <p className="text-white/80 mb-8 max-w-md">{site.desc}</p>
      <div className="flex gap-4 flex-wrap">
        <button className="min-h-11 bg-[#F4BE65] text-[#002B30] font-sans font-semibold px-6 py-3 rounded-xl hover:bg-[#FFD78D] transition">Book Appointment</button>
        <button className="min-h-11 border border-white/40 text-white font-sans px-6 py-3 rounded-xl hover:bg-white/10 transition">Explore Services</button>
      </div>
    </div>
  )
}
