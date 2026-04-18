import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const IDENTITY_PROFILES = {
  balanced: [
    { value: '高校学生', weight: 32 },
    { value: '中学生', weight: 18 },
    { value: '教师', weight: 17 },
    { value: '家长', weight: 11 },
    { value: '社会公众', weight: 9 },
    { value: '小学高年级学生', weight: 8 },
    { value: '其他', weight: 5 },
  ],
  'school-heavy': [
    { value: '中学生', weight: 29 },
    { value: '小学高年级学生', weight: 22 },
    { value: '高校学生', weight: 15 },
    { value: '教师', weight: 14 },
    { value: '家长', weight: 9 },
    { value: '社会公众', weight: 7 },
    { value: '其他', weight: 4 },
  ],
};

const CHANNEL_PROFILES = {
  balanced: [
    { value: '学校课程/老师讲解', weight: 24 },
    { value: '搜索引擎/网站', weight: 22 },
    { value: '公众号/短视频', weight: 20 },
    { value: '家人朋友介绍', weight: 13 },
    { value: '线下到馆参观', weight: 12 },
    { value: '几乎不了解', weight: 9 },
  ],
  'school-heavy': [
    { value: '学校课程/老师讲解', weight: 31 },
    { value: '公众号/短视频', weight: 21 },
    { value: '搜索引擎/网站', weight: 18 },
    { value: '家人朋友介绍', weight: 12 },
    { value: '线下到馆参观', weight: 11 },
    { value: '几乎不了解', weight: 7 },
  ],
};

const PAIN_POINT_PROFILES = {
  balanced: [
    { value: '路线不清', weight: 34 },
    { value: '讲解难记', weight: 26 },
    { value: '信息分散', weight: 22 },
    { value: '互动不足', weight: 9 },
    { value: '预约不便', weight: 5 },
    { value: '不知道从哪看起', weight: 4 },
  ],
  'school-heavy': [
    { value: '路线不清', weight: 30 },
    { value: '讲解难记', weight: 29 },
    { value: '信息分散', weight: 21 },
    { value: '互动不足', weight: 11 },
    { value: '不知道从哪看起', weight: 6 },
    { value: '预约不便', weight: 3 },
  ],
};

const BILINGUAL_PROFILES = {
  balanced: [
    { value: '有必要', weight: 39 },
    { value: '非常有必要', weight: 27 },
    { value: '一般', weight: 21 },
    { value: '没有必要', weight: 13 },
  ],
  'school-heavy': [
    { value: '有必要', weight: 34 },
    { value: '非常有必要', weight: 20 },
    { value: '一般', weight: 26 },
    { value: '没有必要', weight: 20 },
  ],
};

const VISIT_LEVELS = [
  { value: '从未到访', weight: 40 },
  { value: '去过1馆', weight: 28 },
  { value: '去过2馆', weight: 18 },
  { value: '去过3馆', weight: 14 },
];

const FAMILIARITIES = [
  { value: '听说过但不系统', weight: 36 },
  { value: '基本了解', weight: 29 },
  { value: '不太了解', weight: 21 },
  { value: '非常熟悉', weight: 14 },
];

const WILLINGNESS = [
  { value: '愿意', weight: 40 },
  { value: '非常愿意', weight: 26 },
  { value: '看情况', weight: 23 },
  { value: '暂不考虑', weight: 11 },
];

const THEMES = [
  { value: '爱国主义', weight: 34 },
  { value: '人物故事', weight: 28 },
  { value: '地方历史', weight: 18 },
  { value: '时代责任', weight: 12 },
  { value: '清廉家风', weight: 8 },
];

const NEED_LEVELS = [
  { value: '非常需要', weight: 36 },
  { value: '需要', weight: 40 },
  { value: '一般', weight: 17 },
  { value: '不需要', weight: 7 },
];

const USER_AGENTS = [
  {
    value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    weight: 34,
  },
  {
    value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    weight: 22,
  },
  {
    value: 'Mozilla/5.0 (Linux; Android 14; Redmi K70) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36',
    weight: 18,
  },
  {
    value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edg/123.0.0.0 Chrome/123.0.0.0 Safari/537.36',
    weight: 11,
  },
  {
    value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3 Safari/605.1.15',
    weight: 9,
  },
  {
    value: 'Mozilla/5.0 (Linux; Android 14; SM-S9180) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0.0.0 Mobile Safari/537.36 MicroMessenger/8.0.47.2500',
    weight: 6,
  },
];

function mulberry32(seed) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let result = Math.imul(state ^ (state >>> 15), 1 | state);
    result ^= result + Math.imul(result ^ (result >>> 7), 61 | result);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

function normalizeInteger(value, fallback) {
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric > 0 ? Math.floor(numeric) : fallback;
}

function weightedPick(items, rng) {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  let cursor = rng() * totalWeight;
  for (const item of items) {
    cursor -= item.weight;
    if (cursor <= 0) {
      return item.value;
    }
  }
  return items[items.length - 1].value;
}

function weightedSubset(items, rng, min = 1, max = 3) {
  const sorted = [...items]
    .map((item) => ({ ...item, score: rng() * item.weight }))
    .sort((a, b) => b.score - a.score);
  const size = Math.min(sorted.length, min + Math.floor(rng() * Math.max(1, max - min + 1)));
  return sorted.slice(0, size).map((item) => item.value);
}

function buildPriorityNeed({ painPoint, themes, needBilingual, identity, rng }) {
  const themeText = themes[0] || '重点内容';
  const bilingualNeed = needBilingual === '非常有必要' || needBilingual === '有必要';
  const templates = {
    路线不清: [
      '希望先把三馆路线讲清楚，最好到馆前就能看到完整导览图。',
      '希望把参观顺序和重点点位说明得更清楚，避免到了馆里不知道先看哪里。',
      '希望路线导航更直观，特别是第一次来参观时能快速找到重点展区。',
    ],
    讲解难记: [
      `希望加入更短更清楚的讲解，围绕${themeText}把重点先讲明白。`,
      '希望讲解内容更精炼一些，最好每个点位都有一句话重点提示。',
      '希望现场和线上讲解能对应起来，便于参观后回看复习。',
    ],
    信息分散: [
      '希望把分散的馆藏信息整合到一个入口，少一些来回切换。',
      '希望重点内容、人物关系和参观入口都能集中展示，查找更省时间。',
      '希望项目首页就能给出完整内容索引，不然现在信息有点散。',
    ],
    互动不足: [
      '希望增加一些互动问答或任务点，让学生参观时更有参与感。',
      '希望讲解中加入可点击的重点提示，不只是被动浏览。',
      '希望参观过程中能随时提问，提升沉浸感和记忆点。',
    ],
    预约不便: [
      '希望预约入口更明显，流程更短一点，避免重复填写。',
      '希望能把预约、路线和讲解放在同一个页面里处理。',
    ],
    不知道从哪看起: [
      `希望给${identity}这种第一次接触的人一个“从这里开始”的导览入口。`,
      '希望首页先告诉我推荐看哪些内容，再决定是否深入浏览。',
    ],
  };

  const options = templates[painPoint] || ['希望页面整体更清楚、更好用。'];
  let text = options[Math.floor(rng() * options.length)];
  if (bilingualNeed && rng() > 0.58) {
    text += ' 另外希望后续支持双语页面或简短英文讲解。';
  }
  return text;
}

function buildSubmittedAt(index, startAt, rng) {
  const startTime = new Date(startAt).getTime();
  const dayOffset = Math.floor(index / 28);
  const minuteOffset = dayOffset * 24 * 60 + (index % 28) * 37 + Math.floor(rng() * 25);
  return new Date(startTime + minuteOffset * 60 * 1000).toISOString();
}

export function buildSeedResponses(options = {}) {
  const count = normalizeInteger(options.count, 236);
  const surveyUrl = String(options.surveyUrl || 'https://研学.xyz/survey/').trim();
  const startAt = String(options.startAt || '2026-04-01T08:00:00.000Z');
  const seed = normalizeInteger(options.seed, 20260418);
  const profile = String(options.profile || 'balanced').trim();
  const identityProfile = IDENTITY_PROFILES[profile] || IDENTITY_PROFILES.balanced;
  const channelProfile = CHANNEL_PROFILES[profile] || CHANNEL_PROFILES.balanced;
  const painProfile = PAIN_POINT_PROFILES[profile] || PAIN_POINT_PROFILES.balanced;
  const bilingualProfile = BILINGUAL_PROFILES[profile] || BILINGUAL_PROFILES.balanced;
  const rng = mulberry32(seed);

  return Array.from({ length: count }, (_, index) => {
    const identity = weightedPick(identityProfile, rng);
    const painPoint = weightedPick(painProfile, rng);
    const themes = weightedSubset(THEMES, rng, 1, 3);
    const channels = weightedSubset(channelProfile, rng, 1, 2);
    const needBilingual = weightedPick(bilingualProfile, rng);

    return {
      submittedAt: buildSubmittedAt(index, startAt, rng),
      surveyUrl,
      sessionId: `seed_session_${seed}_${String(index + 1).padStart(4, '0')}`,
      fingerprint: `seed_fp_${seed}_${Math.floor(rng() * 1e8).toString(16)}`,
      userAgent: weightedPick(USER_AGENTS, rng),
      answers: {
        identity,
        visitLevel: weightedPick(VISIT_LEVELS, rng),
        familiarity: weightedPick(FAMILIARITIES, rng),
        willingness: weightedPick(WILLINGNESS, rng),
        themes,
        channels,
        painPoint,
        wantPrevisit: weightedPick(NEED_LEVELS, rng),
        wantAssistant: weightedPick(NEED_LEVELS, rng),
        wantReview: weightedPick(NEED_LEVELS, rng),
        needBilingual,
        priorityNeed: buildPriorityNeed({
          painPoint,
          themes,
          needBilingual,
          identity,
          rng,
        }),
      },
    };
  });
}

async function postResponse(apiBaseUrl, payload) {
  const response = await fetch(`${apiBaseUrl.replace(/\/$/, '')}/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const text = await response.text();
  let json = {};
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`提交失败：${response.status} ${text}`);
  }
  if (!response.ok || !json.ok) {
    throw new Error(json?.message || `提交失败：${response.status}`);
  }
  return json;
}

export async function submitSeedResponses(options = {}) {
  const responses = buildSeedResponses(options);
  const apiBaseUrl = String(options.apiBaseUrl || '').trim();
  const concurrency = normalizeInteger(options.concurrency, 8);
  if (!apiBaseUrl) {
    throw new Error('缺少 apiBaseUrl，无法提交种子数据。');
  }

  const results = [];
  let cursor = 0;

  async function worker() {
    while (cursor < responses.length) {
      const currentIndex = cursor;
      cursor += 1;
      const payload = responses[currentIndex];
      const result = await postResponse(apiBaseUrl, payload);
      results[currentIndex] = result;
      if ((currentIndex + 1) % 25 === 0 || currentIndex === responses.length - 1) {
        console.log(`已提交 ${currentIndex + 1}/${responses.length}`);
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, responses.length) }, () => worker()));
  return {
    responses,
    results,
  };
}

function parseArgs(argv) {
  const options = {};
  for (const arg of argv) {
    if (!arg.startsWith('--')) continue;
    const [key, rawValue] = arg.slice(2).split('=');
    const value = rawValue ?? 'true';
    options[key] = value;
  }
  return options;
}

async function maybeWriteOutput(filePath, payload) {
  if (!filePath) return;
  const resolved = path.resolve(filePath);
  await fs.mkdir(path.dirname(resolved), { recursive: true });
  await fs.writeFile(resolved, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`已写出：${resolved}`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const sharedOptions = {
    count: args.count,
    startAt: args['start-at'],
    surveyUrl: args['survey-url'],
    seed: args.seed,
    profile: args.profile,
  };

  if (args.post === 'true') {
    const { responses } = await submitSeedResponses({
      ...sharedOptions,
      apiBaseUrl: args['api-base-url'],
      concurrency: args.concurrency,
    });
    await maybeWriteOutput(args.out, responses);
    console.log(`提交完成，共 ${responses.length} 份。`);
    return;
  }

  const responses = buildSeedResponses(sharedOptions);
  await maybeWriteOutput(args.out, responses);
  console.log(`已生成 ${responses.length} 份种子答卷。`);
}

const modulePath = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === modulePath) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
