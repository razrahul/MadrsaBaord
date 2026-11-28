import { ArrowRight, BookMarked, ClipboardCheck, FileCheck2, Search } from 'lucide-react'
import { SectionWave } from '@/components/common/SectionWave'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useTranslations } from '@/utils/i18n'
import { SectionHeading } from './SectionHeading'

const affiliationCards = [
  { id: 'process' as const, icon: FileCheck2, href: '#' },
  { id: 'search' as const, icon: Search, href: '#' },
  { id: 'inspection' as const, icon: ClipboardCheck, href: '#' },
  { id: 'act-regulations' as const, icon: BookMarked, href: '#' },
]

export function AffiliationSection() {
  const t = useTranslations()

  return (
    <section
      id="affiliation"
      className="relative overflow-hidden bg-surface py-7"
      aria-labelledby="affiliation-title"
    >
      <SectionWave />
      <div className="site-shell relative z-10">
        <SectionHeading
          id="affiliation-title"
          title={t.affiliation.title}
          description={t.affiliation.description}
        />

        <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {affiliationCards.map((card) => {
            const Icon = card.icon
            const copy = t.affiliation.cards[card.id]
            return (
              <Card
                key={card.id}
                className="flex h-full flex-col gap-2 rounded-sm border border-line/55 bg-surface py-5 shadow-[0_1px_3px_rgb(16_35_63_/_5%)] ring-0 transition-colors hover:border-brand/45"
              >
                <CardHeader className="gap-2.5 px-5">
                  <span
                    className="grid size-9 place-items-center rounded-sm bg-brand-soft/75 text-brand-strong"
                    aria-hidden="true"
                  >
                    <Icon size={18} />
                  </span>
                  <CardTitle className="font-sans text-[15px] font-bold text-ink">
                    {copy.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 px-5">
                  <p className="m-0 text-sm leading-relaxed text-ink-soft">{copy.description}</p>
                </CardContent>

                <CardFooter className="px-5 pt-1">
                  <a
                    href={card.href}
                    className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-brand-strong no-underline hover:underline"
                  >
                    {copy.linkLabel} <ArrowRight size={14} aria-hidden="true" className="rtl:rotate-180" />
                  </a>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
