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
│   │   └── SEOHead.astro       # Meta tags, OG tags, GA script
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

No `src/content/` collection for MVP. Content lives directly in page files. Post-MVP blog would use Astro content collections.

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

**Type scale:**
- Hero headline: `text-5xl` / `text-6xl` (mobile/desktop)
- Page headings: `text-3xl` / `text-4xl`
- Section headings: `text-xl` / `text-2xl`
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
- Vanilla JS: one `<script>` tag managing expand/collapse with `aria-expanded`

### Leadership (`/leadership`)

- Philosophy section: 2-3 paragraphs on leadership approach
- Track record: timeline or card layout — teams led, outcomes, scale
- Testimonials: styled blockquotes with attribution (placeholders)

### Investments (`/investments`)

- Philosophy section: investment thesis and criteria
- Portfolio grid: cards per company — name, description, investment date, return
- Track record summary: aggregate metrics (total investments, avg return)

### Contact (`/contact`)

- Two-column layout: form left, info right
- Form fields: Name (text), Email (email), Reason (select: Consulting, Speaking, Investment, Other), Message (textarea)
- Submit via Formspree POST with AJAX enhancement
- Honeypot field for spam protection
- Right column: social links, calendar booking placeholder, "What to expect" text
- Success/error states via vanilla JS

## Shared Components

### Header.astro
- Sticky, transparent over hero, transitions to solid navy via `IntersectionObserver`
- Active page highlighted in amber
- Mobile: hamburger toggles slide-in menu with `aria-label`

### Footer.astro
- Navy background, cream text
- Three columns: nav links, social icons (inline SVG), copyright
- Social links: `target="_blank"` with `rel="noopener noreferrer"`

### SEOHead.astro
**Props:** `title`, `description`, `ogImage`, `url`
- `<title>`, `<meta name="description">`, `<link rel="canonical">`
- OpenGraph: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- Twitter card meta tags
- Google Analytics gtag.js loaded with `async`
- JSON-LD `Person` schema on landing page

## Accessibility (WCAG 2.1 AA)

- All interactive elements keyboard-navigable
- `aria-expanded` on accordion toggles
- Color contrast: navy on cream = 12.5:1 (passes AAA)
- Skip-to-content link
- Form labels associated with inputs
- Error messages via `aria-live` regions

## Performance

- Self-hosted fonts with `font-display: swap`
- Images: `loading="lazy"` below fold, explicit `width`/`height` for CLS prevention
- Astro default: zero JS shipped unless `<script>` tags present
- Total JS: nav scroll, mobile menu, accordion, contact form AJAX — ~2-3KB vanilla
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
