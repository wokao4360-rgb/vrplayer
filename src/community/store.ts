import type { Comment, LikesState, User } from './types';
import { containsBanned } from './moderation';

const KEY_USER = 'vr_user';
const KEY_COMMENTS = 'vr_comments_v1';
const KEY_LIKES = 'vr_likes_v1';

// 评论频控间隔（毫秒）：同一用户在同一场景的最小间隔
export const COMMENT_COOLDOWN_MS = 10_000;
export const COMMENTS_KEEP_GLOBAL = 200;
export const COMMENTS_KEEP_PER_SCENE = 50;

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function nowId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`;
}

export function getUser(): User | null {
  const u = safeParse<any>(localStorage.getItem(KEY_USER), null);
  if (!u || typeof u !== 'object') return null;
  if (typeof u.id !== 'string' || typeof u.name !== 'string') return null;
  return { id: u.id, name: u.name };
}

export function login(name: string): User {
  const user: User = { id: nowId('u'), name };
  localStorage.setItem(KEY_USER, JSON.stringify(user));
  return user;
}

export function logout(): void {
  localStorage.removeItem(KEY_USER);
}

function loadComments(): Comment[] {
  const list = safeParse<Comment[]>(localStorage.getItem(KEY_COMMENTS), []);
  return Array.isArray(list) ? list : [];
}

function saveComments(list: Comment[]): void {
  localStorage.setItem(KEY_COMMENTS, JSON.stringify(list));
}

export function listComments(sceneId: string): Comment[] {
  return loadComments()
    .filter((c) => c.sceneId === sceneId)
    .sort((a, b) => b.ts - a.ts)
    .slice(0, COMMENTS_KEEP_PER_SCENE);
}

export function addComment(
  sceneId: string,
  text: string
): { ok: true } | { ok: false; reason: 'not_logged_in' | 'banned' | 'cooldown' } {
  const user = getUser();
  if (!user) return { ok: false, reason: 'not_logged_in' };

  const content = (text || '').trim();
  if (containsBanned(content)) return { ok: false, reason: 'banned' };

  const comments = loadComments();
  const latest = comments
    .filter((c) => c.sceneId === sceneId && c.userId === user.id)
    .sort((a, b) => b.ts - a.ts)[0];
  if (latest && Date.now() - latest.ts < COMMENT_COOLDOWN_MS) {
    return { ok: false, reason: 'cooldown' };
  }

  const c: Comment = {
    id: nowId('c'),
    sceneId,
    userId: user.id,
    userName: user.name,
    text: content,
    ts: Date.now(),
  };

  const next = [c, ...comments].slice(0, COMMENTS_KEEP_GLOBAL);
  saveComments(next);
  return { ok: true };
}

function loadLikesState(): LikesState {
  return safeParse<LikesState>(localStorage.getItem(KEY_LIKES), {
    likesCountByScene: {},
    likedByUser: {},
  });
}

function saveLikesState(state: LikesState): void {
  localStorage.setItem(KEY_LIKES, JSON.stringify(state));
}

export function getLikes(sceneId: string, userId?: string): { count: number; liked: boolean } {
  const state = loadLikesState();
  const count = state.likesCountByScene[sceneId] || 0;
  const liked = userId ? Boolean(state.likedByUser[userId]?.[sceneId]) : false;
  return { count, liked };
}

export function getLikeState(sceneId: string, userId: string): { count: number; liked: boolean } {
  return getLikes(sceneId, userId);
}

export function toggleLike(
  sceneId: string
): { ok: true; action: 'liked' | 'unliked'; count: number } | { ok: false; reason: 'login_required' } {
  const user = getUser();
  if (!user) return { ok: false, reason: 'login_required' };

  const state = loadLikesState();
  if (!state.likedByUser[user.id]) state.likedByUser[user.id] = {};
  const prev = Boolean(state.likedByUser[user.id][sceneId]);
  const next = !prev;
  state.likedByUser[user.id][sceneId] = next;

  const currentCount = state.likesCountByScene[sceneId] || 0;
  state.likesCountByScene[sceneId] = Math.max(0, currentCount + (next ? 1 : -1));
  saveLikesState(state);
  return {
    ok: true,
    action: next ? 'liked' : 'unliked',
    count: state.likesCountByScene[sceneId],
  };
}

export const STORAGE_KEYS = {
  KEY_USER,
  KEY_COMMENTS,
  KEY_LIKES,
};



