# Security Policy — BioForge

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of BioForge seriously. Because BioForge runs in client-side local mode with static file generation, primary security concerns center on:
- Cross-Site Scripting (XSS) vectors in static website exports.
- Malicious URL scheme execution (e.g. `javascript:`, data URIs).
- Prototype pollution or arbitrary code execution via crafted JSON import payloads.
- Container vulnerabilities in the Docker Nginx image.

If you discover a potential vulnerability:
1. Please **do NOT open a public GitHub issue**.
2. Email security findings to the repository maintainer or open a private GitHub Security Advisory.
3. Include clear steps to reproduce the issue and expected vs actual behavior.
4. We aim to acknowledge reports within 48 hours and release patched versions promptly.
