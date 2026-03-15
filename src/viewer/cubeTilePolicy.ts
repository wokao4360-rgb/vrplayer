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

type Vec3 = {
  x: number;
  y: number;
  z: number;
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

function dot(a: Vec3, b: Vec3): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}

function normalize(v: Vec3): Vec3 {
  const len = Math.hypot(v.x, v.y, v.z);
  if (len < FACE_SCORE_EPSILON) {
    return { x: 0, y: 0, z: 0 };
  }
  return {
    x: v.x / len,
    y: v.y / len,
    z: v.z / len,
  };
}

function negate(v: Vec3): Vec3 {
  return { x: -v.x, y: -v.y, z: -v.z };
}

function selectBestFace(direction: Vec3, used: Set<CubeFaceId>): CubeFaceId {
  let bestFace: CubeFaceId = 'f';
  let bestScore = Number.NEGATIVE_INFINITY;
  for (const face of FACE_PRIORITY) {
    if (used.has(face)) continue;
    const rawScore = dot(direction, FACE_VECTORS[face]);
    const score = Math.abs(rawScore) < FACE_SCORE_EPSILON ? 0 : rawScore;
    if (score > bestScore) {
      bestFace = face;
      bestScore = score;
    }
  }
  return bestFace;
}

function buildCameraBasis(view: CubeViewAngles) {
  const forward = normalize(toViewVector(view));
  const worldUp = { x: 0, y: 1, z: 0 };
  let right = normalize(cross(worldUp, forward));
  if (Math.hypot(right.x, right.y, right.z) < FACE_SCORE_EPSILON) {
    right = normalize(cross({ x: 0, y: 0, z: 1 }, forward));
  }
  if (Math.hypot(right.x, right.y, right.z) < FACE_SCORE_EPSILON) {
    right = { x: 1, y: 0, z: 0 };
  }
  const up = normalize(cross(forward, right));
  return {
    forward,
    back: negate(forward),
    left: negate(right),
    right,
    up,
    down: negate(up),
  };
}

function buildCubeFaceLoadOrder(view: CubeViewAngles): CubeFaceId[] {
  const basis = buildCameraBasis(view);
  const used = new Set<CubeFaceId>();
  const directions = [basis.forward, basis.left, basis.right, basis.up, basis.down, basis.back];
  return directions.map((direction) => {
    const face = selectBestFace(direction, used);
    used.add(face);
    return face;
  });
}

function buildColumnPriority(highGrid: number): number[] {
  const center = (highGrid - 1) / 2;
  return Array.from({ length: highGrid }, (_, index) => index).sort((a, b) => {
    const distance = Math.abs(a - center) - Math.abs(b - center);
    if (distance !== 0) {
      return distance;
    }
    return b - a;
  });
}

export function buildCubeLowFaceOrder(view: CubeViewAngles): CubeFaceId[] {
  return buildCubeFaceLoadOrder(view);
}

export function buildCubeVisibleHighFaces(view: CubeViewAngles): CubeFaceId[] {
  return buildCubeFaceLoadOrder(view).slice(0, 3);
}

export function buildCubeHighTileKeys(faces: CubeFaceId[], highGrid: number): CubeTileKey[] {
  const keys: CubeTileKey[] = [];
  const cols = buildColumnPriority(highGrid);
  for (const face of faces) {
    for (let row = highGrid - 1; row >= 0; row -= 1) {
      for (const col of cols) {
        keys.push({ face, col, row });
      }
    }
  }
  return keys;
}
