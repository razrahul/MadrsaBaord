import { ArrowRight, BookMarked, ClipboardCheck, FileCheck2, Search } from 'lucide-react'
import { SectionWave } from '@/components/common/SectionWave'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { SectionHeading } from './SectionHeading'

const affiliationCards = [
  {
    id: 'process',
    icon: FileCheck2,
    title: 'Affiliation Process',
    description:
      'Guidelines, eligibility criteria, and application forms for new affiliation and renewal of madrasas.',
    href: '#',
    linkLabel: 'View guidelines',
  },
  {
    id: 'search',
    icon: Search,
    title: 'Institution Search',
    description:
      'Look up BSMEB-affiliated madrasas by district, block, or madrasa code once directory data is published.',
    href: '#',
    linkLabel: 'Search directory',
  },
  {
    id: 'inspection',
    icon: ClipboardCheck,
    title: 'Inspection & Compliance',
    description:
      'Inspection checklists, infrastructure norms, and annual compliance requirements for affiliated madrasas.',
    href: '#',
    linkLabel: 'View checklist',
  },
  {
    id: 'act-regulations',
    icon: BookMarked,
    title: 'Act & Regulations',
    description:
      'Bihar State Madrasa Education Board Act, statutory rules, service conditions, and official board bye-laws.',
    href: '#',
    linkLabel: 'Read Act & rules',
  },
]

export function AffiliationSection() {
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
          eyebrow="सम्बद्धता एवं नियमावली"
          title="Affiliation, Act & Regulations"
          description="Official resources for affiliated madrasas, statutory rules, and institutional guidelines."
        />

        <div className="affiliation-grid">
          {affiliationCards.map((card) => {
            const Icon = card.icon
            return (
              <Card key={card.id} className="affiliation-card">
                <CardHeader className="affiliation-card-header">
                  <span className="affiliation-icon" aria-hidden="true">
                    <Icon size={18} />
                  </span>
                  <CardTitle className="affiliation-card-title">{card.title}</CardTitle>
                </CardHeader>

                <CardContent className="affiliation-card-body">
                  <p className="affiliation-card-desc">{card.description}</p>
                </CardContent>

                <CardFooter className="affiliation-card-footer">
                  <a href={card.href} className="affiliation-link">
                    {card.linkLabel} <ArrowRight size={14} aria-hidden="true" />
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
