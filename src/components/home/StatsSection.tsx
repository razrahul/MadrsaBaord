import type { StatItem } from '@/types/home'

interface StatsSectionProps {
  stats: StatItem[]
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section
      id="stats"
      aria-labelledby="stats-title"
      style={{
        background: 'var(--brand)',
        padding: '1.5rem 0',
        color: 'var(--on-brand)',
      }}
    >
      <div className="site-shell">
        <h2 id="stats-title" className="sr-only">
          Board at a glance
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(10rem,1fr))',
            gap: '2rem',
            textAlign: 'center',
          }}
        >
          {stats.map((stat) => (
            <div key={stat.id}>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'Georgia,serif',
                  fontSize: 'clamp(2rem,4vw,3rem)',
                  fontWeight: 700,
                  color: 'var(--accent)',
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  display: 'block',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  marginTop: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                {stat.label}
              </span>
              {stat.note && (
                <span
                  style={{
                    display: 'block',
                    fontSize: '0.78rem',
                    opacity: 0.75,
                    marginTop: '0.25rem',
                  }}
                >
                  {stat.note}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
