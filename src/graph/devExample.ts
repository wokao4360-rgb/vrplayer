/**
 * Scene Graph + Auto Layout 开发示例（dev-only）
 * 
 * 此文件仅供开发/验收时手动调用，不被任何地方 import
 * 
 * 使用方法（在浏览器控制台）：
 *   import('./graph/devExample').then(m => {
 *     const museum = /* 从 config 获取 museum 对象 */;
 *     m.runGraphExample(museum);
 *   });
 */

import type { Museum } from '../types/config';
import { buildSceneGraph } from './sceneGraph';
import { forceLayout2D, shouldUseAutoLayout } from './autoLayout';

/**
 * 运行场景图+自动布局示例
 * @param museum 博物馆配置对象
 * @param currentSceneId 当前场景ID（可选）
 * @returns 计算结果对象（包含 graph 和 layout）
 */
export function runGraphExample(
  museum: Museum,
  currentSceneId?: string
): {
  graph: ReturnType<typeof buildSceneGraph>;
  useAutoLayout: boolean;
  layout2D: Record<string, { x: number; y: number }> | null;
} {
  // 构建场景图
  const graph = buildSceneGraph(museum, currentSceneId);

  // 判断是否需要自动布局
  const useAutoLayout = shouldUseAutoLayout(graph.nodes);

  // 计算布局
  let layout2D: Record<string, { x: number; y: number }> | null = null;
  
  if (useAutoLayout) {
    // 使用自动布局
    layout2D = forceLayout2D(graph.nodes, graph.edges, {
      width: museum.map.width,
      height: museum.map.height,
      iterations: 300,
      padding: 40,
    });
  } else {
    // 使用现有的 mapPoint
    layout2D = {};
    for (const node of graph.nodes) {
      if (node.mapPoint) {
        layout2D[node.id] = { x: node.mapPoint.x, y: node.mapPoint.y };
      }
    }
  }

  // 返回结果（调用方可以在控制台查看）
  return {
    graph,
    useAutoLayout,
    layout2D,
  };
}

