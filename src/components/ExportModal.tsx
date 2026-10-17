import React, { useState, useEffect, useRef } from 'react';
import { BioForgeConfig } from '../types/profile';
import { buildStaticWebsiteZip, generateIndexHtml } from '../lib/staticGenerator';
import { generateQrPngDataUrl, downloadQrCode } from '../lib/qrGenerator';
import { downloadConfigAsJson, importConfigFromJson, resetConfigStorage } from '../lib/storage';
import {
  Download,
  FileArchive,
  QrCode,
  FileJson,
  Upload,
  X,
  CheckCircle2,
  AlertCircle,
  Code,
  Sparkles,
} from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: BioForgeConfig;
  onConfigChange: (newConfig: BioForgeConfig) => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  config,
  onConfigChange,
}) => {
  const [activeTab, setActiveTab] = useState<'zip' | 'qr' | 'backup'>('zip');
  const [isZipping, setIsZipping] = useState(false);
  const [zipSuccess, setZipSuccess] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const targetUrl = config.seo.canonicalUrl || 'https://bioforge.dev';

  useEffect(() => {
    if (isOpen) {
      generateQrPngDataUrl(targetUrl, 400).then((url) => {
        setQrDataUrl(url);
      });
    }
  }, [isOpen, targetUrl]);

  if (!isOpen) return null;

  const handleDownloadZip = async () => {
    try {
      setIsZipping(true);
      setZipSuccess(false);
      const blob = await buildStaticWebsiteZip(config);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const safeName = config.profile.handle.replace(/[^a-zA-Z0-9]/g, '') || 'bioforge';
      a.download = `${safeName}-static-website.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setZipSuccess(true);
    } catch (err) {
      console.error('Failed to generate ZIP:', err);
    } finally {
      setIsZipping(false);
    }
  };

  const handleDownloadHtmlOnly = () => {
    const html = generateIndexHtml(config);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportError(null);
    setImportSuccess(false);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importConfigFromJson(content);
      if (res.success) {
        onConfigChange(res.data);
        setImportSuccess(true);
        setTimeout(() => setImportSuccess(false), 4000);
      } else {
        setImportError(res.error);
      }
    };
    reader.onerror = () => {
      setImportError('Failed to read file from disk.');
    };
    reader.readAsText(file);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all bio profile information to sample defaults? Your current unsaved changes will be cleared.')) {
      const def = resetConfigStorage();
      onConfigChange(def);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-modal-title"
    >
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Download className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h2 id="export-modal-title" className="text-base font-semibold text-white">
                Export &amp; Publish Hub
              </h2>
              <p className="text-xs text-slate-400">
                Generate static bundles, QR codes, or JSON backup files.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-800 bg-slate-950/50 px-5 pt-2">
          <button
            onClick={() => setActiveTab('zip')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-all ${
              activeTab === 'zip'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileArchive className="w-4 h-4" />
            <span>Static ZIP Package</span>
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-all ${
              activeTab === 'qr'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>QR Code</span>
          </button>
          <button
            onClick={() => setActiveTab('backup')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-all ${
              activeTab === 'backup'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileJson className="w-4 h-4" />
            <span>JSON Backup / Restore</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* TAB 1: ZIP EXPORT */}
          {activeTab === 'zip' && (
            <div className="space-y-5">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-white mb-1.5 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Self-Contained Static Website Bundle
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Downloads a complete ZIP containing <code className="text-emerald-400">index.html</code>, <code className="text-emerald-400">style.css</code>, social icons (pure SVG), and a deployment guide.
                </p>
                <ul className="text-xs text-slate-400 space-y-1 mb-4 list-disc list-inside">
                  <li>Zero database or runtime servers required.</li>
                  <li>Ready to deploy instantly to Cloudflare Pages, GitHub Pages, or Hostinger VPS.</li>
                  <li>Includes configuration backup file inside the archive.</li>
                </ul>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleDownloadZip}
                    disabled={isZipping}
                    className="inline-flex items-center space-x-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-500 rounded-lg shadow-md transition-all disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isZipping ? 'Bundling ZIP...' : 'Download Static Website (.zip)'}</span>
                  </button>

                  <button
                    onClick={handleDownloadHtmlOnly}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span>Download Single HTML</span>
                  </button>
                </div>

                {zipSuccess && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-900/50">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>Static website bundle downloaded successfully! Extract and open index.html or upload to your hosting provider.</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: QR CODE */}
          {activeTab === 'qr' && (
            <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-950 border border-slate-800 rounded-xl p-5">
              <div className="bg-white p-3 rounded-xl shadow-lg flex-shrink-0">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="BioForge QR code for personal website"
                    className="w-44 h-44 object-contain"
                  />
                ) : (
                  <div className="w-44 h-44 bg-slate-200 animate-pulse rounded" />
                )}
              </div>

              <div className="space-y-3 flex-grow text-center sm:text-left">
                <div>
                  <h3 className="text-sm font-semibold text-white">QR Code for Your Link in Bio</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Point your camera or print on merchandise, business cards, stickers, and event badges.
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono break-all">
                  {targetUrl}
                </div>

                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <button
                    type="button"
                    onClick={() => downloadQrCode(targetUrl, 'bioforge-qr.png')}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PNG</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BACKUP & RESTORE */}
          {activeTab === 'backup' && (
            <div className="space-y-4">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-white">JSON Profile Backup &amp; Restore</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    BioForge stores your work locally in your browser. Download a JSON snapshot to save your configuration or transfer it between devices.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => downloadConfigAsJson(config)}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Export JSON Backup</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5 text-sky-400" />
                    <span>Restore from JSON File</span>
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json,application/json"
                    onChange={handleFileImport}
                    className="hidden"
                    aria-label="Upload JSON backup file"
                  />
                </div>

                {importSuccess && (
                  <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-900/50">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>Configuration successfully validated and restored!</span>
                  </div>
                )}

                {importError && (
                  <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-950/40 p-2.5 rounded-lg border border-rose-900/50">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{importError}</span>
                  </div>
                )}
              </div>

              {/* Danger Zone: Reset */}
              <div className="border border-rose-950/50 bg-rose-950/10 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-rose-300">Reset Demo Data</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Clear current custom settings and reset to default demo profile.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="px-3 py-1.5 text-xs text-rose-400 hover:text-rose-200 border border-rose-800/50 hover:bg-rose-950/40 rounded-lg transition-colors"
                >
                  Reset Defaults
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
