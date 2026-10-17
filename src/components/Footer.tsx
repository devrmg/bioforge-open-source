import React from 'react';
import { ShieldCheck, HardDrive, Server } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Brand statement */}
        <div className="md:col-span-2">
          <div className="flex items-center space-x-2 text-white font-semibold mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-base tracking-tight">BioForge — Self-Hosted Link in Bio</span>
          </div>
          <p className="text-sm text-slate-400 max-w-md leading-relaxed mb-4">
            An open-source static site generator designed for creators, freelancers, and artists. Build your branded landing hub, export pure HTML/CSS, and host on your own domain with zero subscription lock-in.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded border border-slate-800 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              DATABASE_MODE=local
            </span>
            <span className="inline-flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded border border-slate-800 text-slate-300">
              <HardDrive className="w-3.5 h-3.5 text-sky-400" />
              Browser-only persistence
            </span>
            <span className="inline-flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded border border-slate-800 text-slate-300">
              <Server className="w-3.5 h-3.5 text-indigo-400" />
              Docker &amp; Hostinger ready
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">Product</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <button onClick={() => onSelectTab('editor')} className="hover:text-white transition-colors">
                Studio Editor
              </button>
            </li>
            <li>
              <button onClick={() => onSelectTab('templates')} className="hover:text-white transition-colors">
                Theme Presets
              </button>
            </li>
            <li>
              <button onClick={() => onSelectTab('how-it-works')} className="hover:text-white transition-colors">
                How It Works
              </button>
            </li>
            <li>
              <button onClick={() => onSelectTab('deploy')} className="hover:text-white transition-colors">
                Hostinger VPS Guide
              </button>
            </li>
          </ul>
        </div>

        {/* Documentation & Legal */}
        <div>
          <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">Ethics &amp; Privacy</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <button onClick={() => onSelectTab('privacy')} className="hover:text-white transition-colors">
                Privacy Disclosure
              </button>
            </li>
            <li>
              <button onClick={() => onSelectTab('faq')} className="hover:text-white transition-colors">
                Frequently Asked Questions
              </button>
            </li>
            <li>
              <a
                href="https://github.com/bioforge/bioforge-open-source/blob/main/LICENSE-NOTICE.md"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                MIT License
              </a>
            </li>
            <li>
              <a
                href="https://github.com/bioforge/bioforge-open-source"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                GitHub Repository
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Honest disclosure bar */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>
          &copy; {new Date().getFullYear()} BioForge. Free open-source software under the MIT License. No third-party cookies or telemetry.
        </p>
        <p className="text-slate-500 text-center md:text-right max-w-xl">
          <span className="font-medium text-slate-400">Notice on Hosting:</span> Exported profiles are static files that you control. When deploying to Hostinger VPS via the one-click template button, hosting accounts are purchased directly from Hostinger.
        </p>
      </div>
    </footer>
  );
};
