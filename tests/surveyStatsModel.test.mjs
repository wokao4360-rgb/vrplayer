import test from 'node:test';
import assert from 'node:assert/strict';

import { applyStatsDemoAdjustments } from '../public/survey/stats-model.js';

const baseStats = {
  totalResponses: 5,
  validResponses: 4,
  flaggedResponses: 1,
  latestSubmittedAt: '2026-04-17T12:00:00.000Z',
  questionStats: {
    identity: {
      高校学生: 3,
      教师: 2,
    },
    painPoint: {
      路线不清: 2,
      信息分散: 1,
      互动不足: 2,
    },
    themes: {
      爱国主义: 4,
      人物故事: 3,
    },
  },
  topIssues: ['路线不清', '互动不足'],
  sampleQuotes: ['希望路线更清楚。', '希望增加重点讲解。'],
  collectionTrend: [
    { label: '04-17 10:00', count: 2 },
    { label: '04-17 11:00', count: 3 },
  ],
  detailRows: [
    {
      index: 1,
      submittedAt: '2026-04-17T12:00:00.000Z',
      identity: '高校学生',
      visitLevel: '从未到访',
      familiarity: '听说过但不系统',
      willingness: '愿意',
      painPoint: '路线不清',
      channelsText: '搜索引擎/网站',
      themesText: '爱国主义',
      priorityNeed: '希望路线更清楚。',
      deviceType: '桌面端',
      systemName: 'Windows',
      browserName: 'Chrome',
      responseQuality: '正常',
    },
  ],
  deviceStats: {
    deviceTypes: [
      { label: '桌面端', count: 3 },
      { label: '移动端', count: 2 },
    ],
    systems: [
      { label: 'Windows', count: 3 },
      { label: 'iOS', count: 2 },
    ],
    browsers: [
      { label: 'Chrome', count: 4 },
      { label: 'Safari', count: 1 },
    ],
  },
};

test('applyStatsDemoAdjustments scales total responses and question counts', () => {
  const adjusted = applyStatsDemoAdjustments(baseStats, {
    targetTotalResponses: 20,
  });

  assert.equal(adjusted.totalResponses, 20);
  assert.equal(adjusted.validResponses, 16);
  assert.equal(adjusted.flaggedResponses, 4);
  assert.equal(adjusted.questionStats.identity['高校学生'], 12);
  assert.equal(adjusted.questionStats.identity['教师'], 8);
  assert.equal(adjusted.questionStats.painPoint['路线不清'], 8);
  assert.equal(adjusted.questionStats.themes['爱国主义'], 16);
  assert.deepEqual(adjusted.topIssues, ['路线不清', '互动不足', '信息分散']);
  assert.deepEqual(adjusted.collectionTrend, [
    { label: '04-17 10:00', count: 8 },
    { label: '04-17 11:00', count: 12 },
  ]);
  assert.deepEqual(adjusted.deviceStats.deviceTypes, [
    { label: '桌面端', count: 12 },
    { label: '移动端', count: 8 },
  ]);
  assert.equal(adjusted.detailRows.length, 1);
});

test('applyStatsDemoAdjustments applies manual latest time, issues, and quotes', () => {
  const adjusted = applyStatsDemoAdjustments(baseStats, {
    targetLatestSubmittedAt: '2026-04-18 10:30:00',
    topIssuesText: '路线不清\n讲解难记',
    sampleQuotesText: '希望增加导览地图\n希望支持英语讲解',
  });

  assert.equal(adjusted.latestSubmittedAt, '2026-04-18 10:30:00');
  assert.deepEqual(adjusted.topIssues, ['路线不清', '讲解难记']);
  assert.deepEqual(adjusted.sampleQuotes, ['希望增加导览地图', '希望支持英语讲解']);
});
