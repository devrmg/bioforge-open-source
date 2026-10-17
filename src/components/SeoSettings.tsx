import React from 'react';
import { SeoConfig, ProfileData } from '../types/profile';
import { Globe, Share2, AlertCircle, Info } from 'lucide-react';
import { isSafeUrl } from '../lib/validation';

interface SeoSettingsProps {
  seo: SeoConfig;
  profile: ProfileData;
  onChange: (updated: SeoConfig) => void;
}

export const SeoSettings: React.FC<SeoSettingsProps> = ({ seo, profile, onChange }) => {
  const isCanonicalValid = !seo.canonicalUrl || isSafeUrl(seo.canonicalUrl);

  const displayTitle = seo.pageTitle || `${profile.displayName} — Personal Links`;
  const displayDesc = seo.metaDescription || profile.bio || 'Check out my verified links, portfolio, and current projects.';
  const displayHost = seo.canonicalUrl ? (isSafeUrl(seo.canonicalUrl) ? new URL(seo.canonicalUrl).hostname : 'yourdomain.com') : 'yourdomain.com';

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div>
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400" />
            Custom Search &amp; Social Metadata
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure how your bio page appears on Google search results and social previews.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Fields */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="seo-title" className="block text-xs font-medium text-slate-300">
                Page Title <span className="text-emerald-400">*</span>
              </label>
              <span className="text-[11px] text-slate-500 font-mono">
                {seo.pageTitle.length}/100
              </span>
            </div>
            <input
              id="seo-title"
              type="text"
              required
              maxLength={100}
              value={seo.pageTitle}
              onChange={(e) => onChange({ ...seo, pageTitle: e.target.value })}
              placeholder="e.g. Alex Morgan — Systems Architect & Sound Designer"
              className="w-full px-3.5 py-2 text-sm bg-slate-950/80 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="seo-description" className="block text-xs font-medium text-slate-300">
                Meta Description
              </label>
              <span className="text-[11px] text-slate-500 font-mono">
                {seo.metaDescription.length}/200
              </span>
            </div>
            <textarea
              id="seo-description"
              rows={3}
              maxLength={200}
              value={seo.metaDescription}
              onChange={(e) => onChange({ ...seo, metaDescription: e.target.value })}
              placeholder="A concise summary for search engines and social cards (150-160 characters recommended)."
              className="w-full px-3.5 py-2 text-sm bg-slate-950/80 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors resize-none"
            />
          </div>

          <div>
            <label htmlFor="seo-canonical" className="block text-xs font-medium text-slate-300 mb-1.5">
              Canonical URL (Where this site will be published)
            </label>
            <input
              id="seo-canonical"
              type="text"
              value={seo.canonicalUrl}
              onChange={(e) => onChange({ ...seo, canonicalUrl: e.target.value })}
              placeholder="https://yourcustomdomain.com"
              className="w-full px-3.5 py-2 text-sm bg-slate-950/80 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
            {!isCanonicalValid && (
              <p className="flex items-center gap-1 text-xs text-rose-400 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Must be a valid web URL starting with https:// or http://</span>
              </p>
            )}
            <p className="text-[11px] text-slate-500 mt-1">
              Used in the QR code generator and static Open Graph tags.
            </p>
          </div>
        </div>

        {/* Live Social Card Preview */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-300 flex items-center gap-1.5">
            <Share2 className="w-3.5 h-3.5 text-emerald-400" />
            Social Share Preview (Open Graph Card)
          </label>

          <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-lg p-3">
            <div className="border border-slate-800/80 rounded-lg overflow-hidden bg-slate-900/60">
              {profile.avatarUrl ? (
                <div className="h-32 bg-slate-800/60 flex items-center justify-center overflow-hidden relative">
                  <img
                    src={profile.avatarUrl}
                    alt="Social card banner"
                    className="w-full h-full object-cover filter blur-sm scale-110 opacity-40 absolute"
                  />
                  <img
                    src={profile.avatarUrl}
                    alt="Social card avatar"
                    className="w-16 h-16 rounded-full object-cover border-2 border-slate-700 relative z-10 shadow-lg"
                  />
                </div>
              ) : (
                <div className="h-28 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center text-slate-500">
                  <Globe className="w-10 h-10 opacity-30" />
                </div>
              )}

              <div className="p-3 space-y-1">
                <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
                  {displayHost}
                </div>
                <h4 className="text-sm font-semibold text-white leading-snug line-clamp-1">
                  {displayTitle}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {displayDesc}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 mt-2.5 text-[11px] text-slate-500">
              <Info className="w-3.5 h-3.5 text-slate-400" />
              <span>Simulated preview for iMessage, Twitter/X, and Discord sharing cards.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
