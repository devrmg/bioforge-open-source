# Phase 01 — Discovery & scoped specification | BioForge

## Objective
Investigate repository and available skills. Write acceptance criteria and out-of-scope decisions. Confirm the specific core user workflow and preserve every no-database rule. Draft concise product spec, sitemap and target user personas. Stop scope creep; set clear weekend boundaries.

## Context
The product must satisfy the exact user journey: A user builds a branded bio profile, exports a static website, and publishes it on their own domain.
Features in scope: profile editor; social links; reordering; accessible theme presets; live responsive preview; custom SEO; QR code to exported page; ZIP export with HTML/CSS/assets; JSON backup/restore.
Out-of-scope honesty: Do not claim public profiles sync across devices; no hosted multi-user accounts; export is a static webpage.

## Procedure
1. Read AGENTS.md, PROJECT_SPEC.md, CONTEXT.md and current PROGRESS.md; inspect any preceding phase deliverables.
2. Discover available appropriate agent skills from `.agents/skills/README.md` and local environment; use actual available Superpowers and specialist skills as applicable; note gaps.
3. Create/modify actual working files, not only planning text. Use small testable commits or checkpoints.
4. Preserve **no live database**: no DB SDK initialization, no Supabase calls, migrations only as inactive future SQL.
5. Verify the phase outcome with concrete checks and log results, changes, risks and next actions in PROGRESS.md.
6. Continue to Phase 02 if done; if this is phase 09, complete the release handoff and do not auto-push to GitHub.

## Definition of done
No unfinished pretending-to-work UX or false deployment/SEO claims. Update docs when behavior changes. Quality Gates apply throughout. Output a short verified phase summary and next-phase handoff.
