import test from 'node:test';
import assert from 'node:assert/strict';

import { buildSeedResponses } from '../scripts/surveySeedGenerator.mjs';

test('buildSeedResponses generates valid survey payloads with realistic fields', () => {
  const responses = buildSeedResponses({
    count: 5,
    startAt: '2026-04-01T08:00:00.000Z',
    surveyUrl: 'https://example.com/survey',
    seed: 42,
  });

  assert.equal(responses.length, 5);
  assert.equal(responses[0].surveyUrl, 'https://example.com/survey');
  assert.match(responses[0].sessionId, /^seed_session_/);
  assert.match(responses[0].fingerprint, /^seed_fp_/);
  assert.ok(Array.isArray(responses[0].answers.themes));
  assert.ok(Array.isArray(responses[0].answers.channels));
  assert.ok(responses[0].answers.themes.length >= 1);
  assert.ok(responses[0].answers.channels.length >= 1);
  assert.ok(typeof responses[0].answers.priorityNeed === 'string' && responses[0].answers.priorityNeed.length > 4);
  assert.notEqual(responses[0].submittedAt, responses[4].submittedAt);
});

test('buildSeedResponses can bias total volume without breaking required fields', () => {
  const responses = buildSeedResponses({
    count: 12,
    startAt: '2026-04-10T08:00:00.000Z',
    surveyUrl: 'https://example.com/survey',
    seed: 7,
  });

  const identities = new Set(responses.map((item) => item.answers.identity));
  const painPoints = new Set(responses.map((item) => item.answers.painPoint));

  assert.ok(identities.size >= 3);
  assert.ok(painPoints.has('路线不清'));
  assert.ok(painPoints.has('讲解难记') || painPoints.has('信息分散'));
  for (const response of responses) {
    assert.equal(typeof response.userAgent, 'string');
    assert.ok(response.userAgent.length > 10);
    assert.ok(response.answers.priorityNeed.includes('希望') || response.answers.priorityNeed.includes('讲解') || response.answers.priorityNeed.includes('路线'));
  }
});

test('buildSeedResponses supports school-heavy profile', () => {
  const responses = buildSeedResponses({
    count: 80,
    startAt: '2026-04-12T08:00:00.000Z',
    surveyUrl: 'https://example.com/survey',
    seed: 99,
    profile: 'school-heavy',
  });

  const identityCounts = responses.reduce((acc, item) => {
    acc[item.answers.identity] = (acc[item.answers.identity] || 0) + 1;
    return acc;
  }, {});

  const youngStudents = (identityCounts['小学高年级学生'] || 0) + (identityCounts['中学生'] || 0);
  const collegeStudents = identityCounts['高校学生'] || 0;

  assert.ok(youngStudents > collegeStudents);
  assert.ok((identityCounts['教师'] || 0) > 0);
});
