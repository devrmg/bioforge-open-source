import React, { useState } from 'react';
import { SocialLink, PlatformType } from '../types/profile';
import { PLATFORMS } from '../lib/constants';
import { isSafeUrl } from '../lib/validation';
import {
  Link2,
  Plus,
  ArrowUp,
  ArrowDown,
  Trash2,
  Star,
  Eye,
  EyeOff,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface LinksEditorProps {
  links: SocialLink[];
  onChange: (links: SocialLink[]) => void;
}

export const LinksEditor: React.FC<LinksEditorProps> = ({ links, onChange }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType>('website');
  const [customTitle, setCustomTitle] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [customSubtitle, setCustomSubtitle] = useState('');
  const [highlightNew, setHighlightNew] = useState(false);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [expandedLinkId, setExpandedLinkId] = useState<string | null>(null);
  const [ariaAnnouncement, setAriaAnnouncement] = useState('');

  const sortedLinks = [...links].sort((a, b) => a.order - b.order);

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSafeUrl(customUrl)) {
      setUrlError('Please enter a valid URL beginning with https://, http:// or mailto:');
      return;
    }

    const platformDef = PLATFORMS[selectedPlatform];
    const newLink: SocialLink = {
      id: `link-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      platform: selectedPlatform,
      title: customTitle.trim() || platformDef.defaultTitle,
      url: customUrl.trim(),
      subtitle: customSubtitle.trim() || undefined,
      highlight: highlightNew,
      active: true,
      order: links.length,
    };

    onChange([...links, newLink]);
    setCustomTitle('');
    setCustomUrl('');
    setCustomSubtitle('');
    setHighlightNew(false);
    setUrlError(null);
    setShowAddModal(false);
    setAriaAnnouncement(`Added new link: ${newLink.title}`);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === sortedLinks.length - 1)
    ) {
      return;
    }

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const reordered = [...sortedLinks];
    const item = reordered[index];
    reordered[index] = reordered[targetIndex];
    reordered[targetIndex] = item;

    // re-assign order indices
    const updated = reordered.map((link, idx) => ({ ...link, order: idx }));
    onChange(updated);
    setAriaAnnouncement(`Moved ${item.title} ${direction}`);
  };

  const handleToggleActive = (id: string) => {
    const updated = links.map((link) =>
      link.id === id ? { ...link, active: !link.active } : link
    );
    onChange(updated);
  };

  const handleToggleHighlight = (id: string) => {
    const updated = links.map((link) =>
      link.id === id ? { ...link, highlight: !link.highlight } : link
    );
    onChange(updated);
  };

  const handleDelete = (id: string) => {
    const item = links.find((l) => l.id === id);
    const updated = links
      .filter((link) => link.id !== id)
      .map((link, idx) => ({ ...link, order: idx }));
    onChange(updated);
    setAriaAnnouncement(`Removed link: ${item?.title || ''}`);
  };

  const handleUpdateLink = (id: string, partial: Partial<SocialLink>) => {
    const updated = links.map((link) => (link.id === id ? { ...link, ...partial } : link));
    onChange(updated);
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-6">
      {/* Screen reader live announcements */}
      <div className="sr-only" aria-live="polite">
        {ariaAnnouncement}
      </div>

      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div>
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <Link2 className="w-4 h-4 text-emerald-400" />
            Social &amp; Destination Links
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Add your social networks, portfolios, music releases, or newsletters. Reorder with accessible controls.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setShowAddModal(true);
            setUrlError(null);
          }}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-500 rounded-lg shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Add Link</span>
        </button>
      </div>

      {/* Add Link Form Modal / Dropdown */}
      {showAddModal && (
        <form
          onSubmit={handleAddLink}
          className="bg-slate-950 border border-emerald-500/30 rounded-xl p-4 sm:p-5 space-y-4 shadow-xl"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-sm font-semibold text-white">Create New Destination Link</h3>
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="platform-select" className="block text-xs font-medium text-slate-300 mb-1">
                Platform Preset
              </label>
              <select
                id="platform-select"
                value={selectedPlatform}
                onChange={(e) => {
                  const p = e.target.value as PlatformType;
                  setSelectedPlatform(p);
                  if (!customTitle) setCustomTitle(PLATFORMS[p].defaultTitle);
                }}
                className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              >
                {Object.entries(PLATFORMS).map(([key, def]) => (
                  <option key={key} value={key}>
                    {def.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="custom-title" className="block text-xs font-medium text-slate-300 mb-1">
                Link Label / Title <span className="text-emerald-400">*</span>
              </label>
              <input
                id="custom-title"
                type="text"
                required
                maxLength={100}
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder={PLATFORMS[selectedPlatform].defaultTitle}
                className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="custom-url" className="block text-xs font-medium text-slate-300 mb-1">
              Destination URL <span className="text-emerald-400">*</span>
            </label>
            <input
              id="custom-url"
              type="text"
              required
              value={customUrl}
              onChange={(e) => {
                setCustomUrl(e.target.value);
                setUrlError(null);
              }}
              placeholder={PLATFORMS[selectedPlatform].placeholder}
              className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            {urlError && (
              <p className="flex items-center gap-1 text-xs text-rose-400 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{urlError}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="custom-subtitle" className="block text-xs font-medium text-slate-300 mb-1">
              Subtitle / Description (Optional)
            </label>
            <input
              id="custom-subtitle"
              type="text"
              maxLength={140}
              value={customSubtitle}
              onChange={(e) => setCustomSubtitle(e.target.value)}
              placeholder="e.g. Free weekly engineering essays & code samples"
              className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={highlightNew}
                onChange={(e) => setHighlightNew(e.target.checked)}
                className="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-emerald-500"
              />
              <span>Highlight this link with emphasis border</span>
            </label>

            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
            >
              Save Link
            </button>
          </div>
        </form>
      )}

      {/* Links List */}
      {sortedLinks.length === 0 ? (
        <div className="text-center py-10 px-4 border-2 border-dashed border-slate-800 rounded-xl">
          <Link2 className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-300">No links added yet</p>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Click &quot;Add Link&quot; above to create your first link, social profile, or music stream.
          </p>
        </div>
      ) : (
        <div className="space-y-3" role="list" aria-label="Social links list">
          {sortedLinks.map((link, index) => {
            const isFirst = index === 0;
            const isLast = index === sortedLinks.length - 1;
            const isExpanded = expandedLinkId === link.id;

            return (
              <div
                key={link.id}
                role="listitem"
                className={`border rounded-xl transition-all ${
                  link.active
                    ? link.highlight
                      ? 'bg-slate-900/90 border-emerald-500/40 shadow-sm'
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                    : 'bg-slate-950/60 border-slate-900 opacity-60'
                }`}
              >
                <div className="p-3.5 flex items-center justify-between gap-3">
                  {/* Left: Reorder Controls */}
                  <div className="flex flex-col space-y-1">
                    <button
                      type="button"
                      disabled={isFirst}
                      onClick={() => handleMove(index, 'up')}
                      aria-label={`Move ${link.title} up`}
                      className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={isLast}
                      onClick={() => handleMove(index, 'down')}
                      aria-label={`Move ${link.title} down`}
                      className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Center: Details */}
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/50 uppercase">
                        {link.platform}
                      </span>
                      <h4 className="text-sm font-semibold text-white truncate">
                        {link.title}
                      </h4>
                      {link.highlight && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] text-amber-300 bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-800/40">
                          <Star className="w-2.5 h-2.5 fill-current" />
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400 truncate">
                      <span className="truncate">{link.url}</span>
                      {link.subtitle && (
                        <span className="text-slate-500 hidden sm:inline">&bull; {link.subtitle}</span>
                      )}
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center space-x-1 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => handleToggleHighlight(link.id)}
                      aria-label={link.highlight ? 'Remove highlight' : 'Highlight link'}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        link.highlight
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                          : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      }`}
                      title={link.highlight ? 'Featured link' : 'Set as featured'}
                    >
                      <Star className={`w-4 h-4 ${link.highlight ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleActive(link.id)}
                      aria-label={link.active ? 'Hide link' : 'Show link'}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        link.active
                          ? 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                          : 'bg-slate-800 border-slate-700 text-slate-500'
                      }`}
                      title={link.active ? 'Link visible' : 'Link hidden'}
                    >
                      {link.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setExpandedLinkId(isExpanded ? null : link.id)}
                      aria-label="Edit link details"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      title="Edit link details"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(link.id)}
                      aria-label={`Delete ${link.title}`}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                      title="Delete link"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Inline Edit Panel when expanded */}
                {isExpanded && (
                  <div className="p-4 border-t border-slate-800/80 bg-slate-950/70 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={link.title}
                          onChange={(e) => handleUpdateLink(link.id, { title: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          Destination URL
                        </label>
                        <input
                          type="text"
                          value={link.url}
                          onChange={(e) => handleUpdateLink(link.id, { url: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        value={link.subtitle || ''}
                        onChange={(e) => handleUpdateLink(link.id, { subtitle: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
