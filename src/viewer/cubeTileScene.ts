import { Group, Mesh, PlaneGeometry } from '../vendor/three-core.ts';
import type { MeshBasicMaterial } from 'three';
import type { CubeFaceId } from './tileManifest.ts';

export const CUBE_FACE_SEQUENCE: CubeFaceId[] = ['f', 'r', 'b', 'l', 'u', 'd'];

export function createCubeFaceRoot(face: CubeFaceId, halfSize: number): Group {
  const group = new Group();
  switch (face) {
    case 'f':
      group.position.set(0, 0, halfSize);
      break;
    case 'b':
      group.position.set(0, 0, -halfSize);
      group.rotation.y = Math.PI;
      break;
    case 'r':
      group.position.set(halfSize, 0, 0);
      group.rotation.y = Math.PI / 2;
      break;
    case 'l':
      group.position.set(-halfSize, 0, 0);
      group.rotation.y = -Math.PI / 2;
      break;
    case 'u':
      group.position.set(0, halfSize, 0);
      group.rotation.x = -Math.PI / 2;
      break;
    case 'd':
      group.position.set(0, -halfSize, 0);
      group.rotation.x = Math.PI / 2;
      break;
  }
  return group;
}

export function createCubeFacePlane(size: number, material: MeshBasicMaterial): Mesh {
  return new Mesh(new PlaneGeometry(size, size), material);
}

export function createCubeTilePlane(
  halfSize: number,
  grid: number,
  col: number,
  row: number,
  material: MeshBasicMaterial,
): Mesh {
  const tileSize = (halfSize * 2) / grid;
  const mesh = new Mesh(new PlaneGeometry(tileSize, tileSize), material);
  mesh.position.set(
    -halfSize + tileSize * (col + 0.5),
    halfSize - tileSize * (row + 0.5),
    0.1,
  );
  return mesh;
}
