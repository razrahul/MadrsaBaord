import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import type { HeroSlide } from '@/types/home'
import { useTranslations } from '@/utils/i18n'

interface HeroSectionProps {
  slides: HeroSlide[]
}

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

export function HeroSection({ slides }: HeroSectionProps) {
  const t = useTranslations()
  const [current, setCurrent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const reducedMotion = useReducedMotion()
  const total = slides.length

  const goTo = useCallback((index: number) => setCurrent((index + total) % total), [total])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])
  const next = useCallback(() => goTo(current + 1), [current, goTo])

  useEffect(() => {
    if (reducedMotion || !isPlaying || isPaused || total <= 1) return
    intervalRef.current = setInterval(next, 5000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [current, isPlaying, isPaused, next, reducedMotion, total])

  const handleKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prev()
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        next()
      }
    },
    [prev, next]
  )

  const pad = (n: number) => String(n).padStart(2, '0')
  const slide = slides[current]
  if (!slide) return null

  const localized = t.heroSlides[slide.id as keyof typeof t.heroSlides]
  const eyebrow = localized?.eyebrow ?? slide.eyebrow
  const title = localized?.title ?? slide.title
  const description = localized?.description ?? slide.description
  const primaryLabel = localized?.primaryLabel ?? slide.primaryAction?.label
  const secondaryLabel = localized?.secondaryLabel ?? slide.secondaryAction?.label

  return (
    <section
      id="home"
      className="bg-gradient-to-br from-brand-strong to-brand py-8"
      role="region"
      aria-roledescription="carousel"
      aria-label={t.heroControls.carouselLabel}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKey}
      tabIndex={-1}
    >
      <div className="site-shell grid grid-cols-1 items-center gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">
        {/* Copy */}
        <div className="text-on-brand">
          <p className="mb-1.5 text-xs font-medium text-white/80">
            {eyebrow}
          </p>
          <h1
            id="hero-title"
            className="mb-3 max-w-[19ch] font-serif text-[1.65rem] leading-[1.16] font-bold tracking-tight sm:text-[clamp(1.75rem,3vw,2.55rem)]"
          >
            {title}
          </h1>
          <p className="mb-5 max-w-xl text-base leading-relaxed text-white/85">{description}</p>
          <div className="flex flex-wrap gap-3">
            {slide.primaryAction && primaryLabel && (
              <a
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-white px-4 py-2.5 text-sm font-bold text-brand-strong no-underline transition-colors hover:bg-surface-muted"
                href={slide.primaryAction.href}
              >
                {primaryLabel} <ArrowRight size={16} aria-hidden="true" />
              </a>
            )}
            {slide.secondaryAction && secondaryLabel && (
              <a
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-white/45 bg-transparent px-4 py-2.5 text-sm font-bold text-white no-underline transition-colors hover:bg-white/10"
                href={slide.secondaryAction.href}
              >
                {secondaryLabel}
              </a>
            )}
          </div>
        </div>

        {/* Media */}
        <div className="relative min-h-70 overflow-hidden rounded-sm border border-white/20 shadow-[0_8px_24px_rgb(10_22_40_/_20%)] sm:min-h-78">
          {slides.map((s, i) => (
            <img
              key={s.id}
              src={s.imageUrl}
              alt={s.imageAlt}
              aria-hidden={i !== current ? true : undefined}
              className="absolute inset-0 size-full object-cover"
              style={{
                opacity: i === current ? 1 : 0,
                transition: reducedMotion ? 'none' : 'opacity 0.4s ease',
              }}
            />
          ))}

          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent"
            aria-hidden="true"
          />

          <span className="sr-only" aria-live="polite" aria-atomic="true">
            {current + 1} / {total}: {title}
          </span>

          <div
            className="absolute right-3 bottom-3 z-10 inline-flex items-center gap-2 text-xs font-extrabold tracking-widest text-white sm:right-5 sm:bottom-5"
            aria-label={t.heroControls.carouselLabel}
          >
            <button
              type="button"
              onClick={prev}
              aria-label={t.heroControls.prevSlide}
              className="grid size-8.5 place-items-center rounded-full border border-white/40 bg-white/15 text-white transition hover:bg-white/25"
            >
              <ChevronLeft size={16} aria-hidden="true" />
            </button>
            <span aria-hidden="true">
              {pad(current + 1)} / {pad(total)}
            </span>
            <button
              type="button"
              onClick={next}
              aria-label={t.heroControls.nextSlide}
              className="grid size-8.5 place-items-center rounded-full border border-white/40 bg-white/15 text-white transition hover:bg-white/25"
            >
              <ChevronRight size={16} aria-hidden="true" />
            </button>
            {!reducedMotion && (
              <button
                type="button"
                onClick={() => setIsPlaying((p) => !p)}
                aria-label={isPlaying ? t.heroControls.pause : t.heroControls.play}
                className="grid size-8.5 place-items-center rounded-full border border-white/40 bg-white/15 text-white transition hover:bg-white/25"
              >
                {isPlaying ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
