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
      className="content-section affiliation-section section-wave-host"
      aria-labelledby="affiliation-title"
    >
      <SectionWave />
      <div className="site-shell section-wave-content">
        <SectionHeading
          id="affiliation-title"
          eyebrow={t.affiliation.eyebrow}
          title={t.affiliation.title}
          description={t.affiliation.description}
        />

        <div className="affiliation-grid">
          {affiliationCards.map((card) => {
            const Icon = card.icon
            const copy = t.affiliation.cards[card.id]
            return (
              <Card key={card.id} className="affiliation-card">
                <CardHeader className="affiliation-card-header">
                  <span className="affiliation-icon" aria-hidden="true">
                    <Icon size={18} />
                  </span>
                  <CardTitle className="affiliation-card-title">{copy.title}</CardTitle>
                </CardHeader>

                <CardContent className="affiliation-card-body">
                  <p className="affiliation-card-desc">{copy.description}</p>
                </CardContent>

                <CardFooter className="affiliation-card-footer">
                  <a href={card.href} className="affiliation-link">
                    {copy.linkLabel} <ArrowRight size={14} aria-hidden="true" />
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
