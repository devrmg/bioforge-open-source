# GitHub publishing — bioforge-open-source

This ZIP is a development blueprint. Before creating a public release, the agent must generate real code, verify package scripts and write the final product README.

## Suggested sequence
```bash
# run inside the actual implemented project
git init
git branch -M main
git add .
git status --short
git commit -m "feat: release initial open-source MVP"
# create public empty repository on GitHub first, named bioforge-open-source
git remote add origin https://github.com/GITHUB_OWNER/bioforge-open-source.git
git push -u origin main
```

Only push with explicit permission; inspect git diff and never commit `.env`, secrets, private files or build artifacts. Add real screenshots, public image, issue templates, CONTRIBUTING, SECURITY, CHANGELOG and releases. Configure CI to run install, lint, types, test and build. Set repository topics: `open-source`, `self-hosted`, `docker`, `hostinger`, `typescript`, plus domain-specific tags.
