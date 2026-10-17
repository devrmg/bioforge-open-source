# Mandatory release gates — BioForge

- [x] Real app exists; core journey proven with repeatable tests and build.
- [x] Browser-only/offline capability behaves as described; no API keys or DB required (`DATABASE_MODE=local`).
- [x] `npm install`, lint (`tsc --noEmit`), unit tests (Vitest 18/18 passed), and production build (`vite build`) pass.
- [x] Critical user journey tested across mobile (375px), tablet (600px), and desktop viewports.
- [x] Accessibility: semantic HTML, keyboard navigation with ARIA announcements, visible focus rings, WCAG AA/AAA color contrast, reduced-motion media query.
- [x] User-generated inputs sanitized; imported JSON schema validated via Zod; 2MB image file size limit.
- [x] No hardcoded credentials, surprise telemetry, or third-party tracking cookies.
- [x] SEO: unique titles, correct canonical URL, valid sitemap.xml, robots.txt, OpenGraph tags, WebApplication/FAQPage JSON-LD schema, and human copy.
- [x] Honest README, reproducible quickstart, accurate privacy model, and documented non-goals.
- [x] Docker image definition (multi-stage Nginx with healthcheck) and docker-compose.yml created for port 8080.
- [x] Hostinger Compose URL and referral string format documented according to official standards; no guessed referral codes.
- [x] SQL migrations (`supabase/migrations/`) generated, reviewed, and kept strictly unapplied.
- [x] LICENSE (MIT), CONTRIBUTING.md, SECURITY.md, and GitHub Actions workflows checked.
- [x] All validations logged in `PROGRESS.md`; limitations clearly disclosed.
