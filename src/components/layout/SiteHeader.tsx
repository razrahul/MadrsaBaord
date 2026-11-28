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
import { cn } from '@/lib/utils'
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
    title:
      language === 'hi'
        ? (u.titleHi ?? u.title)
        : language === 'ur'
          ? (u.titleUr ?? u.title)
          : (u.titleEn ?? u.title),
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
    <header>
      <a className="skip-link" href="#services">
        {t.header.skipToContent}
      </a>

      {/* ── Single Top Government Accessibility Bar ── */}
      <div
        className="bg-brand-strong text-xs text-white/90"
        aria-label="Accessibility and quick links"
      >
        <div className="site-shell flex min-h-9 items-center justify-between gap-3">
          {/* Left: Skip to content + State portal + Email */}
          <div className="flex items-center gap-2.5">
            <a
              href="#services"
              className="inline-flex items-center gap-1.5 font-semibold whitespace-nowrap text-white/90 no-underline transition hover:text-white hover:underline"
            >
              <ArrowDownCircle size={12} aria-hidden="true" />
              <span className="hidden sm:inline">{t.header.skipToContent}</span>
            </a>
            <span className="hidden h-3.5 w-px bg-white/20 sm:block" aria-hidden="true" />
            <a
              href="https://state.bihar.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 font-semibold whitespace-nowrap text-white/90 no-underline transition hover:text-white hover:underline sm:inline-flex"
            >
              <ExternalLink size={12} aria-hidden="true" />
              <span>{t.header.biharPortal}</span>
            </a>
            <span className="hidden h-3.5 w-px bg-white/20 lg:block" aria-hidden="true" />
            <a
              href={`mailto:${siteContact.emails[0]}`}
              dir="ltr"
              className="hidden items-center gap-1.5 font-semibold whitespace-nowrap text-white/90 no-underline transition hover:text-white hover:underline lg:inline-flex"
            >
              <Mail size={12} aria-hidden="true" />
              <span>{siteContact.emails[0]}</span>
            </a>
          </div>

          {/* Right: Text size (A- A A+) + Language Switcher */}
          <div className="flex items-center gap-2.5">
            <div className="inline-flex items-center gap-1" role="group" aria-label="Text size controls">
              <button
                type="button"
                className={cn(
                  'rounded border px-1.5 py-0.5 text-[11px] leading-tight font-bold transition',
                  fontStep < 0
                    ? 'border-white bg-white text-brand-strong'
                    : 'border-white/25 bg-transparent text-white/90 hover:bg-white/15 hover:text-white',
                  'disabled:opacity-40'
                )}
                onClick={() => stepFont(-1)}
                disabled={fontStep <= MIN_FONT_STEP}
                aria-label={t.header.decreaseText}
                title={t.header.decreaseText}
              >
                A-
              </button>
              <button
                type="button"
                className={cn(
                  'rounded border px-1.5 py-0.5 text-[11px] leading-tight font-bold transition',
                  fontStep === 0
                    ? 'border-white bg-white text-brand-strong'
                    : 'border-white/25 bg-transparent text-white/90 hover:bg-white/15 hover:text-white'
                )}
                onClick={() => setFontStep(0)}
                aria-pressed={fontStep === 0}
                aria-label={t.header.defaultText}
                title={t.header.defaultText}
              >
                A
              </button>
              <button
                type="button"
                className={cn(
                  'rounded border px-1.5 py-0.5 text-[11px] leading-tight font-bold transition',
                  fontStep > 0
                    ? 'border-white bg-white text-brand-strong'
                    : 'border-white/25 bg-transparent text-white/90 hover:bg-white/15 hover:text-white',
                  'disabled:opacity-40'
                )}
                onClick={() => stepFont(1)}
                disabled={fontStep >= MAX_FONT_STEP}
                aria-label={t.header.increaseText}
                title={t.header.increaseText}
              >
                A+
              </button>
            </div>

            <span className="h-3.5 w-px bg-white/20" aria-hidden="true" />

            <div className="inline-flex items-center gap-1" role="group" aria-label="Language switch">
              <Globe size={12} aria-hidden="true" className="me-0.5 text-white/80" />
              <button
                type="button"
                className={cn(
                  'rounded border px-1.5 py-0.5 text-[11px] leading-tight font-bold transition',
                  language === 'en'
                    ? 'border-white bg-white text-brand-strong'
                    : 'border-white/25 bg-transparent text-white/90 hover:bg-white/15 hover:text-white'
                )}
                onClick={() => setLanguage('en')}
                aria-pressed={language === 'en'}
                lang="en"
              >
                EN
              </button>
              <button
                type="button"
                className={cn(
                  'rounded border px-1.5 py-0.5 text-[11px] leading-tight font-bold transition',
                  language === 'hi'
                    ? 'border-white bg-white text-brand-strong'
                    : 'border-white/25 bg-transparent text-white/90 hover:bg-white/15 hover:text-white'
                )}
                onClick={() => setLanguage('hi')}
                aria-pressed={language === 'hi'}
                lang="hi"
              >
                हिंदी
              </button>
              <button
                type="button"
                className={cn(
                  'rounded border px-1.5 py-0.5 text-[11px] leading-tight font-bold transition',
                  language === 'ur'
                    ? 'border-white bg-white text-brand-strong'
                    : 'border-white/25 bg-transparent text-white/90 hover:bg-white/15 hover:text-white'
                )}
                onClick={() => setLanguage('ur')}
                aria-pressed={language === 'ur'}
                lang="ur"
              >
                اردو
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Notification ticker ── */}
      <div
        className="flex h-8.5 items-center overflow-hidden border-b border-line bg-surface-muted text-xs font-bold text-ink"
        aria-label={t.header.tickerLatest}
      >
        <span
          className="flex h-full shrink-0 items-center gap-1.5 bg-brand px-3.5 text-[11px] tracking-wider whitespace-nowrap text-on-brand"
          aria-hidden="true"
        >
          <Bell size={13} aria-hidden="true" />
          {t.header.tickerLatest}
        </span>
        <div className="relative flex-1 overflow-hidden" dir="ltr" aria-live="off">
          <div className="ticker-inner">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span
                key={`${item.id}-${i}`}
                dir={language === 'ur' ? 'rtl' : 'ltr'}
                className="inline-flex items-center gap-2 px-6"
              >
                {item.isNew && <Badge variant="hot">{t.updates.newBadge}</Badge>}
                {item.title}
                <span className="text-[9px] text-brand" aria-hidden="true">
                  ◆
                </span>
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
        aria-label="Primary navigation"
        className={cn(
          'border-b transition-[background,box-shadow] duration-200',
          isScrolled
            ? 'fixed top-0 right-0 left-0 z-40 border-line/65 bg-white/75 shadow-[0_4px_20px_rgb(16_35_63_/_10%)] backdrop-blur-lg'
            : 'relative z-30 border-line bg-white/95 shadow-[0_2px_12px_rgb(16_35_63_/_7%)]'
        )}
      >
        <div className="site-shell flex min-h-20 items-center gap-5 py-1.5">
          <a
            className="me-2 inline-flex shrink-0 items-center gap-3.5 no-underline"
            href="#home"
            aria-label={t.brand.primaryName}
          >
            <span className="grid size-13 shrink-0 place-items-center sm:size-17">
              <img
                src="/logo.png"
                alt="BSMEB emblem"
                className="size-full object-contain mix-blend-multiply"
              />
            </span>
            <span className="grid gap-0.5">
              <span className="max-w-54 truncate font-serif text-sm leading-tight font-bold text-ink sm:max-w-md sm:text-[clamp(0.9rem,1.45vw,1.18rem)]">
                {t.brand.primaryName}
              </span>
              <span className="text-xs leading-snug font-medium text-ink/85 sm:text-[clamp(0.85rem,1.3vw,1.05rem)]">
                {t.brand.secondaryName}
              </span>
            </span>
          </a>

          {/* Nav links — desktop */}
          <div className="ms-auto hidden items-center gap-0.5 lg:flex" role="list">
            {navItems.map((item) => {
              if (item.children && item.children.length > 0) {
                const isOpen = openDropdown === item.key
                return (
                  <div
                    key={item.key}
                    className="relative"
                    role="listitem"
                    onMouseEnter={() => setOpenDropdown(item.key)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      type="button"
                      className={cn(
                        'inline-flex items-center gap-1 rounded-sm border px-3 py-2 text-sm font-bold whitespace-nowrap transition',
                        isOpen
                          ? 'border-brand/25 bg-brand-soft text-brand'
                          : 'border-transparent bg-transparent text-ink-soft hover:bg-brand-soft hover:text-brand'
                      )}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      onClick={() => setOpenDropdown((v) => (v === item.key ? null : item.key))}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={14}
                        aria-hidden="true"
                        className={cn('transition-transform duration-150', isOpen && 'rotate-180')}
                      />
                    </button>

                    {isOpen && (
                      <div
                        className="absolute top-[calc(100%+0.35rem)] left-1/2 z-50 grid -translate-x-1/2 grid-cols-2 gap-1 rounded-sm border border-line bg-surface p-1.5 shadow-[0_8px_24px_rgb(15_35_61_/_10%)]"
                        style={{ minWidth: '22rem' }}
                        role="menu"
                        aria-label={`${item.label} submenu`}
                      >
                        <a
                          href={item.href}
                          role="menuitem"
                          className="group flex items-center justify-between gap-2 rounded-xs bg-brand-soft/55 px-3 py-2 text-[13px] font-bold whitespace-nowrap text-brand no-underline transition hover:bg-brand-soft hover:text-brand-strong"
                          onClick={() => setOpenDropdown(null)}
                        >
                          <span>{t.header.examinationOverview}</span>
                          <ArrowRight
                            size={13}
                            aria-hidden="true"
                            className="opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                          />
                        </a>
                        {item.children.map((sub) => (
                          <a
                            key={sub.label}
                            href={sub.href}
                            role="menuitem"
                            className="group flex items-center justify-between gap-2 rounded-xs px-3 py-2 text-[13px] font-semibold whitespace-nowrap text-ink no-underline transition hover:bg-brand-soft hover:text-brand-strong"
                            onClick={() => setOpenDropdown(null)}
                          >
                            <span>{sub.label}</span>
                            <ArrowRight
                              size={13}
                              aria-hidden="true"
                              className="opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                            />
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
                  className="inline-flex items-center gap-1.5 rounded-sm px-3 py-2 text-sm font-bold whitespace-nowrap text-ink-soft no-underline transition hover:bg-brand-soft hover:text-brand"
                >
                  {item.label}
                  {item.key === 'notices' && <Badge variant="new">{t.header.newBadge}</Badge>}
                </a>
              )
            })}
          </div>

          {/* Mobile toggle */}
          <button
            className="ms-auto grid size-10 shrink-0 place-items-center rounded-sm border border-line bg-surface text-brand lg:hidden"
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-panel"
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            <span className="sr-only">
              {isMenuOpen ? t.header.closeMenu : t.header.openMenu}
            </span>
            {isMenuOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
          </button>
        </div>

        {/* Mobile nav panel */}
        {isMenuOpen && (
          <div id="mobile-nav-panel" className="border-t border-line bg-surface lg:hidden">
            <div className="site-shell flex flex-col gap-0.5 py-2.5">
              {navItems.map((item) =>
                item.children && item.children.length > 0 ? (
                  <div key={item.key} className="flex flex-col">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between rounded-sm px-4 py-3 text-start text-base font-bold text-ink-soft transition hover:bg-brand-soft hover:text-brand"
                      aria-expanded={mobileSubOpen === item.key}
                      onClick={() =>
                        setMobileSubOpen((v) => (v === item.key ? null : item.key))
                      }
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={16}
                        aria-hidden="true"
                        className={cn(
                          'transition-transform duration-150',
                          mobileSubOpen === item.key && 'rotate-180'
                        )}
                      />
                    </button>
                    {mobileSubOpen === item.key && (
                      <div className="ms-4 flex flex-col gap-0.5 border-s-2 border-line py-1 ps-4">
                        <a
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="rounded-sm px-3 py-2 text-sm font-semibold text-ink-soft no-underline hover:bg-brand-soft hover:text-brand"
                        >
                          {t.header.examinationOverview}
                        </a>
                        {item.children.map((sub) => (
                          <a
                            key={sub.label}
                            href={sub.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="rounded-sm px-3 py-2 text-sm font-semibold text-ink-soft no-underline hover:bg-brand-soft hover:text-brand"
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
                    className="inline-flex items-center gap-2 rounded-sm px-4 py-3 text-base font-bold text-ink-soft no-underline transition hover:bg-brand-soft hover:text-brand"
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
