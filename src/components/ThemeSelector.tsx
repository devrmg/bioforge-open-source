import React from 'react';
import { ThemeId, ThemePreset } from '../types/profile';
import { THEME_PRESETS } from '../lib/constants';
import { Palette, Check, ShieldCheck } from 'lucide-react';

interface ThemeSelectorProps {
  currentThemeId: ThemeId;
  onSelectTheme: (themeId: ThemeId) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentThemeId, onSelectTheme }) => {
  const presets = Object.values(THEME_PRESETS);

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div>
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <Palette className="w-4 h-4 text-emerald-400" />
            Accessible Theme Presets
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Carefully tuned for WCAG AA/AAA visual contrast, modern typography, and clean layouts.
          </p>
        </div>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5"
        role="radiogroup"
        aria-label="Theme selection"
      >
        {presets.map((preset: ThemePreset) => {
          const isSelected = currentThemeId === preset.id;

          return (
            <button
              key={preset.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectTheme(preset.id)}
              className={`p-4 rounded-xl text-left border transition-all relative flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-400 ring-1 ring-emerald-400/50 bg-slate-900 shadow-lg'
                  : 'border-slate-800 hover:border-slate-700 bg-slate-950/40 hover:bg-slate-900/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-white">
                    {preset.name}
                  </span>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                  {preset.description}
                </p>
              </div>

              <div>
                {/* Visual Palette Swatches */}
                <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-950 border border-slate-800/80 mb-2.5">
                  <div
                    className="w-5 h-5 rounded-md border border-white/20 shadow-inner"
                    style={{ backgroundColor: preset.colors.bg }}
                    title={`Background: ${preset.colors.bg}`}
                  />
                  <div
                    className="w-5 h-5 rounded-md border border-white/20 shadow-inner"
                    style={{ backgroundColor: preset.colors.card }}
                    title={`Card: ${preset.colors.card}`}
                  />
                  <div
                    className="w-5 h-5 rounded-md border border-white/20 shadow-inner"
                    style={{ backgroundColor: preset.colors.accent }}
                    title={`Accent: ${preset.colors.accent}`}
                  />
                  <div
                    className="w-5 h-5 rounded-md border border-white/20 shadow-inner flex items-center justify-center font-bold text-[10px]"
                    style={{
                      backgroundColor: preset.colors.card,
                      color: preset.colors.textPrimary,
                    }}
                    title="Typography Preview"
                  >
                    Aa
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 ml-auto capitalize">
                    {preset.fontFamily}
                  </span>
                </div>

                {/* WCAG Notice */}
                <div className="flex items-center gap-1 text-[11px] text-emerald-400/90 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{preset.authorNote}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
