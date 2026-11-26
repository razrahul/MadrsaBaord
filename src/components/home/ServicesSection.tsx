import type { LucideIcon } from 'lucide-react'
import { SectionWave } from '@/components/common/SectionWave'
import { Card, CardContent } from '@/components/ui/card'
import type { ServiceItem } from '@/types/home'

interface ServicesSectionProps {
  services: ServiceItem[]
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="content-section services-section section-wave-host"
      aria-labelledby="services-title"
    >
      <h2 id="services-title" className="sr-only">
        Online services
      </h2>

      <SectionWave />

      <div className="site-shell section-wave-content">
        <div className="service-tiles">
          {services.map((service) => {
            const Icon = service.icon as LucideIcon
            return (
              <a
                key={service.id}
                href={service.href}
                className="service-tile-link"
                title={service.isLive ? service.description : `${service.title} — Coming soon`}
                {...(service.isExternal && service.isLive
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                <Card className="service-tile-card">
                  <CardContent className="service-tile-content">
                    <span className="service-tile-icon">
                      <Icon aria-hidden="true" size={48} strokeWidth={1.6} />
                    </span>
                    <span className="service-tile-title">{service.title}</span>
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
