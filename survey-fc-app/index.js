'use strict';

const OSS = require('ali-oss');
const crypto = require('crypto');

const SURVEY_PREFIX = process.env.SURVEY_PREFIX || 'survey-responses';
const DEFAULT_OSS_REGION = 'oss-cn-beijing';
const FALLBACK_OSS_REGIONS = ['oss-cn-hangzhou'];
const OSS_BUCKET = process.env.OSS_BUCKET || '';
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || [
  'https://xn--48s508d.xyz',
  'https://研学.xyz',
  'http://127.0.0.1:4174',
  'http://localhost:4174',
  'http://127.0.0.1:5173',
  'http://localhost:5173',
].join(','))
  .split(',')
  .map((item) => item.trim())
  .filter(Boolean);

const SINGLE_KEYS = [
  'identity',
  'visitLevel',
  'familiarity',
  'willingness',
  'painPoint',
  'wantPrevisit',
  'wantAssistant',
  'wantReview',
  'needBilingual',
];

const MULTI_KEYS = ['themes', 'channels'];
const GARBLED_LABEL = '异常编码样本';
const GARBLED_QUOTE_LABEL = '历史测试样本（编码异常）';

function createResponse(statusCode, payload, origin) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': origin || '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
    isBase64Encoded: false,
    body: payload === '' ? '' : JSON.stringify(payload),
  };
}

function parseEvent(event) {
  if (Buffer.isBuffer(event)) {
    return parseEvent(event.toString('utf8'));
  }

  if (typeof event === 'string') {
    try {
      return JSON.parse(event || '{}');
    } catch {
      return {};
    }
  }

  if (event && typeof event === 'object') {
    return event;
  }

  return {};
}

function getHeaders(event) {
  return event && typeof event.headers === 'object' && event.headers
    ? event.headers
    : {};
}

function getOriginHeader(event) {
  const headers = getHeaders(event);
  return String(headers.Origin || headers.origin || '').trim();
}

function normalizeOrigin(event) {
  const origin = getOriginHeader(event);
  if (!origin) return '';
  return ALLOWED_ORIGINS.includes(origin) ? origin : '';
}

function getCredentials(context) {
  return context && typeof context === 'object' && context.credentials && typeof context.credentials === 'object'
    ? context.credentials
    : {};
}

function getOssRegionCandidates() {
  const candidates = [
    DEFAULT_OSS_REGION,
    process.env.OSS_REGION,
    ...FALLBACK_OSS_REGIONS,
  ];
  return candidates.filter((item, index) => item && candidates.indexOf(item) === index);
}

function getMethod(event) {
  const method = event?.requestContext?.http?.method || event?.method;
  return String(method || 'GET').toUpperCase();
}

function getPath(event) {
  return String(
    event?.requestContext?.http?.path ||
    event?.rawPath ||
    event?.path ||
    '/'
  ).trim() || '/';
}

function readRequestBody(event) {
  const body = typeof event?.body === 'string' ? event.body : '';
  if (!body) return '';
  if (event?.isBase64Encoded) {
    return Buffer.from(body, 'base64').toString('utf8');
  }
  return body;
}

function buildOssClient(context, region) {
  const credentials = getCredentials(context);
  const accessKeyId = credentials.accessKeyId || process.env.ALIBABA_CLOUD_ACCESS_KEY_ID;
  const accessKeySecret = credentials.accessKeySecret || process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET;
  const stsToken = credentials.securityToken || process.env.ALIBABA_CLOUD_SECURITY_TOKEN;

  if (!OSS_BUCKET || !accessKeyId || !accessKeySecret) {
    throw new Error('OSS configuration incomplete');
  }

  return new OSS({
    region: region || DEFAULT_OSS_REGION,
    bucket: OSS_BUCKET,
    accessKeyId,
    accessKeySecret,
    stsToken,
    authorizationV4: true,
  });
}

function isEndpointMismatchError(error) {
  return /specified endpoint/i.test(String(error && error.message || ''));
}

async function withBucketClient(context, operation) {
  const regions = getOssRegionCandidates();
  let lastError = null;

  for (const region of regions) {
    const client = buildOssClient(context, region);
    try {
      return await operation(client, region);
    } catch (error) {
      lastError = error;
      if (!isEndpointMismatchError(error)) {
        throw error;
      }
      console.warn('OSS endpoint mismatch, retry with next region:', region);
    }
  }

  throw lastError || new Error('OSS request failed');
}

function sanitizeAnswer(value) {
  return String(value || '').trim().slice(0, 200);
}

function isLikelyGarbled(value) {
  const text = sanitizeAnswer(value);
  if (!text) return false;
  if (/[�]/.test(text)) return true;
  const questionMarks = (text.match(/\?/g) || []).length;
  return questionMarks >= 2 && questionMarks / text.length >= 0.3;
}

function normalizeAnswerLabel(value) {
  const text = sanitizeAnswer(value);
  if (!text) return '';
  return isLikelyGarbled(text) ? GARBLED_LABEL : text;
}

function normalizeQuote(value) {
  const text = sanitizeAnswer(value);
  if (!text) return '';
  return isLikelyGarbled(text) ? '' : text;
}

function hasRecordGarbledAnswers(record) {
  if (!record || !record.answers) return false;
  const answerValues = [
    ...SINGLE_KEYS.map((key) => record.answers[key]),
    ...MULTI_KEYS.flatMap((key) => record.answers[key] || []),
    record.answers.priorityNeed,
  ];
  return answerValues.some((value) => isLikelyGarbled(value));
}

function normalizeSubmittedAt(value) {
  return sanitizeAnswer(value) || new Date().toISOString();
}

function buildTrendLabel(submittedAt) {
  const normalized = normalizeSubmittedAt(submittedAt);
  if (/^\d{4}-\d{2}-\d{2}T\d{2}/.test(normalized)) {
    return `${normalized.slice(5, 10)} ${normalized.slice(11, 13)}:00`;
  }
  return normalized.slice(0, 13);
}

function summarizeMultiAnswer(values) {
  return (values || [])
    .map((value) => normalizeAnswerLabel(value))
    .filter(Boolean)
    .join('、');
}

function detectDeviceType(userAgent) {
  const ua = String(userAgent || '').toLowerCase();
  if (/iphone|android|mobile|windows phone/.test(ua)) return '移动端';
  if (/ipad|tablet/.test(ua)) return '平板端';
  if (ua) return '桌面端';
  return '未知设备';
}

function detectSystem(userAgent) {
  const ua = String(userAgent || '').toLowerCase();
  if (/windows/.test(ua)) return 'Windows';
  if (/iphone|ipad|ios/.test(ua)) return 'iOS';
  if (/android/.test(ua)) return 'Android';
  if (/mac os|macintosh/.test(ua)) return 'macOS';
  if (/linux/.test(ua)) return 'Linux';
  return '其他系统';
}

function detectBrowser(userAgent) {
  const ua = String(userAgent || '').toLowerCase();
  if (/edg\//.test(ua)) return 'Edge';
  if (/chrome\//.test(ua) && !/edg\//.test(ua)) return 'Chrome';
  if (/safari\//.test(ua) && !/chrome\//.test(ua)) return 'Safari';
  if (/firefox\//.test(ua)) return 'Firefox';
  if (/micromessenger/.test(ua)) return '微信';
  return '其他浏览器';
}

function countByLabel(values, preferredOrder = []) {
  const counter = new Map();
  for (const value of values) {
    const label = sanitizeAnswer(value);
    if (!label) continue;
    counter.set(label, (counter.get(label) || 0) + 1);
  }
  return Array.from(counter.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => {
      const countDiff = Number(b.count) - Number(a.count);
      if (countDiff !== 0) return countDiff;
      const preferredDiff = preferredOrder.indexOf(a.label) - preferredOrder.indexOf(b.label);
      if (preferredDiff !== 0 && preferredOrder.includes(a.label) && preferredOrder.includes(b.label)) {
        return preferredDiff;
      }
      return a.label.localeCompare(b.label, 'zh-CN');
    });
}

function validatePayload(payload) {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Invalid payload');
  }

  const answers = payload.answers;
  if (!answers || typeof answers !== 'object') {
    throw new Error('Missing answers');
  }

  for (const key of SINGLE_KEYS) {
    if (!sanitizeAnswer(answers[key])) {
      throw new Error(`Missing answer: ${key}`);
    }
  }

  for (const key of MULTI_KEYS) {
    if (!Array.isArray(answers[key]) || answers[key].length === 0) {
      throw new Error(`Missing answer: ${key}`);
    }
  }

  if (!sanitizeAnswer(answers.priorityNeed)) {
    throw new Error('Missing answer: priorityNeed');
  }

  return {
    submittedAt: sanitizeAnswer(payload.submittedAt) || new Date().toISOString(),
    surveyUrl: sanitizeAnswer(payload.surveyUrl),
    sessionId: sanitizeAnswer(payload.sessionId),
    fingerprint: sanitizeAnswer(payload.fingerprint),
    userAgent: sanitizeAnswer(payload.userAgent),
    answers: {
      identity: sanitizeAnswer(answers.identity),
      visitLevel: sanitizeAnswer(answers.visitLevel),
      familiarity: sanitizeAnswer(answers.familiarity),
      willingness: sanitizeAnswer(answers.willingness),
      themes: answers.themes.map(sanitizeAnswer).filter(Boolean),
      channels: answers.channels.map(sanitizeAnswer).filter(Boolean),
      painPoint: sanitizeAnswer(answers.painPoint),
      wantPrevisit: sanitizeAnswer(answers.wantPrevisit),
      wantAssistant: sanitizeAnswer(answers.wantAssistant),
      wantReview: sanitizeAnswer(answers.wantReview),
      needBilingual: sanitizeAnswer(answers.needBilingual),
      priorityNeed: sanitizeAnswer(answers.priorityNeed),
    },
  };
}

function objectKey(record) {
  const dateKey = record.submittedAt.slice(0, 10);
  const hash = crypto
    .createHash('sha1')
    .update(`${record.submittedAt}|${record.sessionId}|${record.fingerprint}|${record.userAgent}`)
    .digest('hex')
    .slice(0, 12);
  return `${SURVEY_PREFIX}/${dateKey}/${Date.now()}_${hash}.json`;
}

function createEmptyStats() {
  return {
    totalResponses: 0,
    validResponses: 0,
    flaggedResponses: 0,
    latestSubmittedAt: '',
    questionStats: {},
    topIssues: [],
    sampleQuotes: [],
    collectionTrend: [],
    detailRows: [],
    deviceStats: {
      deviceTypes: [],
      systems: [],
      browsers: [],
    },
  };
}

function pushCount(record, key, value) {
  if (!record[key]) record[key] = {};
  const next = record[key];
  next[value] = (next[value] || 0) + 1;
}

function aggregate(records) {
  const stats = createEmptyStats();
  const normalizedRecords = records
    .map((item) => ({
      submittedAt: normalizeSubmittedAt(item.submittedAt),
      userAgent: sanitizeAnswer(item.userAgent),
      responseQuality: hasRecordGarbledAnswers(item) ? '疑似乱码' : '正常',
      answers: {
        identity: normalizeAnswerLabel(item.answers.identity),
        visitLevel: normalizeAnswerLabel(item.answers.visitLevel),
        familiarity: normalizeAnswerLabel(item.answers.familiarity),
        willingness: normalizeAnswerLabel(item.answers.willingness),
        themes: (item.answers.themes || []).map(normalizeAnswerLabel).filter(Boolean),
        channels: (item.answers.channels || []).map(normalizeAnswerLabel).filter(Boolean),
        painPoint: normalizeAnswerLabel(item.answers.painPoint),
        wantPrevisit: normalizeAnswerLabel(item.answers.wantPrevisit),
        wantAssistant: normalizeAnswerLabel(item.answers.wantAssistant),
        wantReview: normalizeAnswerLabel(item.answers.wantReview),
        needBilingual: normalizeAnswerLabel(item.answers.needBilingual),
        priorityNeed: normalizeQuote(item.answers.priorityNeed),
      },
    }))
    .sort((a, b) => a.submittedAt.localeCompare(b.submittedAt));

  stats.totalResponses = normalizedRecords.length;
  stats.validResponses = normalizedRecords.filter((item) => item.responseQuality === '正常').length;
  stats.flaggedResponses = stats.totalResponses - stats.validResponses;
  stats.latestSubmittedAt = normalizedRecords
    .map((item) => item.submittedAt)
    .filter(Boolean)
    .sort()
    .slice(-1)[0] || '';

  for (const item of normalizedRecords) {
    for (const key of SINGLE_KEYS) {
      pushCount(stats.questionStats, key, item.answers[key]);
    }
    for (const key of MULTI_KEYS) {
      for (const value of item.answers[key] || []) {
        pushCount(stats.questionStats, key, value);
      }
    }
  }

  const painMap = stats.questionStats.painPoint || {};
  const preferredPainEntries = Object.entries(painMap).filter(([label]) => label !== GARBLED_LABEL);
  const sourcePainEntries = preferredPainEntries.length > 0 ? preferredPainEntries : Object.entries(painMap);
  stats.topIssues = sourcePainEntries
    .sort((a, b) => Number(b[1]) - Number(a[1]))
    .slice(0, 3)
    .map(([label]) => label);

  stats.sampleQuotes = normalizedRecords
    .map((item) => item.answers.priorityNeed)
    .filter(Boolean)
    .slice(-5);

  const trendCounter = new Map();
  for (const item of normalizedRecords) {
    const label = buildTrendLabel(item.submittedAt);
    trendCounter.set(label, (trendCounter.get(label) || 0) + 1);
  }
  stats.collectionTrend = Array.from(trendCounter.entries()).map(([label, count]) => ({ label, count }));

  stats.detailRows = [...normalizedRecords]
    .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))
    .slice(0, 12)
    .map((item, index) => ({
      index: index + 1,
      submittedAt: item.submittedAt,
      identity: item.answers.identity || GARBLED_LABEL,
      visitLevel: item.answers.visitLevel || '未填写',
      familiarity: item.answers.familiarity || '未填写',
      willingness: item.answers.willingness || '未填写',
      painPoint: item.answers.painPoint || '未填写',
      channelsText: summarizeMultiAnswer(item.answers.channels),
      themesText: summarizeMultiAnswer(item.answers.themes),
      priorityNeed: item.answers.priorityNeed || GARBLED_QUOTE_LABEL,
      deviceType: detectDeviceType(item.userAgent),
      systemName: detectSystem(item.userAgent),
      browserName: detectBrowser(item.userAgent),
      responseQuality: item.responseQuality,
    }));

  stats.deviceStats = {
    deviceTypes: countByLabel(
      normalizedRecords.map((item) => detectDeviceType(item.userAgent)),
      ['桌面端', '移动端', '平板端', '未知设备']
    ),
    systems: countByLabel(
      normalizedRecords.map((item) => detectSystem(item.userAgent)),
      ['Windows', 'macOS', 'iOS', 'Android', 'Linux', '其他系统']
    ),
    browsers: countByLabel(
      normalizedRecords.map((item) => detectBrowser(item.userAgent)),
      ['Chrome', 'Edge', 'Safari', 'Firefox', '微信', '其他浏览器']
    ),
  };

  return stats;
}

async function listAllResponses(client) {
  let continuationToken;
  const objects = [];
  do {
    const result = await client.listV2({
      prefix: `${SURVEY_PREFIX}/`,
      'max-keys': 1000,
      continuationToken,
    });
    objects.push(...(result.objects || []));
    continuationToken = result.nextContinuationToken;
  } while (continuationToken);

  const records = [];
  for (const item of objects) {
    const result = await client.get(item.name);
    const text = Buffer.isBuffer(result.content)
      ? result.content.toString('utf8')
      : String(result.content || '');
    try {
      records.push(JSON.parse(text));
    } catch (error) {
      console.warn('Skip invalid response object:', item.name, error && error.message);
    }
  }
  return records;
}

async function handleRequest(event, context) {
  const method = getMethod(event);
  const path = getPath(event);
  const origin = normalizeOrigin(event);
  const originHeader = getOriginHeader(event);

  if (method === 'OPTIONS') {
    return createResponse(204, '', origin || '*');
  }

  if (origin === '' && originHeader) {
    return createResponse(403, { ok: false, message: 'Origin not allowed' }, '*');
  }

  if (method === 'POST' && path === '/submit') {
    try {
      const payload = validatePayload(JSON.parse(readRequestBody(event) || '{}'));
      const key = objectKey(payload);
      await withBucketClient(context, async (client) => {
        await client.put(key, Buffer.from(JSON.stringify(payload, null, 2), 'utf8'), {
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
        });
      });
      return createResponse(200, { ok: true, key, message: 'Survey submitted successfully' }, origin || '*');
    } catch (error) {
      console.error('submit failed:', error);
      return createResponse(400, { ok: false, message: error.message || 'Submit failed' }, origin || '*');
    }
  }

  if (method === 'GET' && path === '/stats') {
    try {
      const records = await withBucketClient(context, async (client) => listAllResponses(client));
      const data = aggregate(records);
      return createResponse(200, { ok: true, data }, origin || '*');
    } catch (error) {
      console.error('stats failed:', error);
      return createResponse(500, { ok: false, message: error.message || 'Stats failed' }, origin || '*');
    }
  }

  if (method === 'GET' && path === '/health') {
    const credentials = getCredentials(context);
    return createResponse(
      200,
      {
        ok: true,
        bucket: OSS_BUCKET,
        prefix: SURVEY_PREFIX,
        regionCandidates: getOssRegionCandidates(),
        hasRuntimeCredentials: Boolean(credentials.accessKeyId && credentials.accessKeySecret),
        hasEnvCredentials: Boolean(
          process.env.ALIBABA_CLOUD_ACCESS_KEY_ID && process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET
        ),
      },
      origin || '*'
    );
  }

  return createResponse(404, { ok: false, message: 'Not found' }, origin || '*');
}

exports.handler = function handler(event, context, callback) {
  const parsedEvent = parseEvent(event);
  Promise.resolve(handleRequest(parsedEvent, context))
    .then((response) => callback(null, response))
    .catch((error) => {
      console.error('unhandled error:', error);
      callback(null, createResponse(500, { ok: false, message: 'Internal Server Error' }, '*'));
    });
};

exports.__test = {
  aggregate,
  createResponse,
  getMethod,
  getOssRegionCandidates,
  getPath,
  hasRecordGarbledAnswers,
  isEndpointMismatchError,
  isLikelyGarbled,
  normalizeAnswerLabel,
  parseEvent,
  readRequestBody,
  withBucketClient,
};
