# FUTURE ONLY — migrations for BioForge

The app MUST work in `local` mode with no connected database. This directory is reserved for future PostgreSQL/Supabase migrations. The coding agent creates SQL only if it is useful for entities: profiles, profile_links, theme_presets.

- Do not run SQL or add a database to Docker Compose.
- Do not require Supabase environment variables.
- Never claim browser data is remotely persistent.
- In a future project, validate schema, RLS, tenant isolation, backups and restore in a separate environment before migration.
