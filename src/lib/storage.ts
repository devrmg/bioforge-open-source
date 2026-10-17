import { BioForgeConfig } from '../types/profile';
import { DEFAULT_CONFIG, STORAGE_KEY } from './constants';
import { validateConfig } from './validation';

/**
 * Loads configuration from browser localStorage.
 * If data is missing or corrupted, returns DEFAULT_CONFIG.
 */
export function loadConfigFromStorage(): BioForgeConfig {
  if (typeof window === 'undefined' || !window.localStorage) {
    return DEFAULT_CONFIG;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONFIG;

    const parsed = JSON.parse(raw);
    const validation = validateConfig(parsed);
    if (validation.success) {
      return validation.data;
    } else {
      console.warn('LocalStorage data failed validation, falling back to default:', validation.errors);
      return DEFAULT_CONFIG;
    }
  } catch (err) {
    console.error('Failed to read from localStorage:', err);
    return DEFAULT_CONFIG;
  }
}

/**
 * Persists the current configuration to browser localStorage.
 */
export function saveConfigToStorage(config: BioForgeConfig): boolean {
  if (typeof window === 'undefined' || !window.localStorage) {
    return false;
  }

  try {
    const updated: BioForgeConfig = {
      ...config,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (err) {
    console.error('Failed to save to localStorage (quota or disabled):', err);
    return false;
  }
}

/**
 * Exports configuration to a downloadable JSON file.
 */
export function downloadConfigAsJson(config: BioForgeConfig): void {
  const jsonString = JSON.stringify(config, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  const filename = `bioforge-backup-${config.profile.handle.replace(/[^a-zA-Z0-9]/g, '') || 'profile'}-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

/**
 * Validates and imports a JSON string into a BioForgeConfig object.
 */
export function importConfigFromJson(jsonString: string): { success: true; data: BioForgeConfig } | { success: false; error: string } {
  try {
    const parsed = JSON.parse(jsonString);
    const validation = validateConfig(parsed);
    if (!validation.success) {
      return {
        success: false,
        error: `Invalid configuration structure: ${validation.errors.slice(0, 3).join(', ')}${validation.errors.length > 3 ? '...' : ''}`,
      };
    }
    return { success: true, data: validation.data };
  } catch (err) {
    return {
      success: false,
      error: 'Invalid JSON file format. Please ensure you uploaded a valid BioForge backup file.',
    };
  }
}

/**
 * Resets local storage to default demo configuration.
 */
export function resetConfigStorage(): BioForgeConfig {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }
  return DEFAULT_CONFIG;
}
