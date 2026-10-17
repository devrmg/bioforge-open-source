import React, { useState } from 'react';
import { ShieldCheck, Download, X } from 'lucide-react';
import { BioForgeConfig } from '../types/profile';
import { downloadConfigAsJson } from '../lib/storage';

interface DataPrivacyNoticeProps {
  config: BioForgeConfig;
}

export const DataPrivacyNotice: React.FC<DataPrivacyNoticeProps> = ({ config }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-xl p-3.5 mb-6 text-xs text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
      <div className="flex items-start gap-2.5">
        <div className="p-1 rounded bg-emerald-500/10 text-emerald-400 mt-0.5 flex-shrink-0">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-2 font-medium text-emerald-300">
            <span>Local Browser Storage Active</span>
            <span className="font-mono text-[10px] uppercase px-1.5 py-0.2 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded">
              DATABASE_MODE=local
            </span>
          </div>
          <p className="text-slate-400 mt-0.5 leading-relaxed">
            All edits are stored in your browser&apos;s <code className="text-slate-300">localStorage</code>. No telemetry, no remote database, and no server sync. Clearing browser site data will reset unsaved profiles.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
        <button
          type="button"
          onClick={() => downloadConfigAsJson(config)}
          className="inline-flex items-center gap-1 px-2.5 py-1 text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-md transition-colors"
        >
          <Download className="w-3 h-3 text-emerald-400" />
          <span>Save Backup (.json)</span>
        </button>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="p-1 text-slate-500 hover:text-slate-300 rounded transition-colors"
          aria-label="Dismiss notice"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
