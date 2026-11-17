# 3D Studio Dubai — Social Media Landing Page

> A premium, modern, mobile-first social media landing page for **3D Studio Dubai**, tailored for customers scanning QR codes on physical packaging, business cards, exhibition stands, and event displays.

---

## 1. Project Overview

- **Brand:** 3D Studio Dubai
- **Core Mission:** Convert physical QR code scans into high-intent engagement: following our Instagram, joining our Facebook community, or initiating a direct WhatsApp inquiry.
- **Design Philosophy:** Minimalist contemporary luxury. Clean off-white background (`#F8F9FA`), deep charcoal typography (`#121316`), subtle 3D-inspired geometric layering, and modern tactile rounded cards.
- **Architecture:** Pure semantic HTML5 + modern CSS3 design tokens + embedded crisp vector SVGs. Zero external runtime JavaScript frameworks for instantaneous sub-200ms load times on cellular mobile connections.
- **Target Platform:** Cloudflare Pages (Serverless static edge delivery).

---

## 2. Verified Social & Contact Links

| Platform | Role | Verified URL | Link Attribute |
|---|---|---|---|
| **WhatsApp** | Primary Direct Inquiry (Prominent) | `https://wa.me/971504681889` | `target="_blank" rel="noopener noreferrer"` |
| **Instagram** | Portfolio & Daily Prints | `https://www.instagram.com/3dstudio_dubai/` | `target="_blank" rel="noopener noreferrer"` |
| **Facebook** | Community & Studio Updates | `https://www.facebook.com/profile.php?id=61596340364013` | `target="_blank" rel="noopener noreferrer"` |

---

## 3. Directory Structure

```
├── index.html                   # Semantic HTML5 page with SEO, Schema.org, & OpenGraph
├── _headers                     # Cloudflare Pages security & caching headers
├── wrangler.toml                # Cloudflare Pages deployment configuration
├── package.json                 # Scripts for testing and local preview
├── README.md                    # Deployment guide & documentation
├── assets/
│   ├── css/
│   │   └── style.css            # Responsive design tokens, 3D accents, & micro-interactions
│   └── images/
│       ├── logo.png             # High-res 1024x1024 transparent brand logo
│       ├── favicon.png          # Crisp favicon & Apple touch icon
│       └── og-image.png         # 1200x630 social sharing Open Graph preview
└── tests/
    ├── assets.test.js           # Asset verification unit tests
    ├── html-structure.test.js   # Markup, SEO, Open Graph & link tests
    ├── styles.test.js           # Design tokens, accessibility, & media query tests
    ├── deployment.test.js       # Cloudflare Pages headers & configuration tests
    ├── e2e.test.js              # Node test runner wrapper for E2E suite
    ├── run-e2e.js               # Playwright automated browser test across 5 viewports
    └── screenshots/             # Captured responsive verification screenshots
        ├── iphone-14.png
        ├── samsung-galaxy.png
        ├── compact-phone.png
        ├── ipad-mini.png
        └── desktop-macbook.png
```

---

## 4. Local Development & Testing

### Prerequisites
- Node.js (v18 or higher recommended)

### Run Automated Tests
```bash
# Run unit & structural tests
npm test

# Run Playwright E2E and responsive viewports suite
npm run test:e2e
```

### Local Preview Server
```bash
# Start a local static server on http://localhost:3000
npm run preview
```
Open `http://localhost:3000` in your desktop or mobile browser.

---

## 5. How to Test All Three Links

1. **WhatsApp (`https://wa.me/971504681889`):**
   - Click the prominent green-accented card.
   - It will open a new browser tab redirecting to WhatsApp chat with phone number `+971 50 468 1889`.
   - On mobile devices, it triggers the native WhatsApp application directly.
2. **Instagram (`https://www.instagram.com/3dstudio_dubai/`):**
   - Click the Instagram card.
   - It opens `https://www.instagram.com/3dstudio_dubai/` in a new tab or prompts to open the Instagram mobile app.
3. **Facebook (`https://www.facebook.com/profile.php?id=61596340364013`):**
   - Click the Facebook card.
   - It opens `https://www.facebook.com/profile.php?id=61596340364013` in a new tab.

All three links include `rel="noopener noreferrer"` to prevent window opener tab-nabbing vulnerabilities.

---

## 6. Cloudflare Pages Deployment Guide

### Option A: Cloudflare Pages Direct Git Integration (Recommended)
1. Push this repository to GitHub or GitLab.
2. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your repository.
4. Set the build settings:
   - **Framework preset:** `None`
   - **Build command:** *(leave empty)*
   - **Build output directory:** `.` (root directory)
5. Click **Save and Deploy**. Cloudflare Pages will build and deploy edge caching globally.

### Option B: Cloudflare Wrangler CLI (Instant Deployment)
Run from the project root:
```bash
# Log in to Cloudflare (one-time)
npx wrangler login

# Deploy directly to Cloudflare Pages
npx wrangler pages deploy . --project-name 3d-studio-dubai
```

### Option C: Direct Drag-and-Drop (Web UI)
1. In Cloudflare Dashboard, navigate to **Workers & Pages** > **Create application** > **Pages** > **Upload assets**.
2. Name the project `3d-studio-dubai`.
3. Drag and drop the folder containing `index.html`, `_headers`, and `assets/`.
4. Click **Deploy Site**.

---

## 7. Performance & Quality Assurance

- **Sub-200ms TTFB:** Static hosting on Cloudflare's UAE edge network PoPs (Dubai / Abu Dhabi).
- **Zero Client Hydration Overhead:** 100% lightweight static HTML/CSS.
- **Accessible (WCAG AAA):** Clean color contrast ratios, clear focus outlines (`:focus-visible`), aria landmarks, and `@media (prefers-reduced-motion)`.
- **Open Graph & SEO:** Complete metadata with high-res 1200x630 social preview card and Schema.org LocalBusiness schema.
