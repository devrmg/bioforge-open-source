# Architecture contract — BioForge

```text
User browser
  -> SPA (React/Vite)
  -> app services + validated adapters
  -> browser memory / localStorage / IndexedDB / file exports
  X no database service, no remote storage, no required API
Future only: PostgreSQL + optional auth/storage via adapters and unapplied migrations
```

## Default
`DATABASE_MODE=local`. Use the smallest storage model consistent with user privacy. No fake backend, no database Docker container, no fake shareable public links. Define typed data contracts and adapter interfaces where future backend will matter.

## Future migrations
Potential entities (only when warranted): profiles, profile_links, theme_presets. Future schema must have primary keys, timestamps, ownership/tenant isolation if multi-user, appropriate indexes, referential integrity and draft RLS. No migrations applied today. For pure in-browser utility functions, documenting why SQL is unnecessary is preferable to artificial schema bloat.

## Deployment
For Vite SPA, multi-stage Node build -> nginx/static server. Bind to port 8080 or document port. `docker compose` must have no required secrets and work with public build context. If Hostinger cannot build remotely from a raw Compose link, publish and reference a public GHCR image first; verify this pathway before promoting one-click deployment.
