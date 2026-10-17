import JSZip from 'jszip';
import { BioForgeConfig, ThemePreset } from '../types/profile';
import { THEME_PRESETS } from './constants';
import { escapeHtml, isSafeUrl } from './validation';

/**
 * Returns clean inline SVG path/markup for known social platforms.
 */
export function getPlatformSvgIcon(platform: string): string {
  switch (platform) {
    case 'github':
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>`;
    case 'twitter':
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>`;
    case 'instagram':
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>`;
    case 'youtube':
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><polygon points="10 15 15 12 10 9 10 15"></polygon></svg>`;
    case 'linkedin':
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>`;
    case 'spotify':
    case 'music':
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>`;
    case 'soundcloud':
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.9 19.1C1 19.1 0 16.3 0 13.9c0-2.3 1.8-3.9 4-3.9.5 0 1 .1 1.5.3C6.3 7 9 4.9 12.3 4.9c4.2 0 7.7 3.4 7.7 7.7v.5c2.3.5 4 2.5 4 4.9 0 2.8-2.2 5.1-5.1 5.1H4.9z"></path></svg>`;
    case 'twitch':
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"></path></svg>`;
    case 'discord':
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;
    case 'tiktok':
    case 'video':
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 8-6 4 6 4V8Z"></path><rect width="14" height="12" x="2" y="6" rx="2" ry="2"></rect></svg>`;
    case 'substack':
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path><path d="M6 6h10"></path><path d="M6 10h10"></path></svg>`;
    case 'email':
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>`;
    case 'website':
    default:
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>`;
  }
}

/**
 * Generates standalone clean CSS matching the selected theme preset.
 */
export function generateStandaloneCss(theme: ThemePreset): string {
  const fontFamilies = {
    sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    serif: '"Newsreader", Georgia, Cambria, "Times New Roman", Times, serif',
    mono: '"JetBrains Mono", Menlo, Monaco, Consolas, "Courier New", monospace',
  };

  const borderRadii = {
    none: '0px',
    sm: '6px',
    md: '12px',
    lg: '20px',
    full: '9999px',
  };

  return `/* BioForge Standalone Generated Stylesheet */
:root {
  --bg-color: ${theme.colors.bg};
  --card-bg: ${theme.colors.card};
  --card-hover: ${theme.colors.cardHover};
  --card-border: ${theme.colors.cardBorder};
  --text-primary: ${theme.colors.textPrimary};
  --text-secondary: ${theme.colors.textSecondary};
  --accent: ${theme.colors.accent};
  --accent-text: ${theme.colors.accentText};
  --font-family: ${fontFamilies[theme.fontFamily] || fontFamilies.sans};
  --border-radius: ${borderRadii[theme.borderRadius] || '12px'};
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-family: var(--font-family);
  background-color: var(--bg-color);
  color: var(--text-primary);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 2.5rem 1rem 3rem 1rem;
}

.container {
  width: 100%;
  max-width: 580px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Header & Avatar */
.profile-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  width: 100%;
}

.avatar-wrapper {
  margin-bottom: 1.25rem;
  position: relative;
}

.avatar-img {
  width: 104px;
  height: 104px;
  border-radius: 9999px;
  object-fit: cover;
  border: 3px solid var(--card-border);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  font-size: 0.8125rem;
  font-weight: 600;
  border-radius: 9999px;
  background-color: var(--card-bg);
  color: var(--accent);
  border: 1px solid var(--card-border);
  margin-bottom: 0.75rem;
  letter-spacing: 0.025em;
}

.display-name {
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  margin-bottom: 0.25rem;
  color: var(--text-primary);
}

.handle {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  font-weight: 500;
  margin-bottom: 0.875rem;
}

.bio {
  font-size: 1rem;
  color: var(--text-secondary);
  max-width: 480px;
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.location {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-top: 0.5rem;
}

/* Links Section */
.links-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  margin-bottom: 2.5rem;
}

.link-card {
  display: flex;
  align-items: center;
  padding: 1rem 1.25rem;
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--border-radius);
  text-decoration: none;
  color: var(--text-primary);
  transition: transform 0.15s ease, background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
  position: relative;
  outline: none;
}

.link-card:hover, .link-card:focus-visible {
  background-color: var(--card-hover);
  border-color: var(--accent);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.link-card:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.link-card.highlighted {
  border-color: var(--accent);
  box-shadow: 0 0 0 1px var(--accent), 0 4px 14px rgba(0, 0, 0, 0.1);
}

.link-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: calc(var(--border-radius) * 0.7);
  background-color: rgba(255, 255, 255, 0.05);
  margin-right: 1rem;
  flex-shrink: 0;
  color: var(--accent);
}

.link-content {
  flex-grow: 1;
  min-width: 0;
}

.link-title {
  font-size: 1rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.link-subtitle {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 0.125rem;
}

.link-arrow {
  margin-left: 0.75rem;
  color: var(--text-secondary);
  flex-shrink: 0;
  transition: transform 0.15s ease, color 0.15s ease;
}

.link-card:hover .link-arrow, .link-card:focus-visible .link-arrow {
  color: var(--accent);
  transform: translateX(3px);
}

/* Footer */
footer {
  text-align: center;
  margin-top: auto;
  padding-top: 1.5rem;
  font-size: 0.8125rem;
  color: var(--text-secondary);
}

footer a {
  color: var(--accent);
  text-decoration: none;
  font-weight: 500;
}

footer a:hover {
  text-decoration: underline;
}

@media (prefers-reduced-motion: reduce) {
  .link-card, .link-arrow {
    transition: none !important;
    transform: none !important;
  }
}
`;
}

/**
 * Generates semantic HTML5 for the bio profile.
 */
export function generateIndexHtml(config: BioForgeConfig): string {
  const title = escapeHtml(config.seo.pageTitle || `${config.profile.displayName} — Links`);
  const description = escapeHtml(config.seo.metaDescription || config.profile.bio || '');
  const canonical = isSafeUrl(config.seo.canonicalUrl) ? escapeHtml(config.seo.canonicalUrl) : '';
  const displayName = escapeHtml(config.profile.displayName);
  const handle = escapeHtml(config.profile.handle);
  const bio = escapeHtml(config.profile.bio);
  const badge = escapeHtml(config.profile.professionBadge);
  const location = config.profile.location ? escapeHtml(config.profile.location) : '';
  const avatarUrl = config.profile.avatarUrl ? escapeHtml(config.profile.avatarUrl) : '';

  const activeLinks = config.links
    .filter((l) => l.active)
    .sort((a, b) => a.order - b.order);

  const linksHtml = activeLinks
    .map((link) => {
      const href = isSafeUrl(link.url) ? escapeHtml(link.url) : '#';
      const linkTitle = escapeHtml(link.title);
      const linkSubtitle = link.subtitle ? `<div class="link-subtitle">${escapeHtml(link.subtitle)}</div>` : '';
      const iconSvg = getPlatformSvgIcon(link.platform);
      const highlightClass = link.highlight ? ' highlighted' : '';

      return `      <a href="${href}" class="link-card${highlightClass}" target="_blank" rel="noopener noreferrer">
        <div class="link-icon" aria-hidden="true">${iconSvg}</div>
        <div class="link-content">
          <div class="link-title">${linkTitle}</div>
          ${linkSubtitle}
        </div>
        <div class="link-arrow" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </div>
      </a>`;
    })
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  ${canonical ? `<link rel="canonical" href="${canonical}">` : ''}
  <!-- Open Graph / Social Sharing -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  ${canonical ? `<meta property="og:url" content="${canonical}">` : ''}
  ${config.profile.avatarUrl ? `<meta property="og:image" content="${avatarUrl}">` : ''}
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  ${config.profile.avatarUrl ? `<meta name="twitter:image" content="${avatarUrl}">` : ''}
  <!-- Standalone Stylesheet -->
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main class="container">
    <header class="profile-header">
      ${
        avatarUrl
          ? `<div class="avatar-wrapper">
        <img class="avatar-img" src="${avatarUrl}" alt="${displayName}'s profile photo" loading="lazy">
      </div>`
          : ''
      }
      ${badge ? `<div class="badge">${badge}</div>` : ''}
      <h1 class="display-name">${displayName}</h1>
      ${handle ? `<p class="handle">${handle}</p>` : ''}
      ${bio ? `<p class="bio">${bio}</p>` : ''}
      ${
        location
          ? `<div class="location">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        <span>${location}</span>
      </div>`
          : ''
      }
    </header>

    <section class="links-wrapper" aria-label="Personal Links">
${linksHtml}
    </section>

    <footer>
      <p>Published with <a href="https://github.com/bioforge/bioforge-open-source" target="_blank" rel="noopener noreferrer">BioForge</a> — Open Source &amp; Self-Hosted</p>
    </footer>
  </main>
</body>
</html>`;
}

/**
 * Builds a 100% complete, standalone ZIP archive containing:
 * - index.html
 * - style.css
 * - README.md deployment instructions
 * - bioforge-profile.json configuration backup
 */
export async function buildStaticWebsiteZip(config: BioForgeConfig): Promise<Blob> {
  const zip = new JSZip();
  const theme = THEME_PRESETS[config.themeId] || THEME_PRESETS['obsidian-dark'];

  const htmlContent = generateIndexHtml(config);
  const cssContent = generateStandaloneCss(theme);
  const jsonBackup = JSON.stringify(config, null, 2);

  const deploymentReadme = `# Your Exported BioForge Website

Congratulations! This directory is a self-contained, high-performance static website generated with **BioForge**.

## Files Included
- \`index.html\`: Semantic, accessible HTML5 structure with custom SEO metadata.
- \`style.css\`: Pure standalone CSS matching your selected theme preset.
- \`bioforge-profile.json\`: Your profile configuration backup. You can re-import this into BioForge at any time.

## How to Host Your Website (Free Options)

### Option 1: Cloudflare Pages
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) -> Workers & Pages -> Create Application -> Pages -> Direct Upload.
2. Drag and drop this extracted folder.
3. Your site is live on a custom domain with free SSL in 30 seconds!

### Option 2: GitHub Pages
1. Create a new GitHub repository (e.g. \`username.github.io\`).
2. Push \`index.html\` and \`style.css\` into the repository.
3. Enable GitHub Pages in Repository Settings -> Pages.

### Option 3: Self-Hosted Nginx / Apache / Hostinger VPS
1. Upload these files to your web root (e.g., \`/var/www/html\` or your Hostinger public_html folder).
2. Point your domain to the server.

No database, no runtime servers, and zero ongoing subscription fees.
`;

  zip.file('index.html', htmlContent);
  zip.file('style.css', cssContent);
  zip.file('README.md', deploymentReadme);
  zip.file('bioforge-profile.json', jsonBackup);

  return await zip.generateAsync({ type: 'blob' });
}
