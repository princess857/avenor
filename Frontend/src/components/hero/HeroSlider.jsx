import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { heroSlides } from '../../config/heroSlides'
import HeroControls from './HeroControls'

const responsiveSrcSet = (src) =>
  [480, 768, 1200, 1600]
    .map((width) => `${src.replace('/f_auto,q_auto/', `/f_auto,q_auto,w_${width},c_limit/`)} ${width}w`)
    .join(', ')

export default function HeroSlider({ children }) {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const touchStart = useRef(null)

  useEffect(() => {
    const next = new Image()
    const nextSrc = heroSlides[(i + 1) % heroSlides.length]
    next.srcset = responsiveSrcSet(nextSrc)
    next.sizes = '100vw'
    next.src = nextSrc
  }, [i])

  useEffect(() => {
    if (paused || prefersReducedMotion) return
    const timer = setInterval(() => setI((p) => (p + 1) % heroSlides.length), 6000)
    return () => clearInterval(timer)
  }, [paused, prefersReducedMotion])

  const go = (d) => setI((p) => (p + d + heroSlides.length) % heroSlides.length)
  const handleTouchStart = (event) => {
    const touch = event.changedTouches[0]
    touchStart.current = { x: touch.clientX, y: touch.clientY }
  }
  const handleTouchEnd = (event) => {
    if (!touchStart.current) return
    const touch = event.changedTouches[0]
    const deltaX = touch.clientX - touchStart.current.x
    const deltaY = touch.clientY - touchStart.current.y
    touchStart.current = null
    if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY)) {
      go(deltaX > 0 ? -1 : 1)
    }
  }

  return (
    <section className="relative w-full overflow-hidden bg-[#082B3B] md:min-h-[100svh]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div
        className="relative aspect-[16/9] max-h-[55svh] w-full overflow-hidden bg-[#082B3B] touch-pan-y sm:max-h-[60svh] md:absolute md:inset-0 md:aspect-auto md:max-h-none md:h-auto"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={i}
            initial={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
            animate={prefersReducedMotion ? { opacity: 1 } : { x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { x: '-100%' }}
            transition={{ duration: prefersReducedMotion ? 0.12 : 0.7, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <img
              src={heroSlides[i]}
              srcSet={responsiveSrcSet(heroSlides[i])}
              sizes="100vw"
              alt=""
              fetchPriority={i === 0 ? 'high' : 'auto'}
              className="h-full w-full object-contain md:object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <HeroControls onPrev={() => go(-1)} onNext={() => go(1)} slides={heroSlides} current={i} onDot={setI} />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 aspect-[16/9] max-h-[55svh] bg-gradient-to-r from-[#082B3B]/60 via-[#003B3D]/15 to-transparent sm:max-h-[60svh] md:inset-0 md:aspect-auto md:max-h-none md:h-auto md:bg-gradient-to-r md:from-[#082B3B]/80 md:via-[#003B3D]/40 md:to-transparent" />
      {children({ i, go, slides: heroSlides, setI })}
    </section>
  )
}
