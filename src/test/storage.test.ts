import { describe, it, expect, beforeEach } from 'vitest';
import {
  loadConfigFromStorage,
  saveConfigToStorage,
  importConfigFromJson,
  resetConfigStorage,
} from '../lib/storage';
import { DEFAULT_CONFIG, STORAGE_KEY } from '../lib/constants';

describe('Storage and Serialization', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads DEFAULT_CONFIG when localStorage is empty', () => {
    const config = loadConfigFromStorage();
    expect(config.profile.displayName).toBe(DEFAULT_CONFIG.profile.displayName);
  });

  it('saves and reloads configuration from localStorage', () => {
    const custom = {
      ...DEFAULT_CONFIG,
      profile: {
        ...DEFAULT_CONFIG.profile,
        displayName: 'Test Artist',
      },
    };
    const saved = saveConfigToStorage(custom);
    expect(saved).toBe(true);

    const reloaded = loadConfigFromStorage();
    expect(reloaded.profile.displayName).toBe('Test Artist');
  });

  it('handles corrupt JSON in localStorage gracefully without throwing', () => {
    localStorage.setItem(STORAGE_KEY, 'not-valid-json{{{');
    const fallback = loadConfigFromStorage();
    expect(fallback.profile.displayName).toBe(DEFAULT_CONFIG.profile.displayName);
  });

  it('validates imported JSON strings correctly', () => {
    const validJson = JSON.stringify(DEFAULT_CONFIG);
    const result = importConfigFromJson(validJson);
    expect(result.success).toBe(true);
  });

  it('rejects invalid JSON syntax during import', () => {
    const result = importConfigFromJson('bad content');
    expect(result.success).toBe(false);
  });

  it('resets configuration and clears localStorage', () => {
    saveConfigToStorage({ ...DEFAULT_CONFIG, profile: { ...DEFAULT_CONFIG.profile, displayName: 'Temporary' } });
    const reset = resetConfigStorage();
    expect(reset.profile.displayName).toBe(DEFAULT_CONFIG.profile.displayName);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});
