import { describe, it, expect } from 'vitest';
import { isSafeUrl, escapeHtml, validateConfig } from '../lib/validation';
import { DEFAULT_CONFIG } from '../lib/constants';

describe('Validation and Security Helpers', () => {
  describe('isSafeUrl', () => {
    it('approves safe https and http links', () => {
      expect(isSafeUrl('https://example.com')).toBe(true);
      expect(isSafeUrl('http://mysite.org/portfolio')).toBe(true);
      expect(isSafeUrl('https://sub.domain.co.uk/path?query=1#hash')).toBe(true);
    });

    it('approves valid mailto links', () => {
      expect(isSafeUrl('mailto:creator@domain.com')).toBe(true);
    });

    it('strictly rejects malicious schemes like javascript: and data:', () => {
      expect(isSafeUrl('javascript:alert(1)')).toBe(false);
      expect(isSafeUrl('JAVASCRIPT:alert(1)')).toBe(false);
      expect(isSafeUrl('data:text/html,<script>alert(1)</script>')).toBe(false);
      expect(isSafeUrl('vbscript:msgbox(1)')).toBe(false);
      expect(isSafeUrl('')).toBe(false);
      expect(isSafeUrl('relative/path')).toBe(false);
    });
  });

  describe('escapeHtml', () => {
    it('escapes dangerous HTML characters', () => {
      const input = '<script>alert("xss") & \'test\'</script>';
      const escaped = escapeHtml(input);
      expect(escaped).toBe('&lt;script&gt;alert(&quot;xss&quot;) &amp; &#39;test&#39;&lt;/script&gt;');
      expect(escaped).not.toContain('<script>');
    });

    it('handles empty strings cleanly', () => {
      expect(escapeHtml('')).toBe('');
    });
  });

  describe('validateConfig', () => {
    it('validates default demo configuration successfully', () => {
      const res = validateConfig(DEFAULT_CONFIG);
      expect(res.success).toBe(true);
      if (res.success) {
        expect(res.data.profile.displayName).toBe(DEFAULT_CONFIG.profile.displayName);
      }
    });

    it('rejects corrupt configurations missing required fields', () => {
      const corrupt = { version: '1.0', profile: {} };
      const res = validateConfig(corrupt);
      expect(res.success).toBe(false);
      if (!res.success) {
        expect(res.errors.length).toBeGreaterThan(0);
      }
    });

    it('rejects links with unsafe protocols', () => {
      const badLinkConfig = {
        ...DEFAULT_CONFIG,
        links: [
          {
            id: 'bad-1',
            platform: 'website',
            title: 'Hacked Link',
            url: 'javascript:alert("pwned")',
            active: true,
            order: 0,
          },
        ],
      };
      const res = validateConfig(badLinkConfig);
      expect(res.success).toBe(false);
    });
  });
});
