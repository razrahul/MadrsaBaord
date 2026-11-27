import { cn } from '@/lib/utils'
import type { Leader } from '@/types/home'
import { useTranslations } from '@/utils/i18n'

interface LeadershipSectionProps {
  leaders: Leader[]
}

export function LeadershipSection({ leaders }: LeadershipSectionProps) {
  const t = useTranslations()
  const sorted = [...leaders].sort((a, b) => a.displayOrder - b.displayOrder)

  return (
    <div id="leadership" className="flex items-start justify-center" aria-labelledby="leadership-title">
      <h2 id="leadership-title" className="sr-only">
        {t.nav.about}
      </h2>
      <div className="grid w-full grid-cols-2 items-end justify-items-center gap-x-4 gap-y-5">
        {sorted.map((leader, idx) => {
          const isCM = idx === 0
          const isCentered = idx === 2
          const localized = t.leaders[leader.id as keyof typeof t.leaders]
          const name = localized?.name ?? leader.name
          const designation = localized?.designation ?? leader.designation

          return (
            <article
              key={leader.id}
              className={cn(
                'flex flex-col items-center text-center',
                isCentered ? 'col-span-full max-w-xs' : 'max-w-52'
              )}
            >
              <div
                className={cn(
                  'mb-2 overflow-hidden rounded-sm border border-line/60 bg-white shadow-[0_1px_3px_rgb(16_35_63_/_6%)]',
                  isCM ? 'size-44' : 'size-37'
                )}
              >
                <img
                  src={leader.imageUrl}
                  alt={`${name} — ${designation.replace(/\n/g, ', ')}`}
                  width={192}
                  height={192}
                  loading="lazy"
                  className="block size-full object-cover object-top"
                />
              </div>
              <h3 className="m-0 mb-0.5 font-sans text-[15px] leading-snug font-bold text-ink">
                {name}
              </h3>
              <p className="m-0 whitespace-pre-line text-xs leading-snug font-semibold text-brand">
                {designation}
              </p>
            </article>
          )
        })}
      </div>
    </div>
  )
}
