import type { Leader } from '@/types/home'

interface LeadershipSectionProps {
  leaders: Leader[]
}

export function LeadershipSection({ leaders }: LeadershipSectionProps) {
  const sorted = [...leaders].sort((a, b) => a.displayOrder - b.displayOrder)

  return (
    <div id="leadership" className="leadership-column" aria-labelledby="leadership-title">
      <h2 id="leadership-title" className="sr-only">
        Board leadership
      </h2>
      <div className="leaders-pyramid">
        {sorted.map((leader, idx) => {
          const sizeClass =
            idx === 0
              ? 'leader-profile--cm'
              : idx === 1
                ? 'leader-profile--minister'
                : 'leader-profile--centered leader-profile--chairman'
          return (
            <article key={leader.id} className={`leader-profile ${sizeClass}`}>
              <div className="leader-photo-frame">
                <img
                  src={leader.imageUrl}
                  alt={`${leader.name} — ${leader.designation}`}
                  width={192}
                  height={192}
                  loading="lazy"
                />
              </div>
              <h3 className="leader-name">{leader.name}</h3>
              <p className="leader-role">{leader.designation}</p>
            </article>
          )
        })}
      </div>
    </div>
  )
}
