export type QualityLevel = 'high' | 'low';

const STORAGE_KEY = 'vr_quality';

export function getPreferredQuality(): QualityLevel {
  if (typeof window === 'undefined') return 'high';
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === 'low' || raw === 'high') return raw;
  } catch {
    // ignore
  }
  return 'high';
}

export function setPreferredQuality(level: QualityLevel): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, level);
  } catch {
    // ignore quota / privacy errors
  }
}


