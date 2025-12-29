import * as THREE from 'three';

export function createCompassTexture(size = 512): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    // 兜底：创建一个空纹理
    const fallback = new THREE.CanvasTexture(canvas);
    fallback.needsUpdate = true;
    return fallback;
  }

  const cx = size / 2;
  const cy = size / 2;
  const r = (size / 2) * 0.92;

  ctx.clearRect(0, 0, size, size);

  // 外圈暗角（轻微）
  const vignette = ctx.createRadialGradient(cx, cy, r * 0.25, cx, cy, r);
  vignette.addColorStop(0, 'rgba(0,0,0,0.00)');
  vignette.addColorStop(0.55, 'rgba(0,0,0,0.18)');
  vignette.addColorStop(1, 'rgba(0,0,0,0.55)');
  ctx.fillStyle = vignette;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();

  // 中心遮挡区（遮住摄影杆/三脚架）
  ctx.fillStyle = 'rgba(0,0,0,0.55)';
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.28, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();

  // 中心轻微“雾化感”（不用真实模糊，叠层即可）
  const haze = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.42);
  haze.addColorStop(0, 'rgba(0,0,0,0.22)');
  haze.addColorStop(1, 'rgba(0,0,0,0.00)');
  ctx.fillStyle = haze;
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.42, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();

  // 刻度线（每 30° 一条，轻量）
  ctx.save();
  ctx.translate(cx, cy);
  for (let deg = 0; deg < 360; deg += 30) {
    const rad = (deg * Math.PI) / 180;
    const isMajor = deg % 90 === 0;
    const len = isMajor ? r * 0.12 : r * 0.07;
    const w = isMajor ? 2 : 1;
    ctx.strokeStyle = isMajor ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.14)';
    ctx.lineWidth = w;
    ctx.beginPath();
    ctx.moveTo(Math.sin(rad) * (r - len), -Math.cos(rad) * (r - len));
    ctx.lineTo(Math.sin(rad) * r, -Math.cos(rad) * r);
    ctx.stroke();
  }
  ctx.restore();

  // N/E/S/W（如视风格：浅色、低透明度）
  const drawDir = (text: string, deg: number) => {
    const rad = (deg * Math.PI) / 180;
    const tx = cx + Math.sin(rad) * (r * 0.56);
    const ty = cy - Math.cos(rad) * (r * 0.56);
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.font = `600 ${Math.round(size * 0.06)}px system-ui, -apple-system, Segoe UI, PingFang SC, Microsoft YaHei, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, tx, ty);
  };
  drawDir('北', 0);
  drawDir('东', 90);
  drawDir('南', 180);
  drawDir('西', 270);

  // 外圈边缘再压一点（让 patch 更“贴地”）
  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.closePath();
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace as any;
  texture.needsUpdate = true;
  return texture;
}




