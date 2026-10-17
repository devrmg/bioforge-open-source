# BioForge — Self-Hosted Link in Bio Site Generator

[![Build & Test](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/bioforge/bioforge-open-source)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Zero Database](https://img.shields.io/badge/database-none%20(local--only)-blue.svg)](#zero-database-architecture)
[![Deploy on Hostinger](https://assets.hostinger.com/vps/deploy.svg)](https://www.hostinger.com/docker-hosting?compose_url=https%3A%2F%2Fraw.githubusercontent.com%2Fdevrmg%2Fbioforge-open-source%2Frefs%2Fheads%2Fmain%2Fdocker-compose.yml)

BioForge is an open-source, offline-ready link-in-bio site generator designed for digital creators, freelance software engineers, and independent musicians. Build a branded profile, audit responsiveness in real time, and export a 100% self-contained static website ready to publish on your custom domain, Cloudflare Pages, GitHub Pages, or Hostinger VPS.

---

## Key Capabilities (Fully Implemented)

- **Studio Profile Editor:** Configure your display name, username handle, profession headline badge, biography (with character limits), location, and custom avatar image (file upload with 2MB validation or external image URL).
- **Social & Destination Links:** Rich platform presets with verified SVG vector icons (GitHub, X/Twitter, Instagram, YouTube, LinkedIn, Spotify, SoundCloud, Twitch, Discord, TikTok, Substack, Email, and custom Web URLs).
- **Accessible Reordering:** Rearrange links with intuitive visual controls and fully keyboard-accessible Move Up / Move Down buttons with screen reader announcements.
- **Accessible Theme Presets:** 6 curated themes with verified WCAG AA and AAA color contrast ratios:
  1. *Obsidian Slate* (WCAG AAA 14.2:1)
  2. *Editorial Monochrome* (WCAG AAA 15.5:1)
  3. *Cyber Emerald* (WCAG AA 11.8:1)
  4. *Warm Literary Serif* (WCAG AA 12.4:1)
  5. *Solar Amber* (WCAG AA 10.9:1)
  6. *Electric Indigo* (WCAG AA 12.1:1)
- **Live Synchronizing Preview:** Real-time preview frame with instant device viewport switching between Phone (375px), Tablet (600px), and Desktop viewports.
- **Custom SEO & Social Share Cards:** Customize meta title, description, canonical link, and inspect a simulated OpenGraph social share card preview (for Discord, iMessage, and Twitter).
- **QR Code Generator:** Generate standards-compliant QR codes for your published bio URL with one-click high-resolution PNG download.
- **Static Website ZIP Export:** Client-side generation (via JSZip) producing `index.html`, standalone `style.css`, inline SVG icons, and a deployment guide. Zero build servers required.
- **JSON Backup & Restore:** Export your profile state as an unencrypted, portable JSON document. Validate and restore backups with strict Zod schema checking and XSS defense.

---

## Zero-Database Architecture & Privacy Model

BioForge enforces **`DATABASE_MODE=local`** by default:
- **No Remote Database:** No Supabase, PostgreSQL, MySQL, or Firebase connections are initiated.
- **Zero Telemetry:** No tracking pixels, Google Analytics, cookies, or fingerprinting scripts.
- **Local Persistence:** Data is saved directly in your browser's `localStorage`.
- **Honest Scope Boundary:** BioForge does *not* claim to synchronize data silently across multiple devices without accounts. To transfer your profile between computers, export a JSON backup and restore it on your other machine.
- **Unapplied Future Migrations:** Well-documented PostgreSQL/Supabase migrations are provided in `supabase/migrations/` for teams wishing to build cloud SaaS extensions in the future, but they remain strictly unapplied and inactive in this MVP.

---

## 5-Minute Local Quickstart

### Prerequisites
- Node.js 18+ (tested on Node v22.23.0)
- npm 9+ (tested on npm 10.9.8)

### Installation & Running

```bash
# 1. Clone the repository
git clone https://github.com/bioforge/bioforge-open-source.git
cd bioforge-open-source

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
# -> Opens http://localhost:3000

# 4. Run automated test suite (Vitest)
npm run test
# -> 18 unit tests passing across validation, storage, and static generation

# 5. Compile production build
npm run build
# -> Production bundle generated in ./dist
```

---

## Deployment Guide

### Option A: Static Hosting (Free)
1. In the BioForge editor, click **Export Site** -> **Download Static Website (.zip)**.
2. Extract the archive (`index.html` and `style.css`).
3. Deploy to your favorite static host:
   - **Cloudflare Pages:** Direct upload via dashboard -> live on custom domain in 30 seconds.
   - **GitHub Pages:** Push files to a repository and enable Pages in repository settings.
   - **Netlify / Vercel:** Drag and drop folder to deploy.

### Option B: Self-Host BioForge in Docker

BioForge includes a multi-stage Dockerfile that builds the Vite SPA and serves it via an ultra-lightweight Nginx container (~20MB RAM) on port 8080:

```bash
# Launch with Docker Compose
docker compose up --build -d

# Check container status
docker compose ps

# Access the editor in your browser
http://localhost:8080
```

### Option C: Deploy on Hostinger VPS (1-Click Docker)

You can provision a Docker VPS running BioForge on Hostinger using our one-click button format:

[![Deploy on Hostinger](https://assets.hostinger.com/vps/deploy.svg)](https://www.hostinger.com/docker-hosting?compose_url=https%3A%2F%2Fraw.githubusercontent.com%2Fdevrmg%2Fbioforge-open-source%2Frefs%2Fheads%2Fmain%2Fdocker-compose.yml)

> **Hostinger Referral & Setup Notice:**
> - Replace `GITHUB_OWNER` with your verified GitHub username or organization once the repository is public.
> - The optional `REFERRALCODE` parameter must only be appended after verifying your eligible code in the Hostinger dashboard. Never fabricate referral parameters.
> - Hosting fees apply directly through Hostinger according to your chosen VPS tier. BioForge software itself is 100% free under the MIT License.

---

## Project Structure

```text
bioforge-open-source/
├── .github/workflows/          # CI and Docker publishing workflows
├── docs/                       # Architectural decisions, specs, privacy, hosting guides
│   ├── DECISIONS.md            # Architectural Decision Records (ADRs)
│   ├── SPECIFICATION.md        # Personas, sitemap, and acceptance criteria
│   ├── HOSTINGER_DEPLOYMENT.md # Hostinger 1-click button documentation
│   ├── MIGRATION_PLAN.md       # Future PostgreSQL migration roadmap
│   └── PRIVACY_AND_STORAGE.md  # Detailed data sovereignty disclosure
├── public/                     # Static assets, sitemap.xml, robots.txt, llms.txt
├── src/
│   ├── components/             # Polished accessible UI components
│   │   ├── Header.tsx          # Brand header and export modal trigger
│   │   ├── Footer.tsx          # Ethics, privacy disclosure, and navigation
│   │   ├── ProfileEditor.tsx   # Avatar, name, handle, badge, bio inputs
│   │   ├── LinksEditor.tsx     # Links CRUD with keyboard reordering
│   │   ├── ThemeSelector.tsx   # 6 accessible WCAG-tested theme presets
│   │   ├── SeoSettings.tsx     # Custom meta tags and live OpenGraph preview
│   │   ├── PreviewPane.tsx     # Real-time multi-viewport device preview
│   │   ├── ExportModal.tsx     # ZIP bundle, QR code, and JSON backup/restore
│   │   ├── TemplatesPage.tsx   # Curated archetype showcase
│   │   ├── HowItWorksPage.tsx  # Architecture walkthrough
│   │   ├── FaqPage.tsx         # Knowledge base & FAQs
│   │   ├── PrivacyPage.tsx     # Data privacy disclosure
│   │   └── DeployGuidePage.tsx # Hostinger & Docker walkthrough
│   ├── lib/                    # Storage, validation, static generator, QR code
│   ├── types/                  # Strict TypeScript interfaces
│   └── test/                   # Vitest unit & integration test suites
├── supabase/migrations/        # Unapplied, reviewed future SQL migrations
├── Dockerfile                  # Multi-stage production Nginx container
├── docker-compose.yml          # Zero-secret Compose specification
├── nginx.conf                  # Production SPA routing and security headers
└── package.json
```

---

## Verified Test Matrix

| Check | Command | Result |
|---|---|---|
| Dependency Installation | `npm install` | 275 packages installed cleanly |
| TypeScript Typecheck | `npm run typecheck` | 0 errors across all components |
| Unit Test Suite | `npm run test` | 18 / 18 tests passed (3 test suites) |
| Production Build | `npm run build` | Dist bundle created in 5.40s |
| Browser / Storage Fallback | Vitest jsdom tests | Corrupted JSON safely handled without crashing |
| URL Security Sanitization | `isSafeUrl()` tests | Strictly blocks `javascript:` and dangerous vectors |

---

## Community & Security

- **Contributions:** Please read [CONTRIBUTING.md](CONTRIBUTING.md) for code style and architectural constraints.
- **Security:** Review [SECURITY.md](SECURITY.md) for responsible disclosure procedures.
- **License:** Distributed under the [MIT License](LICENSE).
