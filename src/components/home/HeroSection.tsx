import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import type { HeroSlide } from '@/types/home'

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
  const [current, setCurrent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const reducedMotion = useReducedMotion()
  const total = slides.length

  const goTo = useCallback(
    (index: number) => setCurrent((index + total) % total),
    [total]
  )

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

  return (
    <section
      id="home"
      className="hero-section"
      role="region"
      aria-roledescription="carousel"
      aria-label="Hero carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKey}
      tabIndex={-1}
    >
      <div className="site-shell hero-grid">
        {/* Copy */}
        <div className="hero-copy">
          <p className="eyebrow">{slide.eyebrow}</p>
          <h1 id="hero-title">{slide.title}</h1>
          <p className="hero-description">{slide.description}</p>
          <div className="hero-actions">
            {slide.primaryAction && (
              <a className="button button-primary" href={slide.primaryAction.href}>
                {slide.primaryAction.label} <ArrowRight size={16} aria-hidden="true" />
              </a>
            )}
            {slide.secondaryAction && (
              <a className="button button-secondary" href={slide.secondaryAction.href}>
                {slide.secondaryAction.label}
              </a>
            )}
          </div>
        </div>

        {/* Media */}
        <div className="hero-media">
          {slides.map((s, i) => (
            <img
              key={s.id}
              src={s.imageUrl}
              alt={s.imageAlt}
              aria-hidden={i !== current ? true : undefined}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: i === current ? 1 : 0,
                transition: reducedMotion ? 'none' : 'opacity 0.4s ease',
              }}
            />
          ))}

          <span className="sr-only" aria-live="polite" aria-atomic="true">
            Slide {current + 1} of {total}: {slide.title}
          </span>

          <div className="hero-controls" aria-label="Carousel controls">
            <button type="button" onClick={prev} aria-label="Previous slide">
              <ChevronLeft size={16} aria-hidden="true" />
            </button>
            <span aria-hidden="true">
              {pad(current + 1)} / {pad(total)}
            </span>
            <button type="button" onClick={next} aria-label="Next slide">
              <ChevronRight size={16} aria-hidden="true" />
            </button>
            {!reducedMotion && (
              <button
                type="button"
                onClick={() => setIsPlaying((p) => !p)}
                aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
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
