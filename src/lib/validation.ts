import { z } from 'zod';
import { BioForgeConfig, PlatformType, ThemeId } from '../types/profile';

/**
 * Validates whether a URL is safe to render as a link.
 * Strictly prevents javascript:, data:text/html, vbscript:, and relative malicious vectors.
 */
export function isSafeUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();

  // Allow mailto:
  if (trimmed.toLowerCase().startsWith('mailto:')) {
    const emailPart = trimmed.substring(7);
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailPart);
  }

  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Escapes HTML characters for defensive static file export and raw rendering.
 */
export function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export const platformEnum = z.enum([
  'github',
  'twitter',
  'instagram',
  'youtube',
  'linkedin',
  'spotify',
  'soundcloud',
  'twitch',
  'discord',
  'tiktok',
  'substack',
  'email',
  'website',
]) as z.ZodType<PlatformType>;

export const themeIdEnum = z.enum([
  'obsidian-dark',
  'clean-minimal',
  'cyber-emerald',
  'warm-editorial',
  'retro-sunset',
  'electric-indigo',
]) as z.ZodType<ThemeId>;

export const socialLinkSchema = z.object({
  id: z.string().min(1),
  platform: platformEnum,
  title: z.string().min(1, 'Title is required').max(100, 'Title cannot exceed 100 characters'),
  url: z.string().refine((val) => isSafeUrl(val), {
    message: 'Must be a valid web URL (https://) or email (mailto:)',
  }),
  subtitle: z.string().max(160, 'Subtitle cannot exceed 160 characters').optional(),
  highlight: z.boolean().optional(),
  active: z.boolean(),
  order: z.number().int(),
});

export const profileDataSchema = z.object({
  displayName: z.string().min(1, 'Name is required').max(80, 'Name cannot exceed 80 characters'),
  handle: z.string().max(40, 'Handle cannot exceed 40 characters'),
  bio: z.string().max(400, 'Bio cannot exceed 400 characters'),
  avatarUrl: z.string().max(2000000, 'Avatar payload is too large'), // Allow data URLs up to ~2MB
  professionBadge: z.string().max(60, 'Badge cannot exceed 60 characters'),
  location: z.string().max(60).optional(),
});

export const seoConfigSchema = z.object({
  pageTitle: z.string().min(1, 'Page title is required').max(120),
  metaDescription: z.string().max(250),
  canonicalUrl: z.string().refine((val) => !val || isSafeUrl(val), {
    message: 'Canonical URL must be a valid https:// URL',
  }),
  ogImage: z.string().optional(),
});

export const bioForgeConfigSchema = z.object({
  version: z.literal('1.0'),
  profile: profileDataSchema,
  links: z.array(socialLinkSchema),
  themeId: themeIdEnum,
  seo: seoConfigSchema,
  lastUpdated: z.string(),
});

export type ValidatedConfig = z.infer<typeof bioForgeConfigSchema>;

export function validateConfig(data: unknown): { success: true; data: BioForgeConfig } | { success: false; errors: string[] } {
  const result = bioForgeConfigSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data as BioForgeConfig };
  }
  const errors = result.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`);
  return { success: false, errors };
}
