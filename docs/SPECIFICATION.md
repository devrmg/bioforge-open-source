# BioForge Detailed Product Specification

**Version:** 1.0.0-mvp  
**Status:** Approved  
**Database Architecture:** Local-only (`DATABASE_MODE=local`), zero database connection, client-side persistence with JSON export/import.

---

## 1. User Personas

### Persona A: Independent Digital Creator ("Maya")
- **Profile:** Content creator streaming on Twitch and posting tutorials on YouTube and TikTok.
- **Pain Point:** Paying recurring monthly subscriptions for Linktree or Bio.fm while being locked into their proprietary analytics and data capture.
- **Goal:** Build a sleek, branded link hub in under 5 minutes, download the static site, and host it on her custom domain or free static hosting (GitHub Pages, Cloudflare Pages).
- **Key Needs:** Video/streaming social link presets, custom avatar, responsive mobile preview, QR code for stream overlays.

### Persona B: Freelance Software Consultant / Designer ("Alex")
- **Profile:** Full-stack developer and UI designer working independently.
- **Pain Point:** Wants total data sovereignty, zero telemetry, and the ability to self-host using Docker on their own Hostinger VPS.
- **Goal:** Run BioForge locally or on their VPS, customize SEO tags and OpenGraph cards, and deploy a minimal, fast-loading personal landing page.
- **Key Needs:** Fast performance, accessible theme presets with strong typography, clean JSON export/import for configuration backups, Docker Compose readiness.

### Persona C: Musician / Independent Producer ("Marcus")
- **Profile:** Touring artist releasing tracks on Spotify, Apple Music, and SoundCloud.
- **Pain Point:** Needs fans to easily discover upcoming gigs, streaming links, and merchandise from Instagram and TikTok bios without slow redirect pages or intrusive tracking banners.
- **Goal:** Fast, lightweight mobile-optimized bio page with custom branding, instant QR code to print on show flyers and merch tables.
- **Key Needs:** Music platform link presets, QR code export (SVG/PNG), high-contrast mobile design.

---

## 2. Information Architecture & Sitemap

```text
/                      -> Landing page with interactive editor & live phone preview
/templates             -> Preset themes catalog and design showcase
/how-it-works          -> 3-step guide: Customize -> Preview -> Export static site
/faq                   -> Frequently asked questions (self-hosting, data privacy, static export)
/privacy               -> Data privacy disclosure (100% local, no remote tracking, zero telemetry)
/docs/deploy           -> Deployment guide for Docker, Hostinger VPS, and static hosts
```

---

## 3. Scope Boundaries & Honest Non-Goals

- **Strictly Out of Scope:**
  - Multi-user accounts, logins, and passwords (no auth server).
  - Cloud database syncing across multiple devices.
  - Server-side tracking, analytics beacons, or visitor counter tracking.
  - Proprietary URL shortening services requiring backend databases.
- **Honest Limitations Stated to Users:**
  - Data is saved directly in browser `localStorage`. Clearing browser cache will reset unsaved changes unless backed up to JSON.
  - Exported bio page is a 100% standalone static HTML/CSS/SVG artifact that requires user hosting (GitHub Pages, Cloudflare Pages, Netlify, or self-hosted Nginx/Hostinger).

---

## 4. Acceptance Criteria by Feature

### 1. Profile Editor
- Fields: Display Name (required, max 80 chars), Handle/Username (max 40 chars), Bio/Description (max 300 chars), Avatar image (file upload or URL with instant data URL preview), Tagline/Profession badge.
- Validation: Sanitized string inputs against HTML injection / XSS.

### 2. Social Links Manager
- Add, edit, remove links.
- Supported presets with recognizable icons: GitHub, Twitter/X, Instagram, YouTube, LinkedIn, Spotify, SoundCloud, Twitch, Discord, TikTok, Substack, Email, Website.
- Fields per link: Platform preset, custom title/label, destination URL, highlight badge, visibility toggle.
- Safe URL validator: Only `http://`, `https://`, and `mailto:` protocols accepted. `javascript:` and dangerous protocols are strictly rejected.

### 3. Accessible Reordering
- Drag-and-drop support for mouse and touch interactions.
- Keyboard accessible "Move Up" and "Move Down" buttons with ARIA labels and screen reader status updates.

### 4. Accessible Theme Presets
- At least 6 curated presets:
  1. *Obsidian Dark* (deep neutral slate, pure contrast)
  2. *Clean Minimalist Light* (high contrast typographic editorial)
  3. *Cyber Emerald* (modern dark green / terminal accents)
  4. *Warm Editorial Serif* (literary warm cream and deep charcoal)
  5. *Retro Sunset* (vibrant warm gradient cards with dark background)
  6. *Electric Indigo* (clean modern tech aesthetic)
- All themes must meet WCAG AA contrast (minimum 4.5:1 for body text, 3:1 for large headings and UI borders).
- Respects `prefers-reduced-motion` media queries.

### 5. Live Responsive Preview
- Live synchronizing preview pane showing edits in real time.
- Viewport toggle: Mobile (375px), Tablet (640px), Desktop full width.
- Fully interactive link clicks testable in preview (opens in sandbox or new tab).

### 6. Custom SEO & Social Share Preview
- Customizable Meta Title, Meta Description, Canonical URL, OpenGraph Image URL.
- Live card preview showing how the link bio will appear when shared on Twitter/X, Discord, and iMessage.

### 7. QR Code Generator
- Generates standards-compliant QR code for the user's custom website URL.
- Downloadable as high-resolution PNG or crisp vector SVG.
- Instant scan verification.

### 8. Static ZIP Website Export
- One-click export bundling:
  - `index.html`: Fully semantic, responsive, accessible HTML5 file containing the profile, links, social icons, and SEO metadata.
  - `style.css`: Clean, standalone CSS with embedded variables, responsive breakpoints, and zero external framework dependencies.
  - `avatar.png` / `avatar.jpg`: Bundled image asset if custom image was uploaded.
  - `README.md`: Clear step-by-step instructions on deploying the folder to Hostinger, Cloudflare Pages, GitHub Pages, or any web server.
- Uses client-side ZIP generation via JSZip. Zero server requests.

### 9. JSON Backup & Restore
- "Export Configuration (.json)": Downloads full profile state in formatted JSON.
- "Import Configuration (.json)": Validates JSON schema against strict TypeScript contract, sanitizes values, provides clear error alerts if invalid or corrupted, and restores state seamlessly.
- "Reset to Demo Defaults": With confirmation modal to prevent accidental data loss.
