import { Palette } from 'lucide-react'
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'bsmeb-theme'

const themes = [
  { id: 'navy-saffron', label: 'Navy / Saffron', color: '#163f73' },
  { id: 'maroon-gold', label: 'Maroon / Gold', color: '#6f2634' },
  { id: 'royal-blue-teal', label: 'Royal Blue / Teal', color: '#1c4e89' },
  { id: 'emerald-sage', label: 'Green / Light Green', color: '#156547' },
  { id: 'clean-white', label: 'White / Slate', color: '#f1f5f9' },
  { id: 'chaiui', label: 'Warm Amber', color: '#b45309' },
]

function applyThemeAttribute(id: string) {
  if (id === 'navy-saffron') {
    document.documentElement.removeAttribute('data-theme')
  } else {
    document.documentElement.setAttribute('data-theme', id)
  }
}

export function ThemeSwitcher() {
  const [active, setActive] = useState(() => {
    if (typeof window === 'undefined') return 'navy-saffron'
    return window.localStorage.getItem(STORAGE_KEY) || 'navy-saffron'
  })
  const [open, setOpen] = useState(false)

  useEffect(() => {
    applyThemeAttribute(active)
  }, [active])

  const apply = (id: string) => {
    setActive(id)
    applyThemeAttribute(id)
    window.localStorage.setItem(STORAGE_KEY, id)
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.25rem',
        right: '1.25rem',
        zIndex: 45,
        fontSize: '0.8rem',
      }}
    >
      {open && (
        <div
          role="region"
          aria-label="Portal appearance options"
          style={{
            marginBottom: '0.5rem',
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.65rem',
            boxShadow: 'var(--shadow-sm)',
            minWidth: '12.5rem',
          }}
        >
          <p
            style={{
              margin: '0 0 0.45rem',
              padding: '0 0.35rem',
              fontWeight: 700,
              fontSize: '0.7rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--ink-soft)',
            }}
          >
            Display Theme
          </p>
          {themes.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => apply(t.id)}
              aria-pressed={active === t.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.55rem',
                width: '100%',
                padding: '0.42rem 0.5rem',
                background: active === t.id ? 'var(--brand-soft)' : 'transparent',
                border: 'none',
                borderRadius: '0.4rem',
                cursor: 'pointer',
                fontSize: '0.8rem',
                color: active === t.id ? 'var(--brand-strong)' : 'var(--ink)',
                fontWeight: active === t.id ? 700 : 500,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: '0.8rem',
                  height: '0.8rem',
                  borderRadius: '50%',
                  background: t.color,
                  border: '1px solid rgba(0,0,0,0.18)',
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
              {t.label}
            </button>
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle display theme options"
        aria-expanded={open}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          marginLeft: 'auto',
          padding: '0.48rem 0.8rem',
          background: 'var(--brand)',
          color: 'var(--on-brand)',
          border: '1px solid rgb(255 255 255 / 20%)',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer',
          fontSize: '0.78rem',
          fontWeight: 700,
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <Palette size={15} aria-hidden="true" />
        <span>Theme</span>
      </button>
    </div>
  )
}
