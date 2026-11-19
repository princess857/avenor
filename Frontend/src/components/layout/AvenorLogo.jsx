export default function AvenorLogo({ size = 'md' }) {
  const s = size === 'sm' ? 28 : 36
  return (
    <div className="flex items-center gap-3">
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="44" height="44" rx="12" stroke="#F4BE65" strokeWidth="2" />
        <path d="M14 34 L24 12 L34 34" stroke="#F4BE65" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M18 26 H30" stroke="#FFD78D" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="24" cy="12" r="2" fill="#FFD78D" />
      </svg>
      <div className="leading-tight">
        <div className="font-serif text-white text-lg md:text-xl tracking-wide uppercase">Avenor</div>
        <div className="text-white/70 text-[10px] md:text-xs tracking-[0.25em] uppercase">International Hospital</div>
      </div>
    </div>
  )
}
