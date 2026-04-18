const test = require('node:test');
const assert = require('node:assert/strict');

const { handler, __test } = require('./index.js');

function invoke(eventPayload, context) {
  return new Promise((resolve, reject) => {
    handler(JSON.stringify(eventPayload), context, (error, response) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(response);
    });
  });
}

test('health check returns FC HTTP response shape for HTTP trigger event', async () => {
  const response = await invoke({
    version: 'v1',
    rawPath: '/health',
    headers: {},
    body: '',
    isBase64Encoded: false,
    requestContext: {
      http: {
        method: 'GET',
        path: '/health',
      },
    },
  });

  assert.equal(response.statusCode, 200);
  assert.equal(response.isBase64Encoded, false);
  assert.equal(response.headers['Content-Type'], 'application/json; charset=utf-8');
  assert.equal(response.headers['Access-Control-Allow-Origin'], '*');

  const payload = JSON.parse(response.body);
  assert.equal(payload.ok, true);
  assert.deepEqual(payload.regionCandidates, ['oss-cn-beijing', 'oss-cn-hangzhou']);
  assert.equal(payload.hasRuntimeCredentials, false);
});

test('aggregate reflects updated response records in totals and rankings', () => {
  const records = [
    {
      submittedAt: '2026-04-17T10:00:00.000Z',
      answers: {
        identity: '高校学生',
        visitLevel: '从未到访',
        familiarity: '听说过但不系统',
        willingness: '愿意',
        themes: ['爱国主义', '人物故事'],
        channels: ['公众号/短视频'],
        painPoint: '路线不清',
        wantPrevisit: '非常需要',
        wantAssistant: '需要',
        wantReview: '需要',
        needBilingual: '有必要',
        priorityNeed: '希望先把路线讲清楚。',
      },
    },
    {
      submittedAt: '2026-04-17T11:00:00.000Z',
      answers: {
        identity: '教师',
        visitLevel: '去过1馆',
        familiarity: '基本了解',
        willingness: '非常愿意',
        themes: ['地方历史'],
        channels: ['学校课程/老师讲解'],
        painPoint: '信息分散',
        wantPrevisit: '需要',
        wantAssistant: '非常需要',
        wantReview: '需要',
        needBilingual: '非常有必要',
        priorityNeed: '希望内容入口更集中。',
      },
    },
  ];

  const firstStats = __test.aggregate(records);
  assert.equal(firstStats.totalResponses, 2);
  assert.equal(firstStats.questionStats.identity['高校学生'], 1);
  assert.deepEqual(firstStats.topIssues, ['路线不清', '信息分散']);

  records.push({
    submittedAt: '2026-04-17T12:00:00.000Z',
    answers: {
      identity: '高校学生',
      visitLevel: '去过2馆',
      familiarity: '不太了解',
      willingness: '看情况',
      themes: ['爱国主义'],
      channels: ['搜索引擎/网站'],
      painPoint: '路线不清',
      wantPrevisit: '需要',
      wantAssistant: '一般',
      wantReview: '非常需要',
      needBilingual: '一般',
      priorityNeed: '想先看到更明确的参观路线。',
    },
  });

  const updatedStats = __test.aggregate(records);
  assert.equal(updatedStats.totalResponses, 3);
  assert.equal(updatedStats.latestSubmittedAt, '2026-04-17T12:00:00.000Z');
  assert.equal(updatedStats.questionStats.identity['高校学生'], 2);
  assert.equal(updatedStats.questionStats.painPoint['路线不清'], 2);
  assert.deepEqual(updatedStats.topIssues, ['路线不清', '信息分散']);
  assert.deepEqual(updatedStats.sampleQuotes, [
    '希望先把路线讲清楚。',
    '希望内容入口更集中。',
    '想先看到更明确的参观路线。',
  ]);
});

test('OSS region candidates prioritize the confirmed bucket region', () => {
  assert.deepEqual(__test.getOssRegionCandidates(), ['oss-cn-beijing', 'oss-cn-hangzhou']);
  assert.equal(
    __test.isEndpointMismatchError(new Error('The bucket you are attempting to access must be addressed using the specified endpoint.')),
    true
  );
});

test('aggregate builds trend, detail rows, device stats, and hides garbled labels', () => {
  const records = [
    {
      submittedAt: '2026-04-18T03:10:00.000Z',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/123.0.0.0 Safari/537.36',
      answers: {
        identity: '高校学生',
        visitLevel: '从未到访',
        familiarity: '听说过但不系统',
        willingness: '愿意',
        themes: ['爱国主义'],
        channels: ['搜索引擎/网站'],
        painPoint: '路线不清',
        wantPrevisit: '需要',
        wantAssistant: '需要',
        wantReview: '需要',
        needBilingual: '有必要',
        priorityNeed: '希望优先把路线讲清楚。',
      },
    },
    {
      submittedAt: '2026-04-18T03:50:00.000Z',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Version/17.0 Mobile/15E148 Safari/604.1',
      answers: {
        identity: '????',
        visitLevel: '去过1馆',
        familiarity: '基本了解',
        willingness: '愿意',
        themes: ['地方历史'],
        channels: ['学校课程/老师讲解'],
        painPoint: '信息分散',
        wantPrevisit: '需要',
        wantAssistant: '需要',
        wantReview: '需要',
        needBilingual: '有必要',
        priorityNeed: '???????????',
      },
    },
  ];

  const stats = __test.aggregate(records);

  assert.equal(stats.totalResponses, 2);
  assert.equal(stats.validResponses, 1);
  assert.equal(stats.flaggedResponses, 1);
  assert.deepEqual(stats.topIssues, ['路线不清', '信息分散']);
  assert.deepEqual(stats.sampleQuotes, ['希望优先把路线讲清楚。']);
  assert.deepEqual(stats.collectionTrend, [
    { label: '04-18 03:00', count: 2 },
  ]);

  assert.equal(stats.deviceStats.deviceTypes[0].label, '桌面端');
  assert.equal(stats.deviceStats.deviceTypes[0].count, 1);
  assert.equal(stats.deviceStats.deviceTypes[1].label, '移动端');
  assert.equal(stats.deviceStats.deviceTypes[1].count, 1);
  assert.equal(stats.deviceStats.systems[0].label, 'Windows');
  assert.equal(stats.deviceStats.systems[1].label, 'iOS');

  assert.equal(stats.detailRows.length, 2);
  assert.equal(stats.detailRows[0].responseQuality, '疑似乱码');
  assert.equal(stats.detailRows[0].identity, '异常编码样本');
  assert.equal(stats.detailRows[0].deviceType, '移动端');
  assert.equal(stats.detailRows[1].responseQuality, '正常');
  assert.equal(stats.detailRows[1].identity, '高校学生');
  assert.equal(stats.detailRows[1].deviceType, '桌面端');
});
