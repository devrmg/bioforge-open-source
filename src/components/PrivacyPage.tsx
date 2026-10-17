import React from 'react';
import { ShieldCheck, Lock, HardDrive, EyeOff } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3 border border-emerald-500/20">
          Zero-Knowledge Architecture
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
          Privacy &amp; Data Storage Model
        </h1>
        <p className="text-slate-400 text-sm">
          A plain-English explanation of how your data is handled in BioForge.
        </p>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <HardDrive className="w-4 h-4 text-emerald-400" />
              1. 100% Client-Side Storage
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              When you design a profile in BioForge, the text, links, and avatar image remain strictly inside your web browser&apos;s <code className="text-slate-300">localStorage</code>. No profile payload is sent to an external server.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <EyeOff className="w-4 h-4 text-sky-400" />
              2. Zero Telemetry or Third-Party Analytics
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              BioForge contains no Google Analytics, no Facebook Pixels, no Hotjar recordings, and no fingerprinting scripts. We do not track what you type, where you click, or what links you export.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Lock className="w-4 h-4 text-indigo-400" />
              3. Data Loss Notice &amp; Backups
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Because data is local to your specific browser profile, clearing your browser storage or using Incognito/Private mode will clear your in-progress profile. Use the &quot;Export JSON Backup&quot; tool to store portable copies safely on your device.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              4. Honest Scope Boundary
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              BioForge does not claim to sync your profiles across multiple devices automatically. If you switch from desktop to laptop, export your JSON backup and restore it on the other device.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 text-xs text-slate-400 space-y-2">
          <h3 className="font-semibold text-white text-sm">Future Multi-Tenant Database Architecture</h3>
          <p className="leading-relaxed">
            The BioForge codebase includes unapplied PostgreSQL migrations in the repository (<code className="text-slate-300">supabase/migrations/</code>) to support future multi-user teams and cloud sync. In this MVP release, <code className="text-emerald-400">DATABASE_MODE=local</code> is enabled by default, and no database connections or API requests are initiated.
          </p>
        </div>
      </div>
    </div>
  );
};
