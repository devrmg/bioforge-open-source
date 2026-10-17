import React, { useState } from 'react';
import { BioForgeConfig } from '../types/profile';
import { THEME_PRESETS } from '../lib/constants';
import { getPlatformSvgIcon } from '../lib/staticGenerator';
import { Smartphone, Tablet, Monitor, ExternalLink, MapPin } from 'lucide-react';

interface PreviewPaneProps {
  config: BioForgeConfig;
}

type ViewportMode = 'mobile' | 'tablet' | 'desktop';

export const PreviewPane: React.FC<PreviewPaneProps> = ({ config }) => {
  const [viewport, setViewport] = useState<ViewportMode>('mobile');

  const theme = THEME_PRESETS[config.themeId] || THEME_PRESETS['obsidian-dark'];
  const activeLinks = config.links
    .filter((l) => l.active)
    .sort((a, b) => a.order - b.order);

  const fontFamilies = {
    sans: 'font-sans',
    serif: 'font-serif',
    mono: 'font-mono',
  };

  const borderRadii = {
    none: 'rounded-none',
    sm: 'rounded',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    full: 'rounded-full',
  };

  const getContainerWidth = () => {
    switch (viewport) {
      case 'mobile':
        return 'max-w-[380px]';
      case 'tablet':
        return 'max-w-[600px]';
      case 'desktop':
      default:
        return 'max-w-[720px]';
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Viewport Switcher Controls */}
      <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl mb-4 shadow-sm">
        <button
          type="button"
          onClick={() => setViewport('mobile')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            viewport === 'mobile'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
          title="Mobile Viewport (375px)"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Mobile</span>
        </button>

        <button
          type="button"
          onClick={() => setViewport('tablet')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            viewport === 'tablet'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
          title="Tablet Viewport (600px)"
        >
          <Tablet className="w-3.5 h-3.5" />
          <span>Tablet</span>
        </button>

        <button
          type="button"
          onClick={() => setViewport('desktop')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            viewport === 'desktop'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
          title="Desktop Viewport"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Full</span>
        </button>
      </div>

      {/* Frame Container */}
      <div
        className={`w-full transition-all duration-300 ${getContainerWidth()} ${
          viewport === 'mobile'
            ? 'border-[8px] border-slate-800 rounded-[38px] shadow-2xl overflow-hidden min-h-[640px]'
            : 'border border-slate-800 rounded-2xl shadow-xl overflow-hidden min-h-[560px]'
        }`}
        style={{ backgroundColor: theme.colors.bg }}
      >
        {/* Mobile top status bar / notch mockup */}
        {viewport === 'mobile' && (
          <div className="w-full flex justify-center pt-2 pb-1 bg-transparent">
            <div className="w-20 h-4 bg-slate-900 rounded-full" />
          </div>
        )}

        <div
          className={`p-6 sm:p-8 flex flex-col items-center justify-between min-h-full ${
            fontFamilies[theme.fontFamily]
          }`}
          style={{ color: theme.colors.textPrimary }}
        >
          {/* Profile Header */}
          <header className="text-center flex flex-col items-center w-full mb-6">
            {config.profile.avatarUrl ? (
              <div className="mb-4 relative">
                <img
                  src={config.profile.avatarUrl}
                  alt={`${config.profile.displayName}'s avatar`}
                  className="w-24 h-24 rounded-full object-cover shadow-lg border-2"
                  style={{ borderColor: theme.colors.cardBorder }}
                />
              </div>
            ) : null}

            {config.profile.professionBadge && (
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full mb-2.5 tracking-wide border shadow-sm"
                style={{
                  backgroundColor: theme.colors.card,
                  color: theme.colors.accent,
                  borderColor: theme.colors.cardBorder,
                }}
              >
                {config.profile.professionBadge}
              </span>
            )}

            <h1 className="text-2xl font-bold tracking-tight mb-1" style={{ color: theme.colors.textPrimary }}>
              {config.profile.displayName || 'Your Name'}
            </h1>

            {config.profile.handle && (
              <p className="text-xs font-medium mb-3" style={{ color: theme.colors.textSecondary }}>
                {config.profile.handle}
              </p>
            )}

            {config.profile.bio && (
              <p
                className="text-sm max-w-md mx-auto leading-relaxed mb-2"
                style={{ color: theme.colors.textSecondary }}
              >
                {config.profile.bio}
              </p>
            )}

            {config.profile.location && (
              <div
                className="flex items-center gap-1 text-xs mt-1"
                style={{ color: theme.colors.textSecondary }}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{config.profile.location}</span>
              </div>
            )}
          </header>

          {/* Links list */}
          <main className="w-full space-y-3 mb-8" aria-label="Links">
            {activeLinks.length === 0 ? (
              <div
                className="text-center py-8 px-4 rounded-xl border border-dashed text-xs"
                style={{
                  borderColor: theme.colors.cardBorder,
                  color: theme.colors.textSecondary,
                }}
              >
                No active links currently visible. Add or enable links in the editor.
              </div>
            ) : (
              activeLinks.map((link) => {
                const iconSvg = getPlatformSvgIcon(link.platform);

                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center p-3.5 border transition-all duration-150 group ${
                      borderRadii[theme.borderRadius]
                    } ${link.highlight ? 'ring-1' : ''}`}
                    style={{
                      backgroundColor: theme.colors.card,
                      borderColor: link.highlight ? theme.colors.accent : theme.colors.cardBorder,
                      color: theme.colors.textPrimary,
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mr-3.5 flex-shrink-0"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        color: theme.colors.accent,
                      }}
                      dangerouslySetInnerHTML={{ __html: iconSvg }}
                    />

                    <div className="flex-grow min-w-0">
                      <div className="text-sm font-semibold truncate leading-tight">
                        {link.title}
                      </div>
                      {link.subtitle && (
                        <div
                          className="text-xs truncate mt-0.5"
                          style={{ color: theme.colors.textSecondary }}
                        >
                          {link.subtitle}
                        </div>
                      )}
                    </div>

                    <ExternalLink
                      className="w-4 h-4 ml-2 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
                      style={{ color: theme.colors.accent }}
                    />
                  </a>
                );
              })
            )}
          </main>

          {/* Footer watermark */}
          <footer className="text-center text-[11px] pt-4" style={{ color: theme.colors.textSecondary }}>
            <span>Created with </span>
            <span className="font-semibold" style={{ color: theme.colors.accent }}>
              BioForge
            </span>
            <span> &bull; Open Source</span>
          </footer>
        </div>
      </div>
    </div>
  );
};
