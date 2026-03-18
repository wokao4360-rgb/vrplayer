import type { MuseumShellPreloadAssetRole } from './museumShellPreloadPlanner.ts';

export function shouldPrimeDecodedTileRole(role: MuseumShellPreloadAssetRole): boolean {
  return role === 'low-face' || role === 'hero-high-tile';
}
