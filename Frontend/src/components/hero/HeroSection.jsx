import HeroSlider from './HeroSlider'
import HeroContent from './HeroContent'
import HeroStats from './HeroStats'
import HeroCurve from './HeroCurve'

export default function HeroSection() {
  return (
    <HeroSlider>
      {() => (
        <>
          <div className="relative z-20 flex flex-col justify-center gap-6 px-0 py-8 pb-20 sm:py-10 md:min-h-[100svh] md:pt-32 md:pb-12">
            <HeroContent />
            <div className="w-full max-w-4xl px-4 sm:px-12 md:px-16">
              <HeroStats />
            </div>
          </div>
          <HeroCurve />
        </>
      )}
    </HeroSlider>
  )
}
