const BANNED_WORDS = [
  // 中文示例
  '辱骂',
  '傻逼',
  '垃圾',
  '滚开',
  '暴力',
  '色情',
  '黄色',
  '毒品',
  '赌博',
  '诈骗',
  '恐怖',
  '自杀',
  '枪',
  '炸弹',
  '仇恨',
  '歧视',
  // 英文示例
  'hate',
  'suicide',
  'bomb',
  'porn',
];

export function normalize(text: string): string {
  return (text || '')
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ''); // 去掉符号（unicode）
}

export function containsBanned(text: string): boolean {
  const t = normalize(text);
  if (!t) return false;
  return BANNED_WORDS.some((w) => t.includes(normalize(String(w))));
}

// 可选扩展：此 MVP 直接拦截，不做替换输出




