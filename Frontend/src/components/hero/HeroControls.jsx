import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function HeroControls({ onPrev, onNext, slides, current, onDot }) {
  return (
    <>
      <button type="button" aria-label="Previous slide" onClick={onPrev} className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 z-20 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-[#082B3B]/45 text-white/90 hover:text-[#F4BE65]">
        <ArrowLeft aria-hidden="true" className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>
      <button type="button" aria-label="Next slide" onClick={onNext} className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-[#082B3B]/45 text-white/90 hover:text-[#F4BE65]">
        <ArrowRight aria-hidden="true" className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Go to slide ${idx + 1}`}
            aria-pressed={idx === current}
            onClick={() => onDot(idx)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full"
          >
            <span className={`h-2.5 rounded-full transition-all ${idx === current ? 'bg-[#F4BE65] w-8' : 'bg-white/60 w-3'}`} />
          </button>
        ))}
      </div>
    </>
  )
}
