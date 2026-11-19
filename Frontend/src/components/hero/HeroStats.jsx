import { site } from '../../config/site'
import { Activity, Stethoscope, Heart, Clock } from 'lucide-react'

const icons = [Activity, Stethoscope, Heart, Clock]

export default function HeroStats() {
  return (
    <div className="bg-[#003B3D]/70 backdrop-blur-md rounded-2xl p-4 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 w-full max-w-4xl">
      {site.stats.map((s, idx) => {
        const Icon = icons[idx]
        return (
          <div key={s.label} className="text-center">
            <Icon className="text-[#F4BE65] mx-auto mb-2" size={22} />
            <div className="text-white font-serif text-xl sm:text-2xl">{s.value}</div>
            <div className="text-white/70 text-[11px] sm:text-xs">{s.label}</div>
          </div>
        )
      })}
    </div>
  )
}
