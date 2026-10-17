import React from 'react';
import { Layers, Smartphone, Download, Globe, ShieldCheck, Zap, HardDrive, Server } from 'lucide-react';

interface HowItWorksPageProps {
  onSelectTab: (tab: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onSelectTab }) => {
  const steps = [
    {
      num: '01',
      title: 'Compose Your Identity in the Studio Editor',
      description:
        'Set your display name, custom avatar, bio, and add your key links. Choose from verified social platform presets or define custom web links with safe protocols.',
      icon: Layers,
    },
    {
      num: '02',
      title: 'Test Responsiveness & Accessible Color Contrast',
      description:
        'Audit your layout in real time using the device frame. Switch between phone (375px), tablet, and desktop viewports. All themes meet WCAG AA or AAA color contrast.',
      icon: Smartphone,
    },
    {
      num: '03',
      title: 'Generate a Pure Static Site ZIP Bundle',
      description:
        'Click Export to generate index.html, style.css, and SVG icons directly in your browser using JSZip. No build servers, no external API calls, and no data tracking.',
      icon: Download,
    },
    {
      num: '04',
      title: 'Publish to Your Own Domain or VPS',
      description:
        'Drag the exported files to Cloudflare Pages, GitHub Pages, or self-host via Docker on Hostinger VPS. You own the code and your visitor data completely.',
      icon: Globe,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Hero section */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-500/20">
          Static Architecture Contract
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
          How BioForge Works
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Traditional link-in-bio services lock your audience behind dynamic tracking redirects and monthly subscription fees. BioForge produces a high-performance static website that you own outright.
        </p>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="text-5xl font-mono font-black text-slate-800/80 absolute right-4 top-4 select-none">
                {step.num}
              </div>
              <div className="relative z-10 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Architecture Deep Dive */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Server className="w-5 h-5 text-emerald-400" />
          The Technical Advantage of Zero Database
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Zap className="w-4 h-4 text-amber-400" />
              Sub-50ms Global TTFB
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Static HTML/CSS files are served directly from edge CDN cache. No database lookups, no cold starts, and zero runtime latency for your visitors.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Immune to SQL Injection
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Without a live database backend, server credentials, or active endpoints, your published bio page has zero database attack surface.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <HardDrive className="w-4 h-4 text-sky-400" />
              Portable Backup Files
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your profile is stored as a simple JSON document. You can check it into git, store it in your notes, or transfer it across computers in seconds.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs text-slate-400">
            Ready to craft your link in bio? Try the editor with zero sign-up.
          </span>
          <button
            type="button"
            onClick={() => onSelectTab('editor')}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-colors"
          >
            Open Studio Editor
          </button>
        </div>
      </div>
    </div>
  );
};
