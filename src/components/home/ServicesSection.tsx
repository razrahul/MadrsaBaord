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
      className="relative overflow-hidden bg-surface py-7"
      aria-labelledby="services-title"
    >
      <h2 id="services-title" className="sr-only">
        {t.services.srHeading}
      </h2>

      <SectionWave />

      <div className="site-shell relative z-10">
        <div className="flex flex-wrap justify-center gap-5">
          {services.map((service) => {
            const Icon = service.icon as LucideIcon
            const localized = t.services.items[service.id as keyof typeof t.services.items]
            const title = localized?.title ?? service.title
            const description = localized?.description ?? service.description

            return (
              <a
                key={service.id}
                href={service.href}
                className="group block w-42 rounded-lg text-inherit no-underline"
                title={service.isLive ? description : `${title} — ${t.services.comingSoonSuffix}`}
                {...(service.isExternal && service.isLive
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                <Card className="h-full min-h-48 w-full gap-0 rounded-lg border border-line/55 bg-surface py-0 shadow-[0_1px_3px_rgb(16_35_63_/_5%)] ring-0 transition-colors duration-200 group-hover:border-brand/45 group-hover:bg-brand-soft/60 group-focus-visible:border-brand/45 group-focus-visible:bg-brand-soft/60">
                  <CardContent className="flex h-full min-h-48 flex-col items-center justify-center gap-3.5 px-3.5 py-6 text-center">
                    <span className="grid place-items-center text-ink transition-colors duration-200 group-hover:text-brand-strong group-focus-visible:text-brand-strong">
                      <Icon aria-hidden="true" size={46} strokeWidth={1.6} />
                    </span>
                    <span className="text-[13.5px] leading-snug font-bold text-ink transition-colors duration-200 group-hover:text-brand-strong group-focus-visible:text-brand-strong">
                      {title}
                    </span>
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
