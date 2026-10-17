# Database Architecture & Migration Plan — BioForge

**Current State:** `DATABASE_MODE=local` (Zero live database, 100% offline-ready, browser `localStorage` + JSON backups).  
**Status of SQL Migrations:** Unapplied and deferred in `supabase/migrations/`.

---

## 1. Why `DATABASE_MODE=local` is the MVP Default

BioForge is designed from the ground up to give creators total ownership of their link profiles without vendor lock-in or recurring server bills.
1. **Zero External Secrets:** No API keys, database connection strings, or cloud tokens are required to build, test, or run BioForge.
2. **Zero Attack Surface:** Without remote database endpoints, SQL injection and remote data exposure risks are completely eliminated.
3. **Instant Setup:** Users can self-host via Docker or export static files to any free static host (GitHub Pages, Cloudflare Pages, Netlify) with zero configuration.

---

## 2. Future Cloud Migration Roadmap

If a team wishes to extend BioForge into a hosted multi-tenant SaaS with user authentication and synchronized cloud profiles, follow this migration pathway:

### Step 1: Provision Isolated Database
1. Provision a PostgreSQL 15+ instance (or Supabase project).
2. Configure environment variables in `.env`:
   ```bash
   DATABASE_MODE=postgres # or supabase
   DATABASE_URL=postgresql://user:password@host:5432/bioforge
   ```

### Step 2: Apply Migrations
Apply the reviewed migration files sequentially:
```bash
# Example with Supabase CLI
supabase db push
# Or using standard psql:
psql "$DATABASE_URL" -f supabase/migrations/20261017000000_create_profiles_and_links_schema.sql
```

### Step 3: Implement Database Adapter Interface
Create `src/lib/adapters/postgresAdapter.ts` adhering to the existing TypeScript contracts (`BioForgeConfig`, `ProfileData`, `SocialLink`). The UI components consume the storage interface identically regardless of adapter.

### Step 4: JSON Data Ingestion Tool
Users who built profiles during the `DATABASE_MODE=local` era can import their existing `bioforge-backup-*.json` files directly into their new cloud accounts using the JSON import validator.
