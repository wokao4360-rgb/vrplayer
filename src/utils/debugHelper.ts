/**
 * 调试辅助工具（仅在 debug=1 时启用）
 * 提供状态快照和一键复位功能
 */

import { __VR_DEBUG__ } from './debug';

/**
 * 状态快照类型定义
 */
export type VRStateSnapshot = {
  museumId?: string;
  currentSceneId?: string;
  groundNavDots?: {
    aimedSceneId?: string;
    isAutoNavActive?: boolean;
    autoNavTargetSceneId?: string;
    hasProgressElement?: boolean;
  };
  scenePreviewCard?: {
    isVisible?: boolean;
    hintVisible?: boolean;
    hintEmphasizing?: boolean;
    currentSceneId?: string;
  };
  sceneStrip?: {
    userScrolling?: boolean;
  };
  yieldClassManager?: {
    classes?: string[];
  };
};

/**
 * 获取状态快照（容错，不抛出异常）
 */
export function dumpVRState(): VRStateSnapshot {
  const snapshot: VRStateSnapshot = {};

  try {
    // 尝试从 URL 参数获取 museumId / currentSceneId
    const params = new URLSearchParams(window.location.search);
    const museumId = params.get('museum');
    const sceneId = params.get('scene');
    if (museumId) {
      snapshot.museumId = museumId;
    }
    if (sceneId) {
      snapshot.currentSceneId = sceneId;
    }
  } catch (e) {
    // 容错，不抛出
  }

  try {
    // GroundNavDots 状态
    const groundNavContainer = document.querySelector('.vr-groundnav');
    if (groundNavContainer) {
      snapshot.groundNavDots = {};
      
      // 查找 aimed dot
      const aimedDot = groundNavContainer.querySelector('.vr-groundnav__dot.is-aimed');
      if (aimedDot) {
        snapshot.groundNavDots.aimedSceneId = aimedDot.getAttribute('data-scene-id') || undefined;
      }

      // 查找 autonav dot
      const autonavDot = groundNavContainer.querySelector('.vr-groundnav__dot.is-autonav');
      if (autonavDot) {
        snapshot.groundNavDots.isAutoNavActive = true;
        snapshot.groundNavDots.autoNavTargetSceneId = autonavDot.getAttribute('data-scene-id') || undefined;
        
        // 检查是否有 progress 元素
        const progress = autonavDot.querySelector('.vr-groundnav__progress');
        snapshot.groundNavDots.hasProgressElement = !!progress;
      }
    }
  } catch (e) {
    // 容错，不抛出
  }

  try {
    // ScenePreviewCard 状态
    const previewCard = document.querySelector('.vr-previewcard');
    if (previewCard) {
      snapshot.scenePreviewCard = {};
      snapshot.scenePreviewCard.isVisible = previewCard.classList.contains('is-visible');
      
      const hint = previewCard.querySelector('.vr-previewcard__hint');
      if (hint) {
        snapshot.scenePreviewCard.hintVisible = hint.classList.contains('is-visible');
        snapshot.scenePreviewCard.hintEmphasizing = hint.classList.contains('is-emphasizing');
      }
      
      // 尝试从标题或 data 属性获取 sceneId（暂时无法直接获取，需要组件内部状态）
    }
  } catch (e) {
    // 容错，不抛出
  }

  try {
    // SceneStrip 状态（通过 class 判断）
    const sceneStrip = document.querySelector('.vr-scenestrip');
    if (sceneStrip) {
      snapshot.sceneStrip = {};
      snapshot.sceneStrip.userScrolling = sceneStrip.classList.contains('is-user-scrolling');
    }
  } catch (e) {
    // 容错，不抛出
  }

  try {
    // yieldClassManager 状态（检查根节点的 class）
    const rootEl = document.documentElement;
    const classes = Array.from(rootEl.classList).filter(cls => 
      cls === 'vr-ui-interacting' || cls === 'vr-ui-restoring'
    );
    if (classes.length > 0) {
      snapshot.yieldClassManager = { classes };
    }
  } catch (e) {
    // 容错，不抛出
  }

  return snapshot;
}

/**
 * 一键复位 UI 状态
 * 注意：需要通过回调参数传入 interactionBus，避免循环依赖
 */
export function resetVRUI(interactionBus?: { emitInteracting: () => void }): void {
  try {
    // 派发 vr:close-panels 事件
    window.dispatchEvent(new CustomEvent('vr:close-panels'));
  } catch (e) {
    // 容错，不抛出
  }

  try {
    // 触发交互信号：先触发 interacting，然后触发 idle（模拟用户操作结束）
    // 这会清理所有状态
    if (interactionBus) {
      interactionBus.emitInteracting();
      // 立即触发 idle（让组件知道交互结束，清理状态）
      // 使用 setTimeout 延迟一点，确保 interacting 事件先处理完
      setTimeout(() => {
        try {
          // interactionBus 会通过定时器自动触发 idle，我们这里手动触发一次
          // 或者直接清理 DOM class（作为兜底）
          document.documentElement.classList.remove('vr-ui-interacting', 'vr-ui-restoring');
        } catch (e) {
          // 容错，不抛出
        }
      }, 100);
    } else {
      // 如果没有传入 interactionBus，至少清理 DOM class
      document.documentElement.classList.remove('vr-ui-interacting', 'vr-ui-restoring');
    }
  } catch (e) {
    // 容错，不抛出
  }
}

