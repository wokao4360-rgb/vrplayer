/**
 * Scene Graph 数据层
 * 从 Museum config 构建场景图（节点=scene，边=热点跳转或 floorplan 拓扑兜底）。
 */

import type { Museum, Scene } from '../types/config';
import {
  deriveSceneConnectionsFromFloorplan,
  resolveFloorplan,
} from '../floorplan/floorplanAdapter.ts';

export interface SceneGraphNode {
  id: string;
  name: string;
  scene: Scene;
  mapPoint?: { x: number; y: number };
  initialView?: { yaw: number; pitch: number; fov?: number };
}

export interface SceneGraphEdge {
  from: string;
  to: string;
}

export interface SceneGraph {
  nodes: SceneGraphNode[];
  edges: SceneGraphEdge[];
  currentNodeId?: string;
}

/**
 * 从 Museum config 构建场景图。
 */
export function buildSceneGraph(museum: Museum, currentSceneId?: string): SceneGraph {
  const floorplan = resolveFloorplan(museum);
  const floorplanScenePositions = new Map(
    floorplan.nodes
      .filter((node) => node.sceneId)
      .map((node) => [node.sceneId as string, { x: node.x, y: node.y }]),
  );

  const nodes: SceneGraphNode[] = museum.scenes.map((scene) => ({
    id: scene.id,
    name: scene.name,
    scene,
    mapPoint: floorplanScenePositions.get(scene.id) ?? scene.mapPoint,
    initialView: scene.initialView,
  }));

  const nodeIds = new Set(nodes.map((node) => node.id));
  const edges: SceneGraphEdge[] = [];

  for (const scene of museum.scenes) {
    for (const hotspot of scene.hotspots) {
      if (hotspot.type !== 'scene') continue;
      if (!hotspot.target?.sceneId) continue;

      const targetMuseumId = hotspot.target.museumId ?? museum.id;
      const targetSceneId = hotspot.target.sceneId;
      if (targetMuseumId !== museum.id) continue;
      if (!nodeIds.has(targetSceneId)) continue;

      const edgeExists = edges.some(
        (edge) => edge.from === scene.id && edge.to === targetSceneId,
      );
      if (edgeExists) continue;

      edges.push({
        from: scene.id,
        to: targetSceneId,
      });
    }
  }

  if (edges.length === 0 && museum.map?.paths?.length) {
    for (const connection of deriveSceneConnectionsFromFloorplan(floorplan)) {
      if (!nodeIds.has(connection.from) || !nodeIds.has(connection.to)) continue;

      const edgeExists = edges.some(
        (edge) => edge.from === connection.from && edge.to === connection.to,
      );
      if (edgeExists) continue;

      edges.push(connection);
    }
  }

  return {
    nodes,
    edges,
    currentNodeId: currentSceneId && nodeIds.has(currentSceneId) ? currentSceneId : undefined,
  };
}

export function getNeighbors(graph: SceneGraph, nodeId: string): SceneGraphNode[] {
  const neighborIds = new Set<string>();

  for (const edge of graph.edges) {
    if (edge.from === nodeId) {
      neighborIds.add(edge.to);
    } else if (edge.to === nodeId) {
      neighborIds.add(edge.from);
    }
  }

  return graph.nodes.filter((node) => neighborIds.has(node.id));
}

export function getNodeDegree(graph: SceneGraph, nodeId: string): number {
  let degree = 0;
  for (const edge of graph.edges) {
    if (edge.from === nodeId || edge.to === nodeId) {
      degree += 1;
    }
  }
  return degree;
}
