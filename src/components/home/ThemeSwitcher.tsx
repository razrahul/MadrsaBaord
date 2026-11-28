import { Palette } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { usePreferences, type ThemeId } from '@/app/PreferencesContext'
import { cn } from '@/lib/utils'
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
      className="fixed right-3.5 bottom-3.5 z-45 flex flex-col items-end text-xs"
    >
      {open && (
        <div
          role="region"
          aria-label={t.themeSwitcher.heading}
          className="mb-1.5 min-w-44 rounded-sm border border-line bg-white/95 p-2 shadow-[0_6px_18px_rgb(16_35_63_/_10%)] backdrop-blur-md"
        >
          <p className="m-0 mb-1.5 px-1.5 text-[10px] font-bold tracking-wider text-ink-soft uppercase">
            {t.themeSwitcher.heading}
          </p>
          {THEME_SWATCHES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTheme(item.id)}
              aria-pressed={theme === item.id}
              className={cn(
                'flex w-full items-center gap-2 rounded-xs border-0 px-2 py-1.5 text-start text-xs transition',
                theme === item.id
                  ? 'bg-brand-soft font-bold text-brand-strong'
                  : 'bg-transparent font-medium text-ink hover:bg-surface-muted'
              )}
            >
              <span
                aria-hidden="true"
                className="inline-block size-2.5 shrink-0 rounded-full border border-black/20"
                style={{ backgroundColor: item.color }}
              />
              {t.themeSwitcher.themes[item.id]}
            </button>
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={t.themeSwitcher.heading}
        aria-expanded={open}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-sm border border-ink/15 px-2.5 py-1 text-[11px] font-semibold text-ink-soft backdrop-blur-sm transition hover:bg-white/85 hover:opacity-100',
          open ? 'bg-white/85 opacity-100' : 'bg-white/45 opacity-70'
        )}
      >
        <Palette size={13} aria-hidden="true" />
        <span>{t.themeSwitcher.buttonLabel}</span>
      </button>
    </div>
  )
}
