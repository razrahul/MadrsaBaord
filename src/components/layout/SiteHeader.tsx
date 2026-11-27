import {
  ArrowDownCircle,
  ArrowRight,
  Bell,
  ChevronDown,
  ExternalLink,
  Globe,
  Mail,
  Menu,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { MAX_FONT_STEP, MIN_FONT_STEP, usePreferences } from '@/app/PreferencesContext'
import { Badge } from '@/components/ui/badge'
import { boardUpdates } from '@/data/home-data'
import { useTranslations } from '@/utils/i18n'
import { siteContact } from '@/utils/site-contact'

export function SiteHeader() {
  const { language, setLanguage, fontStep, setFontStep, stepFont } = usePreferences()
  const t = useTranslations()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileSubOpen, setMobileSubOpen] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [navHeight, setNavHeight] = useState(72)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)

  const navItems = [
    { key: 'home', label: t.nav.home, href: '#home' },
    { key: 'about', label: t.nav.about, href: '#leadership' },
    {
      key: 'examination',
      label: t.nav.examination,
      href: '#examination',
      children: [
        { label: t.examSubNav.admission, href: '#services' },
        { label: t.examSubNav.registration, href: '#services' },
        { label: t.examSubNav.examForm, href: '#services' },
        { label: t.examSubNav.admitCard, href: '#services' },
        { label: t.examSubNav.results, href: '#updates' },
      ],
    },
    { key: 'notices', label: t.nav.notices, href: '#updates' },
    { key: 'affiliation', label: t.nav.affiliation, href: '#affiliation' },
    { key: 'contact', label: t.nav.contact, href: '#contact' },
  ]

  const tickerItems = boardUpdates.slice(0, 6).map((u) => ({
    id: u.id,
    title: language === 'hi' ? (u.titleHi ?? u.title) : (u.titleEn ?? u.title),
    isNew: Boolean(u.isNew),
  }))

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

  useEffect(() => {
    if (!openDropdown) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenDropdown(null)
    }
    const onClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClickOutside)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClickOutside)
    }
  }, [openDropdown])

  return (
    <header className="site-header">
      <a className="skip-link" href="#services">
        {t.header.skipToContent}
      </a>

      {/* ── Single Top Government Accessibility Bar ── */}
      <div className="utility-bar" aria-label="Accessibility and quick links">
        <div className="site-shell utility-content">
          {/* Left: Skip to content + State portal + Email */}
          <div className="utility-left">
            <a href="#services" className="utility-link">
              <ArrowDownCircle size={12} aria-hidden="true" />
              <span>{t.header.skipToContent}</span>
            </a>
            <span className="utility-sep utility-hide-sm" aria-hidden="true" />
            <a
              href="https://state.bihar.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="utility-link utility-hide-sm"
            >
              <ExternalLink size={12} aria-hidden="true" />
              <span>{t.header.biharPortal}</span>
            </a>
            <span className="utility-sep utility-hide-md" aria-hidden="true" />
            <a
              href={`mailto:${siteContact.emails[0]}`}
              className="utility-link utility-hide-md"
            >
              <Mail size={12} aria-hidden="true" />
              <span>{siteContact.emails[0]}</span>
            </a>
          </div>

          {/* Right: Text size (A- A A+) + Language Switcher */}
          <div className="utility-right">
            <div className="font-size-controls" role="group" aria-label="Text size controls">
              <button
                type="button"
                className={`font-size-btn ${fontStep < 0 ? 'is-active' : ''}`}
                onClick={() => stepFont(-1)}
                disabled={fontStep <= MIN_FONT_STEP}
                aria-label={t.header.decreaseText}
                title={t.header.decreaseText}
              >
                A-
              </button>
              <button
                type="button"
                className={`font-size-btn ${fontStep === 0 ? 'is-active' : ''}`}
                onClick={() => setFontStep(0)}
                aria-pressed={fontStep === 0}
                aria-label={t.header.defaultText}
                title={t.header.defaultText}
              >
                A
              </button>
              <button
                type="button"
                className={`font-size-btn ${fontStep > 0 ? 'is-active' : ''}`}
                onClick={() => stepFont(1)}
                disabled={fontStep >= MAX_FONT_STEP}
                aria-label={t.header.increaseText}
                title={t.header.increaseText}
              >
                A+
              </button>
            </div>

            <span className="utility-sep" aria-hidden="true" />

            <div className="lang-toggle" role="group" aria-label="Language switch">
              <Globe size={12} aria-hidden="true" className="lang-toggle-icon" />
              <button
                type="button"
                className={`lang-btn ${language === 'en' ? 'is-active' : ''}`}
                onClick={() => setLanguage('en')}
                aria-pressed={language === 'en'}
                lang="en"
              >
                EN
              </button>
              <button
                type="button"
                className={`lang-btn ${language === 'hi' ? 'is-active' : ''}`}
                onClick={() => setLanguage('hi')}
                aria-pressed={language === 'hi'}
                lang="hi"
              >
                हिंदी
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Notification ticker ── */}
      <div className="ticker-bar" aria-label={t.header.tickerLatest}>
        <span className="ticker-label" aria-hidden="true">
          <Bell size={13} aria-hidden="true" />
          {t.header.tickerLatest}
        </span>
        <div className="ticker-track" aria-live="off">
          <div className="ticker-inner">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={`${item.id}-${i}`} className="ticker-item">
                {item.isNew && <Badge variant="hot">{t.updates.newBadge}</Badge>}
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
          <a className="brand compact-brand" href="#home" aria-label={t.brand.primaryName}>
            <span className="brand-mark">
              <img src="/logo.png" alt="BSMEB emblem" />
            </span>
            <span className="brand-copy">
              <span className="brand-name">{t.brand.primaryName}</span>
              <span className="brand-name-hi">{t.brand.secondaryName}</span>
            </span>
          </a>

          {/* Nav links — desktop */}
          <div className="nav-links" role="list">
            {navItems.map((item) => {
              if (item.children && item.children.length > 0) {
                const isOpen = openDropdown === item.key
                return (
                  <div
                    key={item.key}
                    className="nav-dropdown-wrap"
                    role="listitem"
                    onMouseEnter={() => setOpenDropdown(item.key)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      type="button"
                      className={`nav-dropdown-trigger ${isOpen ? 'is-open' : ''}`}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      onClick={() => setOpenDropdown((v) => (v === item.key ? null : item.key))}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={14}
                        aria-hidden="true"
                        className={`nav-chevron ${isOpen ? 'is-rotated' : ''}`}
                      />
                    </button>

                    {isOpen && (
                      <div className="nav-dropdown-panel" role="menu" aria-label={`${item.label} submenu`}>
                        <a
                          href={item.href}
                          role="menuitem"
                          className="nav-dropdown-link nav-dropdown-overview-link"
                          onClick={() => setOpenDropdown(null)}
                        >
                          <span>{t.header.examinationOverview}</span>
                          <ArrowRight size={13} aria-hidden="true" className="nav-dropdown-arrow" />
                        </a>
                        {item.children.map((sub) => (
                          <a
                            key={sub.label}
                            href={sub.href}
                            role="menuitem"
                            className="nav-dropdown-link"
                            onClick={() => setOpenDropdown(null)}
                          >
                            <span>{sub.label}</span>
                            <ArrowRight size={13} aria-hidden="true" className="nav-dropdown-arrow" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <a
                  key={item.key}
                  href={item.href}
                  role="listitem"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  {item.label}
                  {item.key === 'notices' && <Badge variant="new">{t.header.newBadge}</Badge>}
                </a>
              )
            })}
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
              {isMenuOpen ? t.header.closeMenu : t.header.openMenu}
            </span>
            {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile nav panel */}
        {isMenuOpen && (
          <div id="mobile-nav-panel" className="mobile-nav-panel">
            <div className="site-shell mobile-nav-links">
              {navItems.map((item) =>
                item.children && item.children.length > 0 ? (
                  <div key={item.key} className="mobile-subnav-group">
                    <button
                      type="button"
                      className="mobile-subnav-trigger"
                      aria-expanded={mobileSubOpen === item.key}
                      onClick={() =>
                        setMobileSubOpen((v) => (v === item.key ? null : item.key))
                      }
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={16}
                        aria-hidden="true"
                        className={`nav-chevron ${mobileSubOpen === item.key ? 'is-rotated' : ''}`}
                      />
                    </button>
                    {mobileSubOpen === item.key && (
                      <div className="mobile-subnav-links">
                        <a href={item.href} onClick={() => setIsMenuOpen(false)}>
                          {t.header.examinationOverview}
                        </a>
                        {item.children.map((sub) => (
                          <a
                            key={sub.label}
                            href={sub.href}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {sub.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={item.key}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    {item.label}
                    {item.key === 'notices' && <Badge variant="new">{t.header.newBadge}</Badge>}
                  </a>
                )
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
