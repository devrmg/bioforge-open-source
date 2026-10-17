import { useState, useEffect } from 'react';
import { BioForgeConfig, ThemeId } from './types/profile';
import { loadConfigFromStorage, saveConfigToStorage } from './lib/storage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProfileEditor } from './components/ProfileEditor';
import { LinksEditor } from './components/LinksEditor';
import { ThemeSelector } from './components/ThemeSelector';
import { SeoSettings } from './components/SeoSettings';
import { PreviewPane } from './components/PreviewPane';
import { ExportModal } from './components/ExportModal';
import { DataPrivacyNotice } from './components/DataPrivacyNotice';
import { TemplatesPage } from './components/TemplatesPage';
import { HowItWorksPage } from './components/HowItWorksPage';
import { FaqPage } from './components/FaqPage';
import { PrivacyPage } from './components/PrivacyPage';
import { DeployGuidePage } from './components/DeployGuidePage';
import { Eye } from 'lucide-react';

export function App() {
  const [config, setConfig] = useState<BioForgeConfig>(() => loadConfigFromStorage());
  const [currentTab, setCurrentTab] = useState<string>('editor');
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Auto-save on configuration updates
  useEffect(() => {
    saveConfigToStorage(config);
  }, [config]);

  const handleUpdateProfile = (profile: BioForgeConfig['profile']) => {
    setConfig((prev) => ({ ...prev, profile }));
  };

  const handleUpdateLinks = (links: BioForgeConfig['links']) => {
    setConfig((prev) => ({ ...prev, links }));
  };

  const handleSelectTheme = (themeId: ThemeId) => {
    setConfig((prev) => ({ ...prev, themeId }));
  };

  const handleUpdateSeo = (seo: BioForgeConfig['seo']) => {
    setConfig((prev) => ({ ...prev, seo }));
  };

  const handleApplyTemplate = (templateData: Partial<BioForgeConfig>) => {
    setConfig((prev) => ({
      ...prev,
      ...templateData,
      profile: { ...prev.profile, ...(templateData.profile || {}) },
      links: templateData.links || prev.links,
      themeId: templateData.themeId || prev.themeId,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenExport={() => setIsExportOpen(true)}
      />

      {/* Main Content Area based on Tab */}
      <main className="flex-grow">
        {currentTab === 'editor' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <DataPrivacyNotice config={config} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Form Editors */}
              <div className="lg:col-span-7 space-y-6">
                <ProfileEditor
                  profile={config.profile}
                  onChange={handleUpdateProfile}
                />

                <LinksEditor
                  links={config.links}
                  onChange={handleUpdateLinks}
                />

                <ThemeSelector
                  currentThemeId={config.themeId}
                  onSelectTheme={handleSelectTheme}
                />

                <SeoSettings
                  seo={config.seo}
                  profile={config.profile}
                  onChange={handleUpdateSeo}
                />
              </div>

              {/* Right Column: Live Device Preview (Sticky on desktop) */}
              <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    Live Responsive Preview
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400">
                    Auto-syncing
                  </span>
                </div>

                <PreviewPane config={config} />
              </div>
            </div>
          </div>
        )}

        {currentTab === 'templates' && (
          <TemplatesPage
            onApplyTemplate={handleApplyTemplate}
            onSelectTab={setCurrentTab}
          />
        )}

        {currentTab === 'how-it-works' && (
          <HowItWorksPage onSelectTab={setCurrentTab} />
        )}

        {currentTab === 'faq' && <FaqPage />}

        {currentTab === 'privacy' && <PrivacyPage />}

        {currentTab === 'deploy' && <DeployGuidePage />}
      </main>

      {/* Export & Publish Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        config={config}
        onConfigChange={setConfig}
      />

      {/* Footer */}
      <Footer onSelectTab={setCurrentTab} />
    </div>
  );
}

export default App;
