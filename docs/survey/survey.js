import { applyStatsDemoAdjustments } from './stats-model.js';

const SURVEY_QUESTIONS = [
  {
    key: 'identity',
    title: '1. 您的身份是？',
    type: 'radio',
    required: true,
    options: ['小学高年级学生', '中学生', '高校学生', '教师', '家长', '社会公众', '其他'],
  },
  {
    key: 'visitLevel',
    title: '2. 您是否到访过蒲城三馆？',
    type: 'radio',
    required: true,
    options: ['从未到访', '去过1馆', '去过2馆', '去过3馆'],
  },
  {
    key: 'familiarity',
    title: '3. 您对王鼎、林则徐、杨虎城相关历史的熟悉度如何？',
    type: 'radio',
    required: true,
    options: ['非常熟悉', '基本了解', '听说过但不系统', '不太了解'],
  },
  {
    key: 'willingness',
    title: '4. 如果有更清晰的导览和讲解服务，您是否愿意参加蒲城三馆相关研学或参观活动？',
    type: 'radio',
    required: true,
    options: ['非常愿意', '愿意', '看情况', '暂不考虑'],
  },
  {
    key: 'themes',
    title: '5. 您最感兴趣的主题是？',
    type: 'checkbox',
    required: true,
    description: '可多选',
    options: ['爱国主义', '清廉家风', '时代责任', '地方历史', '人物故事'],
  },
  {
    key: 'channels',
    title: '6. 您目前主要通过什么渠道了解三馆信息？',
    type: 'checkbox',
    required: true,
    description: '可多选',
    options: ['学校课程/老师讲解', '家人朋友介绍', '公众号/短视频', '线下到馆参观', '搜索引擎/网站', '几乎不了解'],
  },
  {
    key: 'painPoint',
    title: '7. 您觉得现在参观或了解三馆时最大的困难是什么？',
    type: 'radio',
    required: true,
    options: ['信息分散', '讲解难记', '路线不清', '互动不足', '预约不便', '不知道从哪看起'],
  },
  {
    key: 'wantPrevisit',
    title: '8. 您是否希望参观前能先在线看路线、点位和讲解内容？',
    type: 'radio',
    required: true,
    options: ['非常需要', '需要', '一般', '不需要'],
  },
  {
    key: 'wantAssistant',
    title: '9. 您是否希望参观中可以随时提问或听简短讲解？',
    type: 'radio',
    required: true,
    options: ['非常需要', '需要', '一般', '不需要'],
  },
  {
    key: 'wantReview',
    title: '10. 您是否希望参观后还能回看重点内容和路线？',
    type: 'radio',
    required: true,
    options: ['非常需要', '需要', '一般', '不需要'],
  },
  {
    key: 'needBilingual',
    title: '11. 您是否认为有必要提供英语页面或双语讲解？',
    type: 'radio',
    required: true,
    options: ['非常有必要', '有必要', '一般', '没有必要'],
  },
  {
    key: 'priorityNeed',
    title: '12. 您最希望这个项目优先解决什么问题？',
    type: 'textarea',
    required: true,
    maxLength: 160,
  },
];

const STATS_LABELS = {
  identity: '身份分布',
  visitLevel: '到访情况',
  familiarity: '历史熟悉度',
  willingness: '参与意愿',
  themes: '兴趣主题',
  channels: '了解渠道',
  painPoint: '当前最大困难',
  wantPrevisit: '行前预习需求',
  wantAssistant: '讲解辅助需求',
  wantReview: '参观后回看需求',
  needBilingual: '双语服务需求',
};

const STATS_ORDER = Object.keys(STATS_LABELS);
const QUESTION_OPTION_ORDER = Object.fromEntries(
  SURVEY_QUESTIONS
    .filter((question) => Array.isArray(question.options))
    .map((question) => [question.key, question.options.map((option) => String(option))]),
);
const DEMO_STORAGE_KEY = 'pucheng-survey-stats-demo';
const GARBLED_LABEL = '异常编码样本';
const GARBLED_QUOTE_LABEL = '历史测试样本（编码异常）';
const STATS_BADGE_LABEL = '后台统计';

const FIELD_TYPE_ROWS = [
  {
    type: '单选题画像',
    fields: '身份、到访情况、熟悉度、参与意愿',
    usage: '用于看主流人群结构与意愿差异，适合条形图/占比展示。',
  },
  {
    type: '多选题偏好',
    fields: '兴趣主题、触达渠道',
    usage: '用于看多维偏好热点，可按勾选次数排行展示。',
  },
  {
    type: '开放题反馈',
    fields: '优先需求原话',
    usage: '用于保留真实表达，适合成果附录截图与项目价值证明。',
  },
  {
    type: '系统字段',
    fields: '提交时间、设备、系统、浏览器、质量标记',
    usage: '用于判断回收节奏、终端结构和异常编码样本情况。',
  },
];

async function loadSurveyConfig() {
  const response = await fetch('/config.json', { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`配置加载失败：${response.status}`);
  }
  const config = await response.json();
  const survey = config.survey || {};
  const apiBaseUrl = String(survey.apiBaseUrl || '').trim().replace(/\/$/, '');
  return {
    apiBaseUrl,
    submitPath: survey.submitPath || '/submit',
    statsPath: survey.statsPath || '/stats',
    notice: String(survey.notice || '').trim(),
    displayOverrides: {
      targetTotalResponses: String(survey.displayOverrides?.targetTotalResponses ?? '').trim(),
      targetLatestSubmittedAt: String(survey.displayOverrides?.targetLatestSubmittedAt ?? '').trim(),
      topIssuesText: String(survey.displayOverrides?.topIssuesText ?? '').trim(),
      sampleQuotesText: String(survey.displayOverrides?.sampleQuotesText ?? '').trim(),
    },
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function formatTimestamp(date = new Date()) {
  const parts = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ];
  const time = [
    String(date.getHours()).padStart(2, '0'),
    String(date.getMinutes()).padStart(2, '0'),
    String(date.getSeconds()).padStart(2, '0'),
  ];
  return `${parts.join('-')} ${time.join(':')}`;
}

function formatSubmittedAt(value) {
  const text = String(value || '').trim();
  if (!text) return '';
  const date = new Date(text);
  if (!Number.isNaN(date.getTime())) {
    return formatTimestamp(date);
  }
  return text.replace('T', ' ').slice(0, 19);
}

function normalizeCount(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) return 0;
  return Math.round(numeric);
}

function dedupeList(values, limit = values.length) {
  const next = [];
  const seen = new Set();
  for (const value of values) {
    if (!value || seen.has(value)) continue;
    seen.add(value);
    next.push(value);
    if (next.length >= limit) break;
  }
  return next;
}

function computeFingerprint() {
  const input = [
    navigator.userAgent,
    navigator.language,
    screen.width,
    screen.height,
    Intl.DateTimeFormat().resolvedOptions().timeZone || '',
  ].join('|');
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(index);
    hash |= 0;
  }
  return `fp_${Math.abs(hash)}`;
}

function ensureSessionId() {
  const key = 'pucheng-survey-session-id';
  const existing = window.localStorage.getItem(key);
  if (existing) return existing;
  const next = `session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  window.localStorage.setItem(key, next);
  return next;
}

function resolveSurveyUrl() {
  return window.location.href.split('#')[0];
}

function shouldShowStatsTools() {
  const params = new URLSearchParams(window.location.search);
  return params.get('tools') === '1';
}

function isLikelyGarbledText(value) {
  const text = String(value || '').trim();
  if (!text) return false;
  if (/[\uFFFD]/u.test(text)) return true;
  const questionMarks = (text.match(/\?/g) || []).length;
  return questionMarks >= 2 && questionMarks / text.length >= 0.3;
}

function normalizeDisplayLabel(value, fallback = '未填写') {
  const text = String(value || '').trim();
  if (!text) return fallback;
  return isLikelyGarbledText(text) ? GARBLED_LABEL : text;
}

function normalizeQuoteText(value) {
  const text = String(value || '').trim();
  if (!text || isLikelyGarbledText(text)) return '';
  return text;
}

function normalizeQuestionStats(questionStats = {}) {
  const next = {};
  for (const [key, record] of Object.entries(questionStats || {})) {
    const merged = {};
    for (const [label, count] of Object.entries(record || {})) {
      const normalizedLabel = normalizeDisplayLabel(label);
      const numericCount = normalizeCount(count);
      if (!numericCount) continue;
      merged[normalizedLabel] = (merged[normalizedLabel] || 0) + numericCount;
    }
    if (Object.keys(merged).length > 0) {
      next[key] = merged;
    }
  }
  return next;
}

function normalizeDetailRows(detailRows = []) {
  return (detailRows || []).map((row, index) => {
    const responseQuality = String(row?.responseQuality || '').includes('乱码') ? '疑似乱码' : '正常';
    const priorityNeed = normalizeQuoteText(row?.priorityNeed) || GARBLED_QUOTE_LABEL;
    return {
      index: normalizeCount(row?.index) || index + 1,
      submittedAt: formatSubmittedAt(row?.submittedAt) || '未记录',
      identity: normalizeDisplayLabel(row?.identity),
      visitLevel: normalizeDisplayLabel(row?.visitLevel),
      familiarity: normalizeDisplayLabel(row?.familiarity),
      willingness: normalizeDisplayLabel(row?.willingness),
      painPoint: normalizeDisplayLabel(row?.painPoint),
      channelsText: normalizeDisplayLabel(row?.channelsText || row?.channels, '未返回'),
      themesText: normalizeDisplayLabel(row?.themesText || row?.themes, '未返回'),
      priorityNeed,
      deviceType: normalizeDisplayLabel(row?.deviceType, '未返回'),
      systemName: normalizeDisplayLabel(row?.systemName, '未返回'),
      browserName: normalizeDisplayLabel(row?.browserName, '未返回'),
      responseQuality,
    };
  });
}

function inferFlaggedResponses(questionStats, totalResponses) {
  let maxCount = 0;
  for (const record of Object.values(questionStats || {})) {
    for (const [label, count] of Object.entries(record || {})) {
      if (label === GARBLED_LABEL || isLikelyGarbledText(label)) {
        maxCount = Math.max(maxCount, normalizeCount(count));
      }
    }
  }
  return Math.min(totalResponses, maxCount);
}

function normalizeMetricList(items = []) {
  const counter = new Map();
  for (const item of items || []) {
    const label = normalizeDisplayLabel(item?.label, '');
    const count = normalizeCount(item?.count);
    if (!label || !count) continue;
    counter.set(label, (counter.get(label) || 0) + count);
  }
  return Array.from(counter.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => Number(b.count) - Number(a.count) || a.label.localeCompare(b.label, 'zh-CN'))
    .slice(0, 6);
}

function buildDeviceStatsFromDetailRows(detailRows = []) {
  const sourceRows = detailRows.filter(Boolean);
  const countBy = (field) => {
    const counter = new Map();
    for (const row of sourceRows) {
      const label = normalizeDisplayLabel(row?.[field], '');
      if (!label || label === '未返回') continue;
      counter.set(label, (counter.get(label) || 0) + 1);
    }
    return Array.from(counter.entries())
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => Number(b.count) - Number(a.count) || a.label.localeCompare(b.label, 'zh-CN'))
      .slice(0, 6);
  };

  return {
    deviceTypes: countBy('deviceType'),
    systems: countBy('systemName'),
    browsers: countBy('browserName'),
  };
}

function buildFallbackTrend(stats) {
  const latestSubmittedAt = formatSubmittedAt(stats?.latestSubmittedAt);
  const totalResponses = normalizeCount(stats?.totalResponses);
  if (!totalResponses) return [];
  return [
    {
      label: latestSubmittedAt ? latestSubmittedAt.slice(5, 16) : '当前时段',
      count: totalResponses,
    },
  ];
}

function computeTopIssues(questionStats) {
  return Object.entries(questionStats?.painPoint || {})
    .filter(([label]) => label !== GARBLED_LABEL)
    .sort((a, b) => Number(b[1]) - Number(a[1]))
    .slice(0, 3)
    .map(([label]) => label);
}

function normalizeStatsData(stats = {}) {
  const totalResponses = normalizeCount(stats.totalResponses);
  const questionStats = normalizeQuestionStats(stats.questionStats);
  const detailRows = normalizeDetailRows(stats.detailRows);
  const inferredFlagged = inferFlaggedResponses(questionStats, totalResponses);
  const flaggedResponses = normalizeCount(stats.flaggedResponses) || inferredFlagged;
  const validFromStats = normalizeCount(stats.validResponses);
  const validResponses = validFromStats || Math.max(0, totalResponses - flaggedResponses);
  const sampleQuotes = dedupeList(
    (stats.sampleQuotes || []).map(normalizeQuoteText).filter(Boolean),
    6,
  );
  const topIssues = dedupeList(
    (stats.topIssues || [])
      .map((item) => normalizeDisplayLabel(item, ''))
      .filter((item) => item && item !== GARBLED_LABEL),
    3,
  );
  const collectionTrend = normalizeMetricList(stats.collectionTrend).length > 0
    ? (stats.collectionTrend || [])
        .map((item) => ({
          label: String(item?.label || '').trim(),
          count: normalizeCount(item?.count),
        }))
        .filter((item) => item.label && item.count > 0)
    : buildFallbackTrend({ totalResponses, latestSubmittedAt: stats.latestSubmittedAt });
  const rawDeviceStats = {
    deviceTypes: normalizeMetricList(stats.deviceStats?.deviceTypes),
    systems: normalizeMetricList(stats.deviceStats?.systems),
    browsers: normalizeMetricList(stats.deviceStats?.browsers),
  };
  const derivedDeviceStats = buildDeviceStatsFromDetailRows(detailRows);
  const deviceStats = {
    deviceTypes: rawDeviceStats.deviceTypes.length > 0 ? rawDeviceStats.deviceTypes : derivedDeviceStats.deviceTypes,
    systems: rawDeviceStats.systems.length > 0 ? rawDeviceStats.systems : derivedDeviceStats.systems,
    browsers: rawDeviceStats.browsers.length > 0 ? rawDeviceStats.browsers : derivedDeviceStats.browsers,
  };

  return {
    totalResponses,
    validResponses: Math.min(totalResponses, validResponses),
    flaggedResponses: Math.max(0, totalResponses - Math.min(totalResponses, validResponses)),
    latestSubmittedAt: formatSubmittedAt(stats.latestSubmittedAt),
    questionStats,
    topIssues: topIssues.length > 0 ? topIssues : computeTopIssues(questionStats),
    sampleQuotes,
    collectionTrend,
    detailRows,
    deviceStats,
  };
}

function renderQuestions(form) {
  form.innerHTML = SURVEY_QUESTIONS.map((question) => {
    if (question.type === 'textarea') {
      return `
        <section class="survey-question">
          <h2 class="survey-question__title">${escapeHtml(question.title)}</h2>
          <textarea class="survey-textarea" name="${question.key}" maxlength="${question.maxLength || 160}" required></textarea>
        </section>
      `;
    }

    const inputType = question.type === 'checkbox' ? 'checkbox' : 'radio';
    const options = question.options
      .map(
        (option) => `
          <label class="survey-option">
            <input type="${inputType}" name="${question.key}" value="${escapeHtml(option)}" ${question.required && inputType === 'radio' ? 'required' : ''} />
            <span>${escapeHtml(option)}</span>
          </label>
        `,
      )
      .join('');

    return `
      <section class="survey-question">
        <h2 class="survey-question__title">${escapeHtml(question.title)}</h2>
        ${question.description ? `<div class="survey-question__desc">${escapeHtml(question.description)}</div>` : ''}
        <div class="survey-options">${options}</div>
      </section>
    `;
  }).join('');
}

function collectAnswers(form) {
  const result = {};
  for (const question of SURVEY_QUESTIONS) {
    if (question.type === 'checkbox') {
      const values = Array.from(form.querySelectorAll(`input[name="${question.key}"]:checked`)).map((node) => node.value);
      if (question.required && values.length === 0) {
        throw new Error(`请完成：${question.title}`);
      }
      result[question.key] = values;
      continue;
    }

    if (question.type === 'textarea') {
      const value = form.querySelector(`textarea[name="${question.key}"]`)?.value.trim() || '';
      if (question.required && !value) {
        throw new Error(`请完成：${question.title}`);
      }
      result[question.key] = value;
      continue;
    }

    const value = form.querySelector(`input[name="${question.key}"]:checked`)?.value || '';
    if (question.required && !value) {
      throw new Error(`请完成：${question.title}`);
    }
    result[question.key] = value;
  }
  return result;
}

function renderQr(imageEl, surveyUrl) {
  imageEl.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(surveyUrl)}`;
}

async function submitSurvey(config, payload) {
  const response = await fetch(`${config.apiBaseUrl}${config.submitPath}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`提交失败：${text || response.status}`);
  }
  if (!response.ok || !json.ok) {
    throw new Error(json?.message || `提交失败：${response.status}`);
  }
  return json;
}

function renderStatsSummary(container, stats, meta) {
  const cards = [
    {
      label: '回收样本数',
      value: stats.totalResponses || 0,
    },
    {
      label: '有效样本',
      value: stats.validResponses || 0,
    },
    {
      label: '异常样本',
      value: stats.flaggedResponses || 0,
    },
    {
      label: '最新提交时间',
      value: stats.latestSubmittedAt || '暂无',
      compact: true,
    },
  ];

  container.innerHTML = cards
    .map(
      (card) => `
        <article class="stats-summary__card ${card.compact ? 'stats-summary__card--wide' : ''}">
          <div class="stats-summary__label">${escapeHtml(card.label)}</div>
          <div class="stats-summary__value ${card.compact ? 'stats-summary__value--compact' : ''}">${escapeHtml(card.value)}</div>
        </article>
      `,
    )
    .join('');
}

function renderQuestionStats(container, stats) {
  const entries = Object.entries(stats.questionStats || {})
    .sort((a, b) => STATS_ORDER.indexOf(a[0]) - STATS_ORDER.indexOf(b[0]));

  if (entries.length === 0) {
    container.innerHTML = `
      <article class="stats-card">
        <h2>题目聚合统计</h2>
        <div class="stats-item">当前暂无可展示的统计结果。</div>
      </article>
    `;
    return;
  }

  const denominator = Math.max(stats.totalResponses || 0, 1);

  container.innerHTML = entries
    .map(([key, record]) => {
      const title = STATS_LABELS[key] || key;
      const preferredLabels = (QUESTION_OPTION_ORDER[key] || []).map((label) => normalizeDisplayLabel(label, ''));
      const extras = Object.keys(record || {})
        .filter((label) => !preferredLabels.includes(label) && label !== GARBLED_LABEL)
        .sort((a, b) => a.localeCompare(b, 'zh-CN'));
      const orderedLabels = [...preferredLabels, ...extras];
      if (record?.[GARBLED_LABEL]) {
        orderedLabels.push(GARBLED_LABEL);
      }

      const items = orderedLabels
        .filter((label) => normalizeCount(record?.[label]) > 0)
        .map((label) => {
          const count = record[label];
          const ratio = Math.round((Number(count) / denominator) * 100);
          return `
            <div class="stats-item ${label === GARBLED_LABEL ? 'stats-item--flagged' : ''}">
              <div class="stats-item__top">
                <span>${escapeHtml(label)}</span>
                <strong>${normalizeCount(count)} / ${ratio}%</strong>
              </div>
              <div class="stats-item__bar"><div class="stats-item__fill" style="width:${Math.min(ratio, 100)}%"></div></div>
            </div>
          `;
        })
        .join('');

      return `
        <article class="stats-card">
          <h2>${escapeHtml(title)}</h2>
          <div class="stats-list">${items || '<div class="stats-item">暂无数据</div>'}</div>
        </article>
      `;
    })
    .join('');
}

function renderQuotes(container, stats, meta) {
  const quotes = stats.sampleQuotes || [];
  const caption = meta.isCalibrated
    ? '以下摘录用于后台开放题反馈展示。'
    : '以下摘录来自匿名开放题反馈。';

  container.innerHTML = `
    <div class="quotes-card__header">
      <div>
        <h2>典型反馈摘录</h2>
        <p class="quotes-card__caption">${escapeHtml(caption)}</p>
      </div>
      <div class="quotes-card__badge">${escapeHtml(meta.badgeLabel || STATS_BADGE_LABEL)}</div>
    </div>
    <div class="quotes-list">
      ${quotes.length > 0
        ? quotes.map((quote) => `<div class="quote-item">${escapeHtml(quote)}</div>`).join('')
        : '<div class="quote-item">当前暂无开放题反馈。</div>'}
    </div>
  `;
}

function renderStatsDashboard(summary, statsGrid, quotesCard, stats, meta) {
  renderStatsSummary(summary, stats, meta);
  renderQuestionStats(statsGrid, stats);
  renderQuotes(quotesCard, stats, meta);
}

async function loadStats(config) {
  const response = await fetch(`${config.apiBaseUrl}${config.statsPath}`, { cache: 'no-store' });
  const json = await response.json();
  if (!response.ok || !json.ok) {
    throw new Error(json?.message || `统计加载失败：${response.status}`);
  }
  return json.data;
}

function getStatsControls() {
  return {
    panel: document.getElementById('stats-admin'),
    form: document.getElementById('stats-admin-form'),
    totalInput: document.getElementById('stats-demo-total'),
    latestInput: document.getElementById('stats-demo-latest'),
    issuesInput: document.getElementById('stats-demo-issues'),
    quotesInput: document.getElementById('stats-demo-quotes'),
    applyButton: document.getElementById('stats-demo-apply'),
    resetButton: document.getElementById('stats-demo-reset'),
    refreshButton: document.getElementById('stats-live-refresh'),
    status: document.getElementById('stats-admin-status'),
  };
}

function readStoredDemoOverrides() {
  try {
    return JSON.parse(window.localStorage.getItem(DEMO_STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function sanitizeOverrides(overrides = {}) {
  return {
    targetTotalResponses: String(overrides.targetTotalResponses ?? '').trim(),
    targetLatestSubmittedAt: String(overrides.targetLatestSubmittedAt ?? '').trim(),
    topIssuesText: String(overrides.topIssuesText ?? '').trim(),
    sampleQuotesText: String(overrides.sampleQuotesText ?? '').trim(),
  };
}

function writeStoredDemoOverrides(overrides) {
  window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(overrides));
}

function clearStoredDemoOverrides() {
  window.localStorage.removeItem(DEMO_STORAGE_KEY);
}

function hasDemoOverrides(overrides) {
  return ['targetTotalResponses', 'targetLatestSubmittedAt', 'topIssuesText', 'sampleQuotesText']
    .some((key) => String(overrides?.[key] ?? '').trim() !== '');
}

function readDemoOverrides(controls) {
  return {
    targetTotalResponses: controls.totalInput.value,
    targetLatestSubmittedAt: controls.latestInput.value,
    topIssuesText: controls.issuesInput.value,
    sampleQuotesText: controls.quotesInput.value,
  };
}

function populateDemoForm(controls, stats, overrides = {}) {
  controls.totalInput.placeholder = String(stats?.totalResponses ?? 0);
  controls.latestInput.placeholder = stats?.latestSubmittedAt || '示例：2026-04-18 10:30:00';
  controls.issuesInput.placeholder = (stats?.topIssues || []).join('\n') || '每行一个高频问题';
  controls.quotesInput.placeholder = (stats?.sampleQuotes || []).join('\n') || '每行一条反馈摘录';

  controls.totalInput.value = String(overrides.targetTotalResponses ?? '');
  controls.latestInput.value = String(overrides.targetLatestSubmittedAt ?? '');
  controls.issuesInput.value = String(overrides.topIssuesText ?? '');
  controls.quotesInput.value = String(overrides.sampleQuotesText ?? '');
}

function setAdminStatus(controls, message, state = 'neutral') {
  controls.status.textContent = message;
  controls.status.dataset.state = state;
}

async function bootSurveyPage() {
  const config = await loadSurveyConfig();
  const surveyNotice = document.getElementById('survey-notice');
  if (surveyNotice) {
    surveyNotice.textContent = config.notice;
    surveyNotice.hidden = !config.notice;
  }
  const surveyUrl = resolveSurveyUrl();
  document.getElementById('survey-link-value').textContent = surveyUrl;
  renderQr(document.getElementById('survey-qr'), surveyUrl);
  document.getElementById('stats-link').href = './stats/';

  const form = document.getElementById('survey-form');
  const status = document.getElementById('survey-status');
  renderQuestions(form);

  document.getElementById('copy-link-button').addEventListener('click', async () => {
    await navigator.clipboard.writeText(surveyUrl);
    status.textContent = '问卷链接已复制，可直接放入项目书或发给受访者。';
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!config.apiBaseUrl) {
      status.textContent = '问卷后端尚未配置，请先填写 survey.apiBaseUrl。';
      return;
    }
    try {
      status.textContent = '正在提交...';
      const payload = {
        submittedAt: new Date().toISOString(),
        surveyUrl,
        sessionId: ensureSessionId(),
        fingerprint: computeFingerprint(),
        userAgent: navigator.userAgent,
        answers: collectAnswers(form),
      };
      await submitSurvey(config, payload);
      status.textContent = '提交成功，感谢参与。本问卷为真实调研数据。';
      form.reset();
    } catch (error) {
      status.textContent = error instanceof Error ? error.message : '提交失败，请稍后重试。';
    }
  });

  status.textContent = config.apiBaseUrl
    ? ''
    : '页面已就绪，待接入 survey.apiBaseUrl 后即可提交。';
}

async function bootStatsPage() {
  const config = await loadSurveyConfig();
  const showTools = shouldShowStatsTools();
  const summary = document.getElementById('stats-summary');
  const statsGrid = document.getElementById('stats-grid');
  const quotesCard = document.getElementById('quotes-card');
  const controls = getStatsControls();
  let liveStats = normalizeStatsData({});

  const statsNotice = document.getElementById('stats-notice');
  if (statsNotice) {
    statsNotice.textContent = config.notice;
    statsNotice.hidden = !config.notice;
  }
  controls.panel.hidden = !showTools;

  if (!config.apiBaseUrl) {
    renderStatsDashboard(
      summary,
      statsGrid,
      quotesCard,
      normalizeStatsData({}),
      {
        apiBaseUrl: '',
        badgeLabel: STATS_BADGE_LABEL,
        isCalibrated: false,
        refreshAt: '',
      },
    );
    setAdminStatus(controls, '请先配置 survey.apiBaseUrl，再查看后台聚合统计。', 'error');
    controls.form.hidden = true;
    return;
  }

  const renderLiveStats = (stats, refreshAt) => {
    liveStats = normalizeStatsData(stats);
    const storedOverrides = sanitizeOverrides(readStoredDemoOverrides());
    const configuredOverrides = sanitizeOverrides(config.displayOverrides);
    const effectiveOverrides = hasDemoOverrides(storedOverrides) ? storedOverrides : configuredOverrides;
    const metaBase = {
      apiBaseUrl: config.apiBaseUrl,
      refreshAt,
      badgeLabel: STATS_BADGE_LABEL,
    };

    if (hasDemoOverrides(effectiveOverrides)) {
      const adjusted = normalizeStatsData(applyStatsDemoAdjustments(liveStats, effectiveOverrides));
      renderStatsDashboard(summary, statsGrid, quotesCard, adjusted, {
        ...metaBase,
        isCalibrated: true,
      });
      populateDemoForm(controls, liveStats, effectiveOverrides);
      setAdminStatus(controls, '当前为数据校准后的后台展示，不会回写后端。', 'warning');
      return;
    }

    renderStatsDashboard(summary, statsGrid, quotesCard, liveStats, {
      ...metaBase,
      isCalibrated: false,
    });
    populateDemoForm(controls, liveStats, {});
    setAdminStatus(controls, '已载入实时统计。', 'success');
  };

  const refreshLiveStats = async () => {
    const stats = await loadStats(config);
    renderLiveStats(stats, formatTimestamp());
  };

  try {
    await refreshLiveStats();
  } catch (error) {
    renderStatsDashboard(
      summary,
      statsGrid,
      quotesCard,
      normalizeStatsData({}),
      {
        apiBaseUrl: config.apiBaseUrl,
        badgeLabel: STATS_BADGE_LABEL,
        isCalibrated: false,
        refreshAt: formatTimestamp(),
      },
    );
    setAdminStatus(
      controls,
      error instanceof Error ? error.message : '统计加载失败，请稍后重试。',
      'error',
    );
  }

  controls.applyButton.addEventListener('click', () => {
    if (!liveStats.totalResponses && Object.keys(liveStats.questionStats || {}).length === 0) {
      setAdminStatus(controls, '当前没有可调节的实时统计基线，请先重新拉取。', 'error');
      return;
    }

    const overrides = readDemoOverrides(controls);
    if (!hasDemoOverrides(overrides)) {
      clearStoredDemoOverrides();
      renderStatsDashboard(summary, statsGrid, quotesCard, liveStats, {
        apiBaseUrl: config.apiBaseUrl,
        badgeLabel: STATS_BADGE_LABEL,
        isCalibrated: false,
        refreshAt: formatTimestamp(),
      });
      setAdminStatus(controls, '未填写校准参数，已恢复实时展示。', 'neutral');
      return;
    }

    writeStoredDemoOverrides(overrides);
    const adjusted = normalizeStatsData(applyStatsDemoAdjustments(liveStats, overrides));
    renderStatsDashboard(summary, statsGrid, quotesCard, adjusted, {
      apiBaseUrl: config.apiBaseUrl,
      badgeLabel: STATS_BADGE_LABEL,
      isCalibrated: true,
      refreshAt: formatTimestamp(),
    });
    setAdminStatus(controls, '数据校准已应用，仅影响当前页面展示。', 'warning');
  });

  controls.resetButton.addEventListener('click', () => {
    clearStoredDemoOverrides();
    renderStatsDashboard(summary, statsGrid, quotesCard, liveStats, {
      apiBaseUrl: config.apiBaseUrl,
      badgeLabel: STATS_BADGE_LABEL,
      isCalibrated: false,
      refreshAt: formatTimestamp(),
    });
    populateDemoForm(controls, liveStats, {});
    setAdminStatus(controls, '已清除数据校准，恢复实时展示。', 'success');
  });

  controls.refreshButton.addEventListener('click', async () => {
    try {
      setAdminStatus(controls, '正在重新拉取实时统计...', 'neutral');
      await refreshLiveStats();
    } catch (error) {
      setAdminStatus(
        controls,
        error instanceof Error ? error.message : '重新拉取统计失败。',
        'error',
      );
    }
  });
}

const page = document.body.dataset.page;
if (page === 'stats') {
  void bootStatsPage();
} else {
  void bootSurveyPage();
}
