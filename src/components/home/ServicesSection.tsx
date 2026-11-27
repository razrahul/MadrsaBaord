import type { LucideIcon } from 'lucide-react'
import { SectionWave } from '@/components/common/SectionWave'
import { Card, CardContent } from '@/components/ui/card'
import type { ServiceItem } from '@/types/home'
import { useTranslations } from '@/utils/i18n'

interface ServicesSectionProps {
  services: ServiceItem[]
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const t = useTranslations()

  return (
    <section
      id="services"
      className="content-section services-section section-wave-host"
      aria-labelledby="services-title"
    >
      <h2 id="services-title" className="sr-only">
        {t.services.srHeading}
      </h2>

      <SectionWave />

      <div className="site-shell section-wave-content">
        <div className="service-tiles">
          {services.map((service) => {
            const Icon = service.icon as LucideIcon
            const localized = t.services.items[service.id as keyof typeof t.services.items]
            const title = localized?.title ?? service.title
            const description = localized?.description ?? service.description

            return (
              <a
                key={service.id}
                href={service.href}
                className="service-tile-link"
                title={service.isLive ? description : `${title} — ${t.services.comingSoonSuffix}`}
                {...(service.isExternal && service.isLive
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                <Card className="service-tile-card">
                  <CardContent className="service-tile-content">
                    <span className="service-tile-icon">
                      <Icon aria-hidden="true" size={48} strokeWidth={1.6} />
                    </span>
                    <span className="service-tile-title">{title}</span>
                  </CardContent>
                </Card>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
