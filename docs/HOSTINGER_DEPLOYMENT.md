# Hostinger Deployment Guide — BioForge

**Official reference:** https://www.hostinger.com/support/deploy-on-hostinger-button/  
**Repository:** `https://github.com/devrmg/bioforge-open-source`

---

## 1. Deploy on Hostinger Button

The one-click button format for BioForge is:

```markdown
[![Deploy on Hostinger](https://assets.hostinger.com/vps/deploy.svg)](https://www.hostinger.com/docker-hosting?compose_url=https%3A%2F%2Fraw.githubusercontent.com%2Fdevrmg%2Fbioforge-open-source%2Frefs%2Fheads%2Fmain%2Fdocker-compose.yml)
```

If you have an approved Hostinger referral code from the For Devs dashboard, append `&REFERRALCODE=YOUR_VERIFIED_CODE`.

---

## 2. Docker Compose Configuration

BioForge's [`docker-compose.yml`](../docker-compose.yml) is fully self-contained with:
- Zero database containers or passwords required.
- Port 8080 exposed by default (`8080:80`).
- Healthcheck probe with curl.
- `restart: unless-stopped` policy.

---

## 3. Hostinger Submission Checklist

1. [x] Public GitHub repository: `https://github.com/devrmg/bioforge-open-source`.
2. [x] Raw `docker-compose.yml` publicly accessible without authentication.
3. [x] Multi-stage Dockerfile using Alpine Nginx.
4. [x] Transparent referral notice in `README.md` and footer.
5. [x] No secrets, private credentials, or API keys in repository.
