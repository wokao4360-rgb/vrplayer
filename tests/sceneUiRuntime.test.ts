import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const sceneUiRuntimeSource = readFileSync(
  new URL('../src/app/sceneUiRuntime.ts', import.meta.url),
  'utf8',
);

const qualityIndicatorSource = readFileSync(
  new URL('../src/ui/QualityIndicator.ts', import.meta.url),
  'utf8',
);

test('scene ui runtime no longer auto-mounts quality indicator from load status changes', () => {
  const handleStatusChangeStart = sceneUiRuntimeSource.indexOf('handleStatusChange(status: LoadStatus): void {');
  const handleStatusChangeEnd = sceneUiRuntimeSource.indexOf('dispose(): void {');
  assert.ok(handleStatusChangeStart >= 0, 'handleStatusChange should exist');
  assert.ok(handleStatusChangeEnd > handleStatusChangeStart, 'dispose should follow handleStatusChange');

  const handleStatusChangeBlock = sceneUiRuntimeSource.slice(handleStatusChangeStart, handleStatusChangeEnd);
  assert.ok(!handleStatusChangeBlock.includes('void this.mountObserver();'));
  assert.ok(!handleStatusChangeBlock.includes('!this.observerMounted'));
  assert.ok(handleStatusChangeBlock.includes('status === LoadStatus.HIGH_READY'));
  assert.ok(handleStatusChangeBlock.includes('status === LoadStatus.DEGRADED'));

  const scheduleObserverStart = sceneUiRuntimeSource.indexOf('scheduleObserverMount(): void {');
  const scheduleObserverEnd = sceneUiRuntimeSource.indexOf('scheduleFeatureWarmup(');
  assert.ok(scheduleObserverStart >= 0, 'scheduleObserverMount should exist');
  assert.ok(scheduleObserverEnd > scheduleObserverStart, 'scheduleFeatureWarmup should follow scheduleObserverMount');

  const scheduleObserverBlock = sceneUiRuntimeSource.slice(scheduleObserverStart, scheduleObserverEnd);
  assert.ok(scheduleObserverBlock.includes('if (!isQualityIndicatorDebugEnabled())'));

  const mountObserverStart = sceneUiRuntimeSource.indexOf('private async mountObserver(): Promise<void> {');
  assert.ok(mountObserverStart >= 0, 'mountObserver should exist');
  const mountObserverBlock = sceneUiRuntimeSource.slice(mountObserverStart);
  assert.ok(mountObserverBlock.includes('if (!isQualityIndicatorDebugEnabled())'));
});

test('quality indicator keeps a debug-only gate helper for optional loading', () => {
  assert.ok(qualityIndicatorSource.includes('export function isQualityIndicatorDebugEnabled(): boolean'));
  assert.ok(qualityIndicatorSource.includes("params.get('debug') === '1'"));
  assert.ok(qualityIndicatorSource.includes("params.get('metrics') === '1'"));
  assert.ok(qualityIndicatorSource.includes("params.get('tilesDebug') === '1'"));
});
