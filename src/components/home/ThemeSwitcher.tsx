import { Palette } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { usePreferences, type ThemeId } from '@/app/PreferencesContext'
import { useTranslations } from '@/utils/i18n'

const THEME_SWATCHES: { id: ThemeId; color: string }[] = [
  { id: 'navy-saffron', color: '#163f73' },
  { id: 'maroon-gold', color: '#6f2634' },
  { id: 'royal-blue-teal', color: '#1c4e89' },
  { id: 'emerald-sage', color: '#156547' },
  { id: 'clean-white', color: '#f1f5f9' },
  { id: 'chaiui', color: '#b45309' },
]

export function ThemeSwitcher() {
  const { theme, setTheme } = usePreferences()
  const t = useTranslations()
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        bottom: '0.85rem',
        right: '0.85rem',
        zIndex: 45,
        fontSize: '0.74rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
      }}
    >
      {open && (
        <div
          role="region"
          aria-label={t.themeSwitcher.heading}
          style={{
            marginBottom: '0.4rem',
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid var(--line)',
            borderRadius: '0.6rem',
            padding: '0.45rem',
            boxShadow: '0 6px 18px rgba(16, 35, 63, 0.1)',
            minWidth: '10.75rem',
          }}
        >
          <p
            style={{
              margin: '0 0 0.35rem',
              padding: '0 0.35rem',
              fontWeight: 700,
              fontSize: '0.65rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--ink-soft)',
            }}
          >
            {t.themeSwitcher.heading}
          </p>
          {THEME_SWATCHES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTheme(item.id)}
              aria-pressed={theme === item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                width: '100%',
                padding: '0.32rem 0.45rem',
                background: theme === item.id ? 'var(--brand-soft)' : 'transparent',
                border: 'none',
                borderRadius: '0.35rem',
                cursor: 'pointer',
                fontSize: '0.74rem',
                color: theme === item.id ? 'var(--brand-strong)' : 'var(--ink)',
                fontWeight: theme === item.id ? 700 : 500,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: '0.68rem',
                  height: '0.68rem',
                  borderRadius: '50%',
                  background: item.color,
                  border: '1px solid rgba(0,0,0,0.18)',
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
              {t.themeSwitcher.themes[item.id]}
            </button>
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={t.themeSwitcher.heading}
        aria-expanded={open}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.3rem',
          padding: '0.3rem 0.55rem',
          background: open || hovered ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.45)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          color: 'var(--ink-soft)',
          border: '1px solid rgba(16, 35, 63, 0.14)',
          borderRadius: '0.45rem',
          cursor: 'pointer',
          fontSize: '0.7rem',
          fontWeight: 600,
          opacity: open || hovered ? 1 : 0.7,
          transition: 'opacity 0.15s ease, background 0.15s ease',
        }}
      >
        <Palette size={13} aria-hidden="true" />
        <span>{t.themeSwitcher.buttonLabel}</span>
      </button>
    </div>
  )
}
