/**
 * Auto Layout 自动布局算法
 * 纯前端力导向布局（force-directed layout）
 */

import type { SceneGraphNode, SceneGraphEdge } from './sceneGraph';

export type Layout2D = Record<string, { x: number; y: number }>;

export interface ForceLayoutOptions {
  iterations?: number;
  width?: number;
  height?: number;
  padding?: number;
  repulsion?: number;
  spring?: number;
  damping?: number;
}

const DEFAULT_OPTIONS: Required<ForceLayoutOptions> = {
  iterations: 300,
  width: 1000,
  height: 1000,
  padding: 40,
  repulsion: 0.15,
  spring: 0.12,
  damping: 0.88,
};

/**
 * 力导向布局（2D）
 * @param nodes 节点数组
 * @param edges 边数组
 * @param options 布局选项
 * @returns 归一化后的2D布局（Record<nodeId, {x, y}>）
 */
export function forceLayout2D(
  nodes: SceneGraphNode[],
  edges: SceneGraphEdge[],
  options?: ForceLayoutOptions
): Layout2D {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const n = nodes.length;

  if (n === 0) return {};

  // 初始化位置：环形布局 + 随机噪声
  const pos: Record<
    string,
    { x: number; y: number; vx: number; vy: number }
  > = {};

  const radius = Math.max(1, Math.sqrt(n) * 0.5);
  nodes.forEach((node, i) => {
    const angle = (2 * Math.PI * i) / n;
    const noise = (Math.random() - 0.5) * 0.2;
    pos[node.id] = {
      x: radius * Math.cos(angle) + noise,
      y: radius * Math.sin(angle) + noise,
      vx: 0,
      vy: 0,
    };
  });

  // 如果没有边，创建最小生成树（避免节点完全孤立）
  const edgeList =
    edges.length > 0
      ? edges
      : nodes.length > 1
      ? nodes.slice(0, -1).map((node, i) => ({
          from: node.id,
          to: nodes[i + 1].id,
        }))
      : [];

  // 力导向迭代
  for (let iter = 0; iter < opts.iterations; iter++) {
    // 1. 斥力：所有节点对之间
    for (let i = 0; i < n; i++) {
      const a = nodes[i];
      const pa = pos[a.id];
      for (let j = i + 1; j < n; j++) {
        const b = nodes[j];
        const pb = pos[b.id];
        let dx = pa.x - pb.x;
        let dy = pa.y - pb.y;
        const dist2 = dx * dx + dy * dy || 1e-4; // 避免除零
        const dist = Math.sqrt(dist2);
        const f = opts.repulsion / dist2; // 斥力与距离平方成反比
        dx *= f;
        dy *= f;
        pa.vx += dx;
        pa.vy += dy;
        pb.vx -= dx;
        pb.vy -= dy;
      }
    }

    // 2. 拉力：边连接的节点对
    for (const edge of edgeList) {
      const a = pos[edge.from];
      const b = pos[edge.to];
      if (!a || !b) continue;

      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1e-4;
      const targetDist = 1.0; // 目标边长
      const f = opts.spring * (dist - targetDist);
      const nx = (dx / dist) * f;
      const ny = (dy / dist) * f;

      a.vx += nx;
      a.vy += ny;
      b.vx -= nx;
      b.vy -= ny;
    }

    // 3. 积分 + 阻尼
    for (const id in pos) {
      const p = pos[id];
      p.vx *= opts.damping;
      p.vy *= opts.damping;
      p.x += p.vx * 0.1;
      p.y += p.vy * 0.1;
    }
  }

  // 提取最终位置
  const rawLayout: Layout2D = {};
  for (const id in pos) {
    rawLayout[id] = { x: pos[id].x, y: pos[id].y };
  }

  // 归一化到指定矩形
  return normalizeToRect2D(rawLayout, opts.width, opts.height, opts.padding);
}

/**
 * 归一化布局到指定矩形范围
 * @param layout 原始布局
 * @param width 目标宽度
 * @param height 目标高度
 * @param padding 内边距
 * @returns 归一化后的布局
 */
export function normalizeToRect2D(
  layout: Layout2D,
  width: number,
  height: number,
  padding: number
): Layout2D {
  const entries = Object.entries(layout);
  if (entries.length === 0) return {};

  // 计算边界
  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity;

  for (const [, p] of entries) {
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y);
    maxY = Math.max(maxY, p.y);
  }

  const spanX = maxX - minX || 1;
  const spanY = maxY - minY || 1;

  // 计算缩放比例（保持宽高比，填充可用区域）
  const availableWidth = width - 2 * padding;
  const availableHeight = height - 2 * padding;
  const scaleX = availableWidth / spanX;
  const scaleY = availableHeight / spanY;
  const scale = Math.min(scaleX, scaleY); // 取较小值，确保不超出边界

  // 归一化
  const normalized: Layout2D = {};
  for (const [id, p] of entries) {
    normalized[id] = {
      x: padding + (p.x - minX) * scale + (availableWidth - spanX * scale) / 2,
      y: padding + (p.y - minY) * scale + (availableHeight - spanY * scale) / 2,
    };
  }

  return normalized;
}

/**
 * 判断是否应该使用自动布局
 * @param nodes 节点数组
 * @returns true 如果应该使用自动布局
 */
export function shouldUseAutoLayout(nodes: SceneGraphNode[]): boolean {
  const withMapPoint = nodes.filter((n) => n.mapPoint);
  
  // 如果有节点缺少 mapPoint，使用自动布局
  if (withMapPoint.length < nodes.length) {
    return true;
  }

  // 如果所有节点都有 mapPoint，检查是否"挤在一起"
  if (withMapPoint.length < 2) {
    return false; // 单个节点不需要布局
  }

  const xs = withMapPoint.map((n) => n.mapPoint!.x);
  const ys = withMapPoint.map((n) => n.mapPoint!.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const spanX = maxX - minX;
  const spanY = maxY - minY;

  // 如果跨度太小（例如小于100像素），认为挤在一起，使用自动布局
  const threshold = 100;
  return spanX < threshold || spanY < threshold;
}

