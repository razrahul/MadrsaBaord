import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { boardName, boardNameHindi } from '@/data/home-data'
import { siteContact } from '@/utils/site-contact'

const currentYear = new Date().getFullYear()

export function SiteFooter() {
  return (
    <footer id="contact" className="site-footer">
      <div className="site-shell footer-grid">
        {/* Brand + Socials */}
        <div className="footer-brand">
          <img src="/logo.png" alt="Bihar State Madrasa Education Board emblem" />
          <div className="footer-brand-body">
            <p className="eyebrow">Government of Bihar</p>
            <h2>{boardName}</h2>
            <p className="footer-brand-hi">{boardNameHindi}</p>
            <p className="footer-brand-desc">
              Statutory autonomous board for madrasa education, examinations, and affiliation in Bihar.
            </p>
            <div className="footer-socials" aria-label="Official social media links">
              {siteContact.socials.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.id}
                    href={social.href}
                    className="footer-social-link"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="footer-social-badge" size={14} aria-hidden="true" />
                    <span>{social.label}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Quick links</h3>
          <a href="#updates">Notices &amp; Tenders</a>
          <a href="#examination">Examination info</a>
          <a href="#affiliation">Affiliation &amp; Act</a>
          <a href="#services">Online services</a>
          <a href="#gallery">Photo gallery</a>
        </div>

        {/* Contact */}
        <div className="footer-contact">
          <h3>Contact</h3>
          <p>
            <MapPin aria-hidden="true" size={15} />
            <span>{siteContact.address}</span>
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
            <span>{siteContact.hours}</span>
          </p>
        </div>

        {/* Policies */}
        <div className="footer-links">
          <h3>Policies</h3>
          <a href="#">Privacy policy</a>
          <a href="#">Accessibility statement</a>
          <a href="#">RTI information</a>
          <a href="#">Terms of use</a>
        </div>
      </div>

      <div className="site-shell footer-bottom">
        <span>
          © {currentYear} {boardName}. Government of Bihar.
        </span>
        <span>Official Public Information Portal</span>
      </div>
    </footer>
  )
}
