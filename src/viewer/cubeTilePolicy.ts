import { MathUtils } from '../vendor/three-core.ts';
import type { CubeFaceId } from './tileManifest.ts';

const FACE_PRIORITY: CubeFaceId[] = ['f', 'r', 'l', 'u', 'd', 'b'];
const FACE_SCORE_EPSILON = 1e-6;

const FACE_VECTORS: Record<CubeFaceId, { x: number; y: number; z: number }> = {
  f: { x: 0, y: 0, z: 1 },
  r: { x: 1, y: 0, z: 0 },
  b: { x: 0, y: 0, z: -1 },
  l: { x: -1, y: 0, z: 0 },
  u: { x: 0, y: 1, z: 0 },
  d: { x: 0, y: -1, z: 0 },
};

export type CubeViewAngles = {
  yawDeg: number;
  pitchDeg: number;
};

export type CubeTileKey = {
  face: CubeFaceId;
  col: number;
  row: number;
};

function toViewVector({ yawDeg, pitchDeg }: CubeViewAngles) {
  const yaw = MathUtils.degToRad(yawDeg);
  const pitch = MathUtils.degToRad(pitchDeg);
  return {
    x: Math.cos(pitch) * Math.sin(yaw),
    y: Math.sin(pitch),
    z: Math.cos(pitch) * Math.cos(yaw),
  };
}

function rankFaces(view: CubeViewAngles): Array<{ face: CubeFaceId; score: number }> {
  const direction = toViewVector(view);
  return FACE_PRIORITY.map((face) => {
    const normal = FACE_VECTORS[face];
    const rawScore = direction.x * normal.x + direction.y * normal.y + direction.z * normal.z;
    const score = Math.abs(rawScore) < FACE_SCORE_EPSILON ? 0 : rawScore;
    return { face, score };
  }).sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return FACE_PRIORITY.indexOf(a.face) - FACE_PRIORITY.indexOf(b.face);
  });
}

export function buildCubeLowFaceOrder(view: CubeViewAngles): CubeFaceId[] {
  return rankFaces(view).map((item) => item.face);
}

export function buildCubeVisibleHighFaces(view: CubeViewAngles): CubeFaceId[] {
  return rankFaces(view)
    .map((item) => item.face);
}

export function buildCubeHighTileKeys(faces: CubeFaceId[], highGrid: number): CubeTileKey[] {
  const keys: CubeTileKey[] = [];
  for (let row = 0; row < highGrid; row += 1) {
    for (let col = 0; col < highGrid; col += 1) {
      for (const face of faces) {
        keys.push({ face, col, row });
      }
    }
  }
  return keys;
}
