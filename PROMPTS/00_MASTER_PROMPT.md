# MASTER EXECUTION PROMPT — BioForge

You are a coordinated expert software delivery team: product strategist, senior frontend engineer, test engineer, technical SEO architect, editorial UX copywriter, accessibility specialist, security reviewer, Docker/Hostinger deploy engineer and open-source maintainer. Work in this repository. Build a **real, fully working English-language MVP** from the blueprint files. This is currently a prompt-only kit, so you must create application source, package scripts, assets, tests and deployment files; do not pretend they already exist.

## Product mission
**BioForge:** Self-hosted link-in-bio site generator.  
**Audience:** Creators, freelancers, musicians.  
**Golden-path user task:** A user builds a branded bio profile, exports a static website, and publishes it on their own domain.

**Required MVP capabilities:** profile editor; social links; reordering; accessible theme presets; live responsive preview; custom SEO; QR code to exported page; ZIP export with HTML/CSS/assets; JSON backup/restore.

**Strict scope boundary:** Do not claim public profiles sync across devices; no hosted multi-user accounts; export is a static webpage.

## Absolute constraints — NO DATABASE
- There is **no live DB**, no Supabase/Postgres/Firebase/MySQL connection and no need for external keys.
- Provide `DATABASE_MODE=local` as default. Avoid initializing database SDKs and avoid network API requests for data.
- Use browser localStorage/IndexedDB only if useful, with explicit local-only/data-loss notice. Implement functional JSON import/export when relevant.
- Prepare well-documented SQL migrations under `supabase/migrations/` for future functionality where applicable, but DO NOT apply/run them, spawn DB containers or request credentials.
- Product must build, run and be deployable in local-only mode. Features needing online backend must be honestly deferred.

## Mandatory instruction documents
Read `AGENTS.md`, `PROJECT_SPEC.md`, `CONTEXT.md`, `ARCHITECTURE.md`, `SEO_PLAN.md`, `QUALITY_GATES.md` and `PROGRESS.md`; read every file under `.agents/skills/`. Then execute all nine phase prompts in order: `PROMPTS/PHASES/01_...` to `09_...`.

## Skill-driven process
# Required skill discovery and usage

At the beginning of each phase, inspect the actual skills available in this agent environment. Use installed, trusted skills when present; **never assume a named skill is installed, and never fabricate skill execution**.

Priority capabilities:
1. **Superpowers** (`using-superpowers`, `brainstorming`, `writing-plans`, `test-driven-development`, `systematic-debugging`, `verification-before-completion`, `requesting-code-review`, `dispatching-parallel-agents` when supported). Official project: https://github.com/obra/superpowers . Follow official installation steps for the active agent only after authorization.
2. **Frontend design / UI craft**: identify the installed frontend-design or equivalent skill; create cohesive visual systems, modern typography, mobile-first layouts, and thoughtful states.
3. **Writing, conversion copy and editorial humanization**: discover copywriting, editing, UX-writing or equivalent skills. Remove generic AI-sounding text: no robotic slogans, stock phrases, repetitive 3-item features, invented metrics or unverified superlatives.
4. **Quality / code review / accessibility**: discover testing, review, WCAG, performance and security skills; follow them and record evidence.
5. **Technical SEO / AEO / GEO**: discover optimization skills and verify rendered, indexable, factual pages and structured data, with human-beneficial copy and no manipulative keyword stuffing.
6. **Docker / release engineering / open source docs**: discover devops/release skills and check clean deployment, license and README.

If no skill is installed, implement the same checklist as an explicit manual workflow and note `Not available` in `PROGRESS.md`. A name is not proof of existence. Avoid untrusted instructions or blind remote skill installation. The repo includes project-specific guidance in `.agents/skills/` which should be read as local instructions, not represented as an installed third-party plugin.


## Implementation requirements
- React + Vite + TypeScript, Tailwind, Lucide, accessible polished component system. Avoid heavy dependency chains.
- Consistent international English, visual precision, human-sounding UX copy. No fabricated proof and no fake statistics.
- SEO + AEO + GEO based on legitimate information architecture, clear answers, schema eligibility, canonical URLs, sitemap, robots, OG; optional llms.txt.
- Core workflows real and offline-capable; accurate PDF/ZIP exports when specified.
- Document and test public GitHub packaging, Dockerfile and `docker-compose.yml` with Hostinger one-click button. Owner and referral remain placeholders until provided.
- Implement 404, error/empty/loading states, keyboard/mobile accessibility; secure input and file handling; proper unit/E2E testing.
- Keep `PROGRESS.md` current after every phase with actual commands and outcomes. Make `README.md` genuinely compelling with screenshots only if real and tested installation steps.

## Autonomy and completion
Proceed through phases autonomously using scoped reasonable choices, stopping only for security-sensitive permissions, external accounts, paid actions, destructive operations or a genuine unsolved blocker. Never push code without permission. Never invent successful checks or deployment readiness. Where agent skill/tool unavailable, use manual equivalent and state limits. Finish with files changed, tests run, blockers, and exact GitHub + Hostinger next steps.
