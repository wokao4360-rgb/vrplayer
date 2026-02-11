import { CanvasTexture, SRGBColorSpace } from '../vendor/three-core';

export function createCompassTexture(size = 512): CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    // 鍏滃簳锛氬垱寤轰竴涓┖绾圭悊
    const fallback = new CanvasTexture(canvas);
    fallback.needsUpdate = true;
    return fallback;
  }

  const cx = size / 2;
  const cy = size / 2;
  const r = (size / 2) * 0.92;

  ctx.clearRect(0, 0, size, size);

  // 澶栧湀鏆楄锛堣交寰級
  const vignette = ctx.createRadialGradient(cx, cy, r * 0.25, cx, cy, r);
  vignette.addColorStop(0, 'rgba(0,0,0,0.00)');
  vignette.addColorStop(0.55, 'rgba(0,0,0,0.18)');
  vignette.addColorStop(1, 'rgba(0,0,0,0.55)');
  ctx.fillStyle = vignette;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();

  // 涓績閬尅鍖猴紙閬綇鎽勫奖鏉?涓夎剼鏋讹級
  ctx.fillStyle = 'rgba(0,0,0,0.55)';
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.28, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();

  // 涓績杞诲井鈥滈浘鍖栨劅鈥濓紙涓嶇敤鐪熷疄妯＄硦锛屽彔灞傚嵆鍙級
  const haze = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.42);
  haze.addColorStop(0, 'rgba(0,0,0,0.22)');
  haze.addColorStop(1, 'rgba(0,0,0,0.00)');
  ctx.fillStyle = haze;
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.42, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();

  // 鍒诲害绾匡紙姣?30掳 涓€鏉★紝杞婚噺锛?  ctx.save();
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

  // 濡傝妯″瀷锛氭枃瀛椾笉鍐嶇敾鍦ㄧ汗鐞嗕笂锛岃€屾槸浣跨敤鐙珛鐨剆prite
  // 杩欓噷鍙粯鍒跺埢搴︾嚎鍜岃儗鏅紝鏂囧瓧鐢盢adirPatch鍒涘缓鐙珛鐨剆prite

  // 澶栧湀杈圭紭鍐嶅帇涓€鐐癸紙璁?patch 鏇粹€滆创鍦扳€濓級
  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.closePath();
  ctx.stroke();

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace as any;
  // 璁剧疆绾圭悊涓績鐐瑰拰鏃嬭浆锛岀‘淇濇枃瀛楁柟鍚戞纭?  texture.center.set(0.5, 0.5);
  texture.rotation = 0;
  texture.flipY = false; // 闃叉绾圭悊涓婁笅缈昏浆瀵艰嚧鏂囧瓧闀滃儚
  texture.needsUpdate = true;
  return texture;
}




