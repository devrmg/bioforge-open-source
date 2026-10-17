# Architecture and product decision log

| Date | Decision | Alternatives considered | Reason | Impact |
|---|---|---|---|---|
| 2026-10-17 | Local-only default, future migrations unapplied | Online DB / Supabase cloud | Eliminate third-party dependencies, API keys, hosting costs, and credential leaks | 100% offline capable; zero server-side telemetry |
| 2026-10-17 | Browser `localStorage` + JSON Import/Export backup | IndexedDB-only or in-memory only | Simple, robust, human-readable backups that users can inspect and version-control | Clear disclaimer needed about cache clearing |
| 2026-10-17 | Pure client-side static site generation (JSZip) | Server-side rendering endpoint / build daemon | Zero backend needed; builds self-contained HTML/CSS/assets ZIP in the browser | User gets a lightning-fast static website ready for any host |
| 2026-10-17 | Strict URL validation (`http:`, `https:`, `mailto:`) | Permissive string links | Prevent `javascript:`, `data:`, or malicious protocol injections in generated profiles | High security and safe sharing |
| 2026-10-17 | Multi-view layout (Editor + Live Device Preview + Static Pages) | Separate page routing for preview | Creators need instant feedback while editing their profile, avatar, links, and themes | High conversion and delightful UX |
| 2026-10-17 | Docker deployment via multi-stage static Nginx | Node.js Express server | Static files require minimal memory (<20MB RAM) and zero Node runtime vulnerabilities | Superb performance and Hostinger one-click compatibility |
