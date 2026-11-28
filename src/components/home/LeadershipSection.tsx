import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import type { Leader } from '@/types/home'
import { useTranslations } from '@/utils/i18n'

interface LeadershipSectionProps {
  leaders: Leader[]
}

export function LeadershipSection({ leaders }: LeadershipSectionProps) {
  const t = useTranslations()
  const sorted = [...leaders].sort((a, b) => a.displayOrder - b.displayOrder)

  return (
    <div id="leadership" className="flex h-full flex-col" aria-labelledby="leadership-title">
      <Card className="flex h-full flex-col gap-0 overflow-hidden rounded-sm border border-line/45 bg-surface py-0 shadow-[0_1px_3px_rgb(16_35_63_/_5%)] ring-0">
        <CardHeader className="shrink-0 gap-0 bg-surface p-0!">
          <div className="border-b border-line/55 px-5 pt-4 pb-3">
            <div className="flex flex-col gap-1.5">
              <CardTitle
                id="leadership-title"
                className="font-serif text-[19px] leading-tight font-bold tracking-tight text-ink"
              >
                {t.leadershipTable.title}
              </CardTitle>
              <span className="h-0.5 w-10 bg-brand-strong" aria-hidden="true" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col p-0!">
          <table className="h-full w-full border-collapse text-left">
            <thead className="sr-only">
              <tr>
                <th scope="col">{t.leadershipTable.photoCol}</th>
                <th scope="col">{t.leadershipTable.nameCol}</th>
                <th scope="col">{t.leadershipTable.designationCol}</th>
              </tr>
            </thead>
            <tbody className="[&>tr:not(:last-child)>td]:bg-[image:radial-gradient(circle,color-mix(in_srgb,var(--ink)_24%,transparent)_0.75px,transparent_0.85px)] [&>tr:not(:last-child)>td]:bg-bottom [&>tr:not(:last-child)>td]:bg-repeat-x [&>tr:not(:last-child)>td]:bg-[length:7px_2px]">
              {sorted.map((leader) => {
                const localized = t.leaders[leader.id as keyof typeof t.leaders]
                const name = localized?.name ?? leader.name
                const designation = localized?.designation ?? leader.designation

                return (
                  <tr key={leader.id} className="transition-colors hover:bg-surface-muted/30">
                    <td className="w-24 px-4 py-4 align-middle sm:w-26 sm:px-5">
                      <div className="size-18 overflow-hidden rounded-sm border border-line/55 bg-surface-muted sm:size-21">
                        <img
                          src={leader.imageUrl}
                          alt={`${name} — ${designation.replace(/\n/g, ', ')}`}
                          width={96}
                          height={96}
                          loading="lazy"
                          className="block size-full object-cover object-top"
                        />
                      </div>
                    </td>
                    <td className="px-2 py-4 align-middle sm:w-[40%] sm:px-3">
                      <div className="font-sans text-[14.5px] leading-snug font-bold text-ink sm:text-[15px]">
                        {name}
                      </div>
                      <div className="mt-1 whitespace-pre-line font-sans text-xs leading-snug font-semibold text-brand-strong sm:hidden">
                        {designation}
                      </div>
                    </td>
                    <td className="hidden px-3 py-4 align-middle sm:table-cell sm:pr-5">
                      <span className="whitespace-pre-line font-sans text-[12.5px] leading-snug font-semibold text-brand-strong">
                        {designation}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </CardContent>

        <CardFooter className="mt-auto flex items-center justify-between border-t border-line/45 bg-surface-muted/35 px-5 py-2.5! text-xs text-ink-soft">
          <span>{t.leadershipTable.footerLabel}</span>
          <span className="font-semibold text-brand-strong">{t.brand.govOfBihar}</span>
        </CardFooter>
      </Card>
    </div>
  )
}
