/**
 * Scene Graph 数据层
 * 从 Museum config 构建场景图（节点=scene，边=scene热点跳转）
 */

import type { Museum, Scene, SceneHotspot } from '../types/config';

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
 * 从 Museum config 构建场景图
 * @param museum 博物馆配置
 * @param currentSceneId 当前场景ID（可选，用于标记当前节点）
 * @returns SceneGraph 场景图
 */
export function buildSceneGraph(museum: Museum, currentSceneId?: string): SceneGraph {
  // 构建节点：每个 scene 一个节点
  const nodes: SceneGraphNode[] = museum.scenes.map((scene) => ({
    id: scene.id,
    name: scene.name,
    scene,
    mapPoint: scene.mapPoint,
    initialView: scene.initialView,
  }));

  // 构建节点ID集合（用于快速查找）
  const nodeIds = new Set(nodes.map((n) => n.id));

  // 构建边：从 hotspots 中提取 type='scene' 的跳转关系
  const edges: SceneGraphEdge[] = [];

  for (const scene of museum.scenes) {
    for (const hotspot of scene.hotspots) {
      // 只处理 type='scene' 的热点
      if (hotspot.type !== 'scene') continue;

      // 必须有 target.sceneId
      if (!hotspot.target?.sceneId) continue;

      const targetMuseumId = hotspot.target.museumId ?? museum.id;
      const targetSceneId = hotspot.target.sceneId;

      // MVP：跨馆边忽略（或标记为外链边，但当前不处理）
      if (targetMuseumId !== museum.id) continue;

      // 目标 scene 必须存在
      if (!nodeIds.has(targetSceneId)) continue;

      // 避免重复边（如果已有 from->to，不再添加）
      const edgeExists = edges.some(
        (e) => e.from === scene.id && e.to === targetSceneId
      );
      if (edgeExists) continue;

      edges.push({
        from: scene.id,
        to: targetSceneId,
      });
    }
  }

  return {
    nodes,
    edges,
    currentNodeId: currentSceneId && nodeIds.has(currentSceneId) ? currentSceneId : undefined,
  };
}

/**
 * 获取节点的邻居节点
 * @param graph 场景图
 * @param nodeId 节点ID
 * @returns 邻居节点数组
 */
export function getNeighbors(graph: SceneGraph, nodeId: string): SceneGraphNode[] {
  const neighborIds = new Set<string>();

  for (const edge of graph.edges) {
    if (edge.from === nodeId) {
      neighborIds.add(edge.to);
    } else if (edge.to === nodeId) {
      neighborIds.add(edge.from);
    }
  }

  return graph.nodes.filter((n) => neighborIds.has(n.id));
}

/**
 * 获取节点的度数（连接的边数）
 * @param graph 场景图
 * @param nodeId 节点ID
 * @returns 度数
 */
export function getNodeDegree(graph: SceneGraph, nodeId: string): number {
  let degree = 0;
  for (const edge of graph.edges) {
    if (edge.from === nodeId || edge.to === nodeId) {
      degree++;
    }
  }
  return degree;
}

