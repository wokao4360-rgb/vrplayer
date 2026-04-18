const GARBLED_LABEL = '异常编码样本';

function normalizeCount(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) return 0;
  return Math.round(numeric);
}

function cloneQuestionStats(questionStats = {}) {
  const next = {};
  for (const [key, record] of Object.entries(questionStats)) {
    next[key] = {};
    for (const [label, count] of Object.entries(record || {})) {
      next[key][label] = normalizeCount(count);
    }
  }
  return next;
}

function cloneMetricList(items = []) {
  return (items || []).map((item) => ({
    label: String(item?.label || ''),
    count: normalizeCount(item?.count),
  }));
}

function cloneDeviceStats(deviceStats = {}) {
  return {
    deviceTypes: cloneMetricList(deviceStats.deviceTypes),
    systems: cloneMetricList(deviceStats.systems),
    browsers: cloneMetricList(deviceStats.browsers),
  };
}

function cloneCollectionTrend(collectionTrend = []) {
  return (collectionTrend || []).map((item) => ({
    label: String(item?.label || ''),
    count: normalizeCount(item?.count),
  }));
}

function cloneDetailRows(detailRows = []) {
  return (detailRows || []).map((row) => ({ ...row }));
}

function parseMultilineText(value) {
  return String(value || '')
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function scaleCount(count, factor) {
  const numericCount = normalizeCount(count);
  if (numericCount === 0) return 0;
  const value = Math.round(numericCount * factor);
  return value === 0 ? 1 : value;
}

function scaleQuestionStats(questionStats, sourceTotal, targetTotal) {
  if (targetTotal === 0) {
    return Object.fromEntries(
      Object.entries(questionStats || {}).map(([key, record]) => [
        key,
        Object.fromEntries(Object.keys(record || {}).map((label) => [label, 0])),
      ]),
    );
  }

  if (!sourceTotal || sourceTotal <= 0) {
    return cloneQuestionStats(questionStats);
  }

  const factor = targetTotal / sourceTotal;
  const scaled = {};
  for (const [key, record] of Object.entries(questionStats || {})) {
    scaled[key] = {};
    for (const [label, count] of Object.entries(record || {})) {
      scaled[key][label] = scaleCount(count, factor);
    }
  }
  return scaled;
}

function scaleMetricList(items, sourceTotal, targetTotal) {
  if (targetTotal === 0) {
    return (items || []).map((item) => ({
      label: String(item?.label || ''),
      count: 0,
    }));
  }

  if (!sourceTotal || sourceTotal <= 0) {
    return cloneMetricList(items);
  }

  const factor = targetTotal / sourceTotal;
  return (items || []).map((item) => ({
    label: String(item?.label || ''),
    count: scaleCount(item?.count, factor),
  }));
}

function scaleCollectionTrend(collectionTrend, sourceTotal, targetTotal) {
  if (targetTotal === 0) {
    return (collectionTrend || []).map((item) => ({
      label: String(item?.label || ''),
      count: 0,
    }));
  }

  if (!sourceTotal || sourceTotal <= 0) {
    return cloneCollectionTrend(collectionTrend);
  }

  const factor = targetTotal / sourceTotal;
  return (collectionTrend || []).map((item) => ({
    label: String(item?.label || ''),
    count: scaleCount(item?.count, factor),
  }));
}

function computeTopIssues(questionStats) {
  return Object.entries(questionStats?.painPoint || {})
    .filter(([label]) => label !== GARBLED_LABEL)
    .sort((a, b) => Number(b[1]) - Number(a[1]))
    .slice(0, 3)
    .map(([label]) => label);
}

function inferFlaggedResponses(stats, totalResponses) {
  const flaggedResponses = normalizeCount(stats?.flaggedResponses);
  if (flaggedResponses > 0) return flaggedResponses;

  const issueCount = normalizeCount(stats?.questionStats?.painPoint?.[GARBLED_LABEL]);
  if (issueCount > 0) return Math.min(totalResponses, issueCount);

  return 0;
}

export function applyStatsDemoAdjustments(stats, overrides = {}) {
  const sourceTotal = normalizeCount(stats?.totalResponses);
  const hasTargetTotal = String(overrides.targetTotalResponses ?? '').trim() !== '';
  const targetTotalResponses = hasTargetTotal
    ? Math.max(0, normalizeCount(overrides.targetTotalResponses))
    : sourceTotal;

  const questionStats = hasTargetTotal
    ? scaleQuestionStats(stats?.questionStats, sourceTotal, targetTotalResponses)
    : cloneQuestionStats(stats?.questionStats);

  const flaggedSource = inferFlaggedResponses(stats, sourceTotal);
  const validSource = normalizeCount(stats?.validResponses) || Math.max(0, sourceTotal - flaggedSource);
  const flaggedResponses = hasTargetTotal
    ? scaleCount(flaggedSource, sourceTotal > 0 ? targetTotalResponses / sourceTotal : 1)
    : flaggedSource;
  const validResponses = hasTargetTotal
    ? Math.max(0, targetTotalResponses - flaggedResponses)
    : validSource;

  const topIssues = parseMultilineText(overrides.topIssuesText);
  const sampleQuotes = parseMultilineText(overrides.sampleQuotesText);
  const latestSubmittedAt = String(overrides.targetLatestSubmittedAt || '').trim() || String(stats?.latestSubmittedAt || '');

  return {
    totalResponses: targetTotalResponses,
    validResponses,
    flaggedResponses: Math.max(0, targetTotalResponses - validResponses),
    latestSubmittedAt,
    questionStats,
    topIssues: topIssues.length > 0 ? topIssues.slice(0, 3) : computeTopIssues(questionStats),
    sampleQuotes: sampleQuotes.length > 0 ? sampleQuotes.slice(0, 6) : [...(stats?.sampleQuotes || [])],
    collectionTrend: hasTargetTotal
      ? scaleCollectionTrend(stats?.collectionTrend, sourceTotal, targetTotalResponses)
      : cloneCollectionTrend(stats?.collectionTrend),
    detailRows: cloneDetailRows(stats?.detailRows),
    deviceStats: hasTargetTotal
      ? {
          deviceTypes: scaleMetricList(stats?.deviceStats?.deviceTypes, sourceTotal, targetTotalResponses),
          systems: scaleMetricList(stats?.deviceStats?.systems, sourceTotal, targetTotalResponses),
          browsers: scaleMetricList(stats?.deviceStats?.browsers, sourceTotal, targetTotalResponses),
        }
      : cloneDeviceStats(stats?.deviceStats),
  };
}
