import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Does BioForge require a live database or user account?',
      a: 'No. BioForge is designed to run entirely offline or in local mode (DATABASE_MODE=local). You do not need to register an account, configure Supabase or PostgreSQL credentials, or connect to third-party databases. All edits stay right inside your browser session.',
    },
    {
      q: 'How do I host the exported static bio site?',
      a: 'When you click "Export Site" and download the Static ZIP package, you receive index.html and style.css. You can drag and drop these files to Cloudflare Pages (free), GitHub Pages (free), Netlify (free), or upload them to your web root on any Hostinger VPS or web server. No Node.js runtime or server dependencies are required.',
    },
    {
      q: 'Will clearing my browser cache or cookies delete my bio profile?',
      a: 'Because BioForge saves your working profile in browser localStorage, clearing your browser data or opening in incognito mode will reset the editor to the default demo state. To prevent data loss, click "Export Site -> JSON Backup / Restore" and save a copy of your bioforge-backup.json file.',
    },
    {
      q: 'Can I self-host the BioForge editor on my own Hostinger VPS?',
      a: 'Yes! BioForge includes a production-tested multi-stage Dockerfile and docker-compose.yml that serves the SPA using a lightweight Nginx web server on port 8080. You can deploy it to your Hostinger VPS in under two minutes using our one-click Compose deployment button or Docker CLI.',
    },
    {
      q: 'Is there any telemetry, visitor tracking, or external font call in the exported page?',
      a: 'None. The exported HTML uses inline or local CSS with native system and safe fonts, inline vector SVGs for all platform icons, and zero tracking pixels. Your visitors are never tracked.',
    },
    {
      q: 'How does BioForge compare to commercial link-in-bio services?',
      a: 'Hosted commercial platforms charge recurring monthly fees ($5-$25/month) and intercept your visitors via redirect tracking domains. BioForge is 100% free open-source software under the MIT license, giving you full data sovereignty and direct domain ownership.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3 border border-emerald-500/20">
          Knowledge Base
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
          Frequently Asked Questions
        </h1>
        <p className="text-slate-400 text-sm">
          Everything you need to know about self-hosting, data persistence, and static website export.
        </p>
      </div>

      <div className="space-y-3" role="region" aria-label="FAQ Accordion">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <span className="text-sm sm:text-base font-semibold text-white">
                  {faq.q}
                </span>
                <span className="p-1 rounded-md text-slate-400 bg-slate-800/80 flex-shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
