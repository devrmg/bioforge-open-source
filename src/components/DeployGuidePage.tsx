import React, { useState } from 'react';
import { Server, Terminal, Copy, Check, ShieldCheck } from 'lucide-react';

export const DeployGuidePage: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const dockerComposeSnippet = `version: '3.8'

services:
  bioforge:
    image: ghcr.io/bioforge/bioforge-open-source:latest
    build:
      context: .
      dockerfile: Dockerfile
    container_name: bioforge-app
    restart: unless-stopped
    ports:
      - "8080:80"
    environment:
      - VITE_DATABASE_MODE=local
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:80/"]
      interval: 30s
      timeout: 5s
      retries: 3`;

  const hostingerButtonMarkdown = `[![Deploy on Hostinger](https://assets.hostinger.com/vps/deploy.svg)](https://www.hostinger.com/docker-hosting?compose_url=https%3A%2F%2Fraw.githubusercontent.com%2Fdevrmg%2Fbioforge-open-source%2Frefs%2Fheads%2Fmain%2Fdocker-compose.yml&REFERRALCODE=YOUR_VERIFIED_REFERRAL_CODE)`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3 border border-emerald-500/20">
          DevOps &amp; Infrastructure
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
          Self-Hosting &amp; Hostinger VPS Guide
        </h1>
        <p className="text-slate-400 text-sm">
          Run your own instance of the BioForge editor in Docker, or publish static outputs to Hostinger VPS.
        </p>
      </div>

      {/* Hostinger Section */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Deploy on Hostinger VPS (1-Click Docker)</h2>
              <p className="text-xs text-slate-400">
                Instantly provision a high-performance VPS running BioForge with Docker Compose.
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Hostinger Docker VPS hosting enables you to deploy Docker Compose stacks directly from a public URL. The button below uses the official Hostinger compose URL format:
        </p>

        {/* Button Mockup */}
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <a
            href="https://www.hostinger.com/docker-hosting?compose_url=https%3A%2F%2Fraw.githubusercontent.com%2Fdevrmg%2Fbioforge-open-source%2Frefs%2Fheads%2Fmain%2Fdocker-compose.yml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block hover:opacity-90 transition-opacity"
            title="Deploy on Hostinger VPS"
          >
            <img
              src="https://assets.hostinger.com/vps/deploy.svg"
              alt="Deploy on Hostinger"
              className="h-9"
            />
          </a>

          <span className="text-[11px] text-slate-500 font-mono text-center sm:text-right">
            Points to raw public docker-compose.yml
          </span>
        </div>

        {/* Markdown Snippet */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>README Button Syntax:</span>
            <button
              onClick={() => copyToClipboard(hostingerButtonMarkdown, 1)}
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300"
            >
              {copiedIndex === 1 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedIndex === 1 ? 'Copied' : 'Copy snippet'}</span>
            </button>
          </div>
          <pre className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-[11px] font-mono text-slate-300 overflow-x-auto">
            {hostingerButtonMarkdown}
          </pre>
        </div>

        {/* Referral notice */}
        <div className="p-3 bg-slate-950/80 border border-slate-800/80 rounded-lg text-xs text-slate-400 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
          <p className="leading-relaxed">
            <span className="text-slate-200 font-medium">Transparent Referral Disclosure:</span> BioForge is 100% free open-source software under MIT. The Deploy on Hostinger button is an optional convenience. If an approved affiliate referral code is provided by the repository owner, hosting purchases may support project maintenance at no extra cost to you.
          </p>
        </div>
      </div>

      {/* Local Docker Compose Section */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white">Run Locally with Docker Compose</h2>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          The BioForge container compiles the TypeScript SPA and serves production static assets using a minimal Nginx server consuming under 20MB of RAM.
        </p>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>docker-compose.yml:</span>
            <button
              onClick={() => copyToClipboard(dockerComposeSnippet, 2)}
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300"
            >
              {copiedIndex === 2 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedIndex === 2 ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-emerald-400/90 overflow-x-auto">
            {dockerComposeSnippet}
          </pre>
        </div>

        <div className="space-y-2 pt-2">
          <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Quickstart Commands:</h3>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg font-mono text-xs text-slate-300 space-y-1">
            <div># 1. Clone repository</div>
            <div className="text-emerald-400">git clone https://github.com/bioforge/bioforge-open-source.git</div>
            <div># 2. Build and launch container</div>
            <div className="text-emerald-400">docker compose up --build -d</div>
            <div># 3. Open in browser</div>
            <div className="text-slate-400">http://localhost:8080</div>
          </div>
        </div>
      </div>
    </div>
  );
};
