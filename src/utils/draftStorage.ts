import type { AppConfig } from '../types/config';

const DRAFT_KEY = 'vrplayer_config_draft_v1';

export function loadDraft(): AppConfig | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AppConfig;
  } catch (error) {
    console.warn('加载草稿失败', error);
    return null;
  }
}

export function saveDraft(cfg: AppConfig): { ok: boolean; reason?: string } {
  try {
    const text = JSON.stringify(cfg);
    localStorage.setItem(DRAFT_KEY, text);
    return { ok: true };
  } catch (error) {
    console.warn('保存草稿失败', error);
    return { ok: false, reason: error instanceof Error ? error.message : 'unknown' };
  }
}

export function clearDraft(): void {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch (error) {
    console.warn('清空草稿失败', error);
  }
}













