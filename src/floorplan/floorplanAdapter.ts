import type {
  FloorplanNode,
  FloorplanNodeStatus,
  Museum,
  Scene,
} from '../types/config';

export interface ResolvedFloorplanNode {
  id: string;
  x: number;
  y: number;
  label: string;
  kind: FloorplanNode['kind'];
  status: FloorplanNodeStatus;
  sceneId?: string;
  scene?: Scene;
  interactive: boolean;
}

export interface ResolvedFloorplanPathSegment {
  pathId: string;
  fromId: string;
  toId: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
}

export interface ResolvedFloorplan {
  width: number;
  height: number;
  image?: string;
  hasImage: boolean;
  nodes: ResolvedFloorplanNode[];
  renderNodes: ResolvedFloorplanNode[];
  pathSegments: ResolvedFloorplanPathSegment[];
  nodeMap: Map<string, ResolvedFloorplanNode>;
}

function resolveSceneNodeId(node: FloorplanNode): string | undefined {
  if (node.sceneId && node.sceneId.trim()) {
    return node.sceneId.trim();
  }
  if (node.kind === 'scene' && node.status === 'ready') {
    return node.id;
  }
  return undefined;
}

function isReadySceneNode(node: ResolvedFloorplanNode): boolean {
  return node.kind === 'scene' && node.status === 'ready' && Boolean(node.sceneId && node.scene);
}

export function hasFloorplanData(museum: Museum): boolean {
  return Boolean(museum.map?.image || museum.map?.nodes?.length);
}

export function resolveFloorplan(museum: Museum): ResolvedFloorplan {
  const scenesById = new Map(museum.scenes.map((scene) => [scene.id, scene]));
  const configuredNodes = museum.map?.nodes ?? [];

  const nodes: ResolvedFloorplanNode[] =
    configuredNodes.length > 0
      ? configuredNodes.map((node) => {
          const sceneId = resolveSceneNodeId(node);
          const scene = sceneId ? scenesById.get(sceneId) : undefined;
          return {
            id: node.id,
            x: node.x,
            y: node.y,
            label: node.label,
            kind: node.kind,
            status: node.status,
            sceneId,
            scene,
            interactive: node.kind === 'scene' && node.status === 'ready' && Boolean(scene),
          };
        })
      : museum.scenes
          .filter((scene) => scene.mapPoint)
          .map((scene) => ({
            id: scene.id,
            x: scene.mapPoint.x,
            y: scene.mapPoint.y,
            label: scene.name,
            kind: 'scene' as const,
            status: 'ready' as const,
            sceneId: scene.id,
            scene,
            interactive: true,
          }));

  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const pathSegments: ResolvedFloorplanPathSegment[] = [];

  for (const path of museum.map?.paths ?? []) {
    for (let index = 0; index < path.points.length - 1; index += 1) {
      const fromId = path.points[index];
      const toId = path.points[index + 1];
      const fromNode = nodeMap.get(fromId);
      const toNode = nodeMap.get(toId);
      if (!fromNode || !toNode) continue;
      pathSegments.push({
        pathId: path.id,
        fromId,
        toId,
        from: { x: fromNode.x, y: fromNode.y },
        to: { x: toNode.x, y: toNode.y },
      });
    }
  }

  return {
    width: museum.map?.width ?? 1000,
    height: museum.map?.height ?? 600,
    image: museum.map?.image,
    hasImage: Boolean(museum.map?.image),
    nodes,
    renderNodes: nodes.filter((node) => node.kind === 'scene'),
    pathSegments,
    nodeMap,
  };
}

export function deriveSceneConnectionsFromFloorplan(
  floorplan: ResolvedFloorplan,
): Array<{ from: string; to: string }> {
  const connections: Array<{ from: string; to: string }> = [];
  const seen = new Set<string>();
  const segmentsByPath = new Map<string, ResolvedFloorplanPathSegment[]>();

  for (const segment of floorplan.pathSegments) {
    const list = segmentsByPath.get(segment.pathId) ?? [];
    list.push(segment);
    segmentsByPath.set(segment.pathId, list);
  }

  for (const [, segments] of segmentsByPath) {
    const orderedPointIds: string[] = [];
    for (const segment of segments) {
      if (orderedPointIds.length === 0) {
        orderedPointIds.push(segment.fromId, segment.toId);
      } else {
        orderedPointIds.push(segment.toId);
      }
    }

    let lastSceneNode: ResolvedFloorplanNode | null = null;
    for (const pointId of orderedPointIds) {
      const node = floorplan.nodeMap.get(pointId);
      if (!node) continue;

      if (node.kind === 'scene' && !isReadySceneNode(node)) {
        lastSceneNode = null;
        continue;
      }

      if (!isReadySceneNode(node)) {
        continue;
      }

      if (lastSceneNode && lastSceneNode.sceneId && node.sceneId && lastSceneNode.sceneId !== node.sceneId) {
        const key = `${lastSceneNode.sceneId}->${node.sceneId}`;
        if (!seen.has(key)) {
          seen.add(key);
          connections.push({
            from: lastSceneNode.sceneId,
            to: node.sceneId,
          });
        }
      }

      lastSceneNode = node;
    }
  }

  return connections;
}
