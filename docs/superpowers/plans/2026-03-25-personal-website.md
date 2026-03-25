# Stefan Papp Personal Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 7-page personal website for Stefan Papp using Astro + Tailwind CSS with a split idealistic/professional visual identity.

**Architecture:** Pure Astro static site (no React). All interactivity via vanilla JS `<script>` tags. Formspree for contact form, Google Analytics with cookie consent. Components are `.astro` files with typed props. Pages use a shared `BaseLayout`.

**Tech Stack:** Astro 5, Tailwind CSS 4, vanilla JS, Formspree, Google Analytics, Vercel (static hosting)

**Spec:** `docs/superpowers/specs/2026-03-25-personal-website-design.md`

---

## File Map

### Config & Root
| File | Action | Responsibility |
|---|---|---|
| `package.json` | Create | Dependencies, scripts |
| `astro.config.mjs` | Create | Astro config with tailwind + sitemap |
| `tailwind.config.mjs` | Create | Custom colors, fonts |
| `tsconfig.json` | Create | TypeScript config (Astro strict) |
| `src/styles/global.css` | Create | Tailwind directives, @font-face, base styles |

### Public Assets
| File | Action | Responsibility |
|---|---|---|
| `public/fonts/inter-*.woff2` | Create | Inter 400, 600, 700 font files |
| `public/fonts/lora-*.woff2` | Create | Lora 400, 400i, 700 font files |
| `public/favicon.svg` | Create | Simple SVG favicon |
| `public/robots.txt` | Create | Permissive robots.txt |
| `public/images/og-default.png` | Create | Default OG image placeholder |
| `public/images/headshot-placeholder.jpg` | Create | Placeholder headshot |

### Components
| File | Action | Responsibility |
|---|---|---|
| `src/components/SEOHead.astro` | Create | Meta tags, OG, JSON-LD, canonical |
| `src/components/CookieConsent.astro` | Create | GDPR consent banner, conditional GA loading |
| `src/components/Header.astro` | Create | Sticky nav, scroll transition, mobile menu |
| `src/components/Footer.astro` | Create | Social links, nav, copyright |
| `src/components/HeroSplit.astro` | Create | Two-column hero with idealistic/professional split |
| `src/components/SocialProof.astro` | Create | Horizontal metrics strip |
| `src/components/FeaturedContent.astro` | Create | Content cards with alternating styles |
| `src/components/ServiceBlock.astro` | Create | Service card with icon |
| `src/components/CaseStudyCard.astro` | Create | Challenge/approach/outcome card |
| `src/components/Accordion.astro` | Create | Expandable section with anchor support |
| `src/components/ContactForm.astro` | Create | Formspree form with AJAX + validation |

### Layout
| File | Action | Responsibility |
|---|---|---|
| `src/layouts/BaseLayout.astro` | Create | HTML shell wrapping Header + Footer + SEOHead + CookieConsent |

### Pages
| File | Action | Responsibility |
|---|---|---|
| `src/pages/index.astro` | Create | Landing page |
| `src/pages/ai-engineering.astro` | Create | AI Engineering services page |
| `src/pages/data-transformations.astro` | Create | Data Transformations services page |
| `src/pages/worldview.astro` | Create | Worldview manifesto page |
| `src/pages/leadership.astro` | Create | Leadership & track record page |
| `src/pages/investments.astro` | Create | Investment philosophy & portfolio page |
| `src/pages/contact.astro` | Create | Contact form page |
| `src/pages/404.astro` | Create | Custom 404 page |

### Tests
| File | Action | Responsibility |
|---|---|---|
| `tests/build.test.js` | Create | Verifies build output: all pages generated, HTML contains expected elements |
| `playwright.config.js` | Create | Playwright config for e2e tests |
| `tests/e2e/navigation.spec.js` | Create | Nav links, mobile menu, scroll behavior |
| `tests/e2e/accordion.spec.js` | Create | Accordion expand/collapse, anchor linking |
| `tests/e2e/contact-form.spec.js` | Create | Form validation, submission states |
| `tests/e2e/cookie-consent.spec.js` | Create | Consent banner, localStorage, GA loading |

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tailwind.config.mjs`
- Create: `tsconfig.json`
- Create: `src/styles/global.css`
- Create: `public/robots.txt`
- Create: `public/favicon.svg`

- [ ] **Step 1: Initialize Astro project**

```bash
cd /Users/stefanpapp/src/stefanpapp
npm create astro@latest . -- --template minimal --no-install --no-git --typescript strict
```

If prompted about overwriting, allow it. This creates the base `package.json`, `astro.config.mjs`, `tsconfig.json`.

- [ ] **Step 2: Install dependencies**

```bash
npm install astro @astrojs/tailwind @astrojs/sitemap tailwindcss
npm install -D @playwright/test
```

- [ ] **Step 3: Configure astro.config.mjs**

Replace the contents of `astro.config.mjs` with:

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://stefanpapp.com',
  output: 'static',
  integrations: [tailwind(), sitemap()],
});
```

- [ ] **Step 4: Configure tailwind.config.mjs**

Replace or create `tailwind.config.mjs`:

```js
/** @type {import('tailwindcss').Config} */
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
};
```

- [ ] **Step 5: Create global.css**

Create `src/styles/global.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/inter-regular.woff2') format('woff2');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('/fonts/inter-semibold.woff2') format('woff2');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/inter-bold.woff2') format('woff2');
}

@font-face {
  font-family: 'Lora';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/lora-regular.woff2') format('woff2');
}

@font-face {
  font-family: 'Lora';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/lora-italic.woff2') format('woff2');
}

@font-face {
  font-family: 'Lora';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/lora-bold.woff2') format('woff2');
}

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-cream text-navy font-sans;
  }
}
```

- [ ] **Step 6: Create public assets**

Create `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://stefanpapp.com/sitemap-index.xml
```

Create `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="4" fill="#1a2332"/>
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" fill="#c8933e" font-family="Georgia, serif" font-size="20" font-weight="bold">S</text>
</svg>
```

- [ ] **Step 7: Download font files**

```bash
mkdir -p public/fonts public/images
# Download Inter woff2 files from Google Fonts CDN
curl -L -o public/fonts/inter-regular.woff2 "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hjQ.woff2"
curl -L -o public/fonts/inter-semibold.woff2 "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYAZ9hjQ.woff2"
curl -L -o public/fonts/inter-bold.woff2 "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYAZ9hjQ.woff2"
# Download Lora woff2 files
curl -L -o public/fonts/lora-regular.woff2 "https://fonts.gstatic.com/s/lora/v35/0QI6MX1D_JOuGQbT0gvTJPa787weuxJBkq0.woff2"
curl -L -o public/fonts/lora-italic.woff2 "https://fonts.gstatic.com/s/lora/v35/0QI8MX1D_JOuMw_hLdO6T2wV9KnW-MoFkqh8ndeZzZ0.woff2"
curl -L -o public/fonts/lora-bold.woff2 "https://fonts.gstatic.com/s/lora/v35/0QI6MX1D_JOuGQbT0gvTJPa787z5vBJBkq0.woff2"
```

If curl fails (URLs may change), manually download Inter (400, 600, 700) and Lora (400, 400i, 700) in woff2 from Google Fonts and place in `public/fonts/`.

- [ ] **Step 8: Verify scaffold builds**

```bash
npx astro build
```

Expected: Build completes with no errors. Output in `dist/`.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: scaffold Astro project with Tailwind, fonts, and config"
```

---

### Task 2: Base Layout + SEOHead + CookieConsent

**Files:**
- Create: `src/components/SEOHead.astro`
- Create: `src/components/CookieConsent.astro`
- Create: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Write build verification test**

Create `tests/build.test.js`:

```js
import { readFileSync, existsSync } from 'fs';
import { describe, it, before } from 'node:test';
import assert from 'node:assert';
import { spawnSync } from 'child_process';

describe('Build output', () => {
  before(() => {
    const result = spawnSync('npx', ['astro', 'build'], { stdio: 'pipe' });
    if (result.status !== 0) {
      throw new Error(`Build failed: ${result.stderr?.toString()}`);
    }
  });

  it('generates index.html', () => {
    assert.ok(existsSync('dist/index.html'));
  });

  it('index.html contains meta description', () => {
    const html = readFileSync('dist/index.html', 'utf-8');
    assert.ok(html.includes('<meta name="description"'));
  });

  it('index.html contains og:title', () => {
    const html = readFileSync('dist/index.html', 'utf-8');
    assert.ok(html.includes('og:title'));
  });

  it('index.html contains skip-to-content link', () => {
    const html = readFileSync('dist/index.html', 'utf-8');
    assert.ok(html.includes('skip-to-content'));
  });

  it('index.html contains cookie consent', () => {
    const html = readFileSync('dist/index.html', 'utf-8');
    assert.ok(html.includes('cookie-consent'));
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
node --test tests/build.test.js
```

Expected: FAIL — `dist/index.html` does not exist or lacks expected content.

- [ ] **Step 3: Create SEOHead.astro**

Create `src/components/SEOHead.astro`:

```astro
---
interface Props {
  title: string;
  description: string;
  ogImage?: string;
  url: string;
  type?: string;
  jsonLd?: Record<string, unknown>;
}

const {
  title,
  description,
  ogImage = '/images/og-default.png',
  url,
  type = 'website',
  jsonLd,
} = Astro.props;

const canonicalURL = new URL(url, Astro.site);
const ogImageURL = new URL(ogImage, Astro.site);
---

<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="canonical" href={canonicalURL} />

<title>{title}</title>
<meta name="description" content={description} />

<!-- OpenGraph -->
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImageURL} />
<meta property="og:url" content={canonicalURL} />
<meta property="og:type" content={type} />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImageURL} />

{jsonLd && (
  <script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />
)}
```

- [ ] **Step 4: Create CookieConsent.astro**

Create `src/components/CookieConsent.astro`:

```astro
---
interface Props {
  gaId?: string;
}

const { gaId = 'G-XXXXXXXXXX' } = Astro.props;
---

<div
  id="cookie-consent"
  class="fixed bottom-0 left-0 right-0 z-50 bg-navy text-white p-4 shadow-lg transition-transform translate-y-full"
  role="alert"
  aria-live="polite"
>
  <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
    <p class="text-sm">
      This site uses cookies for analytics to improve your experience.
    </p>
    <div class="flex gap-3">
      <button
        id="cookie-decline"
        class="px-4 py-2 text-sm border border-white/30 rounded hover:bg-white/10 transition-colors"
      >
        Decline
      </button>
      <button
        id="cookie-accept"
        class="px-4 py-2 text-sm bg-amber rounded hover:bg-amber-light transition-colors text-navy font-semibold"
      >
        Accept
      </button>
    </div>
  </div>
</div>

<script define:vars={{ gaId }}>
  (function () {
    const CONSENT_KEY = 'cookie_consent';
    const consent = localStorage.getItem(CONSENT_KEY);
    const banner = document.getElementById('cookie-consent');

    function loadGA() {
      if (document.getElementById('ga-script')) return;
      const script = document.createElement('script');
      script.id = 'ga-script';
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=' + gaId;
      document.head.appendChild(script);
      script.onload = function () {
        window.dataLayer = window.dataLayer || [];
        function gtag() { window.dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', gaId);
      };
    }

    if (consent === 'granted') {
      loadGA();
    } else if (consent === null) {
      banner.classList.remove('translate-y-full');
    }

    document.getElementById('cookie-accept').addEventListener('click', function () {
      localStorage.setItem(CONSENT_KEY, 'granted');
      banner.classList.add('translate-y-full');
      loadGA();
    });

    document.getElementById('cookie-decline').addEventListener('click', function () {
      localStorage.setItem(CONSENT_KEY, 'denied');
      banner.classList.add('translate-y-full');
    });
  })();
</script>
```

- [ ] **Step 5: Create BaseLayout.astro**

Create `src/layouts/BaseLayout.astro`:

```astro
---
import SEOHead from '../components/SEOHead.astro';
import CookieConsent from '../components/CookieConsent.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description: string;
  ogImage?: string;
  url: string;
  jsonLd?: Record<string, unknown>;
}

const { title, description, ogImage, url, jsonLd } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <SEOHead
      title={title}
      description={description}
      ogImage={ogImage}
      url={url}
      jsonLd={jsonLd}
    />
  </head>
  <body>
    <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-amber focus:text-navy focus:px-4 focus:py-2 focus:rounded" id="skip-to-content">
      Skip to content
    </a>

    <!-- Header will be added in Task 3 -->

    <main id="main-content">
      <slot />
    </main>

    <!-- Footer will be added in Task 4 -->

    <CookieConsent />
  </body>
</html>
```

- [ ] **Step 6: Create minimal index.astro**

Create `src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Stefan Papp',
  url: 'https://stefanpapp.com',
  jobTitle: 'AI-Augmented Engineering Leader',
  description: 'Engineering leader, investor, and independent thinker bridging idealism and pragmatism.',
};
---

<BaseLayout
  title="Stefan Papp — AI-Augmented Engineering & Thought Leadership"
  description="Engineering leader, investor, and independent thinker. AI-augmented engineering, data transformations, and a worldview that bridges idealism and pragmatism."
  url="/"
  jsonLd={jsonLd}
>
  <section class="min-h-screen flex items-center justify-center">
    <p class="text-2xl text-navy">Landing page content coming soon.</p>
  </section>
</BaseLayout>
```

- [ ] **Step 7: Run test to verify it passes**

```bash
node --test tests/build.test.js
```

Expected: All 5 tests PASS.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add BaseLayout, SEOHead, CookieConsent, and build tests"
```

---

### Task 3: Header Component

**Files:**
- Create: `src/components/Header.astro`
- Modify: `src/layouts/BaseLayout.astro` (add Header import)

- [ ] **Step 1: Add build test for header**

Append to `tests/build.test.js`:

```js
  it('index.html contains nav element', () => {
    const html = readFileSync('dist/index.html', 'utf-8');
    assert.ok(html.includes('<nav'));
  });

  it('index.html contains all nav links', () => {
    const html = readFileSync('dist/index.html', 'utf-8');
    assert.ok(html.includes('/ai-engineering'));
    assert.ok(html.includes('/worldview'));
    assert.ok(html.includes('/contact'));
  });
```

- [ ] **Step 2: Run test to verify it fails**

```bash
node --test tests/build.test.js
```

Expected: New nav tests FAIL.

- [ ] **Step 3: Create Header.astro**

Create `src/components/Header.astro`:

```astro
---
const currentPath = Astro.url.pathname;

const navLinks = [
  { label: 'AI Engineering', href: '/ai-engineering' },
  { label: 'Data Transformations', href: '/data-transformations' },
  { label: 'Worldview', href: '/worldview' },
  { label: 'Leadership', href: '/leadership' },
  { label: 'Investments', href: '/investments' },
  { label: 'Contact', href: '/contact' },
];
---

<header id="site-header" class="fixed top-0 left-0 right-0 z-40 transition-colors duration-300">
  <div class="max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
    <a href="/" class="font-sans font-bold text-xl text-white hover:text-amber transition-colors">
      Stefan Papp
    </a>

    <!-- Desktop nav -->
    <nav class="hidden md:flex items-center gap-6" aria-label="Main navigation">
      {navLinks.map(({ label, href }) => (
        <a
          href={href}
          class:list={[
            'text-sm font-sans transition-colors',
            currentPath === href || currentPath === href + '/'
              ? 'text-amber'
              : 'text-white/80 hover:text-white',
          ]}
        >
          {label}
        </a>
      ))}
    </nav>

    <!-- Mobile hamburger -->
    <button
      id="mobile-menu-toggle"
      class="md:hidden text-white p-2"
      aria-label="Toggle menu"
      aria-expanded="false"
      aria-controls="mobile-menu"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path id="hamburger-icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        <path id="close-icon" class="hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>

  <!-- Mobile menu -->
  <nav
    id="mobile-menu"
    class="md:hidden hidden bg-navy border-t border-white/10"
    aria-label="Mobile navigation"
  >
    <div class="px-4 py-4 flex flex-col gap-3">
      {navLinks.map(({ label, href }) => (
        <a
          href={href}
          class:list={[
            'text-base font-sans py-2 transition-colors',
            currentPath === href || currentPath === href + '/'
              ? 'text-amber'
              : 'text-white/80 hover:text-white',
          ]}
        >
          {label}
        </a>
      ))}
    </div>
  </nav>
</header>

<!-- Sentinel element for IntersectionObserver -->
<div id="header-sentinel" class="absolute top-0 h-1 w-full"></div>

<script>
  (function () {
    var header = document.getElementById('site-header');
    var sentinel = document.getElementById('header-sentinel');
    var toggle = document.getElementById('mobile-menu-toggle');
    var menu = document.getElementById('mobile-menu');
    var hamburger = document.getElementById('hamburger-icon');
    var closeIcon = document.getElementById('close-icon');

    // Scroll-based background transition
    if (sentinel && header) {
      var observer = new IntersectionObserver(
        function (entries) {
          if (entries[0].isIntersecting) {
            header.classList.remove('bg-navy', 'shadow-lg');
          } else {
            header.classList.add('bg-navy', 'shadow-lg');
          }
        },
        { threshold: 0 }
      );
      observer.observe(sentinel);
    }

    // Mobile menu toggle
    if (toggle && menu && hamburger && closeIcon) {
      toggle.addEventListener('click', function () {
        var isOpen = !menu.classList.contains('hidden');
        menu.classList.toggle('hidden');
        hamburger.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
        toggle.setAttribute('aria-expanded', String(!isOpen));
      });
    }
  })();
</script>
```

- [ ] **Step 4: Add Header to BaseLayout**

In `src/layouts/BaseLayout.astro`, add the import and insert Header before `<main>`:

Add import:
```js
import Header from '../components/Header.astro';
```

Replace `<!-- Header will be added in Task 3 -->` with:
```astro
<Header />
```

- [ ] **Step 5: Run test to verify it passes**

```bash
node --test tests/build.test.js
```

Expected: All tests PASS including new nav tests.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add Header component with mobile menu and scroll transition"
```

---

### Task 4: Footer Component

**Files:**
- Create: `src/components/Footer.astro`
- Modify: `src/layouts/BaseLayout.astro` (add Footer import)

- [ ] **Step 1: Add build test for footer**

Append to `tests/build.test.js`:

```js
  it('index.html contains footer element', () => {
    const html = readFileSync('dist/index.html', 'utf-8');
    assert.ok(html.includes('<footer'));
  });

  it('index.html contains social links', () => {
    const html = readFileSync('dist/index.html', 'utf-8');
    assert.ok(html.includes('linkedin'));
    assert.ok(html.includes('github'));
  });
```

- [ ] **Step 2: Run test to verify it fails**

```bash
node --test tests/build.test.js
```

Expected: New footer tests FAIL.

- [ ] **Step 3: Create Footer.astro**

Create `src/components/Footer.astro`:

```astro
---
const currentYear = new Date().getFullYear();

const navLinks = [
  { label: 'AI Engineering', href: '/ai-engineering' },
  { label: 'Data Transformations', href: '/data-transformations' },
  { label: 'Worldview', href: '/worldview' },
  { label: 'Leadership', href: '/leadership' },
  { label: 'Investments', href: '/investments' },
  { label: 'Contact', href: '/contact' },
];

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/stefanpapp',
    icon: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  },
  {
    label: 'X / Twitter',
    href: 'https://x.com/stefanpapp',
    icon: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/stefanpapp',
    icon: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
  },
];
---

<footer class="bg-navy text-cream">
  <div class="max-w-6xl mx-auto px-4 md:px-8 py-12">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Nav links -->
      <div>
        <h3 class="font-sans font-semibold text-white mb-4">Pages</h3>
        <nav aria-label="Footer navigation" class="flex flex-col gap-2">
          {navLinks.map(({ label, href }) => (
            <a href={href} class="text-sm text-cream/70 hover:text-white transition-colors">
              {label}
            </a>
          ))}
        </nav>
      </div>

      <!-- Social -->
      <div>
        <h3 class="font-sans font-semibold text-white mb-4">Connect</h3>
        <div class="flex gap-4">
          {socialLinks.map(({ label, href, icon }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              class="text-cream/70 hover:text-white transition-colors"
            >
              <Fragment set:html={icon} />
            </a>
          ))}
        </div>
      </div>

      <!-- Copyright -->
      <div>
        <h3 class="font-sans font-semibold text-white mb-4">Stefan Papp</h3>
        <p class="text-sm text-cream/70">
          Engineering leader, investor, and independent thinker.
        </p>
        <p class="text-sm text-cream/50 mt-4">
          &copy; {currentYear} Stefan Papp. All rights reserved.
        </p>
      </div>
    </div>
  </div>
</footer>
```

- [ ] **Step 4: Add Footer to BaseLayout**

In `src/layouts/BaseLayout.astro`, add import:
```js
import Footer from '../components/Footer.astro';
```

Replace `<!-- Footer will be added in Task 4 -->` with:
```astro
<Footer />
```

- [ ] **Step 5: Run test to verify it passes**

```bash
node --test tests/build.test.js
```

Expected: All tests PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add Footer component with social links and nav"
```

---

### Task 5: Landing Page Components (HeroSplit, SocialProof, FeaturedContent)

**Files:**
- Create: `src/components/HeroSplit.astro`
- Create: `src/components/SocialProof.astro`
- Create: `src/components/FeaturedContent.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Add build tests for landing page**

Append to `tests/build.test.js`:

```js
  it('index.html contains hero split section', () => {
    const html = readFileSync('dist/index.html', 'utf-8');
    assert.ok(html.includes('hero-split'));
  });

  it('index.html contains both CTAs', () => {
    const html = readFileSync('dist/index.html', 'utf-8');
    assert.ok(html.includes('Read my thinking'));
    assert.ok(html.includes('Work with me'));
  });

  it('index.html contains social proof section', () => {
    const html = readFileSync('dist/index.html', 'utf-8');
    assert.ok(html.includes('social-proof'));
  });
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
node --test tests/build.test.js
```

Expected: New landing page tests FAIL.

- [ ] **Step 3: Create HeroSplit.astro**

Create `src/components/HeroSplit.astro`:

```astro
---
interface Props {
  leftHeadline: string;
  leftSubtext: string;
  leftCta: { label: string; href: string };
  rightHeadline: string;
  rightSubtext: string;
  rightCta: { label: string; href: string };
  headshotSrc?: string;
}

const {
  leftHeadline,
  leftSubtext,
  leftCta,
  rightHeadline,
  rightSubtext,
  rightCta,
  headshotSrc,
} = Astro.props;
---

<section id="hero-split" class="min-h-screen grid grid-cols-1 md:grid-cols-2">
  <!-- Professional side (shown first on mobile) -->
  <div class="bg-white flex flex-col justify-center px-8 md:px-12 lg:px-16 py-20 md:py-0 order-1 md:order-2">
    <div class="max-w-lg">
      <h1 class="font-sans font-bold text-4xl lg:text-6xl text-navy mb-6">
        {rightHeadline}
      </h1>
      <p class="font-sans text-slate text-lg mb-8 leading-relaxed">
        {rightSubtext}
      </p>
      <a
        href={rightCta.href}
        class="inline-block bg-amber text-navy font-sans font-semibold px-8 py-3 rounded hover:bg-amber-light transition-colors"
      >
        {rightCta.label}
      </a>
      {headshotSrc && (
        <div class="mt-10">
          <img
            src={headshotSrc}
            alt="Stefan Papp"
            width={300}
            height={300}
            class="rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  </div>

  <!-- Idealistic side -->
  <div class="bg-cream flex flex-col justify-center px-8 md:px-12 lg:px-16 py-20 md:py-0 order-2 md:order-1 relative">
    <!-- Decorative amber line -->
    <div class="absolute top-0 left-0 w-1 h-full bg-amber hidden md:block"></div>
    <div class="max-w-lg">
      <h2 class="font-serif font-bold text-4xl lg:text-6xl text-navy mb-6">
        {leftHeadline}
      </h2>
      <p class="font-serif text-slate text-lg mb-8 leading-relaxed italic">
        {leftSubtext}
      </p>
      <a
        href={leftCta.href}
        class="inline-block border-2 border-amber text-amber font-sans font-semibold px-8 py-3 rounded hover:bg-amber hover:text-navy transition-colors"
      >
        {leftCta.label}
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Create SocialProof.astro**

Create `src/components/SocialProof.astro`:

```astro
---
interface Props {
  items: { label: string; value: string }[];
}

const { items } = Astro.props;
---

<section id="social-proof" class="bg-cream-dark py-12">
  <div class="max-w-6xl mx-auto px-4 md:px-8">
    <div class="flex flex-wrap justify-center gap-8 md:gap-16">
      {items.map(({ label, value }) => (
        <div class="text-center">
          <p class="font-sans font-bold text-2xl md:text-3xl text-navy">{value}</p>
          <p class="font-sans text-sm text-slate mt-1">{label}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 5: Create FeaturedContent.astro**

Create `src/components/FeaturedContent.astro`:

```astro
---
interface Props {
  cards: {
    title: string;
    description: string;
    href: string;
    variant: 'idealistic' | 'professional';
  }[];
}

const { cards } = Astro.props;
---

<section class="py-16 md:py-24">
  <div class="max-w-6xl mx-auto px-4 md:px-8">
    <h2 class="font-sans font-bold text-3xl lg:text-4xl text-navy text-center mb-12">
      Explore
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {cards.map(({ title, description, href, variant }) => (
        <a
          href={href}
          class:list={[
            'group block rounded-lg p-8 transition-shadow hover:shadow-lg',
            variant === 'idealistic'
              ? 'bg-cream border border-cream-dark'
              : 'bg-white border border-gray-100',
          ]}
        >
          <h3
            class:list={[
              'font-bold text-xl mb-3 group-hover:text-amber transition-colors',
              variant === 'idealistic' ? 'font-serif' : 'font-sans',
            ]}
          >
            {title}
          </h3>
          <p
            class:list={[
              'text-slate leading-relaxed',
              variant === 'idealistic' ? 'font-serif' : 'font-sans',
            ]}
          >
            {description}
          </p>
        </a>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 6: Assemble the landing page**

Replace `src/pages/index.astro` with:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import HeroSplit from '../components/HeroSplit.astro';
import SocialProof from '../components/SocialProof.astro';
import FeaturedContent from '../components/FeaturedContent.astro';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Stefan Papp',
  url: 'https://stefanpapp.com',
  jobTitle: 'AI-Augmented Engineering Leader',
  description: 'Engineering leader, investor, and independent thinker bridging idealism and pragmatism.',
};

const socialProofItems = [
  { value: '15+', label: 'Years in Engineering Leadership' },
  { value: '50+', label: 'Engineers Led' },
  { value: '10+', label: 'Companies Advised' },
  { value: '8+', label: 'Angel Investments' },
];

const featuredCards = [
  {
    title: 'AI-Augmented Engineering',
    description: 'How I help companies integrate AI into their engineering workflows to ship faster and smarter.',
    href: '/ai-engineering',
    variant: 'professional' as const,
  },
  {
    title: 'What I Believe',
    description: 'On libertarianism, growth culture, and why cats are the ideal cultural archetype.',
    href: '/worldview',
    variant: 'idealistic' as const,
  },
  {
    title: 'Data Transformations',
    description: 'ETL pipelines, data migration, and architecture consulting for growing companies.',
    href: '/data-transformations',
    variant: 'professional' as const,
  },
  {
    title: 'Investment Philosophy',
    description: 'How I pick companies, what I look for, and my portfolio track record.',
    href: '/investments',
    variant: 'idealistic' as const,
  },
];
---

<BaseLayout
  title="Stefan Papp — AI-Augmented Engineering & Thought Leadership"
  description="Engineering leader, investor, and independent thinker. AI-augmented engineering, data transformations, and a worldview that bridges idealism and pragmatism."
  url="/"
  jsonLd={jsonLd}
>
  <HeroSplit
    leftHeadline="Ideas shape the world."
    leftSubtext="On liberty, growth, and why independent thinking matters more than ever. A worldview grounded in reason, not convention."
    leftCta={{ label: 'Read my thinking', href: '/worldview' }}
    rightHeadline="I build what's next."
    rightSubtext="AI-augmented engineering leader helping companies ship faster with smarter tools. 15+ years building and leading high-performance engineering teams."
    rightCta={{ label: 'Work with me', href: '/contact' }}
  />

  <SocialProof items={socialProofItems} />

  <FeaturedContent cards={featuredCards} />

  <!-- CTA Band -->
  <section class="bg-navy py-16 md:py-24">
    <div class="max-w-6xl mx-auto px-4 md:px-8 text-center">
      <h2 class="font-sans font-bold text-3xl lg:text-4xl text-white mb-6">
        Let's talk.
      </h2>
      <p class="font-sans text-cream/70 text-lg mb-8 max-w-2xl mx-auto">
        Whether you need help with AI engineering, want to discuss an investment, or just want to exchange ideas.
      </p>
      <a
        href="/contact"
        class="inline-block bg-amber text-navy font-sans font-semibold px-8 py-3 rounded hover:bg-amber-light transition-colors"
      >
        Get in touch
      </a>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 7: Run tests to verify they pass**

```bash
node --test tests/build.test.js
```

Expected: All tests PASS.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add landing page with HeroSplit, SocialProof, and FeaturedContent"
```

---

### Task 6: ServiceBlock + CaseStudyCard Components

**Files:**
- Create: `src/components/ServiceBlock.astro`
- Create: `src/components/CaseStudyCard.astro`

- [ ] **Step 1: Create ServiceBlock.astro**

Create `src/components/ServiceBlock.astro`:

```astro
---
interface Props {
  title: string;
  description: string;
  icon: string;
}

const { title, description, icon } = Astro.props;
---

<div class="bg-white rounded-lg p-8 border border-gray-100 hover:shadow-lg transition-shadow">
  <div class="text-amber mb-4">
    <Fragment set:html={icon} />
  </div>
  <h3 class="font-sans font-semibold text-xl text-navy mb-3">{title}</h3>
  <p class="font-sans text-slate leading-relaxed">{description}</p>
</div>
```

- [ ] **Step 2: Create CaseStudyCard.astro**

Create `src/components/CaseStudyCard.astro`:

```astro
---
interface Props {
  title: string;
  challenge: string;
  approach: string;
  outcome: string;
}

const { title, challenge, approach, outcome } = Astro.props;
---

<div class="bg-white rounded-lg p-8 border border-gray-100">
  <h3 class="font-sans font-bold text-xl text-navy mb-6">{title}</h3>
  <div class="space-y-4">
    <div>
      <h4 class="font-sans font-semibold text-sm text-amber uppercase tracking-wide mb-1">Challenge</h4>
      <p class="font-sans text-slate leading-relaxed">{challenge}</p>
    </div>
    <div>
      <h4 class="font-sans font-semibold text-sm text-amber uppercase tracking-wide mb-1">Approach</h4>
      <p class="font-sans text-slate leading-relaxed">{approach}</p>
    </div>
    <div>
      <h4 class="font-sans font-semibold text-sm text-amber uppercase tracking-wide mb-1">Outcome</h4>
      <p class="font-sans text-slate leading-relaxed">{outcome}</p>
    </div>
  </div>
</div>
```

- [ ] **Step 3: Build to verify components compile**

```bash
npx astro build
```

Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add ServiceBlock and CaseStudyCard components"
```

---

### Task 7: AI Engineering Page

**Files:**
- Create: `src/pages/ai-engineering.astro`
- Test: `tests/build.test.js` (append)

- [ ] **Step 1: Add build test**

Append to `tests/build.test.js`:

```js
  it('generates ai-engineering page', () => {
    assert.ok(existsSync('dist/ai-engineering/index.html'));
  });

  it('ai-engineering contains service blocks', () => {
    const html = readFileSync('dist/ai-engineering/index.html', 'utf-8');
    assert.ok(html.includes('Consulting'));
    assert.ok(html.includes('Integration'));
    assert.ok(html.includes('Training'));
  });
```

- [ ] **Step 2: Run test to verify it fails**

```bash
node --test tests/build.test.js
```

Expected: New tests FAIL.

- [ ] **Step 3: Create ai-engineering.astro**

Create `src/pages/ai-engineering.astro` with:
- Hero banner (navy background, page title, one-line description)
- "What is AI Augmented Engineering" section (2-3 paragraphs)
- Services grid: 3 `ServiceBlock` cards (Consulting, Integration, Training) with SVG icons
- Case studies: 2 `CaseStudyCard` components with placeholder content
- Bottom CTA linking to `/contact`
- `ProfessionalService` JSON-LD schema

See spec sections 5.2 and Component Interfaces for exact props and content structure. Use the same layout patterns as the landing page (max-w-6xl container, py-16 md:py-24 section padding, bg-cream-dark for alternating sections).

- [ ] **Step 4: Run tests to verify they pass**

```bash
node --test tests/build.test.js
```

Expected: All tests PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add AI Engineering page with services and case studies"
```

---

### Task 8: Data Transformations Page

**Files:**
- Create: `src/pages/data-transformations.astro`
- Test: `tests/build.test.js` (append)

- [ ] **Step 1: Add build test**

Append to `tests/build.test.js`:

```js
  it('generates data-transformations page', () => {
    assert.ok(existsSync('dist/data-transformations/index.html'));
  });
```

- [ ] **Step 2: Run test to verify it fails**

```bash
node --test tests/build.test.js
```

Expected: FAIL.

- [ ] **Step 3: Create data-transformations.astro**

Create `src/pages/data-transformations.astro` with same structure as AI Engineering page:
- Hero banner with page title
- "Data That Works For You" intro section
- Services grid: 3 `ServiceBlock` cards (ETL Pipelines, Data Migration, Data Architecture) with SVG icons
- Case studies: 2 `CaseStudyCard` components with placeholder content
- Bottom CTA linking to `/contact`
- `ProfessionalService` JSON-LD schema

- [ ] **Step 4: Run tests**

```bash
node --test tests/build.test.js
```

Expected: All tests PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Data Transformations page"
```

---

### Task 9: Accordion Component + Worldview Page

**Files:**
- Create: `src/components/Accordion.astro`
- Create: `src/pages/worldview.astro`
- Test: `tests/build.test.js` (append)

- [ ] **Step 1: Add build tests**

Append to `tests/build.test.js`:

```js
  it('generates worldview page', () => {
    assert.ok(existsSync('dist/worldview/index.html'));
  });

  it('worldview contains accordion sections', () => {
    const html = readFileSync('dist/worldview/index.html', 'utf-8');
    assert.ok(html.includes('libertarianism'));
    assert.ok(html.includes('growth-culture'));
    assert.ok(html.includes('cats'));
    assert.ok(html.includes('aria-expanded'));
  });
```

- [ ] **Step 2: Run test to verify it fails**

```bash
node --test tests/build.test.js
```

Expected: FAIL.

- [ ] **Step 3: Create Accordion.astro**

Create `src/components/Accordion.astro`:

```astro
---
interface Props {
  title: string;
  id: string;
  defaultOpen?: boolean;
}

const { title, id, defaultOpen = false } = Astro.props;
---

<div class="accordion-item border-b border-cream-dark" id={id}>
  <button
    class="accordion-trigger w-full flex items-center justify-between py-6 text-left group"
    aria-expanded={String(defaultOpen)}
    aria-controls={`${id}-content`}
  >
    <h3 class="font-serif font-bold text-xl lg:text-2xl text-navy group-hover:text-amber transition-colors">
      {title}
    </h3>
    <svg
      class:list={[
        'accordion-icon w-6 h-6 text-amber transition-transform flex-shrink-0 ml-4',
        defaultOpen && 'rotate-180',
      ]}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  <div
    id={`${id}-content`}
    class:list={['accordion-content overflow-hidden', !defaultOpen && 'hidden']}
    role="region"
    aria-labelledby={id}
  >
    <div class="pb-8 font-serif text-slate leading-relaxed space-y-4">
      <slot />
    </div>
  </div>
</div>

<script>
  document.querySelectorAll('.accordion-trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var expanded = trigger.getAttribute('aria-expanded') === 'true';
      var contentId = trigger.getAttribute('aria-controls');
      var content = document.getElementById(contentId);
      var icon = trigger.querySelector('.accordion-icon');

      trigger.setAttribute('aria-expanded', String(!expanded));
      if (content) content.classList.toggle('hidden');
      if (icon) icon.classList.toggle('rotate-180');
    });
  });

  // Anchor link support: scroll to and expand section
  function handleAnchorNav() {
    var hash = window.location.hash.slice(1);
    if (!hash) return;
    var target = document.getElementById(hash);
    if (!target || !target.classList.contains('accordion-item')) return;

    var trigger = target.querySelector('.accordion-trigger');
    var isExpanded = trigger && trigger.getAttribute('aria-expanded') === 'true';
    if (!isExpanded && trigger) {
      trigger.click();
    }
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  handleAnchorNav();
  window.addEventListener('hashchange', handleAnchorNav);
</script>
```

- [ ] **Step 4: Create worldview.astro**

Create `src/pages/worldview.astro` with:
- Hero banner (cream background, Lora serif, "What I Believe")
- Sticky anchor nav with three pill-style links (Libertarianism, Growth Culture, Cats as Cultural Archetype)
- Three `Accordion` sections with `id="libertarianism"`, `id="growth-culture"`, `id="cats"`
- First section `defaultOpen={true}`, others default closed
- Each section contains 800-1200 word essay placeholder content
- Content tone: philosophical, reasoned, not political rant (per spec)

See spec section 5.3 for content direction and tone.

- [ ] **Step 5: Run tests**

```bash
node --test tests/build.test.js
```

Expected: All tests PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add Accordion component and Worldview page with three essays"
```

---

### Task 10: Leadership Page

**Files:**
- Create: `src/pages/leadership.astro`
- Test: `tests/build.test.js` (append)

- [ ] **Step 1: Add build test**

Append to `tests/build.test.js`:

```js
  it('generates leadership page', () => {
    assert.ok(existsSync('dist/leadership/index.html'));
  });
```

- [ ] **Step 2: Run test to verify it fails**

```bash
node --test tests/build.test.js
```

- [ ] **Step 3: Create leadership.astro**

Create `src/pages/leadership.astro` with:
- Hero banner (navy background)
- Philosophy section: 2-3 paragraphs on leadership approach
- Track record: card grid layout (one card per role with title, org, outcome, timeframe) — use 3-4 placeholder entries
- Testimonials: styled blockquotes with left amber border accent, attribution name + role below — use 2 placeholder quotes

See spec section 5.4 for content direction.

- [ ] **Step 4: Run tests**

```bash
node --test tests/build.test.js
```

Expected: All tests PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Leadership page with track record and testimonials"
```

---

### Task 11: Investments Page

**Files:**
- Create: `src/pages/investments.astro`
- Test: `tests/build.test.js` (append)

- [ ] **Step 1: Add build test**

Append to `tests/build.test.js`:

```js
  it('generates investments page', () => {
    assert.ok(existsSync('dist/investments/index.html'));
  });

  it('investments page contains disclaimer', () => {
    const html = readFileSync('dist/investments/index.html', 'utf-8');
    assert.ok(html.includes('Past performance'));
  });
```

- [ ] **Step 2: Run test to verify it fails**

```bash
node --test tests/build.test.js
```

- [ ] **Step 3: Create investments.astro**

Create `src/pages/investments.astro` with:
- Hero banner (navy background)
- Philosophy section: investment thesis and criteria (2-3 paragraphs)
- Metrics strip: total investments, realized exits, avg return, active portfolio
- Portfolio grid: 6 placeholder company cards (name, description, invested date, status, return note)
- Disclaimer text at bottom: "Past performance is not indicative of future results..."

See spec section 5.6 for content direction.

- [ ] **Step 4: Run tests**

```bash
node --test tests/build.test.js
```

Expected: All tests PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Investments page with portfolio grid and disclaimer"
```

---

### Task 12: ContactForm Component + Contact Page

**Files:**
- Create: `src/components/ContactForm.astro`
- Create: `src/pages/contact.astro`
- Test: `tests/build.test.js` (append)

- [ ] **Step 1: Add build tests**

Append to `tests/build.test.js`:

```js
  it('generates contact page', () => {
    assert.ok(existsSync('dist/contact/index.html'));
  });

  it('contact page contains form with required fields', () => {
    const html = readFileSync('dist/contact/index.html', 'utf-8');
    assert.ok(html.includes('<form'));
    assert.ok(html.includes('formspree'));
    assert.ok(html.includes('name="name"'));
    assert.ok(html.includes('name="email"'));
  });
```

- [ ] **Step 2: Run test to verify it fails**

```bash
node --test tests/build.test.js
```

- [ ] **Step 3: Create ContactForm.astro**

Create `src/components/ContactForm.astro` with props `{ formspreeId: string }`:
- Form with `action="https://formspree.io/f/${formspreeId}"` and `method="POST"`
- Fields: Name (required, minlength 2), Email (required, type email), Reason (required select), Message (optional textarea, maxlength 2000)
- Honeypot field (`name="_gotcha"`, hidden)
- Character count display for message field
- HTML5 validation attributes + JS-enhanced inline errors (`.form-error` elements with `aria-live="polite"`)
- AJAX submission: button shows "Sending..." disabled state, success replaces form with green confirmation, error shows red banner
- Validate on blur and on submit

See spec section 5.7 and Component Interfaces for exact behavior.

- [ ] **Step 4: Create contact.astro**

Create `src/pages/contact.astro` with:
- Hero banner (navy background)
- Two-column layout (md breakpoint): ContactForm left, info right
- Right column: "What to expect" text, social links (LinkedIn, X/Twitter, GitHub), calendar booking placeholder
- Pass `formspreeId="YOUR_FORMSPREE_ID"` — to be replaced with real ID at deploy time

- [ ] **Step 5: Run tests**

```bash
node --test tests/build.test.js
```

Expected: All tests PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add ContactForm component and Contact page"
```

---

### Task 13: 404 Page

**Files:**
- Create: `src/pages/404.astro`
- Test: `tests/build.test.js` (append)

- [ ] **Step 1: Add build test**

Append to `tests/build.test.js`:

```js
  it('generates 404 page', () => {
    assert.ok(existsSync('dist/404.html'));
  });
```

- [ ] **Step 2: Run test to verify it fails**

```bash
node --test tests/build.test.js
```

- [ ] **Step 3: Create 404.astro**

Create `src/pages/404.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  title="Page Not Found — Stefan Papp"
  description="The page you're looking for doesn't exist."
  url="/404"
>
  <section class="bg-navy min-h-[70vh] flex items-center justify-center pt-16">
    <div class="text-center px-4">
      <p class="font-sans text-8xl font-bold text-amber mb-4">404</p>
      <h1 class="font-sans font-bold text-3xl text-white mb-4">Page not found</h1>
      <p class="font-sans text-cream/70 text-lg mb-8 max-w-md mx-auto">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        class="inline-block bg-amber text-navy font-sans font-semibold px-8 py-3 rounded hover:bg-amber-light transition-colors"
      >
        Back to home
      </a>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 4: Run tests**

```bash
node --test tests/build.test.js
```

Expected: All tests PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add custom 404 page"
```

---

### Task 14: E2E Tests with Playwright

**Files:**
- Create: `playwright.config.js`
- Create: `tests/e2e/navigation.spec.js`
- Create: `tests/e2e/accordion.spec.js`
- Create: `tests/e2e/contact-form.spec.js`
- Create: `tests/e2e/cookie-consent.spec.js`

- [ ] **Step 1: Install Playwright browsers**

```bash
npx playwright install chromium
```

- [ ] **Step 2: Create playwright.config.js**

Create `playwright.config.js`:

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  webServer: {
    command: 'npx astro preview --port 4321',
    port: 4321,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:4321',
  },
});
```

- [ ] **Step 3: Create navigation.spec.js**

Create `tests/e2e/navigation.spec.js` testing:
- All nav links are present and visible
- Nav links navigate to correct pages
- Logo links back to home
- Mobile menu toggle opens/closes the menu (at 375px viewport)

- [ ] **Step 4: Create accordion.spec.js**

Create `tests/e2e/accordion.spec.js` testing:
- First section expanded by default (`aria-expanded="true"`)
- Other sections collapsed by default (`aria-expanded="false"`)
- Clicking a collapsed section expands it
- Anchor nav (`/worldview/#cats`) expands the target section

- [ ] **Step 5: Create contact-form.spec.js**

Create `tests/e2e/contact-form.spec.js` testing:
- All form fields are present
- Validation shows errors on empty submit
- Character count updates when typing in message field

- [ ] **Step 6: Create cookie-consent.spec.js**

Create `tests/e2e/cookie-consent.spec.js` testing:
- Banner appears on first visit
- Accepting hides banner and sets `cookie_consent=granted` in localStorage
- Declining hides banner and sets `cookie_consent=denied` in localStorage
- Banner does not appear on return visit after accepting

- [ ] **Step 7: Build and run e2e tests**

```bash
npx astro build && npx playwright test
```

Expected: All e2e tests PASS.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add Playwright e2e tests for nav, accordion, form, and consent"
```

---

### Task 15: Final Verification + Placeholder Images + npm Scripts

**Files:**
- Create: `public/images/og-default.png`
- Create: `public/images/headshot-placeholder.jpg`
- Modify: `package.json` (add scripts)

- [ ] **Step 1: Create placeholder images**

Create simple placeholder images. If ImageMagick is available:

```bash
convert -size 1200x630 xc:'#1a2332' -fill '#c8933e' -gravity center -pointsize 48 -font Georgia -annotate 0 'Stefan Papp' public/images/og-default.png
convert -size 300x300 xc:'#e8e0d0' -fill '#64748b' -gravity center -pointsize 24 -annotate 0 'Photo' public/images/headshot-placeholder.jpg
```

Otherwise, create any 1200x630 PNG and 300x300 JPG manually and place in `public/images/`.

- [ ] **Step 2: Add npm scripts to package.json**

Add to `package.json` scripts:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "test": "node --test tests/build.test.js",
    "test:e2e": "npx playwright test",
    "check": "astro check"
  }
}
```

- [ ] **Step 3: Run full build**

```bash
npm run build
```

Expected: Build succeeds with zero errors. `dist/` contains all 7 pages + 404.

- [ ] **Step 4: Run all tests**

```bash
npm test && npm run test:e2e
```

Expected: All build tests and e2e tests PASS.

- [ ] **Step 5: Verify all pages generated**

```bash
ls dist/index.html dist/404.html dist/sitemap-index.xml
ls dist/ai-engineering/index.html
ls dist/data-transformations/index.html
ls dist/worldview/index.html
ls dist/leadership/index.html
ls dist/investments/index.html
ls dist/contact/index.html
```

Expected: All files exist.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: add placeholder images, npm scripts, and verify full build"
```
