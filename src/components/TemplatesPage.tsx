import React from 'react';
import { BioForgeConfig } from '../types/profile';
import { THEME_PRESETS } from '../lib/constants';
import { Sparkles, ArrowRight, Code, Music, Video, PenTool } from 'lucide-react';

interface TemplatesPageProps {
  onApplyTemplate: (templateConfig: Partial<BioForgeConfig>) => void;
  onSelectTab: (tab: string) => void;
}

export const TemplatesPage: React.FC<TemplatesPageProps> = ({ onApplyTemplate, onSelectTab }) => {
  const templates = [
    {
      id: 'developer',
      category: 'Software & Architecture',
      icon: Code,
      themeId: 'obsidian-dark' as const,
      displayName: 'Maya Patel',
      handle: '@mayapatel',
      badge: 'Distributed Systems & Rust',
      bio: 'Staff engineer building low-latency stream processing engines. Author of 3 open-source CLI tools.',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      sampleLinks: ['GitHub Repositories', 'Technical Blog', 'Weekly System Design Letter', 'X / Twitter'],
    },
    {
      id: 'music',
      category: 'Audio & Music Production',
      icon: Music,
      themeId: 'retro-sunset' as const,
      displayName: 'Julian Rivers',
      handle: '@julianrivers',
      badge: 'Synthesist & Film Composer',
      bio: 'Hardware modular synth performer and cinematic sound designer. Scoring independent indie games.',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      sampleLinks: ['Stream on Spotify', 'Bandcamp Discography', 'SoundCloud Live Sets', 'Tour Dates & Tickets'],
    },
    {
      id: 'creator',
      category: 'Content Creation & Video',
      icon: Video,
      themeId: 'electric-indigo' as const,
      displayName: 'Samira Chen',
      handle: '@samiracreates',
      badge: 'Visual Storyteller & Educator',
      bio: 'Documenting creative workflows, desk setups, and mechanical keyboards for a community of 80k makers.',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      sampleLinks: ['YouTube Studio Channel', 'Twitch Live Streams', 'Presets & LUTs Store', 'Discord Community'],
    },
    {
      id: 'editorial',
      category: 'Writing & Research',
      icon: PenTool,
      themeId: 'warm-editorial' as const,
      displayName: 'Arthur Vance',
      handle: '@arthurvance',
      badge: 'Essayist & Tech Historian',
      bio: 'Investigating the evolution of early computing and the preservation of digital artifacts.',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      sampleLinks: ['Read Weekly Dispatch', 'Archived Research Papers', 'Published Books', 'Email Queries'],
    },
  ];

  const handleApply = (tmpl: typeof templates[0]) => {
    if (window.confirm(`Load the "${tmpl.displayName}" template into the editor? This will update your profile text, links, and theme preset.`)) {
      onApplyTemplate({
        themeId: tmpl.themeId,
        profile: {
          displayName: tmpl.displayName,
          handle: tmpl.handle,
          professionBadge: tmpl.badge,
          bio: tmpl.bio,
          avatarUrl: tmpl.avatarUrl,
        },
      });
      onSelectTab('editor');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-3">
          Curated Design Presets
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Start from a tailored blueprint suited to your craft. Each preset combines accessible typography, balanced color harmonies, and purpose-matched links.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((tmpl) => {
          const Icon = tmpl.icon;
          const themePreset = THEME_PRESETS[tmpl.themeId];

          return (
            <div
              key={tmpl.id}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-slate-800 text-emerald-400 border border-slate-700/60">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      {tmpl.category}
                    </span>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60">
                    {themePreset?.name}
                  </span>
                </div>

                <div className="flex items-center gap-3.5 mb-4">
                  <img
                    src={tmpl.avatarUrl}
                    alt={tmpl.displayName}
                    className="w-14 h-14 rounded-full object-cover border-2 border-slate-700"
                  />
                  <div>
                    <h3 className="text-base font-bold text-white">{tmpl.displayName}</h3>
                    <p className="text-xs text-emerald-400 font-medium">{tmpl.badge}</p>
                    <p className="text-xs text-slate-400">{tmpl.handle}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mb-5 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  {tmpl.bio}
                </p>

                <div className="space-y-1.5 mb-6">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Included Links
                  </div>
                  {tmpl.sampleLinks.map((linkName, idx) => (
                    <div
                      key={idx}
                      className="text-xs text-slate-400 bg-slate-950/40 px-3 py-1.5 rounded-lg border border-slate-800/50 flex items-center justify-between"
                    >
                      <span>{linkName}</span>
                      <ArrowRight className="w-3 h-3 text-slate-600" />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleApply(tmpl)}
                className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-md transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Load This Template</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
