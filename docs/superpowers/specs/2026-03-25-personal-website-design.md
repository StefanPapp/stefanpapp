# Stefan Papp Personal Website — Design Spec

## Overview

Personal website for Stefan Papp serving as a brand platform, consulting lead generator, thought leadership hub, and investor/partner credibility signal. Bridges idealistic worldview (libertarianism, growth culture, cats-as-culture) and professional expertise (AI-augmented engineering, leadership, investing, data transformations).

**Tech stack:** Astro + Tailwind CSS, pure Astro (no React), vanilla JS for interactivity
**Hosting:** Vercel
**Contact form:** Formspree
**Analytics:** Google Analytics (gtag.js)
**Domain:** stefanpapp.com (TBD)

## Decisions Log

| Decision | Choice | Rationale |
|---|---|---|
| Content strategy | All 7 pages with realistic placeholders | Full MVP structure from day one |
| Landing hero | Literal split-screen (idealistic vs materialistic) | Core brand duality expressed visually |
| Architecture | Pure Astro, zero React | Accordion + contact form don't need React; maximizes performance |
| Contact form | Formspree | Host-agnostic, free tier (50 subs/mo), simple HTML integration |
| Color palette | Navy + Cream + Amber | Muted, intellectual, confident |
| Analytics | Google Analytics | Free, powerful; cookie consent banner needed |
| Hosting | Vercel | Excellent Astro support, fast edge network, free tier |
| Worldview sections | Accordion-style expandable | Scannable, minimal JS, first section expanded on load |

## Project Structure

```
stefanpapp/
├── public/
│   ├── fonts/                  # Self-hosted Lora + Inter
│   ├── images/                 # Headshot, placeholder images
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.astro        # Nav bar (shared)
│   │   ├── Footer.astro        # Footer with social links (shared)
│   │   ├── HeroSplit.astro     # Landing page split-screen hero
│   │   ├── SocialProof.astro   # Logo/metrics strip
│   │   ├── FeaturedContent.astro # Highlighted content cards
│   │   ├── ContactForm.astro   # Formspree-powered form
│   │   ├── Accordion.astro     # Expandable section (worldview)
│   │   ├── CaseStudyCard.astro # Reusable case study card
│   │   ├── ServiceBlock.astro  # Service description block
│   │   ├── SEOHead.astro       # Meta tags, OG tags, GA script
│   │   └── CookieConsent.astro # GDPR cookie consent banner
│   ├── layouts/
│   │   └── BaseLayout.astro    # HTML shell, header, footer, SEO
│   ├── pages/
│   │   ├── index.astro         # Landing page
│   │   ├── ai-engineering.astro
│   │   ├── data-transformations.astro
│   │   ├── worldview.astro
│   │   ├── leadership.astro
│   │   ├── investments.astro
│   │   └── contact.astro
│   └── styles/
│       └── global.css          # Tailwind directives + custom props
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
└── tsconfig.json
```

Additional files:
- `public/robots.txt` — permissive default
- `src/pages/404.astro` — custom 404 page (navy background, "Page not found" message, link home)

No `src/content/` collection for MVP. Content lives directly in page files. Post-MVP blog would use Astro content collections.

## Responsive Breakpoints

Following Tailwind defaults, with these conventions:
- **Mobile-first:** all base styles target mobile (<768px)
- **`md` (768px):** tablet — hero stacks to two columns, nav switches from hamburger to horizontal links, two-column layouts activate
- **`lg` (1024px):** desktop — max content width applies (`max-w-6xl` centered), larger type scale kicks in
- Content container: `max-w-6xl mx-auto px-4 md:px-8` on all pages
- Section vertical padding: `py-16 md:py-24`
- Card grid gaps: `gap-6 md:gap-8`

## Tailwind Configuration

```js
// tailwind.config.mjs
export default {
  content: ['./src/**/*.{astro,html,js}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#1a2332', light: '#2a3a4e' },
        cream: { DEFAULT: '#f5f0e8', dark: '#e8e0d0' },
        amber: { DEFAULT: '#c8933e', light: '#d4a854' },
        slate: '#64748b',
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

Usage: `bg-navy`, `bg-navy-light`, `text-cream`, `border-cream-dark`, `font-serif`, `font-sans`.

## Astro Configuration

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://stefanpapp.com',
  output: 'static',
  integrations: [tailwind(), sitemap()],
});
```

Vercel deployment via `vercel` CLI or Git integration — no adapter needed for static output.

## Color Palette

| Token | Value | Usage |
|---|---|---|
| `navy` | `#1a2332` | Primary text, headers, dark backgrounds |
| `navy-light` | `#2a3a4e` | Secondary text, hover states |
| `cream` | `#f5f0e8` | Page background, idealistic side |
| `cream-dark` | `#e8e0d0` | Borders, subtle dividers |
| `amber` | `#c8933e` | CTAs, accent links, highlights |
| `amber-light` | `#d4a854` | Hover state for amber |
| `white` | `#ffffff` | Cards, materialistic side background |
| `slate` | `#64748b` | Body text, muted content |

## Typography

- **Serif (idealistic content):** Lora — essays, worldview, philosophical sections
- **Sans-serif (professional content):** Inter — navigation, services, case studies, CTAs
- Self-hosted via `public/fonts/` for performance (no external Google Fonts requests)
- **Formats:** woff2 only (95%+ browser support, smallest size)
- **Weights:** Inter 400 (regular), 600 (semibold), 700 (bold). Lora 400 (regular), 700 (bold), 400 italic.

**Type scale (mobile / `lg:` desktop):**
- Hero headline: `text-4xl` / `lg:text-6xl`
- Page headings: `text-3xl` / `lg:text-4xl`
- Section headings: `text-xl` / `lg:text-2xl`
- Body: `text-base` (16px)
- Small/meta: `text-sm` (14px)

**Duality in typography:**
- Left split (idealistic): cream background, Lora serif, amber accents
- Right split (professional): white background, Inter sans-serif, navy accents

## Page Designs

### Landing Page (`/`)

1. **Navigation bar** — sticky, transparent on hero, solid navy on scroll. Logo/name left ("Stefan Papp" in Inter bold), nav links right. Mobile: hamburger menu. Links: AI Engineering, Data Transformations, Worldview, Leadership, Investments, Contact.

2. **Hero split-screen** — full viewport height, two equal columns:
   - **Left (Idealistic):** Cream background, Lora serif. Headline: "Ideas shape the world." Subtext teaser about worldview. CTA: "Read my thinking" (amber outline button). Thin amber decorative line accent.
   - **Right (Professional):** White background, Inter sans-serif. Headline: "I build what's next." Subtext about AI engineering & leadership. CTA: "Work with me" (solid amber button). Professional headshot placeholder.
   - **Mobile:** Stacks vertically — professional side first, idealistic second.

3. **Featured content strip** — 2-4 cards highlighting key pieces from each pillar. Cards link to respective pages. Alternating serif/sans-serif card styles.

4. **Social proof strip** — horizontal row of company logos or key metrics (e.g., "15+ years engineering leadership"). Muted styling, cream background.

5. **Final CTA band** — full-width navy background, white text. "Let's talk." with link to contact page.

6. **Footer** — navy background, three columns: nav links, social icons (SVG), copyright.

### AI Engineering (`/ai-engineering`)

- Hero banner: navy background, page title + one-line description in Inter
- "What is AI Augmented Engineering" section: 2-3 paragraphs defining Stefan's framework
- Services grid: 3 cards (Consulting, Integration, Training) with icons, short descriptions
- Case studies: 2-3 `CaseStudyCard` components — challenge/approach/outcome format, anonymized placeholders
- Bottom CTA: "Let's discuss your project" linking to contact

### Data Transformations (`/data-transformations`)

- Same structure as AI Engineering page
- Services grid: ETL Pipelines, Data Migration, Data Architecture
- Case studies: 2-3 cards with placeholder outcomes

### Worldview (`/worldview`)

- Hero banner: cream background, Lora serif, title "What I Believe"
- Anchor nav: three pill-style links (Libertarianism, Growth Culture, Cats as Cultural Archetype)
- Three `Accordion` sections, each containing 800-1200 word essay placeholder
- First section expanded on load, others collapsed
- Clicking an anchor pill: smooth-scrolls to the section AND expands it if collapsed
- Vanilla JS: one `<script>` tag managing expand/collapse with `aria-expanded`

### Leadership (`/leadership`)

- Philosophy section: 2-3 paragraphs on leadership approach
- Track record: card grid layout — one card per role/achievement with title, org, outcome, and timeframe
- Testimonials: styled blockquotes with left amber border accent, attribution name + role below. Placeholder quotes.

### Investments (`/investments`)

- Philosophy section: investment thesis and criteria
- Portfolio grid: cards per company — name, description, investment date, return
- Track record summary: aggregate metrics (total investments, avg return)
- Disclaimer text at bottom: "Past performance is not indicative of future results. Returns shown are based on personal records and may not reflect all fees or expenses."

### Contact (`/contact`)

- Two-column layout (`md:` breakpoint): form left, info right. Stacks on mobile (form first).
- Form fields (all required except Message):
  - Name: text, required, min 2 chars
  - Email: email, required, browser-validated
  - Reason: select (required), options: Consulting, Speaking, Investment, Other
  - Message: textarea, optional, max 2000 chars
- Validation: HTML5 `required` + `type` attributes for no-JS. JS enhances with inline error messages below each field (red text, `aria-live="polite"`).
- Submit via Formspree POST with AJAX enhancement. Button shows "Sending..." disabled state during submission.
- Success: form replaced with green-tinted confirmation message ("Thanks! I'll be in touch within 2 business days.")
- Error: red banner above form ("Something went wrong. Please try again or email me directly at [email].")
- Honeypot field for spam protection
- Right column: social links (LinkedIn, X/Twitter), calendar booking placeholder, "What to expect" text

## Component Interfaces

| Component | Props | Notes |
|---|---|---|
| `SEOHead.astro` | `title: string`, `description: string`, `ogImage?: string`, `url: string` | OG image defaults to `/images/og-default.png` if not provided |
| `HeroSplit.astro` | `leftHeadline: string`, `leftSubtext: string`, `leftCta: { label, href }`, `rightHeadline: string`, `rightSubtext: string`, `rightCta: { label, href }`, `headshotSrc?: string` | Full-viewport split hero |
| `Accordion.astro` | `title: string`, `id: string`, `defaultOpen?: boolean` | Uses `<slot>` for body content. `id` used for anchor linking. |
| `CaseStudyCard.astro` | `title: string`, `challenge: string`, `approach: string`, `outcome: string` | Used on AI Engineering and Data Transformations pages |
| `ServiceBlock.astro` | `title: string`, `description: string`, `icon: string` | `icon` is an inline SVG string or path |
| `ContactForm.astro` | `formspreeId: string` | Self-contained form with AJAX + validation |
| `SocialProof.astro` | `items: { label: string, value: string }[]` | Horizontal metrics strip |
| `FeaturedContent.astro` | `cards: { title: string, description: string, href: string, variant: 'idealistic' \| 'professional' }[]` | Alternating card styles based on variant |

## Shared Components

### Header.astro
- Sticky, transparent over hero, transitions to solid navy via `IntersectionObserver` observing a sentinel `<div>` placed at top of hero
- Active page highlighted in amber via `Astro.url.pathname` match
- Desktop (`md:+`): horizontal nav links
- Mobile (`<md`): hamburger icon toggles a full-width slide-down menu overlay, with `aria-label="Toggle menu"` and `aria-expanded`

### Footer.astro
- Navy background, cream text
- Three columns (`md:+`; stacks on mobile): nav links, social icons (inline SVG), copyright
- Social platforms: LinkedIn, X/Twitter, GitHub
- Social links: `target="_blank"` with `rel="noopener noreferrer"`

### SEOHead.astro
**Props:** `title`, `description`, `ogImage` (optional, defaults to `/images/og-default.png`), `url`
- `<title>`, `<meta name="description">`, `<link rel="canonical">`
- OpenGraph: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- Twitter card meta tags
- Google Analytics gtag.js — loaded conditionally after cookie consent (see Cookie Consent section)
- JSON-LD `Person` schema on landing page; `ProfessionalService` schema on AI Engineering and Data Transformations pages

## Accessibility (WCAG 2.1 AA)

- All interactive elements keyboard-navigable
- `aria-expanded` on accordion toggles
- Color contrast: navy on cream = 12.5:1 (passes AAA)
- Skip-to-content link
- Form labels associated with inputs
- Error messages via `aria-live` regions

## Cookie Consent

A lightweight custom consent banner (no third-party library) for GDPR compliance:

- On first visit, a bottom-fixed banner appears: "This site uses cookies for analytics." with "Accept" and "Decline" buttons.
- **Accept:** stores `cookie_consent=granted` in `localStorage`, loads GA gtag.js dynamically.
- **Decline:** stores `cookie_consent=denied` in `localStorage`, GA never loads.
- On subsequent visits, reads `localStorage` — no banner shown, GA loaded only if granted.
- Implemented as a `CookieConsent.astro` component included in `BaseLayout.astro`.
- ~30 lines of vanilla JS. No external dependencies.

## Performance

- Self-hosted fonts with `font-display: swap`
- Images: use Astro's built-in `<Image>` component (`astro:assets`) for automatic WebP/AVIF optimization and responsive `srcset`. Headshot and above-fold images eager-loaded; below-fold images `loading="lazy"`. Explicit `width`/`height` for CLS prevention.
- Astro default: zero JS shipped unless `<script>` tags present
- Total JS: nav scroll, mobile menu, accordion, contact form AJAX, cookie consent — ~3-4KB vanilla
- Target: Lighthouse >90 on mobile

## Formspree Integration

- HTML form: `action="https://formspree.io/f/{id}"` with `method="POST"`
- Progressive enhancement: works without JS (standard submit), enhanced with AJAX
- Honeypot field: hidden input for bot detection
- Formspree ID to be configured at deployment time

## Out of Scope (MVP)

- Blog / CMS
- Newsletter signup
- Dark/light mode toggle
- Multi-language support
- E-commerce
- User accounts
- Video hosting
- Comments / community features
