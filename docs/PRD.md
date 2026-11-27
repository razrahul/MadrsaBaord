# BSMEB Website Frontend — Product Requirements & Implementation Plan

**Project:** Bihar State Madrasa Education Board (BSMEB) public website frontend  
**Document status:** Draft for content and visual approval  
**Last updated:** 26 November 2026  
**Implementation:** React, TypeScript, Vite, Tailwind CSS v4, Shadcn UI

## 1. Product summary

Build a modern, responsive, and trustworthy public website for the Bihar State Madrasa Education Board. The product must look suitably official for a government education board while making high-volume public information easy to find for students, parents, teachers, affiliated madrasas, and administrators.

The first release is a frontend-first homepage with mock, typed content. Content must be structured so that a REST API or CMS can replace mocks without changing display components.

## 2. Goals

- Present a clear, formal, and accessible official-board identity.
- Make notices, tenders, proformas, results, examinations, and online services discoverable in one or two interactions.
- Work well on low-end mobile devices and at common desktop resolutions.
- Support Hindi-first content and remain ready for English and Urdu.
- Keep visual tokens centralised, so the full brand theme can be changed without component-by-component edits.
- Use reusable, typed, testable React code with clean separation between page composition, display components, data access, and utilities.

## 3. Scope

### In scope for the first implementation

- Responsive homepage and reusable layout system.
- Sticky navigation with desktop and mobile variants.
- Accessible hero carousel.
- Quick-service cards with validated external/internal links.
- Leadership/board cards.
- Notice, Tender, and Proforma tabs with list states.
- Activities section and gallery preview with modal image viewer.
- Examination and equivalence information section.
- Affiliated madrasa/organisation section and statistics.
- Footer with contact, policy, quick-link, and social-link areas.
- Loading, empty, and error UI states for future API-backed sections.
- Development-only visual theme switcher for comparing approved color palettes.

### Not in scope unless separately approved

- Admin portal, CMS, authentication, or role-based access.
- Online admission, examination, payment, result, or madrasa-management workflows.
- Backend/API implementation, database, file-storage integration, or data migration.
- Translation of official content, legal-policy writing, or creation of official notices.

## 4. Primary users and priority journeys

| User | Primary need | Desired journey |
| --- | --- | --- |
| Student/parent | Find results, forms, exam notices, and deadlines | Homepage → Quick Service or Latest Updates → official destination/PDF |
| Teacher | Locate teacher-related portal, circulars, and documents | Homepage → Quick Service/Downloads → official destination |
| Madrasa administrator | Find affiliation, registration, dashboard, and tender details | Homepage → Affiliation/Online Services/Updates → official destination |
| General visitor | Verify board contact and leadership information | Homepage → Leadership/Footer/Contact |

## 5. Homepage information architecture

1. **Utility bar** — official contact details, accessibility entry point, and language-ready controls.
2. **Sticky navbar** — Board identity; Home, About, Examination, Notices, Tenders, Downloads, Affiliated Madrasas, and Contact navigation.
3. **Hero carousel** — verified campaign/board images, concise message, and at most two primary actions per slide.
4. **Quick online services** — admission, registration, examination form, results, scrutiny, dashboard, teacher details, and downloads.
5. **Board leadership** — authorised leader photos, names, designations, and profile links.
6. **Latest updates** — Tabs for Notices, Tenders, and Proformas; date, title, file type, and detail/download action.
7. **Activities and gallery** — activity cards, responsive gallery, and accessible lightbox.
8. **Examination and equivalence** — Wastania, Fauquania, and Moulvi structure presented as cards, accordions, timeline, or table according to final content.
9. **Affiliated organisations** — clear links to affiliation/search resources and a future district-search entry point.
10. **Board at a glance** — approved statistics only; no unverified counters.
11. **Footer** — address, phone, email, office hours, quick links, policies, sitemap, and copyright.

## 6. Design direction and theme strategy

### Visual principles

- Official, calm, and clear—not flashy or app-like.
- Generous whitespace, restrained shadows, and strong visual hierarchy.
- No essential information locked inside a slider or animation.
- Long Hindi titles must wrap gracefully and remain readable.
- Motion is subtle and respects `prefers-reduced-motion`.

### Theme tokens

No component may hardcode the final brand color. All color, radius, typography, elevation, and semantic state values will be exposed through CSS variables in `src/styles/theme.css` and consumed through Tailwind/Shadcn semantic classes.

Initial visual trials will be isolated as theme attributes:

- `data-theme="navy-saffron"` — recommended first government-style trial.
- `data-theme="maroon-gold"` — formal, heritage-led alternative.
- `data-theme="royal-blue-teal"` — modern civic-service alternative.

Only the approved palette will ship in production. The trial switcher will be excluded from production builds.

### Typography

- Use a highly legible Devanagari-capable font for Hindi UI/content after license and rendering review.
- Use the configured Latin font stack for English UI labels where appropriate.
- Keep minimum body text at 16px and maintain sufficient line height for Hindi and Urdu content.

## 7. UI component and icon policy

- **Core primitives:** Shadcn UI, owned in the repository and customised only through shared tokens/components.
- **Current base:** supplied Shadcn preset `b1x9M8ZeJW` using `base-maia` and the configured icon registry.
- **Current installed primitives:** Button and Card.
- **ChaiUI:** registry configured as `@chaiui`. Use only a block that fits the board UI and does not overwrite an approved shared component. It is an optional source of isolated blocks, not the site-wide visual system.
- **Icons:** use one primary icon system per surface. Prefer the Shadcn preset registry/approved icon set. Evaluate PikaIcons only for a specific missing icon, with no mixed visual styles in the same interface.
- Do not add decorative icons that do not help comprehension.

## 8. Frontend architecture

React does not use traditional server-side MVC directly, so this project will use an MVC-inspired structure:

- **Model:** domain types, API clients, mappers, fixtures, and schemas.
- **View:** presentational components and page markup.
- **Controller:** page containers and hooks that coordinate data, view state, and user interaction.

```text
src/
├── app/
│   ├── App.tsx                 # app composition and route shell
│   └── providers.tsx           # future query/i18n/error-boundary providers
├── assets/                     # approved static assets only
├── components/                 # reusable presentational UI
│   ├── common/                 # section heading, external link, empty state
│   ├── layout/                 # header, footer, navbar, page shell
│   ├── home/                   # display-only homepage sections
│   └── ui/                     # Shadcn-owned primitives
├── containers/                 # controller layer: feature composition/state
│   └── home/
├── pages/                      # route-level pages
│   ├── HomePage.tsx
│   ├── NoticesPage.tsx
│   └── NotFoundPage.tsx
├── features/                   # feature-local models, hooks, mapping
│   ├── notices/
│   ├── services/
│   ├── leadership/
│   └── gallery/
├── services/                   # API clients; no JSX
├── data/                       # typed mock data until APIs exist
├── types/                      # shared domain contracts
├── config/                     # navigation, routes, site config, feature flags
├── hooks/                      # generic reusable hooks
├── utils/                      # pure helpers: formatting, URLs, dates, a11y
└── styles/
    ├── theme.css               # semantic CSS variables and trial themes
    └── globals.css             # resets and global styles
```

Rules:

- Pages and containers may orchestrate; display components do not fetch data.
- Services are responsible for HTTP and response mapping, never direct component state.
- Components receive typed props and do not use hardcoded official content.
- External links are validated and rendered through one shared safe-link component.
- Feature data is injected through containers, allowing mocks to be replaced by an API service.

## 9. Content contracts

The initial mock data will model these minimum fields:

```ts
type UpdateCategory = 'notice' | 'tender' | 'proforma'

interface BoardUpdate {
  id: string
  category: UpdateCategory
  title: string
  publishedAt: string // ISO 8601 date
  documentUrl: string
  language: 'hi' | 'en' | 'ur'
  isExternal?: boolean
}

interface QuickService {
  id: string
  title: string
  description: string
  href: string
  icon: string
  isExternal: boolean
}

interface Leader {
  id: string
  name: string
  designation: string
  imageUrl: string
  profileUrl?: string
  displayOrder: number
}
```

All official content requires a source/owner before production publishing. Placeholder images, names, figures, and downloads must be visibly identified during review and must not be released as official facts.

## 10. Functional acceptance criteria

### Navigation and responsiveness

- Navbar becomes sticky after page start and does not obscure anchor targets.
- Mobile navigation is keyboard accessible, closable with Escape, and focus-trapped while open.
- Homepage is usable from 320px width through large desktop screens.

### Latest updates

- User can switch among Notices, Tenders, and Proformas using accessible tabs.
- Each entry shows title, date, type, and destination action.
- Lists handle loading, no-data, and failed-load states.
- PDF/external links identify that they open a document or leave the website.

### Carousel and gallery

- Carousel supports keyboard controls, pauses when appropriate, and honors reduced motion.
- Gallery images include meaningful alt text and open in an accessible modal.
- Hero media is optimised and never blocks the first meaningful content.

### Accessibility and quality

- Semantic heading order, landmarks, labels, focus rings, and contrast meet WCAG 2.2 AA intent.
- Screen-reader-only descriptions are provided when an icon-only control is unavoidable.
- Form inputs introduced later use client validation, clear errors, and server-side validation once a backend exists.

## 11. Security, privacy, and performance

- Never hardcode credentials, tokens, or privileged portal URLs.
- Validate and allowlist external links before rendering them.
- Use `rel="noopener noreferrer"` for external targets opened in a new tab.
- Sanitize any future CMS-provided rich text before rendering it.
- Use responsive images, modern formats, lazy loading below the fold, and explicit image dimensions.
- Introduce rate limits, CAPTCHA, authentication, and server-side validation only with backend workflows; none belongs in a static homepage implementation.
- Log client errors through a privacy-reviewed observability tool only after deployment requirements are agreed.

## 12. Development milestones

| Milestone | Deliverable | Approval needed |
| --- | --- | --- |
| 0. Foundation | Vite, TypeScript, Tailwind, Shadcn, aliases, and build verification | Complete |
| 1. Content and design decision | Official assets, link inventory, content owners, selected trial palette | Yes |
| 2. Design system | Tokens, typography, shared layout, responsive grid, theme trial | Yes |
| 3. Homepage shell | Navbar, footer, hero, quick services, mobile navigation | Yes |
| 4. Information sections | Leadership, updates, gallery, examination, affiliation, statistics | Yes |
| 5. Data integration | Service layer, API contracts, loading/error states | Yes, if API is in scope |
| 6. Quality release | Browser/device QA, accessibility pass, content verification, production build | Yes |

## 13. Current setup status

- React + TypeScript Vite project scaffolded in this repository.
- Tailwind CSS v4 installed and integrated through the Vite plugin.
- `@/*` import alias configured for Vite and TypeScript.
- Shadcn `components.json` created from the supplied preset.
- Shadcn Button and Card components installed, plus ChaiUI `Badge`, `Tabs`, and `Chip` primitives (`@chaiui/badge`, `@chaiui/tabs`, `@chaiui/chip`).
- ChaiUI skills (`chaiui`, `chaiui-review`) installed under `.agents/skills/`.
- ChaiUI registry configured at `https://ui.chaicode.com/r/{name}.json`.
- `@base-ui/react` installed because the selected `base-maia` Shadcn component requires it.
- `pnpm run build` and `pnpm run lint` pass with 0 errors.
- ChaiUI Hero block has not been installed because it would overwrite the shared Button component. It will be added only after reviewing its generated diff or selecting a non-conflicting ChaiUI block.

## 14. Required decisions before homepage implementation

1. Confirm the exact official board name, logo, and approved leader list.
2. Choose the first theme trial: Navy/Saffron, Maroon/Gold, or Royal Blue/Teal.
3. Confirm initial release languages: Hindi only, Hindi + English, or Hindi + English + Urdu.
4. Provide/approve hero images, leader photos, gallery images, statistics, and office contact details.
5. Provide verified destinations for all online-service cards and official document URLs.
6. Confirm whether notices/tenders/proformas come from an API, CMS, spreadsheet/export, or initial local JSON.
7. Confirm whether only the homepage is required in phase one, or whether list/detail pages are also in phase one.
8. Confirm deployment target and domain, so environment configuration and SEO metadata can be prepared correctly.

## 15. Implementation log

### 26 November 2026 — Homepage foundation implemented

- Replaced the Vite starter screen with a responsive homepage shell.
- Added the MVC-inspired structure under `pages/`, `containers/`, `components/`, `data/`, `types/`, and `styles/`.
- Added central semantic design tokens in `src/styles/theme.css`; the active trial is Navy/Saffron. Maroon/Gold and Royal Blue/Teal variants are token-only alternatives.
- Added the supplied logo from `public/logo.png` to the header and footer.
- Added responsive sticky navigation, mobile navigation toggle, skip link, focus styles, and reduced-motion handling.
- Added a single-slide carousel-ready hero preview using the supplied Pexels image URL. It is explicitly labelled as a demo and must be replaced or formally approved before release.
- Added service cards, Notice/Tender/Proforma tabs, leadership/gallery/examination/affiliation placeholders, and an official-style footer. No unverified board content has been added.
- Confirmed `pnpm run build` passes after the implementation.

### 26 November 2026 — Full homepage sections implemented

- Expanded `src/types/home.ts` with full typed contracts: `HeroSlide`, `BoardUpdate`, `Leader`, `GalleryImage`, `ExamProgram`, `StatItem`, `ServiceItem`.
- Expanded `src/data/home-data.ts` with rich mock data for all sections (3 hero slides, 8 services, 12 updates across all 3 categories, 4 leaders, 6 gallery images, 3 exam programmes, 4 stat items).
- Replaced single-slide HeroSection with a fully accessible multi-slide carousel: auto-advance (5 s), pause on hover, keyboard (←/→), play/pause toggle, `prefers-reduced-motion` support, `aria-live` announcements.
- Added `UpdatesSection` with real mock items, date formatting, NEW/file-type/language badges, and external link rendering.
- Added `LeadershipSection` with leader cards (placeholder content clearly labelled pending approval).
- Added `StatsSection` ("Board at a glance") with 4 key statistics in a branded strip.
- Added `GallerySection` with accessible lightbox modal (keyboard: Escape/←/→, focus trap on open, prev/next navigation, caption and counter).
- Added `ExaminationSection` with Wastania, Fauquania, and Moulvi programme cards including level badges, subject list, and equivalence callout.
- Added `AffiliationSection` with 4 information cards.
- Added `ThemeSwitcher` dev-only floating widget (auto-hidden in production builds) for Navy/Saffron, Maroon/Gold, Royal Blue/Teal trial themes.
- Replaced monolithic `InformationSections.tsx` with dedicated section components.
- Updated `HomeContainer.tsx` to wire all sections with typed props and mock data.
- Updated `SiteHeader.tsx` to show board name in Hindi under the English name.
- Updated `SiteFooter.tsx` with 4-column layout: Brand, Quick Links, Contact, Policies.
- Rewrote `globals.css` with all new section styles, responsive breakpoints, and CSS variables.
- `pnpm run build` passes with 0 TypeScript errors (285 kB JS, 29.6 kB CSS).

### 26 November 2026 — Official Govt-style UI polish, ChaiUI primitives & theme unification

- Installed `@chaiui/badge`, `@chaiui/tabs`, and `@chaiui/chip` components alongside `chaiui` and `chaiui-review` skills; scoped `src/index.css` so all colors and typography remain governed by `src/styles/theme.css` and `src/styles/globals.css`.
- Created `src/utils/site-contact.ts` as the single source of truth for address (`5, Vidyapati Marg, Patna, Bihar — 800001`), emails (`bsmebpatna1@gmail.com`, `help.bsemb@gmail.com`), phone (`+91-0612-2257860`), office hours (`Mon–Fri: 9:30 am – 6:00 pm`), and social links, shared by `SiteHeader.tsx` and `SiteFooter.tsx`.
- Redesigned `SiteHeader.tsx` with a utility bar, theme-reactive right-to-left scrolling notification ticker (with Lucide `<Bell />` and ChaiUI `Badge` on `isNew` notices), and a single-row navbar (logo + Hindi/English title + nav links) that stays fixed with a translucent frosted-glass backdrop on scroll.
- Redesigned `HeroSection.tsx` into a restrained, theme-reactive government split banner with a 3-slide accessible carousel.
- Redesigned `ServicesSection.tsx` as 5 compact square Shadcn `Card` tiles with 48px Lucide icons and theme-soft hover fill.
- Combined `LeadershipSection.tsx` (left: 2+1 pyramid for Chief Minister, Education Minister, and BSMEB Chairman) and `UpdatesSection.tsx` (right: Shadcn `Card` + ChaiUI `Tabs` + `Badge`, bottom-to-up auto-scroll with hover/button pause and fixed viewport height to prevent tab layout shift).
- Updated `GallerySection.tsx` to render programme/event album folders (defaulting to each album's first image as thumbnail) with a programme-scoped lightbox modal.
- Updated `ExaminationSection.tsx` to a 3-column Shadcn `Card` grid with corrected BSMEB equivalences: Wastania (Class 8), Fauquania (Class 10), and Moulvi (Class 12).
- Updated `AffiliationSection.tsx` to a 4-card Shadcn grid featuring `Affiliation Process`, `Institution Search`, `Inspection & Compliance`, and `Act & Regulations`.
- Extracted `src/components/common/SectionWave.tsx` and applied it across white card sections (`ServicesSection`, `GallerySection`, `AffiliationSection`).
- Updated `ThemeSwitcher.tsx` into a production-ready `Display Theme` control with `localStorage` persistence supporting 6 themes: Navy/Saffron, Maroon/Gold, Royal Blue/Teal, Green/Light Green (`emerald-sage`), White/Slate (`clean-white`), and Warm Amber (`chaiui`).
- Verified `pnpm run build` and `pnpm run lint` pass with 0 errors.

### 27 November 2026 — Production Tailwind v4 + Shadcn/Base-UI + i18n architecture refactor

- Added `src/app/PreferencesContext.tsx` (`useReducer` + `localStorage` + DOM sync) and `src/app/providers.tsx` to centrally manage `language` (`en` / `hi`), 2-step `fontStep` (`14px`–`18px`), and `theme` across the entire portal, backed by a synchronous zero-FOUC pre-hydration script in `index.html` and white-backed `public/favicon.png`.
- Added `src/utils/i18n.ts` for full bilingual English & Hindi content switching across header, sub-navigation, hero, services, leadership, minimalist ledger-style `UpdatesSection`, gallery albums, examination cards, affiliation cards, footer, and theme switcher.
- Exposed all BSMEB semantic design tokens (`--color-brand`, `--color-brand-strong`, `--color-brand-soft`, `--color-surface`, `--color-surface-muted`, `--color-ink`, `--color-ink-soft`, `--color-line`, `--color-accent`, `--font-sans`, `--font-serif`) in `src/styles/theme.css` `@theme inline`.
- Built `src/components/ui/dialog.tsx` on `@base-ui/react/dialog` and migrated `GallerySection.tsx` lightbox to it for proper focus trapping, scroll locking, and Escape/backdrop dismissal.
- Migrated all layout and section components (`SiteHeader`, `HeroSection`, `ServicesSection`, `LeadershipSection`, `UpdatesSection`, `GallerySection`, `ExaminationSection`, `AffiliationSection`, `SiteFooter`, `ThemeSwitcher`, `SectionHeading`, `SectionWave`, `HomeContainer`) to Tailwind CSS v4 utilities and Shadcn/ChaiUI primitives, shrinking `src/styles/globals.css` from ~2,040 lines of unlayered CSS down to ~115 lines of `@layer base` resets, `.site-shell`, `.skip-link`, and marquee/scroll `@keyframes`.
- Verified `pnpm run build` and `pnpm run lint` pass with 0 errors.

### Next implementation step

- Replace placeholder leader names, images, contact details, and official URLs with approved board content.
- Connect notices/tenders/proformas to a real API, CMS, or JSON feed.
- Add RTI, privacy-policy, and accessibility-statement pages.
- Performance: audit images, switch hero to `<picture>`/WebP, add explicit dimensions, enable lazy loading on below-fold images.
- QA: cross-browser, mobile-device, and accessibility (axe/NVDA) pass before launch.

