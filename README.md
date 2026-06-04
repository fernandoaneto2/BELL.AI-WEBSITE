# Bell — The North Fork Concierge

Institutional landing page for **bell.ai**, an AI concierge platform for hospitality businesses on the North Fork, Long Island, NY.

---

## Overview

The site targets hospitality decision-makers (hotel owners, inn managers, restaurant and winery operators) and serves as the primary conversion surface for the Bell product. Its goal is to present what Bell is, demonstrate it in action, and convert visitors into a demo booking.

**Live target:** Vercel  
**Default language:** English (US)  
**Supported locales:** `en` · `es` · `pt`

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 15.5.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| i18n | next-intl | 4.x |
| Animation | Framer Motion | 12.x |
| Icons | Lucide React | 1.x |
| Runtime | Node.js | ≥ 20.x |
| Deploy | Vercel | — |

> Tailwind v4 uses CSS-based configuration (`@theme` in `globals.css`) instead of `tailwind.config.ts`.

---

## Project Structure

```
bell-site/
├── messages/
│   ├── en.json          # Source copy (English US) — edit here first
│   ├── es.json          # Spanish translation
│   └── pt.json          # Portuguese (BR) translation
├── public/
│   ├── favicon.svg      # Bell mark on navy background
│   └── images/          # TODO: North Fork photography
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx          # Locale layout — fonts, metadata, providers
│   │   │   ├── page.tsx            # Landing page (composes all sections)
│   │   │   ├── privacy/page.tsx    # Privacy policy placeholder
│   │   │   └── terms/page.tsx      # Terms of service placeholder
│   │   ├── globals.css             # Tailwind import + Bell design tokens + base styles
│   │   ├── layout.tsx              # Root pass-through layout
│   │   └── page.tsx                # Root redirect → /en
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          # Sticky navbar — scroll-aware, mobile hamburger
│   │   │   ├── Footer.tsx          # Navy footer — 3 columns + language switcher
│   │   │   └── LanguageSwitcher.tsx # EN · ES · PT pill switcher (client component)
│   │   ├── sections/
│   │   │   ├── Hero.tsx            # Full-bleed coastal hero + app mockup
│   │   │   ├── TheShift.tsx        # Pain points — 3 cards
│   │   │   ├── MeetBell.tsx        # Product intro + chat mockup
│   │   │   ├── HowItWorks.tsx      # 3-step process (dark section)
│   │   │   ├── LiveDemo.tsx        # Animated chat demo — scripted, no real API
│   │   │   ├── OnlyBellKnows.tsx   # Local knowledge differentiator (dark)
│   │   │   ├── ForGuests.tsx       # 6-card bento grid — guest benefits
│   │   │   ├── HumanPlusAI.tsx     # "Amplifies, doesn't replace" anchor message
│   │   │   ├── ForEstablishments.tsx # Decision-maker outcomes (dark)
│   │   │   ├── UseCases.tsx        # Hotels · Inns · Restaurants · Wineries
│   │   │   ├── SocialProof.tsx     # Partner logos + testimonials (placeholders)
│   │   │   ├── FAQ.tsx             # Accessible accordion — 6 questions
│   │   │   └── FinalCTA.tsx        # Conversion section — coastal immersive
│   │   └── ui/
│   │       ├── Section.tsx         # Section wrapper with padding + max-width
│   │       ├── Card.tsx            # White card — rounded corners, soft shadow
│   │       ├── Eyebrow.tsx         # Gold uppercase overline with optional hairlines
│   │       ├── Button.tsx          # Variants: navy · ghost · gold
│   │       ├── BellMark.tsx        # Bell SVG mark — line-art, accepts size + color
│   │       └── StringLights.tsx    # Decorative SVG string lights motif
│   ├── i18n/
│   │   ├── routing.ts              # defineRouting — locales + defaultLocale
│   │   └── request.ts              # getRequestConfig — loads messages per locale
│   ├── middleware.ts               # next-intl middleware — locale detection + redirect
│   └── lib/
│       ├── fonts.ts                # Cormorant Garamond (serif) + Inter (sans)
│       ├── motion.ts               # Framer Motion variants — fadeUp, stagger, etc.
│       └── utils.ts                # cn() — clsx + tailwind-merge
├── next.config.ts                  # withNextIntl wrapper + image formats
└── package.json
```

---

## Design System

### Color Tokens (`globals.css` → `@theme`)

| Token | Hex | Usage |
|---|---|---|
| `--color-sand` | `#F7F3EA` | Primary background |
| `--color-sand-soft` | `#FBF8F2` | Alternate section background |
| `--color-ink` | `#1A2332` | Dark sections, footer, primary buttons |
| `--color-ink-soft` | `#243049` | Elevated dark cards |
| `--color-gold` | `#C9A24B` | Accents only — CTAs, overlines, icons |
| `--color-gold-light` | `#E5C580` | Hover states, light-on-dark usage |
| `--color-gold-deep` | `#8B6F2E` | Shadows, gold button hover |
| `--color-text` | `#2A3140` | Body text on light backgrounds |
| `--color-text-muted` | `#6B7280` | Secondary text |
| `--color-text-on-ink` | `#F3EFE6` | Text on navy backgrounds |
| `--color-online` | `#2FB37A` | Status indicator only |

**Rules:** Background defaults to sand. Gold is accent only — never as large background blocks. Dark sections use `--color-ink`. No dark/neon SaaS aesthetic.

### Typography

| Role | Font | Weights |
|---|---|---|
| Headings / display | Cormorant Garamond | 400 · 500 · 600 |
| Body / UI | Inter | 400 · 500 · 600 |
| Overlines | Inter, `tracking-[0.22em]`, uppercase | 500 |

Loaded via `next/font/google` — no external CSS requests.

---

## Internationalization

Sub-path routing via next-intl: `/en`, `/es`, `/pt`.

- **Default locale:** `en` (English US)
- **Locale detection:** `Accept-Language` header in middleware, fallback to `en`
- **All copy** lives in `messages/*.json` — the JSON files are the source of truth for content
- Locale is preserved when switching languages (current path is rewritten, not reset)

To add or edit copy, modify `messages/en.json` first, then update `es.json` and `pt.json`.

---

## Sections — Page Architecture

| # | Component | Purpose |
|---|---|---|
| 1 | `Navbar` | Sticky navigation + language switcher + CTA |
| 2 | `Hero` | Value proposition in 5 seconds + app mockup |
| 3 | `TheShift` | Surface the pain — repetitive questions, after-hours gaps |
| 4 | `MeetBell` | Product personality + chat UI preview |
| 5 | `HowItWorks` | 3-step process: Scan → Ask → Experience |
| 6 | `LiveDemo` | Scripted animated chat — chips trigger pre-written responses |
| 7 | `OnlyBellKnows` | Local knowledge differentiator |
| 8 | `ForGuests` | 6-card bento grid of guest benefits |
| 9 | `HumanPlusAI` | Anchor message: Bell amplifies, does not replace |
| 10 | `ForEstablishments` | Decision-maker outcome points |
| 11 | `UseCases` | Hotels · Inns · Restaurants · Wineries |
| 12 | `SocialProof` | Partner logos + testimonials (honest placeholders) |
| 13 | `FAQ` | Accessible accordion — 6 objection-handling questions |
| 14 | `FinalCTA` | Conversion section with coastal background |
| 15 | `Footer` | Navigation · Legal · Language switcher · Brand |

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:3000 (auto-redirects to /en)

# Type check + lint
npm run lint

# Production build
npm run build
```

Requires Node.js ≥ 20.

---

## Pending (TODOs)

All placeholder items are marked `// TODO` in code and visually obvious in the UI. No data is invented.

| Item | Location |
|---|---|
| Real North Fork hero photography | `Hero.tsx`, `FinalCTA.tsx` |
| Clean Bell app screenshot | `MeetBell.tsx` |
| Real partner logos | `SocialProof.tsx` |
| Real guest/partner testimonials | `SocialProof.tsx` |
| Wire LiveDemo to real Bell API | `LiveDemo.tsx` |
| Real ROI metric | `ForEstablishments.tsx` |
| Privacy policy content | `/[locale]/privacy/page.tsx` |
| Terms of service content | `/[locale]/terms/page.tsx` |
| Real domain for `metadataBase` | `[locale]/layout.tsx` |
| OG image (1200×630) | `[locale]/layout.tsx` |

---

## Deployment

The project deploys to Vercel. Connect the GitHub repository and Vercel will auto-detect Next.js with no additional configuration required.

```bash
git push origin main
# Vercel deploys automatically on push to main
```

All three locale routes (`/en`, `/es`, `/pt`) are pre-rendered as SSG via `generateStaticParams`.

---

## Commit History

| Commit | Description |
|---|---|
| `d0b992c` | Initial commit from create-next-app |
| `2765c6c` | Scaffold — Next.js 15 + Tailwind v4 + next-intl v4 + dependencies |
| `e9d9b31` | Design system — color tokens, fonts, globals.css, UI primitives |
| `969220d` | Layout — sticky navbar, navy footer, language switcher |
| `dd0a89b` | Sections — all 13 landing page sections + /privacy + /terms |
| `93691cc` | Polish — SEO metadata, hreflang, OG, favicon, SSG, skip-to-content |
| `09f541d` | Bell mark updated to match brand logo — line-art style with speed lines |
