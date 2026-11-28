import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { useTranslations } from '@/utils/i18n'
import { siteContact } from '@/utils/site-contact'

const currentYear = new Date().getFullYear()

export function SiteFooter() {
  const t = useTranslations()

  return (
    <footer id="contact" className="bg-brand-strong pt-9 text-white/85">
      <div className="site-shell grid grid-cols-1 gap-8 pb-7 sm:grid-cols-2 lg:grid-cols-[1.45fr_0.75fr_1.1fr_0.75fr]">
        {/* Brand + Socials */}
        <div className="flex items-start gap-4 sm:col-span-2 lg:col-span-1">
          <img
            src="/logo.png"
            alt={t.brand.primaryName}
            className="size-13 shrink-0 rounded-sm bg-white p-0.5 object-contain"
          />
          <div className="flex flex-col">
            <p className="mb-0.5 text-xs font-medium text-white/75">
              {t.footer.govLabel}
            </p>
            <h2 className="mb-0.5 font-serif text-lg leading-snug font-bold text-white">
              {t.brand.primaryName}
            </h2>
            <p className="mb-2 text-base font-semibold text-white/90">
              {t.brand.secondaryName}
            </p>
            <p className="mb-3.5 max-w-sm text-[13.5px] leading-snug text-white/75">
              {t.footer.tagline}
            </p>
            <div className="flex flex-wrap gap-2" aria-label="Official social media links">
              {siteContact.socials.map((social) => {
                const Icon = social.icon
                const label = t.footer.socialLabels[social.id as keyof typeof t.footer.socialLabels]
                return (
                  <a
                    key={social.id}
                    href={social.href}
                    className="inline-flex items-center gap-1.5 rounded-sm border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-semibold text-white no-underline transition hover:border-white/35 hover:bg-white/20"
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="text-[#ffdca5]" size={14} aria-hidden="true" />
                    <span>{label}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid content-start gap-2">
          <h3 className="mb-1.5 font-sans text-xs font-bold tracking-widest text-white uppercase">
            {t.footer.quickLinksTitle}
          </h3>
          <a
            href="#updates"
            className="text-sm text-white/80 no-underline hover:text-white hover:underline"
          >
            {t.footer.quickLinks.notices}
          </a>
          <a
            href="#examination"
            className="text-sm text-white/80 no-underline hover:text-white hover:underline"
          >
            {t.footer.quickLinks.examination}
          </a>
          <a
            href="#affiliation"
            className="text-sm text-white/80 no-underline hover:text-white hover:underline"
          >
            {t.footer.quickLinks.affiliation}
          </a>
          <a
            href="#services"
            className="text-sm text-white/80 no-underline hover:text-white hover:underline"
          >
            {t.footer.quickLinks.services}
          </a>
          <a
            href="#gallery"
            className="text-sm text-white/80 no-underline hover:text-white hover:underline"
          >
            {t.footer.quickLinks.gallery}
          </a>
        </div>

        {/* Contact */}
        <div className="grid content-start gap-2.5">
          <h3 className="mb-1.5 font-sans text-xs font-bold tracking-widest text-white uppercase">
            {t.footer.contactTitle}
          </h3>
          <p className="m-0 flex items-start gap-2 text-sm leading-snug text-white/85">
            <MapPin aria-hidden="true" size={15} className="mt-0.5 shrink-0 text-[#ffdca5]" />
            <span>{t.footer.address}</span>
          </p>
          <p className="m-0 flex items-start gap-2 text-sm leading-snug text-white/85">
            <Phone aria-hidden="true" size={15} className="mt-0.5 shrink-0 text-[#ffdca5]" />
            <a
              href={siteContact.phoneHref}
              dir="ltr"
              className="text-inherit no-underline hover:text-white hover:underline"
            >
              {siteContact.phone}
            </a>
          </p>
          {siteContact.emails.map((email) => (
            <p key={email} className="m-0 flex items-start gap-2 text-sm leading-snug text-white/85">
              <Mail aria-hidden="true" size={15} className="mt-0.5 shrink-0 text-[#ffdca5]" />
              <a
                href={`mailto:${email}`}
                dir="ltr"
                className="text-inherit no-underline hover:text-white hover:underline"
              >
                {email}
              </a>
            </p>
          ))}
          <p className="m-0 flex items-start gap-2 text-sm leading-snug text-white/85">
            <Clock aria-hidden="true" size={15} className="mt-0.5 shrink-0 text-[#ffdca5]" />
            <span>{t.footer.hours}</span>
          </p>
        </div>

        {/* Policies */}
        <div className="grid content-start gap-2">
          <h3 className="mb-1.5 font-sans text-xs font-bold tracking-widest text-white uppercase">
            {t.footer.policiesTitle}
          </h3>
          <a href="#" className="text-sm text-white/80 no-underline hover:text-white hover:underline">
            {t.footer.policies.privacy}
          </a>
          <a href="#" className="text-sm text-white/80 no-underline hover:text-white hover:underline">
            {t.footer.policies.accessibility}
          </a>
          <a href="#" className="text-sm text-white/80 no-underline hover:text-white hover:underline">
            {t.footer.policies.rti}
          </a>
          <a href="#" className="text-sm text-white/80 no-underline hover:text-white hover:underline">
            {t.footer.policies.terms}
          </a>
        </div>
      </div>

      <div className="site-shell flex flex-col items-center justify-between gap-2 border-t border-white/15 py-5 text-center text-xs text-white/70 sm:flex-row sm:text-start">
        <span>
          © {currentYear} {t.brand.primaryName}. {t.footer.copyrightSuffix}
        </span>
        <span>{t.footer.portalTag}</span>
      </div>
    </footer>
  )
}
