# Hostinger deployment guide — BioForge

**Official source:** https://www.hostinger.com/support/deploy-on-hostinger-button/

## Before promoting deployment
The coding agent must implement and test Dockerfile, docker-compose.yml and frontend hosting. Default install requires no DB. Build and run locally: `docker compose up --build -d`, inspect `docker compose ps` and open the exposed port. Validate deep SPA routes; add restart policy and minimal health check.

## Button format
Hostinger documents:

```markdown
[![Deploy on Hostinger](https://assets.hostinger.com/vps/deploy.svg)](https://www.hostinger.com/docker-hosting?compose_url=URL_ENCODED_RAW_COMPOSE_URL&REFERRALCODE=YOUR_VERIFIED_REFERRAL_CODE)
```

`compose_url` must refer to your PUBLIC raw GitHub Compose URL: `https://raw.githubusercontent.com/GITHUB_OWNER/bioforge-open-source/refs/heads/main/docker-compose.yml` (URL-encode inside query). The `REFERRALCODE` parameter is optional and must be replaced with the actual eligible Hostinger referral code shown in the dashboard. Never invent one.

## Critical image/build issue
A one-click deployment from **only** a public Compose URL may not upload local application source. A compose file containing `build: .` can fail if remote engine lacks build context. For reliable one-click VPS distribution, first publish a compatible public image (e.g. GHCR) and reference that image by immutable tag/digest in Compose, or validate a supported remote build workflow. Your coding agent must prove the selected route works before labeling deployment tested.

## Owner setup
1. Create public GitHub repository named `bioforge-open-source`.
2. Push vetted working source and reviewed LICENSE.
3. Publish container image via documented GitHub Actions if selected.
4. Confirm public Compose URL responds without login and points to a pullable image.
5. Confirm Hostinger button loads expected Compose project.
6. Test installation on an empty VPS, then configure DNS, HTTPS and backups as needed.
7. Submit project through Hostinger's For Devs program and verify program-specific eligibility.
8. Disclose referral relationship and check current program terms.

**Do not assert hosting is free, one-click deployment is guaranteed, or a commission is guaranteed.**
