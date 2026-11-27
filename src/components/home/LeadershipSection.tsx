import type { Leader } from '@/types/home'
import { useTranslations } from '@/utils/i18n'

interface LeadershipSectionProps {
  leaders: Leader[]
}

export function LeadershipSection({ leaders }: LeadershipSectionProps) {
  const t = useTranslations()
  const sorted = [...leaders].sort((a, b) => a.displayOrder - b.displayOrder)

  return (
    <div id="leadership" className="leadership-column" aria-labelledby="leadership-title">
      <h2 id="leadership-title" className="sr-only">
        {t.nav.about}
      </h2>
      <div className="leaders-pyramid">
        {sorted.map((leader, idx) => {
          const sizeClass =
            idx === 0
              ? 'leader-profile--cm'
              : idx === 1
                ? 'leader-profile--minister'
                : 'leader-profile--centered leader-profile--chairman'
          const localized = t.leaders[leader.id as keyof typeof t.leaders]
          const name = localized?.name ?? leader.name
          const designation = localized?.designation ?? leader.designation

          return (
            <article key={leader.id} className={`leader-profile ${sizeClass}`}>
              <div className="leader-photo-frame">
                <img
                  src={leader.imageUrl}
                  alt={`${name} — ${designation}`}
                  width={192}
                  height={192}
                  loading="lazy"
                />
              </div>
              <h3 className="leader-name">{name}</h3>
              <p className="leader-role">{designation}</p>
            </article>
          )
        })}
      </div>
    </div>
  )
}
