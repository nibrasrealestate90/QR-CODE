# 3D Studio Dubai – Social Media Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium, modern, mobile-first social media landing page for 3D Studio Dubai optimized for QR code access from packaging, business cards, and event table displays, ready for Cloudflare Pages static deployment.

**Architecture:** Pure semantic HTML5 + modern modular CSS with design tokens, embedded crisp SVGs, and zero runtime JavaScript dependencies for instantaneous mobile loading. Includes Cloudflare Pages static configuration (`_headers`, `wrangler.toml`) and an automated Playwright test suite for link verification, mobile responsiveness, and accessibility QA.

**Tech Stack:** HTML5, CSS3 (Modern custom properties, fluid typography, CSS Grid/Flexbox), Node.js / Playwright (for automated QA & link verification), Cloudflare Pages.

**Spec:** Direct user requirements in current conversation.

## Global Constraints

- Background: White / off-white (`#F8F9FA` to `#FAFAFA`).
- Typography: Deep charcoal (`#111315` / `#18181B`).
- Aesthetics: Premium, minimal, contemporary, subtle 3D-inspired geometric accents, rounded cards and buttons. Avoid generic link-in-bio look and excessive animations.
- Brand Name: `3D Studio Dubai`.
- Exact Instagram URL: `https://www.instagram.com/3dstudio_dubai/`
- Exact Facebook URL: `https://www.facebook.com/profile.php?id=61596340364013`
- Exact WhatsApp URL: `https://wa.me/971504681889`
- WhatsApp button must be visually prominent.
- All social links must open in a new tab (`target="_blank"`) with `rel="noopener noreferrer"`.
- Zero backend, zero database, zero authentication, zero bloated dependencies.
- Cloudflare Pages static deployment ready.

## Review Focus

1. **Cellular Network Latency on QR Scan:** Mobile QR code scans on mobile networks must load in under 200ms with zero hydration blocking; verify zero external JS dependencies and preconnected/optimized asset loading.
2. **Strict URL Accuracy & Rel Attributes:** Ensure all external links match the exact URLs verbatim and have `rel="noopener noreferrer"` to prevent tab-nabbing vulnerabilities.
3. **Mobile Viewport Overflow & Touch Targets:** Validate 360px-430px mobile screen widths have minimum 48px touch targets, zero horizontal scrolling, and comfortable edge margins.
4. **WhatsApp Visual Distinction:** Ensure WhatsApp button has clear primary visual elevation and quick-inquiry treatment compared to secondary social links.
5. **Accessibility & Screen Reader Landmarks:** Validate semantic elements (`<header>`, `<main>`, `<nav>`, `<footer>`), ARIA attributes, color contrast (WCAG AAA), and visible focus states.

---

### Task 1: Project Setup & Brand Asset Pipeline

**Files:**
- Create: `assets/images/logo.png` (copied/optimized from `../3D PRINTING/public/logo.png`)
- Create: `assets/images/favicon.png`
- Create: `assets/images/og-image.png`
- Create: `package.json`
- Test: `tests/assets.test.js`

**Interfaces:**
- Consumes: `../3D PRINTING/public/logo.png`
- Produces: `assets/images/logo.png`, `assets/images/favicon.png`, `assets/images/og-image.png`

- [ ] **Step 1: Write test for asset presence and dimensions**

Create `tests/assets.test.js` checking that `logo.png`, `favicon.png`, and `og-image.png` exist and have non-zero file sizes.

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/assets.test.js`
Expected: FAIL (files missing)

- [ ] **Step 3: Setup assets, copy logo, generate favicon and og-image, and configure package.json**

Copy `../3D PRINTING/public/logo.png` to `assets/images/logo.png`. Generate optimized `favicon.png` (32x32 / 64x64) and high-res `og-image.png` (1200x630) using a Python script. Configure `package.json` with Playwright dev dependencies and preview scripts.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/assets.test.js`
Expected: PASS

- [ ] **Step 5: Initialize Git repository and commit**

```bash
git init
git add package.json assets/ tests/
git commit -m "chore: setup project assets and package config"
```

---

### Task 2: Build Semantic HTML Structure & Metadata

**Files:**
- Create: `index.html`
- Test: `tests/html-structure.test.js`

**Interfaces:**
- Consumes: `assets/images/logo.png`, `assets/images/favicon.png`
- Produces: Semantic HTML5 document containing Header/Hero, Action Nav, and Footer.

- [ ] **Step 1: Write test for HTML structure, SEO, Open Graph, and exact links**

Create `tests/html-structure.test.js` asserting:
1. `title` contains "3D Studio Dubai"
2. Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`)
3. Heading hierarchy (`<h1>Let's Connect!</h1>`, supporting copy)
4. Three anchor tags with exact URLs:
   - Instagram: `https://www.instagram.com/3dstudio_dubai/`
   - Facebook: `https://www.facebook.com/profile.php?id=61596340364013`
   - WhatsApp: `https://wa.me/971504681889`
5. All three anchors have `target="_blank"` and `rel="noopener noreferrer"`
6. Footer with "3D Studio Dubai" and "Designed with creativity. Made with precision."

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/html-structure.test.js`
Expected: FAIL (`index.html` does not exist)

- [ ] **Step 3: Implement `index.html`**

Write `index.html` with full accessibility semantics, schema.org JSON-LD structured data, crisp inline SVGs for Instagram, Facebook, and WhatsApp, hero with logo and 3D visual geometry accent, action cards, and precision footer.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/html-structure.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add index.html tests/html-structure.test.js
git commit -m "feat: implement accessible semantic HTML and metadata"
```

---

### Task 3: Design & Styling Implementation

**Files:**
- Create: `assets/css/style.css`
- Test: `tests/styles.test.js`

**Interfaces:**
- Consumes: `index.html` classes and structure
- Produces: Modern CSS design system with CSS custom properties, fluid typography, subtle 3D accents, and responsive layout.

- [ ] **Step 1: Write test for CSS custom properties and rules**

Create `tests/styles.test.js` asserting:
1. CSS custom properties for colors (`--bg-primary`, `--text-primary`, `--accent-whatsapp`, `--border-color`, `--card-bg`)
2. Viewport responsive media queries
3. WhatsApp prominent visual styling rules
4. `:focus-visible` accessibility styles
5. `@media (prefers-reduced-motion)` support

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/styles.test.js`
Expected: FAIL (`assets/css/style.css` does not exist)

- [ ] **Step 3: Implement `assets/css/style.css`**

Implement complete design system:
- Off-white background with subtle tactile mesh and 3D geometric isometric watermark accent
- Modern typography scale with crisp font rendering (`-webkit-font-smoothing: antialiased`)
- Subtle 3D-inspired layered badge around logo
- Full-width modern rounded action buttons with micro-interactions, subtle borders, and soft shadows
- WhatsApp primary prominence (distinguished emerald accent, status dot, subtle badge)
- High contrast focus rings for keyboard accessibility
- Fluid responsive layout (tested from 320px to 1440px)

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/styles.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add assets/css/style.css tests/styles.test.js
git commit -m "feat: implement premium 3D Studio Dubai design system"
```

---

### Task 4: Automated End-to-End & Responsiveness Testing with Playwright

**Files:**
- Create: `tests/e2e.test.js`
- Test: End-to-end browser verification

**Interfaces:**
- Consumes: `index.html`, `assets/css/style.css`, static assets via local HTTP server
- Produces: Automated verification report and mobile screenshot artifacts

- [ ] **Step 1: Write comprehensive Playwright end-to-end test**

Create `tests/e2e.test.js` testing:
1. Loads page without console errors
2. Tests viewports: iPhone 14/15 (390x844), Samsung Galaxy (360x800), iPad Mini (768x1024), Desktop (1280x800)
3. Confirms no horizontal scrollbar on any device
4. Confirms all three buttons are clickable with valid hrefs and targets
5. Confirms WhatsApp button is visually distinct
6. Captures screenshots for visual QA verification

- [ ] **Step 2: Run Playwright test**

Run: `npx playwright test` or `node tests/run-e2e.js`
Expected: All tests PASS and screenshots saved

- [ ] **Step 3: Commit**

```bash
git add tests/
git commit -m "test: add automated end-to-end and responsive QA suite"
```

---

### Task 5: Cloudflare Pages Deployment Configuration & Documentation

**Files:**
- Create: `_headers`
- Create: `wrangler.toml`
- Create: `README.md`
- Test: `tests/deployment.test.js`

**Interfaces:**
- Consumes: Static build structure
- Produces: Complete Cloudflare Pages deployment configuration and comprehensive README.md

- [ ] **Step 1: Write test for deployment configuration**

Create `tests/deployment.test.js` checking that `_headers`, `wrangler.toml`, and `README.md` exist and contain expected Cloudflare Pages settings and deployment instructions.

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/deployment.test.js`
Expected: FAIL

- [ ] **Step 3: Implement Cloudflare Pages configuration and README.md**

Write `_headers` with security headers (CSP, HSTS, X-Content-Type-Options) and cache control. Write `wrangler.toml` with project configuration. Write comprehensive `README.md` detailing:
- Project overview and brand assets
- Direct URL verification checklist
- Step-by-step Cloudflare Pages deployment via Git, Wrangler CLI, or Web UI drag-and-drop
- Local preview and testing commands

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/deployment.test.js`
Expected: PASS

- [ ] **Step 5: Final git commit and tag**

```bash
git add _headers wrangler.toml README.md tests/deployment.test.js
git commit -m "docs: add Cloudflare Pages configuration and deployment guide"
```
