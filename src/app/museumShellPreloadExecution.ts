export type MuseumShellWarmPhase = 'museum-entry' | 'scene-transition';

export type MuseumShellExecutionLayer = 'L0' | 'L1' | 'L2' | 'L3';

export function resolveMuseumShellWarmExecutionLayers(
  _phase: MuseumShellWarmPhase,
): MuseumShellExecutionLayer[] {
  return ['L0', 'L1', 'L2'];
}
