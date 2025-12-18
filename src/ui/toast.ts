let toastTimer: number | null = null;

export function showToast(message: string, durationMs = 1500): void {
  const existing = document.querySelector('.vr-toast') as HTMLElement | null;
  const el = existing ?? document.createElement('div');
  el.className = 'vr-toast';
  el.textContent = message;
  if (!existing) document.body.appendChild(el);

  window.requestAnimationFrame(() => el.classList.add('show'));
  if (toastTimer) window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    el.classList.remove('show');
    window.setTimeout(() => el.remove(), 220);
    toastTimer = null;
  }, durationMs);
}




