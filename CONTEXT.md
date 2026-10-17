# Project context — BioForge

## Strategic outcome
Offer genuinely useful English-language open-source software to global users, with a clear reason to self-host and optional deployment via Hostinger VPS. Promotion is secondary to utility.

## Fixed decisions
- Repo: `bioforge-open-source`; brand: `BioForge`.
- No live database now; write optional PostgreSQL/Supabase migrations for later in `supabase/migrations/` only if useful.
- Default adapter: browser-only or stateless; never present simulated cloud persistence as real.
- React + Vite + TypeScript + Tailwind + accessible design system; Docker serves a built SPA via a lightweight web server.
- Product and docs are in idiomatic, human-edited English.
- User may use Codex, Claude Code or other coding agents; discover their actual skills.

## Audience
Creators, freelancers, musicians.

## Critical workflow
A user builds a branded bio profile, exports a static website, and publishes it on their own domain.

## Scope lock
Do not claim public profiles sync across devices; no hosted multi-user accounts; export is a static webpage.

## Decisions to log
Write each decision and date in `docs/DECISIONS.md`; keep work and objective test evidence in `PROGRESS.md`.
