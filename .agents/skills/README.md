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
