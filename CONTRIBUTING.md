# Contributing to BioForge

Thank you for your interest in contributing to BioForge! We are committed to building a fast, private, accessible, and self-hostable link-in-bio generator.

## Core Architectural Rules

1. **Strict No-Database Constraint (`DATABASE_MODE=local`):**
   BioForge is an offline-first tool. Do not introduce mandatory cloud database SDKs, external API dependencies, or server-side data stores into the core MVP workflow.
2. **Accessible by Default:**
   All new UI components and themes must satisfy WCAG AA contrast standards, include proper semantic HTML, ARIA labels, and support keyboard navigation.
3. **Defensive Validation & Sanitization:**
   Any user input must be sanitized against XSS. Any imported JSON must pass strict Zod schema parsing before updating state.
4. **Honest Copy & Documentation:**
   We never fabricate statistics, user testimonials, or artificial reviews. All claims must reflect actual shipped functionality.

## Local Development Workflow

```bash
# 1. Install dependencies
npm install

# 2. Start local dev server
npm run dev

# 3. Run typecheck & linter
npm run typecheck

# 4. Run unit and integration tests
npm run test

# 5. Build production bundle
npm run build
```

## Submitting a Pull Request

1. Fork the repository and create your branch from `main`:
   `git checkout -b feature/your-feature-name`
2. Ensure `npm run typecheck`, `npm run test`, and `npm run build` pass with zero errors.
3. Commit your changes with descriptive messages.
4. Open a Pull Request referencing any relevant issues.
