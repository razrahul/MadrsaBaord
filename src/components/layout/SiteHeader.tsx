import { Bell, Clock, Mail, Menu, Phone, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { boardName, boardNameHindi, boardUpdates, navigationItems } from '@/data/home-data'
import { siteContact } from '@/utils/site-contact'

// Ticker items: latest notices pulled from mock data
const tickerItems = boardUpdates.slice(0, 6).map((u) => ({
  id: u.id,
  title: u.title,
  isNew: Boolean(u.isNew),
}))

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [navHeight, setNavHeight] = useState(72)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const updateScroll = () => {
      const sentinel = sentinelRef.current
      if (!sentinel) return
      const scrolled = sentinel.getBoundingClientRect().top <= 0
      if (navRef.current) {
        setNavHeight(navRef.current.offsetHeight)
      }
      setIsScrolled(scrolled)
    }

    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })
    window.addEventListener('resize', updateScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', updateScroll)
      window.removeEventListener('resize', updateScroll)
    }
  }, [])

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      {/* ── Utility bar ── */}
      <div className="utility-bar">
        <div className="site-shell utility-content">
          {/* Left: contact info */}
          <div className="utility-left">
            <span className="utility-item">
              <Mail aria-hidden="true" size={12} />
              <a href={`mailto:${siteContact.emails[0]}`} style={{ textDecoration: 'none' }}>
                {siteContact.emails[0]}
              </a>
              <span aria-hidden="true">/</span>
              <a href={`mailto:${siteContact.emails[1]}`} style={{ textDecoration: 'none' }}>
                {siteContact.emails[1]}
              </a>
            </span>
            <span className="utility-sep" aria-hidden="true" />
            <span className="utility-item">
              <Clock aria-hidden="true" size={12} />
              {siteContact.hours}
            </span>
          </div>

          {/* Right: phone + social */}
          <div className="utility-right">
            <a
              className="utility-item utility-phone"
              href={siteContact.phoneHref}
              style={{ textDecoration: 'none' }}
            >
              <Phone aria-hidden="true" size={12} />
              {siteContact.phone}
            </a>
            {siteContact.socials.slice(0, 2).map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.id}
                  className="utility-social"
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon aria-hidden="true" size={12} />
                </a>
              )
            })}
            <a className="utility-contact-btn" href="#contact">
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* ── Notification ticker ── */}
      <div className="ticker-bar" aria-label="Latest notifications">
        <span className="ticker-label" aria-hidden="true">
          <Bell size={13} aria-hidden="true" />
          Latest
        </span>
        <div className="ticker-track" aria-live="off">
          <div className="ticker-inner">
            {/* Duplicate for seamless loop */}
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={`${item.id}-${i}`} className="ticker-item">
                {item.isNew && <Badge variant="hot">NEW</Badge>}
                {item.title}
                <span className="ticker-dot" aria-hidden="true">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div ref={sentinelRef} aria-hidden="true" />
      {isScrolled && <div style={{ height: navHeight }} aria-hidden="true" />}

      {/* ── Single fixed/sticky navbar: logo + nav in one row ── */}
      <nav
        ref={navRef}
        id="primary-navigation"
        className={`primary-navigation compact-nav ${isScrolled ? 'is-scrolled' : ''} ${isMenuOpen ? 'is-open' : ''}`}
        aria-label="Primary navigation"
      >
        <div className="site-shell compact-nav-inner">
          {/* Logo + name */}
          <a className="brand compact-brand" href="#home" aria-label={`${boardName} home`}>
            <span className="brand-mark">
              <img src="/logo.png" alt="BSMEB emblem" />
            </span>
            <span className="brand-copy">
              <span className="brand-name">{boardName}</span>
              <span className="brand-name-hi">{boardNameHindi}</span>
            </span>
          </a>

          {/* Nav links — desktop */}
          <div className="nav-links" role="list">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                role="listitem"
                onClick={() => setIsMenuOpen(false)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
              >
                {item.label}
                {item.label === 'Notices' && <Badge variant="new">New</Badge>}
              </a>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-panel"
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            <span className="sr-only">
              {isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            </span>
            {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile nav panel */}
        {isMenuOpen && (
          <div id="mobile-nav-panel" className="mobile-nav-panel">
            <div className="site-shell mobile-nav-links">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  {item.label}
                  {item.label === 'Notices' && <Badge variant="new">New</Badge>}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
