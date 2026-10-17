import { describe, it, expect } from 'vitest';
import {
  generateIndexHtml,
  generateStandaloneCss,
  buildStaticWebsiteZip,
  getPlatformSvgIcon,
} from '../lib/staticGenerator';
import { DEFAULT_CONFIG, THEME_PRESETS } from '../lib/constants';

describe('Static Site Generator', () => {
  it('generates semantic HTML5 with title, open graph, and profile links', () => {
    const html = generateIndexHtml(DEFAULT_CONFIG);

    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('<html lang="en">');
    expect(html).toContain(DEFAULT_CONFIG.profile.displayName);
    expect(html).toContain(DEFAULT_CONFIG.profile.handle);
    expect(html).toContain('rel="stylesheet" href="style.css"');
    expect(html).toContain('og:title');
    expect(html).toContain('Personal Technical Blog');
  });

  it('generates clean standalone CSS matching theme tokens', () => {
    const theme = THEME_PRESETS['obsidian-dark'];
    const css = generateStandaloneCss(theme);

    expect(css).toContain(`--bg-color: ${theme.colors.bg}`);
    expect(css).toContain(`--card-bg: ${theme.colors.card}`);
    expect(css).toContain(`--accent: ${theme.colors.accent}`);
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
  });

  it('provides inline SVG icon for social platforms', () => {
    const githubSvg = getPlatformSvgIcon('github');
    expect(githubSvg).toContain('<svg');
    expect(githubSvg).toContain('</svg>');

    const spotifySvg = getPlatformSvgIcon('spotify');
    expect(spotifySvg).toContain('<svg');
  });

  it('builds a complete static zip archive with index.html, style.css, and README.md', async () => {
    const blob = await buildStaticWebsiteZip(DEFAULT_CONFIG);
    expect(blob).toBeDefined();
    expect(blob.size).toBeGreaterThan(500);
    expect(blob.type).toBe('application/zip');
  });
});
