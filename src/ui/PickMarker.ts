/**
 * 拾取落点标记（临时显示，1.5s 后自动消失）
 */

export function showPickMarker(viewerEl: HTMLElement, x: number, y: number): void {
  // 获取 viewer 容器的位置
  const rect = viewerEl.getBoundingClientRect();
  const relativeX = x - rect.left;
  const relativeY = y - rect.top;

  // 创建标记元素
  const marker = document.createElement('div');
  marker.className = 'vr-pick-marker';
  marker.style.position = 'absolute';
  marker.style.left = '0';
  marker.style.top = '0';
  marker.style.transform = `translate3d(${relativeX}px, ${relativeY}px, 0)`;
  marker.style.pointerEvents = 'none';
  marker.style.zIndex = '1000';

  // 添加到 viewer 容器
  viewerEl.style.position = 'relative';
  viewerEl.appendChild(marker);

  // 触发动画（opacity 0→1）
  window.requestAnimationFrame(() => {
    marker.classList.add('show');
  });

  // 1.5s 后淡出移除
  window.setTimeout(() => {
    marker.classList.remove('show');
    window.setTimeout(() => {
      if (marker.parentNode) {
        marker.parentNode.removeChild(marker);
      }
    }, 200); // 淡出动画时长
  }, 1500);
}

