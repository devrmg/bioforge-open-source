export type PlatformType =
  | 'github'
  | 'twitter'
  | 'instagram'
  | 'youtube'
  | 'linkedin'
  | 'spotify'
  | 'soundcloud'
  | 'twitch'
  | 'discord'
  | 'tiktok'
  | 'substack'
  | 'email'
  | 'website';

export interface SocialLink {
  id: string;
  platform: PlatformType;
  title: string;
  url: string;
  subtitle?: string;
  highlight?: boolean;
  active: boolean;
  order: number;
}

export type ThemeId =
  | 'obsidian-dark'
  | 'clean-minimal'
  | 'cyber-emerald'
  | 'warm-editorial'
  | 'retro-sunset'
  | 'electric-indigo';

export interface ThemePreset {
  id: ThemeId;
  name: string;
  description: string;
  authorNote: string;
  colors: {
    bg: string;
    bgStyle?: string;
    card: string;
    cardHover: string;
    cardBorder: string;
    textPrimary: string;
    textSecondary: string;
    accent: string;
    accentText: string;
  };
  fontFamily: 'sans' | 'serif' | 'mono';
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

export interface ProfileData {
  displayName: string;
  handle: string;
  bio: string;
  avatarUrl: string;
  professionBadge: string;
  location?: string;
}

export interface SeoConfig {
  pageTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  ogImage?: string;
}

export interface BioForgeConfig {
  version: '1.0';
  profile: ProfileData;
  links: SocialLink[];
  themeId: ThemeId;
  seo: SeoConfig;
  lastUpdated: string;
}
