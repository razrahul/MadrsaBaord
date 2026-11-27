import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { useTranslations } from '@/utils/i18n'
import { siteContact } from '@/utils/site-contact'

const currentYear = new Date().getFullYear()

export function SiteFooter() {
  const t = useTranslations()

  return (
    <footer id="contact" className="site-footer">
      <div className="site-shell footer-grid">
        {/* Brand + Socials */}
        <div className="footer-brand">
          <img src="/logo.png" alt={t.brand.primaryName} />
          <div className="footer-brand-body">
            <p className="eyebrow">{t.footer.govLabel}</p>
            <h2>{t.brand.primaryName}</h2>
            <p className="footer-brand-hi">{t.brand.secondaryName}</p>
            <p className="footer-brand-desc">{t.footer.tagline}</p>
            <div className="footer-socials" aria-label="Official social media links">
              {siteContact.socials.map((social) => {
                const Icon = social.icon
                const label = t.footer.socialLabels[social.id as keyof typeof t.footer.socialLabels]
                return (
                  <a
                    key={social.id}
                    href={social.href}
                    className="footer-social-link"
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="footer-social-badge" size={14} aria-hidden="true" />
                    <span>{label}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>{t.footer.quickLinksTitle}</h3>
          <a href="#updates">{t.footer.quickLinks.notices}</a>
          <a href="#examination">{t.footer.quickLinks.examination}</a>
          <a href="#affiliation">{t.footer.quickLinks.affiliation}</a>
          <a href="#services">{t.footer.quickLinks.services}</a>
          <a href="#gallery">{t.footer.quickLinks.gallery}</a>
        </div>

        {/* Contact */}
        <div className="footer-contact">
          <h3>{t.footer.contactTitle}</h3>
          <p>
            <MapPin aria-hidden="true" size={15} />
            <span>{t.footer.address}</span>
          </p>
          <p>
            <Phone aria-hidden="true" size={15} />
            <a href={siteContact.phoneHref}>{siteContact.phone}</a>
          </p>
          {siteContact.emails.map((email) => (
            <p key={email}>
              <Mail aria-hidden="true" size={15} />
              <a href={`mailto:${email}`}>{email}</a>
            </p>
          ))}
          <p>
            <Clock aria-hidden="true" size={15} />
            <span>{t.footer.hours}</span>
          </p>
        </div>

        {/* Policies */}
        <div className="footer-links">
          <h3>{t.footer.policiesTitle}</h3>
          <a href="#">{t.footer.policies.privacy}</a>
          <a href="#">{t.footer.policies.accessibility}</a>
          <a href="#">{t.footer.policies.rti}</a>
          <a href="#">{t.footer.policies.terms}</a>
        </div>
      </div>

      <div className="site-shell footer-bottom">
        <span>
          © {currentYear} {t.brand.primaryName}. {t.footer.copyrightSuffix}
        </span>
        <span>{t.footer.portalTag}</span>
      </div>
    </footer>
  )
}
