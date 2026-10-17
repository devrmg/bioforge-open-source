# GitHub Release & Repository Management — BioForge

**Repository:** `https://github.com/devrmg/bioforge-open-source`  
**License:** MIT License  
**Default Branch:** `main`

---

## 1. Repository Topics & Tags

When configuring the repository on GitHub, add these topics in the repository settings to enhance discoverability:
`link-in-bio`, `self-hosted`, `static-site-generator`, `react`, `typescript`, `tailwind`, `docker`, `hostinger`, `open-source`, `privacy-first`

---

## 2. Release Tagging

To tag and publish a new semantic release:

```bash
# 1. Ensure working directory is clean
git status

# 2. Tag current release
git tag -a v1.0.0 -m "Release v1.0.0 — BioForge Self-Hosted MVP"

# 3. Push tag to GitHub (triggers automated docker-publish.yml workflow)
git push origin v1.0.0
```

---

## 3. GitHub Actions Workflows

- **`.github/workflows/ci.yml`:** Automatically executes on pull requests and commits to `main`. Runs `npm ci`, `npm run typecheck`, `npm run test`, and `npm run build`.
- **`.github/workflows/docker-publish.yml`:** Automatically builds and publishes the production container image to GitHub Container Registry (`ghcr.io/devrmg/bioforge-open-source:latest`) upon release publication.
